/**
 * ELVION assistant — guided FAQ chat widget.
 *
 * A rules-based helper. There is no AI model, no API key and no network call:
 * every reply below is text already published and approved on faq.html,
 * shop.html or contact.html.
 *
 * ── The rule that shapes this whole file ──────────────────────────────────
 * ELVION sells replacement lamps for medical diagnostic instruments. Telling a
 * clinician that a given part fits their instrument, when that has not been
 * verified, causes a wrong order at best and a failed examination at worst.
 *
 * So this assistant NEVER states:
 *   · which device model a part number fits
 *   · per-part voltage (03400-U is documented as unresolved)
 *   · price, shipping, returns, warranty or bulb life — never published
 *
 * Anything in that territory is answered by handing off to a human. Confirming
 * fitment is a person's job here, and the widget's purpose is to get the
 * visitor to that person quickly — not to guess on their behalf.
 * See ELVION_PRODUCT_MASTER_SHEET.md for the underlying data conflicts.
 */
(function () {
  'use strict';

  var PHONE_HREF = 'tel:+17743015605';
  var PHONE_TEXT = '+1 (774) 301-5605';
  var EMAIL = 'saleselvion@gmail.com';
  var WHATSAPP = 'https://wa.me/17743015605';
  var AMAZON = 'https://www.amazon.com/s?me=A38TC0Y9OWKC8B&marketplaceID=ATVPDKIKX0DER';

  var PARTS = ['03000-U', '03100-U', '03400-U', '03800-U', '03900-U', 'HPX06500'];

  /** The three ways to reach a person, offered whenever the bot won't guess. */
  var HANDOFF =
    '<a href="' + WHATSAPP + '" target="_blank" rel="noopener">WhatsApp us</a>, ' +
    '<a href="' + PHONE_HREF + '">call ' + PHONE_TEXT + '</a>, ' +
    'or <a href="mailto:' + EMAIL + '">email ' + EMAIL + '</a>.';

  var CONTACT_CHIPS = [
    { label: 'Open contact form', href: 'contact.html' },
    { label: 'WhatsApp', href: WHATSAPP, external: true },
    { label: 'Call us', href: PHONE_HREF },
  ];

  var MENU_CHIPS = [
    { label: 'Which bulb fits my instrument?', topic: 'fitment' },
    { label: 'Bulb specifications', topic: 'specs' },
    { label: 'Where do I buy?', topic: 'buy' },
    { label: 'Is this a Welch Allyn® part?', topic: 'oem' },
    { label: 'Talk to a person', topic: 'contact' },
  ];

  /**
   * Topics the assistant must refuse rather than answer. These are checked
   * before the knowledge base, so a question that touches one of them is
   * always handed to a human even if it also matches a normal topic.
   */
  var GUARDED = [
    {
      keywords: ['price', 'prices', 'pricing', 'cost', 'costs', 'how much', 'cheap',
                 'discount', 'deal', 'quote'],
      answer:
        'Pricing is shown on the ELVION storefront on Amazon rather than here, so ' +
        "you're always seeing the current figure. For clinic-level quantities we'd " +
        'rather quote you directly — ' + HANDOFF,
      chips: [{ label: 'View on Amazon', href: AMAZON, external: true },
              { label: 'Ask about bulk pricing', href: 'contact.html' }],
    },
    {
      keywords: ['ship', 'shipping', 'delivery', 'deliver', 'arrive', 'dispatch',
                 'how long', 'tracking', 'postage'],
      answer:
        'Orders are fulfilled through Amazon, so delivery times and tracking come ' +
        'from your Amazon order rather than from us. If you need a date confirmed ' +
        'before ordering, ' + HANDOFF,
      chips: [{ label: 'View on Amazon', href: AMAZON, external: true }].concat(CONTACT_CHIPS[0]),
    },
    {
      keywords: ['return', 'returns', 'refund', 'exchange', 'warranty', 'guarantee',
                 'faulty', 'broken', 'defective'],
      answer:
        "I don't have our returns or warranty terms published, and I'd rather not " +
        'guess at them. Please ask us directly and you\'ll get a definite answer — ' +
        HANDOFF,
      chips: CONTACT_CHIPS,
    },
    {
      keywords: ['how long last', 'lifespan', 'life span', 'hours', 'burn time',
                 'lumens', 'colour temperature', 'color temperature', 'kelvin'],
      answer:
        "We don't publish rated life or photometric figures, so I can't quote you " +
        'one. If you need the figure for a procurement form, ask us and we\'ll get ' +
        'it from the supplier — ' + HANDOFF,
      chips: CONTACT_CHIPS,
    },
    {
      keywords: ['fit my', 'fits my', 'compatible with my', 'will it work', 'work in my',
                 'work with my', 'does it fit', '20000', '20200', '21700', '25000',
                 '11800', '24000', '21110', 'panoptic'],
      answer:
        "I can't confirm a fitment myself — that one needs a person, because " +
        'instruments that look alike from the outside can take different lamps. ' +
        'Send us the make and model printed on your instrument head and we\'ll ' +
        'confirm the correct part number before you order. ' + HANDOFF,
      chips: CONTACT_CHIPS,
    },
  ];

  /** Answerable topics. Every `answer` is text published on the live site. */
  var TOPICS = {
    fitment: {
      keywords: ['fit', 'fits', 'fitment', 'which bulb', 'what bulb', 'compatible',
                 'compatibility', 'match', 'right bulb', 'correct bulb', 'model'],
      answer:
        "Happy to point you the right way. Diagnostic instrument lamps aren't " +
        'interchangeable, so we confirm by the model number printed on your ' +
        'instrument head before you order.<br><br>Do you already know which part ' +
        'number you need?',
      chips: PARTS.map(function (p) { return { label: p, topic: 'part:' + p }; })
        .concat([{ label: "I don't know", topic: 'unknown-part' }]),
    },
    parts: {
      keywords: ['part number', 'part numbers', 'models', 'range', 'which parts',
                 'what do you sell', 'catalogue', 'catalog'],
      answer:
        'ELVION supplies replacement bulbs matched to six diagnostic instrument ' +
        'model numbers: <strong>' + PARTS.join('</strong>, <strong>') + '</strong>.',
      chips: [{ label: 'See all models', href: 'shop.html#models' },
              { label: 'Which one do I need?', topic: 'fitment' }],
    },
    specs: {
      keywords: ['spec', 'specs', 'specification', 'specifications', 'voltage', 'volt',
                 'watt', 'wattage', 'halogen', 'technical', '3.5v', '2.5v'],
      answer:
        'Voltage can differ between lamp references, and we do not list voltage on the website yet. ' +
        'Please check the lamp voltage and lamp reference in your instrument\'s manual, or ask us, ' +
        'before ordering. Each model page shows its model number, a real photo and pack sizes.',
      chips: [{ label: 'Compare models', href: 'shop.html#models' },
              { label: 'How is it packaged?', topic: 'packaging' }],
    },
    packaging: {
      keywords: ['packaging', 'package', 'packed', 'blister', 'box', 'pack'],
      answer:
        'Pack sizes differ by listing. Most models are sold as a single bulb, and 03100-U is ' +
        'also offered in 2-pack and 5-pack listings. Check the pack size on the Amazon listing ' +
        'before you order, or ask us.',
      chips: [{ label: 'Compare models', href: 'shop.html#models' }],
    },
    oem: {
      keywords: ['welch allyn', 'welch', 'allyn', 'oem', 'original', 'genuine', 'brand',
                 'made by', 'official', 'authentic'],
      answer:
        '<strong>No.</strong> ELVION is an independent supplier of compatible ' +
        'replacement bulbs. Welch Allyn® is a registered trademark of its respective ' +
        'owner, and ELVION is not affiliated with, endorsed by, or sponsored by them. ' +
        'Our bulbs are described as <em>compatible with</em> those instruments — they ' +
        "are not original manufacturer parts, and we don't present them as such.",
      chips: [{ label: 'Read more on the FAQ', href: 'faq.html#specifications' }],
    },
    why: {
      keywords: ['why does', 'why matter', 'why correct', 'wrong bulb', 'mismatched',
                 'brightness', 'illumination'],
      answer:
        "A lamp matched to the instrument's voltage and fitment holds consistent " +
        'brightness and colour through an examination. That consistency is what lets ' +
        "a clinician judge what they're looking at from one patient to the next. A " +
        'mismatched lamp may sit incorrectly in the housing or produce inconsistent ' +
        'illumination.',
      chips: [{ label: 'Which bulb do I need?', topic: 'fitment' }],
    },
    buy: {
      keywords: ['buy', 'purchase', 'order', 'shop', 'where', 'amazon', 'store',
                 'storefront', 'stock'],
      answer:
        'Orders are placed and fulfilled through the ELVION storefront on Amazon, ' +
        'where current pricing is shown.',
      chips: [{ label: 'Open the Amazon storefront', href: AMAZON, external: true },
              { label: 'Ordering several?', topic: 'bulk' }],
    },
    bulk: {
      keywords: ['bulk', 'wholesale', 'quantity', 'quantities', 'many', 'multi',
                 'multiple', 'several', 'dozen', 'boxes', 'clinic order',
                 'large order', 'case', 'in bulk', 'for our clinic', 'for my clinic'],
      answer:
        'Yes. For multi-unit or clinic-level quantities, contact us directly and we ' +
        'can help with the order rather than having you work through a standard ' +
        'listing.',
      chips: CONTACT_CHIPS,
    },
    contact: {
      keywords: ['contact', 'talk', 'human', 'person', 'speak', 'call', 'phone',
                 'email', 'whatsapp', 'reach', 'someone', 'help'],
      answer:
        "Of course — here's how to reach us directly. We'll confirm the right part " +
        'number for your instrument before you order.',
      chips: CONTACT_CHIPS,
    },
  };

  /** Reply shown for a recognised part number — deliberately does NOT claim fitment. */
  function partAnswer(part) {
    return {
      answer:
        'Yes — <strong>' + part + '</strong> is one of the six part numbers we ' +
        "supply.<br><br>I won't confirm from here that it's the right lamp for your " +
        "instrument, though, because that depends on the specific model you're using. " +
        'Send us the model printed on your instrument head and we\'ll confirm it ' +
        'before you order.',
      chips: [{ label: 'Confirm my fitment', href: 'contact.html' },
              { label: 'WhatsApp us', href: WHATSAPP, external: true },
              { label: 'See this model', href: 'shop.html#m-' + part.toLowerCase() }],
    };
  }

  var GREETING = {
    answer:
      "Hello — I'm the ELVION assistant. I can answer the questions we're asked most " +
      'often. For anything about fitment for your specific instrument, I\'ll put you ' +
      'in touch with a person rather than guess.<br><br>What can I help with?',
    chips: MENU_CHIPS,
  };

  var FALLBACK = {
    answer:
      "I'm not confident I understood that one, and I'd rather not guess. You can " +
      'pick a topic below, or reach a person directly — ' + HANDOFF,
    chips: MENU_CHIPS.slice(0, 3).concat(CONTACT_CHIPS[0]),
  };

  // ── Matching ────────────────────────────────────────────────────────────

  function normalise(text) {
    return ' ' + String(text).toLowerCase().replace(/[^a-z0-9.\s-]/g, ' ')
      .replace(/\s+/g, ' ').trim() + ' ';
  }

  /** Look for one of the six part numbers written in any common form. */
  function findPart(text) {
    var compact = String(text).toUpperCase().replace(/[\s_]/g, '');
    for (var i = 0; i < PARTS.length; i++) {
      var bare = PARTS[i].replace('-U', '');
      if (compact.indexOf(PARTS[i]) !== -1 || compact.indexOf(bare) !== -1) return PARTS[i];
    }
    return null;
  }

  function scoreKeywords(haystack, keywords) {
    var score = 0;
    for (var i = 0; i < keywords.length; i++) {
      if (haystack.indexOf(' ' + keywords[i]) !== -1 || haystack.indexOf(keywords[i] + ' ') !== -1) {
        score += keywords[i].indexOf(' ') !== -1 ? 3 : 1; // phrases beat single words
      }
    }
    return score;
  }

  function resolve(input) {
    var text = normalise(input);

    // Guarded topics win outright — never answered from the knowledge base.
    for (var g = 0; g < GUARDED.length; g++) {
      if (scoreKeywords(text, GUARDED[g].keywords) > 0) {
        return { answer: GUARDED[g].answer, chips: GUARDED[g].chips };
      }
    }

    var part = findPart(input);
    if (part) return partAnswer(part);

    // "can I order 50 of them?" — a quantity next to an ordering word is a bulk
    // enquiry, not a general "where do I buy" question. Checked before scoring
    // because 'order' also belongs to the buy topic and would otherwise win.
    var quantity = text.match(/\b(\d{1,5})\b/);
    if (quantity && Number(quantity[1]) >= 5 && /order|buy|need|want|purchase|get/.test(text)) {
      return TOPICS.bulk;
    }

    var best = null;
    var bestScore = 0;
    for (var key in TOPICS) {
      if (!Object.prototype.hasOwnProperty.call(TOPICS, key)) continue;
      var score = scoreKeywords(text, TOPICS[key].keywords);
      if (score > bestScore) { bestScore = score; best = TOPICS[key]; }
    }
    return bestScore > 0 ? best : FALLBACK;
  }

  // ── UI ──────────────────────────────────────────────────────────────────

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function initChat() {
    if (document.querySelector('.elvion-chat')) return;

    var root = el('div', 'elvion-chat');
    root.setAttribute('data-elvion-chat', '');

    var launcher = el('button', 'ec-launcher');
    launcher.type = 'button';
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Open the ELVION assistant');
    launcher.innerHTML =
      '<span class="ec-launcher-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4.2-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/>' +
      '</svg></span><span class="ec-launcher-text">Ask about fitment</span>';

    var panel = el('div', 'ec-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'ELVION assistant');
    panel.hidden = true;

    panel.appendChild(el('div', 'ec-head',
      '<div class="ec-head-text">' +
      '<strong>ELVION assistant</strong>' +
      '<span>Automated · answers from our FAQ</span>' +
      '</div>' +
      '<button type="button" class="ec-close" aria-label="Close the assistant">&times;</button>'));

    var log = el('div', 'ec-log');
    log.setAttribute('role', 'log');
    log.setAttribute('aria-live', 'polite');
    log.setAttribute('aria-atomic', 'false');
    panel.appendChild(log);

    var form = el('form', 'ec-form');
    form.setAttribute('autocomplete', 'off');
    form.innerHTML =
      '<label class="ec-visually-hidden" for="ec-input">Type your question</label>' +
      '<input id="ec-input" class="ec-input" type="text" name="q" ' +
      'placeholder="Type your question…" maxlength="300">' +
      '<button type="submit" class="ec-send" aria-label="Send">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M4 12h15M13 6l6 6-6 6"/></svg></button>';
    panel.appendChild(form);

    panel.appendChild(el('p', 'ec-foot',
      'Automated assistant. Fitment is always confirmed by a person before you order.'));

    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);

    var input = form.querySelector('.ec-input');

    function scrollLog() { log.scrollTop = log.scrollHeight; }

    function addMessage(who, html) {
      var row = el('div', 'ec-msg ec-msg-' + who);
      row.appendChild(el('div', 'ec-bubble', html));
      log.appendChild(row);
      scrollLog();
      return row;
    }

    function addChips(chips) {
      if (!chips || !chips.length) return;
      var wrap = el('div', 'ec-chips');
      chips.forEach(function (chip) {
        if (!chip) return;
        var node;
        if (chip.href) {
          node = el('a', 'ec-chip', chip.label);
          node.href = chip.href;
          if (chip.external) { node.target = '_blank'; node.rel = 'noopener'; }
        } else {
          node = el('button', 'ec-chip', chip.label);
          node.type = 'button';
          node.addEventListener('click', function () {
            addMessage('user', chip.label);
            wrap.remove();
            respondToTopic(chip.topic, chip.label);
          });
        }
        wrap.appendChild(node);
      });
      log.appendChild(wrap);
      scrollLog();
    }

    /** Brief "typing" pause so replies don't appear instantly and unread. */
    function reply(result) {
      var typing = addMessage('bot', '<span class="ec-typing" aria-hidden="true">' +
        '<i></i><i></i><i></i></span>');
      typing.firstChild.classList.add('ec-bubble-typing');
      window.setTimeout(function () {
        typing.remove();
        addMessage('bot', result.answer);
        addChips(result.chips);
      }, 420);
    }

    function respondToTopic(topic, label) {
      if (!topic) { reply(resolve(label || '')); return; }
      if (topic.indexOf('part:') === 0) { reply(partAnswer(topic.slice(5))); return; }
      if (topic === 'unknown-part') {
        reply({
          answer:
            "That's fine — most people don't. Send us the make and model number " +
            "printed on your instrument head and we'll identify the correct part " +
            'number for you before you order.',
          chips: CONTACT_CHIPS,
        });
        return;
      }
      if (topic === 'menu') { reply(GREETING); return; }
      reply(TOPICS[topic] || FALLBACK);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = input.value.trim();
      if (!value) return;
      addMessage('user', escapeText(value));
      input.value = '';
      reply(resolve(value));
    });

    function escapeText(value) {
      return String(value)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    var started = false;
    function openPanel() {
      panel.hidden = false;
      root.classList.add('is-open');
      launcher.setAttribute('aria-expanded', 'true');
      launcher.setAttribute('aria-label', 'Close the ELVION assistant');
      if (!started) {
        started = true;
        addMessage('bot', GREETING.answer);
        addChips(GREETING.chips);
      }
      window.setTimeout(function () { input.focus(); }, 100);
    }

    function closePanel() {
      panel.hidden = true;
      root.classList.remove('is-open');
      launcher.setAttribute('aria-expanded', 'false');
      launcher.setAttribute('aria-label', 'Open the ELVION assistant');
      launcher.focus();
    }

    launcher.addEventListener('click', function () {
      if (panel.hidden) openPanel(); else closePanel();
    });
    panel.querySelector('.ec-close').addEventListener('click', closePanel);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !panel.hidden) closePanel();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }
})();
