var In = (M, k) => () => (k || M((k = { exports: {} }).exports, k), k.exports);
var Dn = In((Bn, Ce) => {
  /*! For license information please see index.js.LICENSE.txt */
  var Ln = { 2: (M) => {
    function k(x, E, P) {
      x instanceof RegExp && (x = S(x, P)), E instanceof RegExp && (E = S(E, P));
      var g = N(x, E, P);
      return g && { start: g[0], end: g[1], pre: P.slice(0, g[0]), body: P.slice(g[0] + x.length, g[1]), post: P.slice(g[1] + E.length) };
    }
    function S(x, E) {
      var P = E.match(x);
      return P ? P[0] : null;
    }
    function N(x, E, P) {
      var g, j, i, o, l, s = P.indexOf(x), c = P.indexOf(E, s + 1), f = s;
      if (s >= 0 && c > 0) {
        for (g = [], i = P.length; f >= 0 && !l; )
          f == s ? (g.push(f), s = P.indexOf(x, f + 1)) : g.length == 1 ? l = [g.pop(), c] : ((j = g.pop()) < i && (i = j, o = c), c = P.indexOf(E, f + 1)), f = s < c && s >= 0 ? s : c;
        g.length && (l = [i, o]);
      }
      return l;
    }
    M.exports = k, k.range = N;
  }, 101: function(M, k, S) {
    var N;
    M = S.nmd(M), function(x) {
      M && M.exports, typeof global == "object" && global;
      var E = function(o) {
        this.message = o;
      };
      (E.prototype = new Error()).name = "InvalidCharacterError";
      var P = function(o) {
        throw new E(o);
      }, g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", j = /[\t\n\f\r ]/g, i = { encode: function(o) {
        o = String(o), /[^\0-\xFF]/.test(o) && P("The string to be encoded contains characters outside of the Latin1 range.");
        for (var l, s, c, f, v = o.length % 3, b = "", L = -1, h = o.length - v; ++L < h; )
          l = o.charCodeAt(L) << 16, s = o.charCodeAt(++L) << 8, c = o.charCodeAt(++L), b += g.charAt((f = l + s + c) >> 18 & 63) + g.charAt(f >> 12 & 63) + g.charAt(f >> 6 & 63) + g.charAt(63 & f);
        return v == 2 ? (l = o.charCodeAt(L) << 8, s = o.charCodeAt(++L), b += g.charAt((f = l + s) >> 10) + g.charAt(f >> 4 & 63) + g.charAt(f << 2 & 63) + "=") : v == 1 && (f = o.charCodeAt(L), b += g.charAt(f >> 2) + g.charAt(f << 4 & 63) + "=="), b;
      }, decode: function(o) {
        var l = (o = String(o).replace(j, "")).length;
        l % 4 == 0 && (l = (o = o.replace(/==?$/, "")).length), (l % 4 == 1 || /[^+a-zA-Z0-9/]/.test(o)) && P("Invalid character: the string to be decoded is not correctly encoded.");
        for (var s, c, f = 0, v = "", b = -1; ++b < l; )
          c = g.indexOf(o.charAt(b)), s = f % 4 ? 64 * s + c : c, f++ % 4 && (v += String.fromCharCode(255 & s >> (-2 * f & 6)));
        return v;
      }, version: "1.0.0" };
      (N = (function() {
        return i;
      }).call(k, S, k, M)) === void 0 || (M.exports = N);
    }();
  }, 172: (M, k) => {
    k.d = function(S) {
      if (!S)
        return 0;
      for (var N = (S = S.toString()).length, x = S.length; x--; ) {
        var E = S.charCodeAt(x);
        56320 <= E && E <= 57343 && x--, 127 < E && E <= 2047 ? N++ : 2047 < E && E <= 65535 && (N += 2);
      }
      return N;
    };
  }, 526: (M) => {
    var k = { utf8: { stringToBytes: function(S) {
      return k.bin.stringToBytes(unescape(encodeURIComponent(S)));
    }, bytesToString: function(S) {
      return decodeURIComponent(escape(k.bin.bytesToString(S)));
    } }, bin: { stringToBytes: function(S) {
      for (var N = [], x = 0; x < S.length; x++)
        N.push(255 & S.charCodeAt(x));
      return N;
    }, bytesToString: function(S) {
      for (var N = [], x = 0; x < S.length; x++)
        N.push(String.fromCharCode(S[x]));
      return N.join("");
    } } };
    M.exports = k;
  }, 298: (M) => {
    var k, S;
    k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", S = { rotl: function(N, x) {
      return N << x | N >>> 32 - x;
    }, rotr: function(N, x) {
      return N << 32 - x | N >>> x;
    }, endian: function(N) {
      if (N.constructor == Number)
        return 16711935 & S.rotl(N, 8) | 4278255360 & S.rotl(N, 24);
      for (var x = 0; x < N.length; x++)
        N[x] = S.endian(N[x]);
      return N;
    }, randomBytes: function(N) {
      for (var x = []; N > 0; N--)
        x.push(Math.floor(256 * Math.random()));
      return x;
    }, bytesToWords: function(N) {
      for (var x = [], E = 0, P = 0; E < N.length; E++, P += 8)
        x[P >>> 5] |= N[E] << 24 - P % 32;
      return x;
    }, wordsToBytes: function(N) {
      for (var x = [], E = 0; E < 32 * N.length; E += 8)
        x.push(N[E >>> 5] >>> 24 - E % 32 & 255);
      return x;
    }, bytesToHex: function(N) {
      for (var x = [], E = 0; E < N.length; E++)
        x.push((N[E] >>> 4).toString(16)), x.push((15 & N[E]).toString(16));
      return x.join("");
    }, hexToBytes: function(N) {
      for (var x = [], E = 0; E < N.length; E += 2)
        x.push(parseInt(N.substr(E, 2), 16));
      return x;
    }, bytesToBase64: function(N) {
      for (var x = [], E = 0; E < N.length; E += 3)
        for (var P = N[E] << 16 | N[E + 1] << 8 | N[E + 2], g = 0; g < 4; g++)
          8 * E + 6 * g <= 8 * N.length ? x.push(k.charAt(P >>> 6 * (3 - g) & 63)) : x.push("=");
      return x.join("");
    }, base64ToBytes: function(N) {
      N = N.replace(/[^A-Z0-9+\/]/gi, "");
      for (var x = [], E = 0, P = 0; E < N.length; P = ++E % 4)
        P != 0 && x.push((k.indexOf(N.charAt(E - 1)) & Math.pow(2, -2 * P + 8) - 1) << 2 * P | k.indexOf(N.charAt(E)) >>> 6 - 2 * P);
      return x;
    } }, M.exports = S;
  }, 635: (M, k, S) => {
    const N = S(31), x = S(338), E = S(221);
    M.exports = { XMLParser: x, XMLValidator: N, XMLBuilder: E };
  }, 705: (M, k) => {
    const S = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", N = "[" + S + "][" + S + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*", x = new RegExp("^" + N + "$");
    k.isExist = function(E) {
      return E !== void 0;
    }, k.isEmptyObject = function(E) {
      return Object.keys(E).length === 0;
    }, k.merge = function(E, P, g) {
      if (P) {
        const j = Object.keys(P), i = j.length;
        for (let o = 0; o < i; o++)
          E[j[o]] = g === "strict" ? [P[j[o]]] : P[j[o]];
      }
    }, k.getValue = function(E) {
      return k.isExist(E) ? E : "";
    }, k.isName = function(E) {
      return x.exec(E) != null;
    }, k.getAllMatches = function(E, P) {
      const g = [];
      let j = P.exec(E);
      for (; j; ) {
        const i = [];
        i.startIndex = P.lastIndex - j[0].length;
        const o = j.length;
        for (let l = 0; l < o; l++)
          i.push(j[l]);
        g.push(i), j = P.exec(E);
      }
      return g;
    }, k.nameRegexp = N;
  }, 31: (M, k, S) => {
    const N = S(705), x = { allowBooleanAttributes: !1, unpairedTags: [] };
    function E(h) {
      return h === " " || h === "	" || h === `
` || h === "\r";
    }
    function P(h, m) {
      const w = m;
      for (; m < h.length; m++)
        if (!(h[m] != "?" && h[m] != " ")) {
          const p = h.substr(w, m - w);
          if (m > 5 && p === "xml")
            return f("InvalidXml", "XML declaration allowed only at the start of the document.", b(h, m));
          if (h[m] == "?" && h[m + 1] == ">") {
            m++;
            break;
          }
        }
      return m;
    }
    function g(h, m) {
      if (h.length > m + 5 && h[m + 1] === "-" && h[m + 2] === "-") {
        for (m += 3; m < h.length; m++)
          if (h[m] === "-" && h[m + 1] === "-" && h[m + 2] === ">") {
            m += 2;
            break;
          }
      } else if (h.length > m + 8 && h[m + 1] === "D" && h[m + 2] === "O" && h[m + 3] === "C" && h[m + 4] === "T" && h[m + 5] === "Y" && h[m + 6] === "P" && h[m + 7] === "E") {
        let w = 1;
        for (m += 8; m < h.length; m++)
          if (h[m] === "<")
            w++;
          else if (h[m] === ">" && (w--, w === 0))
            break;
      } else if (h.length > m + 9 && h[m + 1] === "[" && h[m + 2] === "C" && h[m + 3] === "D" && h[m + 4] === "A" && h[m + 5] === "T" && h[m + 6] === "A" && h[m + 7] === "[") {
        for (m += 8; m < h.length; m++)
          if (h[m] === "]" && h[m + 1] === "]" && h[m + 2] === ">") {
            m += 2;
            break;
          }
      }
      return m;
    }
    k.validate = function(h, m) {
      m = Object.assign({}, x, m);
      const w = [];
      let p = !1, C = !1;
      h[0] === "\uFEFF" && (h = h.substr(1));
      for (let O = 0; O < h.length; O++)
        if (h[O] === "<" && h[O + 1] === "?") {
          if (O += 2, O = P(h, O), O.err)
            return O;
        } else {
          if (h[O] !== "<") {
            if (E(h[O]))
              continue;
            return f("InvalidChar", "char '" + h[O] + "' is not expected.", b(h, O));
          }
          {
            let _ = O;
            if (O++, h[O] === "!") {
              O = g(h, O);
              continue;
            }
            {
              let $ = !1;
              h[O] === "/" && ($ = !0, O++);
              let F = "";
              for (; O < h.length && h[O] !== ">" && h[O] !== " " && h[O] !== "	" && h[O] !== `
` && h[O] !== "\r"; O++)
                F += h[O];
              if (F = F.trim(), F[F.length - 1] === "/" && (F = F.substring(0, F.length - 1), O--), A = F, !N.isName(A)) {
                let G;
                return G = F.trim().length === 0 ? "Invalid space after '<'." : "Tag '" + F + "' is an invalid name.", f("InvalidTag", G, b(h, O));
              }
              const D = o(h, O);
              if (D === !1)
                return f("InvalidAttr", "Attributes for '" + F + "' have open quote.", b(h, O));
              let I = D.value;
              if (O = D.index, I[I.length - 1] === "/") {
                const G = O - I.length;
                I = I.substring(0, I.length - 1);
                const Q = s(I, m);
                if (Q !== !0)
                  return f(Q.err.code, Q.err.msg, b(h, G + Q.err.line));
                p = !0;
              } else if ($) {
                if (!D.tagClosed)
                  return f("InvalidTag", "Closing tag '" + F + "' doesn't have proper closing.", b(h, O));
                if (I.trim().length > 0)
                  return f("InvalidTag", "Closing tag '" + F + "' can't have attributes or invalid starting.", b(h, _));
                {
                  const G = w.pop();
                  if (F !== G.tagName) {
                    let Q = b(h, G.tagStartPos);
                    return f("InvalidTag", "Expected closing tag '" + G.tagName + "' (opened in line " + Q.line + ", col " + Q.col + ") instead of closing tag '" + F + "'.", b(h, _));
                  }
                  w.length == 0 && (C = !0);
                }
              } else {
                const G = s(I, m);
                if (G !== !0)
                  return f(G.err.code, G.err.msg, b(h, O - I.length + G.err.line));
                if (C === !0)
                  return f("InvalidXml", "Multiple possible root nodes found.", b(h, O));
                m.unpairedTags.indexOf(F) !== -1 || w.push({ tagName: F, tagStartPos: _ }), p = !0;
              }
              for (O++; O < h.length; O++)
                if (h[O] === "<") {
                  if (h[O + 1] === "!") {
                    O++, O = g(h, O);
                    continue;
                  }
                  if (h[O + 1] !== "?")
                    break;
                  if (O = P(h, ++O), O.err)
                    return O;
                } else if (h[O] === "&") {
                  const G = c(h, O);
                  if (G == -1)
                    return f("InvalidChar", "char '&' is not expected.", b(h, O));
                  O = G;
                } else if (C === !0 && !E(h[O]))
                  return f("InvalidXml", "Extra text at the end", b(h, O));
              h[O] === "<" && O--;
            }
          }
        }
      var A;
      return p ? w.length == 1 ? f("InvalidTag", "Unclosed tag '" + w[0].tagName + "'.", b(h, w[0].tagStartPos)) : !(w.length > 0) || f("InvalidXml", "Invalid '" + JSON.stringify(w.map((O) => O.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 }) : f("InvalidXml", "Start tag expected.", 1);
    };
    const j = '"', i = "'";
    function o(h, m) {
      let w = "", p = "", C = !1;
      for (; m < h.length; m++) {
        if (h[m] === j || h[m] === i)
          p === "" ? p = h[m] : p !== h[m] || (p = "");
        else if (h[m] === ">" && p === "") {
          C = !0;
          break;
        }
        w += h[m];
      }
      return p === "" && { value: w, index: m, tagClosed: C };
    }
    const l = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    function s(h, m) {
      const w = N.getAllMatches(h, l), p = {};
      for (let C = 0; C < w.length; C++) {
        if (w[C][1].length === 0)
          return f("InvalidAttr", "Attribute '" + w[C][2] + "' has no space in starting.", L(w[C]));
        if (w[C][3] !== void 0 && w[C][4] === void 0)
          return f("InvalidAttr", "Attribute '" + w[C][2] + "' is without value.", L(w[C]));
        if (w[C][3] === void 0 && !m.allowBooleanAttributes)
          return f("InvalidAttr", "boolean attribute '" + w[C][2] + "' is not allowed.", L(w[C]));
        const A = w[C][2];
        if (!v(A))
          return f("InvalidAttr", "Attribute '" + A + "' is an invalid name.", L(w[C]));
        if (p.hasOwnProperty(A))
          return f("InvalidAttr", "Attribute '" + A + "' is repeated.", L(w[C]));
        p[A] = 1;
      }
      return !0;
    }
    function c(h, m) {
      if (h[++m] === ";")
        return -1;
      if (h[m] === "#")
        return function(p, C) {
          let A = /\d/;
          for (p[C] === "x" && (C++, A = /[\da-fA-F]/); C < p.length; C++) {
            if (p[C] === ";")
              return C;
            if (!p[C].match(A))
              break;
          }
          return -1;
        }(h, ++m);
      let w = 0;
      for (; m < h.length; m++, w++)
        if (!(h[m].match(/\w/) && w < 20)) {
          if (h[m] === ";")
            break;
          return -1;
        }
      return m;
    }
    function f(h, m, w) {
      return { err: { code: h, msg: m, line: w.line || w, col: w.col } };
    }
    function v(h) {
      return N.isName(h);
    }
    function b(h, m) {
      const w = h.substring(0, m).split(/\r?\n/);
      return { line: w.length, col: w[w.length - 1].length + 1 };
    }
    function L(h) {
      return h.startIndex + h[1].length;
    }
  }, 221: (M, k, S) => {
    const N = S(87), x = { attributeNamePrefix: "@_", attributesGroupName: !1, textNodeName: "#text", ignoreAttributes: !0, cdataPropName: !1, format: !1, indentBy: "  ", suppressEmptyNode: !1, suppressUnpairedNode: !0, suppressBooleanAttributes: !0, tagValueProcessor: function(i, o) {
      return o;
    }, attributeValueProcessor: function(i, o) {
      return o;
    }, preserveOrder: !1, commentPropName: !1, unpairedTags: [], entities: [{ regex: new RegExp("&", "g"), val: "&amp;" }, { regex: new RegExp(">", "g"), val: "&gt;" }, { regex: new RegExp("<", "g"), val: "&lt;" }, { regex: new RegExp("'", "g"), val: "&apos;" }, { regex: new RegExp('"', "g"), val: "&quot;" }], processEntities: !0, stopNodes: [], oneListGroup: !1 };
    function E(i) {
      this.options = Object.assign({}, x, i), this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
        return !1;
      } : (this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = j), this.processTextOrObjNode = P, this.options.format ? (this.indentate = g, this.tagEndChar = `>
`, this.newLine = `
`) : (this.indentate = function() {
        return "";
      }, this.tagEndChar = ">", this.newLine = "");
    }
    function P(i, o, l) {
      const s = this.j2x(i, l + 1);
      return i[this.options.textNodeName] !== void 0 && Object.keys(i).length === 1 ? this.buildTextValNode(i[this.options.textNodeName], o, s.attrStr, l) : this.buildObjectNode(s.val, o, s.attrStr, l);
    }
    function g(i) {
      return this.options.indentBy.repeat(i);
    }
    function j(i) {
      return !(!i.startsWith(this.options.attributeNamePrefix) || i === this.options.textNodeName) && i.substr(this.attrPrefixLen);
    }
    E.prototype.build = function(i) {
      return this.options.preserveOrder ? N(i, this.options) : (Array.isArray(i) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (i = { [this.options.arrayNodeName]: i }), this.j2x(i, 0).val);
    }, E.prototype.j2x = function(i, o) {
      let l = "", s = "";
      for (let c in i)
        if (i[c] === void 0)
          this.isAttribute(c) && (s += "");
        else if (i[c] === null)
          this.isAttribute(c) ? s += "" : c[0] === "?" ? s += this.indentate(o) + "<" + c + "?" + this.tagEndChar : s += this.indentate(o) + "<" + c + "/" + this.tagEndChar;
        else if (i[c] instanceof Date)
          s += this.buildTextValNode(i[c], c, "", o);
        else if (typeof i[c] != "object") {
          const f = this.isAttribute(c);
          if (f)
            l += this.buildAttrPairStr(f, "" + i[c]);
          else if (c === this.options.textNodeName) {
            let v = this.options.tagValueProcessor(c, "" + i[c]);
            s += this.replaceEntitiesValue(v);
          } else
            s += this.buildTextValNode(i[c], c, "", o);
        } else if (Array.isArray(i[c])) {
          const f = i[c].length;
          let v = "";
          for (let b = 0; b < f; b++) {
            const L = i[c][b];
            L === void 0 || (L === null ? c[0] === "?" ? s += this.indentate(o) + "<" + c + "?" + this.tagEndChar : s += this.indentate(o) + "<" + c + "/" + this.tagEndChar : typeof L == "object" ? this.options.oneListGroup ? v += this.j2x(L, o + 1).val : v += this.processTextOrObjNode(L, c, o) : v += this.buildTextValNode(L, c, "", o));
          }
          this.options.oneListGroup && (v = this.buildObjectNode(v, c, "", o)), s += v;
        } else if (this.options.attributesGroupName && c === this.options.attributesGroupName) {
          const f = Object.keys(i[c]), v = f.length;
          for (let b = 0; b < v; b++)
            l += this.buildAttrPairStr(f[b], "" + i[c][f[b]]);
        } else
          s += this.processTextOrObjNode(i[c], c, o);
      return { attrStr: l, val: s };
    }, E.prototype.buildAttrPairStr = function(i, o) {
      return o = this.options.attributeValueProcessor(i, "" + o), o = this.replaceEntitiesValue(o), this.options.suppressBooleanAttributes && o === "true" ? " " + i : " " + i + '="' + o + '"';
    }, E.prototype.buildObjectNode = function(i, o, l, s) {
      if (i === "")
        return o[0] === "?" ? this.indentate(s) + "<" + o + l + "?" + this.tagEndChar : this.indentate(s) + "<" + o + l + this.closeTag(o) + this.tagEndChar;
      {
        let c = "</" + o + this.tagEndChar, f = "";
        return o[0] === "?" && (f = "?", c = ""), !l && l !== "" || i.indexOf("<") !== -1 ? this.options.commentPropName !== !1 && o === this.options.commentPropName && f.length === 0 ? this.indentate(s) + "<!--".concat(i, "-->") + this.newLine : this.indentate(s) + "<" + o + l + f + this.tagEndChar + i + this.indentate(s) + c : this.indentate(s) + "<" + o + l + f + ">" + i + c;
      }
    }, E.prototype.closeTag = function(i) {
      let o = "";
      return this.options.unpairedTags.indexOf(i) !== -1 ? this.options.suppressUnpairedNode || (o = "/") : o = this.options.suppressEmptyNode ? "/" : "></".concat(i), o;
    }, E.prototype.buildTextValNode = function(i, o, l, s) {
      if (this.options.cdataPropName !== !1 && o === this.options.cdataPropName)
        return this.indentate(s) + "<![CDATA[".concat(i, "]]>") + this.newLine;
      if (this.options.commentPropName !== !1 && o === this.options.commentPropName)
        return this.indentate(s) + "<!--".concat(i, "-->") + this.newLine;
      if (o[0] === "?")
        return this.indentate(s) + "<" + o + l + "?" + this.tagEndChar;
      {
        let c = this.options.tagValueProcessor(o, i);
        return c = this.replaceEntitiesValue(c), c === "" ? this.indentate(s) + "<" + o + l + this.closeTag(o) + this.tagEndChar : this.indentate(s) + "<" + o + l + ">" + c + "</" + o + this.tagEndChar;
      }
    }, E.prototype.replaceEntitiesValue = function(i) {
      if (i && i.length > 0 && this.options.processEntities)
        for (let o = 0; o < this.options.entities.length; o++) {
          const l = this.options.entities[o];
          i = i.replace(l.regex, l.val);
        }
      return i;
    }, M.exports = E;
  }, 87: (M) => {
    function k(P, g, j, i) {
      let o = "", l = !1;
      for (let s = 0; s < P.length; s++) {
        const c = P[s], f = S(c);
        let v = "";
        if (v = j.length === 0 ? f : "".concat(j, ".").concat(f), f === g.textNodeName) {
          let w = c[f];
          x(v, g) || (w = g.tagValueProcessor(f, w), w = E(w, g)), l && (o += i), o += w, l = !1;
          continue;
        }
        if (f === g.cdataPropName) {
          l && (o += i), o += "<![CDATA[".concat(c[f][0][g.textNodeName], "]]>"), l = !1;
          continue;
        }
        if (f === g.commentPropName) {
          o += i + "<!--".concat(c[f][0][g.textNodeName], "-->"), l = !0;
          continue;
        }
        if (f[0] === "?") {
          const w = N(c[":@"], g), p = f === "?xml" ? "" : i;
          let C = c[f][0][g.textNodeName];
          C = C.length !== 0 ? " " + C : "", o += p + "<".concat(f).concat(C).concat(w, "?>"), l = !0;
          continue;
        }
        let b = i;
        b !== "" && (b += g.indentBy);
        const L = N(c[":@"], g), h = i + "<".concat(f).concat(L), m = k(c[f], g, v, b);
        g.unpairedTags.indexOf(f) !== -1 ? g.suppressUnpairedNode ? o += h + ">" : o += h + "/>" : m && m.length !== 0 || !g.suppressEmptyNode ? m && m.endsWith(">") ? o += h + ">".concat(m).concat(i, "</").concat(f, ">") : (o += h + ">", m && i !== "" && (m.includes("/>") || m.includes("</")) ? o += i + g.indentBy + m + i : o += m, o += "</".concat(f, ">")) : o += h + "/>", l = !0;
      }
      return o;
    }
    function S(P) {
      const g = Object.keys(P);
      for (let j = 0; j < g.length; j++) {
        const i = g[j];
        if (i !== ":@")
          return i;
      }
    }
    function N(P, g) {
      let j = "";
      if (P && !g.ignoreAttributes)
        for (let i in P) {
          let o = g.attributeValueProcessor(i, P[i]);
          o = E(o, g), o === !0 && g.suppressBooleanAttributes ? j += " ".concat(i.substr(g.attributeNamePrefix.length)) : j += " ".concat(i.substr(g.attributeNamePrefix.length), '="').concat(o, '"');
        }
      return j;
    }
    function x(P, g) {
      let j = (P = P.substr(0, P.length - g.textNodeName.length - 1)).substr(P.lastIndexOf(".") + 1);
      for (let i in g.stopNodes)
        if (g.stopNodes[i] === P || g.stopNodes[i] === "*." + j)
          return !0;
      return !1;
    }
    function E(P, g) {
      if (P && P.length > 0 && g.processEntities)
        for (let j = 0; j < g.entities.length; j++) {
          const i = g.entities[j];
          P = P.replace(i.regex, i.val);
        }
      return P;
    }
    M.exports = function(P, g) {
      let j = "";
      return g.format && g.indentBy.length > 0 && (j = `
`), k(P, g, "", j);
    };
  }, 193: (M, k, S) => {
    const N = S(705);
    function x(l, s) {
      let c = "";
      for (; s < l.length && l[s] !== "'" && l[s] !== '"'; s++)
        c += l[s];
      if (c = c.trim(), c.indexOf(" ") !== -1)
        throw new Error("External entites are not supported");
      const f = l[s++];
      let v = "";
      for (; s < l.length && l[s] !== f; s++)
        v += l[s];
      return [c, v, s];
    }
    function E(l, s) {
      return l[s + 1] === "!" && l[s + 2] === "-" && l[s + 3] === "-";
    }
    function P(l, s) {
      return l[s + 1] === "!" && l[s + 2] === "E" && l[s + 3] === "N" && l[s + 4] === "T" && l[s + 5] === "I" && l[s + 6] === "T" && l[s + 7] === "Y";
    }
    function g(l, s) {
      return l[s + 1] === "!" && l[s + 2] === "E" && l[s + 3] === "L" && l[s + 4] === "E" && l[s + 5] === "M" && l[s + 6] === "E" && l[s + 7] === "N" && l[s + 8] === "T";
    }
    function j(l, s) {
      return l[s + 1] === "!" && l[s + 2] === "A" && l[s + 3] === "T" && l[s + 4] === "T" && l[s + 5] === "L" && l[s + 6] === "I" && l[s + 7] === "S" && l[s + 8] === "T";
    }
    function i(l, s) {
      return l[s + 1] === "!" && l[s + 2] === "N" && l[s + 3] === "O" && l[s + 4] === "T" && l[s + 5] === "A" && l[s + 6] === "T" && l[s + 7] === "I" && l[s + 8] === "O" && l[s + 9] === "N";
    }
    function o(l) {
      if (N.isName(l))
        return l;
      throw new Error("Invalid entity name ".concat(l));
    }
    M.exports = function(l, s) {
      const c = {};
      if (l[s + 3] !== "O" || l[s + 4] !== "C" || l[s + 5] !== "T" || l[s + 6] !== "Y" || l[s + 7] !== "P" || l[s + 8] !== "E")
        throw new Error("Invalid Tag instead of DOCTYPE");
      {
        s += 9;
        let f = 1, v = !1, b = !1, L = "";
        for (; s < l.length; s++)
          if (l[s] !== "<" || b)
            if (l[s] === ">") {
              if (b ? l[s - 1] === "-" && l[s - 2] === "-" && (b = !1, f--) : f--, f === 0)
                break;
            } else
              l[s] === "[" ? v = !0 : L += l[s];
          else {
            if (v && P(l, s))
              s += 7, [entityName, val, s] = x(l, s + 1), val.indexOf("&") === -1 && (c[o(entityName)] = { regx: RegExp("&".concat(entityName, ";"), "g"), val });
            else if (v && g(l, s))
              s += 8;
            else if (v && j(l, s))
              s += 8;
            else if (v && i(l, s))
              s += 9;
            else {
              if (!E)
                throw new Error("Invalid DOCTYPE");
              b = !0;
            }
            f++, L = "";
          }
        if (f !== 0)
          throw new Error("Unclosed DOCTYPE");
      }
      return { entities: c, i: s };
    };
  }, 63: (M, k) => {
    const S = { preserveOrder: !1, attributeNamePrefix: "@_", attributesGroupName: !1, textNodeName: "#text", ignoreAttributes: !0, removeNSPrefix: !1, allowBooleanAttributes: !1, parseTagValue: !0, parseAttributeValue: !1, trimValues: !0, cdataPropName: !1, numberParseOptions: { hex: !0, leadingZeros: !0, eNotation: !0 }, tagValueProcessor: function(N, x) {
      return x;
    }, attributeValueProcessor: function(N, x) {
      return x;
    }, stopNodes: [], alwaysCreateTextNode: !1, isArray: () => !1, commentPropName: !1, unpairedTags: [], processEntities: !0, htmlEntities: !1, ignoreDeclaration: !1, ignorePiTags: !1, transformTagName: !1, transformAttributeName: !1, updateTag: function(N, x, E) {
      return N;
    } };
    k.buildOptions = function(N) {
      return Object.assign({}, S, N);
    }, k.defaultOptions = S;
  }, 299: (M, k, S) => {
    const N = S(705), x = S(365), E = S(193), P = S(494);
    function g(p) {
      const C = Object.keys(p);
      for (let A = 0; A < C.length; A++) {
        const O = C[A];
        this.lastEntities[O] = { regex: new RegExp("&" + O + ";", "g"), val: p[O] };
      }
    }
    function j(p, C, A, O, _, $, F) {
      if (p !== void 0 && (this.options.trimValues && !O && (p = p.trim()), p.length > 0)) {
        F || (p = this.replaceEntitiesValue(p));
        const D = this.options.tagValueProcessor(C, p, A, _, $);
        return D == null ? p : typeof D != typeof p || D !== p ? D : this.options.trimValues || p.trim() === p ? w(p, this.options.parseTagValue, this.options.numberParseOptions) : p;
      }
    }
    function i(p) {
      if (this.options.removeNSPrefix) {
        const C = p.split(":"), A = p.charAt(0) === "/" ? "/" : "";
        if (C[0] === "xmlns")
          return "";
        C.length === 2 && (p = A + C[1]);
      }
      return p;
    }
    "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, N.nameRegexp);
    const o = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
    function l(p, C, A) {
      if (!this.options.ignoreAttributes && typeof p == "string") {
        const O = N.getAllMatches(p, o), _ = O.length, $ = {};
        for (let F = 0; F < _; F++) {
          const D = this.resolveNameSpace(O[F][1]);
          let I = O[F][4], G = this.options.attributeNamePrefix + D;
          if (D.length)
            if (this.options.transformAttributeName && (G = this.options.transformAttributeName(G)), G === "__proto__" && (G = "#__proto__"), I !== void 0) {
              this.options.trimValues && (I = I.trim()), I = this.replaceEntitiesValue(I);
              const Q = this.options.attributeValueProcessor(D, I, C);
              $[G] = Q == null ? I : typeof Q != typeof I || Q !== I ? Q : w(I, this.options.parseAttributeValue, this.options.numberParseOptions);
            } else
              this.options.allowBooleanAttributes && ($[G] = !0);
        }
        if (!Object.keys($).length)
          return;
        if (this.options.attributesGroupName) {
          const F = {};
          return F[this.options.attributesGroupName] = $, F;
        }
        return $;
      }
    }
    const s = function(p) {
      p = p.replace(/\r\n?/g, `
`);
      const C = new x("!xml");
      let A = C, O = "", _ = "";
      for (let $ = 0; $ < p.length; $++)
        if (p[$] === "<")
          if (p[$ + 1] === "/") {
            const F = L(p, ">", $, "Closing Tag is not closed.");
            let D = p.substring($ + 2, F).trim();
            if (this.options.removeNSPrefix) {
              const Q = D.indexOf(":");
              Q !== -1 && (D = D.substr(Q + 1));
            }
            this.options.transformTagName && (D = this.options.transformTagName(D)), A && (O = this.saveTextToParentTag(O, A, _));
            const I = _.substring(_.lastIndexOf(".") + 1);
            if (D && this.options.unpairedTags.indexOf(D) !== -1)
              throw new Error("Unpaired tag can not be used as closing tag: </".concat(D, ">"));
            let G = 0;
            I && this.options.unpairedTags.indexOf(I) !== -1 ? (G = _.lastIndexOf(".", _.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : G = _.lastIndexOf("."), _ = _.substring(0, G), A = this.tagsNodeStack.pop(), O = "", $ = F;
          } else if (p[$ + 1] === "?") {
            let F = h(p, $, !1, "?>");
            if (!F)
              throw new Error("Pi Tag is not closed.");
            if (O = this.saveTextToParentTag(O, A, _), !(this.options.ignoreDeclaration && F.tagName === "?xml" || this.options.ignorePiTags)) {
              const D = new x(F.tagName);
              D.add(this.options.textNodeName, ""), F.tagName !== F.tagExp && F.attrExpPresent && (D[":@"] = this.buildAttributesMap(F.tagExp, _, F.tagName)), this.addChild(A, D, _);
            }
            $ = F.closeIndex + 1;
          } else if (p.substr($ + 1, 3) === "!--") {
            const F = L(p, "-->", $ + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
              const D = p.substring($ + 4, F - 2);
              O = this.saveTextToParentTag(O, A, _), A.add(this.options.commentPropName, [{ [this.options.textNodeName]: D }]);
            }
            $ = F;
          } else if (p.substr($ + 1, 2) === "!D") {
            const F = E(p, $);
            this.docTypeEntities = F.entities, $ = F.i;
          } else if (p.substr($ + 1, 2) === "![") {
            const F = L(p, "]]>", $, "CDATA is not closed.") - 2, D = p.substring($ + 9, F);
            if (O = this.saveTextToParentTag(O, A, _), this.options.cdataPropName)
              A.add(this.options.cdataPropName, [{ [this.options.textNodeName]: D }]);
            else {
              let I = this.parseTextData(D, A.tagname, _, !0, !1, !0);
              I == null && (I = ""), A.add(this.options.textNodeName, I);
            }
            $ = F + 2;
          } else {
            let F = h(p, $, this.options.removeNSPrefix), D = F.tagName, I = F.tagExp, G = F.attrExpPresent, Q = F.closeIndex;
            this.options.transformTagName && (D = this.options.transformTagName(D)), A && O && A.tagname !== "!xml" && (O = this.saveTextToParentTag(O, A, _, !1));
            const ut = A;
            if (ut && this.options.unpairedTags.indexOf(ut.tagname) !== -1 && (A = this.tagsNodeStack.pop(), _ = _.substring(0, _.lastIndexOf("."))), D !== C.tagname && (_ += _ ? "." + D : D), this.isItStopNode(this.options.stopNodes, _, D)) {
              let J = "";
              if (I.length > 0 && I.lastIndexOf("/") === I.length - 1)
                $ = F.closeIndex;
              else if (this.options.unpairedTags.indexOf(D) !== -1)
                $ = F.closeIndex;
              else {
                const ot = this.readStopNodeData(p, D, Q + 1);
                if (!ot)
                  throw new Error("Unexpected end of ".concat(D));
                $ = ot.i, J = ot.tagContent;
              }
              const nt = new x(D);
              D !== I && G && (nt[":@"] = this.buildAttributesMap(I, _, D)), J && (J = this.parseTextData(J, D, _, !0, G, !0, !0)), _ = _.substr(0, _.lastIndexOf(".")), nt.add(this.options.textNodeName, J), this.addChild(A, nt, _);
            } else {
              if (I.length > 0 && I.lastIndexOf("/") === I.length - 1) {
                D[D.length - 1] === "/" ? (D = D.substr(0, D.length - 1), _ = _.substr(0, _.length - 1), I = D) : I = I.substr(0, I.length - 1), this.options.transformTagName && (D = this.options.transformTagName(D));
                const J = new x(D);
                D !== I && G && (J[":@"] = this.buildAttributesMap(I, _, D)), this.addChild(A, J, _), _ = _.substr(0, _.lastIndexOf("."));
              } else {
                const J = new x(D);
                this.tagsNodeStack.push(A), D !== I && G && (J[":@"] = this.buildAttributesMap(I, _, D)), this.addChild(A, J, _), A = J;
              }
              O = "", $ = Q;
            }
          }
        else
          O += p[$];
      return C.child;
    };
    function c(p, C, A) {
      const O = this.options.updateTag(C.tagname, A, C[":@"]);
      O === !1 || (typeof O == "string" && (C.tagname = O), p.addChild(C));
    }
    const f = function(p) {
      if (this.options.processEntities) {
        for (let C in this.docTypeEntities) {
          const A = this.docTypeEntities[C];
          p = p.replace(A.regx, A.val);
        }
        for (let C in this.lastEntities) {
          const A = this.lastEntities[C];
          p = p.replace(A.regex, A.val);
        }
        if (this.options.htmlEntities)
          for (let C in this.htmlEntities) {
            const A = this.htmlEntities[C];
            p = p.replace(A.regex, A.val);
          }
        p = p.replace(this.ampEntity.regex, this.ampEntity.val);
      }
      return p;
    };
    function v(p, C, A, O) {
      return p && (O === void 0 && (O = Object.keys(C.child).length === 0), (p = this.parseTextData(p, C.tagname, A, !1, !!C[":@"] && Object.keys(C[":@"]).length !== 0, O)) !== void 0 && p !== "" && C.add(this.options.textNodeName, p), p = ""), p;
    }
    function b(p, C, A) {
      const O = "*." + A;
      for (const _ in p) {
        const $ = p[_];
        if (O === $ || C === $)
          return !0;
      }
      return !1;
    }
    function L(p, C, A, O) {
      const _ = p.indexOf(C, A);
      if (_ === -1)
        throw new Error(O);
      return _ + C.length - 1;
    }
    function h(p, C, A) {
      const O = function(G, Q) {
        let ut, J = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ">", nt = "";
        for (let ot = Q; ot < G.length; ot++) {
          let ct = G[ot];
          if (ut)
            ct === ut && (ut = "");
          else if (ct === '"' || ct === "'")
            ut = ct;
          else if (ct === J[0]) {
            if (!J[1])
              return { data: nt, index: ot };
            if (G[ot + 1] === J[1])
              return { data: nt, index: ot };
          } else
            ct === "	" && (ct = " ");
          nt += ct;
        }
      }(p, C + 1, arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ">");
      if (!O)
        return;
      let _ = O.data;
      const $ = O.index, F = _.search(/\s/);
      let D = _, I = !0;
      if (F !== -1 && (D = _.substr(0, F).replace(/\s\s*$/, ""), _ = _.substr(F + 1)), A) {
        const G = D.indexOf(":");
        G !== -1 && (D = D.substr(G + 1), I = D !== O.data.substr(G + 1));
      }
      return { tagName: D, tagExp: _, closeIndex: $, attrExpPresent: I };
    }
    function m(p, C, A) {
      const O = A;
      let _ = 1;
      for (; A < p.length; A++)
        if (p[A] === "<")
          if (p[A + 1] === "/") {
            const $ = L(p, ">", A, "".concat(C, " is not closed"));
            if (p.substring(A + 2, $).trim() === C && (_--, _ === 0))
              return { tagContent: p.substring(O, A), i: $ };
            A = $;
          } else if (p[A + 1] === "?")
            A = L(p, "?>", A + 1, "StopNode is not closed.");
          else if (p.substr(A + 1, 3) === "!--")
            A = L(p, "-->", A + 3, "StopNode is not closed.");
          else if (p.substr(A + 1, 2) === "![")
            A = L(p, "]]>", A, "StopNode is not closed.") - 2;
          else {
            const $ = h(p, A, ">");
            $ && (($ && $.tagName) === C && $.tagExp[$.tagExp.length - 1] !== "/" && _++, A = $.closeIndex);
          }
    }
    function w(p, C, A) {
      if (C && typeof p == "string") {
        const O = p.trim();
        return O === "true" || O !== "false" && P(p, A);
      }
      return N.isExist(p) ? p : "";
    }
    M.exports = class {
      constructor(p) {
        this.options = p, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = { apos: { regex: /&(apos|#39|#x27);/g, val: "'" }, gt: { regex: /&(gt|#62|#x3E);/g, val: ">" }, lt: { regex: /&(lt|#60|#x3C);/g, val: "<" }, quot: { regex: /&(quot|#34|#x22);/g, val: '"' } }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = { space: { regex: /&(nbsp|#160);/g, val: " " }, cent: { regex: /&(cent|#162);/g, val: "¢" }, pound: { regex: /&(pound|#163);/g, val: "£" }, yen: { regex: /&(yen|#165);/g, val: "¥" }, euro: { regex: /&(euro|#8364);/g, val: "€" }, copyright: { regex: /&(copy|#169);/g, val: "©" }, reg: { regex: /&(reg|#174);/g, val: "®" }, inr: { regex: /&(inr|#8377);/g, val: "₹" } }, this.addExternalEntities = g, this.parseXml = s, this.parseTextData = j, this.resolveNameSpace = i, this.buildAttributesMap = l, this.isItStopNode = b, this.replaceEntitiesValue = f, this.readStopNodeData = m, this.saveTextToParentTag = v, this.addChild = c;
      }
    };
  }, 338: (M, k, S) => {
    const { buildOptions: N } = S(63), x = S(299), { prettify: E } = S(728), P = S(31);
    M.exports = class {
      constructor(g) {
        this.externalEntities = {}, this.options = N(g);
      }
      parse(g, j) {
        if (typeof g != "string") {
          if (!g.toString)
            throw new Error("XML data is accepted in String or Bytes[] form.");
          g = g.toString();
        }
        if (j) {
          j === !0 && (j = {});
          const l = P.validate(g, j);
          if (l !== !0)
            throw Error("".concat(l.err.msg, ":").concat(l.err.line, ":").concat(l.err.col));
        }
        const i = new x(this.options);
        i.addExternalEntities(this.externalEntities);
        const o = i.parseXml(g);
        return this.options.preserveOrder || o === void 0 ? o : E(o, this.options);
      }
      addEntity(g, j) {
        if (j.indexOf("&") !== -1)
          throw new Error("Entity value can't have '&'");
        if (g.indexOf("&") !== -1 || g.indexOf(";") !== -1)
          throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        if (j === "&")
          throw new Error("An entity with value '&' is not permitted");
        this.externalEntities[g] = j;
      }
    };
  }, 728: (M, k) => {
    function S(P, g, j) {
      let i;
      const o = {};
      for (let l = 0; l < P.length; l++) {
        const s = P[l], c = N(s);
        let f = "";
        if (f = j === void 0 ? c : j + "." + c, c === g.textNodeName)
          i === void 0 ? i = s[c] : i += "" + s[c];
        else {
          if (c === void 0)
            continue;
          if (s[c]) {
            let v = S(s[c], g, f);
            const b = E(v, g);
            s[":@"] ? x(v, s[":@"], f, g) : Object.keys(v).length !== 1 || v[g.textNodeName] === void 0 || g.alwaysCreateTextNode ? Object.keys(v).length === 0 && (g.alwaysCreateTextNode ? v[g.textNodeName] = "" : v = "") : v = v[g.textNodeName], o[c] !== void 0 && o.hasOwnProperty(c) ? (Array.isArray(o[c]) || (o[c] = [o[c]]), o[c].push(v)) : g.isArray(c, f, b) ? o[c] = [v] : o[c] = v;
          }
        }
      }
      return typeof i == "string" ? i.length > 0 && (o[g.textNodeName] = i) : i !== void 0 && (o[g.textNodeName] = i), o;
    }
    function N(P) {
      const g = Object.keys(P);
      for (let j = 0; j < g.length; j++) {
        const i = g[j];
        if (i !== ":@")
          return i;
      }
    }
    function x(P, g, j, i) {
      if (g) {
        const o = Object.keys(g), l = o.length;
        for (let s = 0; s < l; s++) {
          const c = o[s];
          i.isArray(c, j + "." + c, !0, !0) ? P[c] = [g[c]] : P[c] = g[c];
        }
      }
    }
    function E(P, g) {
      const { textNodeName: j } = g, i = Object.keys(P).length;
      return i === 0 || !(i !== 1 || !P[j] && typeof P[j] != "boolean" && P[j] !== 0);
    }
    k.prettify = function(P, g) {
      return S(P, g);
    };
  }, 365: (M) => {
    M.exports = class {
      constructor(k) {
        this.tagname = k, this.child = [], this[":@"] = {};
      }
      add(k, S) {
        k === "__proto__" && (k = "#__proto__"), this.child.push({ [k]: S });
      }
      addChild(k) {
        k.tagname === "__proto__" && (k.tagname = "#__proto__"), k[":@"] && Object.keys(k[":@"]).length > 0 ? this.child.push({ [k.tagname]: k.child, ":@": k[":@"] }) : this.child.push({ [k.tagname]: k.child });
      }
    };
  }, 135: (M) => {
    function k(S) {
      return !!S.constructor && typeof S.constructor.isBuffer == "function" && S.constructor.isBuffer(S);
    }
    M.exports = function(S) {
      return S != null && (k(S) || function(N) {
        return typeof N.readFloatLE == "function" && typeof N.slice == "function" && k(N.slice(0, 0));
      }(S) || !!S._isBuffer);
    };
  }, 542: (M, k, S) => {
    var N, x, E, P, g;
    N = S(298), x = S(526).utf8, E = S(135), P = S(526).bin, (g = function(j, i) {
      j.constructor == String ? j = i && i.encoding === "binary" ? P.stringToBytes(j) : x.stringToBytes(j) : E(j) ? j = Array.prototype.slice.call(j, 0) : Array.isArray(j) || j.constructor === Uint8Array || (j = j.toString());
      for (var o = N.bytesToWords(j), l = 8 * j.length, s = 1732584193, c = -271733879, f = -1732584194, v = 271733878, b = 0; b < o.length; b++)
        o[b] = 16711935 & (o[b] << 8 | o[b] >>> 24) | 4278255360 & (o[b] << 24 | o[b] >>> 8);
      o[l >>> 5] |= 128 << l % 32, o[14 + (l + 64 >>> 9 << 4)] = l;
      var L = g._ff, h = g._gg, m = g._hh, w = g._ii;
      for (b = 0; b < o.length; b += 16) {
        var p = s, C = c, A = f, O = v;
        s = L(s, c, f, v, o[b + 0], 7, -680876936), v = L(v, s, c, f, o[b + 1], 12, -389564586), f = L(f, v, s, c, o[b + 2], 17, 606105819), c = L(c, f, v, s, o[b + 3], 22, -1044525330), s = L(s, c, f, v, o[b + 4], 7, -176418897), v = L(v, s, c, f, o[b + 5], 12, 1200080426), f = L(f, v, s, c, o[b + 6], 17, -1473231341), c = L(c, f, v, s, o[b + 7], 22, -45705983), s = L(s, c, f, v, o[b + 8], 7, 1770035416), v = L(v, s, c, f, o[b + 9], 12, -1958414417), f = L(f, v, s, c, o[b + 10], 17, -42063), c = L(c, f, v, s, o[b + 11], 22, -1990404162), s = L(s, c, f, v, o[b + 12], 7, 1804603682), v = L(v, s, c, f, o[b + 13], 12, -40341101), f = L(f, v, s, c, o[b + 14], 17, -1502002290), s = h(s, c = L(c, f, v, s, o[b + 15], 22, 1236535329), f, v, o[b + 1], 5, -165796510), v = h(v, s, c, f, o[b + 6], 9, -1069501632), f = h(f, v, s, c, o[b + 11], 14, 643717713), c = h(c, f, v, s, o[b + 0], 20, -373897302), s = h(s, c, f, v, o[b + 5], 5, -701558691), v = h(v, s, c, f, o[b + 10], 9, 38016083), f = h(f, v, s, c, o[b + 15], 14, -660478335), c = h(c, f, v, s, o[b + 4], 20, -405537848), s = h(s, c, f, v, o[b + 9], 5, 568446438), v = h(v, s, c, f, o[b + 14], 9, -1019803690), f = h(f, v, s, c, o[b + 3], 14, -187363961), c = h(c, f, v, s, o[b + 8], 20, 1163531501), s = h(s, c, f, v, o[b + 13], 5, -1444681467), v = h(v, s, c, f, o[b + 2], 9, -51403784), f = h(f, v, s, c, o[b + 7], 14, 1735328473), s = m(s, c = h(c, f, v, s, o[b + 12], 20, -1926607734), f, v, o[b + 5], 4, -378558), v = m(v, s, c, f, o[b + 8], 11, -2022574463), f = m(f, v, s, c, o[b + 11], 16, 1839030562), c = m(c, f, v, s, o[b + 14], 23, -35309556), s = m(s, c, f, v, o[b + 1], 4, -1530992060), v = m(v, s, c, f, o[b + 4], 11, 1272893353), f = m(f, v, s, c, o[b + 7], 16, -155497632), c = m(c, f, v, s, o[b + 10], 23, -1094730640), s = m(s, c, f, v, o[b + 13], 4, 681279174), v = m(v, s, c, f, o[b + 0], 11, -358537222), f = m(f, v, s, c, o[b + 3], 16, -722521979), c = m(c, f, v, s, o[b + 6], 23, 76029189), s = m(s, c, f, v, o[b + 9], 4, -640364487), v = m(v, s, c, f, o[b + 12], 11, -421815835), f = m(f, v, s, c, o[b + 15], 16, 530742520), s = w(s, c = m(c, f, v, s, o[b + 2], 23, -995338651), f, v, o[b + 0], 6, -198630844), v = w(v, s, c, f, o[b + 7], 10, 1126891415), f = w(f, v, s, c, o[b + 14], 15, -1416354905), c = w(c, f, v, s, o[b + 5], 21, -57434055), s = w(s, c, f, v, o[b + 12], 6, 1700485571), v = w(v, s, c, f, o[b + 3], 10, -1894986606), f = w(f, v, s, c, o[b + 10], 15, -1051523), c = w(c, f, v, s, o[b + 1], 21, -2054922799), s = w(s, c, f, v, o[b + 8], 6, 1873313359), v = w(v, s, c, f, o[b + 15], 10, -30611744), f = w(f, v, s, c, o[b + 6], 15, -1560198380), c = w(c, f, v, s, o[b + 13], 21, 1309151649), s = w(s, c, f, v, o[b + 4], 6, -145523070), v = w(v, s, c, f, o[b + 11], 10, -1120210379), f = w(f, v, s, c, o[b + 2], 15, 718787259), c = w(c, f, v, s, o[b + 9], 21, -343485551), s = s + p >>> 0, c = c + C >>> 0, f = f + A >>> 0, v = v + O >>> 0;
      }
      return N.endian([s, c, f, v]);
    })._ff = function(j, i, o, l, s, c, f) {
      var v = j + (i & o | ~i & l) + (s >>> 0) + f;
      return (v << c | v >>> 32 - c) + i;
    }, g._gg = function(j, i, o, l, s, c, f) {
      var v = j + (i & l | o & ~l) + (s >>> 0) + f;
      return (v << c | v >>> 32 - c) + i;
    }, g._hh = function(j, i, o, l, s, c, f) {
      var v = j + (i ^ o ^ l) + (s >>> 0) + f;
      return (v << c | v >>> 32 - c) + i;
    }, g._ii = function(j, i, o, l, s, c, f) {
      var v = j + (o ^ (i | ~l)) + (s >>> 0) + f;
      return (v << c | v >>> 32 - c) + i;
    }, g._blocksize = 16, g._digestsize = 16, M.exports = function(j, i) {
      if (j == null)
        throw new Error("Illegal argument " + j);
      var o = N.wordsToBytes(g(j, i));
      return i && i.asBytes ? o : i && i.asString ? P.bytesToString(o) : N.bytesToHex(o);
    };
  }, 285: (M, k, S) => {
    var N = S(2);
    M.exports = function(L) {
      return L ? (L.substr(0, 2) === "{}" && (L = "\\{\\}" + L.substr(2)), b(function(h) {
        return h.split("\\\\").join(x).split("\\{").join(E).split("\\}").join(P).split("\\,").join(g).split("\\.").join(j);
      }(L), !0).map(o)) : [];
    };
    var x = "\0SLASH" + Math.random() + "\0", E = "\0OPEN" + Math.random() + "\0", P = "\0CLOSE" + Math.random() + "\0", g = "\0COMMA" + Math.random() + "\0", j = "\0PERIOD" + Math.random() + "\0";
    function i(L) {
      return parseInt(L, 10) == L ? parseInt(L, 10) : L.charCodeAt(0);
    }
    function o(L) {
      return L.split(x).join("\\").split(E).join("{").split(P).join("}").split(g).join(",").split(j).join(".");
    }
    function l(L) {
      if (!L)
        return [""];
      var h = [], m = N("{", "}", L);
      if (!m)
        return L.split(",");
      var w = m.pre, p = m.body, C = m.post, A = w.split(",");
      A[A.length - 1] += "{" + p + "}";
      var O = l(C);
      return C.length && (A[A.length - 1] += O.shift(), A.push.apply(A, O)), h.push.apply(h, A), h;
    }
    function s(L) {
      return "{" + L + "}";
    }
    function c(L) {
      return /^-?0\d/.test(L);
    }
    function f(L, h) {
      return L <= h;
    }
    function v(L, h) {
      return L >= h;
    }
    function b(L, h) {
      var m = [], w = N("{", "}", L);
      if (!w)
        return [L];
      var p = w.pre, C = w.post.length ? b(w.post, !1) : [""];
      if (/\$$/.test(w.pre))
        for (var A = 0; A < C.length; A++) {
          var O = p + "{" + w.body + "}" + C[A];
          m.push(O);
        }
      else {
        var _, $, F = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(w.body), D = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(w.body), I = F || D, G = w.body.indexOf(",") >= 0;
        if (!I && !G)
          return w.post.match(/,.*\}/) ? b(L = w.pre + "{" + w.body + P + w.post) : [L];
        if (I)
          _ = w.body.split(/\.\./);
        else if ((_ = l(w.body)).length === 1 && (_ = b(_[0], !1).map(s)).length === 1)
          return C.map(function(Dt) {
            return w.pre + _[0] + Dt;
          });
        if (I) {
          var Q = i(_[0]), ut = i(_[1]), J = Math.max(_[0].length, _[1].length), nt = _.length == 3 ? Math.abs(i(_[2])) : 1, ot = f;
          ut < Q && (nt *= -1, ot = v);
          var ct = _.some(c);
          $ = [];
          for (var dt = Q; ot(dt, ut); dt += nt) {
            var bt;
            if (D)
              (bt = String.fromCharCode(dt)) === "\\" && (bt = "");
            else if (bt = String(dt), ct) {
              var kt = J - bt.length;
              if (kt > 0) {
                var Ot = new Array(kt + 1).join("0");
                bt = dt < 0 ? "-" + Ot + bt.slice(1) : Ot + bt;
              }
            }
            $.push(bt);
          }
        } else {
          $ = [];
          for (var xt = 0; xt < _.length; xt++)
            $.push.apply($, b(_[xt], !1));
        }
        for (xt = 0; xt < $.length; xt++)
          for (A = 0; A < C.length; A++)
            O = p + $[xt] + C[A], (!h || I || O) && m.push(O);
      }
      return m;
    }
  }, 829: (M) => {
    function k(i) {
      return k = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
        return typeof o;
      } : function(o) {
        return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
      }, k(i);
    }
    function S(i) {
      var o = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return S = function(l) {
        if (l === null || (s = l, Function.toString.call(s).indexOf("[native code]") === -1))
          return l;
        var s;
        if (typeof l != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (o !== void 0) {
          if (o.has(l))
            return o.get(l);
          o.set(l, c);
        }
        function c() {
          return N(l, arguments, E(this).constructor);
        }
        return c.prototype = Object.create(l.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), x(c, l);
      }, S(i);
    }
    function N(i, o, l) {
      return N = function() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
          return !1;
        if (typeof Proxy == "function")
          return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }() ? Reflect.construct : function(s, c, f) {
        var v = [null];
        v.push.apply(v, c);
        var b = new (Function.bind.apply(s, v))();
        return f && x(b, f.prototype), b;
      }, N.apply(null, arguments);
    }
    function x(i, o) {
      return x = Object.setPrototypeOf || function(l, s) {
        return l.__proto__ = s, l;
      }, x(i, o);
    }
    function E(i) {
      return E = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }, E(i);
    }
    var P = function(i) {
      function o(l) {
        var s;
        return function(c, f) {
          if (!(c instanceof f))
            throw new TypeError("Cannot call a class as a function");
        }(this, o), (s = function(c, f) {
          return !f || k(f) !== "object" && typeof f != "function" ? function(v) {
            if (v === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v;
          }(c) : f;
        }(this, E(o).call(this, l))).name = "ObjectPrototypeMutationError", s;
      }
      return function(l, s) {
        if (typeof s != "function" && s !== null)
          throw new TypeError("Super expression must either be null or a function");
        l.prototype = Object.create(s && s.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), s && x(l, s);
      }(o, i), o;
    }(S(Error));
    function g(i, o) {
      for (var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, s = o.split("."), c = s.length, f = function(L) {
        var h = s[L];
        if (!i)
          return { v: void 0 };
        if (h === "+") {
          if (Array.isArray(i))
            return { v: i.map(function(w, p) {
              var C = s.slice(L + 1);
              return C.length > 0 ? g(w, C.join("."), l) : l(i, p, s, L);
            }) };
          var m = s.slice(0, L).join(".");
          throw new Error("Object at wildcard (".concat(m, ") is not an array"));
        }
        i = l(i, h, s, L);
      }, v = 0; v < c; v++) {
        var b = f(v);
        if (k(b) === "object")
          return b.v;
      }
      return i;
    }
    function j(i, o) {
      return i.length === o + 1;
    }
    M.exports = { set: function(i, o, l) {
      if (k(i) != "object" || i === null || o === void 0)
        return i;
      if (typeof o == "number")
        return i[o] = l, i[o];
      try {
        return g(i, o, function(s, c, f, v) {
          if (s === Reflect.getPrototypeOf({}))
            throw new P("Attempting to mutate Object.prototype");
          if (!s[c]) {
            var b = Number.isInteger(Number(f[v + 1])), L = f[v + 1] === "+";
            s[c] = b || L ? [] : {};
          }
          return j(f, v) && (s[c] = l), s[c];
        });
      } catch (s) {
        if (s instanceof P)
          throw s;
        return i;
      }
    }, get: function(i, o) {
      if (k(i) != "object" || i === null || o === void 0)
        return i;
      if (typeof o == "number")
        return i[o];
      try {
        return g(i, o, function(l, s) {
          return l[s];
        });
      } catch {
        return i;
      }
    }, has: function(i, o) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (k(i) != "object" || i === null || o === void 0)
        return !1;
      if (typeof o == "number")
        return o in i;
      try {
        var s = !1;
        return g(i, o, function(c, f, v, b) {
          if (!j(v, b))
            return c && c[f];
          s = l.own ? c.hasOwnProperty(f) : f in c;
        }), s;
      } catch {
        return !1;
      }
    }, hasOwn: function(i, o, l) {
      return this.has(i, o, l || { own: !0 });
    }, isIn: function(i, o, l) {
      var s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      if (k(i) != "object" || i === null || o === void 0)
        return !1;
      try {
        var c = !1, f = !1;
        return g(i, o, function(v, b, L, h) {
          return c = c || v === l || !!v && v[b] === l, f = j(L, h) && k(v) === "object" && b in v, v && v[b];
        }), s.validPath ? c && f : c;
      } catch {
        return !1;
      }
    }, ObjectPrototypeMutationError: P };
  }, 47: (M, k, S) => {
    var N = S(410), x = function(i) {
      return typeof i == "string";
    };
    function E(i, o) {
      for (var l = [], s = 0; s < i.length; s++) {
        var c = i[s];
        c && c !== "." && (c === ".." ? l.length && l[l.length - 1] !== ".." ? l.pop() : o && l.push("..") : l.push(c));
      }
      return l;
    }
    var P = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, g = {};
    function j(i) {
      return P.exec(i).slice(1);
    }
    g.resolve = function() {
      for (var i = "", o = !1, l = arguments.length - 1; l >= -1 && !o; l--) {
        var s = l >= 0 ? arguments[l] : process.cwd();
        if (!x(s))
          throw new TypeError("Arguments to path.resolve must be strings");
        s && (i = s + "/" + i, o = s.charAt(0) === "/");
      }
      return (o ? "/" : "") + (i = E(i.split("/"), !o).join("/")) || ".";
    }, g.normalize = function(i) {
      var o = g.isAbsolute(i), l = i.substr(-1) === "/";
      return (i = E(i.split("/"), !o).join("/")) || o || (i = "."), i && l && (i += "/"), (o ? "/" : "") + i;
    }, g.isAbsolute = function(i) {
      return i.charAt(0) === "/";
    }, g.join = function() {
      for (var i = "", o = 0; o < arguments.length; o++) {
        var l = arguments[o];
        if (!x(l))
          throw new TypeError("Arguments to path.join must be strings");
        l && (i += i ? "/" + l : l);
      }
      return g.normalize(i);
    }, g.relative = function(i, o) {
      function l(h) {
        for (var m = 0; m < h.length && h[m] === ""; m++)
          ;
        for (var w = h.length - 1; w >= 0 && h[w] === ""; w--)
          ;
        return m > w ? [] : h.slice(m, w + 1);
      }
      i = g.resolve(i).substr(1), o = g.resolve(o).substr(1);
      for (var s = l(i.split("/")), c = l(o.split("/")), f = Math.min(s.length, c.length), v = f, b = 0; b < f; b++)
        if (s[b] !== c[b]) {
          v = b;
          break;
        }
      var L = [];
      for (b = v; b < s.length; b++)
        L.push("..");
      return (L = L.concat(c.slice(v))).join("/");
    }, g._makeLong = function(i) {
      return i;
    }, g.dirname = function(i) {
      var o = j(i), l = o[0], s = o[1];
      return l || s ? (s && (s = s.substr(0, s.length - 1)), l + s) : ".";
    }, g.basename = function(i, o) {
      var l = j(i)[2];
      return o && l.substr(-1 * o.length) === o && (l = l.substr(0, l.length - o.length)), l;
    }, g.extname = function(i) {
      return j(i)[3];
    }, g.format = function(i) {
      if (!N.isObject(i))
        throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof i);
      var o = i.root || "";
      if (!x(o))
        throw new TypeError("'pathObject.root' must be a string or undefined, not " + typeof i.root);
      return (i.dir ? i.dir + g.sep : "") + (i.base || "");
    }, g.parse = function(i) {
      if (!x(i))
        throw new TypeError("Parameter 'pathString' must be a string, not " + typeof i);
      var o = j(i);
      if (!o || o.length !== 4)
        throw new TypeError("Invalid path '" + i + "'");
      return o[1] = o[1] || "", o[2] = o[2] || "", o[3] = o[3] || "", { root: o[0], dir: o[0] + o[1].slice(0, o[1].length - 1), base: o[2], ext: o[3], name: o[2].slice(0, o[2].length - o[3].length) };
    }, g.sep = "/", g.delimiter = ":", M.exports = g;
  }, 647: (M, k) => {
    var S = Object.prototype.hasOwnProperty;
    function N(E) {
      try {
        return decodeURIComponent(E.replace(/\+/g, " "));
      } catch {
        return null;
      }
    }
    function x(E) {
      try {
        return encodeURIComponent(E);
      } catch {
        return null;
      }
    }
    k.stringify = function(E, P) {
      P = P || "";
      var g, j, i = [];
      for (j in typeof P != "string" && (P = "?"), E)
        if (S.call(E, j)) {
          if ((g = E[j]) || g != null && !isNaN(g) || (g = ""), j = x(j), g = x(g), j === null || g === null)
            continue;
          i.push(j + "=" + g);
        }
      return i.length ? P + i.join("&") : "";
    }, k.parse = function(E) {
      for (var P, g = /([^=?#&]+)=?([^&]*)/g, j = {}; P = g.exec(E); ) {
        var i = N(P[1]), o = N(P[2]);
        i === null || o === null || i in j || (j[i] = o);
      }
      return j;
    };
  }, 670: (M) => {
    M.exports = function(k, S) {
      if (S = S.split(":")[0], !(k = +k))
        return !1;
      switch (S) {
        case "http":
        case "ws":
          return k !== 80;
        case "https":
        case "wss":
          return k !== 443;
        case "ftp":
          return k !== 21;
        case "gopher":
          return k !== 70;
        case "file":
          return !1;
      }
      return k !== 0;
    };
  }, 494: (M) => {
    const k = /^[-+]?0x[a-fA-F0-9]+$/, S = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
    !Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt), !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
    const N = { hex: !0, leadingZeros: !0, decimalPoint: ".", eNotation: !0 };
    M.exports = function(x) {
      let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (E = Object.assign({}, N, E), !x || typeof x != "string")
        return x;
      let P = x.trim();
      if (E.skipLike !== void 0 && E.skipLike.test(P))
        return x;
      if (E.hex && k.test(P))
        return Number.parseInt(P, 16);
      {
        const j = S.exec(P);
        if (j) {
          const i = j[1], o = j[2];
          let l = ((g = j[3]) && g.indexOf(".") !== -1 && ((g = g.replace(/0+$/, "")) === "." ? g = "0" : g[0] === "." ? g = "0" + g : g[g.length - 1] === "." && (g = g.substr(0, g.length - 1))), g);
          const s = j[4] || j[6];
          if (!E.leadingZeros && o.length > 0 && i && P[2] !== "." || !E.leadingZeros && o.length > 0 && !i && P[1] !== ".")
            return x;
          {
            const c = Number(P), f = "" + c;
            return f.search(/[eE]/) !== -1 || s ? E.eNotation ? c : x : P.indexOf(".") !== -1 ? f === "0" && l === "" || f === l || i && f === "-" + l ? c : x : o ? l === f || i + l === f ? c : x : P === f || P === i + f ? c : x;
          }
        }
        return x;
      }
      var g;
    };
  }, 737: (M, k, S) => {
    var N = S(670), x = S(647), E = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, P = /[\n\r\t]/g, g = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, j = /:\d+$/, i = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, o = /^[a-zA-Z]:/;
    function l(h) {
      return (h || "").toString().replace(E, "");
    }
    var s = [["#", "hash"], ["?", "query"], function(h, m) {
      return v(m.protocol) ? h.replace(/\\/g, "/") : h;
    }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d*)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]], c = { hash: 1, query: 1 };
    function f(h) {
      var m, w = (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}).location || {}, p = {}, C = typeof (h = h || w);
      if (h.protocol === "blob:")
        p = new L(unescape(h.pathname), {});
      else if (C === "string")
        for (m in p = new L(h, {}), c)
          delete p[m];
      else if (C === "object") {
        for (m in h)
          m in c || (p[m] = h[m]);
        p.slashes === void 0 && (p.slashes = g.test(h.href));
      }
      return p;
    }
    function v(h) {
      return h === "file:" || h === "ftp:" || h === "http:" || h === "https:" || h === "ws:" || h === "wss:";
    }
    function b(h, m) {
      h = (h = l(h)).replace(P, ""), m = m || {};
      var w, p = i.exec(h), C = p[1] ? p[1].toLowerCase() : "", A = !!p[2], O = !!p[3], _ = 0;
      return A ? O ? (w = p[2] + p[3] + p[4], _ = p[2].length + p[3].length) : (w = p[2] + p[4], _ = p[2].length) : O ? (w = p[3] + p[4], _ = p[3].length) : w = p[4], C === "file:" ? _ >= 2 && (w = w.slice(2)) : v(C) ? w = p[4] : C ? A && (w = w.slice(2)) : _ >= 2 && v(m.protocol) && (w = p[4]), { protocol: C, slashes: A || v(C), slashesCount: _, rest: w };
    }
    function L(h, m, w) {
      if (h = (h = l(h)).replace(P, ""), !(this instanceof L))
        return new L(h, m, w);
      var p, C, A, O, _, $, F = s.slice(), D = typeof m, I = this, G = 0;
      for (D !== "object" && D !== "string" && (w = m, m = null), w && typeof w != "function" && (w = x.parse), p = !(C = b(h || "", m = f(m))).protocol && !C.slashes, I.slashes = C.slashes || p && m.slashes, I.protocol = C.protocol || m.protocol || "", h = C.rest, (C.protocol === "file:" && (C.slashesCount !== 2 || o.test(h)) || !C.slashes && (C.protocol || C.slashesCount < 2 || !v(I.protocol))) && (F[3] = [/(.*)/, "pathname"]); G < F.length; G++)
        typeof (O = F[G]) != "function" ? (A = O[0], $ = O[1], A != A ? I[$] = h : typeof A == "string" ? ~(_ = A === "@" ? h.lastIndexOf(A) : h.indexOf(A)) && (typeof O[2] == "number" ? (I[$] = h.slice(0, _), h = h.slice(_ + O[2])) : (I[$] = h.slice(_), h = h.slice(0, _))) : (_ = A.exec(h)) && (I[$] = _[1], h = h.slice(0, _.index)), I[$] = I[$] || p && O[3] && m[$] || "", O[4] && (I[$] = I[$].toLowerCase())) : h = O(h, I);
      w && (I.query = w(I.query)), p && m.slashes && I.pathname.charAt(0) !== "/" && (I.pathname !== "" || m.pathname !== "") && (I.pathname = function(Q, ut) {
        if (Q === "")
          return ut;
        for (var J = (ut || "/").split("/").slice(0, -1).concat(Q.split("/")), nt = J.length, ot = J[nt - 1], ct = !1, dt = 0; nt--; )
          J[nt] === "." ? J.splice(nt, 1) : J[nt] === ".." ? (J.splice(nt, 1), dt++) : dt && (nt === 0 && (ct = !0), J.splice(nt, 1), dt--);
        return ct && J.unshift(""), ot !== "." && ot !== ".." || J.push(""), J.join("/");
      }(I.pathname, m.pathname)), I.pathname.charAt(0) !== "/" && v(I.protocol) && (I.pathname = "/" + I.pathname), N(I.port, I.protocol) || (I.host = I.hostname, I.port = ""), I.username = I.password = "", I.auth && (~(_ = I.auth.indexOf(":")) ? (I.username = I.auth.slice(0, _), I.username = encodeURIComponent(decodeURIComponent(I.username)), I.password = I.auth.slice(_ + 1), I.password = encodeURIComponent(decodeURIComponent(I.password))) : I.username = encodeURIComponent(decodeURIComponent(I.auth)), I.auth = I.password ? I.username + ":" + I.password : I.username), I.origin = I.protocol !== "file:" && v(I.protocol) && I.host ? I.protocol + "//" + I.host : "null", I.href = I.toString();
    }
    L.prototype = { set: function(h, m, w) {
      var p = this;
      switch (h) {
        case "query":
          typeof m == "string" && m.length && (m = (w || x.parse)(m)), p[h] = m;
          break;
        case "port":
          p[h] = m, N(m, p.protocol) ? m && (p.host = p.hostname + ":" + m) : (p.host = p.hostname, p[h] = "");
          break;
        case "hostname":
          p[h] = m, p.port && (m += ":" + p.port), p.host = m;
          break;
        case "host":
          p[h] = m, j.test(m) ? (m = m.split(":"), p.port = m.pop(), p.hostname = m.join(":")) : (p.hostname = m, p.port = "");
          break;
        case "protocol":
          p.protocol = m.toLowerCase(), p.slashes = !w;
          break;
        case "pathname":
        case "hash":
          if (m) {
            var C = h === "pathname" ? "/" : "#";
            p[h] = m.charAt(0) !== C ? C + m : m;
          } else
            p[h] = m;
          break;
        case "username":
        case "password":
          p[h] = encodeURIComponent(m);
          break;
        case "auth":
          var A = m.indexOf(":");
          ~A ? (p.username = m.slice(0, A), p.username = encodeURIComponent(decodeURIComponent(p.username)), p.password = m.slice(A + 1), p.password = encodeURIComponent(decodeURIComponent(p.password))) : p.username = encodeURIComponent(decodeURIComponent(m));
      }
      for (var O = 0; O < s.length; O++) {
        var _ = s[O];
        _[4] && (p[_[1]] = p[_[1]].toLowerCase());
      }
      return p.auth = p.password ? p.username + ":" + p.password : p.username, p.origin = p.protocol !== "file:" && v(p.protocol) && p.host ? p.protocol + "//" + p.host : "null", p.href = p.toString(), p;
    }, toString: function(h) {
      h && typeof h == "function" || (h = x.stringify);
      var m, w = this, p = w.host, C = w.protocol;
      C && C.charAt(C.length - 1) !== ":" && (C += ":");
      var A = C + (w.protocol && w.slashes || v(w.protocol) ? "//" : "");
      return w.username ? (A += w.username, w.password && (A += ":" + w.password), A += "@") : w.password ? (A += ":" + w.password, A += "@") : w.protocol !== "file:" && v(w.protocol) && !p && w.pathname !== "/" && (A += "@"), (p[p.length - 1] === ":" || j.test(w.hostname) && !w.port) && (p += ":"), A += p + w.pathname, (m = typeof w.query == "object" ? h(w.query) : w.query) && (A += m.charAt(0) !== "?" ? "?" + m : m), w.hash && (A += w.hash), A;
    } }, L.extractProtocol = b, L.location = f, L.trimLeft = l, L.qs = x, M.exports = L;
  }, 410: () => {
  }, 388: () => {
  }, 805: () => {
  }, 345: () => {
  }, 800: () => {
  } }, je = {};
  function tt(M) {
    var k = je[M];
    if (k !== void 0)
      return k.exports;
    var S = je[M] = { id: M, loaded: !1, exports: {} };
    return Ln[M].call(S.exports, S, S.exports, tt), S.loaded = !0, S.exports;
  }
  tt.n = (M) => {
    var k = M && M.__esModule ? () => M.default : () => M;
    return tt.d(k, { a: k }), k;
  }, tt.d = (M, k) => {
    for (var S in k)
      tt.o(k, S) && !tt.o(M, S) && Object.defineProperty(M, S, { enumerable: !0, get: k[S] });
  }, tt.o = (M, k) => Object.prototype.hasOwnProperty.call(M, k), tt.nmd = (M) => (M.paths = [], M.children || (M.children = []), M);
  var yt = {};
  (() => {
    tt.d(yt, { hT: () => F, O4: () => D, Kd: () => _, YK: () => $, UU: () => Sn, Gu: () => ot, ky: () => de, h4: () => Ct, ch: () => Ut, hq: () => Pt, i5: () => me });
    var M = tt(737), k = tt.n(M);
    function S(e) {
      if (!N(e))
        throw new Error("Parameter was not an error");
    }
    function N(e) {
      return t = e, Object.prototype.toString.call(t) === "[object Error]" || e instanceof Error;
      var t;
    }
    class x extends Error {
      constructor(t, n) {
        const r = [...arguments], { options: u, shortMessage: a } = function(y) {
          let T, R = "";
          if (y.length === 0)
            T = {};
          else if (N(y[0]))
            T = { cause: y[0] }, R = y.slice(1).join(" ") || "";
          else if (y[0] && typeof y[0] == "object")
            T = Object.assign({}, y[0]), R = y.slice(1).join(" ") || "";
          else {
            if (typeof y[0] != "string")
              throw new Error("Invalid arguments passed to Layerr");
            T = {}, R = R = y.join(" ") || "";
          }
          return { options: T, shortMessage: R };
        }(r);
        let d = a;
        if (u.cause && (d = "".concat(d, ": ").concat(u.cause.message)), super(d), this.message = d, u.name && typeof u.name == "string" ? this.name = u.name : this.name = "Layerr", u.cause && Object.defineProperty(this, "_cause", { value: u.cause }), Object.defineProperty(this, "_info", { value: {} }), u.info && typeof u.info == "object" && Object.assign(this._info, u.info), Error.captureStackTrace) {
          const y = u.constructorOpt || this.constructor;
          Error.captureStackTrace(this, y);
        }
      }
      static cause(t) {
        return S(t), t._cause && N(t._cause) ? t._cause : null;
      }
      static fullStack(t) {
        S(t);
        const n = x.cause(t);
        return n ? "".concat(t.stack, `
caused by: `).concat(x.fullStack(n)) : t.stack;
      }
      static info(t) {
        S(t);
        const n = {}, r = x.cause(t);
        return r && Object.assign(n, x.info(r)), t._info && Object.assign(n, t._info), n;
      }
      cause() {
        return x.cause(this);
      }
      toString() {
        let t = this.name || this.constructor.name || this.constructor.prototype.name;
        return this.message && (t = "".concat(t, ": ").concat(this.message)), t;
      }
    }
    var E = tt(47), P = tt.n(E);
    const g = "__PATH_SEPARATOR_POSIX__", j = "__PATH_SEPARATOR_WINDOWS__";
    function i(e) {
      try {
        const t = e.replace(/\//g, g).replace(/\\\\/g, j);
        return encodeURIComponent(t).split(j).join("\\\\").split(g).join("/");
      } catch (t) {
        throw new x(t, "Failed encoding path");
      }
    }
    function o(e) {
      return e.startsWith("/") ? e : "/" + e;
    }
    function l(e) {
      let t = e;
      return t[0] !== "/" && (t = "/" + t), /^.+\/$/.test(t) && (t = t.substr(0, t.length - 1)), t;
    }
    function s(e) {
      let t = new (k())(e).pathname;
      return t.length <= 0 && (t = "/"), l(t);
    }
    function c() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function() {
        return function(r) {
          var u = [];
          if (r.length === 0)
            return "";
          if (typeof r[0] != "string")
            throw new TypeError("Url must be a string. Received " + r[0]);
          if (r[0].match(/^[^/:]+:\/*$/) && r.length > 1) {
            var a = r.shift();
            r[0] = a + r[0];
          }
          r[0].match(/^file:\/\/\//) ? r[0] = r[0].replace(/^([^/:]+):\/*/, "$1:///") : r[0] = r[0].replace(/^([^/:]+):\/*/, "$1://");
          for (var d = 0; d < r.length; d++) {
            var y = r[d];
            if (typeof y != "string")
              throw new TypeError("Url must be a string. Received " + y);
            y !== "" && (d > 0 && (y = y.replace(/^[\/]+/, "")), y = d < r.length - 1 ? y.replace(/[\/]+$/, "") : y.replace(/[\/]+$/, "/"), u.push(y));
          }
          var T = u.join("/"), R = (T = T.replace(/\/(\?|&|#[^!])/g, "$1")).split("?");
          return R.shift() + (R.length > 0 ? "?" : "") + R.join("&");
        }(typeof arguments[0] == "object" ? arguments[0] : [].slice.call(arguments));
      }(t.reduce((r, u, a) => ((a === 0 || u !== "/" || u === "/" && r[r.length - 1] !== "/") && r.push(u), r), []));
    }
    var f = tt(542), v = tt.n(f);
    const b = "abcdef0123456789";
    function L(e, t) {
      const n = e.url.replace("//", ""), r = n.indexOf("/") == -1 ? "/" : n.slice(n.indexOf("/")), u = e.method ? e.method.toUpperCase() : "GET", a = !!/(^|,)\s*auth\s*($|,)/.test(t.qop) && "auth", d = "00000000".concat(t.nc).slice(-8), y = function(X, K, H, B, W, z, Z) {
        const q = Z || v()("".concat(K, ":").concat(H, ":").concat(B));
        return X && X.toLowerCase() === "md5-sess" ? v()("".concat(q, ":").concat(W, ":").concat(z)) : q;
      }(t.algorithm, t.username, t.realm, t.password, t.nonce, t.cnonce, t.ha1), T = v()("".concat(u, ":").concat(r)), R = a ? v()("".concat(y, ":").concat(t.nonce, ":").concat(d, ":").concat(t.cnonce, ":").concat(a, ":").concat(T)) : v()("".concat(y, ":").concat(t.nonce, ":").concat(T)), U = { username: t.username, realm: t.realm, nonce: t.nonce, uri: r, qop: a, response: R, nc: d, cnonce: t.cnonce, algorithm: t.algorithm, opaque: t.opaque }, V = [];
      for (const X in U)
        U[X] && (X === "qop" || X === "nc" || X === "algorithm" ? V.push("".concat(X, "=").concat(U[X])) : V.push("".concat(X, '="').concat(U[X], '"')));
      return "Digest ".concat(V.join(", "));
    }
    function h(e) {
      return (e.headers && e.headers.get("www-authenticate") || "").split(/\s/)[0].toLowerCase() === "digest";
    }
    var m = tt(101), w = tt.n(m);
    function p(e) {
      return w().decode(e);
    }
    function C(e, t) {
      const n = (r = "".concat(e, ":").concat(t), w().encode(r));
      var r;
      return "Basic ".concat(n);
    }
    const A = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : typeof window < "u" ? window : globalThis, O = A.fetch.bind(A), _ = A.Request, $ = A.Response;
    let F = function(e) {
      return e.Auto = "auto", e.Digest = "digest", e.None = "none", e.Password = "password", e.Token = "token", e;
    }({}), D = function(e) {
      return e.DataTypeNoLength = "data-type-no-length", e.InvalidAuthType = "invalid-auth-type", e.InvalidOutputFormat = "invalid-output-format", e.LinkUnsupportedAuthType = "link-unsupported-auth", e.InvalidUpdateRange = "invalid-update-range", e.NotSupported = "not-supported", e;
    }({});
    function I(e, t, n, r, u) {
      switch (e.authType) {
        case F.Auto:
          t && n && (e.headers.Authorization = C(t, n));
          break;
        case F.Digest:
          e.digest = function(d, y, T) {
            return { username: d, password: y, ha1: T, nc: 0, algorithm: "md5", hasDigestAuth: !1 };
          }(t, n, u);
          break;
        case F.None:
          break;
        case F.Password:
          e.headers.Authorization = C(t, n);
          break;
        case F.Token:
          e.headers.Authorization = "".concat((a = r).token_type, " ").concat(a.access_token);
          break;
        default:
          throw new x({ info: { code: D.InvalidAuthType } }, "Invalid auth type: ".concat(e.authType));
      }
      var a;
    }
    tt(345), tt(800);
    const G = "@@HOTPATCHER", Q = () => {
    };
    function ut(e) {
      return { original: e, methods: [e], final: !1 };
    }
    class J {
      constructor() {
        this._configuration = { registry: {}, getEmptyAction: "null" }, this.__type__ = G;
      }
      get configuration() {
        return this._configuration;
      }
      get getEmptyAction() {
        return this.configuration.getEmptyAction;
      }
      set getEmptyAction(t) {
        this.configuration.getEmptyAction = t;
      }
      control(t) {
        let n = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (!t || t.__type__ !== G)
          throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");
        return Object.keys(t.configuration.registry).forEach((r) => {
          this.configuration.registry.hasOwnProperty(r) ? n && (this.configuration.registry[r] = Object.assign({}, t.configuration.registry[r])) : this.configuration.registry[r] = Object.assign({}, t.configuration.registry[r]);
        }), t._configuration = this.configuration, this;
      }
      execute(t) {
        const n = this.get(t) || Q;
        for (var r = arguments.length, u = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          u[a - 1] = arguments[a];
        return n(...u);
      }
      get(t) {
        const n = this.configuration.registry[t];
        if (!n)
          switch (this.getEmptyAction) {
            case "null":
              return null;
            case "throw":
              throw new Error("Failed handling method request: No method provided for override: ".concat(t));
            default:
              throw new Error("Failed handling request which resulted in an empty method: Invalid empty-action specified: ".concat(this.getEmptyAction));
          }
        return function() {
          for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++)
            u[a] = arguments[a];
          if (u.length === 0)
            throw new Error("Failed creating sequence: No functions provided");
          return function() {
            for (var d = arguments.length, y = new Array(d), T = 0; T < d; T++)
              y[T] = arguments[T];
            let R = y;
            const U = this;
            for (; u.length > 0; )
              R = [u.shift().apply(U, R)];
            return R[0];
          };
        }(...n.methods);
      }
      isPatched(t) {
        return !!this.configuration.registry[t];
      }
      patch(t, n) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        const { chain: u = !1 } = r;
        if (this.configuration.registry[t] && this.configuration.registry[t].final)
          throw new Error("Failed patching '".concat(t, "': Method marked as being final"));
        if (typeof n != "function")
          throw new Error("Failed patching '".concat(t, "': Provided method is not a function"));
        if (u)
          this.configuration.registry[t] ? this.configuration.registry[t].methods.push(n) : this.configuration.registry[t] = ut(n);
        else if (this.isPatched(t)) {
          const { original: a } = this.configuration.registry[t];
          this.configuration.registry[t] = Object.assign(ut(n), { original: a });
        } else
          this.configuration.registry[t] = ut(n);
        return this;
      }
      patchInline(t, n) {
        this.isPatched(t) || this.patch(t, n);
        for (var r = arguments.length, u = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
          u[a - 2] = arguments[a];
        return this.execute(t, ...u);
      }
      plugin(t) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++)
          r[u - 1] = arguments[u];
        return r.forEach((a) => {
          this.patch(t, a, { chain: !0 });
        }), this;
      }
      restore(t) {
        if (!this.isPatched(t))
          throw new Error("Failed restoring method: No method present for key: ".concat(t));
        if (typeof this.configuration.registry[t].original != "function")
          throw new Error("Failed restoring method: Original method not found or of invalid type for key: ".concat(t));
        return this.configuration.registry[t].methods = [this.configuration.registry[t].original], this;
      }
      setFinal(t) {
        if (!this.configuration.registry.hasOwnProperty(t))
          throw new Error("Failed marking '".concat(t, "' as final: No method found for key"));
        return this.configuration.registry[t].final = !0, this;
      }
    }
    let nt = null;
    function ot() {
      return nt || (nt = new J()), nt;
    }
    function ct(e) {
      return function(t) {
        if (typeof t != "object" || t === null || Object.prototype.toString.call(t) != "[object Object]")
          return !1;
        if (Object.getPrototypeOf(t) === null)
          return !0;
        let n = t;
        for (; Object.getPrototypeOf(n) !== null; )
          n = Object.getPrototypeOf(n);
        return Object.getPrototypeOf(t) === n;
      }(e) ? Object.assign({}, e) : Object.setPrototypeOf(Object.assign({}, e), Object.getPrototypeOf(e));
    }
    function dt() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      let r = null, u = [...t];
      for (; u.length > 0; ) {
        const a = u.shift();
        r = r ? bt(r, a) : ct(a);
      }
      return r;
    }
    function bt(e, t) {
      const n = ct(e);
      return Object.keys(t).forEach((r) => {
        n.hasOwnProperty(r) ? Array.isArray(t[r]) ? n[r] = Array.isArray(n[r]) ? [...n[r], ...t[r]] : [...t[r]] : typeof t[r] == "object" && t[r] ? n[r] = typeof n[r] == "object" && n[r] ? bt(n[r], t[r]) : ct(t[r]) : n[r] = t[r] : n[r] = t[r];
      }), n;
    }
    function kt(e) {
      const t = {};
      for (const n of e.keys())
        t[n] = e.get(n);
      return t;
    }
    function Ot() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      if (t.length === 0)
        return {};
      const r = {};
      return t.reduce((u, a) => (Object.keys(a).forEach((d) => {
        const y = d.toLowerCase();
        r.hasOwnProperty(y) ? u[r[y]] = a[d] : (r[y] = d, u[d] = a[d]);
      }), u), {});
    }
    tt(805);
    const xt = typeof ArrayBuffer == "function", { toString: Dt } = Object.prototype;
    function ne(e) {
      return xt && (e instanceof ArrayBuffer || Dt.call(e) === "[object ArrayBuffer]");
    }
    function re(e) {
      return e != null && e.constructor != null && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
    }
    function $t(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }
    function Bt(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const oe = $t(function(e) {
      const t = e._digest;
      return delete e._digest, t.hasDigestAuth && (e = dt(e, { headers: { Authorization: L(e, t) } })), Bt(It(e), function(n) {
        let r = !1;
        return u = function(d) {
          return r ? d : n;
        }, (a = function() {
          if (n.status == 401)
            return t.hasDigestAuth = function(d, y) {
              if (!h(d))
                return !1;
              const T = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;
              for (; ; ) {
                const R = d.headers && d.headers.get("www-authenticate") || "", U = T.exec(R);
                if (!U)
                  break;
                y[U[1]] = U[2] || U[3];
              }
              return y.nc += 1, y.cnonce = function() {
                let R = "";
                for (let U = 0; U < 32; ++U)
                  R = "".concat(R).concat(b[Math.floor(16 * Math.random())]);
                return R;
              }(), !0;
            }(n, t), function() {
              if (t.hasDigestAuth)
                return Bt(It(e = dt(e, { headers: { Authorization: L(e, t) } })), function(d) {
                  return d.status == 401 ? t.hasDigestAuth = !1 : t.nc++, r = !0, d;
                });
            }();
          t.nc++;
        }()) && a.then ? a.then(u) : u(a);
        var u, a;
      });
    }), Se = $t(function(e, t) {
      return Bt(It(e), function(n) {
        return n.ok ? (t.authType = F.Password, n) : n.status == 401 && h(n) ? (t.authType = F.Digest, I(t, t.username, t.password, void 0, void 0), e._digest = t.digest, oe(e)) : n;
      });
    }), st = $t(function(e, t) {
      return t.authType === F.Auto ? Se(e, t) : e._digest ? oe(e) : It(e);
    });
    function it(e, t, n) {
      const r = ct(e);
      return r.headers = Ot(t.headers, r.headers || {}, n.headers || {}), n.data !== void 0 && (r.data = n.data), n.signal && (r.signal = n.signal), t.httpAgent && (r.httpAgent = t.httpAgent), t.httpsAgent && (r.httpsAgent = t.httpsAgent), t.digest && (r._digest = t.digest), typeof t.withCredentials == "boolean" && (r.withCredentials = t.withCredentials), r;
    }
    function It(e) {
      const t = ot();
      return t.patchInline("request", (n) => t.patchInline("fetch", O, n.url, function(r) {
        let u = {};
        const a = { method: r.method };
        if (r.headers && (u = Ot(u, r.headers)), r.data !== void 0) {
          const [d, y] = function(T) {
            if (typeof T == "string")
              return [T, {}];
            if (re(T))
              return [T, {}];
            if (ne(T))
              return [T, {}];
            if (T && typeof T == "object")
              return [JSON.stringify(T), { "content-type": "application/json" }];
            throw new Error("Unable to convert request body: Unexpected body type: ".concat(typeof T));
          }(r.data);
          a.body = d, u = Ot(u, y);
        }
        return r.signal && (a.signal = r.signal), r.withCredentials && (a.credentials = "include"), a.headers = u, a;
      }(n)), e);
    }
    var ke = tt(285);
    const Ie = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0], "[:alpha:]": ["\\p{L}\\p{Nl}", !0], "[:ascii:]": ["\\x00-\\x7f", !1], "[:blank:]": ["\\p{Zs}\\t", !0], "[:cntrl:]": ["\\p{Cc}", !0], "[:digit:]": ["\\p{Nd}", !0], "[:graph:]": ["\\p{Z}\\p{C}", !0, !0], "[:lower:]": ["\\p{Ll}", !0], "[:print:]": ["\\p{C}", !0], "[:punct:]": ["\\p{P}", !0], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0], "[:upper:]": ["\\p{Lu}", !0], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0], "[:xdigit:]": ["A-Fa-f0-9", !1] }, jt = (e) => e.replace(/[[\]\\-]/g, "\\$&"), se = (e) => e.join(""), Le = (e, t) => {
      const n = t;
      if (e.charAt(n) !== "[")
        throw new Error("not in a brace expression");
      const r = [], u = [];
      let a = n + 1, d = !1, y = !1, T = !1, R = !1, U = n, V = "";
      t:
        for (; a < e.length; ) {
          const B = e.charAt(a);
          if (B !== "!" && B !== "^" || a !== n + 1) {
            if (B === "]" && d && !T) {
              U = a + 1;
              break;
            }
            if (d = !0, B !== "\\" || T) {
              if (B === "[" && !T) {
                for (const [W, [z, Z, q]] of Object.entries(Ie))
                  if (e.startsWith(W, a)) {
                    if (V)
                      return ["$.", !1, e.length - n, !0];
                    a += W.length, q ? u.push(z) : r.push(z), y = y || Z;
                    continue t;
                  }
              }
              T = !1, V ? (B > V ? r.push(jt(V) + "-" + jt(B)) : B === V && r.push(jt(B)), V = "", a++) : e.startsWith("-]", a + 1) ? (r.push(jt(B + "-")), a += 2) : e.startsWith("-", a + 1) ? (V = B, a += 2) : (r.push(jt(B)), a++);
            } else
              T = !0, a++;
          } else
            R = !0, a++;
        }
      if (U < a)
        return ["", !1, 0, !1];
      if (!r.length && !u.length)
        return ["$.", !1, e.length - n, !0];
      if (u.length === 0 && r.length === 1 && /^\\?.$/.test(r[0]) && !R)
        return [(X = r[0].length === 2 ? r[0].slice(-1) : r[0], X.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")), !1, U - n, !1];
      var X;
      const K = "[" + (R ? "^" : "") + se(r) + "]", H = "[" + (R ? "" : "^") + se(u) + "]";
      return [r.length && u.length ? "(" + K + "|" + H + ")" : r.length ? K : H, y, U - n, !0];
    };
    function lt(e, t, n) {
      var r;
      return (t = typeof (r = function(u, a) {
        if (typeof u != "object" || !u)
          return u;
        var d = u[Symbol.toPrimitive];
        if (d !== void 0) {
          var y = d.call(u, "string");
          if (typeof y != "object")
            return y;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(u);
      }(t)) == "symbol" ? r : String(r)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
    }
    const pt = function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return Lt(t), !(!n.nocomment && t.charAt(0) === "#") && new Rt(t, n).match(e);
    }, Re = pt, _e = /^\*+([^+@!?\*\[\(]*)$/, Ue = (e) => (t) => !t.startsWith(".") && t.endsWith(e), Me = (e) => (t) => t.endsWith(e), Fe = (e) => (e = e.toLowerCase(), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(e)), De = (e) => (e = e.toLowerCase(), (t) => t.toLowerCase().endsWith(e)), $e = /^\*+\.\*+$/, Be = (e) => !e.startsWith(".") && e.includes("."), We = (e) => e !== "." && e !== ".." && e.includes("."), Ve = /^\.\*+$/, ze = (e) => e !== "." && e !== ".." && e.startsWith("."), qe = /^\*+$/, Ge = (e) => e.length !== 0 && !e.startsWith("."), He = (e) => e.length !== 0 && e !== "." && e !== "..", Xe = /^\?+([^+@!?\*\[\(]*)?$/, Ze = (e) => {
      let [t, n = ""] = e;
      const r = ie([t]);
      return n ? (n = n.toLowerCase(), (u) => r(u) && u.toLowerCase().endsWith(n)) : r;
    }, Ye = (e) => {
      let [t, n = ""] = e;
      const r = ae([t]);
      return n ? (n = n.toLowerCase(), (u) => r(u) && u.toLowerCase().endsWith(n)) : r;
    }, Ke = (e) => {
      let [t, n = ""] = e;
      const r = ae([t]);
      return n ? (u) => r(u) && u.endsWith(n) : r;
    }, Je = (e) => {
      let [t, n = ""] = e;
      const r = ie([t]);
      return n ? (u) => r(u) && u.endsWith(n) : r;
    }, ie = (e) => {
      let [t] = e;
      const n = t.length;
      return (r) => r.length === n && !r.startsWith(".");
    }, ae = (e) => {
      let [t] = e;
      const n = t.length;
      return (r) => r.length === n && r !== "." && r !== "..";
    }, ce = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
    pt.sep = ce === "win32" ? "\\" : "/";
    const mt = Symbol("globstar **");
    pt.GLOBSTAR = mt;
    const ue = { "!": { open: "(?:(?!(?:", close: "))[^/]*?)" }, "?": { open: "(?:", close: ")?" }, "+": { open: "(?:", close: ")+" }, "*": { open: "(?:", close: ")*" }, "@": { open: "(?:", close: ")" } }, Wt = "[^/]", Vt = Wt + "*?", le = (e) => e.split("").reduce((t, n) => (t[n] = !0, t), {}), Qe = le("().*{}+?[]^$\\!"), tn = le("[.(");
    pt.filter = function(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return (n) => pt(n, e, t);
    };
    const wt = function(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return Object.assign({}, e, t);
    };
    pt.defaults = (e) => {
      if (!e || typeof e != "object" || !Object.keys(e).length)
        return pt;
      const t = pt;
      return Object.assign(function(n, r) {
        return t(n, r, wt(e, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}));
      }, { Minimatch: class extends t.Minimatch {
        constructor(n) {
          super(n, wt(e, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}));
        }
        static defaults(n) {
          return t.defaults(wt(e, n)).Minimatch;
        }
      }, unescape: function(n) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return t.unescape(n, wt(e, r));
      }, escape: function(n) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return t.escape(n, wt(e, r));
      }, filter: function(n) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return t.filter(n, wt(e, r));
      }, defaults: (n) => t.defaults(wt(e, n)), makeRe: function(n) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return t.makeRe(n, wt(e, r));
      }, braceExpand: function(n) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return t.braceExpand(n, wt(e, r));
      }, match: function(n, r) {
        let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return t.match(n, r, wt(e, u));
      }, sep: t.sep, GLOBSTAR: mt });
    };
    const he = function(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return Lt(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : ke(e);
    };
    pt.braceExpand = he;
    const Lt = (e) => {
      if (typeof e != "string")
        throw new TypeError("invalid pattern");
      if (e.length > 65536)
        throw new TypeError("pattern is too long");
    };
    pt.makeRe = function(e) {
      return new Rt(e, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}).makeRe();
    }, pt.match = function(e, t) {
      const n = new Rt(t, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {});
      return e = e.filter((r) => n.match(r)), n.options.nonull && !e.length && e.push(t), e;
    };
    const fe = /[?*]|[+@!]\(.*?\)|\[|\]/, pe = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    class Rt {
      constructor(t) {
        let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        lt(this, "options", void 0), lt(this, "set", void 0), lt(this, "pattern", void 0), lt(this, "windowsPathsNoEscape", void 0), lt(this, "nonegate", void 0), lt(this, "negate", void 0), lt(this, "comment", void 0), lt(this, "empty", void 0), lt(this, "preserveMultipleSlashes", void 0), lt(this, "partial", void 0), lt(this, "globSet", void 0), lt(this, "globParts", void 0), lt(this, "nocase", void 0), lt(this, "isWindows", void 0), lt(this, "platform", void 0), lt(this, "windowsNoMagicRoot", void 0), lt(this, "regexp", void 0), Lt(t), n = n || {}, this.options = n, this.pattern = t, this.platform = n.platform || ce, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!n.windowsPathsNoEscape || n.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!n.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!n.nonegate, this.comment = !1, this.empty = !1, this.partial = !!n.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = n.windowsNoMagicRoot !== void 0 ? n.windowsNoMagicRoot : !(!this.isWindows || !this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
      }
      hasMagic() {
        if (this.options.magicalBraces && this.set.length > 1)
          return !0;
        for (const t of this.set)
          for (const n of t)
            if (typeof n != "string")
              return !0;
        return !1;
      }
      debug() {
      }
      make() {
        const t = this.pattern, n = this.options;
        if (!n.nocomment && t.charAt(0) === "#")
          return void (this.comment = !0);
        if (!t)
          return void (this.empty = !0);
        this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], n.debug && (this.debug = function() {
          return console.error(...arguments);
        }), this.debug(this.pattern, this.globSet);
        const r = this.globSet.map((a) => this.slashSplit(a));
        this.globParts = this.preprocess(r), this.debug(this.pattern, this.globParts);
        let u = this.globParts.map((a, d, y) => {
          if (this.isWindows && this.windowsNoMagicRoot) {
            const T = !(a[0] !== "" || a[1] !== "" || a[2] !== "?" && fe.test(a[2]) || fe.test(a[3])), R = /^[a-z]:/i.test(a[0]);
            if (T)
              return [...a.slice(0, 4), ...a.slice(4).map((U) => this.parse(U))];
            if (R)
              return [a[0], ...a.slice(1).map((U) => this.parse(U))];
          }
          return a.map((T) => this.parse(T));
        });
        if (this.debug(this.pattern, u), this.set = u.filter((a) => a.indexOf(!1) === -1), this.isWindows)
          for (let a = 0; a < this.set.length; a++) {
            const d = this.set[a];
            d[0] === "" && d[1] === "" && this.globParts[a][2] === "?" && typeof d[3] == "string" && /^[a-z]:$/i.test(d[3]) && (d[2] = "?");
          }
        this.debug(this.pattern, this.set);
      }
      preprocess(t) {
        if (this.options.noglobstar)
          for (let r = 0; r < t.length; r++)
            for (let u = 0; u < t[r].length; u++)
              t[r][u] === "**" && (t[r][u] = "*");
        const { optimizationLevel: n = 1 } = this.options;
        return n >= 2 ? (t = this.firstPhasePreProcess(t), t = this.secondPhasePreProcess(t)) : t = n >= 1 ? this.levelOneOptimize(t) : this.adjascentGlobstarOptimize(t), t;
      }
      adjascentGlobstarOptimize(t) {
        return t.map((n) => {
          let r = -1;
          for (; (r = n.indexOf("**", r + 1)) !== -1; ) {
            let u = r;
            for (; n[u + 1] === "**"; )
              u++;
            u !== r && n.splice(r, u - r);
          }
          return n;
        });
      }
      levelOneOptimize(t) {
        return t.map((n) => (n = n.reduce((r, u) => {
          const a = r[r.length - 1];
          return u === "**" && a === "**" ? r : u === ".." && a && a !== ".." && a !== "." && a !== "**" ? (r.pop(), r) : (r.push(u), r);
        }, [])).length === 0 ? [""] : n);
      }
      levelTwoFileOptimize(t) {
        Array.isArray(t) || (t = this.slashSplit(t));
        let n = !1;
        do {
          if (n = !1, !this.preserveMultipleSlashes) {
            for (let u = 1; u < t.length - 1; u++) {
              const a = t[u];
              u === 1 && a === "" && t[0] === "" || a !== "." && a !== "" || (n = !0, t.splice(u, 1), u--);
            }
            t[0] !== "." || t.length !== 2 || t[1] !== "." && t[1] !== "" || (n = !0, t.pop());
          }
          let r = 0;
          for (; (r = t.indexOf("..", r + 1)) !== -1; ) {
            const u = t[r - 1];
            u && u !== "." && u !== ".." && u !== "**" && (n = !0, t.splice(r - 1, 2), r -= 2);
          }
        } while (n);
        return t.length === 0 ? [""] : t;
      }
      firstPhasePreProcess(t) {
        let n = !1;
        do {
          n = !1;
          for (let r of t) {
            let u = -1;
            for (; (u = r.indexOf("**", u + 1)) !== -1; ) {
              let d = u;
              for (; r[d + 1] === "**"; )
                d++;
              d > u && r.splice(u + 1, d - u);
              let y = r[u + 1];
              const T = r[u + 2], R = r[u + 3];
              if (y !== ".." || !T || T === "." || T === ".." || !R || R === "." || R === "..")
                continue;
              n = !0, r.splice(u, 1);
              const U = r.slice(0);
              U[u] = "**", t.push(U), u--;
            }
            if (!this.preserveMultipleSlashes) {
              for (let d = 1; d < r.length - 1; d++) {
                const y = r[d];
                d === 1 && y === "" && r[0] === "" || y !== "." && y !== "" || (n = !0, r.splice(d, 1), d--);
              }
              r[0] !== "." || r.length !== 2 || r[1] !== "." && r[1] !== "" || (n = !0, r.pop());
            }
            let a = 0;
            for (; (a = r.indexOf("..", a + 1)) !== -1; ) {
              const d = r[a - 1];
              if (d && d !== "." && d !== ".." && d !== "**") {
                n = !0;
                const y = a === 1 && r[a + 1] === "**" ? ["."] : [];
                r.splice(a - 1, 2, ...y), r.length === 0 && r.push(""), a -= 2;
              }
            }
          }
        } while (n);
        return t;
      }
      secondPhasePreProcess(t) {
        for (let n = 0; n < t.length - 1; n++)
          for (let r = n + 1; r < t.length; r++) {
            const u = this.partsMatch(t[n], t[r], !this.preserveMultipleSlashes);
            u && (t[n] = u, t[r] = []);
          }
        return t.filter((n) => n.length);
      }
      partsMatch(t, n) {
        let r = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], u = 0, a = 0, d = [], y = "";
        for (; u < t.length && a < n.length; )
          if (t[u] === n[a])
            d.push(y === "b" ? n[a] : t[u]), u++, a++;
          else if (r && t[u] === "**" && n[a] === t[u + 1])
            d.push(t[u]), u++;
          else if (r && n[a] === "**" && t[u] === n[a + 1])
            d.push(n[a]), a++;
          else if (t[u] !== "*" || !n[a] || !this.options.dot && n[a].startsWith(".") || n[a] === "**") {
            if (n[a] !== "*" || !t[u] || !this.options.dot && t[u].startsWith(".") || t[u] === "**" || y === "a")
              return !1;
            y = "b", d.push(n[a]), u++, a++;
          } else {
            if (y === "b")
              return !1;
            y = "a", d.push(t[u]), u++, a++;
          }
        return t.length === n.length && d;
      }
      parseNegate() {
        if (this.nonegate)
          return;
        const t = this.pattern;
        let n = !1, r = 0;
        for (let u = 0; u < t.length && t.charAt(u) === "!"; u++)
          n = !n, r++;
        r && (this.pattern = t.slice(r)), this.negate = n;
      }
      matchOne(t, n) {
        let r = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        const u = this.options;
        if (this.isWindows) {
          const B = t[0] === "" && t[1] === "" && t[2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]), W = n[0] === "" && n[1] === "" && n[2] === "?" && typeof n[3] == "string" && /^[a-z]:$/i.test(n[3]);
          if (B && W) {
            const z = t[3], Z = n[3];
            z.toLowerCase() === Z.toLowerCase() && (t[3] = Z);
          } else if (W && typeof t[0] == "string") {
            const z = n[3], Z = t[0];
            z.toLowerCase() === Z.toLowerCase() && (n[3] = Z, n = n.slice(3));
          } else if (B && typeof n[0] == "string") {
            const z = t[3];
            z.toLowerCase() === n[0].toLowerCase() && (n[0] = z, t = t.slice(3));
          }
        }
        const { optimizationLevel: a = 1 } = this.options;
        a >= 2 && (t = this.levelTwoFileOptimize(t)), this.debug("matchOne", this, { file: t, pattern: n }), this.debug("matchOne", t.length, n.length);
        for (var d = 0, y = 0, T = t.length, R = n.length; d < T && y < R; d++, y++) {
          this.debug("matchOne loop");
          var U = n[y], V = t[d];
          if (this.debug(n, U, V), U === !1)
            return !1;
          if (U === mt) {
            this.debug("GLOBSTAR", [n, U, V]);
            var X = d, K = y + 1;
            if (K === R) {
              for (this.debug("** at the end"); d < T; d++)
                if (t[d] === "." || t[d] === ".." || !u.dot && t[d].charAt(0) === ".")
                  return !1;
              return !0;
            }
            for (; X < T; ) {
              var H = t[X];
              if (this.debug(`
globstar while`, t, X, n, K, H), this.matchOne(t.slice(X), n.slice(K), r))
                return this.debug("globstar found match!", X, T, H), !0;
              if (H === "." || H === ".." || !u.dot && H.charAt(0) === ".") {
                this.debug("dot detected!", t, X, n, K);
                break;
              }
              this.debug("globstar swallow a segment, and continue"), X++;
            }
            return !(!r || (this.debug(`
>>> no match, partial?`, t, X, n, K), X !== T));
          }
          let B;
          if (typeof U == "string" ? (B = V === U, this.debug("string match", U, V, B)) : (B = U.test(V), this.debug("pattern match", U, V, B)), !B)
            return !1;
        }
        if (d === T && y === R)
          return !0;
        if (d === T)
          return r;
        if (y === R)
          return d === T - 1 && t[d] === "";
        throw new Error("wtf?");
      }
      braceExpand() {
        return he(this.pattern, this.options);
      }
      parse(t) {
        Lt(t);
        const n = this.options;
        if (t === "**")
          return mt;
        if (t === "")
          return "";
        let r, u = null;
        (r = t.match(qe)) ? u = n.dot ? He : Ge : (r = t.match(_e)) ? u = (n.nocase ? n.dot ? De : Fe : n.dot ? Me : Ue)(r[1]) : (r = t.match(Xe)) ? u = (n.nocase ? n.dot ? Ye : Ze : n.dot ? Ke : Je)(r) : (r = t.match($e)) ? u = n.dot ? We : Be : (r = t.match(Ve)) && (u = ze);
        let a = "", d = !1, y = !1;
        const T = [], R = [];
        let U, V = !1, X = !1, K = t.charAt(0) === ".", H = n.dot || K;
        const B = (q) => q.charAt(0) === "." ? "" : n.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", W = () => {
          if (V) {
            switch (V) {
              case "*":
                a += Vt, d = !0;
                break;
              case "?":
                a += Wt, d = !0;
                break;
              default:
                a += "\\" + V;
            }
            this.debug("clearStateChar %j %j", V, a), V = !1;
          }
        };
        for (let q, Y = 0; Y < t.length && (q = t.charAt(Y)); Y++)
          if (this.debug("%s	%s %s %j", t, Y, a, q), y) {
            if (q === "/")
              return !1;
            Qe[q] && (a += "\\"), a += q, y = !1;
          } else
            switch (q) {
              case "/":
                return !1;
              case "\\":
                W(), y = !0;
                continue;
              case "?":
              case "*":
              case "+":
              case "@":
              case "!":
                this.debug("%s	%s %s %j <-- stateChar", t, Y, a, q), this.debug("call clearStateChar %j", V), W(), V = q, n.noext && W();
                continue;
              case "(": {
                if (!V) {
                  a += "\\(";
                  continue;
                }
                const rt = { type: V, start: Y - 1, reStart: a.length, open: ue[V].open, close: ue[V].close };
                this.debug(this.pattern, "	", rt), T.push(rt), a += rt.open, rt.start === 0 && rt.type !== "!" && (K = !0, a += B(t.slice(Y + 1))), this.debug("plType %j %j", V, a), V = !1;
                continue;
              }
              case ")": {
                const rt = T[T.length - 1];
                if (!rt) {
                  a += "\\)";
                  continue;
                }
                T.pop(), W(), d = !0, U = rt, a += U.close, U.type === "!" && R.push(Object.assign(U, { reEnd: a.length }));
                continue;
              }
              case "|": {
                const rt = T[T.length - 1];
                if (!rt) {
                  a += "\\|";
                  continue;
                }
                W(), a += "|", rt.start === 0 && rt.type !== "!" && (K = !0, a += B(t.slice(Y + 1)));
                continue;
              }
              case "[":
                W();
                const [ht, vt, et, At] = Le(t, Y);
                et ? (a += ht, X = X || vt, Y += et - 1, d = d || At) : a += "\\[";
                continue;
              case "]":
                a += "\\" + q;
                continue;
              default:
                W(), a += pe(q);
            }
        for (U = T.pop(); U; U = T.pop()) {
          let q;
          q = a.slice(U.reStart + U.open.length), this.debug(this.pattern, "setting tail", a, U), q = q.replace(/((?:\\{2}){0,64})(\\?)\|/g, (ht, vt, et) => (et || (et = "\\"), vt + vt + et + "|")), this.debug(`tail=%j
   %s`, q, q, U, a);
          const Y = U.type === "*" ? Vt : U.type === "?" ? Wt : "\\" + U.type;
          d = !0, a = a.slice(0, U.reStart) + Y + "\\(" + q;
        }
        W(), y && (a += "\\\\");
        const z = tn[a.charAt(0)];
        for (let q = R.length - 1; q > -1; q--) {
          const Y = R[q], ht = a.slice(0, Y.reStart), vt = a.slice(Y.reStart, Y.reEnd - 8);
          let et = a.slice(Y.reEnd);
          const At = a.slice(Y.reEnd - 8, Y.reEnd) + et, rt = ht.split(")").length, kn = ht.split("(").length - rt;
          let ee = et;
          for (let Te = 0; Te < kn; Te++)
            ee = ee.replace(/\)[+*?]?/, "");
          et = ee, a = ht + vt + et + (et === "" ? "(?:$|\\/)" : "") + At;
        }
        if (a !== "" && d && (a = "(?=.)" + a), z && (a = (K ? "" : H ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)") + a), !n.nocase || d || n.nocaseMagicOnly || (d = t.toUpperCase() !== t.toLowerCase()), !d)
          return a.replace(/\\(.)/g, "$1");
        const Z = (n.nocase ? "i" : "") + (X ? "u" : "");
        try {
          const q = u ? { _glob: t, _src: a, test: u } : { _glob: t, _src: a };
          return Object.assign(new RegExp("^" + a + "$", Z), q);
        } catch (q) {
          return this.debug("invalid regexp", q), new RegExp("$.");
        }
      }
      makeRe() {
        if (this.regexp || this.regexp === !1)
          return this.regexp;
        const t = this.set;
        if (!t.length)
          return this.regexp = !1, this.regexp;
        const n = this.options, r = n.noglobstar ? Vt : n.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", u = n.nocase ? "i" : "";
        let a = t.map((d) => {
          const y = d.map((T) => typeof T == "string" ? pe(T) : T === mt ? mt : T._src);
          return y.forEach((T, R) => {
            const U = y[R + 1], V = y[R - 1];
            T === mt && V !== mt && (V === void 0 ? U !== void 0 && U !== mt ? y[R + 1] = "(?:\\/|" + r + "\\/)?" + U : y[R] = r : U === void 0 ? y[R - 1] = V + "(?:\\/|" + r + ")?" : U !== mt && (y[R - 1] = V + "(?:\\/|\\/" + r + "\\/)" + U, y[R + 1] = mt));
          }), y.filter((T) => T !== mt).join("/");
        }).join("|");
        a = "^(?:" + a + ")$", this.negate && (a = "^(?!" + a + ").*$");
        try {
          this.regexp = new RegExp(a, u);
        } catch {
          this.regexp = !1;
        }
        return this.regexp;
      }
      slashSplit(t) {
        return this.preserveMultipleSlashes ? t.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t) ? ["", ...t.split(/\/+/)] : t.split(/\/+/);
      }
      match(t) {
        let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.partial;
        if (this.debug("match", t, this.pattern), this.comment)
          return !1;
        if (this.empty)
          return t === "";
        if (t === "/" && n)
          return !0;
        const r = this.options;
        this.isWindows && (t = t.split("\\").join("/"));
        const u = this.slashSplit(t);
        this.debug(this.pattern, "split", u);
        const a = this.set;
        this.debug(this.pattern, "set", a);
        let d = u[u.length - 1];
        if (!d)
          for (let y = u.length - 2; !d && y >= 0; y--)
            d = u[y];
        for (let y = 0; y < a.length; y++) {
          const T = a[y];
          let R = u;
          if (r.matchBase && T.length === 1 && (R = [d]), this.matchOne(R, T, n))
            return !!r.flipNegate || !this.negate;
        }
        return !r.flipNegate && this.negate;
      }
      static defaults(t) {
        return pt.defaults(t).Minimatch;
      }
    }
    function zt(e) {
      const t = new Error("".concat(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", "Invalid response: ").concat(e.status, " ").concat(e.statusText));
      return t.status = e.status, t.response = e, t;
    }
    function at(e, t) {
      const { status: n } = t;
      if (n === 401 && e.digest)
        return t;
      if (n >= 400)
        throw zt(t);
      return t;
    }
    function Pt(e, t) {
      return arguments.length > 2 && arguments[2] !== void 0 && arguments[2] ? { data: t, headers: e.headers ? kt(e.headers) : {}, status: e.status, statusText: e.statusText } : t;
    }
    pt.Minimatch = Rt, pt.escape = function(e) {
      let { windowsPathsNoEscape: t = !1 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return t ? e.replace(/[?*()[\]]/g, "[$&]") : e.replace(/[?*()[\]\\]/g, "\\$&");
    }, pt.unescape = function(e) {
      let { windowsPathsNoEscape: t = !1 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return t ? e.replace(/\[([^\/\\])\]/g, "$1") : e.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
    };
    const en = (ge = function(e, t, n) {
      let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      const u = it({ url: c(e.remoteURL, i(t)), method: "COPY", headers: { Destination: c(e.remoteURL, i(n)), Overwrite: r.overwrite === !1 ? "F" : "T", Depth: r.shallow ? "0" : "infinity" } }, e, r);
      return d = function(y) {
        at(e, y);
      }, (a = st(u, e)) && a.then || (a = Promise.resolve(a)), d ? a.then(d) : a;
      var a, d;
    }, function() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
      try {
        return Promise.resolve(ge.apply(this, e));
      } catch (n) {
        return Promise.reject(n);
      }
    });
    var ge, qt = tt(635), nn = tt(829), Nt = tt.n(nn), Et = function(e) {
      return e.Array = "array", e.Object = "object", e.Original = "original", e;
    }(Et || {});
    function _t(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Et.Original;
      const r = Nt().get(e, t);
      return n === "array" && Array.isArray(r) === !1 ? [r] : n === "object" && Array.isArray(r) ? r[0] : r;
    }
    function Ct(e) {
      return new Promise((t) => {
        t(function(n) {
          const { multistatus: r } = n;
          if (r === "")
            return { multistatus: { response: [] } };
          if (!r)
            throw new Error("Invalid response: No root multistatus found");
          const u = { multistatus: Array.isArray(r) ? r[0] : r };
          return Nt().set(u, "multistatus.response", _t(u, "multistatus.response", Et.Array)), Nt().set(u, "multistatus.response", Nt().get(u, "multistatus.response").map((a) => function(d) {
            const y = Object.assign({}, d);
            return y.status ? Nt().set(y, "status", _t(y, "status", Et.Object)) : (Nt().set(y, "propstat", _t(y, "propstat", Et.Object)), Nt().set(y, "propstat.prop", _t(y, "propstat.prop", Et.Object))), y;
          }(a))), u;
        }(new qt.XMLParser({ removeNSPrefix: !0, numberParseOptions: { hex: !0, leadingZeros: !1 } }).parse(e)));
      });
    }
    function Ut(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
      const { getlastmodified: r = null, getcontentlength: u = "0", resourcetype: a = null, getcontenttype: d = null, getetag: y = null } = e, T = a && typeof a == "object" && a.collection !== void 0 ? "directory" : "file", R = { filename: t, basename: P().basename(t), lastmod: r, size: parseInt(u, 10), type: T, etag: typeof y == "string" ? y.replace(/"/g, "") : null };
      return T === "file" && (R.mime = d && typeof d == "string" ? d.split(";")[0] : ""), n && (R.props = e), R;
    }
    function de(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = null;
      try {
        e.multistatus.response[0].propstat && (r = e.multistatus.response[0]);
      } catch {
      }
      if (!r)
        throw new Error("Failed getting item stat: bad response");
      const { propstat: { prop: u, status: a } } = r, [d, y, T] = a.split(" ", 3), R = parseInt(y, 10);
      if (R >= 400) {
        const U = new Error("Invalid response: ".concat(R, " ").concat(T));
        throw U.status = R, U;
      }
      return Ut(u, l(t), n);
    }
    function me(e) {
      switch (e.toString()) {
        case "-3":
          return "unlimited";
        case "-2":
        case "-1":
          return "unknown";
        default:
          return parseInt(e, 10);
      }
    }
    function Gt(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const Ht = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const { details: r = !1 } = n, u = it({ url: c(e.remoteURL, i(t)), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, e, n);
      return Gt(st(u, e), function(a) {
        return at(e, a), Gt(a.text(), function(d) {
          return Gt(Ct(d), function(y) {
            const T = de(y, t, r);
            return Pt(a, T, r);
          });
        });
      });
    });
    function ve(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const rn = ye(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const r = function(a) {
        if (!a || a === "/")
          return [];
        let d = a;
        const y = [];
        do
          y.push(d), d = P().dirname(d);
        while (d && d !== "/");
        return y;
      }(l(t));
      r.sort((a, d) => a.length > d.length ? 1 : d.length > a.length ? -1 : 0);
      let u = !1;
      return function(a, d, y) {
        if (typeof a[we] == "function") {
          let W = function(z) {
            try {
              for (; !(T = V.next()).done; )
                if ((z = d(T.value)) && z.then) {
                  if (!xe(z))
                    return void z.then(W, U || (U = gt.bind(null, R = new Tt(), 2)));
                  z = z.v;
                }
              R ? gt(R, 1, z) : R = z;
            } catch (Z) {
              gt(R || (R = new Tt()), 2, Z);
            }
          };
          var B = W, T, R, U, V = a[we]();
          if (W(), V.return) {
            var X = function(z) {
              try {
                T.done || V.return();
              } catch {
              }
              return z;
            };
            if (R && R.then)
              return R.then(X, function(z) {
                throw X(z);
              });
            X();
          }
          return R;
        }
        if (!("length" in a))
          throw new TypeError("Object is not iterable");
        for (var K = [], H = 0; H < a.length; H++)
          K.push(a[H]);
        return function(W, z, Z) {
          var q, Y, ht = -1;
          return function vt(et) {
            try {
              for (; ++ht < W.length && (!Z || !Z()); )
                if ((et = z(ht)) && et.then) {
                  if (!xe(et))
                    return void et.then(vt, Y || (Y = gt.bind(null, q = new Tt(), 2)));
                  et = et.v;
                }
              q ? gt(q, 1, et) : q = et;
            } catch (At) {
              gt(q || (q = new Tt()), 2, At);
            }
          }(), q;
        }(K, function(W) {
          return d(K[W]);
        }, y);
      }(r, function(a) {
        return d = function() {
          return function(T, R) {
            try {
              var U = ve(Ht(e, a), function(V) {
                if (V.type !== "directory")
                  throw new Error("Path includes a file: ".concat(t));
              });
            } catch (V) {
              return R(V);
            }
            return U && U.then ? U.then(void 0, R) : U;
          }(0, function(T) {
            const R = T;
            return function() {
              if (R.status === 404)
                return u = !0, be(Xt(e, a, { ...n, recursive: !1 }));
              throw T;
            }();
          });
        }, (y = function() {
          if (u)
            return be(Xt(e, a, { ...n, recursive: !1 }));
        }()) && y.then ? y.then(d) : d();
        var d, y;
      }, function() {
        return !1;
      });
    });
    function ye(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }
    function on() {
    }
    function be(e, t) {
      if (!t)
        return e && e.then ? e.then(on) : Promise.resolve();
    }
    const we = typeof Symbol < "u" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
    function gt(e, t, n) {
      if (!e.s) {
        if (n instanceof Tt) {
          if (!n.s)
            return void (n.o = gt.bind(null, e, t));
          1 & t && (t = n.s), n = n.v;
        }
        if (n && n.then)
          return void n.then(gt.bind(null, e, t), gt.bind(null, e, 2));
        e.s = t, e.v = n;
        const r = e.o;
        r && r(e);
      }
    }
    const Tt = function() {
      function e() {
      }
      return e.prototype.then = function(t, n) {
        const r = new e(), u = this.s;
        if (u) {
          const a = 1 & u ? t : n;
          if (a) {
            try {
              gt(r, 1, a(this.v));
            } catch (d) {
              gt(r, 2, d);
            }
            return r;
          }
          return this;
        }
        return this.o = function(a) {
          try {
            const d = a.v;
            1 & a.s ? gt(r, 1, t ? t(d) : d) : n ? gt(r, 1, n(d)) : gt(r, 2, d);
          } catch (d) {
            gt(r, 2, d);
          }
        }, r;
      }, e;
    }();
    function xe(e) {
      return e instanceof Tt && 1 & e.s;
    }
    const Xt = ye(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (n.recursive === !0)
        return rn(e, t, n);
      const r = it({ url: c(e.remoteURL, (u = i(t), u.endsWith("/") ? u : u + "/")), method: "MKCOL" }, e, n);
      var u;
      return ve(st(r, e), function(a) {
        at(e, a);
      });
    });
    var sn = tt(388), Ne = tt.n(sn);
    const an = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const r = {};
      if (typeof n.range == "object" && typeof n.range.start == "number") {
        let y = "bytes=".concat(n.range.start, "-");
        typeof n.range.end == "number" && (y = "".concat(y).concat(n.range.end)), r.Range = y;
      }
      const u = it({ url: c(e.remoteURL, i(t)), method: "GET", headers: r }, e, n);
      return d = function(y) {
        if (at(e, y), r.Range && y.status !== 206) {
          const T = new Error("Invalid response code for partial request: ".concat(y.status));
          throw T.status = y.status, T;
        }
        return n.callback && setTimeout(() => {
          n.callback(y);
        }, 0), y.body;
      }, (a = st(u, e)) && a.then || (a = Promise.resolve(a)), d ? a.then(d) : a;
      var a, d;
    }), cn = () => {
    }, un = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t, n) {
      n.url || (n.url = c(e.remoteURL, i(t)));
      const r = it(n, e, {});
      return a = function(d) {
        return at(e, d), d;
      }, (u = st(r, e)) && u.then || (u = Promise.resolve(u)), a ? u.then(a) : u;
      var u, a;
    }), ln = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const r = it({ url: c(e.remoteURL, i(t)), method: "DELETE" }, e, n);
      return a = function(d) {
        at(e, d);
      }, (u = st(r, e)) && u.then || (u = Promise.resolve(u)), a ? u.then(a) : u;
      var u, a;
    }), hn = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return function(r, u) {
        try {
          var a = (d = Ht(e, t, n), y = function() {
            return !0;
          }, T ? y ? y(d) : d : (d && d.then || (d = Promise.resolve(d)), y ? d.then(y) : d));
        } catch (R) {
          return u(R);
        }
        var d, y, T;
        return a && a.then ? a.then(void 0, u) : a;
      }(0, function(r) {
        if (r.status === 404)
          return !1;
        throw r;
      });
    });
    function Zt(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const fn = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const r = it({ url: c(e.remoteURL, i(t), "/"), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: n.deep ? "infinity" : "1" } }, e, n);
      return Zt(st(r, e), function(u) {
        return at(e, u), Zt(u.text(), function(a) {
          if (!a)
            throw new Error("Failed parsing directory contents: Empty response");
          return Zt(Ct(a), function(d) {
            const y = o(t);
            let T = function(R, U, V) {
              let X = arguments.length > 3 && arguments[3] !== void 0 && arguments[3], K = arguments.length > 4 && arguments[4] !== void 0 && arguments[4];
              const H = P().join(U, "/"), { multistatus: { response: B } } = R, W = B.map((z) => {
                const Z = function(Y) {
                  try {
                    return Y.replace(/^https?:\/\/[^\/]+/, "");
                  } catch (ht) {
                    throw new x(ht, "Failed normalising HREF");
                  }
                }(z.href), { propstat: { prop: q } } = z;
                return Ut(q, H === "/" ? decodeURIComponent(l(Z)) : l(P().relative(decodeURIComponent(H), decodeURIComponent(Z))), X);
              });
              return K ? W : W.filter((z) => z.basename && (z.type === "file" || z.filename !== V.replace(/\/$/, "")));
            }(d, o(e.remoteBasePath || e.remotePath), y, n.details, n.includeSelf);
            return n.glob && (T = function(R, U) {
              return R.filter((V) => Re(V.filename, U, { matchBase: !0 }));
            }(T, n.glob)), Pt(u, T, n.details);
          });
        });
      });
    });
    function Yt(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }
    const pn = Yt(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const r = it({ url: c(e.remoteURL, i(t)), method: "GET", headers: { Accept: "text/plain" }, transformResponse: [mn] }, e, n);
      return Mt(st(r, e), function(u) {
        return at(e, u), Mt(u.text(), function(a) {
          return Pt(u, a, n.details);
        });
      });
    });
    function Mt(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const gn = Yt(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const r = it({ url: c(e.remoteURL, i(t)), method: "GET" }, e, n);
      return Mt(st(r, e), function(u) {
        let a;
        return at(e, u), function(d, y) {
          var T = d();
          return T && T.then ? T.then(y) : y();
        }(function() {
          return Mt(u.arrayBuffer(), function(d) {
            a = d;
          });
        }, function() {
          return Pt(u, a, n.details);
        });
      });
    }), dn = Yt(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const { format: r = "binary" } = n;
      if (r !== "binary" && r !== "text")
        throw new x({ info: { code: D.InvalidOutputFormat } }, "Invalid output format: ".concat(r));
      return r === "text" ? pn(e, t, n) : gn(e, t, n);
    }), mn = (e) => e;
    function vn(e) {
      return new qt.XMLBuilder({ attributeNamePrefix: "@_", format: !0, ignoreAttributes: !1, suppressEmptyNode: !0 }).build(Pe({ lockinfo: { "@_xmlns:d": "DAV:", lockscope: { exclusive: {} }, locktype: { write: {} }, owner: { href: e } } }, "d"));
    }
    function Pe(e, t) {
      const n = { ...e };
      for (const r in n)
        n.hasOwnProperty(r) && (n[r] && typeof n[r] == "object" && r.indexOf(":") === -1 ? (n["".concat(t, ":").concat(r)] = Pe(n[r], t), delete n[r]) : /^@_/.test(r) === !1 && (n["".concat(t, ":").concat(r)] = n[r], delete n[r]));
      return n;
    }
    function Kt(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    function Ae(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }
    const yn = Ae(function(e, t, n) {
      let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      const u = it({ url: c(e.remoteURL, i(t)), method: "UNLOCK", headers: { "Lock-Token": n } }, e, r);
      return Kt(st(u, e), function(a) {
        if (at(e, a), a.status !== 204 && a.status !== 200)
          throw zt(a);
      });
    }), bn = Ae(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const { refreshToken: r, timeout: u = wn } = n, a = { Accept: "text/plain,application/xml", Timeout: u };
      r && (a.If = r);
      const d = it({ url: c(e.remoteURL, i(t)), method: "LOCK", headers: a, data: vn(e.contactHref) }, e, n);
      return Kt(st(d, e), function(y) {
        return at(e, y), Kt(y.text(), function(T) {
          const R = (X = T, new qt.XMLParser({ removeNSPrefix: !0, parseAttributeValue: !0, parseTagValue: !0 }).parse(X)), U = Nt().get(R, "prop.lockdiscovery.activelock.locktoken.href"), V = Nt().get(R, "prop.lockdiscovery.activelock.timeout");
          var X;
          if (!U)
            throw zt(y, "No lock token received: ");
          return { token: U, serverTimeout: V };
        });
      });
    }), wn = "Infinite, Second-4100000000";
    function Jt(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const xn = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const n = t.path || "/", r = it({ url: c(e.remoteURL, n), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, e, t);
      return Jt(st(r, e), function(u) {
        return at(e, u), Jt(u.text(), function(a) {
          return Jt(Ct(a), function(d) {
            const y = function(T) {
              try {
                const [R] = T.multistatus.response, { propstat: { prop: { "quota-used-bytes": U, "quota-available-bytes": V } } } = R;
                return U !== void 0 && V !== void 0 ? { used: parseInt(U, 10), available: me(V) } : null;
              } catch {
              }
              return null;
            }(d);
            return Pt(u, y, t.details);
          });
        });
      });
    });
    function Qt(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const Nn = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const { details: r = !1 } = n, u = it({ url: c(e.remoteURL, i(t)), method: "SEARCH", headers: { Accept: "text/plain,application/xml", "Content-Type": e.headers["Content-Type"] || "application/xml; charset=utf-8" } }, e, n);
      return Qt(st(u, e), function(a) {
        return at(e, a), Qt(a.text(), function(d) {
          return Qt(Ct(d), function(y) {
            const T = function(R, U, V) {
              const X = { truncated: !1, results: [] };
              return X.truncated = R.multistatus.response.some((K) => {
                var H, B;
                return ((H = (K.status || ((B = K.propstat) === null || B === void 0 ? void 0 : B.status)).split(" ", 3)) === null || H === void 0 ? void 0 : H[1]) === "507" && K.href.replace(/\/$/, "").endsWith(i(U).replace(/\/$/, ""));
              }), R.multistatus.response.forEach((K) => {
                if (K.propstat === void 0)
                  return;
                const H = K.href.split("/").map(decodeURIComponent).join("/");
                X.results.push(Ut(K.propstat.prop, H, V));
              }), X;
            }(y, t, r);
            return Pt(a, T, r);
          });
        });
      });
    }), Pn = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t, n) {
      let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      const u = it({ url: c(e.remoteURL, i(t)), method: "MOVE", headers: { Destination: c(e.remoteURL, i(n)), Overwrite: r.overwrite === !1 ? "F" : "T" } }, e, r);
      return d = function(y) {
        at(e, y);
      }, (a = st(u, e)) && a.then || (a = Promise.resolve(a)), d ? a.then(d) : a;
      var a, d;
    });
    var An = tt(172);
    const On = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t, n) {
      let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      const { contentLength: u = !0, overwrite: a = !0 } = r, d = { "Content-Type": "application/octet-stream" };
      u === !1 || (d["Content-Length"] = "".concat(typeof u == "number" ? u : function(U) {
        if (ne(U))
          return U.byteLength;
        if (re(U))
          return U.length;
        if (typeof U == "string")
          return (0, An.d)(U);
        throw new x({ info: { code: D.DataTypeNoLength } }, "Cannot calculate data length: Invalid type");
      }(n))), a || (d["If-None-Match"] = "*");
      const y = it({ url: c(e.remoteURL, i(t)), method: "PUT", headers: d, data: n }, e, r);
      return R = function(U) {
        try {
          at(e, U);
        } catch (V) {
          const X = V;
          if (X.status !== 412 || a)
            throw X;
          return !1;
        }
        return !0;
      }, (T = st(y, e)) && T.then || (T = Promise.resolve(T)), R ? T.then(R) : T;
      var T, R;
    }), Oe = function(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }(function(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const r = it({ url: c(e.remoteURL, i(t)), method: "OPTIONS" }, e, n);
      return a = function(d) {
        var y, T;
        try {
          at(e, d);
        } catch (R) {
          throw R;
        }
        return { compliance: ((y = d.headers.get("DAV")) !== null && y !== void 0 ? y : "").split(",").map((R) => R.trim()), server: (T = d.headers.get("Server")) !== null && T !== void 0 ? T : "" };
      }, (u = st(r, e)) && u.then || (u = Promise.resolve(u)), a ? u.then(a) : u;
      var u, a;
    });
    function St(e, t, n) {
      return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
    }
    const En = te(function(e, t, n, r, u) {
      let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
      if (n > r || n < 0)
        throw new x({ info: { code: D.InvalidUpdateRange } }, "Invalid update range ".concat(n, " for partial update"));
      const d = { "Content-Type": "application/octet-stream", "Content-Length": "".concat(r - n + 1), "Content-Range": "bytes ".concat(n, "-").concat(r, "/*") }, y = it({ url: c(e.remoteURL, i(t)), method: "PUT", headers: d, data: u }, e, a);
      return St(st(y, e), function(T) {
        at(e, T);
      });
    });
    function Ee(e, t) {
      var n = e();
      return n && n.then ? n.then(t) : t(n);
    }
    const Tn = te(function(e, t, n, r, u) {
      let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
      if (n > r || n < 0)
        throw new x({ info: { code: D.InvalidUpdateRange } }, "Invalid update range ".concat(n, " for partial update"));
      const d = { "Content-Type": "application/x-sabredav-partialupdate", "Content-Length": "".concat(r - n + 1), "X-Update-Range": "bytes=".concat(n, "-").concat(r) }, y = it({ url: c(e.remoteURL, i(t)), method: "PATCH", headers: d, data: u }, e, a);
      return St(st(y, e), function(T) {
        at(e, T);
      });
    });
    function te(e) {
      return function() {
        for (var t = [], n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
        try {
          return Promise.resolve(e.apply(this, t));
        } catch (r) {
          return Promise.reject(r);
        }
      };
    }
    const jn = te(function(e, t, n, r, u) {
      let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
      return St(Oe(e, t, a), function(d) {
        let y = !1;
        return Ee(function() {
          if (d.compliance.includes("sabredav-partialupdate"))
            return St(Tn(e, t, n, r, u, a), function(T) {
              return y = !0, T;
            });
        }, function(T) {
          let R = !1;
          return y ? T : Ee(function() {
            if (d.server.includes("Apache") && d.compliance.includes("<http://apache.org/dav/propset/fs/1>"))
              return St(En(e, t, n, r, u, a), function(U) {
                return R = !0, U;
              });
          }, function(U) {
            if (R)
              return U;
            throw new x({ info: { code: D.NotSupported } }, "Not supported");
          });
        });
      });
    }), Cn = "https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";
    function Sn(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const { authType: n = null, remoteBasePath: r, contactHref: u = Cn, ha1: a, headers: d = {}, httpAgent: y, httpsAgent: T, password: R, token: U, username: V, withCredentials: X } = t;
      let K = n;
      K || (K = V || R ? F.Password : F.None);
      const H = { authType: K, remoteBasePath: r, contactHref: u, ha1: a, headers: Object.assign({}, d), httpAgent: y, httpsAgent: T, password: R, remotePath: s(e), remoteURL: e, token: U, username: V, withCredentials: X };
      return I(H, V, R, U, a), { copyFile: (B, W, z) => en(H, B, W, z), createDirectory: (B, W) => Xt(H, B, W), createReadStream: (B, W) => function(z, Z) {
        let q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        const Y = new (Ne()).PassThrough();
        return an(z, Z, q).then((ht) => {
          ht.pipe(Y);
        }).catch((ht) => {
          Y.emit("error", ht);
        }), Y;
      }(H, B, W), createWriteStream: (B, W, z) => function(Z, q) {
        let Y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, ht = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : cn;
        const vt = new (Ne()).PassThrough(), et = {};
        Y.overwrite === !1 && (et["If-None-Match"] = "*");
        const At = it({ url: c(Z.remoteURL, i(q)), method: "PUT", headers: et, data: vt, maxRedirects: 0 }, Z, Y);
        return st(At, Z).then((rt) => at(Z, rt)).then((rt) => {
          setTimeout(() => {
            ht(rt);
          }, 0);
        }).catch((rt) => {
          vt.emit("error", rt);
        }), vt;
      }(H, B, W, z), customRequest: (B, W) => un(H, B, W), deleteFile: (B, W) => ln(H, B, W), exists: (B, W) => hn(H, B, W), getDirectoryContents: (B, W) => fn(H, B, W), getFileContents: (B, W) => dn(H, B, W), getFileDownloadLink: (B) => function(W, z) {
        let Z = c(W.remoteURL, i(z));
        const q = /^https:/i.test(Z) ? "https" : "http";
        switch (W.authType) {
          case F.None:
            break;
          case F.Password: {
            const Y = p(W.headers.Authorization.replace(/^Basic /i, "").trim());
            Z = Z.replace(/^https?:\/\//, "".concat(q, "://").concat(Y, "@"));
            break;
          }
          default:
            throw new x({ info: { code: D.LinkUnsupportedAuthType } }, "Unsupported auth type for file link: ".concat(W.authType));
        }
        return Z;
      }(H, B), getFileUploadLink: (B) => function(W, z) {
        let Z = "".concat(c(W.remoteURL, i(z)), "?Content-Type=application/octet-stream");
        const q = /^https:/i.test(Z) ? "https" : "http";
        switch (W.authType) {
          case F.None:
            break;
          case F.Password: {
            const Y = p(W.headers.Authorization.replace(/^Basic /i, "").trim());
            Z = Z.replace(/^https?:\/\//, "".concat(q, "://").concat(Y, "@"));
            break;
          }
          default:
            throw new x({ info: { code: D.LinkUnsupportedAuthType } }, "Unsupported auth type for file link: ".concat(W.authType));
        }
        return Z;
      }(H, B), getHeaders: () => Object.assign({}, H.headers), getQuota: (B) => xn(H, B), lock: (B, W) => bn(H, B, W), moveFile: (B, W, z) => Pn(H, B, W, z), putFileContents: (B, W, z) => On(H, B, W, z), partialUpdateFileContents: (B, W, z, Z, q) => jn(H, B, W, z, Z, q), getDAVCompliance: (B) => Oe(H, B), search: (B, W) => Nn(H, B, W), setHeaders: (B) => {
        H.headers = Object.assign({}, B);
      }, stat: (B, W) => Ht(H, B, W), unlock: (B, W, z) => yn(H, B, W, z) };
    }
  })();
  var Rn = yt.hT;
  yt.O4;
  yt.Kd;
  yt.YK;
  var _n = yt.UU;
  yt.Gu;
  yt.ky;
  yt.h4;
  yt.ch;
  yt.hq;
  yt.i5;
  let ft = {};
  function Ft() {
    var x, E;
    const { url: M, username: k, password: S, searchPath: N } = ((x = env == null ? void 0 : env.getUserVariables) == null ? void 0 : x.call(env)) ?? {};
    return M && k && S ? (ft.url === M && ft.username === k && ft.password === S && ft.searchPath === N || (ft.url = M, ft.username = k, ft.password = S, ft.searchPath = N, ft.searchPathList = (E = N == null ? void 0 : N.split) == null ? void 0 : E.call(N, ","), ft.cacheFileList = null), _n(M, {
      authType: Rn.Password,
      username: k,
      password: S
    })) : null;
  }
  async function Un(M) {
    var S;
    const k = Ft();
    if (!ft.cacheFileList) {
      const N = (S = ft.searchPathList) != null && S.length ? ft.searchPathList : ["/"];
      let x = [];
      for (let E of N)
        try {
          const P = (await k.getDirectoryContents(E)).filter((g) => g.type === "file" && g.mime.startsWith("audio"));
          x = [...x, ...P];
        } catch {
        }
      ft.cacheFileList = x;
    }
    return {
      isEnd: !0,
      data: (ft.cacheFileList ?? []).filter((N) => N.basename.includes(M)).map((N) => ({
        title: N.basename,
        id: N.filename,
        artist: "未知作者",
        album: "未知专辑"
      }))
    };
  }
  async function Mn() {
    return Ft(), [{
      title: "全部歌曲",
      data: (ft.searchPathList || []).map((k) => ({
        title: k,
        id: k
      }))
    }];
  }
  async function Fn(M) {
    return {
      musicList: (await Ft().getDirectoryContents(M.id)).filter((N) => N.type === "file" && N.mime.startsWith("audio")).map((N) => ({
        title: N.basename,
        id: N.filename,
        artist: "未知作者",
        album: "未知专辑"
      }))
    };
  }
  Ce.exports = {
    platform: "WebDAV",
    author: "猫头猫",
    description: "使用此插件前先配置用户变量",
    userVariables: [
      {
        key: "url",
        name: "WebDAV地址"
      },
      {
        key: "username",
        name: "用户名"
      },
      {
        key: "password",
        name: "密码",
        type: "password"
      },
      {
        key: "searchPath",
        name: "存放歌曲的路径"
      }
    ],
    version: "0.0.2",
    supportedSearchType: ["music"],
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/webdav/index.js",
    cacheControl: "no-cache",
    search(M, k, S) {
      if (S === "music")
        return Un(M);
    },
    getTopLists: Mn,
    getTopListDetail: Fn,
    getMediaSource(M) {
      return {
        url: Ft().getFileDownloadLink(M.id)
      };
    }
  };
});
export default Dn();
