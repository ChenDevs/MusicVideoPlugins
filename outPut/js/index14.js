import { g as ma } from "./index13.js";
const Xt = {
  xml: !1,
  decodeEntities: !0
}, mu = {
  _useHtmlParser2: !0,
  xmlMode: !0
};
function Bt(e) {
  return e != null && e.xml ? typeof e.xml == "boolean" ? mu : { ...mu, ...e.xml } : e ?? void 0;
}
var D;
(function(e) {
  e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype";
})(D || (D = {}));
function ba(e) {
  return e.type === D.Tag || e.type === D.Script || e.type === D.Style;
}
const Aa = D.Root, _a = D.Text, ga = D.Directive, pa = D.Comment, Na = D.Script, Ca = D.Style, Ia = D.Tag, Sa = D.CDATA, Ra = D.Doctype;
class $u {
  constructor() {
    this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(t) {
    this.parent = t;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(t) {
    this.prev = t;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(t) {
    this.next = t;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(t = !1) {
    return et(this, t);
  }
}
class Kt extends $u {
  /**
   * @param data The content of the data node
   */
  constructor(t) {
    super(), this.data = t;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(t) {
    this.data = t;
  }
}
class Ue extends Kt {
  constructor() {
    super(...arguments), this.type = D.Text;
  }
  get nodeType() {
    return 3;
  }
}
class jt extends Kt {
  constructor() {
    super(...arguments), this.type = D.Comment;
  }
  get nodeType() {
    return 8;
  }
}
class $t extends Kt {
  constructor(t, u) {
    super(u), this.name = t, this.type = D.Directive;
  }
  get nodeType() {
    return 1;
  }
}
class zt extends $u {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(t) {
    super(), this.children = t;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var t;
    return (t = this.children[0]) !== null && t !== void 0 ? t : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(t) {
    this.children = t;
  }
}
class zu extends zt {
  constructor() {
    super(...arguments), this.type = D.CDATA;
  }
  get nodeType() {
    return 4;
  }
}
class oe extends zt {
  constructor() {
    super(...arguments), this.type = D.Root;
  }
  get nodeType() {
    return 9;
  }
}
class Zt extends zt {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(t, u, s = [], n = t === "script" ? D.Script : t === "style" ? D.Style : D.Tag) {
    super(s), this.name = t, this.attribs = u, this.type = n;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(t) {
    this.name = t;
  }
  get attributes() {
    return Object.keys(this.attribs).map((t) => {
      var u, s;
      return {
        name: t,
        value: this.attribs[t],
        namespace: (u = this["x-attribsNamespace"]) === null || u === void 0 ? void 0 : u[t],
        prefix: (s = this["x-attribsPrefix"]) === null || s === void 0 ? void 0 : s[t]
      };
    });
  }
}
function R(e) {
  return ba(e);
}
function ht(e) {
  return e.type === D.CDATA;
}
function $(e) {
  return e.type === D.Text;
}
function dt(e) {
  return e.type === D.Comment;
}
function kt(e) {
  return e.type === D.Directive;
}
function he(e) {
  return e.type === D.Root;
}
function H(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
function et(e, t = !1) {
  let u;
  if ($(e))
    u = new Ue(e.data);
  else if (dt(e))
    u = new jt(e.data);
  else if (R(e)) {
    const s = t ? Ct(e.children) : [], n = new Zt(e.name, { ...e.attribs }, s);
    s.forEach((i) => i.parent = n), e.namespace != null && (n.namespace = e.namespace), e["x-attribsNamespace"] && (n["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }), e["x-attribsPrefix"] && (n["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }), u = n;
  } else if (ht(e)) {
    const s = t ? Ct(e.children) : [], n = new zu(s);
    s.forEach((i) => i.parent = n), u = n;
  } else if (he(e)) {
    const s = t ? Ct(e.children) : [], n = new oe(s);
    s.forEach((i) => i.parent = n), e["x-mode"] && (n["x-mode"] = e["x-mode"]), u = n;
  } else if (kt(e)) {
    const s = new $t(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), u = s;
  } else
    throw new Error(`Not implemented yet: ${e.type}`);
  return u.startIndex = e.startIndex, u.endIndex = e.endIndex, e.sourceCodeLocation != null && (u.sourceCodeLocation = e.sourceCodeLocation), u;
}
function Ct(e) {
  const t = e.map((u) => et(u, !0));
  for (let u = 1; u < t.length; u++)
    t[u].prev = t[u - 1], t[u - 1].next = t[u];
  return t;
}
const bu = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class La {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(t, u, s) {
    this.dom = [], this.root = new oe(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof u == "function" && (s = u, u = bu), typeof t == "object" && (u = t, t = void 0), this.callback = t ?? null, this.options = u ?? bu, this.elementCB = s ?? null;
  }
  onparserinit(t) {
    this.parser = t;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new oe(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
  }
  onerror(t) {
    this.handleCallback(t);
  }
  onclosetag() {
    this.lastNode = null;
    const t = this.tagStack.pop();
    this.options.withEndIndices && (t.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(t);
  }
  onopentag(t, u) {
    const s = this.options.xmlMode ? D.Tag : void 0, n = new Zt(t, u, void 0, s);
    this.addNode(n), this.tagStack.push(n);
  }
  ontext(t) {
    const { lastNode: u } = this;
    if (u && u.type === D.Text)
      u.data += t, this.options.withEndIndices && (u.endIndex = this.parser.endIndex);
    else {
      const s = new Ue(t);
      this.addNode(s), this.lastNode = s;
    }
  }
  oncomment(t) {
    if (this.lastNode && this.lastNode.type === D.Comment) {
      this.lastNode.data += t;
      return;
    }
    const u = new jt(t);
    this.addNode(u), this.lastNode = u;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const t = new Ue(""), u = new zu([t]);
    this.addNode(u), t.parent = u, this.lastNode = t;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(t, u) {
    const s = new $t(t, u);
    this.addNode(s);
  }
  handleCallback(t) {
    if (typeof this.callback == "function")
      this.callback(t, this.dom);
    else if (t)
      throw t;
  }
  addNode(t) {
    const u = this.tagStack[this.tagStack.length - 1], s = u.children[u.children.length - 1];
    this.options.withStartIndices && (t.startIndex = this.parser.startIndex), this.options.withEndIndices && (t.endIndex = this.parser.endIndex), u.children.push(t), s && (t.prev = s, s.next = t), t.parent = u, this.lastNode = null;
  }
}
const J = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), Zu = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var It;
const Oa = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), Ft = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (It = String.fromCodePoint) !== null && It !== void 0 ? It : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  }
);
function Ju(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Oa.get(e)) !== null && t !== void 0 ? t : e;
}
var F;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(F || (F = {}));
const Da = 32;
var V;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(V || (V = {}));
function Ht(e) {
  return e >= F.ZERO && e <= F.NINE;
}
function xa(e) {
  return e >= F.UPPER_A && e <= F.UPPER_F || e >= F.LOWER_A && e <= F.LOWER_F;
}
function Pa(e) {
  return e >= F.UPPER_A && e <= F.UPPER_Z || e >= F.LOWER_A && e <= F.LOWER_Z || Ht(e);
}
function Ma(e) {
  return e === F.EQUALS || Pa(e);
}
var k;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(k || (k = {}));
var ie;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(ie || (ie = {}));
class ya {
  constructor(t, u, s) {
    this.decodeTree = t, this.emitCodePoint = u, this.errors = s, this.state = k.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ie.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = k.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, u) {
    switch (this.state) {
      case k.EntityStart:
        return t.charCodeAt(u) === F.NUM ? (this.state = k.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = k.NamedEntity, this.stateNamedEntity(t, u));
      case k.NumericStart:
        return this.stateNumericStart(t, u);
      case k.NumericDecimal:
        return this.stateNumericDecimal(t, u);
      case k.NumericHex:
        return this.stateNumericHex(t, u);
      case k.NamedEntity:
        return this.stateNamedEntity(t, u);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, u) {
    return u >= t.length ? -1 : (t.charCodeAt(u) | Da) === F.LOWER_X ? (this.state = k.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = k.NumericDecimal, this.stateNumericDecimal(t, u));
  }
  addToNumericResult(t, u, s, n) {
    if (u !== s) {
      const i = s - u;
      this.result = this.result * Math.pow(n, i) + parseInt(t.substr(u, i), n), this.consumed += i;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, u) {
    const s = u;
    for (; u < t.length; ) {
      const n = t.charCodeAt(u);
      if (Ht(n) || xa(n))
        u += 1;
      else
        return this.addToNumericResult(t, s, u, 16), this.emitNumericEntity(n, 3);
    }
    return this.addToNumericResult(t, s, u, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, u) {
    const s = u;
    for (; u < t.length; ) {
      const n = t.charCodeAt(u);
      if (Ht(n))
        u += 1;
      else
        return this.addToNumericResult(t, s, u, 10), this.emitNumericEntity(n, 2);
    }
    return this.addToNumericResult(t, s, u, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, u) {
    var s;
    if (this.consumed <= u)
      return (s = this.errors) === null || s === void 0 || s.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === F.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === ie.Strict)
      return 0;
    return this.emitCodePoint(Ju(this.result), this.consumed), this.errors && (t !== F.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, u) {
    const { decodeTree: s } = this;
    let n = s[this.treeIndex], i = (n & V.VALUE_LENGTH) >> 14;
    for (; u < t.length; u++, this.excess++) {
      const c = t.charCodeAt(u);
      if (this.treeIndex = Jt(s, n, this.treeIndex + Math.max(1, i), c), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === ie.Attribute && // We shouldn't have consumed any characters after the entity,
        (i === 0 || // And there should be no invalid characters.
        Ma(c)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (n = s[this.treeIndex], i = (n & V.VALUE_LENGTH) >> 14, i !== 0) {
        if (c === F.SEMI)
          return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
        this.decodeMode !== ie.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: u, decodeTree: s } = this, n = (s[u] & V.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(u, n, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, u, s) {
    const { decodeTree: n } = this;
    return this.emitCodePoint(u === 1 ? n[t] & ~V.VALUE_LENGTH : n[t + 1], s), u === 3 && this.emitCodePoint(n[t + 2], s), s;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case k.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== ie.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      case k.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case k.NumericHex:
        return this.emitNumericEntity(0, 3);
      case k.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case k.EntityStart:
        return 0;
    }
  }
}
function es(e) {
  let t = "";
  const u = new ya(e, (s) => t += Ft(s));
  return function(n, i) {
    let c = 0, h = 0;
    for (; (h = n.indexOf("&", h)) >= 0; ) {
      t += n.slice(c, h), u.startEntity(i);
      const E = u.write(
        n,
        // Skip the "&"
        h + 1
      );
      if (E < 0) {
        c = h + u.end();
        break;
      }
      c = h + E, h = E === 0 ? c + 1 : c;
    }
    const d = t + n.slice(c);
    return t = "", d;
  };
}
function Jt(e, t, u, s) {
  const n = (t & V.BRANCH_LENGTH) >> 7, i = t & V.JUMP_TABLE;
  if (n === 0)
    return i !== 0 && s === i ? u : -1;
  if (i) {
    const d = s - i;
    return d < 0 || d >= n ? -1 : e[u + d] - 1;
  }
  let c = u, h = c + n - 1;
  for (; c <= h; ) {
    const d = c + h >>> 1, E = e[d];
    if (E < s)
      c = d + 1;
    else if (E > s)
      h = d - 1;
    else
      return e[d + n];
  }
  return -1;
}
es(J);
es(Zu);
const Au = /["&'<>$\x80-\uFFFF]/g, Ba = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]), ka = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (e, t) => e.codePointAt(t) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (e, t) => (e.charCodeAt(t) & 64512) === 55296 ? (e.charCodeAt(t) - 55296) * 1024 + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t)
  )
);
function ts(e) {
  let t = "", u = 0, s;
  for (; (s = Au.exec(e)) !== null; ) {
    const n = s.index, i = e.charCodeAt(n), c = Ba.get(i);
    c !== void 0 ? (t += e.substring(u, n) + c, u = n + 1) : (t += `${e.substring(u, n)}&#x${ka(e, n).toString(16)};`, u = Au.lastIndex += +((i & 64512) === 55296));
  }
  return t + e.substr(u);
}
function us(e, t) {
  return function(s) {
    let n, i = 0, c = "";
    for (; n = e.exec(s); )
      i !== n.index && (c += s.substring(i, n.index)), c += t.get(n[0].charCodeAt(0)), i = n.index + 1;
    return c + s.substring(i);
  };
}
const ss = us(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
])), as = us(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
])), Fa = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((e) => [e.toLowerCase(), e])), Ha = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((e) => [e.toLowerCase(), e])), Ua = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function wa(e) {
  return e.replace(/"/g, "&quot;");
}
function va(e, t) {
  var u;
  if (!e)
    return;
  const s = ((u = t.encodeEntities) !== null && u !== void 0 ? u : t.decodeEntities) === !1 ? wa : t.xmlMode || t.encodeEntities !== "utf8" ? ts : ss;
  return Object.keys(e).map((n) => {
    var i, c;
    const h = (i = e[n]) !== null && i !== void 0 ? i : "";
    return t.xmlMode === "foreign" && (n = (c = Ha.get(n)) !== null && c !== void 0 ? c : n), !t.emptyAttrs && !t.xmlMode && h === "" ? n : `${n}="${s(h)}"`;
  }).join(" ");
}
const _u = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function ft(e, t = {}) {
  const u = "length" in e ? e : [e];
  let s = "";
  for (let n = 0; n < u.length; n++)
    s += Ya(u[n], t);
  return s;
}
function Ya(e, t) {
  switch (e.type) {
    case Aa:
      return ft(e.children, t);
    case Ra:
    case ga:
      return Qa(e);
    case pa:
      return Ka(e);
    case Sa:
      return Xa(e);
    case Na:
    case Ca:
    case Ia:
      return Va(e, t);
    case _a:
      return Wa(e, t);
  }
}
const qa = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), Ga = /* @__PURE__ */ new Set(["svg", "math"]);
function Va(e, t) {
  var u;
  t.xmlMode === "foreign" && (e.name = (u = Fa.get(e.name)) !== null && u !== void 0 ? u : e.name, e.parent && qa.has(e.parent.name) && (t = { ...t, xmlMode: !1 })), !t.xmlMode && Ga.has(e.name) && (t = { ...t, xmlMode: "foreign" });
  let s = `<${e.name}`;
  const n = va(e.attribs, t);
  return n && (s += ` ${n}`), e.children.length === 0 && (t.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    t.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    t.selfClosingTags && _u.has(e.name)
  )) ? (t.xmlMode || (s += " "), s += "/>") : (s += ">", e.children.length > 0 && (s += ft(e.children, t)), (t.xmlMode || !_u.has(e.name)) && (s += `</${e.name}>`)), s;
}
function Qa(e) {
  return `<${e.data}>`;
}
function Wa(e, t) {
  var u;
  let s = e.data || "";
  return ((u = t.encodeEntities) !== null && u !== void 0 ? u : t.decodeEntities) !== !1 && !(!t.xmlMode && e.parent && Ua.has(e.parent.name)) && (s = t.xmlMode || t.encodeEntities !== "utf8" ? ts(s) : as(s)), s;
}
function Xa(e) {
  return `<![CDATA[${e.children[0].data}]]>`;
}
function Ka(e) {
  return `<!--${e.data}-->`;
}
function ns(e, t) {
  return ft(e, t);
}
function ja(e, t) {
  return H(e) ? e.children.map((u) => ns(u, t)).join("") : "";
}
function Ze(e) {
  return Array.isArray(e) ? e.map(Ze).join("") : R(e) ? e.name === "br" ? `
` : Ze(e.children) : ht(e) ? Ze(e.children) : $(e) ? e.data : "";
}
function ge(e) {
  return Array.isArray(e) ? e.map(ge).join("") : H(e) && !dt(e) ? ge(e.children) : $(e) ? e.data : "";
}
function tt(e) {
  return Array.isArray(e) ? e.map(tt).join("") : H(e) && (e.type === D.Tag || ht(e)) ? tt(e.children) : $(e) ? e.data : "";
}
function Et(e) {
  return H(e) ? e.children : [];
}
function is(e) {
  return e.parent || null;
}
function rs(e) {
  const t = is(e);
  if (t != null)
    return Et(t);
  const u = [e];
  let { prev: s, next: n } = e;
  for (; s != null; )
    u.unshift(s), { prev: s } = s;
  for (; n != null; )
    u.push(n), { next: n } = n;
  return u;
}
function $a(e, t) {
  var u;
  return (u = e.attribs) === null || u === void 0 ? void 0 : u[t];
}
function za(e, t) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, t) && e.attribs[t] != null;
}
function Za(e) {
  return e.name;
}
function eu(e) {
  let { next: t } = e;
  for (; t !== null && !R(t); )
    ({ next: t } = t);
  return t;
}
function tu(e) {
  let { prev: t } = e;
  for (; t !== null && !R(t); )
    ({ prev: t } = t);
  return t;
}
function de(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    const t = e.parent.children, u = t.lastIndexOf(e);
    u >= 0 && t.splice(u, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
function Ja(e, t) {
  const u = t.prev = e.prev;
  u && (u.next = t);
  const s = t.next = e.next;
  s && (s.prev = t);
  const n = t.parent = e.parent;
  if (n) {
    const i = n.children;
    i[i.lastIndexOf(e)] = t, e.parent = null;
  }
}
function en(e, t) {
  if (de(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
    const u = e.children[e.children.length - 2];
    u.next = t, t.prev = u;
  } else
    t.prev = null;
}
function tn(e, t) {
  de(t);
  const { parent: u } = e, s = e.next;
  if (t.next = s, t.prev = e, e.next = t, t.parent = u, s) {
    if (s.prev = t, u) {
      const n = u.children;
      n.splice(n.lastIndexOf(s), 0, t);
    }
  } else
    u && u.children.push(t);
}
function un(e, t) {
  if (de(t), t.parent = e, t.prev = null, e.children.unshift(t) !== 1) {
    const u = e.children[1];
    u.prev = t, t.next = u;
  } else
    t.next = null;
}
function sn(e, t) {
  de(t);
  const { parent: u } = e;
  if (u) {
    const s = u.children;
    s.splice(s.indexOf(e), 0, t);
  }
  e.prev && (e.prev.next = t), t.parent = u, t.prev = e.prev, t.next = e, e.prev = t;
}
function Tt(e, t, u = !0, s = 1 / 0) {
  return uu(e, Array.isArray(t) ? t : [t], u, s);
}
function uu(e, t, u, s) {
  const n = [], i = [t], c = [0];
  for (; ; ) {
    if (c[0] >= i[0].length) {
      if (c.length === 1)
        return n;
      i.shift(), c.shift();
      continue;
    }
    const h = i[0][c[0]++];
    if (e(h) && (n.push(h), --s <= 0))
      return n;
    u && H(h) && h.children.length > 0 && (c.unshift(0), i.unshift(h.children));
  }
}
function an(e, t) {
  return t.find(e);
}
function su(e, t, u = !0) {
  let s = null;
  for (let n = 0; n < t.length && !s; n++) {
    const i = t[n];
    if (R(i))
      e(i) ? s = i : u && i.children.length > 0 && (s = su(e, i.children, !0));
    else
      continue;
  }
  return s;
}
function cs(e, t) {
  return t.some((u) => R(u) && (e(u) || cs(e, u.children)));
}
function nn(e, t) {
  const u = [], s = [t], n = [0];
  for (; ; ) {
    if (n[0] >= s[0].length) {
      if (s.length === 1)
        return u;
      s.shift(), n.shift();
      continue;
    }
    const i = s[0][n[0]++];
    R(i) && (e(i) && u.push(i), i.children.length > 0 && (n.unshift(0), s.unshift(i.children)));
  }
}
const ut = {
  tag_name(e) {
    return typeof e == "function" ? (t) => R(t) && e(t.name) : e === "*" ? R : (t) => R(t) && t.name === e;
  },
  tag_type(e) {
    return typeof e == "function" ? (t) => e(t.type) : (t) => t.type === e;
  },
  tag_contains(e) {
    return typeof e == "function" ? (t) => $(t) && e(t.data) : (t) => $(t) && t.data === e;
  }
};
function os(e, t) {
  return typeof t == "function" ? (u) => R(u) && t(u.attribs[e]) : (u) => R(u) && u.attribs[e] === t;
}
function rn(e, t) {
  return (u) => e(u) || t(u);
}
function ls(e) {
  const t = Object.keys(e).map((u) => {
    const s = e[u];
    return Object.prototype.hasOwnProperty.call(ut, u) ? ut[u](s) : os(u, s);
  });
  return t.length === 0 ? null : t.reduce(rn);
}
function cn(e, t) {
  const u = ls(e);
  return u ? u(t) : !0;
}
function on(e, t, u, s = 1 / 0) {
  const n = ls(e);
  return n ? Tt(n, t, u, s) : [];
}
function ln(e, t, u = !0) {
  return Array.isArray(t) || (t = [t]), su(os("id", e), t, u);
}
function Ne(e, t, u = !0, s = 1 / 0) {
  return Tt(ut.tag_name(e), t, u, s);
}
function hn(e, t, u = !0, s = 1 / 0) {
  return Tt(ut.tag_type(e), t, u, s);
}
function dn(e) {
  let t = e.length;
  for (; --t >= 0; ) {
    const u = e[t];
    if (t > 0 && e.lastIndexOf(u, t - 1) >= 0) {
      e.splice(t, 1);
      continue;
    }
    for (let s = u.parent; s; s = s.parent)
      if (e.includes(s)) {
        e.splice(t, 1);
        break;
      }
  }
  return e;
}
var Q;
(function(e) {
  e[e.DISCONNECTED = 1] = "DISCONNECTED", e[e.PRECEDING = 2] = "PRECEDING", e[e.FOLLOWING = 4] = "FOLLOWING", e[e.CONTAINS = 8] = "CONTAINS", e[e.CONTAINED_BY = 16] = "CONTAINED_BY";
})(Q || (Q = {}));
function hs(e, t) {
  const u = [], s = [];
  if (e === t)
    return 0;
  let n = H(e) ? e : e.parent;
  for (; n; )
    u.unshift(n), n = n.parent;
  for (n = H(t) ? t : t.parent; n; )
    s.unshift(n), n = n.parent;
  const i = Math.min(u.length, s.length);
  let c = 0;
  for (; c < i && u[c] === s[c]; )
    c++;
  if (c === 0)
    return Q.DISCONNECTED;
  const h = u[c - 1], d = h.children, E = u[c], A = s[c];
  return d.indexOf(E) > d.indexOf(A) ? h === t ? Q.FOLLOWING | Q.CONTAINED_BY : Q.FOLLOWING : h === e ? Q.PRECEDING | Q.CONTAINS : Q.PRECEDING;
}
function Ce(e) {
  return e = e.filter((t, u, s) => !s.includes(t, u + 1)), e.sort((t, u) => {
    const s = hs(t, u);
    return s & Q.PRECEDING ? -1 : s & Q.FOLLOWING ? 1 : 0;
  }), e;
}
function fn(e) {
  const t = st(An, e);
  return t ? t.name === "feed" ? En(t) : Tn(t) : null;
}
function En(e) {
  var t;
  const u = e.children, s = {
    type: "atom",
    items: Ne("entry", u).map((c) => {
      var h;
      const { children: d } = c, E = { media: ds(d) };
      Y(E, "id", "id", d), Y(E, "title", "title", d);
      const A = (h = st("link", d)) === null || h === void 0 ? void 0 : h.attribs.href;
      A && (E.link = A);
      const p = te("summary", d) || te("content", d);
      p && (E.description = p);
      const N = te("updated", d);
      return N && (E.pubDate = new Date(N)), E;
    })
  };
  Y(s, "id", "id", u), Y(s, "title", "title", u);
  const n = (t = st("link", u)) === null || t === void 0 ? void 0 : t.attribs.href;
  n && (s.link = n), Y(s, "description", "subtitle", u);
  const i = te("updated", u);
  return i && (s.updated = new Date(i)), Y(s, "author", "email", u, !0), s;
}
function Tn(e) {
  var t, u;
  const s = (u = (t = st("channel", e.children)) === null || t === void 0 ? void 0 : t.children) !== null && u !== void 0 ? u : [], n = {
    type: e.name.substr(0, 3),
    id: "",
    items: Ne("item", e.children).map((c) => {
      const { children: h } = c, d = { media: ds(h) };
      Y(d, "id", "guid", h), Y(d, "title", "title", h), Y(d, "link", "link", h), Y(d, "description", "description", h);
      const E = te("pubDate", h) || te("dc:date", h);
      return E && (d.pubDate = new Date(E)), d;
    })
  };
  Y(n, "title", "title", s), Y(n, "link", "link", s), Y(n, "description", "description", s);
  const i = te("lastBuildDate", s);
  return i && (n.updated = new Date(i)), Y(n, "author", "managingEditor", s, !0), n;
}
const mn = ["url", "type", "lang"], bn = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function ds(e) {
  return Ne("media:content", e).map((t) => {
    const { attribs: u } = t, s = {
      medium: u.medium,
      isDefault: !!u.isDefault
    };
    for (const n of mn)
      u[n] && (s[n] = u[n]);
    for (const n of bn)
      u[n] && (s[n] = parseInt(u[n], 10));
    return u.expression && (s.expression = u.expression), s;
  });
}
function st(e, t) {
  return Ne(e, t, !0, 1)[0];
}
function te(e, t, u = !1) {
  return ge(Ne(e, t, u, 1)).trim();
}
function Y(e, t, u, s, n = !1) {
  const i = te(u, s, n);
  i && (e[t] = i);
}
function An(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
const mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return Q;
  },
  append: tn,
  appendChild: en,
  compareDocumentPosition: hs,
  existsOne: cs,
  filter: Tt,
  find: uu,
  findAll: nn,
  findOne: su,
  findOneChild: an,
  getAttributeValue: $a,
  getChildren: Et,
  getElementById: ln,
  getElements: on,
  getElementsByTagName: Ne,
  getElementsByTagType: hn,
  getFeed: fn,
  getInnerHTML: ja,
  getName: Za,
  getOuterHTML: ns,
  getParent: is,
  getSiblings: rs,
  getText: Ze,
  hasAttrib: za,
  hasChildren: H,
  innerText: tt,
  isCDATA: ht,
  isComment: dt,
  isDocument: he,
  isTag: R,
  isText: $,
  nextElementSibling: eu,
  prepend: sn,
  prependChild: un,
  prevElementSibling: tu,
  removeElement: de,
  removeSubsets: dn,
  replaceElement: Ja,
  testElement: cn,
  textContent: ge,
  uniqueSort: Ce
}, Symbol.toStringTag, { value: "Module" }));
function fs(e, t, u) {
  return e ? e(t ?? e._root.children, null, void 0, u).toString() : "";
}
function _n(e, t) {
  return !t && typeof e == "object" && e != null && !("length" in e) && !("type" in e);
}
function gn(e, t) {
  const u = _n(e) ? (t = e, void 0) : e, s = {
    ...Xt,
    ...this === null || this === void 0 ? void 0 : this._options,
    ...Bt(t ?? {})
  };
  return fs(this, u, s);
}
function pn(e) {
  const t = { ...this._options, xmlMode: !0 };
  return fs(this, e, t);
}
function we(e) {
  const t = e || (this ? this.root() : []);
  let u = "";
  for (let s = 0; s < t.length; s++)
    u += ge(t[s]);
  return u;
}
function Nn(e, t, u = typeof t == "boolean" ? t : !1) {
  if (!e || typeof e != "string")
    return null;
  typeof t == "boolean" && (u = t);
  const s = this.load(e, Xt, !1);
  return u || s("script").remove(), s.root()[0].children.slice();
}
function Cn() {
  return this(this._root);
}
function Es(e, t) {
  if (t === e)
    return !1;
  let u = t;
  for (; u && u !== u.parent; )
    if (u = u.parent, u === e)
      return !0;
  return !1;
}
function In(e, t) {
  if (!gu(e) || !gu(t))
    return;
  let u = e.length;
  const s = +t.length;
  for (let n = 0; n < s; n++)
    e[u++] = t[n];
  return e.length = u, e;
}
function gu(e) {
  if (Array.isArray(e))
    return !0;
  if (typeof e != "object" || !Object.prototype.hasOwnProperty.call(e, "length") || typeof e.length != "number" || e.length < 0)
    return !1;
  for (let t = 0; t < e.length; t++)
    if (!(t in e))
      return !1;
  return !0;
}
const Sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  contains: Es,
  html: gn,
  merge: In,
  parseHTML: Nn,
  root: Cn,
  text: we,
  xml: pn
}, Symbol.toStringTag, { value: "Module" }));
function z(e) {
  return e.cheerio != null;
}
function Rn(e) {
  return e.replace(/[_.-](\w|$)/g, (t, u) => u.toUpperCase());
}
function Ln(e) {
  return e.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function M(e, t) {
  const u = e.length;
  for (let s = 0; s < u; s++)
    t(e[s], s);
  return e;
}
function Ut(e) {
  const t = "length" in e ? Array.prototype.map.call(e, (s) => et(s, !0)) : [et(e, !0)], u = new oe(t);
  return t.forEach((s) => {
    s.parent = u;
  }), t;
}
var re;
(function(e) {
  e[e.LowerA = 97] = "LowerA", e[e.LowerZ = 122] = "LowerZ", e[e.UpperA = 65] = "UpperA", e[e.UpperZ = 90] = "UpperZ", e[e.Exclamation = 33] = "Exclamation";
})(re || (re = {}));
function wt(e) {
  const t = e.indexOf("<");
  if (t < 0 || t > e.length - 3)
    return !1;
  const u = e.charCodeAt(t + 1);
  return (u >= re.LowerA && u <= re.LowerZ || u >= re.UpperA && u <= re.UpperZ || u === re.Exclamation) && e.includes(">", t + 2);
}
const Ae = Object.prototype.hasOwnProperty, ve = /\s+/, St = "data-", pu = {
  null: null,
  true: !0,
  false: !1
}, au = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, On = /^{[^]*}$|^\[[^]*]$/;
function at(e, t, u) {
  var s;
  if (!(!e || !R(e))) {
    if ((s = e.attribs) !== null && s !== void 0 || (e.attribs = {}), !t)
      return e.attribs;
    if (Ae.call(e.attribs, t))
      return !u && au.test(t) ? t : e.attribs[t];
    if (e.name === "option" && t === "value")
      return we(e.children);
    if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && t === "value")
      return "on";
  }
}
function _e(e, t, u) {
  u === null ? Ts(e, t) : e.attribs[t] = `${u}`;
}
function Dn(e, t) {
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e != "string")
        throw new Error("Bad combination of arguments.");
      return M(this, (u, s) => {
        R(u) && _e(u, e, t.call(u, s, u.attribs[e]));
      });
    }
    return M(this, (u) => {
      R(u) && (typeof e == "object" ? Object.keys(e).forEach((s) => {
        const n = e[s];
        _e(u, s, n);
      }) : _e(u, e, t));
    });
  }
  return arguments.length > 1 ? this : at(this[0], e, this.options.xmlMode);
}
function Nu(e, t, u) {
  return t in e ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    e[t]
  ) : !u && au.test(t) ? at(e, t, !1) !== void 0 : at(e, t, u);
}
function Rt(e, t, u, s) {
  t in e ? e[t] = u : _e(e, t, !s && au.test(t) ? u ? "" : null : `${u}`);
}
function xn(e, t) {
  var u;
  if (typeof e == "string" && t === void 0) {
    const s = this[0];
    if (!s || !R(s))
      return;
    switch (e) {
      case "style": {
        const n = this.css(), i = Object.keys(n);
        return i.forEach((c, h) => {
          n[h] = c;
        }), n.length = i.length, n;
      }
      case "tagName":
      case "nodeName":
        return s.name.toUpperCase();
      case "href":
      case "src": {
        const n = (u = s.attribs) === null || u === void 0 ? void 0 : u[e];
        return typeof URL < "u" && (e === "href" && (s.tagName === "a" || s.name === "link") || e === "src" && (s.tagName === "img" || s.tagName === "iframe" || s.tagName === "audio" || s.tagName === "video" || s.tagName === "source")) && n !== void 0 && this.options.baseURI ? new URL(n, this.options.baseURI).href : n;
      }
      case "innerText":
        return tt(s);
      case "textContent":
        return ge(s);
      case "outerHTML":
        return this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return Nu(s, e, this.options.xmlMode);
    }
  }
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e == "object")
        throw new Error("Bad combination of arguments.");
      return M(this, (s, n) => {
        R(s) && Rt(s, e, t.call(s, n, Nu(s, e, this.options.xmlMode)), this.options.xmlMode);
      });
    }
    return M(this, (s) => {
      R(s) && (typeof e == "object" ? Object.keys(e).forEach((n) => {
        const i = e[n];
        Rt(s, n, i, this.options.xmlMode);
      }) : Rt(s, e, t, this.options.xmlMode));
    });
  }
}
function Cu(e, t, u) {
  var s;
  const n = e;
  (s = n.data) !== null && s !== void 0 || (n.data = {}), typeof t == "object" ? Object.assign(n.data, t) : typeof t == "string" && u !== void 0 && (n.data[t] = u);
}
function Iu(e, t) {
  let u, s, n;
  t == null ? (u = Object.keys(e.attribs).filter((i) => i.startsWith(St)), s = u.map((i) => Rn(i.slice(St.length)))) : (u = [St + Ln(t)], s = [t]);
  for (let i = 0; i < u.length; ++i) {
    const c = u[i], h = s[i];
    if (Ae.call(e.attribs, c) && !Ae.call(e.data, h)) {
      if (n = e.attribs[c], Ae.call(pu, n))
        n = pu[n];
      else if (n === String(Number(n)))
        n = Number(n);
      else if (On.test(n))
        try {
          n = JSON.parse(n);
        } catch {
        }
      e.data[h] = n;
    }
  }
  return t == null ? e.data : n;
}
function Pn(e, t) {
  var u;
  const s = this[0];
  if (!s || !R(s))
    return;
  const n = s;
  return (u = n.data) !== null && u !== void 0 || (n.data = {}), e ? typeof e == "object" || t !== void 0 ? (M(this, (i) => {
    R(i) && (typeof e == "object" ? Cu(i, e) : Cu(i, e, t));
  }), this) : Ae.call(n.data, e) ? n.data[e] : Iu(n, e) : Iu(n);
}
function Mn(e) {
  const t = arguments.length === 0, u = this[0];
  if (!u || !R(u))
    return t ? void 0 : this;
  switch (u.name) {
    case "textarea":
      return this.text(e);
    case "select": {
      const s = this.find("option:selected");
      if (!t) {
        if (this.attr("multiple") == null && typeof e == "object")
          return this;
        this.find("option").removeAttr("selected");
        const n = typeof e != "object" ? [e] : e;
        for (let i = 0; i < n.length; i++)
          this.find(`option[value="${n[i]}"]`).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? s.toArray().map((n) => we(n.children)) : s.attr("value");
    }
    case "input":
    case "option":
      return t ? this.attr("value") : this.attr("value", e);
  }
}
function Ts(e, t) {
  !e.attribs || !Ae.call(e.attribs, t) || delete e.attribs[t];
}
function nt(e) {
  return e ? e.trim().split(ve) : [];
}
function yn(e) {
  const t = nt(e);
  for (let u = 0; u < t.length; u++)
    M(this, (s) => {
      R(s) && Ts(s, t[u]);
    });
  return this;
}
function Bn(e) {
  return this.toArray().some((t) => {
    const u = R(t) && t.attribs.class;
    let s = -1;
    if (u && e.length)
      for (; (s = u.indexOf(e, s + 1)) > -1; ) {
        const n = s + e.length;
        if ((s === 0 || ve.test(u[s - 1])) && (n === u.length || ve.test(u[n])))
          return !0;
      }
    return !1;
  });
}
function ms(e) {
  if (typeof e == "function")
    return M(this, (s, n) => {
      if (R(s)) {
        const i = s.attribs.class || "";
        ms.call([s], e.call(s, n, i));
      }
    });
  if (!e || typeof e != "string")
    return this;
  const t = e.split(ve), u = this.length;
  for (let s = 0; s < u; s++) {
    const n = this[s];
    if (!R(n))
      continue;
    const i = at(n, "class", !1);
    if (!i)
      _e(n, "class", t.join(" ").trim());
    else {
      let c = ` ${i} `;
      for (let h = 0; h < t.length; h++) {
        const d = `${t[h]} `;
        c.includes(` ${d}`) || (c += d);
      }
      _e(n, "class", c.trim());
    }
  }
  return this;
}
function bs(e) {
  if (typeof e == "function")
    return M(this, (n, i) => {
      R(n) && bs.call([n], e.call(n, i, n.attribs.class || ""));
    });
  const t = nt(e), u = t.length, s = arguments.length === 0;
  return M(this, (n) => {
    if (R(n))
      if (s)
        n.attribs.class = "";
      else {
        const i = nt(n.attribs.class);
        let c = !1;
        for (let h = 0; h < u; h++) {
          const d = i.indexOf(t[h]);
          d >= 0 && (i.splice(d, 1), c = !0, h--);
        }
        c && (n.attribs.class = i.join(" "));
      }
  });
}
function As(e, t) {
  if (typeof e == "function")
    return M(this, (c, h) => {
      R(c) && As.call([c], e.call(c, h, c.attribs.class || "", t), t);
    });
  if (!e || typeof e != "string")
    return this;
  const u = e.split(ve), s = u.length, n = typeof t == "boolean" ? t ? 1 : -1 : 0, i = this.length;
  for (let c = 0; c < i; c++) {
    const h = this[c];
    if (!R(h))
      continue;
    const d = nt(h.attribs.class);
    for (let E = 0; E < s; E++) {
      const A = d.indexOf(u[E]);
      n >= 0 && A < 0 ? d.push(u[E]) : n <= 0 && A >= 0 && d.splice(A, 1);
    }
    h.attribs.class = d.join(" ");
  }
  return this;
}
const kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClass: ms,
  attr: Dn,
  data: Pn,
  hasClass: Bn,
  prop: xn,
  removeAttr: yn,
  removeClass: bs,
  toggleClass: As,
  val: Mn
}, Symbol.toStringTag, { value: "Module" }));
var I;
(function(e) {
  e.Attribute = "attribute", e.Pseudo = "pseudo", e.PseudoElement = "pseudo-element", e.Tag = "tag", e.Universal = "universal", e.Adjacent = "adjacent", e.Child = "child", e.Descendant = "descendant", e.Parent = "parent", e.Sibling = "sibling", e.ColumnCombinator = "column-combinator";
})(I || (I = {}));
var B;
(function(e) {
  e.Any = "any", e.Element = "element", e.End = "end", e.Equals = "equals", e.Exists = "exists", e.Hyphen = "hyphen", e.Not = "not", e.Start = "start";
})(B || (B = {}));
const Su = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, Fn = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, Hn = /* @__PURE__ */ new Map([
  [126, B.Element],
  [94, B.Start],
  [36, B.End],
  [42, B.Any],
  [33, B.Not],
  [124, B.Hyphen]
]), Un = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function Pe(e) {
  switch (e.type) {
    case I.Adjacent:
    case I.Child:
    case I.Descendant:
    case I.Parent:
    case I.Sibling:
    case I.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const wn = /* @__PURE__ */ new Set(["contains", "icontains"]);
function vn(e, t, u) {
  const s = parseInt(t, 16) - 65536;
  return s !== s || u ? t : s < 0 ? (
    // BMP codepoint
    String.fromCharCode(s + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(s >> 10 | 55296, s & 1023 | 56320)
  );
}
function Le(e) {
  return e.replace(Fn, vn);
}
function Lt(e) {
  return e === 39 || e === 34;
}
function Ru(e) {
  return e === 32 || e === 9 || e === 10 || e === 12 || e === 13;
}
function bt(e) {
  const t = [], u = _s(t, `${e}`, 0);
  if (u < e.length)
    throw new Error(`Unmatched selector: ${e.slice(u)}`);
  return t;
}
function _s(e, t, u) {
  let s = [];
  function n(N) {
    const C = t.slice(u + N).match(Su);
    if (!C)
      throw new Error(`Expected name, found ${t.slice(u)}`);
    const [S] = C;
    return u += N + S.length, Le(S);
  }
  function i(N) {
    for (u += N; u < t.length && Ru(t.charCodeAt(u)); )
      u++;
  }
  function c() {
    u += 1;
    const N = u;
    let C = 1;
    for (; C > 0 && u < t.length; u++)
      t.charCodeAt(u) === 40 && !h(u) ? C++ : t.charCodeAt(u) === 41 && !h(u) && C--;
    if (C)
      throw new Error("Parenthesis not matched");
    return Le(t.slice(N, u - 1));
  }
  function h(N) {
    let C = 0;
    for (; t.charCodeAt(--N) === 92; )
      C++;
    return (C & 1) === 1;
  }
  function d() {
    if (s.length > 0 && Pe(s[s.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function E(N) {
    if (s.length > 0 && s[s.length - 1].type === I.Descendant) {
      s[s.length - 1].type = N;
      return;
    }
    d(), s.push({ type: N });
  }
  function A(N, C) {
    s.push({
      type: I.Attribute,
      name: N,
      action: C,
      value: n(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function p() {
    if (s.length && s[s.length - 1].type === I.Descendant && s.pop(), s.length === 0)
      throw new Error("Empty sub-selector");
    e.push(s);
  }
  if (i(0), t.length === u)
    return u;
  e:
    for (; u < t.length; ) {
      const N = t.charCodeAt(u);
      switch (N) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (s.length === 0 || s[0].type !== I.Descendant) && (d(), s.push({ type: I.Descendant })), i(1);
          break;
        }
        case 62: {
          E(I.Child), i(1);
          break;
        }
        case 60: {
          E(I.Parent), i(1);
          break;
        }
        case 126: {
          E(I.Sibling), i(1);
          break;
        }
        case 43: {
          E(I.Adjacent), i(1);
          break;
        }
        case 46: {
          A("class", B.Element);
          break;
        }
        case 35: {
          A("id", B.Equals);
          break;
        }
        case 91: {
          i(1);
          let C, S = null;
          t.charCodeAt(u) === 124 ? C = n(1) : t.startsWith("*|", u) ? (S = "*", C = n(2)) : (C = n(0), t.charCodeAt(u) === 124 && t.charCodeAt(u + 1) !== 61 && (S = C, C = n(1))), i(0);
          let y = B.Exists;
          const W = Hn.get(t.charCodeAt(u));
          if (W) {
            if (y = W, t.charCodeAt(u + 1) !== 61)
              throw new Error("Expected `=`");
            i(2);
          } else
            t.charCodeAt(u) === 61 && (y = B.Equals, i(1));
          let Ee = "", Te = null;
          if (y !== "exists") {
            if (Lt(t.charCodeAt(u))) {
              const We = t.charCodeAt(u);
              let ae = u + 1;
              for (; ae < t.length && (t.charCodeAt(ae) !== We || h(ae)); )
                ae += 1;
              if (t.charCodeAt(ae) !== We)
                throw new Error("Attribute value didn't end");
              Ee = Le(t.slice(u + 1, ae)), u = ae + 1;
            } else {
              const We = u;
              for (; u < t.length && (!Ru(t.charCodeAt(u)) && t.charCodeAt(u) !== 93 || h(u)); )
                u += 1;
              Ee = Le(t.slice(We, u));
            }
            i(0);
            const Re = t.charCodeAt(u) | 32;
            Re === 115 ? (Te = !1, i(1)) : Re === 105 && (Te = !0, i(1));
          }
          if (t.charCodeAt(u) !== 93)
            throw new Error("Attribute selector didn't terminate");
          u += 1;
          const Se = {
            type: I.Attribute,
            name: C,
            action: y,
            value: Ee,
            namespace: S,
            ignoreCase: Te
          };
          s.push(Se);
          break;
        }
        case 58: {
          if (t.charCodeAt(u + 1) === 58) {
            s.push({
              type: I.PseudoElement,
              name: n(2).toLowerCase(),
              data: t.charCodeAt(u) === 40 ? c() : null
            });
            continue;
          }
          const C = n(1).toLowerCase();
          let S = null;
          if (t.charCodeAt(u) === 40)
            if (Un.has(C)) {
              if (Lt(t.charCodeAt(u + 1)))
                throw new Error(`Pseudo-selector ${C} cannot be quoted`);
              if (S = [], u = _s(S, t, u + 1), t.charCodeAt(u) !== 41)
                throw new Error(`Missing closing parenthesis in :${C} (${t})`);
              u += 1;
            } else {
              if (S = c(), wn.has(C)) {
                const y = S.charCodeAt(0);
                y === S.charCodeAt(S.length - 1) && Lt(y) && (S = S.slice(1, -1));
              }
              S = Le(S);
            }
          s.push({ type: I.Pseudo, name: C, data: S });
          break;
        }
        case 44: {
          p(), s = [], i(1);
          break;
        }
        default: {
          if (t.startsWith("/*", u)) {
            const y = t.indexOf("*/", u + 2);
            if (y < 0)
              throw new Error("Comment was not terminated");
            u = y + 2, s.length === 0 && i(0);
            break;
          }
          let C = null, S;
          if (N === 42)
            u += 1, S = "*";
          else if (N === 124) {
            if (S = "", t.charCodeAt(u + 1) === 124) {
              E(I.ColumnCombinator), i(2);
              break;
            }
          } else if (Su.test(t.slice(u)))
            S = n(0);
          else
            break e;
          t.charCodeAt(u) === 124 && t.charCodeAt(u + 1) !== 124 && (C = S, t.charCodeAt(u + 1) === 42 ? (S = "*", u += 2) : S = n(1)), s.push(S === "*" ? { type: I.Universal, namespace: C } : { type: I.Tag, name: S, namespace: C });
        }
      }
    }
  return p(), u;
}
var it = {
  trueFunc: function() {
    return !0;
  },
  falseFunc: function() {
    return !1;
  }
};
const L = /* @__PURE__ */ ma(it), gs = /* @__PURE__ */ new Map([
  [I.Universal, 50],
  [I.Tag, 30],
  [I.Attribute, 1],
  [I.Pseudo, 0]
]);
function nu(e) {
  return !gs.has(e.type);
}
const Yn = /* @__PURE__ */ new Map([
  [B.Exists, 10],
  [B.Equals, 8],
  [B.Not, 7],
  [B.Start, 6],
  [B.End, 6],
  [B.Any, 5]
]);
function qn(e) {
  const t = e.map(ps);
  for (let u = 1; u < e.length; u++) {
    const s = t[u];
    if (!(s < 0))
      for (let n = u - 1; n >= 0 && s < t[n]; n--) {
        const i = e[n + 1];
        e[n + 1] = e[n], e[n] = i, t[n + 1] = t[n], t[n] = s;
      }
  }
}
function ps(e) {
  var t, u;
  let s = (t = gs.get(e.type)) !== null && t !== void 0 ? t : -1;
  return e.type === I.Attribute ? (s = (u = Yn.get(e.action)) !== null && u !== void 0 ? u : 4, e.action === B.Equals && e.name === "id" && (s = 9), e.ignoreCase && (s >>= 1)) : e.type === I.Pseudo && (e.data ? e.name === "has" || e.name === "contains" ? s = 0 : Array.isArray(e.data) ? (s = Math.min(...e.data.map((n) => Math.min(...n.map(ps)))), s < 0 && (s = 0)) : s = 2 : s = 3), s;
}
const Gn = /[-[\]{}()*+?.,\\^$|#\s]/g;
function Lu(e) {
  return e.replace(Gn, "\\$&");
}
const Vn = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function ne(e, t) {
  return typeof e.ignoreCase == "boolean" ? e.ignoreCase : e.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && Vn.has(e.name);
}
const Qn = {
  equals(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: i } = t;
    return ne(t, u) ? (i = i.toLowerCase(), (c) => {
      const h = s.getAttributeValue(c, n);
      return h != null && h.length === i.length && h.toLowerCase() === i && e(c);
    }) : (c) => s.getAttributeValue(c, n) === i && e(c);
  },
  hyphen(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: i } = t;
    const c = i.length;
    return ne(t, u) ? (i = i.toLowerCase(), function(d) {
      const E = s.getAttributeValue(d, n);
      return E != null && (E.length === c || E.charAt(c) === "-") && E.substr(0, c).toLowerCase() === i && e(d);
    }) : function(d) {
      const E = s.getAttributeValue(d, n);
      return E != null && (E.length === c || E.charAt(c) === "-") && E.substr(0, c) === i && e(d);
    };
  },
  element(e, t, u) {
    const { adapter: s } = u, { name: n, value: i } = t;
    if (/\s/.test(i))
      return L.falseFunc;
    const c = new RegExp(`(?:^|\\s)${Lu(i)}(?:$|\\s)`, ne(t, u) ? "i" : "");
    return function(d) {
      const E = s.getAttributeValue(d, n);
      return E != null && E.length >= i.length && c.test(E) && e(d);
    };
  },
  exists(e, { name: t }, { adapter: u }) {
    return (s) => u.hasAttrib(s, t) && e(s);
  },
  start(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: i } = t;
    const c = i.length;
    return c === 0 ? L.falseFunc : ne(t, u) ? (i = i.toLowerCase(), (h) => {
      const d = s.getAttributeValue(h, n);
      return d != null && d.length >= c && d.substr(0, c).toLowerCase() === i && e(h);
    }) : (h) => {
      var d;
      return !!(!((d = s.getAttributeValue(h, n)) === null || d === void 0) && d.startsWith(i)) && e(h);
    };
  },
  end(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: i } = t;
    const c = -i.length;
    return c === 0 ? L.falseFunc : ne(t, u) ? (i = i.toLowerCase(), (h) => {
      var d;
      return ((d = s.getAttributeValue(h, n)) === null || d === void 0 ? void 0 : d.substr(c).toLowerCase()) === i && e(h);
    }) : (h) => {
      var d;
      return !!(!((d = s.getAttributeValue(h, n)) === null || d === void 0) && d.endsWith(i)) && e(h);
    };
  },
  any(e, t, u) {
    const { adapter: s } = u, { name: n, value: i } = t;
    if (i === "")
      return L.falseFunc;
    if (ne(t, u)) {
      const c = new RegExp(Lu(i), "i");
      return function(d) {
        const E = s.getAttributeValue(d, n);
        return E != null && E.length >= i.length && c.test(E) && e(d);
      };
    }
    return (c) => {
      var h;
      return !!(!((h = s.getAttributeValue(c, n)) === null || h === void 0) && h.includes(i)) && e(c);
    };
  },
  not(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: i } = t;
    return i === "" ? (c) => !!s.getAttributeValue(c, n) && e(c) : ne(t, u) ? (i = i.toLowerCase(), (c) => {
      const h = s.getAttributeValue(c, n);
      return (h == null || h.length !== i.length || h.toLowerCase() !== i) && e(c);
    }) : (c) => s.getAttributeValue(c, n) !== i && e(c);
  }
}, Wn = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), Ou = "0".charCodeAt(0), Xn = "9".charCodeAt(0);
function Kn(e) {
  if (e = e.trim().toLowerCase(), e === "even")
    return [2, 0];
  if (e === "odd")
    return [2, 1];
  let t = 0, u = 0, s = i(), n = c();
  if (t < e.length && e.charAt(t) === "n" && (t++, u = s * (n ?? 1), h(), t < e.length ? (s = i(), h(), n = c()) : s = n = 0), n === null || t < e.length)
    throw new Error(`n-th rule couldn't be parsed ('${e}')`);
  return [u, s * n];
  function i() {
    return e.charAt(t) === "-" ? (t++, -1) : (e.charAt(t) === "+" && t++, 1);
  }
  function c() {
    const d = t;
    let E = 0;
    for (; t < e.length && e.charCodeAt(t) >= Ou && e.charCodeAt(t) <= Xn; )
      E = E * 10 + (e.charCodeAt(t) - Ou), t++;
    return t === d ? null : E;
  }
  function h() {
    for (; t < e.length && Wn.has(e.charCodeAt(t)); )
      t++;
  }
}
function jn(e) {
  const t = e[0], u = e[1] - 1;
  if (u < 0 && t <= 0)
    return L.falseFunc;
  if (t === -1)
    return (i) => i <= u;
  if (t === 0)
    return (i) => i === u;
  if (t === 1)
    return u < 0 ? L.trueFunc : (i) => i >= u;
  const s = Math.abs(t), n = (u % s + s) % s;
  return t > 1 ? (i) => i >= u && i % s === n : (i) => i <= u && i % s === n;
}
function Xe(e) {
  return jn(Kn(e));
}
function Ke(e, t) {
  return (u) => {
    const s = t.getParent(u);
    return s != null && t.isTag(s) && e(u);
  };
}
const vt = {
  contains(e, t, { adapter: u }) {
    return function(n) {
      return e(n) && u.getText(n).includes(t);
    };
  },
  icontains(e, t, { adapter: u }) {
    const s = t.toLowerCase();
    return function(i) {
      return e(i) && u.getText(i).toLowerCase().includes(s);
    };
  },
  // Location specific methods
  "nth-child"(e, t, { adapter: u, equals: s }) {
    const n = Xe(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? Ke(e, u) : function(c) {
      const h = u.getSiblings(c);
      let d = 0;
      for (let E = 0; E < h.length && !s(c, h[E]); E++)
        u.isTag(h[E]) && d++;
      return n(d) && e(c);
    };
  },
  "nth-last-child"(e, t, { adapter: u, equals: s }) {
    const n = Xe(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? Ke(e, u) : function(c) {
      const h = u.getSiblings(c);
      let d = 0;
      for (let E = h.length - 1; E >= 0 && !s(c, h[E]); E--)
        u.isTag(h[E]) && d++;
      return n(d) && e(c);
    };
  },
  "nth-of-type"(e, t, { adapter: u, equals: s }) {
    const n = Xe(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? Ke(e, u) : function(c) {
      const h = u.getSiblings(c);
      let d = 0;
      for (let E = 0; E < h.length; E++) {
        const A = h[E];
        if (s(c, A))
          break;
        u.isTag(A) && u.getName(A) === u.getName(c) && d++;
      }
      return n(d) && e(c);
    };
  },
  "nth-last-of-type"(e, t, { adapter: u, equals: s }) {
    const n = Xe(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? Ke(e, u) : function(c) {
      const h = u.getSiblings(c);
      let d = 0;
      for (let E = h.length - 1; E >= 0; E--) {
        const A = h[E];
        if (s(c, A))
          break;
        u.isTag(A) && u.getName(A) === u.getName(c) && d++;
      }
      return n(d) && e(c);
    };
  },
  // TODO determine the actual root element
  root(e, t, { adapter: u }) {
    return (s) => {
      const n = u.getParent(s);
      return (n == null || !u.isTag(n)) && e(s);
    };
  },
  scope(e, t, u, s) {
    const { equals: n } = u;
    return !s || s.length === 0 ? vt.root(e, t, u) : s.length === 1 ? (i) => n(s[0], i) && e(i) : (i) => s.includes(i) && e(i);
  },
  hover: Ot("isHovered"),
  visited: Ot("isVisited"),
  active: Ot("isActive")
};
function Ot(e) {
  return function(u, s, { adapter: n }) {
    const i = n[e];
    return typeof i != "function" ? L.falseFunc : function(h) {
      return i(h) && u(h);
    };
  };
}
const Du = {
  empty(e, { adapter: t }) {
    return !t.getChildren(e).some((u) => (
      // FIXME: `getText` call is potentially expensive.
      t.isTag(u) || t.getText(u) !== ""
    ));
  },
  "first-child"(e, { adapter: t, equals: u }) {
    if (t.prevElementSibling)
      return t.prevElementSibling(e) == null;
    const s = t.getSiblings(e).find((n) => t.isTag(n));
    return s != null && u(e, s);
  },
  "last-child"(e, { adapter: t, equals: u }) {
    const s = t.getSiblings(e);
    for (let n = s.length - 1; n >= 0; n--) {
      if (u(e, s[n]))
        return !0;
      if (t.isTag(s[n]))
        break;
    }
    return !1;
  },
  "first-of-type"(e, { adapter: t, equals: u }) {
    const s = t.getSiblings(e), n = t.getName(e);
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (u(e, c))
        return !0;
      if (t.isTag(c) && t.getName(c) === n)
        break;
    }
    return !1;
  },
  "last-of-type"(e, { adapter: t, equals: u }) {
    const s = t.getSiblings(e), n = t.getName(e);
    for (let i = s.length - 1; i >= 0; i--) {
      const c = s[i];
      if (u(e, c))
        return !0;
      if (t.isTag(c) && t.getName(c) === n)
        break;
    }
    return !1;
  },
  "only-of-type"(e, { adapter: t, equals: u }) {
    const s = t.getName(e);
    return t.getSiblings(e).every((n) => u(e, n) || !t.isTag(n) || t.getName(n) !== s);
  },
  "only-child"(e, { adapter: t, equals: u }) {
    return t.getSiblings(e).every((s) => u(e, s) || !t.isTag(s));
  }
};
function xu(e, t, u, s) {
  if (u === null) {
    if (e.length > s)
      throw new Error(`Pseudo-class :${t} requires an argument`);
  } else if (e.length === s)
    throw new Error(`Pseudo-class :${t} doesn't have any arguments`);
}
const $n = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
}, Ns = {};
function zn(e, t) {
  return e === L.falseFunc ? L.falseFunc : (u) => t.isTag(u) && e(u);
}
function Cs(e, t) {
  const u = t.getSiblings(e);
  if (u.length <= 1)
    return [];
  const s = u.indexOf(e);
  return s < 0 || s === u.length - 1 ? [] : u.slice(s + 1).filter(t.isTag);
}
function Yt(e) {
  return {
    xmlMode: !!e.xmlMode,
    lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
    lowerCaseTags: !!e.lowerCaseTags,
    quirksMode: !!e.quirksMode,
    cacheResults: !!e.cacheResults,
    pseudos: e.pseudos,
    adapter: e.adapter,
    equals: e.equals
  };
}
const Dt = (e, t, u, s, n) => {
  const i = n(t, Yt(u), s);
  return i === L.trueFunc ? e : i === L.falseFunc ? L.falseFunc : (c) => i(c) && e(c);
}, xt = {
  is: Dt,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: Dt,
  where: Dt,
  not(e, t, u, s, n) {
    const i = n(t, Yt(u), s);
    return i === L.falseFunc ? e : i === L.trueFunc ? L.falseFunc : (c) => !i(c) && e(c);
  },
  has(e, t, u, s, n) {
    const { adapter: i } = u, c = Yt(u);
    c.relativeSelector = !0;
    const h = t.some((A) => A.some(nu)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [Ns]
    ) : void 0, d = n(t, c, h);
    if (d === L.falseFunc)
      return L.falseFunc;
    const E = zn(d, i);
    if (h && d !== L.trueFunc) {
      const { shouldTestNextSiblings: A = !1 } = d;
      return (p) => {
        if (!e(p))
          return !1;
        h[0] = p;
        const N = i.getChildren(p), C = A ? [...N, ...Cs(p, i)] : N;
        return i.existsOne(E, C);
      };
    }
    return (A) => e(A) && i.existsOne(E, i.getChildren(A));
  }
};
function Zn(e, t, u, s, n) {
  var i;
  const { name: c, data: h } = t;
  if (Array.isArray(h)) {
    if (!(c in xt))
      throw new Error(`Unknown pseudo-class :${c}(${h})`);
    return xt[c](e, h, u, s, n);
  }
  const d = (i = u.pseudos) === null || i === void 0 ? void 0 : i[c], E = typeof d == "string" ? d : $n[c];
  if (typeof E == "string") {
    if (h != null)
      throw new Error(`Pseudo ${c} doesn't have any arguments`);
    const A = bt(E);
    return xt.is(e, A, u, s, n);
  }
  if (typeof d == "function")
    return xu(d, c, h, 1), (A) => d(A, h) && e(A);
  if (c in vt)
    return vt[c](e, h, u, s);
  if (c in Du) {
    const A = Du[c];
    return xu(A, c, h, 2), (p) => A(p, u, h) && e(p);
  }
  throw new Error(`Unknown pseudo-class :${c}`);
}
function Pt(e, t) {
  const u = t.getParent(e);
  return u && t.isTag(u) ? u : null;
}
function Jn(e, t, u, s, n) {
  const { adapter: i, equals: c } = u;
  switch (t.type) {
    case I.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case I.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case I.Attribute: {
      if (t.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!u.xmlMode || u.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), Qn[t.action](e, t, u);
    }
    case I.Pseudo:
      return Zn(e, t, u, s, n);
    case I.Tag: {
      if (t.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      let { name: h } = t;
      return (!u.xmlMode || u.lowerCaseTags) && (h = h.toLowerCase()), function(E) {
        return i.getName(E) === h && e(E);
      };
    }
    case I.Descendant: {
      if (u.cacheResults === !1 || typeof WeakSet > "u")
        return function(E) {
          let A = E;
          for (; A = Pt(A, i); )
            if (e(A))
              return !0;
          return !1;
        };
      const h = /* @__PURE__ */ new WeakSet();
      return function(E) {
        let A = E;
        for (; A = Pt(A, i); )
          if (!h.has(A)) {
            if (i.isTag(A) && e(A))
              return !0;
            h.add(A);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(d) {
        let E = d;
        do
          if (e(E))
            return !0;
        while (E = Pt(E, i));
        return !1;
      };
    case I.Parent:
      return function(d) {
        return i.getChildren(d).some((E) => i.isTag(E) && e(E));
      };
    case I.Child:
      return function(d) {
        const E = i.getParent(d);
        return E != null && i.isTag(E) && e(E);
      };
    case I.Sibling:
      return function(d) {
        const E = i.getSiblings(d);
        for (let A = 0; A < E.length; A++) {
          const p = E[A];
          if (c(d, p))
            break;
          if (i.isTag(p) && e(p))
            return !0;
        }
        return !1;
      };
    case I.Adjacent:
      return i.prevElementSibling ? function(d) {
        const E = i.prevElementSibling(d);
        return E != null && e(E);
      } : function(d) {
        const E = i.getSiblings(d);
        let A;
        for (let p = 0; p < E.length; p++) {
          const N = E[p];
          if (c(d, N))
            break;
          i.isTag(N) && (A = N);
        }
        return !!A && e(A);
      };
    case I.Universal: {
      if (t.namespace != null && t.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return e;
    }
  }
}
function Is(e) {
  return e.type === I.Pseudo && (e.name === "scope" || Array.isArray(e.data) && e.data.some((t) => t.some(Is)));
}
const ei = { type: I.Descendant }, ti = {
  type: "_flexibleDescendant"
}, ui = {
  type: I.Pseudo,
  name: "scope",
  data: null
};
function si(e, { adapter: t }, u) {
  const s = !!(u != null && u.every((n) => {
    const i = t.isTag(n) && t.getParent(n);
    return n === Ns || i && t.isTag(i);
  }));
  for (const n of e) {
    if (!(n.length > 0 && nu(n[0]) && n[0].type !== I.Descendant))
      if (s && !n.some(Is))
        n.unshift(ei);
      else
        continue;
    n.unshift(ui);
  }
}
function Ss(e, t, u) {
  var s;
  e.forEach(qn), u = (s = t.context) !== null && s !== void 0 ? s : u;
  const n = Array.isArray(u), i = u && (Array.isArray(u) ? u : [u]);
  if (t.relativeSelector !== !1)
    si(e, t, i);
  else if (e.some((d) => d.length > 0 && nu(d[0])))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  let c = !1;
  const h = e.map((d) => {
    if (d.length >= 2) {
      const [E, A] = d;
      E.type !== I.Pseudo || E.name !== "scope" || (n && A.type === I.Descendant ? d[1] = ti : (A.type === I.Adjacent || A.type === I.Sibling) && (c = !0));
    }
    return ai(d, t, i);
  }).reduce(ni, L.falseFunc);
  return h.shouldTestNextSiblings = c, h;
}
function ai(e, t, u) {
  var s;
  return e.reduce((n, i) => n === L.falseFunc ? L.falseFunc : Jn(n, i, t, u, Ss), (s = t.rootFunc) !== null && s !== void 0 ? s : L.trueFunc);
}
function ni(e, t) {
  return t === L.falseFunc || e === L.trueFunc ? e : e === L.falseFunc || t === L.trueFunc ? t : function(s) {
    return e(s) || t(s);
  };
}
const Rs = (e, t) => e === t, ii = {
  adapter: mt,
  equals: Rs
};
function ri(e) {
  var t, u, s, n;
  const i = e ?? ii;
  return (t = i.adapter) !== null && t !== void 0 || (i.adapter = mt), (u = i.equals) !== null && u !== void 0 || (i.equals = (n = (s = i.adapter) === null || s === void 0 ? void 0 : s.equals) !== null && n !== void 0 ? n : Rs), i;
}
function ci(e) {
  return function(u, s, n) {
    const i = ri(s);
    return e(u, i, n);
  };
}
const iu = ci(Ss);
function Ls(e, t, u = !1) {
  return u && (e = oi(e, t)), Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e);
}
function oi(e, t) {
  const u = Array.isArray(e) ? e.slice(0) : [e], s = u.length;
  for (let n = 0; n < s; n++) {
    const i = Cs(u[n], t);
    u.push(...i);
  }
  return u;
}
const li = /* @__PURE__ */ new Set([
  "first",
  "last",
  "eq",
  "gt",
  "nth",
  "lt",
  "even",
  "odd"
]);
function rt(e) {
  return e.type !== "pseudo" ? !1 : li.has(e.name) ? !0 : e.name === "not" && Array.isArray(e.data) ? e.data.some((t) => t.some(rt)) : !1;
}
function hi(e, t, u) {
  const s = t != null ? parseInt(t, 10) : NaN;
  switch (e) {
    case "first":
      return 1;
    case "nth":
    case "eq":
      return isFinite(s) ? s >= 0 ? s + 1 : 1 / 0 : 0;
    case "lt":
      return isFinite(s) ? s >= 0 ? Math.min(s, u) : 1 / 0 : 0;
    case "gt":
      return isFinite(s) ? 1 / 0 : 0;
    case "odd":
      return 2 * u;
    case "even":
      return 2 * u - 1;
    case "last":
    case "not":
      return 1 / 0;
  }
}
function di(e) {
  for (; e.parent; )
    e = e.parent;
  return e;
}
function ru(e) {
  const t = [], u = [];
  for (const s of e)
    s.some(rt) ? t.push(s) : u.push(s);
  return [u, t];
}
const fi = {
  type: I.Universal,
  namespace: null
}, Ei = {
  type: I.Pseudo,
  name: "scope",
  data: null
};
function Os(e, t, u = {}) {
  return Ds([e], t, u);
}
function Ds(e, t, u = {}) {
  if (typeof t == "function")
    return e.some(t);
  const [s, n] = ru(bt(t));
  return s.length > 0 && e.some(iu(s, u)) || n.some((i) => Ms(i, e, u).length > 0);
}
function Ti(e, t, u, s) {
  const n = typeof u == "string" ? parseInt(u, 10) : NaN;
  switch (e) {
    case "first":
    case "lt":
      return t;
    case "last":
      return t.length > 0 ? [t[t.length - 1]] : t;
    case "nth":
    case "eq":
      return isFinite(n) && Math.abs(n) < t.length ? [n < 0 ? t[t.length + n] : t[n]] : [];
    case "gt":
      return isFinite(n) ? t.slice(n + 1) : [];
    case "even":
      return t.filter((i, c) => c % 2 === 0);
    case "odd":
      return t.filter((i, c) => c % 2 === 1);
    case "not": {
      const i = new Set(Ps(u, t, s));
      return t.filter((c) => !i.has(c));
    }
  }
}
function xs(e, t, u = {}) {
  return Ps(bt(e), t, u);
}
function Ps(e, t, u) {
  if (t.length === 0)
    return [];
  const [s, n] = ru(e);
  let i;
  if (s.length) {
    const c = Gt(t, s, u);
    if (n.length === 0)
      return c;
    c.length && (i = new Set(c));
  }
  for (let c = 0; c < n.length && (i == null ? void 0 : i.size) !== t.length; c++) {
    const h = n[c];
    if ((i ? t.filter((A) => R(A) && !i.has(A)) : t).length === 0)
      break;
    const E = Ms(h, t, u);
    if (E.length)
      if (i)
        E.forEach((A) => i.add(A));
      else {
        if (c === n.length - 1)
          return E;
        i = new Set(E);
      }
  }
  return typeof i < "u" ? i.size === t.length ? t : (
    // Filter elements to preserve order
    t.filter((c) => i.has(c))
  ) : [];
}
function Ms(e, t, u) {
  var s;
  if (e.some(Pe)) {
    const n = (s = u.root) !== null && s !== void 0 ? s : di(t[0]), i = { ...u, context: t, relativeSelector: !1 };
    return e.push(Ei), ct(n, e, i, !0, t.length);
  }
  return ct(t, e, u, !1, t.length);
}
function mi(e, t, u = {}, s = 1 / 0) {
  if (typeof e == "function")
    return ys(t, e);
  const [n, i] = ru(bt(e)), c = i.map((h) => ct(t, h, u, !0, s));
  return n.length && c.push(qt(t, n, u, s)), c.length === 0 ? [] : c.length === 1 ? c[0] : Ce(c.reduce((h, d) => [...h, ...d]));
}
function ct(e, t, u, s, n) {
  const i = t.findIndex(rt), c = t.slice(0, i), h = t[i], d = t.length - 1 === i ? n : 1 / 0, E = hi(h.name, h.data, d);
  if (E === 0)
    return [];
  const p = (c.length === 0 && !Array.isArray(e) ? Et(e).filter(R) : c.length === 0 ? (Array.isArray(e) ? e : [e]).filter(R) : s || c.some(Pe) ? qt(e, [c], u, E) : Gt(e, [c], u)).slice(0, E);
  let N = Ti(h.name, p, h.data, u);
  if (N.length === 0 || t.length === i + 1)
    return N;
  const C = t.slice(i + 1), S = C.some(Pe);
  if (S) {
    if (Pe(C[0])) {
      const { type: y } = C[0];
      (y === I.Sibling || y === I.Adjacent) && (N = Ls(N, mt, !0)), C.unshift(fi);
    }
    u = {
      ...u,
      // Avoid absolutizing the selector
      relativeSelector: !1,
      /*
       * Add a custom root func, to make sure traversals don't match elements
       * that aren't a part of the considered tree.
       */
      rootFunc: (y) => N.includes(y)
    };
  } else
    u.rootFunc && u.rootFunc !== it.trueFunc && (u = { ...u, rootFunc: it.trueFunc });
  return C.some(rt) ? ct(N, C, u, !1, n) : S ? (
    // Query existing elements to resolve traversal.
    qt(N, [C], u, n)
  ) : (
    // If we don't have any more traversals, simply filter elements.
    Gt(N, [C], u)
  );
}
function qt(e, t, u, s) {
  const n = iu(t, u, e);
  return ys(e, n, s);
}
function ys(e, t, u = 1 / 0) {
  const s = Ls(e, mt, t.shouldTestNextSiblings);
  return uu((n) => R(n) && t(n), s, !0, u);
}
function Gt(e, t, u) {
  const s = (Array.isArray(e) ? e : [e]).filter(R);
  if (s.length === 0)
    return s;
  const n = iu(t, u);
  return n === it.trueFunc ? s : s.filter(n);
}
const bi = /^\s*[~+]/;
function Ai(e) {
  var t;
  if (!e)
    return this._make([]);
  const u = this.toArray();
  if (typeof e != "string") {
    const i = z(e) ? e.toArray() : [e];
    return this._make(i.filter((c) => u.some((h) => Es(h, c))));
  }
  const s = bi.test(e) ? u : this.children().toArray(), n = {
    context: u,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(mi(e, s, n));
}
function cu(e) {
  return function(t, ...u) {
    return function(s) {
      var n;
      let i = e(t, this);
      return s && (i = hu(i, s, this.options.xmlMode, (n = this._root) === null || n === void 0 ? void 0 : n[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && i.length > 1 ? u.reduce((c, h) => h(c), i) : i
      );
    };
  };
}
const qe = cu((e, t) => {
  const u = [];
  for (let s = 0; s < t.length; s++) {
    const n = e(t[s]);
    u.push(n);
  }
  return new Array().concat(...u);
}), ou = cu((e, t) => {
  const u = [];
  for (let s = 0; s < t.length; s++) {
    const n = e(t[s]);
    n !== null && u.push(n);
  }
  return u;
});
function lu(e, ...t) {
  let u = null;
  const s = cu((n, i) => {
    const c = [];
    return M(i, (h) => {
      for (let d; (d = n(h)) && !(u != null && u(d, c.length)); h = d)
        c.push(d);
    }), c;
  })(e, ...t);
  return function(n, i) {
    u = typeof n == "string" ? (h) => Os(h, n, this.options) : n ? Ge(n) : null;
    const c = s.call(this, i);
    return u = null, c;
  };
}
function Ie(e) {
  return Array.from(new Set(e));
}
const _i = ou(({ parent: e }) => e && !he(e) ? e : null, Ie), gi = qe((e) => {
  const t = [];
  for (; e.parent && !he(e.parent); )
    t.push(e.parent), e = e.parent;
  return t;
}, Ce, (e) => e.reverse()), pi = lu(({ parent: e }) => e && !he(e) ? e : null, Ce, (e) => e.reverse());
function Ni(e) {
  var t;
  const u = [];
  if (!e)
    return this._make(u);
  const s = {
    xmlMode: this.options.xmlMode,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
  }, n = typeof e == "string" ? (i) => Os(i, e, s) : Ge(e);
  return M(this, (i) => {
    for (; i && R(i); ) {
      if (n(i, 0)) {
        u.includes(i) || u.push(i);
        break;
      }
      i = i.parent;
    }
  }), this._make(u);
}
const Ci = ou((e) => eu(e)), Ii = qe((e) => {
  const t = [];
  for (; e.next; )
    e = e.next, R(e) && t.push(e);
  return t;
}, Ie), Si = lu((e) => eu(e), Ie), Ri = ou((e) => tu(e)), Li = qe((e) => {
  const t = [];
  for (; e.prev; )
    e = e.prev, R(e) && t.push(e);
  return t;
}, Ie), Oi = lu((e) => tu(e), Ie), Di = qe((e) => rs(e).filter((t) => R(t) && t !== e), Ce), xi = qe((e) => Et(e).filter(R), Ie);
function Pi() {
  const e = this.toArray().reduce((t, u) => H(u) ? t.concat(u.children) : t, []);
  return this._make(e);
}
function Mi(e) {
  let t = 0;
  const u = this.length;
  for (; t < u && e.call(this[t], t, this[t]) !== !1; )
    ++t;
  return this;
}
function yi(e) {
  let t = [];
  for (let u = 0; u < this.length; u++) {
    const s = this[u], n = e.call(s, u, s);
    n != null && (t = t.concat(n));
  }
  return this._make(t);
}
function Ge(e) {
  return typeof e == "function" ? (t, u) => e.call(t, u, t) : z(e) ? (t) => Array.prototype.includes.call(e, t) : function(t) {
    return e === t;
  };
}
function Bi(e) {
  var t;
  return this._make(hu(this.toArray(), e, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
}
function hu(e, t, u, s) {
  return typeof t == "string" ? xs(t, e, { xmlMode: u, root: s }) : e.filter(Ge(t));
}
function ki(e) {
  const t = this.toArray();
  return typeof e == "string" ? Ds(t.filter(R), e, this.options) : e ? t.some(Ge(e)) : !1;
}
function Fi(e) {
  let t = this.toArray();
  if (typeof e == "string") {
    const u = new Set(xs(e, t, this.options));
    t = t.filter((s) => !u.has(s));
  } else {
    const u = Ge(e);
    t = t.filter((s, n) => !u(s, n));
  }
  return this._make(t);
}
function Hi(e) {
  return this.filter(typeof e == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    `:has(${e})`
  ) : (t, u) => this._make(u).find(e).length > 0);
}
function Ui() {
  return this.length > 1 ? this._make(this[0]) : this;
}
function wi() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function vi(e) {
  var t;
  return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((t = this[e]) !== null && t !== void 0 ? t : []));
}
function Yi(e) {
  return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
}
function qi() {
  return Array.prototype.slice.call(this);
}
function Gi(e) {
  let t, u;
  return e == null ? (t = this.parent().children(), u = this[0]) : typeof e == "string" ? (t = this._make(e), u = this[0]) : (t = this, u = z(e) ? e[0] : e), Array.prototype.indexOf.call(t, u);
}
function Vi(e, t) {
  return this._make(Array.prototype.slice.call(this, e, t));
}
function Qi() {
  var e;
  return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
}
function Wi(e, t) {
  const u = this._make(e, t), s = Ce([...this.get(), ...u.get()]);
  return this._make(s);
}
function Xi(e) {
  return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this;
}
const Ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Wi,
  addBack: Xi,
  children: xi,
  closest: Ni,
  contents: Pi,
  each: Mi,
  end: Qi,
  eq: vi,
  filter: Bi,
  filterArray: hu,
  find: Ai,
  first: Ui,
  get: Yi,
  has: Hi,
  index: Gi,
  is: ki,
  last: wi,
  map: yi,
  next: Ci,
  nextAll: Ii,
  nextUntil: Si,
  not: Fi,
  parent: _i,
  parents: gi,
  parentsUntil: pi,
  prev: Ri,
  prevAll: Li,
  prevUntil: Oi,
  siblings: Di,
  slice: Vi,
  toArray: qi
}, Symbol.toStringTag, { value: "Module" }));
function ji(e) {
  return function(u, s, n, i) {
    if (typeof Buffer < "u" && Buffer.isBuffer(u) && (u = u.toString()), typeof u == "string")
      return e(u, s, n, i);
    const c = u;
    if (!Array.isArray(c) && he(c))
      return c;
    const h = new oe([]);
    return le(c, h), h;
  };
}
function le(e, t) {
  const u = Array.isArray(e) ? e : [e];
  t ? t.children = u : t = null;
  for (let s = 0; s < u.length; s++) {
    const n = u[s];
    n.parent && n.parent.children !== u && de(n), t ? (n.prev = u[s - 1] || null, n.next = u[s + 1] || null) : n.prev = n.next = null, n.parent = t;
  }
  return t;
}
function $i(e, t) {
  return e == null ? [] : z(e) ? t ? Ut(e.get()) : e.get() : Array.isArray(e) ? e.reduce((u, s) => u.concat(this._makeDomArray(s, t)), []) : typeof e == "string" ? this._parse(e, this.options, !1, null).children : t ? Ut([e]) : [e];
}
function Bs(e) {
  return function(...t) {
    const u = this.length - 1;
    return M(this, (s, n) => {
      if (!H(s))
        return;
      const i = typeof t[0] == "function" ? t[0].call(s, n, this._render(s.children)) : t, c = this._makeDomArray(i, n < u);
      e(c, s.children, s);
    });
  };
}
function se(e, t, u, s, n) {
  var i, c;
  const h = [
    t,
    u,
    ...s
  ], d = t === 0 ? null : e[t - 1], E = t + u >= e.length ? null : e[t + u];
  for (let A = 0; A < s.length; ++A) {
    const p = s[A], N = p.parent;
    if (N) {
      const S = N.children.indexOf(p);
      S > -1 && (N.children.splice(S, 1), n === N && t > S && h[0]--);
    }
    p.parent = n, p.prev && (p.prev.next = (i = p.next) !== null && i !== void 0 ? i : null), p.next && (p.next.prev = (c = p.prev) !== null && c !== void 0 ? c : null), p.prev = A === 0 ? d : s[A - 1], p.next = A === s.length - 1 ? E : s[A + 1];
  }
  return d && (d.next = s[0]), E && (E.prev = s[s.length - 1]), e.splice(...h);
}
function zi(e) {
  return (z(e) ? e : this._make(e)).append(this), this;
}
function Zi(e) {
  return (z(e) ? e : this._make(e)).prepend(this), this;
}
const Ji = Bs((e, t, u) => {
  se(t, t.length, 0, e, u);
}), er = Bs((e, t, u) => {
  se(t, 0, 0, e, u);
});
function ks(e) {
  return function(t) {
    const u = this.length - 1, s = this.parents().last();
    for (let n = 0; n < this.length; n++) {
      const i = this[n], c = typeof t == "function" ? t.call(i, n, i) : typeof t == "string" && !wt(t) ? s.find(t).clone() : t, [h] = this._makeDomArray(c, n < u);
      if (!h || !H(h))
        continue;
      let d = h, E = 0;
      for (; E < d.children.length; ) {
        const A = d.children[E];
        R(A) ? (d = A, E = 0) : E++;
      }
      e(i, d, [h]);
    }
    return this;
  };
}
const tr = ks((e, t, u) => {
  const { parent: s } = e;
  if (!s)
    return;
  const n = s.children, i = n.indexOf(e);
  le([e], t), se(n, i, 0, u, s);
}), ur = ks((e, t, u) => {
  H(e) && (le(e.children, t), le(u, e));
});
function sr(e) {
  return this.parent(e).not("body").each((t, u) => {
    this._make(u).replaceWith(u.children);
  }), this;
}
function ar(e) {
  const t = this[0];
  if (t) {
    const u = this._make(typeof e == "function" ? e.call(t, 0, t) : e).insertBefore(t);
    let s;
    for (let i = 0; i < u.length; i++)
      u[i].type === "tag" && (s = u[i]);
    let n = 0;
    for (; s && n < s.children.length; ) {
      const i = s.children[n];
      i.type === "tag" ? (s = i, n = 0) : n++;
    }
    s && this._make(s).append(this);
  }
  return this;
}
function nr(...e) {
  const t = this.length - 1;
  return M(this, (u, s) => {
    const { parent: n } = u;
    if (!H(u) || !n)
      return;
    const i = n.children, c = i.indexOf(u);
    if (c < 0)
      return;
    const h = typeof e[0] == "function" ? e[0].call(u, s, this._render(u.children)) : e, d = this._makeDomArray(h, s < t);
    se(i, c + 1, 0, d, n);
  });
}
function ir(e) {
  typeof e == "string" && (e = this._make(e)), this.remove();
  const t = [];
  return this._makeDomArray(e).forEach((u) => {
    const s = this.clone().toArray(), { parent: n } = u;
    if (!n)
      return;
    const i = n.children, c = i.indexOf(u);
    c < 0 || (se(i, c + 1, 0, s, n), t.push(...s));
  }), this._make(t);
}
function rr(...e) {
  const t = this.length - 1;
  return M(this, (u, s) => {
    const { parent: n } = u;
    if (!H(u) || !n)
      return;
    const i = n.children, c = i.indexOf(u);
    if (c < 0)
      return;
    const h = typeof e[0] == "function" ? e[0].call(u, s, this._render(u.children)) : e, d = this._makeDomArray(h, s < t);
    se(i, c, 0, d, n);
  });
}
function cr(e) {
  const t = this._make(e);
  this.remove();
  const u = [];
  return M(t, (s) => {
    const n = this.clone().toArray(), { parent: i } = s;
    if (!i)
      return;
    const c = i.children, h = c.indexOf(s);
    h < 0 || (se(c, h, 0, n, i), u.push(...n));
  }), this._make(u);
}
function or(e) {
  const t = e ? this.filter(e) : this;
  return M(t, (u) => {
    de(u), u.prev = u.next = u.parent = null;
  }), this;
}
function lr(e) {
  return M(this, (t, u) => {
    const { parent: s } = t;
    if (!s)
      return;
    const n = s.children, i = typeof e == "function" ? e.call(t, u, t) : e, c = this._makeDomArray(i);
    le(c, null);
    const h = n.indexOf(t);
    se(n, h, 1, c, s), c.includes(t) || (t.parent = t.prev = t.next = null);
  });
}
function hr() {
  return M(this, (e) => {
    H(e) && (e.children.forEach((t) => {
      t.next = t.prev = t.parent = null;
    }), e.children.length = 0);
  });
}
function dr(e) {
  if (e === void 0) {
    const t = this[0];
    return !t || !H(t) ? null : this._render(t.children);
  }
  return M(this, (t) => {
    if (!H(t))
      return;
    t.children.forEach((s) => {
      s.next = s.prev = s.parent = null;
    });
    const u = z(e) ? e.toArray() : this._parse(`${e}`, this.options, !1, t).children;
    le(u, t);
  });
}
function fr() {
  return this._render(this);
}
function Er(e) {
  return e === void 0 ? we(this) : typeof e == "function" ? M(this, (t, u) => this._make(t).text(e.call(t, u, we([t])))) : M(this, (t) => {
    if (!H(t))
      return;
    t.children.forEach((s) => {
      s.next = s.prev = s.parent = null;
    });
    const u = new Ue(`${e}`);
    le(u, t);
  });
}
function Tr() {
  return this._make(Ut(this.get()));
}
const mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _makeDomArray: $i,
  after: nr,
  append: Ji,
  appendTo: zi,
  before: rr,
  clone: Tr,
  empty: hr,
  html: dr,
  insertAfter: ir,
  insertBefore: cr,
  prepend: er,
  prependTo: Zi,
  remove: or,
  replaceWith: lr,
  text: Er,
  toString: fr,
  unwrap: sr,
  wrap: tr,
  wrapAll: ar,
  wrapInner: ur
}, Symbol.toStringTag, { value: "Module" }));
function br(e, t) {
  if (e != null && t != null || // When `prop` is a "plain" object
  typeof e == "object" && !Array.isArray(e))
    return M(this, (u, s) => {
      R(u) && Fs(u, e, t, s);
    });
  if (this.length !== 0)
    return Hs(this[0], e);
}
function Fs(e, t, u, s) {
  if (typeof t == "string") {
    const n = Hs(e), i = typeof u == "function" ? u.call(e, s, n[t]) : u;
    i === "" ? delete n[t] : i != null && (n[t] = i), e.attribs.style = Ar(n);
  } else
    typeof t == "object" && Object.keys(t).forEach((n, i) => {
      Fs(e, n, t[n], i);
    });
}
function Hs(e, t) {
  if (!e || !R(e))
    return;
  const u = _r(e.attribs.style);
  if (typeof t == "string")
    return u[t];
  if (Array.isArray(t)) {
    const s = {};
    return t.forEach((n) => {
      u[n] != null && (s[n] = u[n]);
    }), s;
  }
  return u;
}
function Ar(e) {
  return Object.keys(e).reduce((t, u) => `${t}${t ? " " : ""}${u}: ${e[u]};`, "");
}
function _r(e) {
  if (e = (e || "").trim(), !e)
    return {};
  const t = {};
  let u;
  for (const s of e.split(";")) {
    const n = s.indexOf(":");
    if (n < 1 || n === s.length - 1) {
      const i = s.trimEnd();
      i.length > 0 && u !== void 0 && (t[u] += `;${i}`);
    } else
      u = s.slice(0, n).trim(), t[u] = s.slice(n + 1).trim();
  }
  return t;
}
const gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  css: br
}, Symbol.toStringTag, { value: "Module" })), Pu = "input,select,textarea,keygen", pr = /%20/g, Mu = /\r?\n/g;
function Nr() {
  return this.serializeArray().map((u) => `${encodeURIComponent(u.name)}=${encodeURIComponent(u.value)}`).join("&").replace(pr, "+");
}
function Cr() {
  return this.map((e, t) => {
    const u = this._make(t);
    return R(t) && t.name === "form" ? u.find(Pu).toArray() : u.filter(Pu).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map((e, t) => {
    var u;
    const s = this._make(t), n = s.attr("name"), i = (u = s.val()) !== null && u !== void 0 ? u : "";
    return Array.isArray(i) ? i.map((c) => (
      /*
       * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
       * These can occur inside of `<textarea>'s`
       */
      { name: n, value: c.replace(Mu, `\r
`) }
    )) : { name: n, value: i.replace(Mu, `\r
`) };
  }).toArray();
}
const Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  serialize: Nr,
  serializeArray: Cr
}, Symbol.toStringTag, { value: "Module" }));
class Ve {
  /**
   * Instance of cheerio. Methods are specified in the modules. Usage of this
   * constructor is not recommended. Please use `$.load` instead.
   *
   * @private
   * @param elements - The new selection.
   * @param root - Sets the root node.
   * @param options - Options for the instance.
   */
  constructor(t, u, s) {
    if (this.length = 0, this.options = s, this._root = u, t) {
      for (let n = 0; n < t.length; n++)
        this[n] = t[n];
      this.length = t.length;
    }
  }
}
Ve.prototype.cheerio = "[cheerio object]";
Ve.prototype.splice = Array.prototype.splice;
Ve.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(Ve.prototype, kn, Ki, mr, gr, Ir);
function Sr(e, t) {
  return function u(s, n, i = !0) {
    if (s == null)
      throw new Error("cheerio.load() expects a string");
    const c = { ...Xt, ...Bt(n) }, h = e(s, c, i, null);
    class d extends Ve {
      _make(p, N) {
        const C = E(p, N);
        return C.prevObject = this, C;
      }
      _parse(p, N, C, S) {
        return e(p, N, C, S);
      }
      _render(p) {
        return t(p, this.options);
      }
    }
    function E(A, p, N = h, C) {
      if (A && z(A))
        return A;
      const S = {
        ...c,
        ...Bt(C)
      }, y = typeof N == "string" ? [e(N, S, !1, null)] : "length" in N ? N : [N], W = z(y) ? y : new d(y, null, S);
      if (W._root = W, !A)
        return new d(void 0, W, S);
      const Ee = typeof A == "string" && wt(A) ? (
        // $(<html>)
        e(A, S, !1, null).children
      ) : Rr(A) ? (
        // $(dom)
        [A]
      ) : Array.isArray(A) ? (
        // $([dom])
        A
      ) : void 0, Te = new d(Ee, W, S);
      if (Ee)
        return Te;
      if (typeof A != "string")
        throw new Error("Unexpected type of selector");
      let Se = A;
      const Re = p ? typeof p == "string" ? wt(p) ? (
        // $('li', '<ul>...</ul>')
        new d([e(p, S, !1, null)], W, S)
      ) : (
        // $('li', 'ul')
        (Se = `${p} ${Se}`, W)
      ) : z(p) ? (
        // $('li', $)
        p
      ) : (
        // $('li', node), $('li', [nodes])
        new d(Array.isArray(p) ? p : [p], W, S)
      ) : (
        // If we don't have a context, maybe we have a root, from loading
        W
      );
      return Re ? Re.find(Se) : Te;
    }
    return Object.assign(E, Sn, {
      load: u,
      // `_root` and `_options` are used in static methods.
      _root: h,
      _options: c,
      // Add `fn` for plugins
      fn: d.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: d.prototype
    }), E;
  };
}
function Rr(e) {
  return !!e.name || e.type === "root" || e.type === "text" || e.type === "comment";
}
const Lr = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]), P = "�";
var r;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.NUMBER_SIGN = 35] = "NUMBER_SIGN", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_F = 70] = "LATIN_CAPITAL_F", e[e.LATIN_CAPITAL_X = 88] = "LATIN_CAPITAL_X", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_F = 102] = "LATIN_SMALL_F", e[e.LATIN_SMALL_X = 120] = "LATIN_SMALL_X", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z", e[e.REPLACEMENT_CHARACTER = 65533] = "REPLACEMENT_CHARACTER";
})(r = r || (r = {}));
const w = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function Us(e) {
  return e >= 55296 && e <= 57343;
}
function Or(e) {
  return e >= 56320 && e <= 57343;
}
function Dr(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function ws(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function vs(e) {
  return e >= 64976 && e <= 65007 || Lr.has(e);
}
var T;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(T = T || (T = {}));
const xr = 65536;
class Pr {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = xr, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t) {
    const { line: u, col: s, offset: n } = this;
    return {
      code: t,
      startLine: u,
      endLine: u,
      startCol: s,
      endCol: s,
      startOffset: n,
      endOffset: n
    };
  }
  _err(t) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(t)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(t) {
    if (this.pos !== this.html.length - 1) {
      const u = this.html.charCodeAt(this.pos + 1);
      if (Or(u))
        return this.pos++, this._addGap(), Dr(t, u);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, r.EOF;
    return this._err(T.surrogateInInputStream), t;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(t, u) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = u;
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(t, u) {
    if (this.pos + t.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (u)
      return this.html.startsWith(t, this.pos);
    for (let s = 0; s < t.length; s++)
      if ((this.html.charCodeAt(this.pos + s) | 32) !== t.charCodeAt(s))
        return !1;
    return !0;
  }
  peek(t) {
    const u = this.pos + t;
    if (u >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, r.EOF;
    const s = this.html.charCodeAt(u);
    return s === r.CARRIAGE_RETURN ? r.LINE_FEED : s;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, r.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === r.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, r.LINE_FEED) : t === r.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, Us(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === r.LINE_FEED || t === r.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    ws(t) ? this._err(T.controlCharacterInInputStream) : vs(t) && this._err(T.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var O;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(O = O || (O = {}));
function Ys(e, t) {
  for (let u = e.attrs.length - 1; u >= 0; u--)
    if (e.attrs[u].name === t)
      return e.attrs[u].value;
  return null;
}
var m;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(m = m || (m = {}));
var ue;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(ue = ue || (ue = {}));
var q;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(q = q || (q = {}));
var f;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(f = f || (f = {}));
var a;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SECTION = 94] = "SECTION", e[e.SELECT = 95] = "SELECT", e[e.SOURCE = 96] = "SOURCE", e[e.SMALL = 97] = "SMALL", e[e.SPAN = 98] = "SPAN", e[e.STRIKE = 99] = "STRIKE", e[e.STRONG = 100] = "STRONG", e[e.STYLE = 101] = "STYLE", e[e.SUB = 102] = "SUB", e[e.SUMMARY = 103] = "SUMMARY", e[e.SUP = 104] = "SUP", e[e.TABLE = 105] = "TABLE", e[e.TBODY = 106] = "TBODY", e[e.TEMPLATE = 107] = "TEMPLATE", e[e.TEXTAREA = 108] = "TEXTAREA", e[e.TFOOT = 109] = "TFOOT", e[e.TD = 110] = "TD", e[e.TH = 111] = "TH", e[e.THEAD = 112] = "THEAD", e[e.TITLE = 113] = "TITLE", e[e.TR = 114] = "TR", e[e.TRACK = 115] = "TRACK", e[e.TT = 116] = "TT", e[e.U = 117] = "U", e[e.UL = 118] = "UL", e[e.SVG = 119] = "SVG", e[e.VAR = 120] = "VAR", e[e.WBR = 121] = "WBR", e[e.XMP = 122] = "XMP";
})(a = a || (a = {}));
const Mr = /* @__PURE__ */ new Map([
  [f.A, a.A],
  [f.ADDRESS, a.ADDRESS],
  [f.ANNOTATION_XML, a.ANNOTATION_XML],
  [f.APPLET, a.APPLET],
  [f.AREA, a.AREA],
  [f.ARTICLE, a.ARTICLE],
  [f.ASIDE, a.ASIDE],
  [f.B, a.B],
  [f.BASE, a.BASE],
  [f.BASEFONT, a.BASEFONT],
  [f.BGSOUND, a.BGSOUND],
  [f.BIG, a.BIG],
  [f.BLOCKQUOTE, a.BLOCKQUOTE],
  [f.BODY, a.BODY],
  [f.BR, a.BR],
  [f.BUTTON, a.BUTTON],
  [f.CAPTION, a.CAPTION],
  [f.CENTER, a.CENTER],
  [f.CODE, a.CODE],
  [f.COL, a.COL],
  [f.COLGROUP, a.COLGROUP],
  [f.DD, a.DD],
  [f.DESC, a.DESC],
  [f.DETAILS, a.DETAILS],
  [f.DIALOG, a.DIALOG],
  [f.DIR, a.DIR],
  [f.DIV, a.DIV],
  [f.DL, a.DL],
  [f.DT, a.DT],
  [f.EM, a.EM],
  [f.EMBED, a.EMBED],
  [f.FIELDSET, a.FIELDSET],
  [f.FIGCAPTION, a.FIGCAPTION],
  [f.FIGURE, a.FIGURE],
  [f.FONT, a.FONT],
  [f.FOOTER, a.FOOTER],
  [f.FOREIGN_OBJECT, a.FOREIGN_OBJECT],
  [f.FORM, a.FORM],
  [f.FRAME, a.FRAME],
  [f.FRAMESET, a.FRAMESET],
  [f.H1, a.H1],
  [f.H2, a.H2],
  [f.H3, a.H3],
  [f.H4, a.H4],
  [f.H5, a.H5],
  [f.H6, a.H6],
  [f.HEAD, a.HEAD],
  [f.HEADER, a.HEADER],
  [f.HGROUP, a.HGROUP],
  [f.HR, a.HR],
  [f.HTML, a.HTML],
  [f.I, a.I],
  [f.IMG, a.IMG],
  [f.IMAGE, a.IMAGE],
  [f.INPUT, a.INPUT],
  [f.IFRAME, a.IFRAME],
  [f.KEYGEN, a.KEYGEN],
  [f.LABEL, a.LABEL],
  [f.LI, a.LI],
  [f.LINK, a.LINK],
  [f.LISTING, a.LISTING],
  [f.MAIN, a.MAIN],
  [f.MALIGNMARK, a.MALIGNMARK],
  [f.MARQUEE, a.MARQUEE],
  [f.MATH, a.MATH],
  [f.MENU, a.MENU],
  [f.META, a.META],
  [f.MGLYPH, a.MGLYPH],
  [f.MI, a.MI],
  [f.MO, a.MO],
  [f.MN, a.MN],
  [f.MS, a.MS],
  [f.MTEXT, a.MTEXT],
  [f.NAV, a.NAV],
  [f.NOBR, a.NOBR],
  [f.NOFRAMES, a.NOFRAMES],
  [f.NOEMBED, a.NOEMBED],
  [f.NOSCRIPT, a.NOSCRIPT],
  [f.OBJECT, a.OBJECT],
  [f.OL, a.OL],
  [f.OPTGROUP, a.OPTGROUP],
  [f.OPTION, a.OPTION],
  [f.P, a.P],
  [f.PARAM, a.PARAM],
  [f.PLAINTEXT, a.PLAINTEXT],
  [f.PRE, a.PRE],
  [f.RB, a.RB],
  [f.RP, a.RP],
  [f.RT, a.RT],
  [f.RTC, a.RTC],
  [f.RUBY, a.RUBY],
  [f.S, a.S],
  [f.SCRIPT, a.SCRIPT],
  [f.SECTION, a.SECTION],
  [f.SELECT, a.SELECT],
  [f.SOURCE, a.SOURCE],
  [f.SMALL, a.SMALL],
  [f.SPAN, a.SPAN],
  [f.STRIKE, a.STRIKE],
  [f.STRONG, a.STRONG],
  [f.STYLE, a.STYLE],
  [f.SUB, a.SUB],
  [f.SUMMARY, a.SUMMARY],
  [f.SUP, a.SUP],
  [f.TABLE, a.TABLE],
  [f.TBODY, a.TBODY],
  [f.TEMPLATE, a.TEMPLATE],
  [f.TEXTAREA, a.TEXTAREA],
  [f.TFOOT, a.TFOOT],
  [f.TD, a.TD],
  [f.TH, a.TH],
  [f.THEAD, a.THEAD],
  [f.TITLE, a.TITLE],
  [f.TR, a.TR],
  [f.TRACK, a.TRACK],
  [f.TT, a.TT],
  [f.U, a.U],
  [f.UL, a.UL],
  [f.SVG, a.SVG],
  [f.VAR, a.VAR],
  [f.WBR, a.WBR],
  [f.XMP, a.XMP]
]);
function At(e) {
  var t;
  return (t = Mr.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
}
const _ = a, yr = {
  [m.HTML]: /* @__PURE__ */ new Set([
    _.ADDRESS,
    _.APPLET,
    _.AREA,
    _.ARTICLE,
    _.ASIDE,
    _.BASE,
    _.BASEFONT,
    _.BGSOUND,
    _.BLOCKQUOTE,
    _.BODY,
    _.BR,
    _.BUTTON,
    _.CAPTION,
    _.CENTER,
    _.COL,
    _.COLGROUP,
    _.DD,
    _.DETAILS,
    _.DIR,
    _.DIV,
    _.DL,
    _.DT,
    _.EMBED,
    _.FIELDSET,
    _.FIGCAPTION,
    _.FIGURE,
    _.FOOTER,
    _.FORM,
    _.FRAME,
    _.FRAMESET,
    _.H1,
    _.H2,
    _.H3,
    _.H4,
    _.H5,
    _.H6,
    _.HEAD,
    _.HEADER,
    _.HGROUP,
    _.HR,
    _.HTML,
    _.IFRAME,
    _.IMG,
    _.INPUT,
    _.LI,
    _.LINK,
    _.LISTING,
    _.MAIN,
    _.MARQUEE,
    _.MENU,
    _.META,
    _.NAV,
    _.NOEMBED,
    _.NOFRAMES,
    _.NOSCRIPT,
    _.OBJECT,
    _.OL,
    _.P,
    _.PARAM,
    _.PLAINTEXT,
    _.PRE,
    _.SCRIPT,
    _.SECTION,
    _.SELECT,
    _.SOURCE,
    _.STYLE,
    _.SUMMARY,
    _.TABLE,
    _.TBODY,
    _.TD,
    _.TEMPLATE,
    _.TEXTAREA,
    _.TFOOT,
    _.TH,
    _.THEAD,
    _.TITLE,
    _.TR,
    _.TRACK,
    _.UL,
    _.WBR,
    _.XMP
  ]),
  [m.MATHML]: /* @__PURE__ */ new Set([_.MI, _.MO, _.MN, _.MS, _.MTEXT, _.ANNOTATION_XML]),
  [m.SVG]: /* @__PURE__ */ new Set([_.TITLE, _.FOREIGN_OBJECT, _.DESC]),
  [m.XLINK]: /* @__PURE__ */ new Set(),
  [m.XML]: /* @__PURE__ */ new Set(),
  [m.XMLNS]: /* @__PURE__ */ new Set()
};
function qs(e) {
  return e === _.H1 || e === _.H2 || e === _.H3 || e === _.H4 || e === _.H5 || e === _.H6;
}
const Br = /* @__PURE__ */ new Set([
  f.STYLE,
  f.SCRIPT,
  f.XMP,
  f.IFRAME,
  f.NOEMBED,
  f.NOFRAMES,
  f.PLAINTEXT
]);
function kr(e, t) {
  return Br.has(e) || t && e === f.NOSCRIPT;
}
const Fr = /* @__PURE__ */ new Map([
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var o;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.NAMED_CHARACTER_REFERENCE = 72] = "NAMED_CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 73] = "AMBIGUOUS_AMPERSAND", e[e.NUMERIC_CHARACTER_REFERENCE = 74] = "NUMERIC_CHARACTER_REFERENCE", e[e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START", e[e.HEXADEMICAL_CHARACTER_REFERENCE = 76] = "HEXADEMICAL_CHARACTER_REFERENCE", e[e.DECIMAL_CHARACTER_REFERENCE = 77] = "DECIMAL_CHARACTER_REFERENCE", e[e.NUMERIC_CHARACTER_REFERENCE_END = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
})(o || (o = {}));
const G = {
  DATA: o.DATA,
  RCDATA: o.RCDATA,
  RAWTEXT: o.RAWTEXT,
  SCRIPT_DATA: o.SCRIPT_DATA,
  PLAINTEXT: o.PLAINTEXT,
  CDATA_SECTION: o.CDATA_SECTION
};
function Me(e) {
  return e >= r.DIGIT_0 && e <= r.DIGIT_9;
}
function xe(e) {
  return e >= r.LATIN_CAPITAL_A && e <= r.LATIN_CAPITAL_Z;
}
function Hr(e) {
  return e >= r.LATIN_SMALL_A && e <= r.LATIN_SMALL_Z;
}
function ee(e) {
  return Hr(e) || xe(e);
}
function Vt(e) {
  return ee(e) || Me(e);
}
function Gs(e) {
  return e >= r.LATIN_CAPITAL_A && e <= r.LATIN_CAPITAL_F;
}
function Vs(e) {
  return e >= r.LATIN_SMALL_A && e <= r.LATIN_SMALL_F;
}
function Ur(e) {
  return Me(e) || Gs(e) || Vs(e);
}
function je(e) {
  return e + 32;
}
function Qs(e) {
  return e === r.SPACE || e === r.LINE_FEED || e === r.TABULATION || e === r.FORM_FEED;
}
function wr(e) {
  return e === r.EQUALS_SIGN || Vt(e);
}
function yu(e) {
  return Qs(e) || e === r.SOLIDUS || e === r.GREATER_THAN_SIGN;
}
let vr = class {
  constructor(t, u) {
    this.options = t, this.handler = u, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = o.DATA, this.returnState = o.DATA, this.charRefCode = -1, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Pr(u), this.currentLocation = this.getCurrentLocation(-1);
  }
  //Errors
  _err(t) {
    var u, s;
    (s = (u = this.handler).onParseError) === null || s === void 0 || s.call(u, this.preprocessor.getError(t));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(t) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - t,
      startOffset: this.preprocessor.offset - t,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        const t = this._consume();
        this._ensureHibernation() || this._callState(t);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(t) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || t == null || t());
  }
  write(t, u, s) {
    this.active = !0, this.preprocessor.write(t, u), this._runParsingLoop(), this.paused || s == null || s();
  }
  insertHtmlAtCurrentPos(t) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(t), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this._unconsume(this.consumedAfterSnapshot), this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _unconsume(t) {
    this.consumedAfterSnapshot -= t, this.preprocessor.retreat(t);
  }
  _reconsumeInState(t, u) {
    this.state = t, this._callState(u);
  }
  _advanceBy(t) {
    this.consumedAfterSnapshot += t;
    for (let u = 0; u < t; u++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(t, u) {
    return this.preprocessor.startsWith(t, u) ? (this._advanceBy(t.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: O.START_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: O.END_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: O.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: O.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(t, u) {
    this.currentCharacterToken = {
      type: t,
      chars: u,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(t) {
    this.currentAttr = {
      name: t,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var t, u;
    const s = this.currentToken;
    if (Ys(s, this.currentAttr.name) === null) {
      if (s.attrs.push(this.currentAttr), s.location && this.currentLocation) {
        const n = (t = (u = s.location).attrs) !== null && t !== void 0 ? t : u.attrs = /* @__PURE__ */ Object.create(null);
        n[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(T.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(t) {
    this._emitCurrentCharacterToken(t.location), this.currentToken = null, t.location && (t.location.endLine = this.preprocessor.line, t.location.endCol = this.preprocessor.col + 1, t.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const t = this.currentToken;
    this.prepareToken(t), t.tagID = At(t.tagName), t.type === O.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(T.endTagWithAttributes), t.selfClosing && this._err(T.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(t) {
    this.prepareToken(t), this.handler.onComment(t), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(t) {
    this.prepareToken(t), this.handler.onDoctype(t), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(t) {
    if (this.currentCharacterToken) {
      switch (t && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = t.startLine, this.currentCharacterToken.location.endCol = t.startCol, this.currentCharacterToken.location.endOffset = t.startOffset), this.currentCharacterToken.type) {
        case O.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case O.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case O.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: O.EOF, location: t }), this.active = !1;
  }
  //Characters emission
  //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(t, u) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type !== t)
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
      else {
        this.currentCharacterToken.chars += u;
        return;
      }
    this._createCharacterToken(t, u);
  }
  _emitCodePoint(t) {
    const u = Qs(t) ? O.WHITESPACE_CHARACTER : t === r.NULL ? O.NULL_CHARACTER : O.CHARACTER;
    this._appendCharToCurrentCharacterToken(u, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(O.CHARACTER, t);
  }
  // Character reference helpers
  _matchNamedCharacterReference(t) {
    let u = null, s = 0, n = !1;
    for (let i = 0, c = J[0]; i >= 0 && (i = Jt(J, c, i + 1, t), !(i < 0)); t = this._consume()) {
      s += 1, c = J[i];
      const h = c & V.VALUE_LENGTH;
      if (h) {
        const d = (h >> 14) - 1;
        if (t !== r.SEMICOLON && this._isCharacterReferenceInAttribute() && wr(this.preprocessor.peek(1)) ? (u = [r.AMPERSAND], i += d) : (u = d === 0 ? [J[i] & ~V.VALUE_LENGTH] : d === 1 ? [J[++i]] : [J[++i], J[++i]], s = 0, n = t !== r.SEMICOLON), d === 0) {
          this._consume();
          break;
        }
      }
    }
    return this._unconsume(s), n && !this.preprocessor.endOfChunkHit && this._err(T.missingSemicolonAfterCharacterReference), this._unconsume(1), u;
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === o.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(t) {
    switch (this.state) {
      case o.DATA: {
        this._stateData(t);
        break;
      }
      case o.RCDATA: {
        this._stateRcdata(t);
        break;
      }
      case o.RAWTEXT: {
        this._stateRawtext(t);
        break;
      }
      case o.SCRIPT_DATA: {
        this._stateScriptData(t);
        break;
      }
      case o.PLAINTEXT: {
        this._statePlaintext(t);
        break;
      }
      case o.TAG_OPEN: {
        this._stateTagOpen(t);
        break;
      }
      case o.END_TAG_OPEN: {
        this._stateEndTagOpen(t);
        break;
      }
      case o.TAG_NAME: {
        this._stateTagName(t);
        break;
      }
      case o.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(t);
        break;
      }
      case o.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(t);
        break;
      }
      case o.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(t);
        break;
      }
      case o.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(t);
        break;
      }
      case o.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(t);
        break;
      }
      case o.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(t);
        break;
      }
      case o.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(t);
        break;
      }
      case o.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(t);
        break;
      }
      case o.ATTRIBUTE_NAME: {
        this._stateAttributeName(t);
        break;
      }
      case o.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(t);
        break;
      }
      case o.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(t);
        break;
      }
      case o.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(t);
        break;
      }
      case o.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(t);
        break;
      }
      case o.BOGUS_COMMENT: {
        this._stateBogusComment(t);
        break;
      }
      case o.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(t);
        break;
      }
      case o.COMMENT_START: {
        this._stateCommentStart(t);
        break;
      }
      case o.COMMENT_START_DASH: {
        this._stateCommentStartDash(t);
        break;
      }
      case o.COMMENT: {
        this._stateComment(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(t);
        break;
      }
      case o.COMMENT_END_DASH: {
        this._stateCommentEndDash(t);
        break;
      }
      case o.COMMENT_END: {
        this._stateCommentEnd(t);
        break;
      }
      case o.COMMENT_END_BANG: {
        this._stateCommentEndBang(t);
        break;
      }
      case o.DOCTYPE: {
        this._stateDoctype(t);
        break;
      }
      case o.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(t);
        break;
      }
      case o.DOCTYPE_NAME: {
        this._stateDoctypeName(t);
        break;
      }
      case o.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(t);
        break;
      }
      case o.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(t);
        break;
      }
      case o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(t);
        break;
      }
      case o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(t);
        break;
      }
      case o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(t);
        break;
      }
      case o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(t);
        break;
      }
      case o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
        break;
      }
      case o.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(t);
        break;
      }
      case o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(t);
        break;
      }
      case o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(t);
        break;
      }
      case o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(t);
        break;
      }
      case o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(t);
        break;
      }
      case o.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(t);
        break;
      }
      case o.CDATA_SECTION: {
        this._stateCdataSection(t);
        break;
      }
      case o.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(t);
        break;
      }
      case o.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(t);
        break;
      }
      case o.CHARACTER_REFERENCE: {
        this._stateCharacterReference(t);
        break;
      }
      case o.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(t);
        break;
      }
      case o.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(t);
        break;
      }
      case o.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(t);
        break;
      }
      case o.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(t);
        break;
      }
      case o.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(t);
        break;
      }
      case o.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(t);
        break;
      }
      case o.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(t);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(t) {
    switch (t) {
      case r.LESS_THAN_SIGN: {
        this.state = o.TAG_OPEN;
        break;
      }
      case r.AMPERSAND: {
        this.returnState = o.DATA, this.state = o.CHARACTER_REFERENCE;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case r.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(t) {
    switch (t) {
      case r.AMPERSAND: {
        this.returnState = o.RCDATA, this.state = o.CHARACTER_REFERENCE;
        break;
      }
      case r.LESS_THAN_SIGN: {
        this.state = o.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(t) {
    switch (t) {
      case r.LESS_THAN_SIGN: {
        this.state = o.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(t) {
    switch (t) {
      case r.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(t) {
    switch (t) {
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(t) {
    if (ee(t))
      this._createStartTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case r.EXCLAMATION_MARK: {
          this.state = o.MARKUP_DECLARATION_OPEN;
          break;
        }
        case r.SOLIDUS: {
          this.state = o.END_TAG_OPEN;
          break;
        }
        case r.QUESTION_MARK: {
          this._err(T.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case r.EOF: {
          this._err(T.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(T.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = o.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (ee(t))
      this._createEndTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case r.GREATER_THAN_SIGN: {
          this._err(T.missingEndTagName), this.state = o.DATA;
          break;
        }
        case r.EOF: {
          this._err(T.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(T.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case r.SOLIDUS: {
        this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.tagName += P;
        break;
      }
      case r.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        u.tagName += String.fromCodePoint(xe(t) ? je(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === r.SOLIDUS ? this.state = o.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    ee(t) ? (this.state = o.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const u = this.currentToken;
    switch (u.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = o.BEFORE_ATTRIBUTE_NAME, !1;
      case r.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = o.SELF_CLOSING_START_TAG, !1;
      case r.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = o.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(t) {
    t === r.SOLIDUS ? this.state = o.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    ee(t) ? (this.state = o.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(t) {
    switch (t) {
      case r.SOLIDUS: {
        this.state = o.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case r.EXCLAMATION_MARK: {
        this.state = o.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = o.SCRIPT_DATA, this._stateScriptData(t);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(t) {
    ee(t) ? (this.state = o.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === r.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === r.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case r.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(t) {
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case r.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
      case r.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case r.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this.state = o.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === r.SOLIDUS ? this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : ee(t) ? (this._emitChars("<"), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    ee(t) ? (this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(w.SCRIPT, !1) && yu(this.preprocessor.peek(w.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < w.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case r.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(t) {
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case r.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
      case r.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case r.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this.state = o.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(P);
        break;
      }
      case r.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === r.SOLIDUS ? (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(w.SCRIPT, !1) && yu(this.preprocessor.peek(w.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < w.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = o.SCRIPT_DATA_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.SOLIDUS:
      case r.GREATER_THAN_SIGN:
      case r.EOF: {
        this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case r.EQUALS_SIGN: {
        this._err(T.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = o.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(t) {
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
      case r.SOLIDUS:
      case r.GREATER_THAN_SIGN:
      case r.EOF: {
        this._leaveAttrName(), this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case r.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = o.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case r.QUOTATION_MARK:
      case r.APOSTROPHE:
      case r.LESS_THAN_SIGN: {
        this._err(T.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.name += P;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(xe(t) ? je(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.SOLIDUS: {
        this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case r.EQUALS_SIGN: {
        this.state = o.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case r.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(t) {
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.QUOTATION_MARK: {
        this.state = o.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case r.APOSTROPHE: {
        this.state = o.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.missingAttributeValue), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = o.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
      case r.QUOTATION_MARK: {
        this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case r.AMPERSAND: {
        this.returnState = o.ATTRIBUTE_VALUE_DOUBLE_QUOTED, this.state = o.CHARACTER_REFERENCE;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case r.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(t) {
    switch (t) {
      case r.APOSTROPHE: {
        this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case r.AMPERSAND: {
        this.returnState = o.ATTRIBUTE_VALUE_SINGLE_QUOTED, this.state = o.CHARACTER_REFERENCE;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case r.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(t) {
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case r.AMPERSAND: {
        this.returnState = o.ATTRIBUTE_VALUE_UNQUOTED, this.state = o.CHARACTER_REFERENCE;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case r.QUOTATION_MARK:
      case r.APOSTROPHE:
      case r.LESS_THAN_SIGN:
      case r.EQUALS_SIGN:
      case r.GRAVE_ACCENT: {
        this._err(T.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case r.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(t) {
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case r.SOLIDUS: {
        this._leaveAttrValue(), this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case r.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingWhitespaceBetweenAttributes), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case r.GREATER_THAN_SIGN: {
        const u = this.currentToken;
        u.selfClosing = !0, this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case r.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.unexpectedSolidusInTag), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const u = this.currentToken;
    switch (t) {
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case r.EOF: {
        this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.data += P;
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(w.DASH_DASH, !0) ? (this._createCommentToken(w.DASH_DASH.length + 1), this.state = o.COMMENT_START) : this._consumeSequenceIfMatch(w.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(w.DOCTYPE.length + 1), this.state = o.DOCTYPE) : this._consumeSequenceIfMatch(w.CDATA_START, !0) ? this.inForeignNode ? this.state = o.CDATA_SECTION : (this._err(T.cdataInHtmlContent), this._createCommentToken(w.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = o.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(T.incorrectlyOpenedComment), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.COMMENT_START_DASH;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.abruptClosingOfEmptyComment), this.state = o.DATA;
        const u = this.currentToken;
        this.emitCurrentComment(u);
        break;
      }
      default:
        this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(t) {
    const u = this.currentToken;
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.COMMENT_END;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.abruptClosingOfEmptyComment), this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case r.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(t) {
    const u = this.currentToken;
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.COMMENT_END_DASH;
        break;
      }
      case r.LESS_THAN_SIGN: {
        u.data += "<", this.state = o.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.data += P;
        break;
      }
      case r.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(t) {
    const u = this.currentToken;
    switch (t) {
      case r.EXCLAMATION_MARK: {
        u.data += "!", this.state = o.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case r.LESS_THAN_SIGN: {
        u.data += "<";
        break;
      }
      default:
        this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(t) {
    t === r.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = o.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === r.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = o.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== r.GREATER_THAN_SIGN && t !== r.EOF && this._err(T.nestedComment), this.state = o.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const u = this.currentToken;
    switch (t) {
      case r.HYPHEN_MINUS: {
        this.state = o.COMMENT_END;
        break;
      }
      case r.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(t) {
    const u = this.currentToken;
    switch (t) {
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case r.EXCLAMATION_MARK: {
        this.state = o.COMMENT_END_BANG;
        break;
      }
      case r.HYPHEN_MINUS: {
        u.data += "-";
        break;
      }
      case r.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(t) {
    const u = this.currentToken;
    switch (t) {
      case r.HYPHEN_MINUS: {
        u.data += "--!", this.state = o.COMMENT_END_DASH;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.incorrectlyClosedComment), this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case r.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--!", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(t) {
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_NAME;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), this._createDoctypeToken(null);
        const u = this.currentToken;
        u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingWhitespaceBeforeDoctypeName), this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (xe(t))
      this._createDoctypeToken(String.fromCharCode(je(t))), this.state = o.DOCTYPE_NAME;
    else
      switch (t) {
        case r.SPACE:
        case r.LINE_FEED:
        case r.TABULATION:
        case r.FORM_FEED:
          break;
        case r.NULL: {
          this._err(T.unexpectedNullCharacter), this._createDoctypeToken(P), this.state = o.DOCTYPE_NAME;
          break;
        }
        case r.GREATER_THAN_SIGN: {
          this._err(T.missingDoctypeName), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case r.EOF: {
          this._err(T.eofInDoctype), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = o.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this.state = o.AFTER_DOCTYPE_NAME;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.name += P;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.name += String.fromCodePoint(xe(t) ? je(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(w.PUBLIC, !1) ? this.state = o.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(w.SYSTEM, !1) ? this.state = o.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(T.invalidCharacterSequenceAfterDoctypeName), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case r.QUOTATION_MARK: {
        this._err(T.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case r.APOSTROPHE: {
        this._err(T.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.QUOTATION_MARK: {
        u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case r.APOSTROPHE: {
        u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case r.QUOTATION_MARK: {
        this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.publicId += P;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case r.APOSTROPHE: {
        this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.publicId += P;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this.state = o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case r.QUOTATION_MARK: {
        this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case r.APOSTROPHE: {
        this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case r.QUOTATION_MARK: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case r.APOSTROPHE: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case r.QUOTATION_MARK: {
        this._err(T.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case r.APOSTROPHE: {
        this._err(T.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.QUOTATION_MARK: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case r.APOSTROPHE: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case r.QUOTATION_MARK: {
        this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.systemId += P;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case r.APOSTROPHE: {
        this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter), u.systemId += P;
        break;
      }
      case r.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case r.SPACE:
      case r.LINE_FEED:
      case r.TABULATION:
      case r.FORM_FEED:
        break;
      case r.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case r.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const u = this.currentToken;
    switch (t) {
      case r.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case r.NULL: {
        this._err(T.unexpectedNullCharacter);
        break;
      }
      case r.EOF: {
        this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case r.RIGHT_SQUARE_BRACKET: {
        this.state = o.CDATA_SECTION_BRACKET;
        break;
      }
      case r.EOF: {
        this._err(T.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === r.RIGHT_SQUARE_BRACKET ? this.state = o.CDATA_SECTION_END : (this._emitChars("]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case r.GREATER_THAN_SIGN: {
        this.state = o.DATA;
        break;
      }
      case r.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference(t) {
    t === r.NUMBER_SIGN ? this.state = o.NUMERIC_CHARACTER_REFERENCE : Vt(t) ? (this.state = o.NAMED_CHARACTER_REFERENCE, this._stateNamedCharacterReference(t)) : (this._flushCodePointConsumedAsCharacterReference(r.AMPERSAND), this._reconsumeInState(this.returnState, t));
  }
  // Named character reference state
  //------------------------------------------------------------------
  _stateNamedCharacterReference(t) {
    const u = this._matchNamedCharacterReference(t);
    if (!this._ensureHibernation())
      if (u) {
        for (let s = 0; s < u.length; s++)
          this._flushCodePointConsumedAsCharacterReference(u[s]);
        this.state = this.returnState;
      } else
        this._flushCodePointConsumedAsCharacterReference(r.AMPERSAND), this.state = o.AMBIGUOUS_AMPERSAND;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Vt(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === r.SEMICOLON && this._err(T.unknownNamedCharacterReference), this._reconsumeInState(this.returnState, t));
  }
  // Numeric character reference state
  //------------------------------------------------------------------
  _stateNumericCharacterReference(t) {
    this.charRefCode = 0, t === r.LATIN_SMALL_X || t === r.LATIN_CAPITAL_X ? this.state = o.HEXADEMICAL_CHARACTER_REFERENCE_START : Me(t) ? (this.state = o.DECIMAL_CHARACTER_REFERENCE, this._stateDecimalCharacterReference(t)) : (this._err(T.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(r.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(r.NUMBER_SIGN), this._reconsumeInState(this.returnState, t));
  }
  // Hexademical character reference start state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReferenceStart(t) {
    Ur(t) ? (this.state = o.HEXADEMICAL_CHARACTER_REFERENCE, this._stateHexademicalCharacterReference(t)) : (this._err(T.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(r.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(r.NUMBER_SIGN), this._unconsume(2), this.state = this.returnState);
  }
  // Hexademical character reference state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReference(t) {
    Gs(t) ? this.charRefCode = this.charRefCode * 16 + t - 55 : Vs(t) ? this.charRefCode = this.charRefCode * 16 + t - 87 : Me(t) ? this.charRefCode = this.charRefCode * 16 + t - 48 : t === r.SEMICOLON ? this.state = o.NUMERIC_CHARACTER_REFERENCE_END : (this._err(T.missingSemicolonAfterCharacterReference), this.state = o.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(t));
  }
  // Decimal character reference state
  //------------------------------------------------------------------
  _stateDecimalCharacterReference(t) {
    Me(t) ? this.charRefCode = this.charRefCode * 10 + t - 48 : t === r.SEMICOLON ? this.state = o.NUMERIC_CHARACTER_REFERENCE_END : (this._err(T.missingSemicolonAfterCharacterReference), this.state = o.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(t));
  }
  // Numeric character reference end state
  //------------------------------------------------------------------
  _stateNumericCharacterReferenceEnd(t) {
    if (this.charRefCode === r.NULL)
      this._err(T.nullCharacterReference), this.charRefCode = r.REPLACEMENT_CHARACTER;
    else if (this.charRefCode > 1114111)
      this._err(T.characterReferenceOutsideUnicodeRange), this.charRefCode = r.REPLACEMENT_CHARACTER;
    else if (Us(this.charRefCode))
      this._err(T.surrogateCharacterReference), this.charRefCode = r.REPLACEMENT_CHARACTER;
    else if (vs(this.charRefCode))
      this._err(T.noncharacterCharacterReference);
    else if (ws(this.charRefCode) || this.charRefCode === r.CARRIAGE_RETURN) {
      this._err(T.controlCharacterReference);
      const u = Fr.get(this.charRefCode);
      u !== void 0 && (this.charRefCode = u);
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode), this._reconsumeInState(this.returnState, t);
  }
};
const Ws = /* @__PURE__ */ new Set([a.DD, a.DT, a.LI, a.OPTGROUP, a.OPTION, a.P, a.RB, a.RP, a.RT, a.RTC]), Bu = /* @__PURE__ */ new Set([
  ...Ws,
  a.CAPTION,
  a.COLGROUP,
  a.TBODY,
  a.TD,
  a.TFOOT,
  a.TH,
  a.THEAD,
  a.TR
]), $e = /* @__PURE__ */ new Map([
  [a.APPLET, m.HTML],
  [a.CAPTION, m.HTML],
  [a.HTML, m.HTML],
  [a.MARQUEE, m.HTML],
  [a.OBJECT, m.HTML],
  [a.TABLE, m.HTML],
  [a.TD, m.HTML],
  [a.TEMPLATE, m.HTML],
  [a.TH, m.HTML],
  [a.ANNOTATION_XML, m.MATHML],
  [a.MI, m.MATHML],
  [a.MN, m.MATHML],
  [a.MO, m.MATHML],
  [a.MS, m.MATHML],
  [a.MTEXT, m.MATHML],
  [a.DESC, m.SVG],
  [a.FOREIGN_OBJECT, m.SVG],
  [a.TITLE, m.SVG]
]), Yr = [a.H1, a.H2, a.H3, a.H4, a.H5, a.H6], qr = [a.TR, a.TEMPLATE, a.HTML], Gr = [a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML], Vr = [a.TABLE, a.TEMPLATE, a.HTML], Qr = [a.TD, a.TH];
class Wr {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, u, s) {
    this.treeAdapter = u, this.handler = s, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = a.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === a.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === m.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(t, u) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = u, this.currentTagId = u, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, u, !0);
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0);
  }
  replace(t, u) {
    const s = this._indexOf(t);
    this.items[s] = u, s === this.stackTop && (this.current = u);
  }
  insertAfter(t, u, s) {
    const n = this._indexOf(t) + 1;
    this.items.splice(n, 0, u), this.tagIDs.splice(n, 0, s), this.stackTop++, n === this.stackTop && this._updateCurrentElement(), this.handler.onItemPush(this.current, this.currentTagId, n === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let u = this.stackTop + 1;
    do
      u = this.tagIDs.lastIndexOf(t, u - 1);
    while (u > 0 && this.treeAdapter.getNamespaceURI(this.items[u]) !== m.HTML);
    this.shortenToLength(u < 0 ? 0 : u);
  }
  shortenToLength(t) {
    for (; this.stackTop >= t; ) {
      const u = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(u, this.stackTop < t);
    }
  }
  popUntilElementPopped(t) {
    const u = this._indexOf(t);
    this.shortenToLength(u < 0 ? 0 : u);
  }
  popUntilPopped(t, u) {
    const s = this._indexOfTagNames(t, u);
    this.shortenToLength(s < 0 ? 0 : s);
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(Yr, m.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Qr, m.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, u) {
    for (let s = this.stackTop; s >= 0; s--)
      if (t.includes(this.tagIDs[s]) && this.treeAdapter.getNamespaceURI(this.items[s]) === u)
        return s;
    return -1;
  }
  clearBackTo(t, u) {
    const s = this._indexOfTagNames(t, u);
    this.shortenToLength(s + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(Vr, m.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Gr, m.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(qr, m.HTML);
  }
  remove(t) {
    const u = this._indexOf(t);
    u >= 0 && (u === this.stackTop ? this.pop() : (this.items.splice(u, 1), this.tagIDs.splice(u, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === a.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const u = this._indexOf(t) - 1;
    return u >= 0 ? this.items[u] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
  }
  //Element in scope
  hasInScope(t) {
    for (let u = this.stackTop; u >= 0; u--) {
      const s = this.tagIDs[u], n = this.treeAdapter.getNamespaceURI(this.items[u]);
      if (s === t && n === m.HTML)
        return !0;
      if ($e.get(s) === n)
        return !1;
    }
    return !0;
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const u = this.tagIDs[t], s = this.treeAdapter.getNamespaceURI(this.items[t]);
      if (qs(u) && s === m.HTML)
        return !0;
      if ($e.get(u) === s)
        return !1;
    }
    return !0;
  }
  hasInListItemScope(t) {
    for (let u = this.stackTop; u >= 0; u--) {
      const s = this.tagIDs[u], n = this.treeAdapter.getNamespaceURI(this.items[u]);
      if (s === t && n === m.HTML)
        return !0;
      if ((s === a.UL || s === a.OL) && n === m.HTML || $e.get(s) === n)
        return !1;
    }
    return !0;
  }
  hasInButtonScope(t) {
    for (let u = this.stackTop; u >= 0; u--) {
      const s = this.tagIDs[u], n = this.treeAdapter.getNamespaceURI(this.items[u]);
      if (s === t && n === m.HTML)
        return !0;
      if (s === a.BUTTON && n === m.HTML || $e.get(s) === n)
        return !1;
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let u = this.stackTop; u >= 0; u--) {
      const s = this.tagIDs[u];
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === m.HTML) {
        if (s === t)
          return !0;
        if (s === a.TABLE || s === a.TEMPLATE || s === a.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const u = this.tagIDs[t];
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === m.HTML) {
        if (u === a.TBODY || u === a.THEAD || u === a.TFOOT)
          return !0;
        if (u === a.TABLE || u === a.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasInSelectScope(t) {
    for (let u = this.stackTop; u >= 0; u--) {
      const s = this.tagIDs[u];
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === m.HTML) {
        if (s === t)
          return !0;
        if (s !== a.OPTION && s !== a.OPTGROUP)
          return !1;
      }
    }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; Ws.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; Bu.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== t && Bu.has(this.currentTagId); )
      this.pop();
  }
}
const Mt = 3;
var X;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(X = X || (X = {}));
const ku = { type: X.Marker };
class Xr {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, u) {
    const s = [], n = u.length, i = this.treeAdapter.getTagName(t), c = this.treeAdapter.getNamespaceURI(t);
    for (let h = 0; h < this.entries.length; h++) {
      const d = this.entries[h];
      if (d.type === X.Marker)
        break;
      const { element: E } = d;
      if (this.treeAdapter.getTagName(E) === i && this.treeAdapter.getNamespaceURI(E) === c) {
        const A = this.treeAdapter.getAttrList(E);
        A.length === n && s.push({ idx: h, attrs: A });
      }
    }
    return s;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < Mt)
      return;
    const u = this.treeAdapter.getAttrList(t), s = this._getNoahArkConditionCandidates(t, u);
    if (s.length < Mt)
      return;
    const n = new Map(u.map((c) => [c.name, c.value]));
    let i = 0;
    for (let c = 0; c < s.length; c++) {
      const h = s[c];
      h.attrs.every((d) => n.get(d.name) === d.value) && (i += 1, i >= Mt && this.entries.splice(h.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(ku);
  }
  pushElement(t, u) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: X.Element,
      element: t,
      token: u
    });
  }
  insertElementAfterBookmark(t, u) {
    const s = this.entries.indexOf(this.bookmark);
    this.entries.splice(s, 0, {
      type: X.Element,
      element: t,
      token: u
    });
  }
  removeEntry(t) {
    const u = this.entries.indexOf(t);
    u >= 0 && this.entries.splice(u, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const t = this.entries.indexOf(ku);
    t >= 0 ? this.entries.splice(0, t + 1) : this.entries.length = 0;
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const u = this.entries.find((s) => s.type === X.Marker || this.treeAdapter.getTagName(s.element) === t);
    return u && u.type === X.Element ? u : null;
  }
  getElementEntry(t) {
    return this.entries.find((u) => u.type === X.Element && u.element === t);
  }
}
function Fu(e) {
  return {
    nodeName: "#text",
    value: e,
    parentNode: null
  };
}
const ce = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: q.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(e, t, u) {
    return {
      nodeName: e,
      tagName: e,
      attrs: u,
      namespaceURI: t,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(e) {
    return {
      nodeName: "#comment",
      data: e,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(e, t) {
    e.childNodes.push(t), t.parentNode = e;
  },
  insertBefore(e, t, u) {
    const s = e.childNodes.indexOf(u);
    e.childNodes.splice(s, 0, t), t.parentNode = e;
  },
  setTemplateContent(e, t) {
    e.content = t;
  },
  getTemplateContent(e) {
    return e.content;
  },
  setDocumentType(e, t, u, s) {
    const n = e.childNodes.find((i) => i.nodeName === "#documentType");
    if (n)
      n.name = t, n.publicId = u, n.systemId = s;
    else {
      const i = {
        nodeName: "#documentType",
        name: t,
        publicId: u,
        systemId: s,
        parentNode: null
      };
      ce.appendChild(e, i);
    }
  },
  setDocumentMode(e, t) {
    e.mode = t;
  },
  getDocumentMode(e) {
    return e.mode;
  },
  detachNode(e) {
    if (e.parentNode) {
      const t = e.parentNode.childNodes.indexOf(e);
      e.parentNode.childNodes.splice(t, 1), e.parentNode = null;
    }
  },
  insertText(e, t) {
    if (e.childNodes.length > 0) {
      const u = e.childNodes[e.childNodes.length - 1];
      if (ce.isTextNode(u)) {
        u.value += t;
        return;
      }
    }
    ce.appendChild(e, Fu(t));
  },
  insertTextBefore(e, t, u) {
    const s = e.childNodes[e.childNodes.indexOf(u) - 1];
    s && ce.isTextNode(s) ? s.value += t : ce.insertBefore(e, Fu(t), u);
  },
  adoptAttributes(e, t) {
    const u = new Set(e.attrs.map((s) => s.name));
    for (let s = 0; s < t.length; s++)
      u.has(t[s].name) || e.attrs.push(t[s]);
  },
  //Tree traversing
  getFirstChild(e) {
    return e.childNodes[0];
  },
  getChildNodes(e) {
    return e.childNodes;
  },
  getParentNode(e) {
    return e.parentNode;
  },
  getAttrList(e) {
    return e.attrs;
  },
  //Node data
  getTagName(e) {
    return e.tagName;
  },
  getNamespaceURI(e) {
    return e.namespaceURI;
  },
  getTextNodeContent(e) {
    return e.value;
  },
  getCommentNodeContent(e) {
    return e.data;
  },
  getDocumentTypeNodeName(e) {
    return e.name;
  },
  getDocumentTypeNodePublicId(e) {
    return e.publicId;
  },
  getDocumentTypeNodeSystemId(e) {
    return e.systemId;
  },
  //Node types
  isTextNode(e) {
    return e.nodeName === "#text";
  },
  isCommentNode(e) {
    return e.nodeName === "#comment";
  },
  isDocumentTypeNode(e) {
    return e.nodeName === "#documentType";
  },
  isElementNode(e) {
    return Object.prototype.hasOwnProperty.call(e, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = t;
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t };
  }
}, Xs = "html", Kr = "about:legacy-compat", jr = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Ks = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
], $r = [
  ...Ks,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], zr = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), js = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Zr = [
  ...js,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Hu(e, t) {
  return t.some((u) => e.startsWith(u));
}
function Jr(e) {
  return e.name === Xs && e.publicId === null && (e.systemId === null || e.systemId === Kr);
}
function ec(e) {
  if (e.name !== Xs)
    return q.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === jr)
    return q.QUIRKS;
  let { publicId: u } = e;
  if (u !== null) {
    if (u = u.toLowerCase(), zr.has(u))
      return q.QUIRKS;
    let s = t === null ? $r : Ks;
    if (Hu(u, s))
      return q.QUIRKS;
    if (s = t === null ? js : Zr, Hu(u, s))
      return q.LIMITED_QUIRKS;
  }
  return q.NO_QUIRKS;
}
const Uu = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, tc = "definitionurl", uc = "definitionURL", sc = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((e) => [e.toLowerCase(), e])), ac = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: m.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: m.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: m.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: m.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: m.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: m.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: m.XLINK }],
  ["xml:base", { prefix: "xml", name: "base", namespace: m.XML }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: m.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: m.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: m.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: m.XMLNS }]
]), nc = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((e) => [e.toLowerCase(), e])), ic = /* @__PURE__ */ new Set([
  a.B,
  a.BIG,
  a.BLOCKQUOTE,
  a.BODY,
  a.BR,
  a.CENTER,
  a.CODE,
  a.DD,
  a.DIV,
  a.DL,
  a.DT,
  a.EM,
  a.EMBED,
  a.H1,
  a.H2,
  a.H3,
  a.H4,
  a.H5,
  a.H6,
  a.HEAD,
  a.HR,
  a.I,
  a.IMG,
  a.LI,
  a.LISTING,
  a.MENU,
  a.META,
  a.NOBR,
  a.OL,
  a.P,
  a.PRE,
  a.RUBY,
  a.S,
  a.SMALL,
  a.SPAN,
  a.STRONG,
  a.STRIKE,
  a.SUB,
  a.SUP,
  a.TABLE,
  a.TT,
  a.U,
  a.UL,
  a.VAR
]);
function rc(e) {
  const t = e.tagID;
  return t === a.FONT && e.attrs.some(({ name: s }) => s === ue.COLOR || s === ue.SIZE || s === ue.FACE) || ic.has(t);
}
function $s(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === tc) {
      e.attrs[t].name = uc;
      break;
    }
}
function zs(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = sc.get(e.attrs[t].name);
    u != null && (e.attrs[t].name = u);
  }
}
function du(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = ac.get(e.attrs[t].name);
    u && (e.attrs[t].prefix = u.prefix, e.attrs[t].name = u.name, e.attrs[t].namespace = u.namespace);
  }
}
function cc(e) {
  const t = nc.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = At(e.tagName));
}
function oc(e, t) {
  return t === m.MATHML && (e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT);
}
function lc(e, t, u) {
  if (t === m.MATHML && e === a.ANNOTATION_XML) {
    for (let s = 0; s < u.length; s++)
      if (u[s].name === ue.ENCODING) {
        const n = u[s].value.toLowerCase();
        return n === Uu.TEXT_HTML || n === Uu.APPLICATION_XML;
      }
  }
  return t === m.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE);
}
function hc(e, t, u, s) {
  return (!s || s === m.HTML) && lc(e, t, u) || (!s || s === m.MATHML) && oc(e, t);
}
const dc = "hidden", fc = 8, Ec = 3;
var l;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(l || (l = {}));
const Tc = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, Zs = /* @__PURE__ */ new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]), wu = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: ce,
  onParseError: null
};
let Js = class {
  constructor(t, u, s = null, n = null) {
    this.fragmentContext = s, this.scriptHandler = n, this.currentToken = null, this.stopped = !1, this.insertionMode = l.INITIAL, this.originalInsertionMode = l.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...wu,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = u ?? this.treeAdapter.createDocument(), this.tokenizer = new vr(this.options, this), this.activeFormattingElements = new Xr(this.treeAdapter), this.fragmentContextID = s ? At(this.treeAdapter.getTagName(s)) : a.UNKNOWN, this._setContextModes(s ?? this.document, this.fragmentContextID), this.openElements = new Wr(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, u) {
    const s = new this(u);
    return s.tokenizer.write(t, !0), s.document;
  }
  static getFragmentParser(t, u) {
    const s = {
      ...wu,
      ...u
    };
    t ?? (t = s.treeAdapter.createElement(f.TEMPLATE, m.HTML, []));
    const n = s.treeAdapter.createElement("documentmock", m.HTML, []), i = new this(s, n, t);
    return i.fragmentContextID === a.TEMPLATE && i.tmplInsertionModeStack.unshift(l.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), u = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, u), u;
  }
  //Errors
  _err(t, u, s) {
    var n;
    if (!this.onParseError)
      return;
    const i = (n = t.location) !== null && n !== void 0 ? n : Tc, c = {
      code: u,
      startLine: i.startLine,
      startCol: i.startCol,
      startOffset: i.startOffset,
      endLine: s ? i.startLine : i.endLine,
      endCol: s ? i.startCol : i.endCol,
      endOffset: s ? i.startOffset : i.endOffset
    };
    this.onParseError(c);
  }
  //Stack events
  onItemPush(t, u, s) {
    var n, i;
    (i = (n = this.treeAdapter).onItemPush) === null || i === void 0 || i.call(n, t), s && this.openElements.stackTop > 0 && this._setContextModes(t, u);
  }
  onItemPop(t, u) {
    var s, n;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (n = (s = this.treeAdapter).onItemPop) === null || n === void 0 || n.call(s, t, this.openElements.current), u) {
      let i, c;
      this.openElements.stackTop === 0 && this.fragmentContext ? (i = this.fragmentContext, c = this.fragmentContextID) : { current: i, currentTagId: c } = this.openElements, this._setContextModes(i, c);
    }
  }
  _setContextModes(t, u) {
    const s = t === this.document || this.treeAdapter.getNamespaceURI(t) === m.HTML;
    this.currentNotInHTML = !s, this.tokenizer.inForeignNode = !s && !this._isIntegrationPoint(u, t);
  }
  _switchToTextParsing(t, u) {
    this._insertElement(t, m.HTML), this.tokenizer.state = u, this.originalInsertionMode = this.insertionMode, this.insertionMode = l.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = l.TEXT, this.originalInsertionMode = l.IN_BODY, this.tokenizer.state = G.PLAINTEXT;
  }
  //Fragment parsing
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  _findFormInFragmentContext() {
    let t = this.fragmentContext;
    for (; t; ) {
      if (this.treeAdapter.getTagName(t) === f.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== m.HTML))
      switch (this.fragmentContextID) {
        case a.TITLE:
        case a.TEXTAREA: {
          this.tokenizer.state = G.RCDATA;
          break;
        }
        case a.STYLE:
        case a.XMP:
        case a.IFRAME:
        case a.NOEMBED:
        case a.NOFRAMES:
        case a.NOSCRIPT: {
          this.tokenizer.state = G.RAWTEXT;
          break;
        }
        case a.SCRIPT: {
          this.tokenizer.state = G.SCRIPT_DATA;
          break;
        }
        case a.PLAINTEXT: {
          this.tokenizer.state = G.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  _setDocumentType(t) {
    const u = t.name || "", s = t.publicId || "", n = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, u, s, n), t.location) {
      const c = this.treeAdapter.getChildNodes(this.document).find((h) => this.treeAdapter.isDocumentTypeNode(h));
      c && this.treeAdapter.setNodeSourceCodeLocation(c, t.location);
    }
  }
  _attachElementToTree(t, u) {
    if (this.options.sourceCodeLocationInfo) {
      const s = u && {
        ...u,
        startTag: u
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, s);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const s = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(s, t);
    }
  }
  _appendElement(t, u) {
    const s = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(s, t.location);
  }
  _insertElement(t, u) {
    const s = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(s, t.location), this.openElements.push(s, t.tagID);
  }
  _insertFakeElement(t, u) {
    const s = this.treeAdapter.createElement(t, m.HTML, []);
    this._attachElementToTree(s, null), this.openElements.push(s, u);
  }
  _insertTemplate(t) {
    const u = this.treeAdapter.createElement(t.tagName, m.HTML, t.attrs), s = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(u, s), this._attachElementToTree(u, t.location), this.openElements.push(u, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, null);
  }
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(f.HTML, m.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, a.HTML);
  }
  _appendCommentNode(t, u) {
    const s = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(u, s), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
  }
  _insertCharacters(t) {
    let u, s;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: u, beforeElement: s } = this._findFosterParentingLocation(), s ? this.treeAdapter.insertTextBefore(u, t.chars, s) : this.treeAdapter.insertText(u, t.chars)) : (u = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(u, t.chars)), !t.location)
      return;
    const n = this.treeAdapter.getChildNodes(u), i = s ? n.lastIndexOf(s) : n.length, c = n[i - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(c)) {
      const { endLine: d, endCol: E, endOffset: A } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(c, { endLine: d, endCol: E, endOffset: A });
    } else
      this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(c, t.location);
  }
  _adoptNodes(t, u) {
    for (let s = this.treeAdapter.getFirstChild(t); s; s = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(s), this.treeAdapter.appendChild(u, s);
  }
  _setEndLocation(t, u) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && u.location) {
      const s = u.location, n = this.treeAdapter.getTagName(t), i = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        u.type === O.END_TAG && n === u.tagName ? {
          endTag: { ...s },
          endLine: s.endLine,
          endCol: s.endCol,
          endOffset: s.endOffset
        } : {
          endLine: s.startLine,
          endCol: s.startCol,
          endOffset: s.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, i);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let u, s;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (u = this.fragmentContext, s = this.fragmentContextID) : { current: u, currentTagId: s } = this.openElements, t.tagID === a.SVG && this.treeAdapter.getTagName(u) === f.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(u) === m.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) && !this._isIntegrationPoint(s, u, m.HTML)
    );
  }
  _processToken(t) {
    switch (t.type) {
      case O.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case O.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case O.COMMENT: {
        this.onComment(t);
        break;
      }
      case O.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case O.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case O.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case O.EOF: {
        this.onEof(t);
        break;
      }
      case O.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  _isIntegrationPoint(t, u, s) {
    const n = this.treeAdapter.getNamespaceURI(u), i = this.treeAdapter.getAttrList(u);
    return hc(t, n, i, s);
  }
  //Active formatting elements reconstruction
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const u = this.activeFormattingElements.entries.findIndex((n) => n.type === X.Marker || this.openElements.contains(n.element)), s = u < 0 ? t - 1 : u - 1;
      for (let n = s; n >= 0; n--) {
        const i = this.activeFormattingElements.entries[n];
        this._insertElement(i.token, this.treeAdapter.getNamespaceURI(i.element)), i.element = this.openElements.current;
      }
    }
  }
  //Close elements
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = l.IN_ROW;
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(a.P), this.openElements.popUntilTagNamePopped(a.P);
  }
  //Insertion modes
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case a.TR: {
          this.insertionMode = l.IN_ROW;
          return;
        }
        case a.TBODY:
        case a.THEAD:
        case a.TFOOT: {
          this.insertionMode = l.IN_TABLE_BODY;
          return;
        }
        case a.CAPTION: {
          this.insertionMode = l.IN_CAPTION;
          return;
        }
        case a.COLGROUP: {
          this.insertionMode = l.IN_COLUMN_GROUP;
          return;
        }
        case a.TABLE: {
          this.insertionMode = l.IN_TABLE;
          return;
        }
        case a.BODY: {
          this.insertionMode = l.IN_BODY;
          return;
        }
        case a.FRAMESET: {
          this.insertionMode = l.IN_FRAMESET;
          return;
        }
        case a.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case a.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case a.HTML: {
          this.insertionMode = this.headElement ? l.AFTER_HEAD : l.BEFORE_HEAD;
          return;
        }
        case a.TD:
        case a.TH: {
          if (t > 0) {
            this.insertionMode = l.IN_CELL;
            return;
          }
          break;
        }
        case a.HEAD: {
          if (t > 0) {
            this.insertionMode = l.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = l.IN_BODY;
  }
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let u = t - 1; u > 0; u--) {
        const s = this.openElements.tagIDs[u];
        if (s === a.TEMPLATE)
          break;
        if (s === a.TABLE) {
          this.insertionMode = l.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = l.IN_SELECT;
  }
  //Foster parenting
  _isElementCausesFosterParenting(t) {
    return Zs.has(t);
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const u = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
        case a.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(u) === m.HTML)
            return { parent: this.treeAdapter.getTemplateContent(u), beforeElement: null };
          break;
        }
        case a.TABLE: {
          const s = this.treeAdapter.getParentNode(u);
          return s ? { parent: s, beforeElement: u } : { parent: this.openElements.items[t - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  _fosterParentElement(t) {
    const u = this._findFosterParentingLocation();
    u.beforeElement ? this.treeAdapter.insertBefore(u.parent, t, u.beforeElement) : this.treeAdapter.appendChild(u.parent, t);
  }
  //Special elements
  _isSpecialElement(t, u) {
    const s = this.treeAdapter.getNamespaceURI(t);
    return yr[s].has(u);
  }
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      Q0(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL: {
        Oe(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        ye(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Be(this, t);
        break;
      }
      case l.IN_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Fe(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        He(this, t);
        break;
      }
      case l.IN_BODY:
      case l.IN_CAPTION:
      case l.IN_CELL:
      case l.IN_TEMPLATE: {
        ta(this, t);
        break;
      }
      case l.TEXT:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        yt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        ra(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        ot(this, t);
        break;
      }
      case l.AFTER_BODY: {
        lt(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        Je(this, t);
        break;
      }
    }
  }
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      V0(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL: {
        Oe(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        ye(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Be(this, t);
        break;
      }
      case l.IN_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Fe(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        He(this, t);
        break;
      }
      case l.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        yt(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        ot(this, t);
        break;
      }
      case l.AFTER_BODY: {
        lt(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        Je(this, t);
        break;
      }
    }
  }
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Qt(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL:
      case l.BEFORE_HTML:
      case l.BEFORE_HEAD:
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD:
      case l.IN_BODY:
      case l.IN_TABLE:
      case l.IN_CAPTION:
      case l.IN_COLUMN_GROUP:
      case l.IN_TABLE_BODY:
      case l.IN_ROW:
      case l.IN_CELL:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE:
      case l.IN_TEMPLATE:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET: {
        Qt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        De(this, t);
        break;
      }
      case l.AFTER_BODY: {
        Nc(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        Cc(this, t);
        break;
      }
    }
  }
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case l.INITIAL: {
        Ic(this, t);
        break;
      }
      case l.BEFORE_HEAD:
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD: {
        this._err(t, T.misplacedDoctype);
        break;
      }
      case l.IN_TABLE_TEXT: {
        De(this, t);
        break;
      }
    }
  }
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, T.nonVoidHtmlElementStartTagWithTrailingSolidus);
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   */
  _processStartTag(t) {
    this.shouldProcessStartTagTokenInForeignContent(t) ? W0(this, t) : this._startTagOutsideForeignContent(t);
  }
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        Oe(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        Sc(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Lc(this, t);
        break;
      }
      case l.IN_HEAD: {
        K(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        xc(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        Mc(this, t);
        break;
      }
      case l.IN_BODY: {
        U(this, t);
        break;
      }
      case l.IN_TABLE: {
        pe(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        De(this, t);
        break;
      }
      case l.IN_CAPTION: {
        O0(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        Tu(this, t);
        break;
      }
      case l.IN_TABLE_BODY: {
        pt(this, t);
        break;
      }
      case l.IN_ROW: {
        Nt(this, t);
        break;
      }
      case l.IN_CELL: {
        P0(this, t);
        break;
      }
      case l.IN_SELECT: {
        la(this, t);
        break;
      }
      case l.IN_SELECT_IN_TABLE: {
        y0(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        k0(this, t);
        break;
      }
      case l.AFTER_BODY: {
        H0(this, t);
        break;
      }
      case l.IN_FRAMESET: {
        U0(this, t);
        break;
      }
      case l.AFTER_FRAMESET: {
        v0(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        q0(this, t);
        break;
      }
      case l.AFTER_AFTER_FRAMESET: {
        G0(this, t);
        break;
      }
    }
  }
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? X0(this, t) : this._endTagOutsideForeignContent(t);
  }
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        Oe(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        Rc(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Oc(this, t);
        break;
      }
      case l.IN_HEAD: {
        Dc(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Pc(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        yc(this, t);
        break;
      }
      case l.IN_BODY: {
        gt(this, t);
        break;
      }
      case l.TEXT: {
        A0(this, t);
        break;
      }
      case l.IN_TABLE: {
        Ye(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        De(this, t);
        break;
      }
      case l.IN_CAPTION: {
        D0(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        x0(this, t);
        break;
      }
      case l.IN_TABLE_BODY: {
        Wt(this, t);
        break;
      }
      case l.IN_ROW: {
        oa(this, t);
        break;
      }
      case l.IN_CELL: {
        M0(this, t);
        break;
      }
      case l.IN_SELECT: {
        ha(this, t);
        break;
      }
      case l.IN_SELECT_IN_TABLE: {
        B0(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        F0(this, t);
        break;
      }
      case l.AFTER_BODY: {
        fa(this, t);
        break;
      }
      case l.IN_FRAMESET: {
        w0(this, t);
        break;
      }
      case l.AFTER_FRAMESET: {
        Y0(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        Je(this, t);
        break;
      }
    }
  }
  onEof(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        Oe(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        ye(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Be(this, t);
        break;
      }
      case l.IN_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Fe(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        He(this, t);
        break;
      }
      case l.IN_BODY:
      case l.IN_TABLE:
      case l.IN_CAPTION:
      case l.IN_COLUMN_GROUP:
      case l.IN_TABLE_BODY:
      case l.IN_ROW:
      case l.IN_CELL:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE: {
        na(this, t);
        break;
      }
      case l.TEXT: {
        _0(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        De(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        da(this, t);
        break;
      }
      case l.AFTER_BODY:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET:
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        Eu(this, t);
        break;
      }
    }
  }
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === r.LINE_FEED)) {
      if (t.chars.length === 1)
        return;
      t.chars = t.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return;
    }
    switch (this.insertionMode) {
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD:
      case l.TEXT:
      case l.IN_COLUMN_GROUP:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_BODY:
      case l.IN_CAPTION:
      case l.IN_CELL:
      case l.IN_TEMPLATE:
      case l.AFTER_BODY:
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        ea(this, t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        yt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        ia(this, t);
        break;
      }
    }
  }
};
function mc(e, t) {
  let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return u ? e.openElements.contains(u.element) ? e.openElements.hasInScope(t.tagID) || (u = null) : (e.activeFormattingElements.removeEntry(u), u = null) : aa(e, t), u;
}
function bc(e, t) {
  let u = null, s = e.openElements.stackTop;
  for (; s >= 0; s--) {
    const n = e.openElements.items[s];
    if (n === t.element)
      break;
    e._isSpecialElement(n, e.openElements.tagIDs[s]) && (u = n);
  }
  return u || (e.openElements.shortenToLength(s < 0 ? 0 : s), e.activeFormattingElements.removeEntry(t)), u;
}
function Ac(e, t, u) {
  let s = t, n = e.openElements.getCommonAncestor(t);
  for (let i = 0, c = n; c !== u; i++, c = n) {
    n = e.openElements.getCommonAncestor(c);
    const h = e.activeFormattingElements.getElementEntry(c), d = h && i >= Ec;
    !h || d ? (d && e.activeFormattingElements.removeEntry(h), e.openElements.remove(c)) : (c = _c(e, h), s === t && (e.activeFormattingElements.bookmark = h), e.treeAdapter.detachNode(s), e.treeAdapter.appendChild(c, s), s = c);
  }
  return s;
}
function _c(e, t) {
  const u = e.treeAdapter.getNamespaceURI(t.element), s = e.treeAdapter.createElement(t.token.tagName, u, t.token.attrs);
  return e.openElements.replace(t.element, s), t.element = s, s;
}
function gc(e, t, u) {
  const s = e.treeAdapter.getTagName(t), n = At(s);
  if (e._isElementCausesFosterParenting(n))
    e._fosterParentElement(u);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    n === a.TEMPLATE && i === m.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, u);
  }
}
function pc(e, t, u) {
  const s = e.treeAdapter.getNamespaceURI(u.element), { token: n } = u, i = e.treeAdapter.createElement(n.tagName, s, n.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, n), e.activeFormattingElements.removeEntry(u), e.openElements.remove(u.element), e.openElements.insertAfter(t, i, n.tagID);
}
function fu(e, t) {
  for (let u = 0; u < fc; u++) {
    const s = mc(e, t);
    if (!s)
      break;
    const n = bc(e, s);
    if (!n)
      break;
    e.activeFormattingElements.bookmark = s;
    const i = Ac(e, n, s.element), c = e.openElements.getCommonAncestor(s.element);
    e.treeAdapter.detachNode(i), c && gc(e, c, i), pc(e, n, s);
  }
}
function Qt(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function Nc(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function Cc(e, t) {
  e._appendCommentNode(t, e.document);
}
function Eu(e, t) {
  if (e.stopped = !0, t.location) {
    const u = e.fragmentContext ? 0 : 2;
    for (let s = e.openElements.stackTop; s >= u; s--)
      e._setEndLocation(e.openElements.items[s], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const s = e.openElements.items[0], n = e.treeAdapter.getNodeSourceCodeLocation(s);
      if (n && !n.endTag && (e._setEndLocation(s, t), e.openElements.stackTop >= 1)) {
        const i = e.openElements.items[1], c = e.treeAdapter.getNodeSourceCodeLocation(i);
        c && !c.endTag && e._setEndLocation(i, t);
      }
    }
  }
}
function Ic(e, t) {
  e._setDocumentType(t);
  const u = t.forceQuirks ? q.QUIRKS : ec(t);
  Jr(t) || e._err(t, T.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, u), e.insertionMode = l.BEFORE_HTML;
}
function Oe(e, t) {
  e._err(t, T.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, q.QUIRKS), e.insertionMode = l.BEFORE_HTML, e._processToken(t);
}
function Sc(e, t) {
  t.tagID === a.HTML ? (e._insertElement(t, m.HTML), e.insertionMode = l.BEFORE_HEAD) : ye(e, t);
}
function Rc(e, t) {
  const u = t.tagID;
  (u === a.HTML || u === a.HEAD || u === a.BODY || u === a.BR) && ye(e, t);
}
function ye(e, t) {
  e._insertFakeRootElement(), e.insertionMode = l.BEFORE_HEAD, e._processToken(t);
}
function Lc(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.HEAD: {
      e._insertElement(t, m.HTML), e.headElement = e.openElements.current, e.insertionMode = l.IN_HEAD;
      break;
    }
    default:
      Be(e, t);
  }
}
function Oc(e, t) {
  const u = t.tagID;
  u === a.HEAD || u === a.BODY || u === a.HTML || u === a.BR ? Be(e, t) : e._err(t, T.endTagWithoutMatchingOpenElement);
}
function Be(e, t) {
  e._insertFakeElement(f.HEAD, a.HEAD), e.headElement = e.openElements.current, e.insertionMode = l.IN_HEAD, e._processToken(t);
}
function K(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META: {
      e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TITLE: {
      e._switchToTextParsing(t, G.RCDATA);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, G.RAWTEXT) : (e._insertElement(t, m.HTML), e.insertionMode = l.IN_HEAD_NO_SCRIPT);
      break;
    }
    case a.NOFRAMES:
    case a.STYLE: {
      e._switchToTextParsing(t, G.RAWTEXT);
      break;
    }
    case a.SCRIPT: {
      e._switchToTextParsing(t, G.SCRIPT_DATA);
      break;
    }
    case a.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = l.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(l.IN_TEMPLATE);
      break;
    }
    case a.HEAD: {
      e._err(t, T.misplacedStartTagForHeadElement);
      break;
    }
    default:
      ke(e, t);
  }
}
function Dc(e, t) {
  switch (t.tagID) {
    case a.HEAD: {
      e.openElements.pop(), e.insertionMode = l.AFTER_HEAD;
      break;
    }
    case a.BODY:
    case a.BR:
    case a.HTML: {
      ke(e, t);
      break;
    }
    case a.TEMPLATE: {
      fe(e, t);
      break;
    }
    default:
      e._err(t, T.endTagWithoutMatchingOpenElement);
  }
}
function fe(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== a.TEMPLATE && e._err(t, T.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, T.endTagWithoutMatchingOpenElement);
}
function ke(e, t) {
  e.openElements.pop(), e.insertionMode = l.AFTER_HEAD, e._processToken(t);
}
function xc(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.BASEFONT:
    case a.BGSOUND:
    case a.HEAD:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.STYLE: {
      K(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e._err(t, T.nestedNoscriptInHead);
      break;
    }
    default:
      Fe(e, t);
  }
}
function Pc(e, t) {
  switch (t.tagID) {
    case a.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = l.IN_HEAD;
      break;
    }
    case a.BR: {
      Fe(e, t);
      break;
    }
    default:
      e._err(t, T.endTagWithoutMatchingOpenElement);
  }
}
function Fe(e, t) {
  const u = t.type === O.EOF ? T.openElementsLeftAfterEof : T.disallowedContentInNoscriptInHead;
  e._err(t, u), e.openElements.pop(), e.insertionMode = l.IN_HEAD, e._processToken(t);
}
function Mc(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.BODY: {
      e._insertElement(t, m.HTML), e.framesetOk = !1, e.insertionMode = l.IN_BODY;
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, m.HTML), e.insertionMode = l.IN_FRAMESET;
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      e._err(t, T.abandonedHeadElementChild), e.openElements.push(e.headElement, a.HEAD), K(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case a.HEAD: {
      e._err(t, T.misplacedStartTagForHeadElement);
      break;
    }
    default:
      He(e, t);
  }
}
function yc(e, t) {
  switch (t.tagID) {
    case a.BODY:
    case a.HTML:
    case a.BR: {
      He(e, t);
      break;
    }
    case a.TEMPLATE: {
      fe(e, t);
      break;
    }
    default:
      e._err(t, T.endTagWithoutMatchingOpenElement);
  }
}
function He(e, t) {
  e._insertFakeElement(f.BODY, a.BODY), e.insertionMode = l.IN_BODY, _t(e, t);
}
function _t(e, t) {
  switch (t.type) {
    case O.CHARACTER: {
      ta(e, t);
      break;
    }
    case O.WHITESPACE_CHARACTER: {
      ea(e, t);
      break;
    }
    case O.COMMENT: {
      Qt(e, t);
      break;
    }
    case O.START_TAG: {
      U(e, t);
      break;
    }
    case O.END_TAG: {
      gt(e, t);
      break;
    }
    case O.EOF: {
      na(e, t);
      break;
    }
  }
}
function ea(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function ta(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function Bc(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function kc(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  u && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(u, t.attrs));
}
function Fc(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && u && (e.treeAdapter.detachNode(u), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_FRAMESET);
}
function Hc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML);
}
function Uc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), qs(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, m.HTML);
}
function wc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function vc(e, t) {
  const u = e.openElements.tmplCount > 0;
  (!e.formElement || u) && (e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), u || (e.formElement = e.openElements.current));
}
function Yc(e, t) {
  e.framesetOk = !1;
  const u = t.tagID;
  for (let s = e.openElements.stackTop; s >= 0; s--) {
    const n = e.openElements.tagIDs[s];
    if (u === a.LI && n === a.LI || (u === a.DD || u === a.DT) && (n === a.DD || n === a.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.popUntilTagNamePopped(n);
      break;
    }
    if (n !== a.ADDRESS && n !== a.DIV && n !== a.P && e._isSpecialElement(e.openElements.items[s], n))
      break;
  }
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML);
}
function qc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), e.tokenizer.state = G.PLAINTEXT;
}
function Gc(e, t) {
  e.openElements.hasInScope(a.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.framesetOk = !1;
}
function Vc(e, t) {
  const u = e.activeFormattingElements.getElementEntryInScopeWithTagName(f.A);
  u && (fu(e, t), e.openElements.remove(u.element), e.activeFormattingElements.removeEntry(u)), e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Qc(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Wc(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(a.NOBR) && (fu(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, m.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Xc(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function Kc(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== q.QUIRKS && e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), e.framesetOk = !1, e.insertionMode = l.IN_TABLE;
}
function ua(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, m.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function sa(e) {
  const t = Ys(e, ue.TYPE);
  return t != null && t.toLowerCase() === dc;
}
function jc(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, m.HTML), sa(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function $c(e, t) {
  e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
}
function zc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._appendElement(t, m.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function Zc(e, t) {
  t.tagName = f.IMG, t.tagID = a.IMG, ua(e, t);
}
function Jc(e, t) {
  e._insertElement(t, m.HTML), e.skipNextNewLine = !0, e.tokenizer.state = G.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = l.TEXT;
}
function e0(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, G.RAWTEXT);
}
function t0(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, G.RAWTEXT);
}
function vu(e, t) {
  e._switchToTextParsing(t, G.RAWTEXT);
}
function u0(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === l.IN_TABLE || e.insertionMode === l.IN_CAPTION || e.insertionMode === l.IN_TABLE_BODY || e.insertionMode === l.IN_ROW || e.insertionMode === l.IN_CELL ? l.IN_SELECT_IN_TABLE : l.IN_SELECT;
}
function s0(e, t) {
  e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML);
}
function a0(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, m.HTML);
}
function n0(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(a.RTC), e._insertElement(t, m.HTML);
}
function i0(e, t) {
  e._reconstructActiveFormattingElements(), $s(t), du(t), t.selfClosing ? e._appendElement(t, m.MATHML) : e._insertElement(t, m.MATHML), t.ackSelfClosing = !0;
}
function r0(e, t) {
  e._reconstructActiveFormattingElements(), zs(t), du(t), t.selfClosing ? e._appendElement(t, m.SVG) : e._insertElement(t, m.SVG), t.ackSelfClosing = !0;
}
function Yu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML);
}
function U(e, t) {
  switch (t.tagID) {
    case a.I:
    case a.S:
    case a.B:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      Qc(e, t);
      break;
    }
    case a.A: {
      Vc(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      Uc(e, t);
      break;
    }
    case a.P:
    case a.DL:
    case a.OL:
    case a.UL:
    case a.DIV:
    case a.DIR:
    case a.NAV:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.DETAILS:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.SECTION:
    case a.SUMMARY:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      Hc(e, t);
      break;
    }
    case a.LI:
    case a.DD:
    case a.DT: {
      Yc(e, t);
      break;
    }
    case a.BR:
    case a.IMG:
    case a.WBR:
    case a.AREA:
    case a.EMBED:
    case a.KEYGEN: {
      ua(e, t);
      break;
    }
    case a.HR: {
      zc(e, t);
      break;
    }
    case a.RB:
    case a.RTC: {
      a0(e, t);
      break;
    }
    case a.RT:
    case a.RP: {
      n0(e, t);
      break;
    }
    case a.PRE:
    case a.LISTING: {
      wc(e, t);
      break;
    }
    case a.XMP: {
      e0(e, t);
      break;
    }
    case a.SVG: {
      r0(e, t);
      break;
    }
    case a.HTML: {
      Bc(e, t);
      break;
    }
    case a.BASE:
    case a.LINK:
    case a.META:
    case a.STYLE:
    case a.TITLE:
    case a.SCRIPT:
    case a.BGSOUND:
    case a.BASEFONT:
    case a.TEMPLATE: {
      K(e, t);
      break;
    }
    case a.BODY: {
      kc(e, t);
      break;
    }
    case a.FORM: {
      vc(e, t);
      break;
    }
    case a.NOBR: {
      Wc(e, t);
      break;
    }
    case a.MATH: {
      i0(e, t);
      break;
    }
    case a.TABLE: {
      Kc(e, t);
      break;
    }
    case a.INPUT: {
      jc(e, t);
      break;
    }
    case a.PARAM:
    case a.TRACK:
    case a.SOURCE: {
      $c(e, t);
      break;
    }
    case a.IMAGE: {
      Zc(e, t);
      break;
    }
    case a.BUTTON: {
      Gc(e, t);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      Xc(e, t);
      break;
    }
    case a.IFRAME: {
      t0(e, t);
      break;
    }
    case a.SELECT: {
      u0(e, t);
      break;
    }
    case a.OPTION:
    case a.OPTGROUP: {
      s0(e, t);
      break;
    }
    case a.NOEMBED: {
      vu(e, t);
      break;
    }
    case a.FRAMESET: {
      Fc(e, t);
      break;
    }
    case a.TEXTAREA: {
      Jc(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? vu(e, t) : Yu(e, t);
      break;
    }
    case a.PLAINTEXT: {
      qc(e, t);
      break;
    }
    case a.COL:
    case a.TH:
    case a.TD:
    case a.TR:
    case a.HEAD:
    case a.FRAME:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.CAPTION:
    case a.COLGROUP:
      break;
    default:
      Yu(e, t);
  }
}
function c0(e, t) {
  if (e.openElements.hasInScope(a.BODY) && (e.insertionMode = l.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const u = e.openElements.tryPeekProperlyNestedBodyElement();
    u && e._setEndLocation(u, t);
  }
}
function o0(e, t) {
  e.openElements.hasInScope(a.BODY) && (e.insertionMode = l.AFTER_BODY, fa(e, t));
}
function l0(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u));
}
function h0(e) {
  const t = e.openElements.tmplCount > 0, { formElement: u } = e;
  t || (e.formElement = null), (u || t) && e.openElements.hasInScope(a.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(a.FORM) : u && e.openElements.remove(u));
}
function d0(e) {
  e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(f.P, a.P), e._closePElement();
}
function f0(e) {
  e.openElements.hasInListItemScope(a.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(a.LI), e.openElements.popUntilTagNamePopped(a.LI));
}
function E0(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u));
}
function T0(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function m0(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker());
}
function b0(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(f.BR, a.BR), e.openElements.pop(), e.framesetOk = !1;
}
function aa(e, t) {
  const u = t.tagName, s = t.tagID;
  for (let n = e.openElements.stackTop; n > 0; n--) {
    const i = e.openElements.items[n], c = e.openElements.tagIDs[n];
    if (s === c && (s !== a.UNKNOWN || e.treeAdapter.getTagName(i) === u)) {
      e.openElements.generateImpliedEndTagsWithExclusion(s), e.openElements.stackTop >= n && e.openElements.shortenToLength(n);
      break;
    }
    if (e._isSpecialElement(i, c))
      break;
  }
}
function gt(e, t) {
  switch (t.tagID) {
    case a.A:
    case a.B:
    case a.I:
    case a.S:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.NOBR:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      fu(e, t);
      break;
    }
    case a.P: {
      d0(e);
      break;
    }
    case a.DL:
    case a.UL:
    case a.OL:
    case a.DIR:
    case a.DIV:
    case a.NAV:
    case a.PRE:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.BUTTON:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.DETAILS:
    case a.SECTION:
    case a.SUMMARY:
    case a.LISTING:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      l0(e, t);
      break;
    }
    case a.LI: {
      f0(e);
      break;
    }
    case a.DD:
    case a.DT: {
      E0(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      T0(e);
      break;
    }
    case a.BR: {
      b0(e);
      break;
    }
    case a.BODY: {
      c0(e, t);
      break;
    }
    case a.HTML: {
      o0(e, t);
      break;
    }
    case a.FORM: {
      h0(e);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      m0(e, t);
      break;
    }
    case a.TEMPLATE: {
      fe(e, t);
      break;
    }
    default:
      aa(e, t);
  }
}
function na(e, t) {
  e.tmplInsertionModeStack.length > 0 ? da(e, t) : Eu(e, t);
}
function A0(e, t) {
  var u;
  t.tagID === a.SCRIPT && ((u = e.scriptHandler) === null || u === void 0 || u.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function _0(e, t) {
  e._err(t, T.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function yt(e, t) {
  if (Zs.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = l.IN_TABLE_TEXT, t.type) {
      case O.CHARACTER: {
        ra(e, t);
        break;
      }
      case O.WHITESPACE_CHARACTER: {
        ia(e, t);
        break;
      }
    }
  else
    Qe(e, t);
}
function g0(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_CAPTION;
}
function p0(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_COLUMN_GROUP;
}
function N0(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(f.COLGROUP, a.COLGROUP), e.insertionMode = l.IN_COLUMN_GROUP, Tu(e, t);
}
function C0(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_TABLE_BODY;
}
function I0(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(f.TBODY, a.TBODY), e.insertionMode = l.IN_TABLE_BODY, pt(e, t);
}
function S0(e, t) {
  e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function R0(e, t) {
  sa(t) ? e._appendElement(t, m.HTML) : Qe(e, t), t.ackSelfClosing = !0;
}
function L0(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, m.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function pe(e, t) {
  switch (t.tagID) {
    case a.TD:
    case a.TH:
    case a.TR: {
      I0(e, t);
      break;
    }
    case a.STYLE:
    case a.SCRIPT:
    case a.TEMPLATE: {
      K(e, t);
      break;
    }
    case a.COL: {
      N0(e, t);
      break;
    }
    case a.FORM: {
      L0(e, t);
      break;
    }
    case a.TABLE: {
      S0(e, t);
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      C0(e, t);
      break;
    }
    case a.INPUT: {
      R0(e, t);
      break;
    }
    case a.CAPTION: {
      g0(e, t);
      break;
    }
    case a.COLGROUP: {
      p0(e, t);
      break;
    }
    default:
      Qe(e, t);
  }
}
function Ye(e, t) {
  switch (t.tagID) {
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      fe(e, t);
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      Qe(e, t);
  }
}
function Qe(e, t) {
  const u = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, _t(e, t), e.fosterParentingEnabled = u;
}
function ia(e, t) {
  e.pendingCharacterTokens.push(t);
}
function ra(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function De(e, t) {
  let u = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; u < e.pendingCharacterTokens.length; u++)
      Qe(e, e.pendingCharacterTokens[u]);
  else
    for (; u < e.pendingCharacterTokens.length; u++)
      e._insertCharacters(e.pendingCharacterTokens[u]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const ca = /* @__PURE__ */ new Set([a.CAPTION, a.COL, a.COLGROUP, a.TBODY, a.TD, a.TFOOT, a.TH, a.THEAD, a.TR]);
function O0(e, t) {
  const u = t.tagID;
  ca.has(u) ? e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_TABLE, pe(e, t)) : U(e, t);
}
function D0(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.CAPTION:
    case a.TABLE: {
      e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_TABLE, u === a.TABLE && Ye(e, t));
      break;
    }
    case a.BODY:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      gt(e, t);
  }
}
function Tu(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.COL: {
      e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TEMPLATE: {
      K(e, t);
      break;
    }
    default:
      ot(e, t);
  }
}
function x0(e, t) {
  switch (t.tagID) {
    case a.COLGROUP: {
      e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = l.IN_TABLE);
      break;
    }
    case a.TEMPLATE: {
      fe(e, t);
      break;
    }
    case a.COL:
      break;
    default:
      ot(e, t);
  }
}
function ot(e, t) {
  e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = l.IN_TABLE, e._processToken(t));
}
function pt(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_ROW;
      break;
    }
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(f.TR, a.TR), e.insertionMode = l.IN_ROW, Nt(e, t);
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE, pe(e, t));
      break;
    }
    default:
      pe(e, t);
  }
}
function Wt(e, t) {
  const u = t.tagID;
  switch (t.tagID) {
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasInTableScope(u) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE);
      break;
    }
    case a.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE, Ye(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
    case a.TR:
      break;
    default:
      Ye(e, t);
  }
}
function Nt(e, t) {
  switch (t.tagID) {
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, pt(e, t));
      break;
    }
    default:
      pe(e, t);
  }
}
function oa(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY);
      break;
    }
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, Wt(e, t));
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(a.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, Wt(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
      break;
    default:
      Ye(e, t);
  }
}
function P0(e, t) {
  const u = t.tagID;
  ca.has(u) ? (e.openElements.hasInTableScope(a.TD) || e.openElements.hasInTableScope(a.TH)) && (e._closeTableCell(), Nt(e, t)) : U(e, t);
}
function M0(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.TD:
    case a.TH: {
      e.openElements.hasInTableScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_ROW);
      break;
    }
    case a.TABLE:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(u) && (e._closeTableCell(), oa(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
      break;
    default:
      gt(e, t);
  }
}
function la(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._insertElement(t, m.HTML);
      break;
    }
    case a.OPTGROUP: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._insertElement(t, m.HTML);
      break;
    }
    case a.INPUT:
    case a.KEYGEN:
    case a.TEXTAREA:
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), t.tagID !== a.SELECT && e._processStartTag(t));
      break;
    }
    case a.SCRIPT:
    case a.TEMPLATE: {
      K(e, t);
      break;
    }
  }
}
function ha(e, t) {
  switch (t.tagID) {
    case a.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === a.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === a.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop();
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop();
      break;
    }
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      fe(e, t);
      break;
    }
  }
}
function y0(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : la(e, t);
}
function B0(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? e.openElements.hasInTableScope(u) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : ha(e, t);
}
function k0(e, t) {
  switch (t.tagID) {
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      K(e, t);
      break;
    }
    case a.CAPTION:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.tmplInsertionModeStack[0] = l.IN_TABLE, e.insertionMode = l.IN_TABLE, pe(e, t);
      break;
    }
    case a.COL: {
      e.tmplInsertionModeStack[0] = l.IN_COLUMN_GROUP, e.insertionMode = l.IN_COLUMN_GROUP, Tu(e, t);
      break;
    }
    case a.TR: {
      e.tmplInsertionModeStack[0] = l.IN_TABLE_BODY, e.insertionMode = l.IN_TABLE_BODY, pt(e, t);
      break;
    }
    case a.TD:
    case a.TH: {
      e.tmplInsertionModeStack[0] = l.IN_ROW, e.insertionMode = l.IN_ROW, Nt(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = l.IN_BODY, e.insertionMode = l.IN_BODY, U(e, t);
  }
}
function F0(e, t) {
  t.tagID === a.TEMPLATE && fe(e, t);
}
function da(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : Eu(e, t);
}
function H0(e, t) {
  t.tagID === a.HTML ? U(e, t) : lt(e, t);
}
function fa(e, t) {
  var u;
  if (t.tagID === a.HTML) {
    if (e.fragmentContext || (e.insertionMode = l.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === a.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const s = e.openElements.items[1];
      s && !(!((u = e.treeAdapter.getNodeSourceCodeLocation(s)) === null || u === void 0) && u.endTag) && e._setEndLocation(s, t);
    }
  } else
    lt(e, t);
}
function lt(e, t) {
  e.insertionMode = l.IN_BODY, _t(e, t);
}
function U0(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, m.HTML);
      break;
    }
    case a.FRAME: {
      e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.NOFRAMES: {
      K(e, t);
      break;
    }
  }
}
function w0(e, t) {
  t.tagID === a.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== a.FRAMESET && (e.insertionMode = l.AFTER_FRAMESET));
}
function v0(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.NOFRAMES: {
      K(e, t);
      break;
    }
  }
}
function Y0(e, t) {
  t.tagID === a.HTML && (e.insertionMode = l.AFTER_AFTER_FRAMESET);
}
function q0(e, t) {
  t.tagID === a.HTML ? U(e, t) : Je(e, t);
}
function Je(e, t) {
  e.insertionMode = l.IN_BODY, _t(e, t);
}
function G0(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      U(e, t);
      break;
    }
    case a.NOFRAMES: {
      K(e, t);
      break;
    }
  }
}
function V0(e, t) {
  t.chars = P, e._insertCharacters(t);
}
function Q0(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function Ea(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== m.HTML && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function W0(e, t) {
  if (rc(t))
    Ea(e), e._startTagOutsideForeignContent(t);
  else {
    const u = e._getAdjustedCurrentElement(), s = e.treeAdapter.getNamespaceURI(u);
    s === m.MATHML ? $s(t) : s === m.SVG && (cc(t), zs(t)), du(t), t.selfClosing ? e._appendElement(t, s) : e._insertElement(t, s), t.ackSelfClosing = !0;
  }
}
function X0(e, t) {
  if (t.tagID === a.P || t.tagID === a.BR) {
    Ea(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let u = e.openElements.stackTop; u > 0; u--) {
    const s = e.openElements.items[u];
    if (e.treeAdapter.getNamespaceURI(s) === m.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const n = e.treeAdapter.getTagName(s);
    if (n.toLowerCase() === t.tagName) {
      t.tagName = n, e.openElements.shortenToLength(u);
      break;
    }
  }
}
const K0 = /* @__PURE__ */ new Set([
  f.AREA,
  f.BASE,
  f.BASEFONT,
  f.BGSOUND,
  f.BR,
  f.COL,
  f.EMBED,
  f.FRAME,
  f.HR,
  f.IMG,
  f.INPUT,
  f.KEYGEN,
  f.LINK,
  f.META,
  f.PARAM,
  f.SOURCE,
  f.TRACK,
  f.WBR
]);
function j0(e, t) {
  return t.treeAdapter.isElementNode(e) && t.treeAdapter.getNamespaceURI(e) === m.HTML && K0.has(t.treeAdapter.getTagName(e));
}
const $0 = { treeAdapter: ce, scriptingEnabled: !0 };
function z0(e, t) {
  const u = { ...$0, ...t };
  return Ta(e, u);
}
function Z0(e, t) {
  let u = "";
  const s = t.treeAdapter.isElementNode(e) && t.treeAdapter.getTagName(e) === f.TEMPLATE && t.treeAdapter.getNamespaceURI(e) === m.HTML ? t.treeAdapter.getTemplateContent(e) : e, n = t.treeAdapter.getChildNodes(s);
  if (n)
    for (const i of n)
      u += Ta(i, t);
  return u;
}
function Ta(e, t) {
  return t.treeAdapter.isElementNode(e) ? J0(e, t) : t.treeAdapter.isTextNode(e) ? to(e, t) : t.treeAdapter.isCommentNode(e) ? uo(e, t) : t.treeAdapter.isDocumentTypeNode(e) ? so(e, t) : "";
}
function J0(e, t) {
  const u = t.treeAdapter.getTagName(e);
  return `<${u}${eo(e, t)}>${j0(e, t) ? "" : `${Z0(e, t)}</${u}>`}`;
}
function eo(e, { treeAdapter: t }) {
  let u = "";
  for (const s of t.getAttrList(e)) {
    if (u += " ", !s.namespace)
      u += s.name;
    else
      switch (s.namespace) {
        case m.XML: {
          u += `xml:${s.name}`;
          break;
        }
        case m.XMLNS: {
          s.name !== "xmlns" && (u += "xmlns:"), u += s.name;
          break;
        }
        case m.XLINK: {
          u += `xlink:${s.name}`;
          break;
        }
        default:
          u += `${s.prefix}:${s.name}`;
      }
    u += `="${ss(s.value)}"`;
  }
  return u;
}
function to(e, t) {
  const { treeAdapter: u } = t, s = u.getTextNodeContent(e), n = u.getParentNode(e), i = n && u.isElementNode(n) && u.getTagName(n);
  return i && u.getNamespaceURI(n) === m.HTML && kr(i, t.scriptingEnabled) ? s : as(s);
}
function uo(e, { treeAdapter: t }) {
  return `<!--${t.getCommentNodeContent(e)}-->`;
}
function so(e, { treeAdapter: t }) {
  return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`;
}
function ao(e, t) {
  return Js.parse(e, t);
}
function no(e, t, u) {
  typeof e == "string" && (u = t, t = e, e = null);
  const s = Js.getFragmentParser(e, u);
  return s.tokenizer.write(t, !0), s.getFragment();
}
function qu(e) {
  return new Ue(e);
}
function Gu(e) {
  const t = e.includes('"') ? "'" : '"';
  return t + e + t;
}
function io(e, t, u) {
  let s = "!DOCTYPE ";
  return e && (s += e), t ? s += ` PUBLIC ${Gu(t)}` : u && (s += " SYSTEM"), u && (s += ` ${Gu(u)}`), s;
}
const be = {
  // Re-exports from domhandler
  isCommentNode: dt,
  isElementNode: R,
  isTextNode: $,
  //Node construction
  createDocument() {
    const e = new oe([]);
    return e["x-mode"] = q.NO_QUIRKS, e;
  },
  createDocumentFragment() {
    return new oe([]);
  },
  createElement(e, t, u) {
    const s = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
    for (let h = 0; h < u.length; h++) {
      const d = u[h].name;
      s[d] = u[h].value, n[d] = u[h].namespace, i[d] = u[h].prefix;
    }
    const c = new Zt(e, s, []);
    return c.namespace = t, c["x-attribsNamespace"] = n, c["x-attribsPrefix"] = i, c;
  },
  createCommentNode(e) {
    return new jt(e);
  },
  //Tree mutation
  appendChild(e, t) {
    const u = e.children[e.children.length - 1];
    u && (u.next = t, t.prev = u), e.children.push(t), t.parent = e;
  },
  insertBefore(e, t, u) {
    const s = e.children.indexOf(u), { prev: n } = u;
    n && (n.next = t, t.prev = n), u.prev = t, t.next = u, e.children.splice(s, 0, t), t.parent = e;
  },
  setTemplateContent(e, t) {
    be.appendChild(e, t);
  },
  getTemplateContent(e) {
    return e.children[0];
  },
  setDocumentType(e, t, u, s) {
    const n = io(t, u, s);
    let i = e.children.find((c) => kt(c) && c.name === "!doctype");
    i ? i.data = n ?? null : (i = new $t("!doctype", n), be.appendChild(e, i)), i["x-name"] = t ?? void 0, i["x-publicId"] = u ?? void 0, i["x-systemId"] = s ?? void 0;
  },
  setDocumentMode(e, t) {
    e["x-mode"] = t;
  },
  getDocumentMode(e) {
    return e["x-mode"];
  },
  detachNode(e) {
    if (e.parent) {
      const t = e.parent.children.indexOf(e), { prev: u, next: s } = e;
      e.prev = null, e.next = null, u && (u.next = s), s && (s.prev = u), e.parent.children.splice(t, 1), e.parent = null;
    }
  },
  insertText(e, t) {
    const u = e.children[e.children.length - 1];
    u && $(u) ? u.data += t : be.appendChild(e, qu(t));
  },
  insertTextBefore(e, t, u) {
    const s = e.children[e.children.indexOf(u) - 1];
    s && $(s) ? s.data += t : be.insertBefore(e, qu(t), u);
  },
  adoptAttributes(e, t) {
    for (let u = 0; u < t.length; u++) {
      const s = t[u].name;
      typeof e.attribs[s] > "u" && (e.attribs[s] = t[u].value, e["x-attribsNamespace"][s] = t[u].namespace, e["x-attribsPrefix"][s] = t[u].prefix);
    }
  },
  //Tree traversing
  getFirstChild(e) {
    return e.children[0];
  },
  getChildNodes(e) {
    return e.children;
  },
  getParentNode(e) {
    return e.parent;
  },
  getAttrList(e) {
    return e.attributes;
  },
  //Node data
  getTagName(e) {
    return e.name;
  },
  getNamespaceURI(e) {
    return e.namespace;
  },
  getTextNodeContent(e) {
    return e.data;
  },
  getCommentNodeContent(e) {
    return e.data;
  },
  getDocumentTypeNodeName(e) {
    var t;
    return (t = e["x-name"]) !== null && t !== void 0 ? t : "";
  },
  getDocumentTypeNodePublicId(e) {
    var t;
    return (t = e["x-publicId"]) !== null && t !== void 0 ? t : "";
  },
  getDocumentTypeNodeSystemId(e) {
    var t;
    return (t = e["x-systemId"]) !== null && t !== void 0 ? t : "";
  },
  //Node types
  isDocumentTypeNode(e) {
    return kt(e) && e.name === "!doctype";
  },
  // Source code location
  setNodeSourceCodeLocation(e, t) {
    t && (e.startIndex = t.startOffset, e.endIndex = t.endOffset), e.sourceCodeLocation = t;
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(e, t) {
    t.endOffset != null && (e.endIndex = t.endOffset), e.sourceCodeLocation = {
      ...e.sourceCodeLocation,
      ...t
    };
  }
};
function ro(e, t, u, s) {
  const n = {
    scriptingEnabled: typeof t.scriptingEnabled == "boolean" ? t.scriptingEnabled : !0,
    treeAdapter: be,
    sourceCodeLocationInfo: t.sourceCodeLocationInfo
  };
  return u ? ao(e, n) : no(s, e, n);
}
const co = { treeAdapter: be };
function oo(e) {
  const t = "length" in e ? e : [e];
  for (let s = 0; s < t.length; s += 1) {
    const n = t[s];
    he(n) && Array.prototype.splice.call(t, s, 1, ...n.children);
  }
  let u = "";
  for (let s = 0; s < t.length; s += 1) {
    const n = t[s];
    u += z0(n, co);
  }
  return u;
}
var g;
(function(e) {
  e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})(g || (g = {}));
var b;
(function(e) {
  e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.InSpecialComment = 20] = "InSpecialComment", e[e.InCommentLike = 21] = "InCommentLike", e[e.BeforeSpecialS = 22] = "BeforeSpecialS", e[e.SpecialStartSequence = 23] = "SpecialStartSequence", e[e.InSpecialTag = 24] = "InSpecialTag", e[e.BeforeEntity = 25] = "BeforeEntity", e[e.BeforeNumericEntity = 26] = "BeforeNumericEntity", e[e.InNamedEntity = 27] = "InNamedEntity", e[e.InNumericEntity = 28] = "InNumericEntity", e[e.InHexEntity = 29] = "InHexEntity";
})(b || (b = {}));
function Z(e) {
  return e === g.Space || e === g.NewLine || e === g.Tab || e === g.FormFeed || e === g.CarriageReturn;
}
function ze(e) {
  return e === g.Slash || e === g.Gt || Z(e);
}
function Vu(e) {
  return e >= g.Zero && e <= g.Nine;
}
function lo(e) {
  return e >= g.LowerA && e <= g.LowerZ || e >= g.UpperA && e <= g.UpperZ;
}
function ho(e) {
  return e >= g.UpperA && e <= g.UpperF || e >= g.LowerA && e <= g.LowerF;
}
var j;
(function(e) {
  e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double";
})(j || (j = {}));
const v = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
  // `</title`
};
class fo {
  constructor({ xmlMode: t = !1, decodeEntities: u = !0 }, s) {
    this.cbs = s, this.state = b.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = b.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.trieIndex = 0, this.trieCurrent = 0, this.entityResult = 0, this.entityExcess = 0, this.xmlMode = t, this.decodeEntities = u, this.entityTrie = t ? Zu : J;
  }
  reset() {
    this.state = b.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = b.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
  }
  write(t) {
    this.offset += this.buffer.length, this.buffer = t, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
  }
  /**
   * The current index within all of the written data.
   */
  getIndex() {
    return this.index;
  }
  /**
   * The start of the current section.
   */
  getSectionStart() {
    return this.sectionStart;
  }
  stateText(t) {
    t === g.Lt || !this.decodeEntities && this.fastForwardTo(g.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = b.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === g.Amp && (this.state = b.BeforeEntity);
  }
  stateSpecialStartSequence(t) {
    const u = this.sequenceIndex === this.currentSequence.length;
    if (!(u ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      ze(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.isSpecial = !1;
    else if (!u) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = b.InTagName, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === g.Gt || Z(t)) {
        const u = this.index - this.currentSequence.length;
        if (this.sectionStart < u) {
          const s = this.index;
          this.index = u, this.cbs.ontext(this.sectionStart, u), this.index = s;
        }
        this.isSpecial = !1, this.sectionStart = u + 2, this.stateInClosingTagName(t);
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === v.TitleEnd ? this.decodeEntities && t === g.Amp && (this.state = b.BeforeEntity) : this.fastForwardTo(g.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === g.Lt);
  }
  stateCDATASequence(t) {
    t === v.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === v.Cdata.length && (this.state = b.InCommentLike, this.currentSequence = v.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = b.InDeclaration, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === t)
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === v.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = b.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(t) {
    return this.xmlMode ? !ze(t) : lo(t);
  }
  startSpecial(t, u) {
    this.isSpecial = !0, this.currentSequence = t, this.sequenceIndex = u, this.state = b.SpecialStartSequence;
  }
  stateBeforeTagName(t) {
    if (t === g.ExclamationMark)
      this.state = b.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (t === g.Questionmark)
      this.state = b.InProcessingInstruction, this.sectionStart = this.index + 1;
    else if (this.isTagStartChar(t)) {
      const u = t | 32;
      this.sectionStart = this.index, !this.xmlMode && u === v.TitleEnd[2] ? this.startSpecial(v.TitleEnd, 3) : this.state = !this.xmlMode && u === v.ScriptEnd[2] ? b.BeforeSpecialS : b.InTagName;
    } else
      t === g.Slash ? this.state = b.BeforeClosingTagName : (this.state = b.Text, this.stateText(t));
  }
  stateInTagName(t) {
    ze(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = b.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateBeforeClosingTagName(t) {
    Z(t) || (t === g.Gt ? this.state = b.Text : (this.state = this.isTagStartChar(t) ? b.InClosingTagName : b.InSpecialComment, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === g.Gt || Z(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = b.AfterClosingTagName, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    (t === g.Gt || this.fastForwardTo(g.Gt)) && (this.state = b.Text, this.baseState = b.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(t) {
    t === g.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = b.InSpecialTag, this.sequenceIndex = 0) : this.state = b.Text, this.baseState = this.state, this.sectionStart = this.index + 1) : t === g.Slash ? this.state = b.InSelfClosingTag : Z(t) || (this.state = b.InAttributeName, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === g.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = b.Text, this.baseState = b.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : Z(t) || (this.state = b.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateInAttributeName(t) {
    (t === g.Eq || ze(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = b.AfterAttributeName, this.stateAfterAttributeName(t));
  }
  stateAfterAttributeName(t) {
    t === g.Eq ? this.state = b.BeforeAttributeValue : t === g.Slash || t === g.Gt ? (this.cbs.onattribend(j.NoValue, this.index), this.state = b.BeforeAttributeName, this.stateBeforeAttributeName(t)) : Z(t) || (this.cbs.onattribend(j.NoValue, this.index), this.state = b.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(t) {
    t === g.DoubleQuote ? (this.state = b.InAttributeValueDq, this.sectionStart = this.index + 1) : t === g.SingleQuote ? (this.state = b.InAttributeValueSq, this.sectionStart = this.index + 1) : Z(t) || (this.sectionStart = this.index, this.state = b.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
  }
  handleInAttributeValue(t, u) {
    t === u || !this.decodeEntities && this.fastForwardTo(u) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(u === g.DoubleQuote ? j.Double : j.Single, this.index), this.state = b.BeforeAttributeName) : this.decodeEntities && t === g.Amp && (this.baseState = this.state, this.state = b.BeforeEntity);
  }
  stateInAttributeValueDoubleQuotes(t) {
    this.handleInAttributeValue(t, g.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(t) {
    this.handleInAttributeValue(t, g.SingleQuote);
  }
  stateInAttributeValueNoQuotes(t) {
    Z(t) || t === g.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(j.Unquoted, this.index), this.state = b.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === g.Amp && (this.baseState = this.state, this.state = b.BeforeEntity);
  }
  stateBeforeDeclaration(t) {
    t === g.OpeningSquareBracket ? (this.state = b.CDATASequence, this.sequenceIndex = 0) : this.state = t === g.Dash ? b.BeforeComment : b.InDeclaration;
  }
  stateInDeclaration(t) {
    (t === g.Gt || this.fastForwardTo(g.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = b.Text, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === g.Gt || this.fastForwardTo(g.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = b.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === g.Dash ? (this.state = b.InCommentLike, this.currentSequence = v.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = b.InDeclaration;
  }
  stateInSpecialComment(t) {
    (t === g.Gt || this.fastForwardTo(g.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = b.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    const u = t | 32;
    u === v.ScriptEnd[3] ? this.startSpecial(v.ScriptEnd, 4) : u === v.StyleEnd[3] ? this.startSpecial(v.StyleEnd, 4) : (this.state = b.InTagName, this.stateInTagName(t));
  }
  stateBeforeEntity(t) {
    this.entityExcess = 1, this.entityResult = 0, t === g.Number ? this.state = b.BeforeNumericEntity : t === g.Amp || (this.trieIndex = 0, this.trieCurrent = this.entityTrie[0], this.state = b.InNamedEntity, this.stateInNamedEntity(t));
  }
  stateInNamedEntity(t) {
    if (this.entityExcess += 1, this.trieIndex = Jt(this.entityTrie, this.trieCurrent, this.trieIndex + 1, t), this.trieIndex < 0) {
      this.emitNamedEntity(), this.index--;
      return;
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    const u = this.trieCurrent & V.VALUE_LENGTH;
    if (u) {
      const s = (u >> 14) - 1;
      if (!this.allowLegacyEntity() && t !== g.Semi)
        this.trieIndex += s;
      else {
        const n = this.index - this.entityExcess + 1;
        n > this.sectionStart && this.emitPartial(this.sectionStart, n), this.entityResult = this.trieIndex, this.trieIndex += s, this.entityExcess = 0, this.sectionStart = this.index + 1, s === 0 && this.emitNamedEntity();
      }
    }
  }
  emitNamedEntity() {
    if (this.state = this.baseState, this.entityResult === 0)
      return;
    switch ((this.entityTrie[this.entityResult] & V.VALUE_LENGTH) >> 14) {
      case 1: {
        this.emitCodePoint(this.entityTrie[this.entityResult] & ~V.VALUE_LENGTH);
        break;
      }
      case 2: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        break;
      }
      case 3:
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]), this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
    }
  }
  stateBeforeNumericEntity(t) {
    (t | 32) === g.LowerX ? (this.entityExcess++, this.state = b.InHexEntity) : (this.state = b.InNumericEntity, this.stateInNumericEntity(t));
  }
  emitNumericEntity(t) {
    const u = this.index - this.entityExcess - 1;
    u + 2 + +(this.state === b.InHexEntity) !== this.index && (u > this.sectionStart && this.emitPartial(this.sectionStart, u), this.sectionStart = this.index + Number(t), this.emitCodePoint(Ju(this.entityResult))), this.state = this.baseState;
  }
  stateInNumericEntity(t) {
    t === g.Semi ? this.emitNumericEntity(!0) : Vu(t) ? (this.entityResult = this.entityResult * 10 + (t - g.Zero), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
  }
  stateInHexEntity(t) {
    t === g.Semi ? this.emitNumericEntity(!0) : Vu(t) ? (this.entityResult = this.entityResult * 16 + (t - g.Zero), this.entityExcess++) : ho(t) ? (this.entityResult = this.entityResult * 16 + ((t | 32) - g.LowerA + 10), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === b.Text || this.baseState === b.InSpecialTag);
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === b.Text || this.state === b.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === b.InAttributeValueDq || this.state === b.InAttributeValueSq || this.state === b.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    for (; this.shouldContinue(); ) {
      const t = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case b.Text: {
          this.stateText(t);
          break;
        }
        case b.SpecialStartSequence: {
          this.stateSpecialStartSequence(t);
          break;
        }
        case b.InSpecialTag: {
          this.stateInSpecialTag(t);
          break;
        }
        case b.CDATASequence: {
          this.stateCDATASequence(t);
          break;
        }
        case b.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(t);
          break;
        }
        case b.InAttributeName: {
          this.stateInAttributeName(t);
          break;
        }
        case b.InCommentLike: {
          this.stateInCommentLike(t);
          break;
        }
        case b.InSpecialComment: {
          this.stateInSpecialComment(t);
          break;
        }
        case b.BeforeAttributeName: {
          this.stateBeforeAttributeName(t);
          break;
        }
        case b.InTagName: {
          this.stateInTagName(t);
          break;
        }
        case b.InClosingTagName: {
          this.stateInClosingTagName(t);
          break;
        }
        case b.BeforeTagName: {
          this.stateBeforeTagName(t);
          break;
        }
        case b.AfterAttributeName: {
          this.stateAfterAttributeName(t);
          break;
        }
        case b.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(t);
          break;
        }
        case b.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(t);
          break;
        }
        case b.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(t);
          break;
        }
        case b.AfterClosingTagName: {
          this.stateAfterClosingTagName(t);
          break;
        }
        case b.BeforeSpecialS: {
          this.stateBeforeSpecialS(t);
          break;
        }
        case b.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(t);
          break;
        }
        case b.InSelfClosingTag: {
          this.stateInSelfClosingTag(t);
          break;
        }
        case b.InDeclaration: {
          this.stateInDeclaration(t);
          break;
        }
        case b.BeforeDeclaration: {
          this.stateBeforeDeclaration(t);
          break;
        }
        case b.BeforeComment: {
          this.stateBeforeComment(t);
          break;
        }
        case b.InProcessingInstruction: {
          this.stateInProcessingInstruction(t);
          break;
        }
        case b.InNamedEntity: {
          this.stateInNamedEntity(t);
          break;
        }
        case b.BeforeEntity: {
          this.stateBeforeEntity(t);
          break;
        }
        case b.InHexEntity: {
          this.stateInHexEntity(t);
          break;
        }
        case b.InNumericEntity: {
          this.stateInNumericEntity(t);
          break;
        }
        default:
          this.stateBeforeNumericEntity(t);
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === b.InNamedEntity && this.emitNamedEntity(), this.sectionStart < this.index && this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length + this.offset;
    this.state === b.InCommentLike ? this.currentSequence === v.CdataEnd ? this.cbs.oncdata(this.sectionStart, t, 0) : this.cbs.oncomment(this.sectionStart, t, 0) : this.state === b.InNumericEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === b.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === b.InTagName || this.state === b.BeforeAttributeName || this.state === b.BeforeAttributeValue || this.state === b.AfterAttributeName || this.state === b.InAttributeName || this.state === b.InAttributeValueSq || this.state === b.InAttributeValueDq || this.state === b.InAttributeValueNq || this.state === b.InClosingTagName || this.cbs.ontext(this.sectionStart, t);
  }
  emitPartial(t, u) {
    this.baseState !== b.Text && this.baseState !== b.InSpecialTag ? this.cbs.onattribdata(t, u) : this.cbs.ontext(t, u);
  }
  emitCodePoint(t) {
    this.baseState !== b.Text && this.baseState !== b.InSpecialTag ? this.cbs.onattribentity(t) : this.cbs.ontextentity(t);
  }
}
const me = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), x = /* @__PURE__ */ new Set(["p"]), Qu = /* @__PURE__ */ new Set(["thead", "tbody"]), Wu = /* @__PURE__ */ new Set(["dd", "dt"]), Xu = /* @__PURE__ */ new Set(["rt", "rp"]), Eo = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", x],
  ["h1", x],
  ["h2", x],
  ["h3", x],
  ["h4", x],
  ["h5", x],
  ["h6", x],
  ["select", me],
  ["input", me],
  ["output", me],
  ["button", me],
  ["datalist", me],
  ["textarea", me],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Wu],
  ["dt", Wu],
  ["address", x],
  ["article", x],
  ["aside", x],
  ["blockquote", x],
  ["details", x],
  ["div", x],
  ["dl", x],
  ["fieldset", x],
  ["figcaption", x],
  ["figure", x],
  ["footer", x],
  ["form", x],
  ["header", x],
  ["hr", x],
  ["main", x],
  ["nav", x],
  ["ol", x],
  ["pre", x],
  ["section", x],
  ["table", x],
  ["ul", x],
  ["rt", Xu],
  ["rp", Xu],
  ["tbody", Qu],
  ["tfoot", Qu]
]), To = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), Ku = /* @__PURE__ */ new Set(["math", "svg"]), ju = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), mo = /\s|\//;
class bo {
  constructor(t, u = {}) {
    var s, n, i, c, h;
    this.options = u, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.lowerCaseTagNames = (s = u.lowerCaseTags) !== null && s !== void 0 ? s : !u.xmlMode, this.lowerCaseAttributeNames = (n = u.lowerCaseAttributeNames) !== null && n !== void 0 ? n : !u.xmlMode, this.tokenizer = new ((i = u.Tokenizer) !== null && i !== void 0 ? i : fo)(this.options, this), (h = (c = this.cbs).onparserinit) === null || h === void 0 || h.call(c, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(t, u) {
    var s, n;
    const i = this.getSlice(t, u);
    this.endIndex = u - 1, (n = (s = this.cbs).ontext) === null || n === void 0 || n.call(s, i), this.startIndex = u;
  }
  /** @internal */
  ontextentity(t) {
    var u, s;
    const n = this.tokenizer.getSectionStart();
    this.endIndex = n - 1, (s = (u = this.cbs).ontext) === null || s === void 0 || s.call(u, Ft(t)), this.startIndex = n;
  }
  isVoidElement(t) {
    return !this.options.xmlMode && To.has(t);
  }
  /** @internal */
  onopentagname(t, u) {
    this.endIndex = u;
    let s = this.getSlice(t, u);
    this.lowerCaseTagNames && (s = s.toLowerCase()), this.emitOpenTag(s);
  }
  emitOpenTag(t) {
    var u, s, n, i;
    this.openTagStart = this.startIndex, this.tagname = t;
    const c = !this.options.xmlMode && Eo.get(t);
    if (c)
      for (; this.stack.length > 0 && c.has(this.stack[this.stack.length - 1]); ) {
        const h = this.stack.pop();
        (s = (u = this.cbs).onclosetag) === null || s === void 0 || s.call(u, h, !0);
      }
    this.isVoidElement(t) || (this.stack.push(t), Ku.has(t) ? this.foreignContext.push(!0) : ju.has(t) && this.foreignContext.push(!1)), (i = (n = this.cbs).onopentagname) === null || i === void 0 || i.call(n, t), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(t) {
    var u, s;
    this.startIndex = this.openTagStart, this.attribs && ((s = (u = this.cbs).onopentag) === null || s === void 0 || s.call(u, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /** @internal */
  onopentagend(t) {
    this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
  }
  /** @internal */
  onclosetag(t, u) {
    var s, n, i, c, h, d;
    this.endIndex = u;
    let E = this.getSlice(t, u);
    if (this.lowerCaseTagNames && (E = E.toLowerCase()), (Ku.has(E) || ju.has(E)) && this.foreignContext.pop(), this.isVoidElement(E))
      !this.options.xmlMode && E === "br" && ((n = (s = this.cbs).onopentagname) === null || n === void 0 || n.call(s, "br"), (c = (i = this.cbs).onopentag) === null || c === void 0 || c.call(i, "br", {}, !0), (d = (h = this.cbs).onclosetag) === null || d === void 0 || d.call(h, "br", !1));
    else {
      const A = this.stack.lastIndexOf(E);
      if (A !== -1)
        if (this.cbs.onclosetag) {
          let p = this.stack.length - A;
          for (; p--; )
            this.cbs.onclosetag(this.stack.pop(), p !== 0);
        } else
          this.stack.length = A;
      else
        !this.options.xmlMode && E === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = u + 1;
  }
  /** @internal */
  onselfclosingtag(t) {
    this.endIndex = t, this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
  }
  closeCurrentTag(t) {
    var u, s;
    const n = this.tagname;
    this.endOpenTag(t), this.stack[this.stack.length - 1] === n && ((s = (u = this.cbs).onclosetag) === null || s === void 0 || s.call(u, n, !t), this.stack.pop());
  }
  /** @internal */
  onattribname(t, u) {
    this.startIndex = t;
    const s = this.getSlice(t, u);
    this.attribname = this.lowerCaseAttributeNames ? s.toLowerCase() : s;
  }
  /** @internal */
  onattribdata(t, u) {
    this.attribvalue += this.getSlice(t, u);
  }
  /** @internal */
  onattribentity(t) {
    this.attribvalue += Ft(t);
  }
  /** @internal */
  onattribend(t, u) {
    var s, n;
    this.endIndex = u, (n = (s = this.cbs).onattribute) === null || n === void 0 || n.call(s, this.attribname, this.attribvalue, t === j.Double ? '"' : t === j.Single ? "'" : t === j.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
  }
  getInstructionName(t) {
    const u = t.search(mo);
    let s = u < 0 ? t : t.substr(0, u);
    return this.lowerCaseTagNames && (s = s.toLowerCase()), s;
  }
  /** @internal */
  ondeclaration(t, u) {
    this.endIndex = u;
    const s = this.getSlice(t, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`!${n}`, `!${s}`);
    }
    this.startIndex = u + 1;
  }
  /** @internal */
  onprocessinginstruction(t, u) {
    this.endIndex = u;
    const s = this.getSlice(t, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`?${n}`, `?${s}`);
    }
    this.startIndex = u + 1;
  }
  /** @internal */
  oncomment(t, u, s) {
    var n, i, c, h;
    this.endIndex = u, (i = (n = this.cbs).oncomment) === null || i === void 0 || i.call(n, this.getSlice(t, u - s)), (h = (c = this.cbs).oncommentend) === null || h === void 0 || h.call(c), this.startIndex = u + 1;
  }
  /** @internal */
  oncdata(t, u, s) {
    var n, i, c, h, d, E, A, p, N, C;
    this.endIndex = u;
    const S = this.getSlice(t, u - s);
    this.options.xmlMode || this.options.recognizeCDATA ? ((i = (n = this.cbs).oncdatastart) === null || i === void 0 || i.call(n), (h = (c = this.cbs).ontext) === null || h === void 0 || h.call(c, S), (E = (d = this.cbs).oncdataend) === null || E === void 0 || E.call(d)) : ((p = (A = this.cbs).oncomment) === null || p === void 0 || p.call(A, `[CDATA[${S}]]`), (C = (N = this.cbs).oncommentend) === null || C === void 0 || C.call(N)), this.startIndex = u + 1;
  }
  /** @internal */
  onend() {
    var t, u;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let s = this.stack.length; s > 0; this.cbs.onclosetag(this.stack[--s], !0))
        ;
    }
    (u = (t = this.cbs).onend) === null || u === void 0 || u.call(t);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var t, u, s, n;
    (u = (t = this.cbs).onreset) === null || u === void 0 || u.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (n = (s = this.cbs).onparserinit) === null || n === void 0 || n.call(s, this), this.buffers.length = 0, this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(t) {
    this.reset(), this.end(t);
  }
  getSlice(t, u) {
    for (; t - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let s = this.buffers[0].slice(t - this.bufferOffset, u - this.bufferOffset);
    for (; u - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(), s += this.buffers[0].slice(0, u - this.bufferOffset);
    return s;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(t) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null || s === void 0 || s.call(u, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(t) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null || s === void 0 || s.call(u, new Error(".end() after done!"));
      return;
    }
    t && this.write(t), this.ended = !0, this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(t) {
    this.write(t);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(t) {
    this.end(t);
  }
}
function Ao(e, t) {
  const u = new La(void 0, t);
  return new bo(u, t).end(e), u.root;
}
const _o = ji((e, t, u, s) => t.xmlMode || t._useHtmlParser2 ? Ao(e, t) : ro(e, t, u, s)), go = Sr(_o, (e, t) => t.xmlMode || t._useHtmlParser2 ? ft(e, t) : oo(e));
go([]);
export {
  go as l
};
