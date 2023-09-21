import {
  __commonJS
} from "./chunk-7FP5O474.js";

// node_modules/joi/dist/joi-browser.min.js
var require_joi_browser_min = __commonJS({
  "node_modules/joi/dist/joi-browser.min.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.joi = t() : e.joi = t();
    }(self, () => {
      return e = { 7629: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(9474), i = r(1687), o = r(8652), l = r(8160), c = r(3292), u = r(6354), f = r(8901), h = r(9708), m = r(6914), d = r(2294), p = r(6133), g = r(1152), y = r(8863), b = r(2036), v = { Base: class {
          constructor(e3) {
            this.type = e3, this.$_root = null, this._definition = {}, this._reset();
          }
          _reset() {
            this._ids = new d.Ids(), this._preferences = null, this._refs = new p.Manager(), this._cache = null, this._valids = null, this._invalids = null, this._flags = {}, this._rules = [], this._singleRules = /* @__PURE__ */ new Map(), this.$_terms = {}, this.$_temp = { ruleset: null, whens: {} };
          }
          describe() {
            return s("function" == typeof h.describe, "Manifest functionality disabled"), h.describe(this);
          }
          allow() {
            for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
              t3[r2] = arguments[r2];
            return l.verifyFlat(t3, "allow"), this._values(t3, "_valids");
          }
          alter(e3) {
            s(e3 && "object" == typeof e3 && !Array.isArray(e3), "Invalid targets argument"), s(!this._inRuleset(), "Cannot set alterations inside a ruleset");
            const t3 = this.clone();
            t3.$_terms.alterations = t3.$_terms.alterations || [];
            for (const r2 in e3) {
              const n2 = e3[r2];
              s("function" == typeof n2, "Alteration adjuster for", r2, "must be a function"), t3.$_terms.alterations.push({ target: r2, adjuster: n2 });
            }
            return t3.$_temp.ruleset = false, t3;
          }
          artifact(e3) {
            return s(void 0 !== e3, "Artifact cannot be undefined"), s(!this._cache, "Cannot set an artifact with a rule cache"), this.$_setFlag("artifact", e3);
          }
          cast(e3) {
            return s(false === e3 || "string" == typeof e3, "Invalid to value"), s(false === e3 || this._definition.cast[e3], "Type", this.type, "does not support casting to", e3), this.$_setFlag("cast", false === e3 ? void 0 : e3);
          }
          default(e3, t3) {
            return this._default("default", e3, t3);
          }
          description(e3) {
            return s(e3 && "string" == typeof e3, "Description must be a non-empty string"), this.$_setFlag("description", e3);
          }
          empty(e3) {
            const t3 = this.clone();
            return void 0 !== e3 && (e3 = t3.$_compile(e3, { override: false })), t3.$_setFlag("empty", e3, { clone: false });
          }
          error(e3) {
            return s(e3, "Missing error"), s(e3 instanceof Error || "function" == typeof e3, "Must provide a valid Error object or a function"), this.$_setFlag("error", e3);
          }
          example(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return s(void 0 !== e3, "Missing example"), l.assertOptions(t3, ["override"]), this._inner("examples", e3, { single: true, override: t3.override });
          }
          external(e3, t3) {
            return "object" == typeof e3 && (s(!t3, "Cannot combine options with description"), t3 = e3.description, e3 = e3.method), s("function" == typeof e3, "Method must be a function"), s(void 0 === t3 || t3 && "string" == typeof t3, "Description must be a non-empty string"), this._inner("externals", { method: e3, description: t3 }, { single: true });
          }
          failover(e3, t3) {
            return this._default("failover", e3, t3);
          }
          forbidden() {
            return this.presence("forbidden");
          }
          id(e3) {
            return e3 ? (s("string" == typeof e3, "id must be a non-empty string"), s(/^[^\.]+$/.test(e3), "id cannot contain period character"), this.$_setFlag("id", e3)) : this.$_setFlag("id", void 0);
          }
          invalid() {
            for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
              t3[r2] = arguments[r2];
            return this._values(t3, "_invalids");
          }
          label(e3) {
            return s(e3 && "string" == typeof e3, "Label name must be a non-empty string"), this.$_setFlag("label", e3);
          }
          meta(e3) {
            return s(void 0 !== e3, "Meta cannot be undefined"), this._inner("metas", e3, { single: true });
          }
          note() {
            for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
              t3[r2] = arguments[r2];
            s(t3.length, "Missing notes");
            for (const e4 of t3)
              s(e4 && "string" == typeof e4, "Notes must be non-empty strings");
            return this._inner("notes", t3);
          }
          only() {
            let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return s("boolean" == typeof e3, "Invalid mode:", e3), this.$_setFlag("only", e3);
          }
          optional() {
            return this.presence("optional");
          }
          prefs(e3) {
            s(e3, "Missing preferences"), s(void 0 === e3.context, "Cannot override context"), s(void 0 === e3.externals, "Cannot override externals"), s(void 0 === e3.warnings, "Cannot override warnings"), s(void 0 === e3.debug, "Cannot override debug"), l.checkPreferences(e3);
            const t3 = this.clone();
            return t3._preferences = l.preferences(t3._preferences, e3), t3;
          }
          presence(e3) {
            return s(["optional", "required", "forbidden"].includes(e3), "Unknown presence mode", e3), this.$_setFlag("presence", e3);
          }
          raw() {
            let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return this.$_setFlag("result", e3 ? "raw" : void 0);
          }
          result(e3) {
            return s(["raw", "strip"].includes(e3), "Unknown result mode", e3), this.$_setFlag("result", e3);
          }
          required() {
            return this.presence("required");
          }
          strict(e3) {
            const t3 = this.clone(), r2 = void 0 !== e3 && !e3;
            return t3._preferences = l.preferences(t3._preferences, { convert: r2 }), t3;
          }
          strip() {
            let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return this.$_setFlag("result", e3 ? "strip" : void 0);
          }
          tag() {
            for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
              t3[r2] = arguments[r2];
            s(t3.length, "Missing tags");
            for (const e4 of t3)
              s(e4 && "string" == typeof e4, "Tags must be non-empty strings");
            return this._inner("tags", t3);
          }
          unit(e3) {
            return s(e3 && "string" == typeof e3, "Unit name must be a non-empty string"), this.$_setFlag("unit", e3);
          }
          valid() {
            for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
              t3[r2] = arguments[r2];
            l.verifyFlat(t3, "valid");
            const s2 = this.allow(...t3);
            return s2.$_setFlag("only", !!s2._valids, { clone: false }), s2;
          }
          when(e3, t3) {
            const r2 = this.clone();
            r2.$_terms.whens || (r2.$_terms.whens = []);
            const n2 = c.when(r2, e3, t3);
            if (!["any", "link"].includes(r2.type)) {
              const e4 = n2.is ? [n2] : n2.switch;
              for (const t4 of e4)
                s(!t4.then || "any" === t4.then.type || t4.then.type === r2.type, "Cannot combine", r2.type, "with", t4.then && t4.then.type), s(!t4.otherwise || "any" === t4.otherwise.type || t4.otherwise.type === r2.type, "Cannot combine", r2.type, "with", t4.otherwise && t4.otherwise.type);
            }
            return r2.$_terms.whens.push(n2), r2.$_mutateRebuild();
          }
          cache(e3) {
            s(!this._inRuleset(), "Cannot set caching inside a ruleset"), s(!this._cache, "Cannot override schema cache"), s(void 0 === this._flags.artifact, "Cannot cache a rule with an artifact");
            const t3 = this.clone();
            return t3._cache = e3 || o.provider.provision(), t3.$_temp.ruleset = false, t3;
          }
          clone() {
            const e3 = Object.create(Object.getPrototypeOf(this));
            return this._assign(e3);
          }
          concat(e3) {
            s(l.isSchema(e3), "Invalid schema object"), s("any" === this.type || "any" === e3.type || e3.type === this.type, "Cannot merge type", this.type, "with another type:", e3.type), s(!this._inRuleset(), "Cannot concatenate onto a schema with open ruleset"), s(!e3._inRuleset(), "Cannot concatenate a schema with open ruleset");
            let t3 = this.clone();
            if ("any" === this.type && "any" !== e3.type) {
              const r2 = e3.clone();
              for (const e4 of Object.keys(t3))
                "type" !== e4 && (r2[e4] = t3[e4]);
              t3 = r2;
            }
            t3._ids.concat(e3._ids), t3._refs.register(e3, p.toSibling), t3._preferences = t3._preferences ? l.preferences(t3._preferences, e3._preferences) : e3._preferences, t3._valids = b.merge(t3._valids, e3._valids, e3._invalids), t3._invalids = b.merge(t3._invalids, e3._invalids, e3._valids);
            for (const r2 of e3._singleRules.keys())
              t3._singleRules.has(r2) && (t3._rules = t3._rules.filter((e4) => e4.keep || e4.name !== r2), t3._singleRules.delete(r2));
            for (const r2 of e3._rules)
              e3._definition.rules[r2.method].multi || t3._singleRules.set(r2.name, r2), t3._rules.push(r2);
            if (t3._flags.empty && e3._flags.empty) {
              t3._flags.empty = t3._flags.empty.concat(e3._flags.empty);
              const r2 = Object.assign({}, e3._flags);
              delete r2.empty, i(t3._flags, r2);
            } else if (e3._flags.empty) {
              t3._flags.empty = e3._flags.empty;
              const r2 = Object.assign({}, e3._flags);
              delete r2.empty, i(t3._flags, r2);
            } else
              i(t3._flags, e3._flags);
            for (const r2 in e3.$_terms) {
              const s2 = e3.$_terms[r2];
              s2 ? t3.$_terms[r2] ? t3.$_terms[r2] = t3.$_terms[r2].concat(s2) : t3.$_terms[r2] = s2.slice() : t3.$_terms[r2] || (t3.$_terms[r2] = s2);
            }
            return this.$_root._tracer && this.$_root._tracer._combine(t3, [this, e3]), t3.$_mutateRebuild();
          }
          extend(e3) {
            return s(!e3.base, "Cannot extend type with another base"), f.type(this, e3);
          }
          extract(e3) {
            return e3 = Array.isArray(e3) ? e3 : e3.split("."), this._ids.reach(e3);
          }
          fork(e3, t3) {
            s(!this._inRuleset(), "Cannot fork inside a ruleset");
            let r2 = this;
            for (let s2 of [].concat(e3))
              s2 = Array.isArray(s2) ? s2 : s2.split("."), r2 = r2._ids.fork(s2, t3, r2);
            return r2.$_temp.ruleset = false, r2;
          }
          rule(e3) {
            const t3 = this._definition;
            l.assertOptions(e3, Object.keys(t3.modifiers)), s(false !== this.$_temp.ruleset, "Cannot apply rules to empty ruleset or the last rule added does not support rule properties");
            const r2 = null === this.$_temp.ruleset ? this._rules.length - 1 : this.$_temp.ruleset;
            s(r2 >= 0 && r2 < this._rules.length, "Cannot apply rules to empty ruleset");
            const a2 = this.clone();
            for (let i2 = r2; i2 < a2._rules.length; ++i2) {
              const r3 = a2._rules[i2], o2 = n(r3);
              for (const n2 in e3)
                t3.modifiers[n2](o2, e3[n2]), s(o2.name === r3.name, "Cannot change rule name");
              a2._rules[i2] = o2, a2._singleRules.get(o2.name) === r3 && a2._singleRules.set(o2.name, o2);
            }
            return a2.$_temp.ruleset = false, a2.$_mutateRebuild();
          }
          get ruleset() {
            s(!this._inRuleset(), "Cannot start a new ruleset without closing the previous one");
            const e3 = this.clone();
            return e3.$_temp.ruleset = e3._rules.length, e3;
          }
          get $() {
            return this.ruleset;
          }
          tailor(e3) {
            e3 = [].concat(e3), s(!this._inRuleset(), "Cannot tailor inside a ruleset");
            let t3 = this;
            if (this.$_terms.alterations)
              for (const { target: r2, adjuster: n2 } of this.$_terms.alterations)
                e3.includes(r2) && (t3 = n2(t3), s(l.isSchema(t3), "Alteration adjuster for", r2, "failed to return a schema object"));
            return t3 = t3.$_modify({ each: (t4) => t4.tailor(e3), ref: false }), t3.$_temp.ruleset = false, t3.$_mutateRebuild();
          }
          tracer() {
            return g.location ? g.location(this) : this;
          }
          validate(e3, t3) {
            return y.entry(e3, this, t3);
          }
          validateAsync(e3, t3) {
            return y.entryAsync(e3, this, t3);
          }
          $_addRule(e3) {
            "string" == typeof e3 && (e3 = { name: e3 }), s(e3 && "object" == typeof e3, "Invalid options"), s(e3.name && "string" == typeof e3.name, "Invalid rule name");
            for (const t4 in e3)
              s("_" !== t4[0], "Cannot set private rule properties");
            const t3 = Object.assign({}, e3);
            t3._resolve = [], t3.method = t3.method || t3.name;
            const r2 = this._definition.rules[t3.method], n2 = t3.args;
            s(r2, "Unknown rule", t3.method);
            const a2 = this.clone();
            if (n2) {
              s(1 === Object.keys(n2).length || Object.keys(n2).length === this._definition.rules[t3.name].args.length, "Invalid rule definition for", this.type, t3.name);
              for (const e4 in n2) {
                let i2 = n2[e4];
                if (r2.argsByName) {
                  const o2 = r2.argsByName.get(e4);
                  if (o2.ref && l.isResolvable(i2))
                    t3._resolve.push(e4), a2.$_mutateRegister(i2);
                  else if (o2.normalize && (i2 = o2.normalize(i2), n2[e4] = i2), o2.assert) {
                    const t4 = l.validateArg(i2, e4, o2);
                    s(!t4, t4, "or reference");
                  }
                }
                void 0 !== i2 ? n2[e4] = i2 : delete n2[e4];
              }
            }
            return r2.multi || (a2._ruleRemove(t3.name, { clone: false }), a2._singleRules.set(t3.name, t3)), false === a2.$_temp.ruleset && (a2.$_temp.ruleset = null), r2.priority ? a2._rules.unshift(t3) : a2._rules.push(t3), a2;
          }
          $_compile(e3, t3) {
            return c.schema(this.$_root, e3, t3);
          }
          $_createError(e3, t3, r2, s2, n2) {
            let a2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
            const i2 = false !== a2.flags ? this._flags : {}, o2 = a2.messages ? m.merge(this._definition.messages, a2.messages) : this._definition.messages;
            return new u.Report(e3, t3, r2, i2, o2, s2, n2);
          }
          $_getFlag(e3) {
            return this._flags[e3];
          }
          $_getRule(e3) {
            return this._singleRules.get(e3);
          }
          $_mapLabels(e3) {
            return e3 = Array.isArray(e3) ? e3 : e3.split("."), this._ids.labels(e3);
          }
          $_match(e3, t3, r2, s2) {
            (r2 = Object.assign({}, r2)).abortEarly = true, r2._externals = false, t3.snapshot();
            const n2 = !y.validate(e3, this, t3, r2, s2).errors;
            return t3.restore(), n2;
          }
          $_modify(e3) {
            return l.assertOptions(e3, ["each", "once", "ref", "schema"]), d.schema(this, e3) || this;
          }
          $_mutateRebuild() {
            return s(!this._inRuleset(), "Cannot add this rule inside a ruleset"), this._refs.reset(), this._ids.reset(), this.$_modify({ each: (e3, t3) => {
              let { source: r2, name: s2, path: n2, key: a2 } = t3;
              const i2 = this._definition[r2][s2] && this._definition[r2][s2].register;
              false !== i2 && this.$_mutateRegister(e3, { family: i2, key: a2 });
            } }), this._definition.rebuild && this._definition.rebuild(this), this.$_temp.ruleset = false, this;
          }
          $_mutateRegister(e3) {
            let { family: t3, key: r2 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this._refs.register(e3, t3), this._ids.register(e3, { key: r2 });
          }
          $_property(e3) {
            return this._definition.properties[e3];
          }
          $_reach(e3) {
            return this._ids.reach(e3);
          }
          $_rootReferences() {
            return this._refs.roots();
          }
          $_setFlag(e3, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            s("_" === e3[0] || !this._inRuleset(), "Cannot set flag inside a ruleset");
            const n2 = this._definition.flags[e3] || {};
            if (a(t3, n2.default) && (t3 = void 0), a(t3, this._flags[e3]))
              return this;
            const i2 = false !== r2.clone ? this.clone() : this;
            return void 0 !== t3 ? (i2._flags[e3] = t3, i2.$_mutateRegister(t3)) : delete i2._flags[e3], "_" !== e3[0] && (i2.$_temp.ruleset = false), i2;
          }
          $_parent(e3) {
            for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), s2 = 1; s2 < t3; s2++)
              r2[s2 - 1] = arguments[s2];
            return this[e3][l.symbols.parent].call(this, ...r2);
          }
          $_validate(e3, t3, r2) {
            return y.validate(e3, this, t3, r2);
          }
          _assign(e3) {
            e3.type = this.type, e3.$_root = this.$_root, e3.$_temp = Object.assign({}, this.$_temp), e3.$_temp.whens = {}, e3._ids = this._ids.clone(), e3._preferences = this._preferences, e3._valids = this._valids && this._valids.clone(), e3._invalids = this._invalids && this._invalids.clone(), e3._rules = this._rules.slice(), e3._singleRules = n(this._singleRules, { shallow: true }), e3._refs = this._refs.clone(), e3._flags = Object.assign({}, this._flags), e3._cache = null, e3.$_terms = {};
            for (const t3 in this.$_terms)
              e3.$_terms[t3] = this.$_terms[t3] ? this.$_terms[t3].slice() : null;
            e3.$_super = {};
            for (const t3 in this.$_super)
              e3.$_super[t3] = this._super[t3].bind(e3);
            return e3;
          }
          _bare() {
            const e3 = this.clone();
            e3._reset();
            const t3 = e3._definition.terms;
            for (const r2 in t3) {
              const s2 = t3[r2];
              e3.$_terms[r2] = s2.init;
            }
            return e3.$_mutateRebuild();
          }
          _default(e3, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return l.assertOptions(r2, "literal"), s(void 0 !== t3, "Missing", e3, "value"), s("function" == typeof t3 || !r2.literal, "Only function value supports literal option"), "function" == typeof t3 && r2.literal && (t3 = { [l.symbols.literal]: true, literal: t3 }), this.$_setFlag(e3, t3);
          }
          _generate(e3, t3, r2) {
            if (!this.$_terms.whens)
              return { schema: this };
            const s2 = [], n2 = [];
            for (let a3 = 0; a3 < this.$_terms.whens.length; ++a3) {
              const i3 = this.$_terms.whens[a3];
              if (i3.concat) {
                s2.push(i3.concat), n2.push(`${a3}.concat`);
                continue;
              }
              const o2 = i3.ref ? i3.ref.resolve(e3, t3, r2) : e3, l2 = i3.is ? [i3] : i3.switch, c2 = n2.length;
              for (let c3 = 0; c3 < l2.length; ++c3) {
                const { is: u2, then: f2, otherwise: h2 } = l2[c3], m2 = `${a3}${i3.switch ? "." + c3 : ""}`;
                if (u2.$_match(o2, t3.nest(u2, `${m2}.is`), r2)) {
                  if (f2) {
                    const a4 = t3.localize([...t3.path, `${m2}.then`], t3.ancestors, t3.schemas), { schema: i4, id: o3 } = f2._generate(e3, a4, r2);
                    s2.push(i4), n2.push(`${m2}.then${o3 ? `(${o3})` : ""}`);
                    break;
                  }
                } else if (h2) {
                  const a4 = t3.localize([...t3.path, `${m2}.otherwise`], t3.ancestors, t3.schemas), { schema: i4, id: o3 } = h2._generate(e3, a4, r2);
                  s2.push(i4), n2.push(`${m2}.otherwise${o3 ? `(${o3})` : ""}`);
                  break;
                }
              }
              if (i3.break && n2.length > c2)
                break;
            }
            const a2 = n2.join(", ");
            if (t3.mainstay.tracer.debug(t3, "rule", "when", a2), !a2)
              return { schema: this };
            if (!t3.mainstay.tracer.active && this.$_temp.whens[a2])
              return { schema: this.$_temp.whens[a2], id: a2 };
            let i2 = this;
            this._definition.generate && (i2 = this._definition.generate(this, e3, t3, r2));
            for (const e4 of s2)
              i2 = i2.concat(e4);
            return this.$_root._tracer && this.$_root._tracer._combine(i2, [this, ...s2]), this.$_temp.whens[a2] = i2, { schema: i2, id: a2 };
          }
          _inner(e3, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            s(!this._inRuleset(), `Cannot set ${e3} inside a ruleset`);
            const n2 = this.clone();
            return n2.$_terms[e3] && !r2.override || (n2.$_terms[e3] = []), r2.single ? n2.$_terms[e3].push(t3) : n2.$_terms[e3].push(...t3), n2.$_temp.ruleset = false, n2;
          }
          _inRuleset() {
            return null !== this.$_temp.ruleset && false !== this.$_temp.ruleset;
          }
          _ruleRemove(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!this._singleRules.has(e3))
              return this;
            const r2 = false !== t3.clone ? this.clone() : this;
            r2._singleRules.delete(e3);
            const s2 = [];
            for (let t4 = 0; t4 < r2._rules.length; ++t4) {
              const n2 = r2._rules[t4];
              n2.name !== e3 || n2.keep ? s2.push(n2) : r2._inRuleset() && t4 < r2.$_temp.ruleset && --r2.$_temp.ruleset;
            }
            return r2._rules = s2, r2;
          }
          _values(e3, t3) {
            l.verifyFlat(e3, t3.slice(1, -1));
            const r2 = this.clone(), n2 = e3[0] === l.symbols.override;
            if (n2 && (e3 = e3.slice(1)), !r2[t3] && e3.length ? r2[t3] = new b() : n2 && (r2[t3] = e3.length ? new b() : null, r2.$_mutateRebuild()), !r2[t3])
              return r2;
            n2 && r2[t3].override();
            for (const n3 of e3) {
              s(void 0 !== n3, "Cannot call allow/valid/invalid with undefined"), s(n3 !== l.symbols.override, "Override must be the first value");
              const e4 = "_invalids" === t3 ? "_valids" : "_invalids";
              r2[e4] && (r2[e4].remove(n3), r2[e4].length || (s("_valids" === t3 || !r2._flags.only, "Setting invalid value", n3, "leaves schema rejecting all values due to previous valid rule"), r2[e4] = null)), r2[t3].add(n3, r2._refs);
            }
            return r2;
          }
        } };
        v.Base.prototype[l.symbols.any] = { version: l.version, compile: c.compile, root: "$_root" }, v.Base.prototype.isImmutable = true, v.Base.prototype.deny = v.Base.prototype.invalid, v.Base.prototype.disallow = v.Base.prototype.invalid, v.Base.prototype.equal = v.Base.prototype.valid, v.Base.prototype.exist = v.Base.prototype.required, v.Base.prototype.not = v.Base.prototype.invalid, v.Base.prototype.options = v.Base.prototype.prefs, v.Base.prototype.preferences = v.Base.prototype.prefs, e2.exports = new v.Base();
      }, 8652: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(8160), i = { max: 1e3, supported: /* @__PURE__ */ new Set(["undefined", "boolean", "number", "string"]) };
        t2.provider = { provision: (e3) => new i.Cache(e3) }, i.Cache = class {
          constructor() {
            let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            a.assertOptions(e3, ["max"]), s(void 0 === e3.max || e3.max && e3.max > 0 && isFinite(e3.max), "Invalid max cache size"), this._max = e3.max || i.max, this._map = /* @__PURE__ */ new Map(), this._list = new i.List();
          }
          get length() {
            return this._map.size;
          }
          set(e3, t3) {
            if (null !== e3 && !i.supported.has(typeof e3))
              return;
            let r2 = this._map.get(e3);
            if (r2)
              return r2.value = t3, void this._list.first(r2);
            r2 = this._list.unshift({ key: e3, value: t3 }), this._map.set(e3, r2), this._compact();
          }
          get(e3) {
            const t3 = this._map.get(e3);
            if (t3)
              return this._list.first(t3), n(t3.value);
          }
          _compact() {
            if (this._map.size > this._max) {
              const e3 = this._list.pop();
              this._map.delete(e3.key);
            }
          }
        }, i.List = class {
          constructor() {
            this.tail = null, this.head = null;
          }
          unshift(e3) {
            return e3.next = null, e3.prev = this.head, this.head && (this.head.next = e3), this.head = e3, this.tail || (this.tail = e3), e3;
          }
          first(e3) {
            e3 !== this.head && (this._remove(e3), this.unshift(e3));
          }
          pop() {
            return this._remove(this.tail);
          }
          _remove(e3) {
            const { next: t3, prev: r2 } = e3;
            return t3.prev = r2, r2 && (r2.next = t3), e3 === this.tail && (this.tail = t3), e3.prev = null, e3.next = null, e3;
          }
        };
      }, 8160: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(7916), a = r(5934);
        let i, o;
        const l = { isoDate: /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/ };
        t2.version = a.version, t2.defaults = { abortEarly: true, allowUnknown: false, artifacts: false, cache: true, context: null, convert: true, dateFormat: "iso", errors: { escapeHtml: false, label: "path", language: null, render: true, stack: false, wrap: { label: '"', array: "[]" } }, externals: true, messages: {}, nonEnumerables: false, noDefaults: false, presence: "optional", skipFunctions: false, stripUnknown: false, warnings: false }, t2.symbols = { any: Symbol.for("@hapi/joi/schema"), arraySingle: Symbol("arraySingle"), deepDefault: Symbol("deepDefault"), errors: Symbol("errors"), literal: Symbol("literal"), override: Symbol("override"), parent: Symbol("parent"), prefs: Symbol("prefs"), ref: Symbol("ref"), template: Symbol("template"), values: Symbol("values") }, t2.assertOptions = function(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Options";
          s(e3 && "object" == typeof e3 && !Array.isArray(e3), "Options must be of type object");
          const n2 = Object.keys(e3).filter((e4) => !t3.includes(e4));
          s(0 === n2.length, `${r2} contain unknown keys: ${n2}`);
        }, t2.checkPreferences = function(e3) {
          o = o || r(3378);
          const t3 = o.preferences.validate(e3);
          if (t3.error)
            throw new n([t3.error.details[0].message]);
        }, t2.compare = function(e3, t3, r2) {
          switch (r2) {
            case "=":
              return e3 === t3;
            case ">":
              return e3 > t3;
            case "<":
              return e3 < t3;
            case ">=":
              return e3 >= t3;
            case "<=":
              return e3 <= t3;
          }
        }, t2.default = function(e3, t3) {
          return void 0 === e3 ? t3 : e3;
        }, t2.isIsoDate = function(e3) {
          return l.isoDate.test(e3);
        }, t2.isNumber = function(e3) {
          return "number" == typeof e3 && !isNaN(e3);
        }, t2.isResolvable = function(e3) {
          return !!e3 && (e3[t2.symbols.ref] || e3[t2.symbols.template]);
        }, t2.isSchema = function(e3) {
          let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          const n2 = e3 && e3[t2.symbols.any];
          return !!n2 && (s(r2.legacy || n2.version === t2.version, "Cannot mix different versions of joi schemas"), true);
        }, t2.isValues = function(e3) {
          return e3[t2.symbols.values];
        }, t2.limit = function(e3) {
          return Number.isSafeInteger(e3) && e3 >= 0;
        }, t2.preferences = function(e3, s2) {
          i = i || r(6914), e3 = e3 || {}, s2 = s2 || {};
          const n2 = Object.assign({}, e3, s2);
          return s2.errors && e3.errors && (n2.errors = Object.assign({}, e3.errors, s2.errors), n2.errors.wrap = Object.assign({}, e3.errors.wrap, s2.errors.wrap)), s2.messages && (n2.messages = i.compile(s2.messages, e3.messages)), delete n2[t2.symbols.prefs], n2;
        }, t2.tryWithPath = function(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          try {
            return e3();
          } catch (e4) {
            throw void 0 !== e4.path ? e4.path = t3 + "." + e4.path : e4.path = t3, r2.append && (e4.message = `${e4.message} (${e4.path})`), e4;
          }
        }, t2.validateArg = function(e3, r2, s2) {
          let { assert: n2, message: a2 } = s2;
          if (t2.isSchema(n2)) {
            const t3 = n2.validate(e3);
            if (!t3.error)
              return;
            return t3.error.message;
          }
          if (!n2(e3))
            return r2 ? `${r2} ${a2}` : a2;
        }, t2.verifyFlat = function(e3, t3) {
          for (const r2 of e3)
            s(!Array.isArray(r2), "Method no longer accepts array arguments:", t3);
        };
      }, 3292: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8160), a = r(6133), i = {};
        t2.schema = function(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          n.assertOptions(r2, ["appendPath", "override"]);
          try {
            return i.schema(e3, t3, r2);
          } catch (e4) {
            throw r2.appendPath && void 0 !== e4.path && (e4.message = `${e4.message} (${e4.path})`), e4;
          }
        }, i.schema = function(e3, t3, r2) {
          s(void 0 !== t3, "Invalid undefined schema"), Array.isArray(t3) && (s(t3.length, "Invalid empty array schema"), 1 === t3.length && (t3 = t3[0]));
          const a2 = function(t4) {
            for (var s2 = arguments.length, n2 = new Array(s2 > 1 ? s2 - 1 : 0), a3 = 1; a3 < s2; a3++)
              n2[a3 - 1] = arguments[a3];
            return false !== r2.override ? t4.valid(e3.override, ...n2) : t4.valid(...n2);
          };
          if (i.simple(t3))
            return a2(e3, t3);
          if ("function" == typeof t3)
            return e3.custom(t3);
          if (s("object" == typeof t3, "Invalid schema content:", typeof t3), n.isResolvable(t3))
            return a2(e3, t3);
          if (n.isSchema(t3))
            return t3;
          if (Array.isArray(t3)) {
            for (const r3 of t3)
              if (!i.simple(r3))
                return e3.alternatives().try(...t3);
            return a2(e3, ...t3);
          }
          return t3 instanceof RegExp ? e3.string().regex(t3) : t3 instanceof Date ? a2(e3.date(), t3) : (s(Object.getPrototypeOf(t3) === Object.getPrototypeOf({}), "Schema can only contain plain objects"), e3.object().keys(t3));
        }, t2.ref = function(e3, t3) {
          return a.isRef(e3) ? e3 : a.create(e3, t3);
        }, t2.compile = function(e3, r2) {
          let a2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          n.assertOptions(a2, ["legacy"]);
          const o = r2 && r2[n.symbols.any];
          if (o)
            return s(a2.legacy || o.version === n.version, "Cannot mix different versions of joi schemas:", o.version, n.version), r2;
          if ("object" != typeof r2 || !a2.legacy)
            return t2.schema(e3, r2, { appendPath: true });
          const l = i.walk(r2);
          return l ? l.compile(l.root, r2) : t2.schema(e3, r2, { appendPath: true });
        }, i.walk = function(e3) {
          if ("object" != typeof e3)
            return null;
          if (Array.isArray(e3)) {
            for (const t4 of e3) {
              const e4 = i.walk(t4);
              if (e4)
                return e4;
            }
            return null;
          }
          const t3 = e3[n.symbols.any];
          if (t3)
            return { root: e3[t3.root], compile: t3.compile };
          s(Object.getPrototypeOf(e3) === Object.getPrototypeOf({}), "Schema can only contain plain objects");
          for (const t4 in e3) {
            const r2 = i.walk(e3[t4]);
            if (r2)
              return r2;
          }
          return null;
        }, i.simple = function(e3) {
          return null === e3 || ["boolean", "string", "number"].includes(typeof e3);
        }, t2.when = function(e3, r2, o) {
          if (void 0 === o && (s(r2 && "object" == typeof r2, "Missing options"), o = r2, r2 = a.create(".")), Array.isArray(o) && (o = { switch: o }), n.assertOptions(o, ["is", "not", "then", "otherwise", "switch", "break"]), n.isSchema(r2))
            return s(void 0 === o.is, '"is" can not be used with a schema condition'), s(void 0 === o.not, '"not" can not be used with a schema condition'), s(void 0 === o.switch, '"switch" can not be used with a schema condition'), i.condition(e3, { is: r2, then: o.then, otherwise: o.otherwise, break: o.break });
          if (s(a.isRef(r2) || "string" == typeof r2, "Invalid condition:", r2), s(void 0 === o.not || void 0 === o.is, 'Cannot combine "is" with "not"'), void 0 === o.switch) {
            let l2 = o;
            void 0 !== o.not && (l2 = { is: o.not, then: o.otherwise, otherwise: o.then, break: o.break });
            let c = void 0 !== l2.is ? e3.$_compile(l2.is) : e3.$_root.invalid(null, false, 0, "").required();
            return s(void 0 !== l2.then || void 0 !== l2.otherwise, 'options must have at least one of "then", "otherwise", or "switch"'), s(void 0 === l2.break || void 0 === l2.then || void 0 === l2.otherwise, "Cannot specify then, otherwise, and break all together"), void 0 === o.is || a.isRef(o.is) || n.isSchema(o.is) || (c = c.required()), i.condition(e3, { ref: t2.ref(r2), is: c, then: l2.then, otherwise: l2.otherwise, break: l2.break });
          }
          s(Array.isArray(o.switch), '"switch" must be an array'), s(void 0 === o.is, 'Cannot combine "switch" with "is"'), s(void 0 === o.not, 'Cannot combine "switch" with "not"'), s(void 0 === o.then, 'Cannot combine "switch" with "then"');
          const l = { ref: t2.ref(r2), switch: [], break: o.break };
          for (let t3 = 0; t3 < o.switch.length; ++t3) {
            const r3 = o.switch[t3], i2 = t3 === o.switch.length - 1;
            n.assertOptions(r3, i2 ? ["is", "then", "otherwise"] : ["is", "then"]), s(void 0 !== r3.is, 'Switch statement missing "is"'), s(void 0 !== r3.then, 'Switch statement missing "then"');
            const c = { is: e3.$_compile(r3.is), then: e3.$_compile(r3.then) };
            if (a.isRef(r3.is) || n.isSchema(r3.is) || (c.is = c.is.required()), i2) {
              s(void 0 === o.otherwise || void 0 === r3.otherwise, 'Cannot specify "otherwise" inside and outside a "switch"');
              const t4 = void 0 !== o.otherwise ? o.otherwise : r3.otherwise;
              void 0 !== t4 && (s(void 0 === l.break, "Cannot specify both otherwise and break"), c.otherwise = e3.$_compile(t4));
            }
            l.switch.push(c);
          }
          return l;
        }, i.condition = function(e3, t3) {
          for (const r2 of ["then", "otherwise"])
            void 0 === t3[r2] ? delete t3[r2] : t3[r2] = e3.$_compile(t3[r2]);
          return t3;
        };
      }, 6354: (e2, t2, r) => {
        "use strict";
        const s = r(5688), n = r(8160), a = r(3328);
        t2.Report = class {
          constructor(e3, r2, s2, n2, a2, i, o) {
            if (this.code = e3, this.flags = n2, this.messages = a2, this.path = i.path, this.prefs = o, this.state = i, this.value = r2, this.message = null, this.template = null, this.local = s2 || {}, this.local.label = t2.label(this.flags, this.state, this.prefs, this.messages), void 0 === this.value || this.local.hasOwnProperty("value") || (this.local.value = this.value), this.path.length) {
              const e4 = this.path[this.path.length - 1];
              "object" != typeof e4 && (this.local.key = e4);
            }
          }
          _setTemplate(e3) {
            if (this.template = e3, !this.flags.label && 0 === this.path.length) {
              const e4 = this._template(this.template, "root");
              e4 && (this.local.label = e4);
            }
          }
          toString() {
            if (this.message)
              return this.message;
            const e3 = this.code;
            if (!this.prefs.errors.render)
              return this.code;
            const t3 = this._template(this.template) || this._template(this.prefs.messages) || this._template(this.messages);
            return void 0 === t3 ? `Error code "${e3}" is not defined, your custom type is missing the correct messages definition` : (this.message = t3.render(this.value, this.state, this.prefs, this.local, { errors: this.prefs.errors, messages: [this.prefs.messages, this.messages] }), this.prefs.errors.label || (this.message = this.message.replace(/^"" /, "").trim()), this.message);
          }
          _template(e3, r2) {
            return t2.template(this.value, e3, r2 || this.code, this.state, this.prefs);
          }
        }, t2.path = function(e3) {
          let t3 = "";
          for (const r2 of e3)
            "object" != typeof r2 && ("string" == typeof r2 ? (t3 && (t3 += "."), t3 += r2) : t3 += `[${r2}]`);
          return t3;
        }, t2.template = function(e3, t3, r2, s2, i) {
          if (!t3)
            return;
          if (a.isTemplate(t3))
            return "root" !== r2 ? t3 : null;
          let o = i.errors.language;
          if (n.isResolvable(o) && (o = o.resolve(e3, s2, i)), o && t3[o]) {
            if (void 0 !== t3[o][r2])
              return t3[o][r2];
            if (void 0 !== t3[o]["*"])
              return t3[o]["*"];
          }
          return t3[r2] ? t3[r2] : t3["*"];
        }, t2.label = function(e3, r2, s2, n2) {
          if (e3.label)
            return e3.label;
          if (!s2.errors.label)
            return "";
          let a2 = r2.path;
          "key" === s2.errors.label && r2.path.length > 1 && (a2 = r2.path.slice(-1));
          return t2.path(a2) || t2.template(null, s2.messages, "root", r2, s2) || n2 && t2.template(null, n2, "root", r2, s2) || "value";
        }, t2.process = function(e3, r2, s2) {
          if (!e3)
            return null;
          const { override: n2, message: a2, details: i } = t2.details(e3);
          if (n2)
            return n2;
          if (s2.errors.stack)
            return new t2.ValidationError(a2, i, r2);
          const o = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          const l = new t2.ValidationError(a2, i, r2);
          return Error.stackTraceLimit = o, l;
        }, t2.details = function(e3) {
          let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = [];
          const s2 = [];
          for (const n2 of e3) {
            if (n2 instanceof Error) {
              if (false !== t3.override)
                return { override: n2 };
              const e5 = n2.toString();
              r2.push(e5), s2.push({ message: e5, type: "override", context: { error: n2 } });
              continue;
            }
            const e4 = n2.toString();
            r2.push(e4), s2.push({ message: e4, path: n2.path.filter((e5) => "object" != typeof e5), type: n2.code, context: n2.local });
          }
          return r2.length > 1 && (r2 = [...new Set(r2)]), { message: r2.join(". "), details: s2 };
        }, t2.ValidationError = class extends Error {
          constructor(e3, t3, r2) {
            super(e3), this._original = r2, this.details = t3;
          }
          static isError(e3) {
            return e3 instanceof t2.ValidationError;
          }
        }, t2.ValidationError.prototype.isJoi = true, t2.ValidationError.prototype.name = "ValidationError", t2.ValidationError.prototype.annotate = s.error;
      }, 8901: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(8160), i = r(6914), o = {};
        t2.type = function(e3, t3) {
          const r2 = Object.getPrototypeOf(e3), l = n(r2), c = e3._assign(Object.create(l)), u = Object.assign({}, t3);
          delete u.base, l._definition = u;
          const f = r2._definition || {};
          u.messages = i.merge(f.messages, u.messages), u.properties = Object.assign({}, f.properties, u.properties), c.type = u.type, u.flags = Object.assign({}, f.flags, u.flags);
          const h = Object.assign({}, f.terms);
          if (u.terms)
            for (const e4 in u.terms) {
              const t4 = u.terms[e4];
              s(void 0 === c.$_terms[e4], "Invalid term override for", u.type, e4), c.$_terms[e4] = t4.init, h[e4] = t4;
            }
          u.terms = h, u.args || (u.args = f.args), u.prepare = o.prepare(u.prepare, f.prepare), u.coerce && ("function" == typeof u.coerce && (u.coerce = { method: u.coerce }), u.coerce.from && !Array.isArray(u.coerce.from) && (u.coerce = { method: u.coerce.method, from: [].concat(u.coerce.from) })), u.coerce = o.coerce(u.coerce, f.coerce), u.validate = o.validate(u.validate, f.validate);
          const m = Object.assign({}, f.rules);
          if (u.rules)
            for (const e4 in u.rules) {
              const t4 = u.rules[e4];
              s("object" == typeof t4, "Invalid rule definition for", u.type, e4);
              let r3 = t4.method;
              if (void 0 === r3 && (r3 = function() {
                return this.$_addRule(e4);
              }), r3 && (s(!l[e4], "Rule conflict in", u.type, e4), l[e4] = r3), s(!m[e4], "Rule conflict in", u.type, e4), m[e4] = t4, t4.alias) {
                const e5 = [].concat(t4.alias);
                for (const r4 of e5)
                  l[r4] = t4.method;
              }
              t4.args && (t4.argsByName = /* @__PURE__ */ new Map(), t4.args = t4.args.map((e5) => ("string" == typeof e5 && (e5 = { name: e5 }), s(!t4.argsByName.has(e5.name), "Duplicated argument name", e5.name), a.isSchema(e5.assert) && (e5.assert = e5.assert.strict().label(e5.name)), t4.argsByName.set(e5.name, e5), e5)));
            }
          u.rules = m;
          const d = Object.assign({}, f.modifiers);
          if (u.modifiers)
            for (const e4 in u.modifiers) {
              s(!l[e4], "Rule conflict in", u.type, e4);
              const t4 = u.modifiers[e4];
              s("function" == typeof t4, "Invalid modifier definition for", u.type, e4);
              const r3 = function(t5) {
                return this.rule({ [e4]: t5 });
              };
              l[e4] = r3, d[e4] = t4;
            }
          if (u.modifiers = d, u.overrides) {
            l._super = r2, c.$_super = {};
            for (const e4 in u.overrides)
              s(r2[e4], "Cannot override missing", e4), u.overrides[e4][a.symbols.parent] = r2[e4], c.$_super[e4] = r2[e4].bind(c);
            Object.assign(l, u.overrides);
          }
          u.cast = Object.assign({}, f.cast, u.cast);
          const p = Object.assign({}, f.manifest, u.manifest);
          return p.build = o.build(u.manifest && u.manifest.build, f.manifest && f.manifest.build), u.manifest = p, u.rebuild = o.rebuild(u.rebuild, f.rebuild), c;
        }, o.build = function(e3, t3) {
          return e3 && t3 ? function(r2, s2) {
            return t3(e3(r2, s2), s2);
          } : e3 || t3;
        }, o.coerce = function(e3, t3) {
          return e3 && t3 ? { from: e3.from && t3.from ? [.../* @__PURE__ */ new Set([...e3.from, ...t3.from])] : null, method(r2, s2) {
            let n2;
            if ((!t3.from || t3.from.includes(typeof r2)) && (n2 = t3.method(r2, s2), n2)) {
              if (n2.errors || void 0 === n2.value)
                return n2;
              r2 = n2.value;
            }
            if (!e3.from || e3.from.includes(typeof r2)) {
              const t4 = e3.method(r2, s2);
              if (t4)
                return t4;
            }
            return n2;
          } } : e3 || t3;
        }, o.prepare = function(e3, t3) {
          return e3 && t3 ? function(r2, s2) {
            const n2 = e3(r2, s2);
            if (n2) {
              if (n2.errors || void 0 === n2.value)
                return n2;
              r2 = n2.value;
            }
            return t3(r2, s2) || n2;
          } : e3 || t3;
        }, o.rebuild = function(e3, t3) {
          return e3 && t3 ? function(r2) {
            t3(r2), e3(r2);
          } : e3 || t3;
        }, o.validate = function(e3, t3) {
          return e3 && t3 ? function(r2, s2) {
            const n2 = t3(r2, s2);
            if (n2) {
              if (n2.errors && (!Array.isArray(n2.errors) || n2.errors.length))
                return n2;
              r2 = n2.value;
            }
            return e3(r2, s2) || n2;
          } : e3 || t3;
        };
      }, 5107: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(8652), i = r(8160), o = r(3292), l = r(6354), c = r(8901), u = r(9708), f = r(6133), h = r(3328), m = r(1152);
        let d;
        const p = { types: { alternatives: r(4946), any: r(8068), array: r(546), boolean: r(4937), date: r(7500), function: r(390), link: r(8785), number: r(3832), object: r(8966), string: r(7417), symbol: r(8826) }, aliases: { alt: "alternatives", bool: "boolean", func: "function" }, root: function() {
          const e3 = { _types: new Set(Object.keys(p.types)) };
          for (const t3 of e3._types)
            e3[t3] = function() {
              for (var e4 = arguments.length, r2 = new Array(e4), n2 = 0; n2 < e4; n2++)
                r2[n2] = arguments[n2];
              return s(!r2.length || ["alternatives", "link", "object"].includes(t3), "The", t3, "type does not allow arguments"), p.generate(this, p.types[t3], r2);
            };
          for (const t3 of ["allow", "custom", "disallow", "equal", "exist", "forbidden", "invalid", "not", "only", "optional", "options", "prefs", "preferences", "required", "strip", "valid", "when"])
            e3[t3] = function() {
              return this.any()[t3](...arguments);
            };
          Object.assign(e3, p.methods);
          for (const t3 in p.aliases) {
            const r2 = p.aliases[t3];
            e3[t3] = e3[r2];
          }
          return e3.x = e3.expression, m.setup && m.setup(e3), e3;
        } };
        p.methods = { ValidationError: l.ValidationError, version: i.version, cache: a.provider, assert(e3, t3) {
          for (var r2 = arguments.length, s2 = new Array(r2 > 2 ? r2 - 2 : 0), n2 = 2; n2 < r2; n2++)
            s2[n2 - 2] = arguments[n2];
          p.assert(e3, t3, true, s2);
        }, attempt(e3, t3) {
          for (var r2 = arguments.length, s2 = new Array(r2 > 2 ? r2 - 2 : 0), n2 = 2; n2 < r2; n2++)
            s2[n2 - 2] = arguments[n2];
          return p.assert(e3, t3, false, s2);
        }, build(e3) {
          return s("function" == typeof u.build, "Manifest functionality disabled"), u.build(this, e3);
        }, checkPreferences(e3) {
          i.checkPreferences(e3);
        }, compile(e3, t3) {
          return o.compile(this, e3, t3);
        }, defaults(e3) {
          s("function" == typeof e3, "modifier must be a function");
          const t3 = Object.assign({}, this);
          for (const r2 of t3._types) {
            const n2 = e3(t3[r2]());
            s(i.isSchema(n2), "modifier must return a valid schema object"), t3[r2] = function() {
              for (var e4 = arguments.length, t4 = new Array(e4), r3 = 0; r3 < e4; r3++)
                t4[r3] = arguments[r3];
              return p.generate(this, n2, t4);
            };
          }
          return t3;
        }, expression() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          return new h(...t3);
        }, extend() {
          for (var e3 = arguments.length, t3 = new Array(e3), n2 = 0; n2 < e3; n2++)
            t3[n2] = arguments[n2];
          i.verifyFlat(t3, "extend"), d = d || r(3378), s(t3.length, "You need to provide at least one extension"), this.assert(t3, d.extensions);
          const a2 = Object.assign({}, this);
          a2._types = new Set(a2._types);
          for (let e4 of t3) {
            "function" == typeof e4 && (e4 = e4(a2)), this.assert(e4, d.extension);
            const t4 = p.expandExtension(e4, a2);
            for (const e5 of t4) {
              s(void 0 === a2[e5.type] || a2._types.has(e5.type), "Cannot override name", e5.type);
              const t5 = e5.base || this.any(), r2 = c.type(t5, e5);
              a2._types.add(e5.type), a2[e5.type] = function() {
                for (var e6 = arguments.length, t6 = new Array(e6), s2 = 0; s2 < e6; s2++)
                  t6[s2] = arguments[s2];
                return p.generate(this, r2, t6);
              };
            }
          }
          return a2;
        }, isError: l.ValidationError.isError, isExpression: h.isTemplate, isRef: f.isRef, isSchema: i.isSchema, in() {
          return f.in(...arguments);
        }, override: i.symbols.override, ref() {
          return f.create(...arguments);
        }, types() {
          const e3 = {};
          for (const t3 of this._types)
            e3[t3] = this[t3]();
          for (const t3 in p.aliases)
            e3[t3] = this[t3]();
          return e3;
        } }, p.assert = function(e3, t3, r2, s2) {
          const a2 = s2[0] instanceof Error || "string" == typeof s2[0] ? s2[0] : null, o2 = null !== a2 ? s2[1] : s2[0], c2 = t3.validate(e3, i.preferences({ errors: { stack: true } }, o2 || {}));
          let u2 = c2.error;
          if (!u2)
            return c2.value;
          if (a2 instanceof Error)
            throw a2;
          const f2 = r2 && "function" == typeof u2.annotate ? u2.annotate() : u2.message;
          throw u2 instanceof l.ValidationError == 0 && (u2 = n(u2)), u2.message = a2 ? `${a2} ${f2}` : f2, u2;
        }, p.generate = function(e3, t3, r2) {
          return s(e3, "Must be invoked on a Joi instance."), t3.$_root = e3, t3._definition.args && r2.length ? t3._definition.args(t3, ...r2) : t3;
        }, p.expandExtension = function(e3, t3) {
          if ("string" == typeof e3.type)
            return [e3];
          const r2 = [];
          for (const s2 of t3._types)
            if (e3.type.test(s2)) {
              const n2 = Object.assign({}, e3);
              n2.type = s2, n2.base = t3[s2](), r2.push(n2);
            }
          return r2;
        }, e2.exports = p.root();
      }, 6914: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(3328);
        t2.compile = function(e3, t3) {
          if ("string" == typeof e3)
            return s(!t3, "Cannot set single message string"), new a(e3);
          if (a.isTemplate(e3))
            return s(!t3, "Cannot set single message template"), e3;
          s("object" == typeof e3 && !Array.isArray(e3), "Invalid message options"), t3 = t3 ? n(t3) : {};
          for (let r2 in e3) {
            const n2 = e3[r2];
            if ("root" === r2 || a.isTemplate(n2)) {
              t3[r2] = n2;
              continue;
            }
            if ("string" == typeof n2) {
              t3[r2] = new a(n2);
              continue;
            }
            s("object" == typeof n2 && !Array.isArray(n2), "Invalid message for", r2);
            const i = r2;
            for (r2 in t3[i] = t3[i] || {}, n2) {
              const e4 = n2[r2];
              "root" === r2 || a.isTemplate(e4) ? t3[i][r2] = e4 : (s("string" == typeof e4, "Invalid message for", r2, "in", i), t3[i][r2] = new a(e4));
            }
          }
          return t3;
        }, t2.decompile = function(e3) {
          const t3 = {};
          for (let r2 in e3) {
            const s2 = e3[r2];
            if ("root" === r2) {
              t3.root = s2;
              continue;
            }
            if (a.isTemplate(s2)) {
              t3[r2] = s2.describe({ compact: true });
              continue;
            }
            const n2 = r2;
            for (r2 in t3[n2] = {}, s2) {
              const e4 = s2[r2];
              "root" !== r2 ? t3[n2][r2] = e4.describe({ compact: true }) : t3[n2].root = e4;
            }
          }
          return t3;
        }, t2.merge = function(e3, r2) {
          if (!e3)
            return t2.compile(r2);
          if (!r2)
            return e3;
          if ("string" == typeof r2)
            return new a(r2);
          if (a.isTemplate(r2))
            return r2;
          const i = n(e3);
          for (let e4 in r2) {
            const t3 = r2[e4];
            if ("root" === e4 || a.isTemplate(t3)) {
              i[e4] = t3;
              continue;
            }
            if ("string" == typeof t3) {
              i[e4] = new a(t3);
              continue;
            }
            s("object" == typeof t3 && !Array.isArray(t3), "Invalid message for", e4);
            const n2 = e4;
            for (e4 in i[n2] = i[n2] || {}, t3) {
              const r3 = t3[e4];
              "root" === e4 || a.isTemplate(r3) ? i[n2][e4] = r3 : (s("string" == typeof r3, "Invalid message for", e4, "in", n2), i[n2][e4] = new a(r3));
            }
          }
          return i;
        };
      }, 2294: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8160), a = r(6133), i = {};
        t2.Ids = i.Ids = class {
          constructor() {
            this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = false;
          }
          clone() {
            const e3 = new i.Ids();
            return e3._byId = new Map(this._byId), e3._byKey = new Map(this._byKey), e3._schemaChain = this._schemaChain, e3;
          }
          concat(e3) {
            e3._schemaChain && (this._schemaChain = true);
            for (const [t3, r2] of e3._byId.entries())
              s(!this._byKey.has(t3), "Schema id conflicts with existing key:", t3), this._byId.set(t3, r2);
            for (const [t3, r2] of e3._byKey.entries())
              s(!this._byId.has(t3), "Schema key conflicts with existing id:", t3), this._byKey.set(t3, r2);
          }
          fork(e3, t3, r2) {
            const a2 = this._collect(e3);
            a2.push({ schema: r2 });
            const o = a2.shift();
            let l = { id: o.id, schema: t3(o.schema) };
            s(n.isSchema(l.schema), "adjuster function failed to return a joi schema type");
            for (const e4 of a2)
              l = { id: e4.id, schema: i.fork(e4.schema, l.id, l.schema) };
            return l.schema;
          }
          labels(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            const r2 = e3[0], s2 = this._get(r2);
            if (!s2)
              return [...t3, ...e3].join(".");
            const n2 = e3.slice(1);
            return t3 = [...t3, s2.schema._flags.label || r2], n2.length ? s2.schema._ids.labels(n2, t3) : t3.join(".");
          }
          reach(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            const r2 = e3[0], n2 = this._get(r2);
            s(n2, "Schema does not contain path", [...t3, ...e3].join("."));
            const a2 = e3.slice(1);
            return a2.length ? n2.schema._ids.reach(a2, [...t3, r2]) : n2.schema;
          }
          register(e3) {
            let { key: t3 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!e3 || !n.isSchema(e3))
              return;
            (e3.$_property("schemaChain") || e3._ids._schemaChain) && (this._schemaChain = true);
            const r2 = e3._flags.id;
            if (r2) {
              const t4 = this._byId.get(r2);
              s(!t4 || t4.schema === e3, "Cannot add different schemas with the same id:", r2), s(!this._byKey.has(r2), "Schema id conflicts with existing key:", r2), this._byId.set(r2, { schema: e3, id: r2 });
            }
            t3 && (s(!this._byKey.has(t3), "Schema already contains key:", t3), s(!this._byId.has(t3), "Schema key conflicts with existing id:", t3), this._byKey.set(t3, { schema: e3, id: t3 }));
          }
          reset() {
            this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = false;
          }
          _collect(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            const n2 = e3[0], a2 = this._get(n2);
            s(a2, "Schema does not contain path", [...t3, ...e3].join(".")), r2 = [a2, ...r2];
            const i2 = e3.slice(1);
            return i2.length ? a2.schema._ids._collect(i2, [...t3, n2], r2) : r2;
          }
          _get(e3) {
            return this._byId.get(e3) || this._byKey.get(e3);
          }
        }, i.fork = function(e3, r2, s2) {
          const n2 = t2.schema(e3, { each: (e4, t3) => {
            let { key: n3 } = t3;
            if (r2 === (e4._flags.id || n3))
              return s2;
          }, ref: false });
          return n2 ? n2.$_mutateRebuild() : e3;
        }, t2.schema = function(e3, t3) {
          let r2;
          for (const s2 in e3._flags) {
            if ("_" === s2[0])
              continue;
            const n2 = i.scan(e3._flags[s2], { source: "flags", name: s2 }, t3);
            void 0 !== n2 && (r2 = r2 || e3.clone(), r2._flags[s2] = n2);
          }
          for (let s2 = 0; s2 < e3._rules.length; ++s2) {
            const n2 = e3._rules[s2], a2 = i.scan(n2.args, { source: "rules", name: n2.name }, t3);
            if (void 0 !== a2) {
              r2 = r2 || e3.clone();
              const t4 = Object.assign({}, n2);
              t4.args = a2, r2._rules[s2] = t4, r2._singleRules.get(n2.name) === n2 && r2._singleRules.set(n2.name, t4);
            }
          }
          for (const s2 in e3.$_terms) {
            if ("_" === s2[0])
              continue;
            const n2 = i.scan(e3.$_terms[s2], { source: "terms", name: s2 }, t3);
            void 0 !== n2 && (r2 = r2 || e3.clone(), r2.$_terms[s2] = n2);
          }
          return r2;
        }, i.scan = function(e3, t3, r2, s2, o) {
          const l = s2 || [];
          if (null === e3 || "object" != typeof e3)
            return;
          let c;
          if (Array.isArray(e3)) {
            for (let s3 = 0; s3 < e3.length; ++s3) {
              const n2 = "terms" === t3.source && "keys" === t3.name && e3[s3].key, a2 = i.scan(e3[s3], t3, r2, [s3, ...l], n2);
              void 0 !== a2 && (c = c || e3.slice(), c[s3] = a2);
            }
            return c;
          }
          if (false !== r2.schema && n.isSchema(e3) || false !== r2.ref && a.isRef(e3)) {
            const s3 = r2.each(e3, { ...t3, path: l, key: o });
            if (s3 === e3)
              return;
            return s3;
          }
          for (const s3 in e3) {
            if ("_" === s3[0])
              continue;
            const n2 = i.scan(e3[s3], t3, r2, [s3, ...l], o);
            void 0 !== n2 && (c = c || Object.assign({}, e3), c[s3] = n2);
          }
          return c;
        };
      }, 6133: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(9621), i = r(8160);
        let o;
        const l = { symbol: Symbol("ref"), defaults: { adjust: null, in: false, iterables: null, map: null, separator: ".", type: "value" } };
        t2.create = function(e3) {
          let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          s("string" == typeof e3, "Invalid reference key:", e3), i.assertOptions(t3, ["adjust", "ancestor", "in", "iterables", "map", "prefix", "render", "separator"]), s(!t3.prefix || "object" == typeof t3.prefix, "options.prefix must be of type object");
          const r2 = Object.assign({}, l.defaults, t3);
          delete r2.prefix;
          const n2 = r2.separator, a2 = l.context(e3, n2, t3.prefix);
          if (r2.type = a2.type, e3 = a2.key, "value" === r2.type)
            if (a2.root && (s(!n2 || e3[0] !== n2, "Cannot specify relative path with root prefix"), r2.ancestor = "root", e3 || (e3 = null)), n2 && n2 === e3)
              e3 = null, r2.ancestor = 0;
            else if (void 0 !== r2.ancestor)
              s(!n2 || !e3 || e3[0] !== n2, "Cannot combine prefix with ancestor option");
            else {
              const [t4, s2] = l.ancestor(e3, n2);
              s2 && "" === (e3 = e3.slice(s2)) && (e3 = null), r2.ancestor = t4;
            }
          return r2.path = n2 ? null === e3 ? [] : e3.split(n2) : [e3], new l.Ref(r2);
        }, t2.in = function(e3) {
          let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return t2.create(e3, { ...r2, in: true });
        }, t2.isRef = function(e3) {
          return !!e3 && !!e3[i.symbols.ref];
        }, l.Ref = class {
          constructor(e3) {
            s("object" == typeof e3, "Invalid reference construction"), i.assertOptions(e3, ["adjust", "ancestor", "in", "iterables", "map", "path", "render", "separator", "type", "depth", "key", "root", "display"]), s([false, void 0].includes(e3.separator) || "string" == typeof e3.separator && 1 === e3.separator.length, "Invalid separator"), s(!e3.adjust || "function" == typeof e3.adjust, "options.adjust must be a function"), s(!e3.map || Array.isArray(e3.map), "options.map must be an array"), s(!e3.map || !e3.adjust, "Cannot set both map and adjust options"), Object.assign(this, l.defaults, e3), s("value" === this.type || void 0 === this.ancestor, "Non-value references cannot reference ancestors"), Array.isArray(this.map) && (this.map = new Map(this.map)), this.depth = this.path.length, this.key = this.path.length ? this.path.join(this.separator) : null, this.root = this.path[0], this.updateDisplay();
          }
          resolve(e3, t3, r2, n2) {
            let a2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            return s(!this.in || a2.in, "Invalid in() reference usage"), "global" === this.type ? this._resolve(r2.context, t3, a2) : "local" === this.type ? this._resolve(n2, t3, a2) : this.ancestor ? "root" === this.ancestor ? this._resolve(t3.ancestors[t3.ancestors.length - 1], t3, a2) : (s(this.ancestor <= t3.ancestors.length, "Invalid reference exceeds the schema root:", this.display), this._resolve(t3.ancestors[this.ancestor - 1], t3, a2)) : this._resolve(e3, t3, a2);
          }
          _resolve(e3, t3, r2) {
            let s2;
            if ("value" === this.type && t3.mainstay.shadow && false !== r2.shadow && (s2 = t3.mainstay.shadow.get(this.absolute(t3))), void 0 === s2 && (s2 = a(e3, this.path, { iterables: this.iterables, functions: true })), this.adjust && (s2 = this.adjust(s2)), this.map) {
              const e4 = this.map.get(s2);
              void 0 !== e4 && (s2 = e4);
            }
            return t3.mainstay && t3.mainstay.tracer.resolve(t3, this, s2), s2;
          }
          toString() {
            return this.display;
          }
          absolute(e3) {
            return [...e3.path.slice(0, -this.ancestor), ...this.path];
          }
          clone() {
            return new l.Ref(this);
          }
          describe() {
            const e3 = { path: this.path };
            "value" !== this.type && (e3.type = this.type), "." !== this.separator && (e3.separator = this.separator), "value" === this.type && 1 !== this.ancestor && (e3.ancestor = this.ancestor), this.map && (e3.map = [...this.map]);
            for (const t3 of ["adjust", "iterables", "render"])
              null !== this[t3] && void 0 !== this[t3] && (e3[t3] = this[t3]);
            return false !== this.in && (e3.in = true), { ref: e3 };
          }
          updateDisplay() {
            const e3 = null !== this.key ? this.key : "";
            if ("value" !== this.type)
              return void (this.display = `ref:${this.type}:${e3}`);
            if (!this.separator)
              return void (this.display = `ref:${e3}`);
            if (!this.ancestor)
              return void (this.display = `ref:${this.separator}${e3}`);
            if ("root" === this.ancestor)
              return void (this.display = `ref:root:${e3}`);
            if (1 === this.ancestor)
              return void (this.display = `ref:${e3 || ".."}`);
            const t3 = new Array(this.ancestor + 1).fill(this.separator).join("");
            this.display = `ref:${t3}${e3 || ""}`;
          }
        }, l.Ref.prototype[i.symbols.ref] = true, t2.build = function(e3) {
          return "value" === (e3 = Object.assign({}, l.defaults, e3)).type && void 0 === e3.ancestor && (e3.ancestor = 1), new l.Ref(e3);
        }, l.context = function(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          if (e3 = e3.trim(), r2) {
            const s2 = void 0 === r2.global ? "$" : r2.global;
            if (s2 !== t3 && e3.startsWith(s2))
              return { key: e3.slice(s2.length), type: "global" };
            const n2 = void 0 === r2.local ? "#" : r2.local;
            if (n2 !== t3 && e3.startsWith(n2))
              return { key: e3.slice(n2.length), type: "local" };
            const a2 = void 0 === r2.root ? "/" : r2.root;
            if (a2 !== t3 && e3.startsWith(a2))
              return { key: e3.slice(a2.length), type: "value", root: true };
          }
          return { key: e3, type: "value" };
        }, l.ancestor = function(e3, t3) {
          if (!t3)
            return [1, 0];
          if (e3[0] !== t3)
            return [1, 0];
          if (e3[1] !== t3)
            return [0, 1];
          let r2 = 2;
          for (; e3[r2] === t3; )
            ++r2;
          return [r2 - 1, r2];
        }, t2.toSibling = 0, t2.toParent = 1, t2.Manager = class {
          constructor() {
            this.refs = [];
          }
          register(e3, s2) {
            if (e3)
              if (s2 = void 0 === s2 ? t2.toParent : s2, Array.isArray(e3))
                for (const t3 of e3)
                  this.register(t3, s2);
              else if (i.isSchema(e3))
                for (const t3 of e3._refs.refs)
                  t3.ancestor - s2 >= 0 && this.refs.push({ ancestor: t3.ancestor - s2, root: t3.root });
              else
                t2.isRef(e3) && "value" === e3.type && e3.ancestor - s2 >= 0 && this.refs.push({ ancestor: e3.ancestor - s2, root: e3.root }), o = o || r(3328), o.isTemplate(e3) && this.register(e3.refs(), s2);
          }
          get length() {
            return this.refs.length;
          }
          clone() {
            const e3 = new t2.Manager();
            return e3.refs = n(this.refs), e3;
          }
          reset() {
            this.refs = [];
          }
          roots() {
            return this.refs.filter((e3) => !e3.ancestor).map((e3) => e3.root);
          }
        };
      }, 3378: (e2, t2, r) => {
        "use strict";
        const s = r(5107), n = {};
        n.wrap = s.string().min(1).max(2).allow(false), t2.preferences = s.object({ allowUnknown: s.boolean(), abortEarly: s.boolean(), artifacts: s.boolean(), cache: s.boolean(), context: s.object(), convert: s.boolean(), dateFormat: s.valid("date", "iso", "string", "time", "utc"), debug: s.boolean(), errors: { escapeHtml: s.boolean(), label: s.valid("path", "key", false), language: [s.string(), s.object().ref()], render: s.boolean(), stack: s.boolean(), wrap: { label: n.wrap, array: n.wrap, string: n.wrap } }, externals: s.boolean(), messages: s.object(), noDefaults: s.boolean(), nonEnumerables: s.boolean(), presence: s.valid("required", "optional", "forbidden"), skipFunctions: s.boolean(), stripUnknown: s.object({ arrays: s.boolean(), objects: s.boolean() }).or("arrays", "objects").allow(true, false), warnings: s.boolean() }).strict(), n.nameRx = /^[a-zA-Z0-9]\w*$/, n.rule = s.object({ alias: s.array().items(s.string().pattern(n.nameRx)).single(), args: s.array().items(s.string(), s.object({ name: s.string().pattern(n.nameRx).required(), ref: s.boolean(), assert: s.alternatives([s.function(), s.object().schema()]).conditional("ref", { is: true, then: s.required() }), normalize: s.function(), message: s.string().when("assert", { is: s.function(), then: s.required() }) })), convert: s.boolean(), manifest: s.boolean(), method: s.function().allow(false), multi: s.boolean(), validate: s.function() }), t2.extension = s.object({ type: s.alternatives([s.string(), s.object().regex()]).required(), args: s.function(), cast: s.object().pattern(n.nameRx, s.object({ from: s.function().maxArity(1).required(), to: s.function().minArity(1).maxArity(2).required() })), base: s.object().schema().when("type", { is: s.object().regex(), then: s.forbidden() }), coerce: [s.function().maxArity(3), s.object({ method: s.function().maxArity(3).required(), from: s.array().items(s.string()).single() })], flags: s.object().pattern(n.nameRx, s.object({ setter: s.string(), default: s.any() })), manifest: { build: s.function().arity(2) }, messages: [s.object(), s.string()], modifiers: s.object().pattern(n.nameRx, s.function().minArity(1).maxArity(2)), overrides: s.object().pattern(n.nameRx, s.function()), prepare: s.function().maxArity(3), rebuild: s.function().arity(1), rules: s.object().pattern(n.nameRx, n.rule), terms: s.object().pattern(n.nameRx, s.object({ init: s.array().allow(null).required(), manifest: s.object().pattern(/.+/, [s.valid("schema", "single"), s.object({ mapped: s.object({ from: s.string().required(), to: s.string().required() }).required() })]) })), validate: s.function().maxArity(3) }).strict(), t2.extensions = s.array().items(s.object(), s.function().arity(1)).strict(), n.desc = { buffer: s.object({ buffer: s.string() }), func: s.object({ function: s.function().required(), options: { literal: true } }), override: s.object({ override: true }), ref: s.object({ ref: s.object({ type: s.valid("value", "global", "local"), path: s.array().required(), separator: s.string().length(1).allow(false), ancestor: s.number().min(0).integer().allow("root"), map: s.array().items(s.array().length(2)).min(1), adjust: s.function(), iterables: s.boolean(), in: s.boolean(), render: s.boolean() }).required() }), regex: s.object({ regex: s.string().min(3) }), special: s.object({ special: s.valid("deep").required() }), template: s.object({ template: s.string().required(), options: s.object() }), value: s.object({ value: s.alternatives([s.object(), s.array()]).required() }) }, n.desc.entity = s.alternatives([s.array().items(s.link("...")), s.boolean(), s.function(), s.number(), s.string(), n.desc.buffer, n.desc.func, n.desc.ref, n.desc.regex, n.desc.special, n.desc.template, n.desc.value, s.link("/")]), n.desc.values = s.array().items(null, s.boolean(), s.function(), s.number().allow(1 / 0, -1 / 0), s.string().allow(""), s.symbol(), n.desc.buffer, n.desc.func, n.desc.override, n.desc.ref, n.desc.regex, n.desc.template, n.desc.value), n.desc.messages = s.object().pattern(/.+/, [s.string(), n.desc.template, s.object().pattern(/.+/, [s.string(), n.desc.template])]), t2.description = s.object({ type: s.string().required(), flags: s.object({ cast: s.string(), default: s.any(), description: s.string(), empty: s.link("/"), failover: n.desc.entity, id: s.string(), label: s.string(), only: true, presence: ["optional", "required", "forbidden"], result: ["raw", "strip"], strip: s.boolean(), unit: s.string() }).unknown(), preferences: { allowUnknown: s.boolean(), abortEarly: s.boolean(), artifacts: s.boolean(), cache: s.boolean(), convert: s.boolean(), dateFormat: ["date", "iso", "string", "time", "utc"], errors: { escapeHtml: s.boolean(), label: ["path", "key"], language: [s.string(), n.desc.ref], wrap: { label: n.wrap, array: n.wrap } }, externals: s.boolean(), messages: n.desc.messages, noDefaults: s.boolean(), nonEnumerables: s.boolean(), presence: ["required", "optional", "forbidden"], skipFunctions: s.boolean(), stripUnknown: s.object({ arrays: s.boolean(), objects: s.boolean() }).or("arrays", "objects").allow(true, false), warnings: s.boolean() }, allow: n.desc.values, invalid: n.desc.values, rules: s.array().min(1).items({ name: s.string().required(), args: s.object().min(1), keep: s.boolean(), message: [s.string(), n.desc.messages], warn: s.boolean() }), keys: s.object().pattern(/.*/, s.link("/")), link: n.desc.ref }).pattern(/^[a-z]\w*$/, s.any());
      }, 493: (e2, t2, r) => {
        "use strict";
        const s = r(8571), n = r(9621), a = r(8160), i = { value: Symbol("value") };
        e2.exports = i.State = class {
          constructor(e3, t3, r2) {
            this.path = e3, this.ancestors = t3, this.mainstay = r2.mainstay, this.schemas = r2.schemas, this.debug = null;
          }
          localize(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            const s2 = new i.State(e3, t3, this);
            return r2 && s2.schemas && (s2.schemas = [i.schemas(r2), ...s2.schemas]), s2;
          }
          nest(e3, t3) {
            const r2 = new i.State(this.path, this.ancestors, this);
            return r2.schemas = r2.schemas && [i.schemas(e3), ...r2.schemas], r2.debug = t3, r2;
          }
          shadow(e3, t3) {
            this.mainstay.shadow = this.mainstay.shadow || new i.Shadow(), this.mainstay.shadow.set(this.path, e3, t3);
          }
          snapshot() {
            this.mainstay.shadow && (this._snapshot = s(this.mainstay.shadow.node(this.path))), this.mainstay.snapshot();
          }
          restore() {
            this.mainstay.shadow && (this.mainstay.shadow.override(this.path, this._snapshot), this._snapshot = void 0), this.mainstay.restore();
          }
        }, i.schemas = function(e3) {
          return a.isSchema(e3) ? { schema: e3 } : e3;
        }, i.Shadow = class {
          constructor() {
            this._values = null;
          }
          set(e3, t3, r2) {
            if (!e3.length)
              return;
            if ("strip" === r2 && "number" == typeof e3[e3.length - 1])
              return;
            this._values = this._values || /* @__PURE__ */ new Map();
            let s2 = this._values;
            for (let t4 = 0; t4 < e3.length; ++t4) {
              const r3 = e3[t4];
              let n2 = s2.get(r3);
              n2 || (n2 = /* @__PURE__ */ new Map(), s2.set(r3, n2)), s2 = n2;
            }
            s2[i.value] = t3;
          }
          get(e3) {
            const t3 = this.node(e3);
            if (t3)
              return t3[i.value];
          }
          node(e3) {
            if (this._values)
              return n(this._values, e3, { iterables: true });
          }
          override(e3, t3) {
            if (!this._values)
              return;
            const r2 = e3.slice(0, -1), s2 = e3[e3.length - 1], a2 = n(this._values, r2, { iterables: true });
            t3 ? a2.set(s2, t3) : a2 && a2.delete(s2);
          }
        };
      }, 3328: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(5277), i = r(1447), o = r(8160), l = r(6354), c = r(6133), u = { symbol: Symbol("template"), opens: new Array(1e3).join("\0"), closes: new Array(1e3).join(""), dateFormat: { date: Date.prototype.toDateString, iso: Date.prototype.toISOString, string: Date.prototype.toString, time: Date.prototype.toTimeString, utc: Date.prototype.toUTCString } };
        e2.exports = u.Template = class {
          constructor(e3, t3) {
            s("string" == typeof e3, "Template source must be a string"), s(!e3.includes("\0") && !e3.includes(""), "Template source cannot contain reserved control characters"), this.source = e3, this.rendered = e3, this._template = null, this._settings = n(t3), this._parse();
          }
          _parse() {
            if (!this.source.includes("{"))
              return;
            const e3 = u.encode(this.source), t3 = u.split(e3);
            let r2 = false;
            const s2 = [], n2 = t3.shift();
            n2 && s2.push(n2);
            for (const e4 of t3) {
              const t4 = "{" !== e4[0], n3 = t4 ? "}" : "}}", a2 = e4.indexOf(n3);
              if (-1 === a2 || "{" === e4[1]) {
                s2.push(`{${u.decode(e4)}`);
                continue;
              }
              let i2 = e4.slice(t4 ? 0 : 1, a2);
              const o2 = ":" === i2[0];
              o2 && (i2 = i2.slice(1));
              const l2 = this._ref(u.decode(i2), { raw: t4, wrapped: o2 });
              s2.push(l2), "string" != typeof l2 && (r2 = true);
              const c2 = e4.slice(a2 + n3.length);
              c2 && s2.push(u.decode(c2));
            }
            r2 ? this._template = s2 : this.rendered = s2.join("");
          }
          static date(e3, t3) {
            return u.dateFormat[t3.dateFormat].call(e3);
          }
          describe() {
            let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!this._settings && e3.compact)
              return this.source;
            const t3 = { template: this.source };
            return this._settings && (t3.options = this._settings), t3;
          }
          static build(e3) {
            return new u.Template(e3.template, e3.options);
          }
          isDynamic() {
            return !!this._template;
          }
          static isTemplate(e3) {
            return !!e3 && !!e3[o.symbols.template];
          }
          refs() {
            if (!this._template)
              return;
            const e3 = [];
            for (const t3 of this._template)
              "string" != typeof t3 && e3.push(...t3.refs);
            return e3;
          }
          resolve(e3, t3, r2, s2) {
            return this._template && 1 === this._template.length ? this._part(this._template[0], e3, t3, r2, s2, {}) : this.render(e3, t3, r2, s2);
          }
          _part(e3) {
            for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), s2 = 1; s2 < t3; s2++)
              r2[s2 - 1] = arguments[s2];
            return e3.ref ? e3.ref.resolve(...r2) : e3.formula.evaluate(r2);
          }
          render(e3, t3, r2, s2) {
            let n2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            if (!this.isDynamic())
              return this.rendered;
            const i2 = [];
            for (const o2 of this._template)
              if ("string" == typeof o2)
                i2.push(o2);
              else {
                const l2 = this._part(o2, e3, t3, r2, s2, n2), c2 = u.stringify(l2, e3, t3, r2, s2, n2);
                if (void 0 !== c2) {
                  const e4 = o2.raw || false === (n2.errors && n2.errors.escapeHtml) ? c2 : a(c2);
                  i2.push(u.wrap(e4, o2.wrapped && r2.errors.wrap.label));
                }
              }
            return i2.join("");
          }
          _ref(e3, t3) {
            let { raw: r2, wrapped: s2 } = t3;
            const n2 = [], a2 = (e4) => {
              const t4 = c.create(e4, this._settings);
              return n2.push(t4), (e5) => t4.resolve(...e5);
            };
            try {
              var o2 = new i.Parser(e3, { reference: a2, functions: u.functions, constants: u.constants });
            } catch (t4) {
              throw t4.message = `Invalid template variable "${e3}" fails due to: ${t4.message}`, t4;
            }
            if (o2.single) {
              if ("reference" === o2.single.type) {
                const e4 = n2[0];
                return { ref: e4, raw: r2, refs: n2, wrapped: s2 || "local" === e4.type && "label" === e4.key };
              }
              return u.stringify(o2.single.value);
            }
            return { formula: o2, raw: r2, refs: n2 };
          }
          toString() {
            return this.source;
          }
        }, u.Template.prototype[o.symbols.template] = true, u.Template.prototype.isImmutable = true, u.encode = function(e3) {
          return e3.replace(/\\(\{+)/g, (e4, t3) => u.opens.slice(0, t3.length)).replace(/\\(\}+)/g, (e4, t3) => u.closes.slice(0, t3.length));
        }, u.decode = function(e3) {
          return e3.replace(/\u0000/g, "{").replace(/\u0001/g, "}");
        }, u.split = function(e3) {
          const t3 = [];
          let r2 = "";
          for (let s2 = 0; s2 < e3.length; ++s2) {
            const n2 = e3[s2];
            if ("{" === n2) {
              let n3 = "";
              for (; s2 + 1 < e3.length && "{" === e3[s2 + 1]; )
                n3 += "{", ++s2;
              t3.push(r2), r2 = n3;
            } else
              r2 += n2;
          }
          return t3.push(r2), t3;
        }, u.wrap = function(e3, t3) {
          return t3 ? 1 === t3.length ? `${t3}${e3}${t3}` : `${t3[0]}${e3}${t3[1]}` : e3;
        }, u.stringify = function(e3, t3, r2, s2, n2) {
          let a2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
          const i2 = typeof e3, o2 = s2 && s2.errors && s2.errors.wrap || {};
          let l2 = false;
          if (c.isRef(e3) && e3.render && (l2 = e3.in, e3 = e3.resolve(t3, r2, s2, n2, { in: e3.in, ...a2 })), null === e3)
            return "null";
          if ("string" === i2)
            return u.wrap(e3, a2.arrayItems && o2.string);
          if ("number" === i2 || "function" === i2 || "symbol" === i2)
            return e3.toString();
          if ("object" !== i2)
            return JSON.stringify(e3);
          if (e3 instanceof Date)
            return u.Template.date(e3, s2);
          if (e3 instanceof Map) {
            const t4 = [];
            for (const [r3, s3] of e3.entries())
              t4.push(`${r3.toString()} -> ${s3.toString()}`);
            e3 = t4;
          }
          if (!Array.isArray(e3))
            return e3.toString();
          const f = [];
          for (const i3 of e3)
            f.push(u.stringify(i3, t3, r2, s2, n2, { arrayItems: true, ...a2 }));
          return u.wrap(f.join(", "), !l2 && o2.array);
        }, u.constants = { true: true, false: false, null: null, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5 }, u.functions = { if: (e3, t3, r2) => e3 ? t3 : r2, length: (e3) => "string" == typeof e3 ? e3.length : e3 && "object" == typeof e3 ? Array.isArray(e3) ? e3.length : Object.keys(e3).length : null, msg(e3) {
          const [t3, r2, s2, n2, a2] = this, i2 = a2.messages;
          if (!i2)
            return "";
          const o2 = l.template(t3, i2[0], e3, r2, s2) || l.template(t3, i2[1], e3, r2, s2);
          return o2 ? o2.render(t3, r2, s2, n2, a2) : "";
        }, number: (e3) => "number" == typeof e3 ? e3 : "string" == typeof e3 ? parseFloat(e3) : "boolean" == typeof e3 ? e3 ? 1 : 0 : e3 instanceof Date ? e3.getTime() : null };
      }, 4946: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(1687), a = r(8068), i = r(8160), o = r(3292), l = r(6354), c = r(6133), u = {};
        e2.exports = a.extend({ type: "alternatives", flags: { match: { default: "any" } }, terms: { matches: { init: [], register: c.toSibling } }, args(e3) {
          for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), s2 = 1; s2 < t3; s2++)
            r2[s2 - 1] = arguments[s2];
          return 1 === r2.length && Array.isArray(r2[0]) ? e3.try(...r2[0]) : e3.try(...r2);
        }, validate(e3, t3) {
          const { schema: r2, error: s2, state: a2, prefs: i2 } = t3;
          if (r2._flags.match) {
            const t4 = [], o3 = [];
            for (let s3 = 0; s3 < r2.$_terms.matches.length; ++s3) {
              const n2 = r2.$_terms.matches[s3], l2 = a2.nest(n2.schema, `match.${s3}`);
              l2.snapshot();
              const c3 = n2.schema.$_validate(e3, l2, i2);
              c3.errors ? (o3.push(c3.errors), l2.restore()) : t4.push(c3.value);
            }
            if (0 === t4.length)
              return { errors: s2("alternatives.any", { details: o3.map((e4) => l.details(e4, { override: false })) }) };
            if ("one" === r2._flags.match)
              return 1 === t4.length ? { value: t4[0] } : { errors: s2("alternatives.one") };
            if (t4.length !== r2.$_terms.matches.length)
              return { errors: s2("alternatives.all", { details: o3.map((e4) => l.details(e4, { override: false })) }) };
            const c2 = (e4) => e4.$_terms.matches.some((e5) => "object" === e5.schema.type || "alternatives" === e5.schema.type && c2(e5.schema));
            return c2(r2) ? { value: t4.reduce((e4, t5) => n(e4, t5, { mergeArrays: false })) } : { value: t4[t4.length - 1] };
          }
          const o2 = [];
          for (let t4 = 0; t4 < r2.$_terms.matches.length; ++t4) {
            const s3 = r2.$_terms.matches[t4];
            if (s3.schema) {
              const r3 = a2.nest(s3.schema, `match.${t4}`);
              r3.snapshot();
              const n3 = s3.schema.$_validate(e3, r3, i2);
              if (!n3.errors)
                return n3;
              r3.restore(), o2.push({ schema: s3.schema, reports: n3.errors });
              continue;
            }
            const n2 = s3.ref ? s3.ref.resolve(e3, a2, i2) : e3, l2 = s3.is ? [s3] : s3.switch;
            for (let r3 = 0; r3 < l2.length; ++r3) {
              const o3 = l2[r3], { is: c2, then: u2, otherwise: f } = o3, h = `match.${t4}${s3.switch ? "." + r3 : ""}`;
              if (c2.$_match(n2, a2.nest(c2, `${h}.is`), i2)) {
                if (u2)
                  return u2.$_validate(e3, a2.nest(u2, `${h}.then`), i2);
              } else if (f)
                return f.$_validate(e3, a2.nest(f, `${h}.otherwise`), i2);
            }
          }
          return u.errors(o2, t3);
        }, rules: { conditional: { method(e3, t3) {
          s(!this._flags._endedSwitch, "Unreachable condition"), s(!this._flags.match, "Cannot combine match mode", this._flags.match, "with conditional rule"), s(void 0 === t3.break, "Cannot use break option with alternatives conditional");
          const r2 = this.clone(), n2 = o.when(r2, e3, t3), a2 = n2.is ? [n2] : n2.switch;
          for (const e4 of a2)
            if (e4.then && e4.otherwise) {
              r2.$_setFlag("_endedSwitch", true, { clone: false });
              break;
            }
          return r2.$_terms.matches.push(n2), r2.$_mutateRebuild();
        } }, match: { method(e3) {
          if (s(["any", "one", "all"].includes(e3), "Invalid alternatives match mode", e3), "any" !== e3)
            for (const t3 of this.$_terms.matches)
              s(t3.schema, "Cannot combine match mode", e3, "with conditional rules");
          return this.$_setFlag("match", e3);
        } }, try: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          s(t3.length, "Missing alternative schemas"), i.verifyFlat(t3, "try"), s(!this._flags._endedSwitch, "Unreachable condition");
          const n2 = this.clone();
          for (const e4 of t3)
            n2.$_terms.matches.push({ schema: n2.$_compile(e4) });
          return n2.$_mutateRebuild();
        } } }, overrides: { label(e3) {
          return this.$_parent("label", e3).$_modify({ each: (t3, r2) => "is" !== r2.path[0] ? t3.label(e3) : void 0, ref: false });
        } }, rebuild(e3) {
          e3.$_modify({ each: (t3) => {
            i.isSchema(t3) && "array" === t3.type && e3.$_setFlag("_arrayItems", true, { clone: false });
          } });
        }, manifest: { build(e3, t3) {
          if (t3.matches)
            for (const r2 of t3.matches) {
              const { schema: t4, ref: s2, is: n2, not: a2, then: i2, otherwise: o2 } = r2;
              e3 = t4 ? e3.try(t4) : s2 ? e3.conditional(s2, { is: n2, then: i2, not: a2, otherwise: o2, switch: r2.switch }) : e3.conditional(n2, { then: i2, otherwise: o2 });
            }
          return e3;
        } }, messages: { "alternatives.all": "{{#label}} does not match all of the required types", "alternatives.any": "{{#label}} does not match any of the allowed types", "alternatives.match": "{{#label}} does not match any of the allowed types", "alternatives.one": "{{#label}} matches more than one allowed type", "alternatives.types": "{{#label}} must be one of {{#types}}" } }), u.errors = function(e3, t3) {
          let { error: r2, state: s2 } = t3;
          if (!e3.length)
            return { errors: r2("alternatives.any") };
          if (1 === e3.length)
            return { errors: e3[0].reports };
          const n2 = /* @__PURE__ */ new Set(), a2 = [];
          for (const { reports: t4, schema: i2 } of e3) {
            if (t4.length > 1)
              return u.unmatched(e3, r2);
            const o2 = t4[0];
            if (o2 instanceof l.Report == 0)
              return u.unmatched(e3, r2);
            if (o2.state.path.length !== s2.path.length) {
              a2.push({ type: i2.type, report: o2 });
              continue;
            }
            if ("any.only" === o2.code) {
              for (const e4 of o2.local.valids)
                n2.add(e4);
              continue;
            }
            const [c2, f] = o2.code.split(".");
            "base" === f ? n2.add(c2) : a2.push({ type: i2.type, report: o2 });
          }
          return a2.length ? 1 === a2.length ? { errors: a2[0].report } : u.unmatched(e3, r2) : { errors: r2("alternatives.types", { types: [...n2] }) };
        }, u.unmatched = function(e3, t3) {
          const r2 = [];
          for (const t4 of e3)
            r2.push(...t4.reports);
          return { errors: t3("alternatives.match", l.details(r2, { override: false })) };
        };
      }, 8068: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(7629), a = r(8160), i = r(6914);
        e2.exports = n.extend({ type: "any", flags: { only: { default: false } }, terms: { alterations: { init: null }, examples: { init: null }, externals: { init: null }, metas: { init: [] }, notes: { init: [] }, shared: { init: null }, tags: { init: [] }, whens: { init: null } }, rules: { custom: { method(e3, t3) {
          return s("function" == typeof e3, "Method must be a function"), s(void 0 === t3 || t3 && "string" == typeof t3, "Description must be a non-empty string"), this.$_addRule({ name: "custom", args: { method: e3, description: t3 } });
        }, validate(e3, t3, r2) {
          let { method: s2 } = r2;
          try {
            return s2(e3, t3);
          } catch (e4) {
            return t3.error("any.custom", { error: e4 });
          }
        }, args: ["method", "description"], multi: true }, messages: { method(e3) {
          return this.prefs({ messages: e3 });
        } }, shared: { method(e3) {
          s(a.isSchema(e3) && e3._flags.id, "Schema must be a schema with an id");
          const t3 = this.clone();
          return t3.$_terms.shared = t3.$_terms.shared || [], t3.$_terms.shared.push(e3), t3.$_mutateRegister(e3), t3;
        } }, warning: { method(e3, t3) {
          return s(e3 && "string" == typeof e3, "Invalid warning code"), this.$_addRule({ name: "warning", args: { code: e3, local: t3 }, warn: true });
        }, validate(e3, t3, r2) {
          let { code: s2, local: n2 } = r2;
          return t3.error(s2, n2);
        }, args: ["code", "local"], multi: true } }, modifiers: { keep(e3) {
          let t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          e3.keep = t3;
        }, message(e3, t3) {
          e3.message = i.compile(t3);
        }, warn(e3) {
          let t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          e3.warn = t3;
        } }, manifest: { build(e3, t3) {
          for (const r2 in t3) {
            const s2 = t3[r2];
            if (["examples", "externals", "metas", "notes", "tags"].includes(r2))
              for (const t4 of s2)
                e3 = e3[r2.slice(0, -1)](t4);
            else if ("alterations" !== r2)
              if ("whens" !== r2) {
                if ("shared" === r2)
                  for (const t4 of s2)
                    e3 = e3.shared(t4);
              } else
                for (const t4 of s2) {
                  const { ref: r3, is: s3, not: n2, then: a2, otherwise: i2, concat: o } = t4;
                  e3 = o ? e3.concat(o) : r3 ? e3.when(r3, { is: s3, not: n2, then: a2, otherwise: i2, switch: t4.switch, break: t4.break }) : e3.when(s3, { then: a2, otherwise: i2, break: t4.break });
                }
            else {
              const t4 = {};
              for (const { target: e4, adjuster: r3 } of s2)
                t4[e4] = r3;
              e3 = e3.alter(t4);
            }
          }
          return e3;
        } }, messages: { "any.custom": "{{#label}} failed custom validation because {{#error.message}}", "any.default": "{{#label}} threw an error when running default method", "any.failover": "{{#label}} threw an error when running failover method", "any.invalid": "{{#label}} contains an invalid value", "any.only": '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}', "any.ref": "{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}", "any.required": "{{#label}} is required", "any.unknown": "{{#label}} is not allowed" } });
      }, 546: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(9474), a = r(9621), i = r(8068), o = r(8160), l = r(3292), c = {};
        e2.exports = i.extend({ type: "array", flags: { single: { default: false }, sparse: { default: false } }, terms: { items: { init: [], manifest: "schema" }, ordered: { init: [], manifest: "schema" }, _exclusions: { init: [] }, _inclusions: { init: [] }, _requireds: { init: [] } }, coerce: { from: "object", method(e3, t3) {
          let { schema: r2, state: s2, prefs: n2 } = t3;
          if (!Array.isArray(e3))
            return;
          const a2 = r2.$_getRule("sort");
          return a2 ? c.sort(r2, e3, a2.args.options, s2, n2) : void 0;
        } }, validate(e3, t3) {
          let { schema: r2, error: s2 } = t3;
          if (!Array.isArray(e3)) {
            if (r2._flags.single) {
              const t4 = [e3];
              return t4[o.symbols.arraySingle] = true, { value: t4 };
            }
            return { errors: s2("array.base") };
          }
          if (r2.$_getRule("items") || r2.$_terms.externals)
            return { value: e3.slice() };
        }, rules: { has: { method(e3) {
          e3 = this.$_compile(e3, { appendPath: true });
          const t3 = this.$_addRule({ name: "has", args: { schema: e3 } });
          return t3.$_mutateRegister(e3), t3;
        }, validate(e3, t3, r2) {
          let { state: s2, prefs: n2, error: a2 } = t3, { schema: i2 } = r2;
          const o2 = [e3, ...s2.ancestors];
          for (let t4 = 0; t4 < e3.length; ++t4) {
            const r3 = s2.localize([...s2.path, t4], o2, i2);
            if (i2.$_match(e3[t4], r3, n2))
              return e3;
          }
          const l2 = i2._flags.label;
          return l2 ? a2("array.hasKnown", { patternLabel: l2 }) : a2("array.hasUnknown", null);
        }, multi: true }, items: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          o.verifyFlat(t3, "items");
          const s2 = this.$_addRule("items");
          for (let e4 = 0; e4 < t3.length; ++e4) {
            const r3 = o.tryWithPath(() => this.$_compile(t3[e4]), e4, { append: true });
            s2.$_terms.items.push(r3);
          }
          return s2.$_mutateRebuild();
        }, validate(e3, t3) {
          let { schema: r2, error: s2, state: n2, prefs: a2, errorsArray: i2 } = t3;
          const l2 = r2.$_terms._requireds.slice(), u = r2.$_terms.ordered.slice(), f = [...r2.$_terms._inclusions, ...l2], h = !e3[o.symbols.arraySingle];
          delete e3[o.symbols.arraySingle];
          const m = i2();
          let d = e3.length;
          for (let t4 = 0; t4 < d; ++t4) {
            const i3 = e3[t4];
            let o2 = false, p = false;
            const g = h ? t4 : new Number(t4), y = [...n2.path, g];
            if (!r2._flags.sparse && void 0 === i3) {
              if (m.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), a2.abortEarly)
                return m;
              u.shift();
              continue;
            }
            const b = [e3, ...n2.ancestors];
            for (const e4 of r2.$_terms._exclusions)
              if (e4.$_match(i3, n2.localize(y, b, e4), a2, { presence: "ignore" })) {
                if (m.push(s2("array.excludes", { pos: t4, value: i3 }, n2.localize(y))), a2.abortEarly)
                  return m;
                o2 = true, u.shift();
                break;
              }
            if (o2)
              continue;
            if (r2.$_terms.ordered.length) {
              if (u.length) {
                const o3 = u.shift(), l3 = o3.$_validate(i3, n2.localize(y, b, o3), a2);
                if (l3.errors) {
                  if (m.push(...l3.errors), a2.abortEarly)
                    return m;
                } else if ("strip" === o3._flags.result)
                  c.fastSplice(e3, t4), --t4, --d;
                else {
                  if (!r2._flags.sparse && void 0 === l3.value) {
                    if (m.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), a2.abortEarly)
                      return m;
                    continue;
                  }
                  e3[t4] = l3.value;
                }
                continue;
              }
              if (!r2.$_terms.items.length) {
                if (m.push(s2("array.orderedLength", { pos: t4, limit: r2.$_terms.ordered.length })), a2.abortEarly)
                  return m;
                break;
              }
            }
            const v = [];
            let _ = l2.length;
            for (let o3 = 0; o3 < _; ++o3) {
              const u2 = n2.localize(y, b, l2[o3]);
              u2.snapshot();
              const f2 = l2[o3].$_validate(i3, u2, a2);
              if (v[o3] = f2, !f2.errors) {
                if (e3[t4] = f2.value, p = true, c.fastSplice(l2, o3), --o3, --_, !r2._flags.sparse && void 0 === f2.value && (m.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), a2.abortEarly))
                  return m;
                break;
              }
              u2.restore();
            }
            if (p)
              continue;
            const w = a2.stripUnknown && !!a2.stripUnknown.arrays || false;
            _ = f.length;
            for (const u2 of f) {
              let f2;
              const h2 = l2.indexOf(u2);
              if (-1 !== h2)
                f2 = v[h2];
              else {
                const l3 = n2.localize(y, b, u2);
                if (l3.snapshot(), f2 = u2.$_validate(i3, l3, a2), !f2.errors) {
                  "strip" === u2._flags.result ? (c.fastSplice(e3, t4), --t4, --d) : r2._flags.sparse || void 0 !== f2.value ? e3[t4] = f2.value : (m.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), o2 = true), p = true;
                  break;
                }
                l3.restore();
              }
              if (1 === _) {
                if (w) {
                  c.fastSplice(e3, t4), --t4, --d, p = true;
                  break;
                }
                if (m.push(...f2.errors), a2.abortEarly)
                  return m;
                o2 = true;
                break;
              }
            }
            if (!o2 && (r2.$_terms._inclusions.length || r2.$_terms._requireds.length) && !p) {
              if (w) {
                c.fastSplice(e3, t4), --t4, --d;
                continue;
              }
              if (m.push(s2("array.includes", { pos: t4, value: i3 }, n2.localize(y))), a2.abortEarly)
                return m;
            }
          }
          return l2.length && c.fillMissedErrors(r2, m, l2, e3, n2, a2), u.length && (c.fillOrderedErrors(r2, m, u, e3, n2, a2), m.length || c.fillDefault(u, e3, n2, a2)), m.length ? m : e3;
        }, priority: true, manifest: false }, length: { method(e3) {
          return this.$_addRule({ name: "length", args: { limit: e3 }, operator: "=" });
        }, validate(e3, t3, r2, s2) {
          let { limit: n2 } = r2, { name: a2, operator: i2, args: l2 } = s2;
          return o.compare(e3.length, n2, i2) ? e3 : t3.error("array." + a2, { limit: l2.limit, value: e3 });
        }, args: [{ name: "limit", ref: true, assert: o.limit, message: "must be a positive integer" }] }, max: { method(e3) {
          return this.$_addRule({ name: "max", method: "length", args: { limit: e3 }, operator: "<=" });
        } }, min: { method(e3) {
          return this.$_addRule({ name: "min", method: "length", args: { limit: e3 }, operator: ">=" });
        } }, ordered: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          o.verifyFlat(t3, "ordered");
          const s2 = this.$_addRule("items");
          for (let e4 = 0; e4 < t3.length; ++e4) {
            const r3 = o.tryWithPath(() => this.$_compile(t3[e4]), e4, { append: true });
            c.validateSingle(r3, s2), s2.$_mutateRegister(r3), s2.$_terms.ordered.push(r3);
          }
          return s2.$_mutateRebuild();
        } }, single: { method(e3) {
          const t3 = void 0 === e3 || !!e3;
          return s(!t3 || !this._flags._arrayItems, "Cannot specify single rule when array has array items"), this.$_setFlag("single", t3);
        } }, sort: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          o.assertOptions(e3, ["by", "order"]);
          const t3 = { order: e3.order || "ascending" };
          return e3.by && (t3.by = l.ref(e3.by, { ancestor: 0 }), s(!t3.by.ancestor, "Cannot sort by ancestor")), this.$_addRule({ name: "sort", args: { options: t3 } });
        }, validate(e3, t3, r2) {
          let { error: s2, state: n2, prefs: a2, schema: i2 } = t3, { options: o2 } = r2;
          const { value: l2, errors: u } = c.sort(i2, e3, o2, n2, a2);
          if (u)
            return u;
          for (let t4 = 0; t4 < e3.length; ++t4)
            if (e3[t4] !== l2[t4])
              return s2("array.sort", { order: o2.order, by: o2.by ? o2.by.key : "value" });
          return e3;
        }, convert: true }, sparse: { method(e3) {
          const t3 = void 0 === e3 || !!e3;
          return this._flags.sparse === t3 ? this : (t3 ? this.clone() : this.$_addRule("items")).$_setFlag("sparse", t3, { clone: false });
        } }, unique: { method(e3) {
          let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          s(!e3 || "function" == typeof e3 || "string" == typeof e3, "comparator must be a function or a string"), o.assertOptions(t3, ["ignoreUndefined", "separator"]);
          const r2 = { name: "unique", args: { options: t3, comparator: e3 } };
          if (e3)
            if ("string" == typeof e3) {
              const s2 = o.default(t3.separator, ".");
              r2.path = s2 ? e3.split(s2) : [e3];
            } else
              r2.comparator = e3;
          return this.$_addRule(r2);
        }, validate(e3, t3, r2, i2) {
          let { state: o2, error: l2, schema: c2 } = t3, { comparator: u, options: f } = r2, { comparator: h, path: m } = i2;
          const d = { string: /* @__PURE__ */ Object.create(null), number: /* @__PURE__ */ Object.create(null), undefined: /* @__PURE__ */ Object.create(null), boolean: /* @__PURE__ */ Object.create(null), object: /* @__PURE__ */ new Map(), function: /* @__PURE__ */ new Map(), custom: /* @__PURE__ */ new Map() }, p = h || n, g = f.ignoreUndefined;
          for (let t4 = 0; t4 < e3.length; ++t4) {
            const r3 = m ? a(e3[t4], m) : e3[t4], n2 = h ? d.custom : d[typeof r3];
            if (s(n2, "Failed to find unique map container for type", typeof r3), n2 instanceof Map) {
              const s2 = n2.entries();
              let a2;
              for (; !(a2 = s2.next()).done; )
                if (p(a2.value[0], r3)) {
                  const r4 = o2.localize([...o2.path, t4], [e3, ...o2.ancestors]), s3 = { pos: t4, value: e3[t4], dupePos: a2.value[1], dupeValue: e3[a2.value[1]] };
                  return m && (s3.path = u), l2("array.unique", s3, r4);
                }
              n2.set(r3, t4);
            } else {
              if ((!g || void 0 !== r3) && void 0 !== n2[r3]) {
                const s2 = { pos: t4, value: e3[t4], dupePos: n2[r3], dupeValue: e3[n2[r3]] };
                return m && (s2.path = u), l2("array.unique", s2, o2.localize([...o2.path, t4], [e3, ...o2.ancestors]));
              }
              n2[r3] = t4;
            }
          }
          return e3;
        }, args: ["comparator", "options"], multi: true } }, cast: { set: { from: Array.isArray, to: (e3, t3) => new Set(e3) } }, rebuild(e3) {
          e3.$_terms._inclusions = [], e3.$_terms._exclusions = [], e3.$_terms._requireds = [];
          for (const t3 of e3.$_terms.items)
            c.validateSingle(t3, e3), "required" === t3._flags.presence ? e3.$_terms._requireds.push(t3) : "forbidden" === t3._flags.presence ? e3.$_terms._exclusions.push(t3) : e3.$_terms._inclusions.push(t3);
          for (const t3 of e3.$_terms.ordered)
            c.validateSingle(t3, e3);
        }, manifest: { build: (e3, t3) => (t3.items && (e3 = e3.items(...t3.items)), t3.ordered && (e3 = e3.ordered(...t3.ordered)), e3) }, messages: { "array.base": "{{#label}} must be an array", "array.excludes": "{{#label}} contains an excluded value", "array.hasKnown": "{{#label}} does not contain at least one required match for type {:#patternLabel}", "array.hasUnknown": "{{#label}} does not contain at least one required match", "array.includes": "{{#label}} does not match any of the allowed types", "array.includesRequiredBoth": "{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)", "array.includesRequiredKnowns": "{{#label}} does not contain {{#knownMisses}}", "array.includesRequiredUnknowns": "{{#label}} does not contain {{#unknownMisses}} required value(s)", "array.length": "{{#label}} must contain {{#limit}} items", "array.max": "{{#label}} must contain less than or equal to {{#limit}} items", "array.min": "{{#label}} must contain at least {{#limit}} items", "array.orderedLength": "{{#label}} must contain at most {{#limit}} items", "array.sort": "{{#label}} must be sorted in {#order} order by {{#by}}", "array.sort.mismatching": "{{#label}} cannot be sorted due to mismatching types", "array.sort.unsupported": "{{#label}} cannot be sorted due to unsupported type {#type}", "array.sparse": "{{#label}} must not be a sparse array item", "array.unique": "{{#label}} contains a duplicate value" } }), c.fillMissedErrors = function(e3, t3, r2, s2, n2, a2) {
          const i2 = [];
          let o2 = 0;
          for (const e4 of r2) {
            const t4 = e4._flags.label;
            t4 ? i2.push(t4) : ++o2;
          }
          i2.length ? o2 ? t3.push(e3.$_createError("array.includesRequiredBoth", s2, { knownMisses: i2, unknownMisses: o2 }, n2, a2)) : t3.push(e3.$_createError("array.includesRequiredKnowns", s2, { knownMisses: i2 }, n2, a2)) : t3.push(e3.$_createError("array.includesRequiredUnknowns", s2, { unknownMisses: o2 }, n2, a2));
        }, c.fillOrderedErrors = function(e3, t3, r2, s2, n2, a2) {
          const i2 = [];
          for (const e4 of r2)
            "required" === e4._flags.presence && i2.push(e4);
          i2.length && c.fillMissedErrors(e3, t3, i2, s2, n2, a2);
        }, c.fillDefault = function(e3, t3, r2, s2) {
          const n2 = [];
          let a2 = true;
          for (let i2 = e3.length - 1; i2 >= 0; --i2) {
            const o2 = e3[i2], l2 = [t3, ...r2.ancestors], c2 = o2.$_validate(void 0, r2.localize(r2.path, l2, o2), s2).value;
            if (a2) {
              if (void 0 === c2)
                continue;
              a2 = false;
            }
            n2.unshift(c2);
          }
          n2.length && t3.push(...n2);
        }, c.fastSplice = function(e3, t3) {
          let r2 = t3;
          for (; r2 < e3.length; )
            e3[r2++] = e3[r2];
          --e3.length;
        }, c.validateSingle = function(e3, t3) {
          ("array" === e3.type || e3._flags._arrayItems) && (s(!t3._flags.single, "Cannot specify array item with single rule enabled"), t3.$_setFlag("_arrayItems", true, { clone: false }));
        }, c.sort = function(e3, t3, r2, s2, n2) {
          const a2 = "ascending" === r2.order ? 1 : -1, i2 = -1 * a2, o2 = a2, l2 = (l3, u) => {
            let f = c.compare(l3, u, i2, o2);
            if (null !== f)
              return f;
            if (r2.by && (l3 = r2.by.resolve(l3, s2, n2), u = r2.by.resolve(u, s2, n2)), f = c.compare(l3, u, i2, o2), null !== f)
              return f;
            const h = typeof l3;
            if (h !== typeof u)
              throw e3.$_createError("array.sort.mismatching", t3, null, s2, n2);
            if ("number" !== h && "string" !== h)
              throw e3.$_createError("array.sort.unsupported", t3, { type: h }, s2, n2);
            return "number" === h ? (l3 - u) * a2 : l3 < u ? i2 : o2;
          };
          try {
            return { value: t3.slice().sort(l2) };
          } catch (e4) {
            return { errors: e4 };
          }
        }, c.compare = function(e3, t3, r2, s2) {
          return e3 === t3 ? 0 : void 0 === e3 ? 1 : void 0 === t3 ? -1 : null === e3 ? s2 : null === t3 ? r2 : null;
        };
      }, 4937: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8068), a = r(8160), i = r(2036), o = { isBool: function(e3) {
          return "boolean" == typeof e3;
        } };
        e2.exports = n.extend({ type: "boolean", flags: { sensitive: { default: false } }, terms: { falsy: { init: null, manifest: "values" }, truthy: { init: null, manifest: "values" } }, coerce(e3, t3) {
          let { schema: r2 } = t3;
          if ("boolean" != typeof e3) {
            if ("string" == typeof e3) {
              const t4 = r2._flags.sensitive ? e3 : e3.toLowerCase();
              e3 = "true" === t4 || "false" !== t4 && e3;
            }
            return "boolean" != typeof e3 && (e3 = r2.$_terms.truthy && r2.$_terms.truthy.has(e3, null, null, !r2._flags.sensitive) || (!r2.$_terms.falsy || !r2.$_terms.falsy.has(e3, null, null, !r2._flags.sensitive)) && e3), { value: e3 };
          }
        }, validate(e3, t3) {
          let { error: r2 } = t3;
          if ("boolean" != typeof e3)
            return { value: e3, errors: r2("boolean.base") };
        }, rules: { truthy: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          a.verifyFlat(t3, "truthy");
          const n2 = this.clone();
          n2.$_terms.truthy = n2.$_terms.truthy || new i();
          for (let e4 = 0; e4 < t3.length; ++e4) {
            const r3 = t3[e4];
            s(void 0 !== r3, "Cannot call truthy with undefined"), n2.$_terms.truthy.add(r3);
          }
          return n2;
        } }, falsy: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          a.verifyFlat(t3, "falsy");
          const n2 = this.clone();
          n2.$_terms.falsy = n2.$_terms.falsy || new i();
          for (let e4 = 0; e4 < t3.length; ++e4) {
            const r3 = t3[e4];
            s(void 0 !== r3, "Cannot call falsy with undefined"), n2.$_terms.falsy.add(r3);
          }
          return n2;
        } }, sensitive: { method() {
          let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return this.$_setFlag("sensitive", e3);
        } } }, cast: { number: { from: o.isBool, to: (e3, t3) => e3 ? 1 : 0 }, string: { from: o.isBool, to: (e3, t3) => e3 ? "true" : "false" } }, manifest: { build: (e3, t3) => (t3.truthy && (e3 = e3.truthy(...t3.truthy)), t3.falsy && (e3 = e3.falsy(...t3.falsy)), e3) }, messages: { "boolean.base": "{{#label}} must be a boolean" } });
      }, 7500: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8068), a = r(8160), i = r(3328), o = { isDate: function(e3) {
          return e3 instanceof Date;
        } };
        e2.exports = n.extend({ type: "date", coerce: { from: ["number", "string"], method(e3, t3) {
          let { schema: r2 } = t3;
          return { value: o.parse(e3, r2._flags.format) || e3 };
        } }, validate(e3, t3) {
          let { schema: r2, error: s2, prefs: n2 } = t3;
          if (e3 instanceof Date && !isNaN(e3.getTime()))
            return;
          const a2 = r2._flags.format;
          return n2.convert && a2 && "string" == typeof e3 ? { value: e3, errors: s2("date.format", { format: a2 }) } : { value: e3, errors: s2("date.base") };
        }, rules: { compare: { method: false, validate(e3, t3, r2, s2) {
          let { date: n2 } = r2, { name: i2, operator: o2, args: l } = s2;
          const c = "now" === n2 ? Date.now() : n2.getTime();
          return a.compare(e3.getTime(), c, o2) ? e3 : t3.error("date." + i2, { limit: l.date, value: e3 });
        }, args: [{ name: "date", ref: true, normalize: (e3) => "now" === e3 ? e3 : o.parse(e3), assert: (e3) => null !== e3, message: "must have a valid date format" }] }, format: { method(e3) {
          return s(["iso", "javascript", "unix"].includes(e3), "Unknown date format", e3), this.$_setFlag("format", e3);
        } }, greater: { method(e3) {
          return this.$_addRule({ name: "greater", method: "compare", args: { date: e3 }, operator: ">" });
        } }, iso: { method() {
          return this.format("iso");
        } }, less: { method(e3) {
          return this.$_addRule({ name: "less", method: "compare", args: { date: e3 }, operator: "<" });
        } }, max: { method(e3) {
          return this.$_addRule({ name: "max", method: "compare", args: { date: e3 }, operator: "<=" });
        } }, min: { method(e3) {
          return this.$_addRule({ name: "min", method: "compare", args: { date: e3 }, operator: ">=" });
        } }, timestamp: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "javascript";
          return s(["javascript", "unix"].includes(e3), '"type" must be one of "javascript, unix"'), this.format(e3);
        } } }, cast: { number: { from: o.isDate, to: (e3, t3) => e3.getTime() }, string: { from: o.isDate, to(e3, t3) {
          let { prefs: r2 } = t3;
          return i.date(e3, r2);
        } } }, messages: { "date.base": "{{#label}} must be a valid date", "date.format": '{{#label}} must be in {msg("date.format." + #format) || #format} format', "date.greater": "{{#label}} must be greater than {{:#limit}}", "date.less": "{{#label}} must be less than {{:#limit}}", "date.max": "{{#label}} must be less than or equal to {{:#limit}}", "date.min": "{{#label}} must be greater than or equal to {{:#limit}}", "date.format.iso": "ISO 8601 date", "date.format.javascript": "timestamp or number of milliseconds", "date.format.unix": "timestamp or number of seconds" } }), o.parse = function(e3, t3) {
          if (e3 instanceof Date)
            return e3;
          if ("string" != typeof e3 && (isNaN(e3) || !isFinite(e3)))
            return null;
          if (/^\s*$/.test(e3))
            return null;
          if ("iso" === t3)
            return a.isIsoDate(e3) ? o.date(e3.toString()) : null;
          const r2 = e3;
          if ("string" == typeof e3 && /^[+-]?\d+(\.\d+)?$/.test(e3) && (e3 = parseFloat(e3)), t3) {
            if ("javascript" === t3)
              return o.date(1 * e3);
            if ("unix" === t3)
              return o.date(1e3 * e3);
            if ("string" == typeof r2)
              return null;
          }
          return o.date(e3);
        }, o.date = function(e3) {
          const t3 = new Date(e3);
          return isNaN(t3.getTime()) ? null : t3;
        };
      }, 390: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(7824);
        e2.exports = n.extend({ type: "function", properties: { typeof: "function" }, rules: { arity: { method(e3) {
          return s(Number.isSafeInteger(e3) && e3 >= 0, "n must be a positive integer"), this.$_addRule({ name: "arity", args: { n: e3 } });
        }, validate(e3, t3, r2) {
          let { n: s2 } = r2;
          return e3.length === s2 ? e3 : t3.error("function.arity", { n: s2 });
        } }, class: { method() {
          return this.$_addRule("class");
        }, validate: (e3, t3) => /^\s*class\s/.test(e3.toString()) ? e3 : t3.error("function.class", { value: e3 }) }, minArity: { method(e3) {
          return s(Number.isSafeInteger(e3) && e3 > 0, "n must be a strict positive integer"), this.$_addRule({ name: "minArity", args: { n: e3 } });
        }, validate(e3, t3, r2) {
          let { n: s2 } = r2;
          return e3.length >= s2 ? e3 : t3.error("function.minArity", { n: s2 });
        } }, maxArity: { method(e3) {
          return s(Number.isSafeInteger(e3) && e3 >= 0, "n must be a positive integer"), this.$_addRule({ name: "maxArity", args: { n: e3 } });
        }, validate(e3, t3, r2) {
          let { n: s2 } = r2;
          return e3.length <= s2 ? e3 : t3.error("function.maxArity", { n: s2 });
        } } }, messages: { "function.arity": "{{#label}} must have an arity of {{#n}}", "function.class": "{{#label}} must be a class", "function.maxArity": "{{#label}} must have an arity lesser or equal to {{#n}}", "function.minArity": "{{#label}} must have an arity greater or equal to {{#n}}" } });
      }, 7824: (e2, t2, r) => {
        "use strict";
        const s = r(978), n = r(375), a = r(8571), i = r(3652), o = r(8068), l = r(8160), c = r(3292), u = r(6354), f = r(6133), h = r(3328), m = { renameDefaults: { alias: false, multiple: false, override: false } };
        e2.exports = o.extend({ type: "_keys", properties: { typeof: "object" }, flags: { unknown: { default: false } }, terms: { dependencies: { init: null }, keys: { init: null, manifest: { mapped: { from: "schema", to: "key" } } }, patterns: { init: null }, renames: { init: null } }, args: (e3, t3) => e3.keys(t3), validate(e3, t3) {
          let { schema: r2, error: s2, state: n2, prefs: a2 } = t3;
          if (!e3 || typeof e3 !== r2.$_property("typeof") || Array.isArray(e3))
            return { value: e3, errors: s2("object.base", { type: r2.$_property("typeof") }) };
          if (!(r2.$_terms.renames || r2.$_terms.dependencies || r2.$_terms.keys || r2.$_terms.patterns || r2.$_terms.externals))
            return;
          e3 = m.clone(e3, a2);
          const i2 = [];
          if (r2.$_terms.renames && !m.rename(r2, e3, n2, a2, i2))
            return { value: e3, errors: i2 };
          if (!r2.$_terms.keys && !r2.$_terms.patterns && !r2.$_terms.dependencies)
            return { value: e3, errors: i2 };
          const o2 = new Set(Object.keys(e3));
          if (r2.$_terms.keys) {
            const t4 = [e3, ...n2.ancestors];
            for (const s3 of r2.$_terms.keys) {
              const r3 = s3.key, l2 = e3[r3];
              o2.delete(r3);
              const c2 = n2.localize([...n2.path, r3], t4, s3), u2 = s3.schema.$_validate(l2, c2, a2);
              if (u2.errors) {
                if (a2.abortEarly)
                  return { value: e3, errors: u2.errors };
                void 0 !== u2.value && (e3[r3] = u2.value), i2.push(...u2.errors);
              } else
                "strip" === s3.schema._flags.result || void 0 === u2.value && void 0 !== l2 ? delete e3[r3] : void 0 !== u2.value && (e3[r3] = u2.value);
            }
          }
          if (o2.size || r2._flags._hasPatternMatch) {
            const t4 = m.unknown(r2, e3, o2, i2, n2, a2);
            if (t4)
              return t4;
          }
          if (r2.$_terms.dependencies)
            for (const t4 of r2.$_terms.dependencies) {
              if (null !== t4.key && false === m.isPresent(t4.options)(t4.key.resolve(e3, n2, a2, null, { shadow: false })))
                continue;
              const s3 = m.dependencies[t4.rel](r2, t4, e3, n2, a2);
              if (s3) {
                const t5 = r2.$_createError(s3.code, e3, s3.context, n2, a2);
                if (a2.abortEarly)
                  return { value: e3, errors: t5 };
                i2.push(t5);
              }
            }
          return { value: e3, errors: i2 };
        }, rules: { and: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          return l.verifyFlat(t3, "and"), m.dependency(this, "and", null, t3);
        } }, append: { method(e3) {
          return null == e3 || 0 === Object.keys(e3).length ? this : this.keys(e3);
        } }, assert: { method(e3, t3, r2) {
          h.isTemplate(e3) || (e3 = c.ref(e3)), n(void 0 === r2 || "string" == typeof r2, "Message must be a string"), t3 = this.$_compile(t3, { appendPath: true });
          const s2 = this.$_addRule({ name: "assert", args: { subject: e3, schema: t3, message: r2 } });
          return s2.$_mutateRegister(e3), s2.$_mutateRegister(t3), s2;
        }, validate(e3, t3, r2) {
          let { error: s2, prefs: n2, state: a2 } = t3, { subject: i2, schema: o2, message: l2 } = r2;
          const c2 = i2.resolve(e3, a2, n2), u2 = f.isRef(i2) ? i2.absolute(a2) : [];
          return o2.$_match(c2, a2.localize(u2, [e3, ...a2.ancestors], o2), n2) ? e3 : s2("object.assert", { subject: i2, message: l2 });
        }, args: ["subject", "schema", "message"], multi: true }, instance: { method(e3, t3) {
          return n("function" == typeof e3, "constructor must be a function"), t3 = t3 || e3.name, this.$_addRule({ name: "instance", args: { constructor: e3, name: t3 } });
        }, validate(e3, t3, r2) {
          let { constructor: s2, name: n2 } = r2;
          return e3 instanceof s2 ? e3 : t3.error("object.instance", { type: n2, value: e3 });
        }, args: ["constructor", "name"] }, keys: { method(e3) {
          n(void 0 === e3 || "object" == typeof e3, "Object schema must be a valid object"), n(!l.isSchema(e3), "Object schema cannot be a joi schema");
          const t3 = this.clone();
          if (e3)
            if (Object.keys(e3).length) {
              t3.$_terms.keys = t3.$_terms.keys ? t3.$_terms.keys.filter((t4) => !e3.hasOwnProperty(t4.key)) : new m.Keys();
              for (const r2 in e3)
                l.tryWithPath(() => t3.$_terms.keys.push({ key: r2, schema: this.$_compile(e3[r2]) }), r2);
            } else
              t3.$_terms.keys = new m.Keys();
          else
            t3.$_terms.keys = null;
          return t3.$_mutateRebuild();
        } }, length: { method(e3) {
          return this.$_addRule({ name: "length", args: { limit: e3 }, operator: "=" });
        }, validate(e3, t3, r2, s2) {
          let { limit: n2 } = r2, { name: a2, operator: i2, args: o2 } = s2;
          return l.compare(Object.keys(e3).length, n2, i2) ? e3 : t3.error("object." + a2, { limit: o2.limit, value: e3 });
        }, args: [{ name: "limit", ref: true, assert: l.limit, message: "must be a positive integer" }] }, max: { method(e3) {
          return this.$_addRule({ name: "max", method: "length", args: { limit: e3 }, operator: "<=" });
        } }, min: { method(e3) {
          return this.$_addRule({ name: "min", method: "length", args: { limit: e3 }, operator: ">=" });
        } }, nand: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          return l.verifyFlat(t3, "nand"), m.dependency(this, "nand", null, t3);
        } }, or: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          return l.verifyFlat(t3, "or"), m.dependency(this, "or", null, t3);
        } }, oxor: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          return m.dependency(this, "oxor", null, t3);
        } }, pattern: { method(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          const s2 = e3 instanceof RegExp;
          s2 || (e3 = this.$_compile(e3, { appendPath: true })), n(void 0 !== t3, "Invalid rule"), l.assertOptions(r2, ["fallthrough", "matches"]), s2 && n(!e3.flags.includes("g") && !e3.flags.includes("y"), "pattern should not use global or sticky mode"), t3 = this.$_compile(t3, { appendPath: true });
          const a2 = this.clone();
          a2.$_terms.patterns = a2.$_terms.patterns || [];
          const i2 = { [s2 ? "regex" : "schema"]: e3, rule: t3 };
          return r2.matches && (i2.matches = this.$_compile(r2.matches), "array" !== i2.matches.type && (i2.matches = i2.matches.$_root.array().items(i2.matches)), a2.$_mutateRegister(i2.matches), a2.$_setFlag("_hasPatternMatch", true, { clone: false })), r2.fallthrough && (i2.fallthrough = true), a2.$_terms.patterns.push(i2), a2.$_mutateRegister(t3), a2;
        } }, ref: { method() {
          return this.$_addRule("ref");
        }, validate: (e3, t3) => f.isRef(e3) ? e3 : t3.error("object.refType", { value: e3 }) }, regex: { method() {
          return this.$_addRule("regex");
        }, validate: (e3, t3) => e3 instanceof RegExp ? e3 : t3.error("object.regex", { value: e3 }) }, rename: { method(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          n("string" == typeof e3 || e3 instanceof RegExp, "Rename missing the from argument"), n("string" == typeof t3 || t3 instanceof h, "Invalid rename to argument"), n(t3 !== e3, "Cannot rename key to same name:", e3), l.assertOptions(r2, ["alias", "ignoreUndefined", "override", "multiple"]);
          const a2 = this.clone();
          a2.$_terms.renames = a2.$_terms.renames || [];
          for (const t4 of a2.$_terms.renames)
            n(t4.from !== e3, "Cannot rename the same key multiple times");
          return t3 instanceof h && a2.$_mutateRegister(t3), a2.$_terms.renames.push({ from: e3, to: t3, options: s(m.renameDefaults, r2) }), a2;
        } }, schema: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "any";
          return this.$_addRule({ name: "schema", args: { type: e3 } });
        }, validate(e3, t3, r2) {
          let { type: s2 } = r2;
          return !l.isSchema(e3) || "any" !== s2 && e3.type !== s2 ? t3.error("object.schema", { type: s2 }) : e3;
        } }, unknown: { method(e3) {
          return this.$_setFlag("unknown", false !== e3);
        } }, with: { method(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return m.dependency(this, "with", e3, t3, r2);
        } }, without: { method(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return m.dependency(this, "without", e3, t3, r2);
        } }, xor: { method() {
          for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
            t3[r2] = arguments[r2];
          return l.verifyFlat(t3, "xor"), m.dependency(this, "xor", null, t3);
        } } }, overrides: { default(e3, t3) {
          return void 0 === e3 && (e3 = l.symbols.deepDefault), this.$_parent("default", e3, t3);
        } }, rebuild(e3) {
          if (e3.$_terms.keys) {
            const t3 = new i.Sorter();
            for (const r2 of e3.$_terms.keys)
              l.tryWithPath(() => t3.add(r2, { after: r2.schema.$_rootReferences(), group: r2.key }), r2.key);
            e3.$_terms.keys = new m.Keys(...t3.nodes);
          }
        }, manifest: { build(e3, t3) {
          if (t3.keys && (e3 = e3.keys(t3.keys)), t3.dependencies)
            for (const { rel: r2, key: s2 = null, peers: n2, options: a2 } of t3.dependencies)
              e3 = m.dependency(e3, r2, s2, n2, a2);
          if (t3.patterns)
            for (const { regex: r2, schema: s2, rule: n2, fallthrough: a2, matches: i2 } of t3.patterns)
              e3 = e3.pattern(r2 || s2, n2, { fallthrough: a2, matches: i2 });
          if (t3.renames)
            for (const { from: r2, to: s2, options: n2 } of t3.renames)
              e3 = e3.rename(r2, s2, n2);
          return e3;
        } }, messages: { "object.and": "{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}", "object.assert": '{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}', "object.base": "{{#label}} must be of type {{#type}}", "object.instance": "{{#label}} must be an instance of {{:#type}}", "object.length": '{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}', "object.max": '{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}', "object.min": '{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}', "object.missing": "{{#label}} must contain at least one of {{#peersWithLabels}}", "object.nand": "{{:#mainWithLabel}} must not exist simultaneously with {{#peersWithLabels}}", "object.oxor": "{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}", "object.pattern.match": "{{#label}} keys failed to match pattern requirements", "object.refType": "{{#label}} must be a Joi reference", "object.regex": "{{#label}} must be a RegExp object", "object.rename.multiple": "{{#label}} cannot rename {{:#from}} because multiple renames are disabled and another key was already renamed to {{:#to}}", "object.rename.override": "{{#label}} cannot rename {{:#from}} because override is disabled and target {{:#to}} exists", "object.schema": "{{#label}} must be a Joi schema of {{#type}} type", "object.unknown": "{{#label}} is not allowed", "object.with": "{{:#mainWithLabel}} missing required peer {{:#peerWithLabel}}", "object.without": "{{:#mainWithLabel}} conflict with forbidden peer {{:#peerWithLabel}}", "object.xor": "{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}" } }), m.clone = function(e3, t3) {
          if ("object" == typeof e3) {
            if (t3.nonEnumerables)
              return a(e3, { shallow: true });
            const r3 = Object.create(Object.getPrototypeOf(e3));
            return Object.assign(r3, e3), r3;
          }
          const r2 = function() {
            for (var t4 = arguments.length, r3 = new Array(t4), s2 = 0; s2 < t4; s2++)
              r3[s2] = arguments[s2];
            return e3.apply(this, r3);
          };
          return r2.prototype = a(e3.prototype), Object.defineProperty(r2, "name", { value: e3.name, writable: false }), Object.defineProperty(r2, "length", { value: e3.length, writable: false }), Object.assign(r2, e3), r2;
        }, m.dependency = function(e3, t3, r2, s2, a2) {
          n(null === r2 || "string" == typeof r2, t3, "key must be a strings"), a2 || (a2 = s2.length > 1 && "object" == typeof s2[s2.length - 1] ? s2.pop() : {}), l.assertOptions(a2, ["separator", "isPresent"]), s2 = [].concat(s2);
          const i2 = l.default(a2.separator, "."), o2 = [];
          for (const e4 of s2)
            n("string" == typeof e4, t3, "peers must be strings"), o2.push(c.ref(e4, { separator: i2, ancestor: 0, prefix: false }));
          null !== r2 && (r2 = c.ref(r2, { separator: i2, ancestor: 0, prefix: false }));
          const u2 = e3.clone();
          return u2.$_terms.dependencies = u2.$_terms.dependencies || [], u2.$_terms.dependencies.push(new m.Dependency(t3, r2, o2, s2, a2)), u2;
        }, m.dependencies = { and(e3, t3, r2, s2, n2) {
          const a2 = [], i2 = [], o2 = t3.peers.length, l2 = m.isPresent(t3.options);
          for (const e4 of t3.peers)
            false === l2(e4.resolve(r2, s2, n2, null, { shadow: false })) ? a2.push(e4.key) : i2.push(e4.key);
          if (a2.length !== o2 && i2.length !== o2)
            return { code: "object.and", context: { present: i2, presentWithLabels: m.keysToLabels(e3, i2), missing: a2, missingWithLabels: m.keysToLabels(e3, a2) } };
        }, nand(e3, t3, r2, s2, n2) {
          const a2 = [], i2 = m.isPresent(t3.options);
          for (const e4 of t3.peers)
            i2(e4.resolve(r2, s2, n2, null, { shadow: false })) && a2.push(e4.key);
          if (a2.length !== t3.peers.length)
            return;
          const o2 = t3.paths[0], l2 = t3.paths.slice(1);
          return { code: "object.nand", context: { main: o2, mainWithLabel: m.keysToLabels(e3, o2), peers: l2, peersWithLabels: m.keysToLabels(e3, l2) } };
        }, or(e3, t3, r2, s2, n2) {
          const a2 = m.isPresent(t3.options);
          for (const e4 of t3.peers)
            if (a2(e4.resolve(r2, s2, n2, null, { shadow: false })))
              return;
          return { code: "object.missing", context: { peers: t3.paths, peersWithLabels: m.keysToLabels(e3, t3.paths) } };
        }, oxor(e3, t3, r2, s2, n2) {
          const a2 = [], i2 = m.isPresent(t3.options);
          for (const e4 of t3.peers)
            i2(e4.resolve(r2, s2, n2, null, { shadow: false })) && a2.push(e4.key);
          if (!a2.length || 1 === a2.length)
            return;
          const o2 = { peers: t3.paths, peersWithLabels: m.keysToLabels(e3, t3.paths) };
          return o2.present = a2, o2.presentWithLabels = m.keysToLabels(e3, a2), { code: "object.oxor", context: o2 };
        }, with(e3, t3, r2, s2, n2) {
          const a2 = m.isPresent(t3.options);
          for (const i2 of t3.peers)
            if (false === a2(i2.resolve(r2, s2, n2, null, { shadow: false })))
              return { code: "object.with", context: { main: t3.key.key, mainWithLabel: m.keysToLabels(e3, t3.key.key), peer: i2.key, peerWithLabel: m.keysToLabels(e3, i2.key) } };
        }, without(e3, t3, r2, s2, n2) {
          const a2 = m.isPresent(t3.options);
          for (const i2 of t3.peers)
            if (a2(i2.resolve(r2, s2, n2, null, { shadow: false })))
              return { code: "object.without", context: { main: t3.key.key, mainWithLabel: m.keysToLabels(e3, t3.key.key), peer: i2.key, peerWithLabel: m.keysToLabels(e3, i2.key) } };
        }, xor(e3, t3, r2, s2, n2) {
          const a2 = [], i2 = m.isPresent(t3.options);
          for (const e4 of t3.peers)
            i2(e4.resolve(r2, s2, n2, null, { shadow: false })) && a2.push(e4.key);
          if (1 === a2.length)
            return;
          const o2 = { peers: t3.paths, peersWithLabels: m.keysToLabels(e3, t3.paths) };
          return 0 === a2.length ? { code: "object.missing", context: o2 } : (o2.present = a2, o2.presentWithLabels = m.keysToLabels(e3, a2), { code: "object.xor", context: o2 });
        } }, m.keysToLabels = function(e3, t3) {
          return Array.isArray(t3) ? t3.map((t4) => e3.$_mapLabels(t4)) : e3.$_mapLabels(t3);
        }, m.isPresent = function(e3) {
          return "function" == typeof e3.isPresent ? e3.isPresent : (e4) => void 0 !== e4;
        }, m.rename = function(e3, t3, r2, s2, n2) {
          const a2 = {};
          for (const i2 of e3.$_terms.renames) {
            const o2 = [], l2 = "string" != typeof i2.from;
            if (l2)
              for (const e4 in t3) {
                if (void 0 === t3[e4] && i2.options.ignoreUndefined)
                  continue;
                if (e4 === i2.to)
                  continue;
                const r3 = i2.from.exec(e4);
                r3 && o2.push({ from: e4, to: i2.to, match: r3 });
              }
            else
              !Object.prototype.hasOwnProperty.call(t3, i2.from) || void 0 === t3[i2.from] && i2.options.ignoreUndefined || o2.push(i2);
            for (const c2 of o2) {
              const o3 = c2.from;
              let u2 = c2.to;
              if (u2 instanceof h && (u2 = u2.render(t3, r2, s2, c2.match)), o3 !== u2) {
                if (!i2.options.multiple && a2[u2] && (n2.push(e3.$_createError("object.rename.multiple", t3, { from: o3, to: u2, pattern: l2 }, r2, s2)), s2.abortEarly))
                  return false;
                if (Object.prototype.hasOwnProperty.call(t3, u2) && !i2.options.override && !a2[u2] && (n2.push(e3.$_createError("object.rename.override", t3, { from: o3, to: u2, pattern: l2 }, r2, s2)), s2.abortEarly))
                  return false;
                void 0 === t3[o3] ? delete t3[u2] : t3[u2] = t3[o3], a2[u2] = true, i2.options.alias || delete t3[o3];
              }
            }
          }
          return true;
        }, m.unknown = function(e3, t3, r2, s2, n2, a2) {
          if (e3.$_terms.patterns) {
            let i2 = false;
            const o2 = e3.$_terms.patterns.map((e4) => {
              if (e4.matches)
                return i2 = true, [];
            }), l2 = [t3, ...n2.ancestors];
            for (const i3 of r2) {
              const c2 = t3[i3], u2 = [...n2.path, i3];
              for (let f2 = 0; f2 < e3.$_terms.patterns.length; ++f2) {
                const h2 = e3.$_terms.patterns[f2];
                if (h2.regex) {
                  const e4 = h2.regex.test(i3);
                  if (n2.mainstay.tracer.debug(n2, "rule", `pattern.${f2}`, e4 ? "pass" : "error"), !e4)
                    continue;
                } else if (!h2.schema.$_match(i3, n2.nest(h2.schema, `pattern.${f2}`), a2))
                  continue;
                r2.delete(i3);
                const m2 = n2.localize(u2, l2, { schema: h2.rule, key: i3 }), d = h2.rule.$_validate(c2, m2, a2);
                if (d.errors) {
                  if (a2.abortEarly)
                    return { value: t3, errors: d.errors };
                  s2.push(...d.errors);
                }
                if (h2.matches && o2[f2].push(i3), t3[i3] = d.value, !h2.fallthrough)
                  break;
              }
            }
            if (i2)
              for (let r3 = 0; r3 < o2.length; ++r3) {
                const i3 = o2[r3];
                if (!i3)
                  continue;
                const c2 = e3.$_terms.patterns[r3].matches, f2 = n2.localize(n2.path, l2, c2), h2 = c2.$_validate(i3, f2, a2);
                if (h2.errors) {
                  const r4 = u.details(h2.errors, { override: false });
                  r4.matches = i3;
                  const o3 = e3.$_createError("object.pattern.match", t3, r4, n2, a2);
                  if (a2.abortEarly)
                    return { value: t3, errors: o3 };
                  s2.push(o3);
                }
              }
          }
          if (r2.size && (e3.$_terms.keys || e3.$_terms.patterns)) {
            if (a2.stripUnknown && !e3._flags.unknown || a2.skipFunctions) {
              const e4 = !(!a2.stripUnknown || true !== a2.stripUnknown && !a2.stripUnknown.objects);
              for (const s3 of r2)
                e4 ? (delete t3[s3], r2.delete(s3)) : "function" == typeof t3[s3] && r2.delete(s3);
            }
            if (!l.default(e3._flags.unknown, a2.allowUnknown))
              for (const i2 of r2) {
                const r3 = n2.localize([...n2.path, i2], []), o2 = e3.$_createError("object.unknown", t3[i2], { child: i2 }, r3, a2, { flags: false });
                if (a2.abortEarly)
                  return { value: t3, errors: o2 };
                s2.push(o2);
              }
          }
        }, m.Dependency = class {
          constructor(e3, t3, r2, s2, n2) {
            this.rel = e3, this.key = t3, this.peers = r2, this.paths = s2, this.options = n2;
          }
          describe() {
            const e3 = { rel: this.rel, peers: this.paths };
            return null !== this.key && (e3.key = this.key.key), "." !== this.peers[0].separator && (e3.options = { ...e3.options, separator: this.peers[0].separator }), this.options.isPresent && (e3.options = { ...e3.options, isPresent: this.options.isPresent }), e3;
          }
        }, m.Keys = class extends Array {
          concat(e3) {
            const t3 = this.slice(), r2 = /* @__PURE__ */ new Map();
            for (let e4 = 0; e4 < t3.length; ++e4)
              r2.set(t3[e4].key, e4);
            for (const s2 of e3) {
              const e4 = s2.key, n2 = r2.get(e4);
              void 0 !== n2 ? t3[n2] = { key: e4, schema: t3[n2].schema.concat(s2.schema) } : t3.push(s2);
            }
            return t3;
          }
        };
      }, 8785: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8068), a = r(8160), i = r(3292), o = r(6354), l = {};
        e2.exports = n.extend({ type: "link", properties: { schemaChain: true }, terms: { link: { init: null, manifest: "single", register: false } }, args: (e3, t3) => e3.ref(t3), validate(e3, t3) {
          let { schema: r2, state: n2, prefs: a2 } = t3;
          s(r2.$_terms.link, "Uninitialized link schema");
          const i2 = l.generate(r2, e3, n2, a2), o2 = r2.$_terms.link[0].ref;
          return i2.$_validate(e3, n2.nest(i2, `link:${o2.display}:${i2.type}`), a2);
        }, generate: (e3, t3, r2, s2) => l.generate(e3, t3, r2, s2), rules: { ref: { method(e3) {
          s(!this.$_terms.link, "Cannot reinitialize schema"), e3 = i.ref(e3), s("value" === e3.type || "local" === e3.type, "Invalid reference type:", e3.type), s("local" === e3.type || "root" === e3.ancestor || e3.ancestor > 0, "Link cannot reference itself");
          const t3 = this.clone();
          return t3.$_terms.link = [{ ref: e3 }], t3;
        } }, relative: { method() {
          let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return this.$_setFlag("relative", e3);
        } } }, overrides: { concat(e3) {
          s(this.$_terms.link, "Uninitialized link schema"), s(a.isSchema(e3), "Invalid schema object"), s("link" !== e3.type, "Cannot merge type link with another link");
          const t3 = this.clone();
          return t3.$_terms.whens || (t3.$_terms.whens = []), t3.$_terms.whens.push({ concat: e3 }), t3.$_mutateRebuild();
        } }, manifest: { build: (e3, t3) => (s(t3.link, "Invalid link description missing link"), e3.ref(t3.link)) } }), l.generate = function(e3, t3, r2, s2) {
          let n2 = r2.mainstay.links.get(e3);
          if (n2)
            return n2._generate(t3, r2, s2).schema;
          const a2 = e3.$_terms.link[0].ref, { perspective: i2, path: o2 } = l.perspective(a2, r2);
          l.assert(i2, "which is outside of schema boundaries", a2, e3, r2, s2);
          try {
            n2 = o2.length ? i2.$_reach(o2) : i2;
          } catch (t4) {
            l.assert(false, "to non-existing schema", a2, e3, r2, s2);
          }
          return l.assert("link" !== n2.type, "which is another link", a2, e3, r2, s2), e3._flags.relative || r2.mainstay.links.set(e3, n2), n2._generate(t3, r2, s2).schema;
        }, l.perspective = function(e3, t3) {
          if ("local" === e3.type) {
            for (const { schema: r2, key: s2 } of t3.schemas) {
              if ((r2._flags.id || s2) === e3.path[0])
                return { perspective: r2, path: e3.path.slice(1) };
              if (r2.$_terms.shared) {
                for (const t4 of r2.$_terms.shared)
                  if (t4._flags.id === e3.path[0])
                    return { perspective: t4, path: e3.path.slice(1) };
              }
            }
            return { perspective: null, path: null };
          }
          return "root" === e3.ancestor ? { perspective: t3.schemas[t3.schemas.length - 1].schema, path: e3.path } : { perspective: t3.schemas[e3.ancestor] && t3.schemas[e3.ancestor].schema, path: e3.path };
        }, l.assert = function(e3, t3, r2, n2, a2, i2) {
          e3 || s(false, `"${o.label(n2._flags, a2, i2)}" contains link reference "${r2.display}" ${t3}`);
        };
      }, 3832: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8068), a = r(8160), i = { numberRx: /^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i, precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/, exponentialPartRegex: /[eE][+-]?\d+$/, leadingSignAndZerosRegex: /^[+-]?(0*)?/, dotRegex: /\./, trailingZerosRegex: /0+$/ };
        e2.exports = n.extend({ type: "number", flags: { unsafe: { default: false } }, coerce: { from: "string", method(e3, t3) {
          let { schema: r2, error: s2 } = t3;
          if (!e3.match(i.numberRx))
            return;
          e3 = e3.trim();
          const n2 = { value: parseFloat(e3) };
          if (0 === n2.value && (n2.value = 0), !r2._flags.unsafe)
            if (e3.match(/e/i)) {
              if (i.extractSignificantDigits(e3) !== i.extractSignificantDigits(String(n2.value)))
                return n2.errors = s2("number.unsafe"), n2;
            } else {
              const t4 = n2.value.toString();
              if (t4.match(/e/i))
                return n2;
              if (t4 !== i.normalizeDecimal(e3))
                return n2.errors = s2("number.unsafe"), n2;
            }
          return n2;
        } }, validate(e3, t3) {
          let { schema: r2, error: s2, prefs: n2 } = t3;
          if (e3 === 1 / 0 || e3 === -1 / 0)
            return { value: e3, errors: s2("number.infinity") };
          if (!a.isNumber(e3))
            return { value: e3, errors: s2("number.base") };
          const i2 = { value: e3 };
          if (n2.convert) {
            const e4 = r2.$_getRule("precision");
            if (e4) {
              const t4 = Math.pow(10, e4.args.limit);
              i2.value = Math.round(i2.value * t4) / t4;
            }
          }
          return 0 === i2.value && (i2.value = 0), !r2._flags.unsafe && (e3 > Number.MAX_SAFE_INTEGER || e3 < Number.MIN_SAFE_INTEGER) && (i2.errors = s2("number.unsafe")), i2;
        }, rules: { compare: { method: false, validate(e3, t3, r2, s2) {
          let { limit: n2 } = r2, { name: i2, operator: o, args: l } = s2;
          return a.compare(e3, n2, o) ? e3 : t3.error("number." + i2, { limit: l.limit, value: e3 });
        }, args: [{ name: "limit", ref: true, assert: a.isNumber, message: "must be a number" }] }, greater: { method(e3) {
          return this.$_addRule({ name: "greater", method: "compare", args: { limit: e3 }, operator: ">" });
        } }, integer: { method() {
          return this.$_addRule("integer");
        }, validate: (e3, t3) => Math.trunc(e3) - e3 == 0 ? e3 : t3.error("number.integer") }, less: { method(e3) {
          return this.$_addRule({ name: "less", method: "compare", args: { limit: e3 }, operator: "<" });
        } }, max: { method(e3) {
          return this.$_addRule({ name: "max", method: "compare", args: { limit: e3 }, operator: "<=" });
        } }, min: { method(e3) {
          return this.$_addRule({ name: "min", method: "compare", args: { limit: e3 }, operator: ">=" });
        } }, multiple: { method(e3) {
          return this.$_addRule({ name: "multiple", args: { base: e3 } });
        }, validate(e3, t3, r2, s2) {
          let { base: n2 } = r2;
          return e3 * (1 / n2) % 1 == 0 ? e3 : t3.error("number.multiple", { multiple: s2.args.base, value: e3 });
        }, args: [{ name: "base", ref: true, assert: (e3) => "number" == typeof e3 && isFinite(e3) && e3 > 0, message: "must be a positive number" }], multi: true }, negative: { method() {
          return this.sign("negative");
        } }, port: { method() {
          return this.$_addRule("port");
        }, validate: (e3, t3) => Number.isSafeInteger(e3) && e3 >= 0 && e3 <= 65535 ? e3 : t3.error("number.port") }, positive: { method() {
          return this.sign("positive");
        } }, precision: { method(e3) {
          return s(Number.isSafeInteger(e3), "limit must be an integer"), this.$_addRule({ name: "precision", args: { limit: e3 } });
        }, validate(e3, t3, r2) {
          let { limit: s2 } = r2;
          const n2 = e3.toString().match(i.precisionRx);
          return Math.max((n2[1] ? n2[1].length : 0) - (n2[2] ? parseInt(n2[2], 10) : 0), 0) <= s2 ? e3 : t3.error("number.precision", { limit: s2, value: e3 });
        }, convert: true }, sign: { method(e3) {
          return s(["negative", "positive"].includes(e3), "Invalid sign", e3), this.$_addRule({ name: "sign", args: { sign: e3 } });
        }, validate(e3, t3, r2) {
          let { sign: s2 } = r2;
          return "negative" === s2 && e3 < 0 || "positive" === s2 && e3 > 0 ? e3 : t3.error(`number.${s2}`);
        } }, unsafe: { method() {
          let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return s("boolean" == typeof e3, "enabled must be a boolean"), this.$_setFlag("unsafe", e3);
        } } }, cast: { string: { from: (e3) => "number" == typeof e3, to: (e3, t3) => e3.toString() } }, messages: { "number.base": "{{#label}} must be a number", "number.greater": "{{#label}} must be greater than {{#limit}}", "number.infinity": "{{#label}} cannot be infinity", "number.integer": "{{#label}} must be an integer", "number.less": "{{#label}} must be less than {{#limit}}", "number.max": "{{#label}} must be less than or equal to {{#limit}}", "number.min": "{{#label}} must be greater than or equal to {{#limit}}", "number.multiple": "{{#label}} must be a multiple of {{#multiple}}", "number.negative": "{{#label}} must be a negative number", "number.port": "{{#label}} must be a valid port", "number.positive": "{{#label}} must be a positive number", "number.precision": "{{#label}} must have no more than {{#limit}} decimal places", "number.unsafe": "{{#label}} must be a safe number" } }), i.extractSignificantDigits = function(e3) {
          return e3.replace(i.exponentialPartRegex, "").replace(i.dotRegex, "").replace(i.trailingZerosRegex, "").replace(i.leadingSignAndZerosRegex, "");
        }, i.normalizeDecimal = function(e3) {
          return (e3 = e3.replace(/^\+/, "").replace(/\.0*$/, "").replace(/^(-?)\.([^\.]*)$/, "$10.$2").replace(/^(-?)0+([0-9])/, "$1$2")).includes(".") && e3.endsWith("0") && (e3 = e3.replace(/0+$/, "")), "-0" === e3 ? "0" : e3;
        };
      }, 8966: (e2, t2, r) => {
        "use strict";
        const s = r(7824);
        e2.exports = s.extend({ type: "object", cast: { map: { from: (e3) => e3 && "object" == typeof e3, to: (e3, t3) => new Map(Object.entries(e3)) } } });
      }, 7417: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(5380), a = r(1745), i = r(9959), o = r(6064), l = r(9926), c = r(5752), u = r(8068), f = r(8160), h = { tlds: l instanceof Set && { tlds: { allow: l, deny: null } }, base64Regex: { true: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/ }, false: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/ } }, dataUriRegex: /^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/, hexRegex: /^[a-f0-9]+$/i, ipRegex: i.regex({ cidr: "forbidden" }).regex, isoDurationRegex: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/, guidBrackets: { "{": "}", "[": "]", "(": ")", "": "" }, guidVersions: { uuidv1: "1", uuidv2: "2", uuidv3: "3", uuidv4: "4", uuidv5: "5" }, guidSeparators: /* @__PURE__ */ new Set([void 0, true, false, "-", ":"]), normalizationForms: ["NFC", "NFD", "NFKC", "NFKD"] };
        e2.exports = u.extend({ type: "string", flags: { insensitive: { default: false }, truncate: { default: false } }, terms: { replacements: { init: null } }, coerce: { from: "string", method(e3, t3) {
          let { schema: r2, state: s2, prefs: n2 } = t3;
          const a2 = r2.$_getRule("normalize");
          a2 && (e3 = e3.normalize(a2.args.form));
          const i2 = r2.$_getRule("case");
          i2 && (e3 = "upper" === i2.args.direction ? e3.toLocaleUpperCase() : e3.toLocaleLowerCase());
          const o2 = r2.$_getRule("trim");
          if (o2 && o2.args.enabled && (e3 = e3.trim()), r2.$_terms.replacements)
            for (const t4 of r2.$_terms.replacements)
              e3 = e3.replace(t4.pattern, t4.replacement);
          const l2 = r2.$_getRule("hex");
          if (l2 && l2.args.options.byteAligned && e3.length % 2 != 0 && (e3 = `0${e3}`), r2.$_getRule("isoDate")) {
            const t4 = h.isoDate(e3);
            t4 && (e3 = t4);
          }
          if (r2._flags.truncate) {
            const t4 = r2.$_getRule("max");
            if (t4) {
              let a3 = t4.args.limit;
              if (f.isResolvable(a3) && (a3 = a3.resolve(e3, s2, n2), !f.limit(a3)))
                return { value: e3, errors: r2.$_createError("any.ref", a3, { ref: t4.args.limit, arg: "limit", reason: "must be a positive integer" }, s2, n2) };
              e3 = e3.slice(0, a3);
            }
          }
          return { value: e3 };
        } }, validate(e3, t3) {
          let { schema: r2, error: s2 } = t3;
          if ("string" != typeof e3)
            return { value: e3, errors: s2("string.base") };
          if ("" === e3) {
            const t4 = r2.$_getRule("min");
            if (t4 && 0 === t4.args.limit)
              return;
            return { value: e3, errors: s2("string.empty") };
          }
        }, rules: { alphanum: { method() {
          return this.$_addRule("alphanum");
        }, validate: (e3, t3) => /^[a-zA-Z0-9]+$/.test(e3) ? e3 : t3.error("string.alphanum") }, base64: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return f.assertOptions(e3, ["paddingRequired", "urlSafe"]), e3 = { urlSafe: false, paddingRequired: true, ...e3 }, s("boolean" == typeof e3.paddingRequired, "paddingRequired must be boolean"), s("boolean" == typeof e3.urlSafe, "urlSafe must be boolean"), this.$_addRule({ name: "base64", args: { options: e3 } });
        }, validate(e3, t3, r2) {
          let { options: s2 } = r2;
          return h.base64Regex[s2.paddingRequired][s2.urlSafe].test(e3) ? e3 : t3.error("string.base64");
        } }, case: { method(e3) {
          return s(["lower", "upper"].includes(e3), "Invalid case:", e3), this.$_addRule({ name: "case", args: { direction: e3 } });
        }, validate(e3, t3, r2) {
          let { direction: s2 } = r2;
          return "lower" === s2 && e3 === e3.toLocaleLowerCase() || "upper" === s2 && e3 === e3.toLocaleUpperCase() ? e3 : t3.error(`string.${s2}case`);
        }, convert: true }, creditCard: { method() {
          return this.$_addRule("creditCard");
        }, validate(e3, t3) {
          let r2 = e3.length, s2 = 0, n2 = 1;
          for (; r2--; ) {
            const t4 = e3.charAt(r2) * n2;
            s2 += t4 - 9 * (t4 > 9), n2 ^= 3;
          }
          return s2 > 0 && s2 % 10 == 0 ? e3 : t3.error("string.creditCard");
        } }, dataUri: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return f.assertOptions(e3, ["paddingRequired"]), e3 = { paddingRequired: true, ...e3 }, s("boolean" == typeof e3.paddingRequired, "paddingRequired must be boolean"), this.$_addRule({ name: "dataUri", args: { options: e3 } });
        }, validate(e3, t3, r2) {
          let { options: s2 } = r2;
          const n2 = e3.match(h.dataUriRegex);
          if (n2) {
            if (!n2[2])
              return e3;
            if ("base64" !== n2[2])
              return e3;
            if (h.base64Regex[s2.paddingRequired].false.test(n2[3]))
              return e3;
          }
          return t3.error("string.dataUri");
        } }, domain: { method(e3) {
          e3 && f.assertOptions(e3, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
          const t3 = h.addressOptions(e3);
          return this.$_addRule({ name: "domain", args: { options: e3 }, address: t3 });
        }, validate(e3, t3, r2, s2) {
          let { address: a2 } = s2;
          return n.isValid(e3, a2) ? e3 : t3.error("string.domain");
        } }, email: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          f.assertOptions(e3, ["allowFullyQualified", "allowUnicode", "ignoreLength", "maxDomainSegments", "minDomainSegments", "multiple", "separator", "tlds"]), s(void 0 === e3.multiple || "boolean" == typeof e3.multiple, "multiple option must be an boolean");
          const t3 = h.addressOptions(e3), r2 = new RegExp(`\\s*[${e3.separator ? o(e3.separator) : ","}]\\s*`);
          return this.$_addRule({ name: "email", args: { options: e3 }, regex: r2, address: t3 });
        }, validate(e3, t3, r2, s2) {
          let { options: n2 } = r2, { regex: i2, address: o2 } = s2;
          const l2 = n2.multiple ? e3.split(i2) : [e3], c2 = [];
          for (const e4 of l2)
            a.isValid(e4, o2) || c2.push(e4);
          return c2.length ? t3.error("string.email", { value: e3, invalids: c2 }) : e3;
        } }, guid: { alias: "uuid", method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          f.assertOptions(e3, ["version", "separator"]);
          let t3 = "";
          if (e3.version) {
            const r3 = [].concat(e3.version);
            s(r3.length >= 1, "version must have at least 1 valid version specified");
            const n3 = /* @__PURE__ */ new Set();
            for (let e4 = 0; e4 < r3.length; ++e4) {
              const a2 = r3[e4];
              s("string" == typeof a2, "version at position " + e4 + " must be a string");
              const i2 = h.guidVersions[a2.toLowerCase()];
              s(i2, "version at position " + e4 + " must be one of " + Object.keys(h.guidVersions).join(", ")), s(!n3.has(i2), "version at position " + e4 + " must not be a duplicate"), t3 += i2, n3.add(i2);
            }
          }
          s(h.guidSeparators.has(e3.separator), 'separator must be one of true, false, "-", or ":"');
          const r2 = void 0 === e3.separator ? "[:-]?" : true === e3.separator ? "[:-]" : false === e3.separator ? "[]?" : `\\${e3.separator}`, n2 = new RegExp(`^([\\[{\\(]?)[0-9A-F]{8}(${r2})[0-9A-F]{4}\\2?[${t3 || "0-9A-F"}][0-9A-F]{3}\\2?[${t3 ? "89AB" : "0-9A-F"}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`, "i");
          return this.$_addRule({ name: "guid", args: { options: e3 }, regex: n2 });
        }, validate(e3, t3, r2, s2) {
          let { regex: n2 } = s2;
          const a2 = n2.exec(e3);
          return a2 ? h.guidBrackets[a2[1]] !== a2[a2.length - 1] ? t3.error("string.guid") : e3 : t3.error("string.guid");
        } }, hex: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return f.assertOptions(e3, ["byteAligned"]), e3 = { byteAligned: false, ...e3 }, s("boolean" == typeof e3.byteAligned, "byteAligned must be boolean"), this.$_addRule({ name: "hex", args: { options: e3 } });
        }, validate(e3, t3, r2) {
          let { options: s2 } = r2;
          return h.hexRegex.test(e3) ? s2.byteAligned && e3.length % 2 != 0 ? t3.error("string.hexAlign") : e3 : t3.error("string.hex");
        } }, hostname: { method() {
          return this.$_addRule("hostname");
        }, validate: (e3, t3) => n.isValid(e3, { minDomainSegments: 1 }) || h.ipRegex.test(e3) ? e3 : t3.error("string.hostname") }, insensitive: { method() {
          return this.$_setFlag("insensitive", true);
        } }, ip: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          f.assertOptions(e3, ["cidr", "version"]);
          const { cidr: t3, versions: r2, regex: s2 } = i.regex(e3), n2 = e3.version ? r2 : void 0;
          return this.$_addRule({ name: "ip", args: { options: { cidr: t3, version: n2 } }, regex: s2 });
        }, validate(e3, t3, r2, s2) {
          let { options: n2 } = r2, { regex: a2 } = s2;
          return a2.test(e3) ? e3 : n2.version ? t3.error("string.ipVersion", { value: e3, cidr: n2.cidr, version: n2.version }) : t3.error("string.ip", { value: e3, cidr: n2.cidr });
        } }, isoDate: { method() {
          return this.$_addRule("isoDate");
        }, validate(e3, t3) {
          let { error: r2 } = t3;
          return h.isoDate(e3) ? e3 : r2("string.isoDate");
        } }, isoDuration: { method() {
          return this.$_addRule("isoDuration");
        }, validate: (e3, t3) => h.isoDurationRegex.test(e3) ? e3 : t3.error("string.isoDuration") }, length: { method(e3, t3) {
          return h.length(this, "length", e3, "=", t3);
        }, validate(e3, t3, r2, s2) {
          let { limit: n2, encoding: a2 } = r2, { name: i2, operator: o2, args: l2 } = s2;
          const c2 = !a2 && e3.length;
          return f.compare(c2, n2, o2) ? e3 : t3.error("string." + i2, { limit: l2.limit, value: e3, encoding: a2 });
        }, args: [{ name: "limit", ref: true, assert: f.limit, message: "must be a positive integer" }, "encoding"] }, lowercase: { method() {
          return this.case("lower");
        } }, max: { method(e3, t3) {
          return h.length(this, "max", e3, "<=", t3);
        }, args: ["limit", "encoding"] }, min: { method(e3, t3) {
          return h.length(this, "min", e3, ">=", t3);
        }, args: ["limit", "encoding"] }, normalize: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "NFC";
          return s(h.normalizationForms.includes(e3), "normalization form must be one of " + h.normalizationForms.join(", ")), this.$_addRule({ name: "normalize", args: { form: e3 } });
        }, validate(e3, t3, r2) {
          let { error: s2 } = t3, { form: n2 } = r2;
          return e3 === e3.normalize(n2) ? e3 : s2("string.normalize", { value: e3, form: n2 });
        }, convert: true }, pattern: { alias: "regex", method(e3) {
          let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          s(e3 instanceof RegExp, "regex must be a RegExp"), s(!e3.flags.includes("g") && !e3.flags.includes("y"), "regex should not use global or sticky mode"), "string" == typeof t3 && (t3 = { name: t3 }), f.assertOptions(t3, ["invert", "name"]);
          const r2 = ["string.pattern", t3.invert ? ".invert" : "", t3.name ? ".name" : ".base"].join("");
          return this.$_addRule({ name: "pattern", args: { regex: e3, options: t3 }, errorCode: r2 });
        }, validate(e3, t3, r2, s2) {
          let { regex: n2, options: a2 } = r2, { errorCode: i2 } = s2;
          return n2.test(e3) ^ a2.invert ? e3 : t3.error(i2, { name: a2.name, regex: n2, value: e3 });
        }, args: ["regex", "options"], multi: true }, replace: { method(e3, t3) {
          "string" == typeof e3 && (e3 = new RegExp(o(e3), "g")), s(e3 instanceof RegExp, "pattern must be a RegExp"), s("string" == typeof t3, "replacement must be a String");
          const r2 = this.clone();
          return r2.$_terms.replacements || (r2.$_terms.replacements = []), r2.$_terms.replacements.push({ pattern: e3, replacement: t3 }), r2;
        } }, token: { method() {
          return this.$_addRule("token");
        }, validate: (e3, t3) => /^\w+$/.test(e3) ? e3 : t3.error("string.token") }, trim: { method() {
          let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return s("boolean" == typeof e3, "enabled must be a boolean"), this.$_addRule({ name: "trim", args: { enabled: e3 } });
        }, validate(e3, t3, r2) {
          let { enabled: s2 } = r2;
          return s2 && e3 !== e3.trim() ? t3.error("string.trim") : e3;
        }, convert: true }, truncate: { method() {
          let e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return s("boolean" == typeof e3, "enabled must be a boolean"), this.$_setFlag("truncate", e3);
        } }, uppercase: { method() {
          return this.case("upper");
        } }, uri: { method() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          f.assertOptions(e3, ["allowRelative", "allowQuerySquareBrackets", "domain", "relativeOnly", "scheme"]), e3.domain && f.assertOptions(e3.domain, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
          const { regex: t3, scheme: r2 } = c.regex(e3), s2 = e3.domain ? h.addressOptions(e3.domain) : null;
          return this.$_addRule({ name: "uri", args: { options: e3 }, regex: t3, domain: s2, scheme: r2 });
        }, validate(e3, t3, r2, s2) {
          let { options: a2 } = r2, { regex: i2, domain: o2, scheme: l2 } = s2;
          if (["http:/", "https:/"].includes(e3))
            return t3.error("string.uri");
          const c2 = i2.exec(e3);
          if (c2) {
            const r3 = c2[1] || c2[2];
            return !o2 || a2.allowRelative && !r3 || n.isValid(r3, o2) ? e3 : t3.error("string.domain", { value: r3 });
          }
          return a2.relativeOnly ? t3.error("string.uriRelativeOnly") : a2.scheme ? t3.error("string.uriCustomScheme", { scheme: l2, value: e3 }) : t3.error("string.uri");
        } } }, manifest: { build(e3, t3) {
          if (t3.replacements)
            for (const { pattern: r2, replacement: s2 } of t3.replacements)
              e3 = e3.replace(r2, s2);
          return e3;
        } }, messages: { "string.alphanum": "{{#label}} must only contain alpha-numeric characters", "string.base": "{{#label}} must be a string", "string.base64": "{{#label}} must be a valid base64 string", "string.creditCard": "{{#label}} must be a credit card", "string.dataUri": "{{#label}} must be a valid dataUri string", "string.domain": "{{#label}} must contain a valid domain name", "string.email": "{{#label}} must be a valid email", "string.empty": "{{#label}} is not allowed to be empty", "string.guid": "{{#label}} must be a valid GUID", "string.hex": "{{#label}} must only contain hexadecimal characters", "string.hexAlign": "{{#label}} hex decoded representation must be byte aligned", "string.hostname": "{{#label}} must be a valid hostname", "string.ip": "{{#label}} must be a valid ip address with a {{#cidr}} CIDR", "string.ipVersion": "{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR", "string.isoDate": "{{#label}} must be in iso format", "string.isoDuration": "{{#label}} must be a valid ISO 8601 duration", "string.length": "{{#label}} length must be {{#limit}} characters long", "string.lowercase": "{{#label}} must only contain lowercase characters", "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long", "string.min": "{{#label}} length must be at least {{#limit}} characters long", "string.normalize": "{{#label}} must be unicode normalized in the {{#form}} form", "string.token": "{{#label}} must only contain alpha-numeric and underscore characters", "string.pattern.base": "{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}", "string.pattern.name": "{{#label}} with value {:[.]} fails to match the {{#name}} pattern", "string.pattern.invert.base": "{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}", "string.pattern.invert.name": "{{#label}} with value {:[.]} matches the inverted {{#name}} pattern", "string.trim": "{{#label}} must not have leading or trailing whitespace", "string.uri": "{{#label}} must be a valid uri", "string.uriCustomScheme": "{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern", "string.uriRelativeOnly": "{{#label}} must be a valid relative uri", "string.uppercase": "{{#label}} must only contain uppercase characters" } }), h.addressOptions = function(e3) {
          if (!e3)
            return e3;
          if (s(void 0 === e3.minDomainSegments || Number.isSafeInteger(e3.minDomainSegments) && e3.minDomainSegments > 0, "minDomainSegments must be a positive integer"), s(void 0 === e3.maxDomainSegments || Number.isSafeInteger(e3.maxDomainSegments) && e3.maxDomainSegments > 0, "maxDomainSegments must be a positive integer"), false === e3.tlds)
            return e3;
          if (true === e3.tlds || void 0 === e3.tlds)
            return s(h.tlds, "Built-in TLD list disabled"), Object.assign({}, e3, h.tlds);
          s("object" == typeof e3.tlds, "tlds must be true, false, or an object");
          const t3 = e3.tlds.deny;
          if (t3)
            return Array.isArray(t3) && (e3 = Object.assign({}, e3, { tlds: { deny: new Set(t3) } })), s(e3.tlds.deny instanceof Set, "tlds.deny must be an array, Set, or boolean"), s(!e3.tlds.allow, "Cannot specify both tlds.allow and tlds.deny lists"), h.validateTlds(e3.tlds.deny, "tlds.deny"), e3;
          const r2 = e3.tlds.allow;
          return r2 ? true === r2 ? (s(h.tlds, "Built-in TLD list disabled"), Object.assign({}, e3, h.tlds)) : (Array.isArray(r2) && (e3 = Object.assign({}, e3, { tlds: { allow: new Set(r2) } })), s(e3.tlds.allow instanceof Set, "tlds.allow must be an array, Set, or boolean"), h.validateTlds(e3.tlds.allow, "tlds.allow"), e3) : e3;
        }, h.validateTlds = function(e3, t3) {
          for (const r2 of e3)
            s(n.isValid(r2, { minDomainSegments: 1, maxDomainSegments: 1 }), `${t3} must contain valid top level domain names`);
        }, h.isoDate = function(e3) {
          if (!f.isIsoDate(e3))
            return null;
          /.*T.*[+-]\d\d$/.test(e3) && (e3 += "00");
          const t3 = new Date(e3);
          return isNaN(t3.getTime()) ? null : t3.toISOString();
        }, h.length = function(e3, t3, r2, n2, a2) {
          return s(!a2 || false, "Invalid encoding:", a2), e3.$_addRule({ name: t3, method: "length", args: { limit: r2, encoding: a2 }, operator: n2 });
        };
      }, 8826: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8068), a = {};
        a.Map = class extends Map {
          slice() {
            return new a.Map(this);
          }
        }, e2.exports = n.extend({ type: "symbol", terms: { map: { init: new a.Map() } }, coerce: { method(e3, t3) {
          let { schema: r2, error: s2 } = t3;
          const n2 = r2.$_terms.map.get(e3);
          return n2 && (e3 = n2), r2._flags.only && "symbol" != typeof e3 ? { value: e3, errors: s2("symbol.map", { map: r2.$_terms.map }) } : { value: e3 };
        } }, validate(e3, t3) {
          let { error: r2 } = t3;
          if ("symbol" != typeof e3)
            return { value: e3, errors: r2("symbol.base") };
        }, rules: { map: { method(e3) {
          e3 && !e3[Symbol.iterator] && "object" == typeof e3 && (e3 = Object.entries(e3)), s(e3 && e3[Symbol.iterator], "Iterable must be an iterable or object");
          const t3 = this.clone(), r2 = [];
          for (const n2 of e3) {
            s(n2 && n2[Symbol.iterator], "Entry must be an iterable");
            const [e4, a2] = n2;
            s("object" != typeof e4 && "function" != typeof e4 && "symbol" != typeof e4, "Key must not be of type object, function, or Symbol"), s("symbol" == typeof a2, "Value must be a Symbol"), t3.$_terms.map.set(e4, a2), r2.push(a2);
          }
          return t3.valid(...r2);
        } } }, manifest: { build: (e3, t3) => (t3.map && (e3 = e3.map(t3.map)), e3) }, messages: { "symbol.base": "{{#label}} must be a symbol", "symbol.map": "{{#label}} must be one of {{#map}}" } });
      }, 8863: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(738), i = r(9621), o = r(8160), l = r(6354), c = r(493), u = { result: Symbol("result") };
        t2.entry = function(e3, t3, r2) {
          let n2 = o.defaults;
          r2 && (s(void 0 === r2.warnings, "Cannot override warnings preference in synchronous validation"), s(void 0 === r2.artifacts, "Cannot override artifacts preference in synchronous validation"), n2 = o.preferences(o.defaults, r2));
          const a2 = u.entry(e3, t3, n2);
          s(!a2.mainstay.externals.length, "Schema with external rules must use validateAsync()");
          const i2 = { value: a2.value };
          return a2.error && (i2.error = a2.error), a2.mainstay.warnings.length && (i2.warning = l.details(a2.mainstay.warnings)), a2.mainstay.debug && (i2.debug = a2.mainstay.debug), a2.mainstay.artifacts && (i2.artifacts = a2.mainstay.artifacts), i2;
        }, t2.entryAsync = async function(e3, t3, r2) {
          let s2 = o.defaults;
          r2 && (s2 = o.preferences(o.defaults, r2));
          const n2 = u.entry(e3, t3, s2), a2 = n2.mainstay;
          if (n2.error)
            throw a2.debug && (n2.error.debug = a2.debug), n2.error;
          if (a2.externals.length) {
            let t4 = n2.value;
            const c3 = [];
            for (const n3 of a2.externals) {
              const f = n3.state.path, h = "link" === n3.schema.type ? a2.links.get(n3.schema) : null;
              let m, d, p = t4;
              const g = f.length ? [t4] : [], y = f.length ? i(e3, f) : e3;
              if (f.length) {
                m = f[f.length - 1];
                let e4 = t4;
                for (const t5 of f.slice(0, -1))
                  e4 = e4[t5], g.unshift(e4);
                d = g[0], p = d[m];
              }
              try {
                const e4 = (e5, t5) => (h || n3.schema).$_createError(e5, p, t5, n3.state, s2), i2 = await n3.method(p, { schema: n3.schema, linked: h, state: n3.state, prefs: r2, original: y, error: e4, errorsArray: u.errorsArray, warn: (e5, t5) => a2.warnings.push((h || n3.schema).$_createError(e5, p, t5, n3.state, s2)), message: (e5, t5) => (h || n3.schema).$_createError("external", p, t5, n3.state, s2, { messages: e5 }) });
                if (void 0 === i2 || i2 === p)
                  continue;
                if (i2 instanceof l.Report) {
                  if (a2.tracer.log(n3.schema, n3.state, "rule", "external", "error"), c3.push(i2), s2.abortEarly)
                    break;
                  continue;
                }
                if (Array.isArray(i2) && i2[o.symbols.errors]) {
                  if (a2.tracer.log(n3.schema, n3.state, "rule", "external", "error"), c3.push(...i2), s2.abortEarly)
                    break;
                  continue;
                }
                d ? (a2.tracer.value(n3.state, "rule", p, i2, "external"), d[m] = i2) : (a2.tracer.value(n3.state, "rule", t4, i2, "external"), t4 = i2);
              } catch (e4) {
                throw s2.errors.label && (e4.message += ` (${n3.label})`), e4;
              }
            }
            if (n2.value = t4, c3.length)
              throw n2.error = l.process(c3, e3, s2), a2.debug && (n2.error.debug = a2.debug), n2.error;
          }
          if (!s2.warnings && !s2.debug && !s2.artifacts)
            return n2.value;
          const c2 = { value: n2.value };
          return a2.warnings.length && (c2.warning = l.details(a2.warnings)), a2.debug && (c2.debug = a2.debug), a2.artifacts && (c2.artifacts = a2.artifacts), c2;
        }, u.Mainstay = class {
          constructor(e3, t3, r2) {
            this.externals = [], this.warnings = [], this.tracer = e3, this.debug = t3, this.links = r2, this.shadow = null, this.artifacts = null, this._snapshots = [];
          }
          snapshot() {
            this._snapshots.push({ externals: this.externals.slice(), warnings: this.warnings.slice() });
          }
          restore() {
            const e3 = this._snapshots.pop();
            this.externals = e3.externals, this.warnings = e3.warnings;
          }
        }, u.entry = function(e3, r2, s2) {
          const { tracer: n2, cleanup: a2 } = u.tracer(r2, s2), i2 = s2.debug ? [] : null, o2 = r2._ids._schemaChain ? /* @__PURE__ */ new Map() : null, f = new u.Mainstay(n2, i2, o2), h = r2._ids._schemaChain ? [{ schema: r2 }] : null, m = new c([], [], { mainstay: f, schemas: h }), d = t2.validate(e3, r2, m, s2);
          a2 && r2.$_root.untrace();
          const p = l.process(d.errors, e3, s2);
          return { value: d.value, error: p, mainstay: f };
        }, u.tracer = function(e3, t3) {
          return e3.$_root._tracer ? { tracer: e3.$_root._tracer._register(e3) } : t3.debug ? (s(e3.$_root.trace, "Debug mode not supported"), { tracer: e3.$_root.trace()._register(e3), cleanup: true }) : { tracer: u.ignore };
        }, t2.validate = function(e3, t3, r2, s2) {
          let n2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
          if (t3.$_terms.whens && (t3 = t3._generate(e3, r2, s2).schema), t3._preferences && (s2 = u.prefs(t3, s2)), t3._cache && s2.cache) {
            const s3 = t3._cache.get(e3);
            if (r2.mainstay.tracer.debug(r2, "validate", "cached", !!s3), s3)
              return s3;
          }
          const a2 = (n3, a3, i3) => t3.$_createError(n3, e3, a3, i3 || r2, s2), i2 = { original: e3, prefs: s2, schema: t3, state: r2, error: a2, errorsArray: u.errorsArray, warn: (e4, t4, s3) => r2.mainstay.warnings.push(a2(e4, t4, s3)), message: (n3, a3) => t3.$_createError("custom", e3, a3, r2, s2, { messages: n3 }) };
          r2.mainstay.tracer.entry(t3, r2);
          const l2 = t3._definition;
          if (l2.prepare && void 0 !== e3 && s2.convert) {
            const t4 = l2.prepare(e3, i2);
            if (t4) {
              if (r2.mainstay.tracer.value(r2, "prepare", e3, t4.value), t4.errors)
                return u.finalize(t4.value, [].concat(t4.errors), i2);
              e3 = t4.value;
            }
          }
          if (l2.coerce && void 0 !== e3 && s2.convert && (!l2.coerce.from || l2.coerce.from.includes(typeof e3))) {
            const t4 = l2.coerce.method(e3, i2);
            if (t4) {
              if (r2.mainstay.tracer.value(r2, "coerced", e3, t4.value), t4.errors)
                return u.finalize(t4.value, [].concat(t4.errors), i2);
              e3 = t4.value;
            }
          }
          const c2 = t3._flags.empty;
          c2 && c2.$_match(u.trim(e3, t3), r2.nest(c2), o.defaults) && (r2.mainstay.tracer.value(r2, "empty", e3, void 0), e3 = void 0);
          const f = n2.presence || t3._flags.presence || (t3._flags._endedSwitch ? null : s2.presence);
          if (void 0 === e3) {
            if ("forbidden" === f)
              return u.finalize(e3, null, i2);
            if ("required" === f)
              return u.finalize(e3, [t3.$_createError("any.required", e3, null, r2, s2)], i2);
            if ("optional" === f) {
              if (t3._flags.default !== o.symbols.deepDefault)
                return u.finalize(e3, null, i2);
              r2.mainstay.tracer.value(r2, "default", e3, {}), e3 = {};
            }
          } else if ("forbidden" === f)
            return u.finalize(e3, [t3.$_createError("any.unknown", e3, null, r2, s2)], i2);
          const h = [];
          if (t3._valids) {
            const n3 = t3._valids.get(e3, r2, s2, t3._flags.insensitive);
            if (n3)
              return s2.convert && (r2.mainstay.tracer.value(r2, "valids", e3, n3.value), e3 = n3.value), r2.mainstay.tracer.filter(t3, r2, "valid", n3), u.finalize(e3, null, i2);
            if (t3._flags.only) {
              const n4 = t3.$_createError("any.only", e3, { valids: t3._valids.values({ display: true }) }, r2, s2);
              if (s2.abortEarly)
                return u.finalize(e3, [n4], i2);
              h.push(n4);
            }
          }
          if (t3._invalids) {
            const n3 = t3._invalids.get(e3, r2, s2, t3._flags.insensitive);
            if (n3) {
              r2.mainstay.tracer.filter(t3, r2, "invalid", n3);
              const a3 = t3.$_createError("any.invalid", e3, { invalids: t3._invalids.values({ display: true }) }, r2, s2);
              if (s2.abortEarly)
                return u.finalize(e3, [a3], i2);
              h.push(a3);
            }
          }
          if (l2.validate) {
            const t4 = l2.validate(e3, i2);
            if (t4 && (r2.mainstay.tracer.value(r2, "base", e3, t4.value), e3 = t4.value, t4.errors)) {
              if (!Array.isArray(t4.errors))
                return h.push(t4.errors), u.finalize(e3, h, i2);
              if (t4.errors.length)
                return h.push(...t4.errors), u.finalize(e3, h, i2);
            }
          }
          return t3._rules.length ? u.rules(e3, h, i2) : u.finalize(e3, h, i2);
        }, u.rules = function(e3, t3, r2) {
          const { schema: s2, state: n2, prefs: a2 } = r2;
          for (const i2 of s2._rules) {
            const l2 = s2._definition.rules[i2.method];
            if (l2.convert && a2.convert) {
              n2.mainstay.tracer.log(s2, n2, "rule", i2.name, "full");
              continue;
            }
            let c2, f = i2.args;
            if (i2._resolve.length) {
              f = Object.assign({}, f);
              for (const t4 of i2._resolve) {
                const r3 = l2.argsByName.get(t4), i3 = f[t4].resolve(e3, n2, a2), u2 = r3.normalize ? r3.normalize(i3) : i3, h2 = o.validateArg(u2, null, r3);
                if (h2) {
                  c2 = s2.$_createError("any.ref", i3, { arg: t4, ref: f[t4], reason: h2 }, n2, a2);
                  break;
                }
                f[t4] = u2;
              }
            }
            c2 = c2 || l2.validate(e3, r2, f, i2);
            const h = u.rule(c2, i2);
            if (h.errors) {
              if (n2.mainstay.tracer.log(s2, n2, "rule", i2.name, "error"), i2.warn) {
                n2.mainstay.warnings.push(...h.errors);
                continue;
              }
              if (a2.abortEarly)
                return u.finalize(e3, h.errors, r2);
              t3.push(...h.errors);
            } else
              n2.mainstay.tracer.log(s2, n2, "rule", i2.name, "pass"), n2.mainstay.tracer.value(n2, "rule", e3, h.value, i2.name), e3 = h.value;
          }
          return u.finalize(e3, t3, r2);
        }, u.rule = function(e3, t3) {
          return e3 instanceof l.Report ? (u.error(e3, t3), { errors: [e3], value: null }) : Array.isArray(e3) && e3[o.symbols.errors] ? (e3.forEach((e4) => u.error(e4, t3)), { errors: e3, value: null }) : { errors: null, value: e3 };
        }, u.error = function(e3, t3) {
          return t3.message && e3._setTemplate(t3.message), e3;
        }, u.finalize = function(e3, t3, r2) {
          t3 = t3 || [];
          const { schema: n2, state: a2, prefs: i2 } = r2;
          if (t3.length) {
            const s2 = u.default("failover", void 0, t3, r2);
            void 0 !== s2 && (a2.mainstay.tracer.value(a2, "failover", e3, s2), e3 = s2, t3 = []);
          }
          if (t3.length && n2._flags.error)
            if ("function" == typeof n2._flags.error) {
              t3 = n2._flags.error(t3), Array.isArray(t3) || (t3 = [t3]);
              for (const e4 of t3)
                s(e4 instanceof Error || e4 instanceof l.Report, "error() must return an Error object");
            } else
              t3 = [n2._flags.error];
          if (void 0 === e3) {
            const s2 = u.default("default", e3, t3, r2);
            a2.mainstay.tracer.value(a2, "default", e3, s2), e3 = s2;
          }
          if (n2._flags.cast && void 0 !== e3) {
            const t4 = n2._definition.cast[n2._flags.cast];
            if (t4.from(e3)) {
              const s2 = t4.to(e3, r2);
              a2.mainstay.tracer.value(a2, "cast", e3, s2, n2._flags.cast), e3 = s2;
            }
          }
          if (n2.$_terms.externals && i2.externals && false !== i2._externals)
            for (const { method: e4 } of n2.$_terms.externals)
              a2.mainstay.externals.push({ method: e4, schema: n2, state: a2, label: l.label(n2._flags, a2, i2) });
          const o2 = { value: e3, errors: t3.length ? t3 : null };
          return n2._flags.result && (o2.value = "strip" === n2._flags.result ? void 0 : r2.original, a2.mainstay.tracer.value(a2, n2._flags.result, e3, o2.value), a2.shadow(e3, n2._flags.result)), n2._cache && false !== i2.cache && !n2._refs.length && n2._cache.set(r2.original, o2), void 0 === e3 || o2.errors || void 0 === n2._flags.artifact || (a2.mainstay.artifacts = a2.mainstay.artifacts || /* @__PURE__ */ new Map(), a2.mainstay.artifacts.has(n2._flags.artifact) || a2.mainstay.artifacts.set(n2._flags.artifact, []), a2.mainstay.artifacts.get(n2._flags.artifact).push(a2.path)), o2;
        }, u.prefs = function(e3, t3) {
          const r2 = t3 === o.defaults;
          return r2 && e3._preferences[o.symbols.prefs] ? e3._preferences[o.symbols.prefs] : (t3 = o.preferences(t3, e3._preferences), r2 && (e3._preferences[o.symbols.prefs] = t3), t3);
        }, u.default = function(e3, t3, r2, s2) {
          const { schema: a2, state: i2, prefs: l2 } = s2, c2 = a2._flags[e3];
          if (l2.noDefaults || void 0 === c2)
            return t3;
          if (i2.mainstay.tracer.log(a2, i2, "rule", e3, "full"), !c2)
            return c2;
          if ("function" == typeof c2) {
            const t4 = c2.length ? [n(i2.ancestors[0]), s2] : [];
            try {
              return c2(...t4);
            } catch (t5) {
              return void r2.push(a2.$_createError(`any.${e3}`, null, { error: t5 }, i2, l2));
            }
          }
          return "object" != typeof c2 ? c2 : c2[o.symbols.literal] ? c2.literal : o.isResolvable(c2) ? c2.resolve(t3, i2, l2) : n(c2);
        }, u.trim = function(e3, t3) {
          if ("string" != typeof e3)
            return e3;
          const r2 = t3.$_getRule("trim");
          return r2 && r2.args.enabled ? e3.trim() : e3;
        }, u.ignore = { active: false, debug: a, entry: a, filter: a, log: a, resolve: a, value: a }, u.errorsArray = function() {
          const e3 = [];
          return e3[o.symbols.errors] = true, e3;
        };
      }, 2036: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(9474), a = r(8160), i = {};
        e2.exports = i.Values = class {
          constructor(e3, t3) {
            this._values = new Set(e3), this._refs = new Set(t3), this._lowercase = i.lowercases(e3), this._override = false;
          }
          get length() {
            return this._values.size + this._refs.size;
          }
          add(e3, t3) {
            a.isResolvable(e3) ? this._refs.has(e3) || (this._refs.add(e3), t3 && t3.register(e3)) : this.has(e3, null, null, false) || (this._values.add(e3), "string" == typeof e3 && this._lowercase.set(e3.toLowerCase(), e3));
          }
          static merge(e3, t3, r2) {
            if (e3 = e3 || new i.Values(), t3) {
              if (t3._override)
                return t3.clone();
              for (const r3 of [...t3._values, ...t3._refs])
                e3.add(r3);
            }
            if (r2)
              for (const t4 of [...r2._values, ...r2._refs])
                e3.remove(t4);
            return e3.length ? e3 : null;
          }
          remove(e3) {
            a.isResolvable(e3) ? this._refs.delete(e3) : (this._values.delete(e3), "string" == typeof e3 && this._lowercase.delete(e3.toLowerCase()));
          }
          has(e3, t3, r2, s2) {
            return !!this.get(e3, t3, r2, s2);
          }
          get(e3, t3, r2, s2) {
            if (!this.length)
              return false;
            if (this._values.has(e3))
              return { value: e3 };
            if ("string" == typeof e3 && e3 && s2) {
              const t4 = this._lowercase.get(e3.toLowerCase());
              if (t4)
                return { value: t4 };
            }
            if (!this._refs.size && "object" != typeof e3)
              return false;
            if ("object" == typeof e3) {
              for (const t4 of this._values)
                if (n(t4, e3))
                  return { value: t4 };
            }
            if (t3)
              for (const a2 of this._refs) {
                const i2 = a2.resolve(e3, t3, r2, null, { in: true });
                if (void 0 === i2)
                  continue;
                const o = a2.in && "object" == typeof i2 ? Array.isArray(i2) ? i2 : Object.keys(i2) : [i2];
                for (const t4 of o)
                  if (typeof t4 == typeof e3) {
                    if (s2 && e3 && "string" == typeof e3) {
                      if (t4.toLowerCase() === e3.toLowerCase())
                        return { value: t4, ref: a2 };
                    } else if (n(t4, e3))
                      return { value: t4, ref: a2 };
                  }
              }
            return false;
          }
          override() {
            this._override = true;
          }
          values(e3) {
            if (e3 && e3.display) {
              const e4 = [];
              for (const t3 of [...this._values, ...this._refs])
                void 0 !== t3 && e4.push(t3);
              return e4;
            }
            return Array.from([...this._values, ...this._refs]);
          }
          clone() {
            const e3 = new i.Values(this._values, this._refs);
            return e3._override = this._override, e3;
          }
          concat(e3) {
            s(!e3._override, "Cannot concat override set of values");
            const t3 = new i.Values([...this._values, ...e3._values], [...this._refs, ...e3._refs]);
            return t3._override = this._override, t3;
          }
          describe() {
            const e3 = [];
            this._override && e3.push({ override: true });
            for (const t3 of this._values.values())
              e3.push(t3 && "object" == typeof t3 ? { value: t3 } : t3);
            for (const t3 of this._refs.values())
              e3.push(t3.describe());
            return e3;
          }
        }, i.Values.prototype[a.symbols.values] = true, i.Values.prototype.slice = i.Values.prototype.clone, i.lowercases = function(e3) {
          const t3 = /* @__PURE__ */ new Map();
          if (e3)
            for (const r2 of e3)
              "string" == typeof r2 && t3.set(r2.toLowerCase(), r2);
          return t3;
        };
      }, 978: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(1687), i = r(9621), o = {};
        e2.exports = function(e3, t3) {
          let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          if (s(e3 && "object" == typeof e3, "Invalid defaults value: must be an object"), s(!t3 || true === t3 || "object" == typeof t3, "Invalid source value: must be true, falsy or an object"), s("object" == typeof r2, "Invalid options: must be an object"), !t3)
            return null;
          if (r2.shallow)
            return o.applyToDefaultsWithShallow(e3, t3, r2);
          const i2 = n(e3);
          if (true === t3)
            return i2;
          const l = void 0 !== r2.nullOverride && r2.nullOverride;
          return a(i2, t3, { nullOverride: l, mergeArrays: false });
        }, o.applyToDefaultsWithShallow = function(e3, t3, r2) {
          const l = r2.shallow;
          s(Array.isArray(l), "Invalid keys");
          const c = /* @__PURE__ */ new Map(), u = true === t3 ? null : /* @__PURE__ */ new Set();
          for (let r3 of l) {
            r3 = Array.isArray(r3) ? r3 : r3.split(".");
            const s2 = i(e3, r3);
            s2 && "object" == typeof s2 ? c.set(s2, u && i(t3, r3) || s2) : u && u.add(r3);
          }
          const f = n(e3, {}, c);
          if (!u)
            return f;
          for (const e4 of u)
            o.reachCopy(f, t3, e4);
          const h = void 0 !== r2.nullOverride && r2.nullOverride;
          return a(f, t3, { nullOverride: h, mergeArrays: false });
        }, o.reachCopy = function(e3, t3, r2) {
          for (const e4 of r2) {
            if (!(e4 in t3))
              return;
            const r3 = t3[e4];
            if ("object" != typeof r3 || null === r3)
              return;
            t3 = r3;
          }
          const s2 = t3;
          let n2 = e3;
          for (let e4 = 0; e4 < r2.length - 1; ++e4) {
            const t4 = r2[e4];
            "object" != typeof n2[t4] && (n2[t4] = {}), n2 = n2[t4];
          }
          n2[r2[r2.length - 1]] = s2;
        };
      }, 375: (e2, t2, r) => {
        "use strict";
        const s = r(7916);
        e2.exports = function(e3) {
          if (!e3) {
            for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), n = 1; n < t3; n++)
              r2[n - 1] = arguments[n];
            if (1 === r2.length && r2[0] instanceof Error)
              throw r2[0];
            throw new s(r2);
          }
        };
      }, 8571: (e2, t2, r) => {
        "use strict";
        const s = r(9621), n = r(4277), a = r(7043), i = { needsProtoHack: /* @__PURE__ */ new Set([n.set, n.map, n.weakSet, n.weakMap]) };
        e2.exports = i.clone = function(e3) {
          let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
          if ("object" != typeof e3 || null === e3)
            return e3;
          let s2 = i.clone, o = r2;
          if (t3.shallow) {
            if (true !== t3.shallow)
              return i.cloneWithShallow(e3, t3);
            s2 = (e4) => e4;
          } else if (o) {
            const t4 = o.get(e3);
            if (t4)
              return t4;
          } else
            o = /* @__PURE__ */ new Map();
          const l = n.getInternalProto(e3);
          if (l === n.buffer)
            return false;
          if (l === n.date)
            return new Date(e3.getTime());
          if (l === n.regex)
            return new RegExp(e3);
          const c = i.base(e3, l, t3);
          if (c === e3)
            return e3;
          if (o && o.set(e3, c), l === n.set)
            for (const r3 of e3)
              c.add(s2(r3, t3, o));
          else if (l === n.map)
            for (const [r3, n2] of e3)
              c.set(r3, s2(n2, t3, o));
          const u = a.keys(e3, t3);
          for (const r3 of u) {
            if ("__proto__" === r3)
              continue;
            if (l === n.array && "length" === r3) {
              c.length = e3.length;
              continue;
            }
            const a2 = Object.getOwnPropertyDescriptor(e3, r3);
            a2 ? a2.get || a2.set ? Object.defineProperty(c, r3, a2) : a2.enumerable ? c[r3] = s2(e3[r3], t3, o) : Object.defineProperty(c, r3, { enumerable: false, writable: true, configurable: true, value: s2(e3[r3], t3, o) }) : Object.defineProperty(c, r3, { enumerable: true, writable: true, configurable: true, value: s2(e3[r3], t3, o) });
          }
          return c;
        }, i.cloneWithShallow = function(e3, t3) {
          const r2 = t3.shallow;
          (t3 = Object.assign({}, t3)).shallow = false;
          const n2 = /* @__PURE__ */ new Map();
          for (const t4 of r2) {
            const r3 = s(e3, t4);
            "object" != typeof r3 && "function" != typeof r3 || n2.set(r3, r3);
          }
          return i.clone(e3, t3, n2);
        }, i.base = function(e3, t3, r2) {
          if (false === r2.prototype)
            return i.needsProtoHack.has(t3) ? new t3.constructor() : t3 === n.array ? [] : {};
          const s2 = Object.getPrototypeOf(e3);
          if (s2 && s2.isImmutable)
            return e3;
          if (t3 === n.array) {
            const e4 = [];
            return s2 !== t3 && Object.setPrototypeOf(e4, s2), e4;
          }
          if (i.needsProtoHack.has(t3)) {
            const e4 = new s2.constructor();
            return s2 !== t3 && Object.setPrototypeOf(e4, s2), e4;
          }
          return Object.create(s2);
        };
      }, 9474: (e2, t2, r) => {
        "use strict";
        const s = r(4277), n = { mismatched: null };
        e2.exports = function(e3, t3, r2) {
          return r2 = Object.assign({ prototype: true }, r2), !!n.isDeepEqual(e3, t3, r2, []);
        }, n.isDeepEqual = function(e3, t3, r2, a) {
          if (e3 === t3)
            return 0 !== e3 || 1 / e3 == 1 / t3;
          const i = typeof e3;
          if (i !== typeof t3)
            return false;
          if (null === e3 || null === t3)
            return false;
          if ("function" === i) {
            if (!r2.deepFunction || e3.toString() !== t3.toString())
              return false;
          } else if ("object" !== i)
            return e3 != e3 && t3 != t3;
          const o = n.getSharedType(e3, t3, !!r2.prototype);
          switch (o) {
            case s.buffer:
              return false;
            case s.promise:
              return e3 === t3;
            case s.regex:
              return e3.toString() === t3.toString();
            case n.mismatched:
              return false;
          }
          for (let r3 = a.length - 1; r3 >= 0; --r3)
            if (a[r3].isSame(e3, t3))
              return true;
          a.push(new n.SeenEntry(e3, t3));
          try {
            return !!n.isDeepEqualObj(o, e3, t3, r2, a);
          } finally {
            a.pop();
          }
        }, n.getSharedType = function(e3, t3, r2) {
          if (r2)
            return Object.getPrototypeOf(e3) !== Object.getPrototypeOf(t3) ? n.mismatched : s.getInternalProto(e3);
          const a = s.getInternalProto(e3);
          return a !== s.getInternalProto(t3) ? n.mismatched : a;
        }, n.valueOf = function(e3) {
          const t3 = e3.valueOf;
          if (void 0 === t3)
            return e3;
          try {
            return t3.call(e3);
          } catch (e4) {
            return e4;
          }
        }, n.hasOwnEnumerableProperty = function(e3, t3) {
          return Object.prototype.propertyIsEnumerable.call(e3, t3);
        }, n.isSetSimpleEqual = function(e3, t3) {
          for (const r2 of Set.prototype.values.call(e3))
            if (!Set.prototype.has.call(t3, r2))
              return false;
          return true;
        }, n.isDeepEqualObj = function(e3, t3, r2, a, i) {
          const { isDeepEqual: o, valueOf: l, hasOwnEnumerableProperty: c } = n, { keys: u, getOwnPropertySymbols: f } = Object;
          if (e3 === s.array) {
            if (!a.part) {
              if (t3.length !== r2.length)
                return false;
              for (let e4 = 0; e4 < t3.length; ++e4)
                if (!o(t3[e4], r2[e4], a, i))
                  return false;
              return true;
            }
            for (const e4 of t3)
              for (const t4 of r2)
                if (o(e4, t4, a, i))
                  return true;
          } else if (e3 === s.set) {
            if (t3.size !== r2.size)
              return false;
            if (!n.isSetSimpleEqual(t3, r2)) {
              const e4 = new Set(Set.prototype.values.call(r2));
              for (const r3 of Set.prototype.values.call(t3)) {
                if (e4.delete(r3))
                  continue;
                let t4 = false;
                for (const s2 of e4)
                  if (o(r3, s2, a, i)) {
                    e4.delete(s2), t4 = true;
                    break;
                  }
                if (!t4)
                  return false;
              }
            }
          } else if (e3 === s.map) {
            if (t3.size !== r2.size)
              return false;
            for (const [e4, s2] of Map.prototype.entries.call(t3)) {
              if (void 0 === s2 && !Map.prototype.has.call(r2, e4))
                return false;
              if (!o(s2, Map.prototype.get.call(r2, e4), a, i))
                return false;
            }
          } else if (e3 === s.error && (t3.name !== r2.name || t3.message !== r2.message))
            return false;
          const h = l(t3), m = l(r2);
          if ((t3 !== h || r2 !== m) && !o(h, m, a, i))
            return false;
          const d = u(t3);
          if (!a.part && d.length !== u(r2).length && !a.skip)
            return false;
          let p = 0;
          for (const e4 of d)
            if (a.skip && a.skip.includes(e4))
              void 0 === r2[e4] && ++p;
            else {
              if (!c(r2, e4))
                return false;
              if (!o(t3[e4], r2[e4], a, i))
                return false;
            }
          if (!a.part && d.length - p !== u(r2).length)
            return false;
          if (false !== a.symbols) {
            const e4 = f(t3), s2 = new Set(f(r2));
            for (const n2 of e4) {
              if (!a.skip || !a.skip.includes(n2)) {
                if (c(t3, n2)) {
                  if (!c(r2, n2))
                    return false;
                  if (!o(t3[n2], r2[n2], a, i))
                    return false;
                } else if (c(r2, n2))
                  return false;
              }
              s2.delete(n2);
            }
            for (const e5 of s2)
              if (c(r2, e5))
                return false;
          }
          return true;
        }, n.SeenEntry = class {
          constructor(e3, t3) {
            this.obj = e3, this.ref = t3;
          }
          isSame(e3, t3) {
            return this.obj === e3 && this.ref === t3;
          }
        };
      }, 7916: (e2, t2, r) => {
        "use strict";
        const s = r(8761);
        e2.exports = class extends Error {
          constructor(e3) {
            super(e3.filter((e4) => "" !== e4).map((e4) => "string" == typeof e4 ? e4 : e4 instanceof Error ? e4.message : s(e4)).join(" ") || "Unknown error"), "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, t2.assert);
          }
        };
      }, 5277: (e2) => {
        "use strict";
        const t2 = {};
        e2.exports = function(e3) {
          if (!e3)
            return "";
          let r = "";
          for (let s = 0; s < e3.length; ++s) {
            const n = e3.charCodeAt(s);
            t2.isSafe(n) ? r += e3[s] : r += t2.escapeHtmlChar(n);
          }
          return r;
        }, t2.escapeHtmlChar = function(e3) {
          return t2.namedHtml.get(e3) || (e3 >= 256 ? "&#" + e3 + ";" : `&#x${e3.toString(16).padStart(2, "0")};`);
        }, t2.isSafe = function(e3) {
          return t2.safeCharCodes.has(e3);
        }, t2.namedHtml = /* @__PURE__ */ new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [34, "&quot;"], [160, "&nbsp;"], [162, "&cent;"], [163, "&pound;"], [164, "&curren;"], [169, "&copy;"], [174, "&reg;"]]), t2.safeCharCodes = function() {
          const e3 = /* @__PURE__ */ new Set();
          for (let t3 = 32; t3 < 123; ++t3)
            (t3 >= 97 || t3 >= 65 && t3 <= 90 || t3 >= 48 && t3 <= 57 || 32 === t3 || 46 === t3 || 44 === t3 || 45 === t3 || 58 === t3 || 95 === t3) && e3.add(t3);
          return e3;
        }();
      }, 6064: (e2) => {
        "use strict";
        e2.exports = function(e3) {
          return e3.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
        };
      }, 738: (e2) => {
        "use strict";
        e2.exports = function() {
        };
      }, 1687: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(8571), a = r(7043), i = {};
        e2.exports = i.merge = function(e3, t3, r2) {
          if (s(e3 && "object" == typeof e3, "Invalid target value: must be an object"), s(null == t3 || "object" == typeof t3, "Invalid source value: must be null, undefined, or an object"), !t3)
            return e3;
          if (r2 = Object.assign({ nullOverride: true, mergeArrays: true }, r2), Array.isArray(t3)) {
            s(Array.isArray(e3), "Cannot merge array onto an object"), r2.mergeArrays || (e3.length = 0);
            for (let s2 = 0; s2 < t3.length; ++s2)
              e3.push(n(t3[s2], { symbols: r2.symbols }));
            return e3;
          }
          const o = a.keys(t3, r2);
          for (let s2 = 0; s2 < o.length; ++s2) {
            const a2 = o[s2];
            if ("__proto__" === a2 || !Object.prototype.propertyIsEnumerable.call(t3, a2))
              continue;
            const l = t3[a2];
            if (l && "object" == typeof l) {
              if (e3[a2] === l)
                continue;
              !e3[a2] || "object" != typeof e3[a2] || Array.isArray(e3[a2]) !== Array.isArray(l) || l instanceof Date || l instanceof RegExp ? e3[a2] = n(l, { symbols: r2.symbols }) : i.merge(e3[a2], l, r2);
            } else
              (null != l || r2.nullOverride) && (e3[a2] = l);
          }
          return e3;
        };
      }, 9621: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = {};
        e2.exports = function(e3, t3, r2) {
          if (false === t3 || null == t3)
            return e3;
          "string" == typeof (r2 = r2 || {}) && (r2 = { separator: r2 });
          const a = Array.isArray(t3);
          s(!a || !r2.separator, "Separator option is not valid for array-based chain");
          const i = a ? t3 : t3.split(r2.separator || ".");
          let o = e3;
          for (let e4 = 0; e4 < i.length; ++e4) {
            let a2 = i[e4];
            const l = r2.iterables && n.iterables(o);
            if (Array.isArray(o) || "set" === l) {
              const e5 = Number(a2);
              Number.isInteger(e5) && (a2 = e5 < 0 ? o.length + e5 : e5);
            }
            if (!o || "function" == typeof o && false === r2.functions || !l && void 0 === o[a2]) {
              s(!r2.strict || e4 + 1 === i.length, "Missing segment", a2, "in reach path ", t3), s("object" == typeof o || true === r2.functions || "function" != typeof o, "Invalid segment", a2, "in reach path ", t3), o = r2.default;
              break;
            }
            o = l ? "set" === l ? [...o][a2] : o.get(a2) : o[a2];
          }
          return o;
        }, n.iterables = function(e3) {
          return e3 instanceof Set ? "set" : e3 instanceof Map ? "map" : void 0;
        };
      }, 8761: (e2) => {
        "use strict";
        e2.exports = function() {
          try {
            return JSON.stringify(...arguments);
          } catch (e3) {
            return "[Cannot display object: " + e3.message + "]";
          }
        };
      }, 4277: (e2, t2) => {
        "use strict";
        const r = {};
        t2 = e2.exports = { array: Array.prototype, buffer: false, date: Date.prototype, error: Error.prototype, generic: Object.prototype, map: Map.prototype, promise: Promise.prototype, regex: RegExp.prototype, set: Set.prototype, weakMap: WeakMap.prototype, weakSet: WeakSet.prototype }, r.typeMap = /* @__PURE__ */ new Map([["[object Error]", t2.error], ["[object Map]", t2.map], ["[object Promise]", t2.promise], ["[object Set]", t2.set], ["[object WeakMap]", t2.weakMap], ["[object WeakSet]", t2.weakSet]]), t2.getInternalProto = function(e3) {
          if (Array.isArray(e3))
            return t2.array;
          if (e3 instanceof Date)
            return t2.date;
          if (e3 instanceof RegExp)
            return t2.regex;
          if (e3 instanceof Error)
            return t2.error;
          const s = Object.prototype.toString.call(e3);
          return r.typeMap.get(s) || t2.generic;
        };
      }, 7043: (e2, t2) => {
        "use strict";
        t2.keys = function(e3) {
          return false !== (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).symbols ? Reflect.ownKeys(e3) : Object.getOwnPropertyNames(e3);
        };
      }, 3652: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = {};
        t2.Sorter = class {
          constructor() {
            this._items = [], this.nodes = [];
          }
          add(e3, t3) {
            const r2 = [].concat((t3 = t3 || {}).before || []), n2 = [].concat(t3.after || []), a = t3.group || "?", i = t3.sort || 0;
            s(!r2.includes(a), `Item cannot come before itself: ${a}`), s(!r2.includes("?"), "Item cannot come before unassociated items"), s(!n2.includes(a), `Item cannot come after itself: ${a}`), s(!n2.includes("?"), "Item cannot come after unassociated items"), Array.isArray(e3) || (e3 = [e3]);
            for (const t4 of e3) {
              const e4 = { seq: this._items.length, sort: i, before: r2, after: n2, group: a, node: t4 };
              this._items.push(e4);
            }
            if (!t3.manual) {
              const e4 = this._sort();
              s(e4, "item", "?" !== a ? `added into group ${a}` : "", "created a dependencies error");
            }
            return this.nodes;
          }
          merge(e3) {
            Array.isArray(e3) || (e3 = [e3]);
            for (const t4 of e3)
              if (t4)
                for (const e4 of t4._items)
                  this._items.push(Object.assign({}, e4));
            this._items.sort(n.mergeSort);
            for (let e4 = 0; e4 < this._items.length; ++e4)
              this._items[e4].seq = e4;
            const t3 = this._sort();
            return s(t3, "merge created a dependencies error"), this.nodes;
          }
          sort() {
            const e3 = this._sort();
            return s(e3, "sort created a dependencies error"), this.nodes;
          }
          _sort() {
            const e3 = {}, t3 = /* @__PURE__ */ Object.create(null), r2 = /* @__PURE__ */ Object.create(null);
            for (const s3 of this._items) {
              const n3 = s3.seq, a2 = s3.group;
              r2[a2] = r2[a2] || [], r2[a2].push(n3), e3[n3] = s3.before;
              for (const e4 of s3.after)
                t3[e4] = t3[e4] || [], t3[e4].push(n3);
            }
            for (const t4 in e3) {
              const s3 = [];
              for (const n3 in e3[t4]) {
                const a2 = e3[t4][n3];
                r2[a2] = r2[a2] || [], s3.push(...r2[a2]);
              }
              e3[t4] = s3;
            }
            for (const s3 in t3)
              if (r2[s3])
                for (const n3 of r2[s3])
                  e3[n3].push(...t3[s3]);
            const s2 = {};
            for (const t4 in e3) {
              const r3 = e3[t4];
              for (const e4 of r3)
                s2[e4] = s2[e4] || [], s2[e4].push(t4);
            }
            const n2 = {}, a = [];
            for (let e4 = 0; e4 < this._items.length; ++e4) {
              let t4 = e4;
              if (s2[e4]) {
                t4 = null;
                for (let e5 = 0; e5 < this._items.length; ++e5) {
                  if (true === n2[e5])
                    continue;
                  s2[e5] || (s2[e5] = []);
                  const r3 = s2[e5].length;
                  let a2 = 0;
                  for (let t5 = 0; t5 < r3; ++t5)
                    n2[s2[e5][t5]] && ++a2;
                  if (a2 === r3) {
                    t4 = e5;
                    break;
                  }
                }
              }
              null !== t4 && (n2[t4] = true, a.push(t4));
            }
            if (a.length !== this._items.length)
              return false;
            const i = {};
            for (const e4 of this._items)
              i[e4.seq] = e4;
            this._items = [], this.nodes = [];
            for (const e4 of a) {
              const t4 = i[e4];
              this.nodes.push(t4.node), this._items.push(t4);
            }
            return true;
          }
        }, n.mergeSort = (e3, t3) => e3.sort === t3.sort ? 0 : e3.sort < t3.sort ? -1 : 1;
      }, 5380: (e2, t2, r) => {
        "use strict";
        const s = r(443), n = r(2178), a = { minDomainSegments: 2, nonAsciiRx: /[^\x00-\x7f]/, domainControlRx: /[\x00-\x20@\:\/\\#!\$&\'\(\)\*\+,;=\?]/, tldSegmentRx: /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, domainSegmentRx: /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, URL: s.URL || URL };
        t2.analyze = function(e3) {
          let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (!e3)
            return n.code("DOMAIN_NON_EMPTY_STRING");
          if ("string" != typeof e3)
            throw new Error("Invalid input: domain must be a string");
          if (e3.length > 256)
            return n.code("DOMAIN_TOO_LONG");
          if (a.nonAsciiRx.test(e3)) {
            if (false === t3.allowUnicode)
              return n.code("DOMAIN_INVALID_UNICODE_CHARS");
            e3 = e3.normalize("NFC");
          }
          if (a.domainControlRx.test(e3))
            return n.code("DOMAIN_INVALID_CHARS");
          e3 = a.punycode(e3), t3.allowFullyQualified && "." === e3[e3.length - 1] && (e3 = e3.slice(0, -1));
          const r2 = t3.minDomainSegments || a.minDomainSegments, s2 = e3.split(".");
          if (s2.length < r2)
            return n.code("DOMAIN_SEGMENTS_COUNT");
          if (t3.maxDomainSegments && s2.length > t3.maxDomainSegments)
            return n.code("DOMAIN_SEGMENTS_COUNT_MAX");
          const i = t3.tlds;
          if (i) {
            const e4 = s2[s2.length - 1].toLowerCase();
            if (i.deny && i.deny.has(e4) || i.allow && !i.allow.has(e4))
              return n.code("DOMAIN_FORBIDDEN_TLDS");
          }
          for (let e4 = 0; e4 < s2.length; ++e4) {
            const t4 = s2[e4];
            if (!t4.length)
              return n.code("DOMAIN_EMPTY_SEGMENT");
            if (t4.length > 63)
              return n.code("DOMAIN_LONG_SEGMENT");
            if (e4 < s2.length - 1) {
              if (!a.domainSegmentRx.test(t4))
                return n.code("DOMAIN_INVALID_CHARS");
            } else if (!a.tldSegmentRx.test(t4))
              return n.code("DOMAIN_INVALID_TLDS_CHARS");
          }
          return null;
        }, t2.isValid = function(e3, r2) {
          return !t2.analyze(e3, r2);
        }, a.punycode = function(e3) {
          e3.includes("%") && (e3 = e3.replace(/%/g, "%25"));
          try {
            return new a.URL(`http://${e3}`).host;
          } catch (t3) {
            return e3;
          }
        };
      }, 1745: (e2, t2, r) => {
        "use strict";
        const s = r(9848), n = r(5380), a = r(2178), i = { nonAsciiRx: /[^\x00-\x7f]/, encoder: new (s.TextEncoder || TextEncoder)() };
        t2.analyze = function(e3, t3) {
          return i.email(e3, t3);
        }, t2.isValid = function(e3, t3) {
          return !i.email(e3, t3);
        }, i.email = function(e3) {
          let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if ("string" != typeof e3)
            throw new Error("Invalid input: email must be a string");
          if (!e3)
            return a.code("EMPTY_STRING");
          const r2 = !i.nonAsciiRx.test(e3);
          if (!r2) {
            if (false === t3.allowUnicode)
              return a.code("FORBIDDEN_UNICODE");
            e3 = e3.normalize("NFC");
          }
          const s2 = e3.split("@");
          if (2 !== s2.length)
            return s2.length > 2 ? a.code("MULTIPLE_AT_CHAR") : a.code("MISSING_AT_CHAR");
          const [o, l] = s2;
          if (!o)
            return a.code("EMPTY_LOCAL");
          if (!t3.ignoreLength) {
            if (e3.length > 254)
              return a.code("ADDRESS_TOO_LONG");
            if (i.encoder.encode(o).length > 64)
              return a.code("LOCAL_TOO_LONG");
          }
          return i.local(o, r2) || n.analyze(l, t3);
        }, i.local = function(e3, t3) {
          const r2 = e3.split(".");
          for (const e4 of r2) {
            if (!e4.length)
              return a.code("EMPTY_LOCAL_SEGMENT");
            if (t3) {
              if (!i.atextRx.test(e4))
                return a.code("INVALID_LOCAL_CHARS");
            } else
              for (const t4 of e4) {
                if (i.atextRx.test(t4))
                  continue;
                const e5 = i.binary(t4);
                if (!i.atomRx.test(e5))
                  return a.code("INVALID_LOCAL_CHARS");
              }
          }
        }, i.binary = function(e3) {
          return Array.from(i.encoder.encode(e3)).map((e4) => String.fromCharCode(e4)).join("");
        }, i.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/, i.atomRx = new RegExp(["(?:[\\xc2-\\xdf][\\x80-\\xbf])", "(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})", "(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})"].join("|"));
      }, 2178: (e2, t2) => {
        "use strict";
        t2.codes = { EMPTY_STRING: "Address must be a non-empty string", FORBIDDEN_UNICODE: "Address contains forbidden Unicode characters", MULTIPLE_AT_CHAR: "Address cannot contain more than one @ character", MISSING_AT_CHAR: "Address must contain one @ character", EMPTY_LOCAL: "Address local part cannot be empty", ADDRESS_TOO_LONG: "Address too long", LOCAL_TOO_LONG: "Address local part too long", EMPTY_LOCAL_SEGMENT: "Address local part contains empty dot-separated segment", INVALID_LOCAL_CHARS: "Address local part contains invalid character", DOMAIN_NON_EMPTY_STRING: "Domain must be a non-empty string", DOMAIN_TOO_LONG: "Domain too long", DOMAIN_INVALID_UNICODE_CHARS: "Domain contains forbidden Unicode characters", DOMAIN_INVALID_CHARS: "Domain contains invalid character", DOMAIN_INVALID_TLDS_CHARS: "Domain contains invalid tld character", DOMAIN_SEGMENTS_COUNT: "Domain lacks the minimum required number of segments", DOMAIN_SEGMENTS_COUNT_MAX: "Domain contains too many segments", DOMAIN_FORBIDDEN_TLDS: "Domain uses forbidden TLD", DOMAIN_EMPTY_SEGMENT: "Domain contains empty dot-separated segment", DOMAIN_LONG_SEGMENT: "Domain contains dot-separated segment that is too long" }, t2.code = function(e3) {
          return { code: e3, error: t2.codes[e3] };
        };
      }, 9959: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(5752);
        t2.regex = function() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          s(void 0 === e3.cidr || "string" == typeof e3.cidr, "options.cidr must be a string");
          const t3 = e3.cidr ? e3.cidr.toLowerCase() : "optional";
          s(["required", "optional", "forbidden"].includes(t3), "options.cidr must be one of required, optional, forbidden"), s(void 0 === e3.version || "string" == typeof e3.version || Array.isArray(e3.version), "options.version must be a string or an array of string");
          let r2 = e3.version || ["ipv4", "ipv6", "ipvfuture"];
          Array.isArray(r2) || (r2 = [r2]), s(r2.length >= 1, "options.version must have at least 1 version specified");
          for (let e4 = 0; e4 < r2.length; ++e4)
            s("string" == typeof r2[e4], "options.version must only contain strings"), r2[e4] = r2[e4].toLowerCase(), s(["ipv4", "ipv6", "ipvfuture"].includes(r2[e4]), "options.version contains unknown version " + r2[e4] + " - must be one of ipv4, ipv6, ipvfuture");
          r2 = Array.from(new Set(r2));
          const a = `(?:${r2.map((e4) => {
            if ("forbidden" === t3)
              return n.ip[e4];
            const r3 = `\\/${"ipv4" === e4 ? n.ip.v4Cidr : n.ip.v6Cidr}`;
            return "required" === t3 ? `${n.ip[e4]}${r3}` : `${n.ip[e4]}(?:${r3})?`;
          }).join("|")})`, i = new RegExp(`^${a}$`);
          return { cidr: t3, versions: r2, regex: i, raw: a };
        };
      }, 5752: (e2, t2, r) => {
        "use strict";
        const s = r(375), n = r(6064), a = { generate: function() {
          const e3 = {}, t3 = "\\dA-Fa-f", r2 = "[" + t3 + "]", s2 = "\\w-\\.~", n2 = "!\\$&'\\(\\)\\*\\+,;=", a2 = "%" + t3, i = s2 + a2 + n2 + ":@", o = "[" + i + "]", l = "(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
          e3.ipv4address = "(?:" + l + "\\.){3}" + l;
          const c = r2 + "{1,4}", u = "(?:" + c + ":" + c + "|" + e3.ipv4address + ")", f = "(?:" + c + ":){6}" + u, h = "::(?:" + c + ":){5}" + u, m = "(?:" + c + ")?::(?:" + c + ":){4}" + u, d = "(?:(?:" + c + ":){0,1}" + c + ")?::(?:" + c + ":){3}" + u, p = "(?:(?:" + c + ":){0,2}" + c + ")?::(?:" + c + ":){2}" + u, g = "(?:(?:" + c + ":){0,3}" + c + ")?::" + c + ":" + u, y = "(?:(?:" + c + ":){0,4}" + c + ")?::" + u, b = "(?:(?:" + c + ":){0,5}" + c + ")?::" + c, v = "(?:(?:" + c + ":){0,6}" + c + ")?::";
          e3.ipv4Cidr = "(?:\\d|[1-2]\\d|3[0-2])", e3.ipv6Cidr = "(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])", e3.ipv6address = "(?:" + f + "|" + h + "|" + m + "|" + d + "|" + p + "|" + g + "|" + y + "|" + b + "|" + v + ")", e3.ipvFuture = "v" + r2 + "+\\.[" + s2 + n2 + ":]+", e3.scheme = "[a-zA-Z][a-zA-Z\\d+-\\.]*", e3.schemeRegex = new RegExp(e3.scheme);
          const _ = "[" + s2 + a2 + n2 + ":]*", w = "[" + s2 + a2 + n2 + "]{1,255}", $ = "(?:\\[(?:" + e3.ipv6address + "|" + e3.ipvFuture + ")\\]|" + e3.ipv4address + "|" + w + ")", x = "(?:" + _ + "@)?" + $ + "(?::\\d*)?", j = "(?:" + _ + "@)?(" + $ + ")(?::\\d*)?", k = o + "*", R = o + "+", A = "(?:\\/" + k + ")*", S = "\\/(?:" + R + A + ")?", O = R + A, E = "[" + s2 + a2 + n2 + "@]+" + A, D = "(?:\\/\\/\\/" + k + A + ")";
          return e3.hierPart = "(?:(?:\\/\\/" + x + A + ")|" + S + "|" + O + "|" + D + ")", e3.hierPartCapture = "(?:(?:\\/\\/" + j + A + ")|" + S + "|" + O + ")", e3.relativeRef = "(?:(?:\\/\\/" + x + A + ")|" + S + "|" + E + "|)", e3.relativeRefCapture = "(?:(?:\\/\\/" + j + A + ")|" + S + "|" + E + "|)", e3.query = "[" + i + "\\/\\?]*(?=#|$)", e3.queryWithSquareBrackets = "[" + i + "\\[\\]\\/\\?]*(?=#|$)", e3.fragment = "[" + i + "\\/\\?]*", e3;
        } };
        a.rfc3986 = a.generate(), t2.ip = { v4Cidr: a.rfc3986.ipv4Cidr, v6Cidr: a.rfc3986.ipv6Cidr, ipv4: a.rfc3986.ipv4address, ipv6: a.rfc3986.ipv6address, ipvfuture: a.rfc3986.ipvFuture }, a.createRegex = function(e3) {
          const t3 = a.rfc3986, r2 = "(?:\\?" + (e3.allowQuerySquareBrackets ? t3.queryWithSquareBrackets : t3.query) + ")?(?:#" + t3.fragment + ")?", i = e3.domain ? t3.relativeRefCapture : t3.relativeRef;
          if (e3.relativeOnly)
            return a.wrap(i + r2);
          let o = "";
          if (e3.scheme) {
            s(e3.scheme instanceof RegExp || "string" == typeof e3.scheme || Array.isArray(e3.scheme), "scheme must be a RegExp, String, or Array");
            const r3 = [].concat(e3.scheme);
            s(r3.length >= 1, "scheme must have at least 1 scheme specified");
            const a2 = [];
            for (let e4 = 0; e4 < r3.length; ++e4) {
              const i2 = r3[e4];
              s(i2 instanceof RegExp || "string" == typeof i2, "scheme at position " + e4 + " must be a RegExp or String"), i2 instanceof RegExp ? a2.push(i2.source.toString()) : (s(t3.schemeRegex.test(i2), "scheme at position " + e4 + " must be a valid scheme"), a2.push(n(i2)));
            }
            o = a2.join("|");
          }
          const l = "(?:" + (o ? "(?:" + o + ")" : t3.scheme) + ":" + (e3.domain ? t3.hierPartCapture : t3.hierPart) + ")", c = e3.allowRelative ? "(?:" + l + "|" + i + ")" : l;
          return a.wrap(c + r2, o);
        }, a.wrap = function(e3, t3) {
          return { raw: e3 = `(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])${e3}`, regex: new RegExp(`^${e3}$`), scheme: t3 };
        }, a.uriRegex = a.createRegex({}), t2.regex = function() {
          let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return e3.scheme || e3.allowRelative || e3.relativeOnly || e3.allowQuerySquareBrackets || e3.domain ? a.createRegex(e3) : a.uriRegex;
        };
      }, 1447: (e2, t2) => {
        "use strict";
        const r = { operators: ["!", "^", "*", "/", "%", "+", "-", "<", "<=", ">", ">=", "==", "!=", "&&", "||", "??"], operatorCharacters: ["!", "^", "*", "/", "%", "+", "-", "<", "=", ">", "&", "|", "?"], operatorsOrder: [["^"], ["*", "/", "%"], ["+", "-"], ["<", "<=", ">", ">="], ["==", "!="], ["&&"], ["||", "??"]], operatorsPrefix: ["!", "n"], literals: { '"': '"', "`": "`", "'": "'", "[": "]" }, numberRx: /^(?:[0-9]*(\.[0-9]*)?){1}$/, tokenRx: /^[\w\$\#\.\@\:\{\}]+$/, symbol: Symbol("formula"), settings: Symbol("settings") };
        t2.Parser = class {
          constructor(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!t3[r.settings] && t3.constants)
              for (const e4 in t3.constants) {
                const r2 = t3.constants[e4];
                if (null !== r2 && !["boolean", "number", "string"].includes(typeof r2))
                  throw new Error(`Formula constant ${e4} contains invalid ${typeof r2} value type`);
              }
            this.settings = t3[r.settings] ? t3 : Object.assign({ [r.settings]: true, constants: {}, functions: {} }, t3), this.single = null, this._parts = null, this._parse(e3);
          }
          _parse(e3) {
            let s = [], n = "", a = 0, i = false;
            const o = (e4) => {
              if (a)
                throw new Error("Formula missing closing parenthesis");
              const o2 = s.length ? s[s.length - 1] : null;
              if (i || n || e4) {
                if (o2 && "reference" === o2.type && ")" === e4)
                  return o2.type = "function", o2.value = this._subFormula(n, o2.value), void (n = "");
                if (")" === e4) {
                  const e5 = new t2.Parser(n, this.settings);
                  s.push({ type: "segment", value: e5 });
                } else if (i) {
                  if ("]" === i)
                    return s.push({ type: "reference", value: n }), void (n = "");
                  s.push({ type: "literal", value: n });
                } else if (r.operatorCharacters.includes(n))
                  o2 && "operator" === o2.type && r.operators.includes(o2.value + n) ? o2.value += n : s.push({ type: "operator", value: n });
                else if (n.match(r.numberRx))
                  s.push({ type: "constant", value: parseFloat(n) });
                else if (void 0 !== this.settings.constants[n])
                  s.push({ type: "constant", value: this.settings.constants[n] });
                else {
                  if (!n.match(r.tokenRx))
                    throw new Error(`Formula contains invalid token: ${n}`);
                  s.push({ type: "reference", value: n });
                }
                n = "";
              }
            };
            for (const t3 of e3)
              i ? t3 === i ? (o(), i = false) : n += t3 : a ? "(" === t3 ? (n += t3, ++a) : ")" === t3 ? (--a, a ? n += t3 : o(t3)) : n += t3 : t3 in r.literals ? i = r.literals[t3] : "(" === t3 ? (o(), ++a) : r.operatorCharacters.includes(t3) ? (o(), n = t3, o()) : " " !== t3 ? n += t3 : o();
            o(), s = s.map((e4, t3) => "operator" !== e4.type || "-" !== e4.value || t3 && "operator" !== s[t3 - 1].type ? e4 : { type: "operator", value: "n" });
            let l = false;
            for (const e4 of s) {
              if ("operator" === e4.type) {
                if (r.operatorsPrefix.includes(e4.value))
                  continue;
                if (!l)
                  throw new Error("Formula contains an operator in invalid position");
                if (!r.operators.includes(e4.value))
                  throw new Error(`Formula contains an unknown operator ${e4.value}`);
              } else if (l)
                throw new Error("Formula missing expected operator");
              l = !l;
            }
            if (!l)
              throw new Error("Formula contains invalid trailing operator");
            1 === s.length && ["reference", "literal", "constant"].includes(s[0].type) && (this.single = { type: "reference" === s[0].type ? "reference" : "value", value: s[0].value }), this._parts = s.map((e4) => {
              if ("operator" === e4.type)
                return r.operatorsPrefix.includes(e4.value) ? e4 : e4.value;
              if ("reference" !== e4.type)
                return e4.value;
              if (this.settings.tokenRx && !this.settings.tokenRx.test(e4.value))
                throw new Error(`Formula contains invalid reference ${e4.value}`);
              return this.settings.reference ? this.settings.reference(e4.value) : r.reference(e4.value);
            });
          }
          _subFormula(e3, s) {
            const n = this.settings.functions[s];
            if ("function" != typeof n)
              throw new Error(`Formula contains unknown function ${s}`);
            let a = [];
            if (e3) {
              let t3 = "", n2 = 0, i = false;
              const o = () => {
                if (!t3)
                  throw new Error(`Formula contains function ${s} with invalid arguments ${e3}`);
                a.push(t3), t3 = "";
              };
              for (let s2 = 0; s2 < e3.length; ++s2) {
                const a2 = e3[s2];
                i ? (t3 += a2, a2 === i && (i = false)) : a2 in r.literals && !n2 ? (t3 += a2, i = r.literals[a2]) : "," !== a2 || n2 ? (t3 += a2, "(" === a2 ? ++n2 : ")" === a2 && --n2) : o();
              }
              o();
            }
            return a = a.map((e4) => new t2.Parser(e4, this.settings)), function(e4) {
              const t3 = [];
              for (const r2 of a)
                t3.push(r2.evaluate(e4));
              return n.call(e4, ...t3);
            };
          }
          evaluate(e3) {
            const t3 = this._parts.slice();
            for (let s = t3.length - 2; s >= 0; --s) {
              const n = t3[s];
              if (n && "operator" === n.type) {
                const a = t3[s + 1];
                t3.splice(s + 1, 1);
                const i = r.evaluate(a, e3);
                t3[s] = r.single(n.value, i);
              }
            }
            return r.operatorsOrder.forEach((s) => {
              for (let n = 1; n < t3.length - 1; )
                if (s.includes(t3[n])) {
                  const s2 = t3[n], a = r.evaluate(t3[n - 1], e3), i = r.evaluate(t3[n + 1], e3);
                  t3.splice(n, 2);
                  const o = r.calculate(s2, a, i);
                  t3[n - 1] = 0 === o ? 0 : o;
                } else
                  n += 2;
            }), r.evaluate(t3[0], e3);
          }
        }, t2.Parser.prototype[r.symbol] = true, r.reference = function(e3) {
          return function(t3) {
            return t3 && void 0 !== t3[e3] ? t3[e3] : null;
          };
        }, r.evaluate = function(e3, t3) {
          return null === e3 ? null : "function" == typeof e3 ? e3(t3) : e3[r.symbol] ? e3.evaluate(t3) : e3;
        }, r.single = function(e3, t3) {
          if ("!" === e3)
            return !t3;
          const r2 = -t3;
          return 0 === r2 ? 0 : r2;
        }, r.calculate = function(e3, t3, s) {
          if ("??" === e3)
            return r.exists(t3) ? t3 : s;
          if ("string" == typeof t3 || "string" == typeof s) {
            if ("+" === e3)
              return (t3 = r.exists(t3) ? t3 : "") + (r.exists(s) ? s : "");
          } else
            switch (e3) {
              case "^":
                return Math.pow(t3, s);
              case "*":
                return t3 * s;
              case "/":
                return t3 / s;
              case "%":
                return t3 % s;
              case "+":
                return t3 + s;
              case "-":
                return t3 - s;
            }
          switch (e3) {
            case "<":
              return t3 < s;
            case "<=":
              return t3 <= s;
            case ">":
              return t3 > s;
            case ">=":
              return t3 >= s;
            case "==":
              return t3 === s;
            case "!=":
              return t3 !== s;
            case "&&":
              return t3 && s;
            case "||":
              return t3 || s;
          }
          return null;
        }, r.exists = function(e3) {
          return null != e3;
        };
      }, 9926: () => {
      }, 5688: () => {
      }, 9708: () => {
      }, 1152: () => {
      }, 443: () => {
      }, 9848: () => {
      }, 5934: (e2) => {
        "use strict";
        e2.exports = { version: "17.9.1" };
      } }, t = {}, function r(s) {
        var n = t[s];
        if (void 0 !== n)
          return n.exports;
        var a = t[s] = { exports: {} };
        return e[s](a, a.exports, r), a.exports;
      }(5107);
      var e, t;
    });
  }
});
export default require_joi_browser_min();
//# sourceMappingURL=joi.js.map
