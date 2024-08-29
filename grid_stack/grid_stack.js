/*! For license information please see gridstack-all.js.LICENSE.txt */
!(function (e, t) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define([], t)
		: "object" == typeof exports
		? (exports.GridStack = t())
		: (e.GridStack = t());
})(self, () =>
	(() => {
		"use strict";
		var e = {
				d: (t, i) => {
					for (var s in i)
						e.o(i, s) &&
							!e.o(t, s) &&
							Object.defineProperty(t, s, { enumerable: !0, get: i[s] });
				},
				o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
			},
			t = {};
		e.d(t, { GridStack: () => C });
		class i {
			static getElements(e, t = document) {
				if ("string" == typeof e) {
					const i = "getElementById" in t ? t : void 0;
					if (i && !isNaN(+e[0])) {
						const t = i.getElementById(e);
						return t ? [t] : [];
					}
					let s = t.querySelectorAll(e);
					return (
						s.length ||
							"." === e[0] ||
							"#" === e[0] ||
							((s = t.querySelectorAll("." + e)),
							s.length || (s = t.querySelectorAll("#" + e))),
						Array.from(s)
					);
				}
				return [e];
			}
			static getElement(e, t = document) {
				if ("string" == typeof e) {
					const i = "getElementById" in t ? t : void 0;
					if (!e.length) return null;
					if (i && "#" === e[0]) return i.getElementById(e.substring(1));
					if ("#" === e[0] || "." === e[0] || "[" === e[0])
						return t.querySelector(e);
					if (i && !isNaN(+e[0])) return i.getElementById(e);
					let s = t.querySelector(e);
					return (
						i && !s && (s = i.getElementById(e)),
						s || (s = t.querySelector("." + e)),
						s
					);
				}
				return e;
			}
			static shouldSizeToContent(e, t = !1) {
				return (
					e?.grid &&
					(t
						? !0 === e.sizeToContent ||
						  (!0 === e.grid.opts.sizeToContent && void 0 === e.sizeToContent)
						: !!e.sizeToContent ||
						  (e.grid.opts.sizeToContent && !1 !== e.sizeToContent))
				);
			}
			static isIntercepted(e, t) {
				return !(
					e.y >= t.y + t.h ||
					e.y + e.h <= t.y ||
					e.x + e.w <= t.x ||
					e.x >= t.x + t.w
				);
			}
			static isTouching(e, t) {
				return i.isIntercepted(e, {
					x: t.x - 0.5,
					y: t.y - 0.5,
					w: t.w + 1,
					h: t.h + 1,
				});
			}
			static areaIntercept(e, t) {
				let i = e.x > t.x ? e.x : t.x,
					s = e.x + e.w < t.x + t.w ? e.x + e.w : t.x + t.w;
				if (s <= i) return 0;
				let o = e.y > t.y ? e.y : t.y,
					n = e.y + e.h < t.y + t.h ? e.y + e.h : t.y + t.h;
				return n <= o ? 0 : (s - i) * (n - o);
			}
			static area(e) {
				return e.w * e.h;
			}
			static sort(e, t = 1) {
				const i = 1e4;
				return e.sort((e, s) => {
					let o = t * ((e.y ?? i) - (s.y ?? i));
					return 0 === o ? t * ((e.x ?? i) - (s.x ?? i)) : o;
				});
			}
			static find(e, t) {
				return t ? e.find((e) => e.id === t) : void 0;
			}
			static createStylesheet(e, t, i) {
				let s = document.createElement("style");
				const o = i?.nonce;
				return (
					o && (s.nonce = o),
					s.setAttribute("type", "text/css"),
					s.setAttribute("gs-style-id", e),
					s.styleSheet
						? (s.styleSheet.cssText = "")
						: s.appendChild(document.createTextNode("")),
					t
						? t.insertBefore(s, t.firstChild)
						: (t = document.getElementsByTagName("head")[0]).appendChild(s),
					s.sheet
				);
			}
			static removeStylesheet(e, t) {
				let i = (t || document).querySelector("STYLE[gs-style-id=" + e + "]");
				i && i.parentNode && i.remove();
			}
			static addCSSRule(e, t, i) {
				"function" == typeof e.addRule
					? e.addRule(t, i)
					: "function" == typeof e.insertRule && e.insertRule(`${t}{${i}}`);
			}
			static toBool(e) {
				return "boolean" == typeof e
					? e
					: "string" == typeof e
					? !(
							"" === (e = e.toLowerCase()) ||
							"no" === e ||
							"false" === e ||
							"0" === e
					  )
					: Boolean(e);
			}
			static toNumber(e) {
				return null === e || 0 === e.length ? void 0 : Number(e);
			}
			static parseHeight(e) {
				let t,
					i = "px";
				if ("string" == typeof e)
					if ("auto" === e || "" === e) t = 0;
					else {
						let s = e.match(
							/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%|cm|mm)?$/
						);
						if (!s) throw new Error(`Invalid height val = ${e}`);
						(i = s[2] || "px"), (t = parseFloat(s[1]));
					}
				else t = e;
				return { h: t, unit: i };
			}
			static defaults(e, ...t) {
				return (
					t.forEach((t) => {
						for (const i in t) {
							if (!t.hasOwnProperty(i)) return;
							null === e[i] || void 0 === e[i]
								? (e[i] = t[i])
								: "object" == typeof t[i] &&
								  "object" == typeof e[i] &&
								  this.defaults(e[i], t[i]);
						}
					}),
					e
				);
			}
			static same(e, t) {
				if ("object" != typeof e) return e == t;
				if (typeof e != typeof t) return !1;
				if (Object.keys(e).length !== Object.keys(t).length) return !1;
				for (const i in e) if (e[i] !== t[i]) return !1;
				return !0;
			}
			static copyPos(e, t, i = !1) {
				return (
					void 0 !== t.x && (e.x = t.x),
					void 0 !== t.y && (e.y = t.y),
					void 0 !== t.w && (e.w = t.w),
					void 0 !== t.h && (e.h = t.h),
					i &&
						(t.minW && (e.minW = t.minW),
						t.minH && (e.minH = t.minH),
						t.maxW && (e.maxW = t.maxW),
						t.maxH && (e.maxH = t.maxH)),
					e
				);
			}
			static samePos(e, t) {
				return (
					e &&
					t &&
					e.x === t.x &&
					e.y === t.y &&
					(e.w || 1) === (t.w || 1) &&
					(e.h || 1) === (t.h || 1)
				);
			}
			static sanitizeMinMax(e) {
				e.minW || delete e.minW,
					e.minH || delete e.minH,
					e.maxW || delete e.maxW,
					e.maxH || delete e.maxH;
			}
			static removeInternalAndSame(e, t) {
				if ("object" == typeof e && "object" == typeof t)
					for (let s in e) {
						const o = e[s],
							n = t[s];
						"_" === s[0] || o === n
							? delete e[s]
							: o &&
							  "object" == typeof o &&
							  void 0 !== n &&
							  (i.removeInternalAndSame(o, n),
							  Object.keys(o).length || delete e[s]);
					}
			}
			static removeInternalForSave(e, t = !0) {
				for (let t in e)
					("_" !== t[0] && null !== e[t] && void 0 !== e[t]) || delete e[t];
				delete e.grid,
					t && delete e.el,
					e.autoPosition || delete e.autoPosition,
					e.noResize || delete e.noResize,
					e.noMove || delete e.noMove,
					e.locked || delete e.locked,
					(1 !== e.w && e.w !== e.minW) || delete e.w,
					(1 !== e.h && e.h !== e.minH) || delete e.h;
			}
			static throttle(e, t) {
				let i = !1;
				return (...s) => {
					i ||
						((i = !0),
						setTimeout(() => {
							e(...s), (i = !1);
						}, t));
				};
			}
			static removePositioningStyles(e) {
				let t = e.style;
				t.position && t.removeProperty("position"),
					t.left && t.removeProperty("left"),
					t.top && t.removeProperty("top"),
					t.width && t.removeProperty("width"),
					t.height && t.removeProperty("height");
			}
			static getScrollElement(e) {
				if (!e) return document.scrollingElement || document.documentElement;
				const t = getComputedStyle(e);
				return /(auto|scroll)/.test(t.overflow + t.overflowY)
					? e
					: this.getScrollElement(e.parentElement);
			}
			static updateScrollPosition(e, t, i) {
				let s = e.getBoundingClientRect(),
					o = window.innerHeight || document.documentElement.clientHeight;
				if (s.top < 0 || s.bottom > o) {
					let n = s.bottom - o,
						r = s.top,
						l = this.getScrollElement(e);
					if (null !== l) {
						let h = l.scrollTop;
						s.top < 0 && i < 0
							? e.offsetHeight > o
								? (l.scrollTop += i)
								: (l.scrollTop += Math.abs(r) > Math.abs(i) ? i : r)
							: i > 0 &&
							  (e.offsetHeight > o
									? (l.scrollTop += i)
									: (l.scrollTop += n > i ? i : n)),
							(t.top += l.scrollTop - h);
					}
				}
			}
			static updateScrollResize(e, t, i) {
				const s = this.getScrollElement(t),
					o = s.clientHeight,
					n = s === this.getScrollElement() ? 0 : s.getBoundingClientRect().top,
					r = e.clientY - n,
					l = r > o - i;
				r < i
					? s.scrollBy({ behavior: "smooth", top: r - i })
					: l && s.scrollBy({ behavior: "smooth", top: i - (o - r) });
			}
			static clone(e) {
				return null == e || "object" != typeof e
					? e
					: e instanceof Array
					? [...e]
					: { ...e };
			}
			static cloneDeep(e) {
				const t = ["parentGrid", "el", "grid", "subGrid", "engine"],
					s = i.clone(e);
				for (const o in s)
					s.hasOwnProperty(o) &&
						"object" == typeof s[o] &&
						"__" !== o.substring(0, 2) &&
						!t.find((e) => e === o) &&
						(s[o] = i.cloneDeep(e[o]));
				return s;
			}
			static cloneNode(e) {
				const t = e.cloneNode(!0);
				return t.removeAttribute("id"), t;
			}
			static appendTo(e, t) {
				let s;
				(s = "string" == typeof t ? i.getElement(t) : t), s && s.appendChild(e);
			}
			static addElStyles(e, t) {
				if (t instanceof Object)
					for (const i in t)
						t.hasOwnProperty(i) &&
							(Array.isArray(t[i])
								? t[i].forEach((t) => {
										e.style[i] = t;
								  })
								: (e.style[i] = t[i]));
			}
			static initEvent(e, t) {
				const i = { type: t.type },
					s = {
						button: 0,
						which: 0,
						buttons: 1,
						bubbles: !0,
						cancelable: !0,
						target: t.target ? t.target : e.target,
					};
				return (
					["altKey", "ctrlKey", "metaKey", "shiftKey"].forEach(
						(t) => (i[t] = e[t])
					),
					[
						"pageX",
						"pageY",
						"clientX",
						"clientY",
						"screenX",
						"screenY",
					].forEach((t) => (i[t] = e[t])),
					{ ...i, ...s }
				);
			}
			static simulateMouseEvent(e, t, i) {
				const s = document.createEvent("MouseEvents");
				s.initMouseEvent(
					t,
					!0,
					!0,
					window,
					1,
					e.screenX,
					e.screenY,
					e.clientX,
					e.clientY,
					e.ctrlKey,
					e.altKey,
					e.shiftKey,
					e.metaKey,
					0,
					e.target
				),
					(i || e.target).dispatchEvent(s);
			}
			static getValuesFromTransformedElement(e) {
				const t = document.createElement("div");
				i.addElStyles(t, {
					opacity: "0",
					position: "fixed",
					top: "0px",
					left: "0px",
					width: "1px",
					height: "1px",
					zIndex: "-999999",
				}),
					e.appendChild(t);
				const s = t.getBoundingClientRect();
				return (
					e.removeChild(t),
					t.remove(),
					{
						xScale: 1 / s.width,
						yScale: 1 / s.height,
						xOffset: s.left,
						yOffset: s.top,
					}
				);
			}
			static swap(e, t, i) {
				if (!e) return;
				const s = e[t];
				(e[t] = e[i]), (e[i] = s);
			}
			static canBeRotated(e) {
				return !(
					!e ||
					e.w === e.h ||
					e.locked ||
					e.noResize ||
					e.grid?.opts.disableResize ||
					(e.minW && e.minW === e.maxW) ||
					(e.minH && e.minH === e.maxH)
				);
			}
		}
		class s {
			constructor(e = {}) {
				(this.addedNodes = []),
					(this.removedNodes = []),
					(this.column = e.column || 12),
					(this.maxRow = e.maxRow),
					(this._float = e.float),
					(this.nodes = e.nodes || []),
					(this.onChange = e.onChange);
			}
			batchUpdate(e = !0, t = !0) {
				return (
					!!this.batchMode === e ||
						((this.batchMode = e),
						e
							? ((this._prevFloat = this._float),
							  (this._float = !0),
							  this.cleanNodes(),
							  this.saveInitial())
							: ((this._float = this._prevFloat),
							  delete this._prevFloat,
							  t && this._packNodes(),
							  this._notify())),
					this
				);
			}
			_useEntireRowArea(e, t) {
				return (
					(!this.float || (this.batchMode && !this._prevFloat)) &&
					!this._hasLocked &&
					(!e._moving || e._skipDown || t.y <= e.y)
				);
			}
			_fixCollisions(e, t = e, s, o = {}) {
				if ((this.sortNodes(-1), !(s = s || this.collide(e, t)))) return !1;
				if (e._moving && !o.nested && !this.float && this.swap(e, s)) return !0;
				let n = t;
				!this._loading &&
					this._useEntireRowArea(e, t) &&
					((n = { x: 0, w: this.column, y: t.y, h: t.h }),
					(s = this.collide(e, n, o.skip)));
				let r = !1,
					l = { nested: !0, pack: !1 };
				for (; (s = s || this.collide(e, n, o.skip)); ) {
					let n;
					if (
						(s.locked ||
						this._loading ||
						(e._moving &&
							!e._skipDown &&
							t.y > e.y &&
							!this.float &&
							(!this.collide(s, { ...s, y: e.y }, e) ||
								!this.collide(s, { ...s, y: t.y - s.h }, e)))
							? ((e._skipDown = e._skipDown || t.y > e.y),
							  (n = this.moveNode(e, { ...t, y: s.y + s.h, ...l })),
							  (s.locked || this._loading) && n
									? i.copyPos(t, e)
									: !s.locked &&
									  n &&
									  o.pack &&
									  (this._packNodes(), (t.y = s.y + s.h), i.copyPos(e, t)),
							  (r = r || n))
							: (n = this.moveNode(s, { ...s, y: t.y + t.h, skip: e, ...l })),
						!n)
					)
						return r;
					s = void 0;
				}
				return r;
			}
			collide(e, t = e, s) {
				const o = e._id,
					n = s?._id;
				return this.nodes.find(
					(e) => e._id !== o && e._id !== n && i.isIntercepted(e, t)
				);
			}
			collideAll(e, t = e, s) {
				const o = e._id,
					n = s?._id;
				return this.nodes.filter(
					(e) => e._id !== o && e._id !== n && i.isIntercepted(e, t)
				);
			}
			directionCollideCoverage(e, t, i) {
				if (!t.rect || !e._rect) return;
				let s,
					o = e._rect,
					n = { ...t.rect };
				n.y > o.y ? ((n.h += n.y - o.y), (n.y = o.y)) : (n.h += o.y - n.y),
					n.x > o.x ? ((n.w += n.x - o.x), (n.x = o.x)) : (n.w += o.x - n.x);
				let r = 0.5;
				for (let e of i) {
					if (e.locked || !e._rect) break;
					let t = e._rect,
						i = Number.MAX_VALUE,
						l = Number.MAX_VALUE;
					o.y < t.y
						? (i = (n.y + n.h - t.y) / t.h)
						: o.y + o.h > t.y + t.h && (i = (t.y + t.h - n.y) / t.h),
						o.x < t.x
							? (l = (n.x + n.w - t.x) / t.w)
							: o.x + o.w > t.x + t.w && (l = (t.x + t.w - n.x) / t.w);
					let h = Math.min(l, i);
					h > r && ((r = h), (s = e));
				}
				return (t.collide = s), s;
			}
			cacheRects(e, t, i, s, o, n) {
				return (
					this.nodes.forEach(
						(r) =>
							(r._rect = {
								y: r.y * t + i,
								x: r.x * e + n,
								w: r.w * e - n - s,
								h: r.h * t - i - o,
							})
					),
					this
				);
			}
			swap(e, t) {
				if (!t || t.locked || !e || e.locked) return !1;
				function s() {
					let i = t.x,
						s = t.y;
					return (
						(t.x = e.x),
						(t.y = e.y),
						e.h != t.h
							? ((e.x = i), (e.y = t.y + t.h))
							: e.w != t.w
							? ((e.x = t.x + t.w), (e.y = s))
							: ((e.x = i), (e.y = s)),
						(e._dirty = t._dirty = !0),
						!0
					);
				}
				let o;
				if (
					e.w === t.w &&
					e.h === t.h &&
					(e.x === t.x || e.y === t.y) &&
					(o = i.isTouching(e, t))
				)
					return s();
				if (!1 !== o) {
					if (e.w === t.w && e.x === t.x && (o || (o = i.isTouching(e, t)))) {
						if (t.y < e.y) {
							let i = e;
							(e = t), (t = i);
						}
						return s();
					}
					if (!1 !== o) {
						if (e.h === t.h && e.y === t.y && (o || (o = i.isTouching(e, t)))) {
							if (t.x < e.x) {
								let i = e;
								(e = t), (t = i);
							}
							return s();
						}
						return !1;
					}
				}
			}
			isAreaEmpty(e, t, i, s) {
				let o = { x: e || 0, y: t || 0, w: i || 1, h: s || 1 };
				return !this.collide(o);
			}
			compact(e = "compact", t = !0) {
				if (0 === this.nodes.length) return this;
				t && this.sortNodes();
				const i = this.batchMode;
				i || this.batchUpdate();
				const s = this._inColumnResize;
				s || (this._inColumnResize = !0);
				let o = this.nodes;
				return (
					(this.nodes = []),
					o.forEach((t, i, s) => {
						let o;
						t.locked ||
							((t.autoPosition = !0), "list" === e && i && (o = s[i - 1])),
							this.addNode(t, !1, o);
					}),
					s || delete this._inColumnResize,
					i || this.batchUpdate(!1),
					this
				);
			}
			set float(e) {
				this._float !== e &&
					((this._float = e || !1), e || this._packNodes()._notify());
			}
			get float() {
				return this._float || !1;
			}
			sortNodes(e = 1) {
				return (this.nodes = i.sort(this.nodes, e)), this;
			}
			_packNodes() {
				return (
					this.batchMode ||
						(this.sortNodes(),
						this.float
							? this.nodes.forEach((e) => {
									if (e._updating || void 0 === e._orig || e.y === e._orig.y)
										return;
									let t = e.y;
									for (; t > e._orig.y; )
										--t,
											this.collide(e, { x: e.x, y: t, w: e.w, h: e.h }) ||
												((e._dirty = !0), (e.y = t));
							  })
							: this.nodes.forEach((e, t) => {
									if (!e.locked)
										for (; e.y > 0; ) {
											let i = 0 === t ? 0 : e.y - 1;
											if (
												0 !== t &&
												this.collide(e, { x: e.x, y: i, w: e.w, h: e.h })
											)
												break;
											(e._dirty = e.y !== i), (e.y = i);
										}
							  })),
					this
				);
			}
			prepareNode(e, t) {
				(e._id = e._id ?? s._idSeq++),
					(void 0 !== e.x && void 0 !== e.y && null !== e.x && null !== e.y) ||
						(e.autoPosition = !0);
				let o = { x: 0, y: 0, w: 1, h: 1 };
				return (
					i.defaults(e, o),
					e.autoPosition || delete e.autoPosition,
					e.noResize || delete e.noResize,
					e.noMove || delete e.noMove,
					i.sanitizeMinMax(e),
					"string" == typeof e.x && (e.x = Number(e.x)),
					"string" == typeof e.y && (e.y = Number(e.y)),
					"string" == typeof e.w && (e.w = Number(e.w)),
					"string" == typeof e.h && (e.h = Number(e.h)),
					isNaN(e.x) && ((e.x = o.x), (e.autoPosition = !0)),
					isNaN(e.y) && ((e.y = o.y), (e.autoPosition = !0)),
					isNaN(e.w) && (e.w = o.w),
					isNaN(e.h) && (e.h = o.h),
					this.nodeBoundFix(e, t),
					e
				);
			}
			nodeBoundFix(e, t) {
				let s = e._orig || i.copyPos({}, e);
				if (
					(e.maxW && (e.w = Math.min(e.w, e.maxW)),
					e.maxH && (e.h = Math.min(e.h, e.maxH)),
					e.minW && e.minW <= this.column && (e.w = Math.max(e.w, e.minW)),
					e.minH && (e.h = Math.max(e.h, e.minH)),
					(e.x || 0) + (e.w || 1) > this.column &&
						this.column < 12 &&
						!this._inColumnResize &&
						e._id &&
						-1 === this.findCacheLayout(e, 12))
				) {
					let t = { ...e };
					t.autoPosition || void 0 === t.x
						? (delete t.x, delete t.y)
						: (t.x = Math.min(11, t.x)),
						(t.w = Math.min(12, t.w || 1)),
						this.cacheOneLayout(t, 12);
				}
				return (
					e.w > this.column ? (e.w = this.column) : e.w < 1 && (e.w = 1),
					this.maxRow && e.h > this.maxRow
						? (e.h = this.maxRow)
						: e.h < 1 && (e.h = 1),
					e.x < 0 && (e.x = 0),
					e.y < 0 && (e.y = 0),
					e.x + e.w > this.column &&
						(t ? (e.w = this.column - e.x) : (e.x = this.column - e.w)),
					this.maxRow &&
						e.y + e.h > this.maxRow &&
						(t ? (e.h = this.maxRow - e.y) : (e.y = this.maxRow - e.h)),
					i.samePos(e, s) || (e._dirty = !0),
					this
				);
			}
			getDirtyNodes(e) {
				return e
					? this.nodes.filter((e) => e._dirty && !i.samePos(e, e._orig))
					: this.nodes.filter((e) => e._dirty);
			}
			_notify(e) {
				if (this.batchMode || !this.onChange) return this;
				let t = (e || []).concat(this.getDirtyNodes());
				return this.onChange(t), this;
			}
			cleanNodes() {
				return (
					this.batchMode ||
						this.nodes.forEach((e) => {
							delete e._dirty, delete e._lastTried;
						}),
					this
				);
			}
			saveInitial() {
				return (
					this.nodes.forEach((e) => {
						(e._orig = i.copyPos({}, e)), delete e._dirty;
					}),
					(this._hasLocked = this.nodes.some((e) => e.locked)),
					this
				);
			}
			restoreInitial() {
				return (
					this.nodes.forEach((e) => {
						i.samePos(e, e._orig) || (i.copyPos(e, e._orig), (e._dirty = !0));
					}),
					this._notify(),
					this
				);
			}
			findEmptyPosition(e, t = this.nodes, s = this.column, o) {
				let n = !1;
				for (let r = o ? o.y * s + (o.x + o.w) : 0; !n; ++r) {
					let o = r % s,
						l = Math.floor(r / s);
					if (o + e.w > s) continue;
					let h = { x: o, y: l, w: e.w, h: e.h };
					t.find((e) => i.isIntercepted(h, e)) ||
						((e.x === o && e.y === l) || (e._dirty = !0),
						(e.x = o),
						(e.y = l),
						delete e.autoPosition,
						(n = !0));
				}
				return n;
			}
			addNode(e, t = !1, i) {
				let s;
				return (
					this.nodes.find((t) => t._id === e._id) ||
					(this._inColumnResize ? this.nodeBoundFix(e) : this.prepareNode(e),
					delete e._temporaryRemoved,
					delete e._removeDOM,
					e.autoPosition &&
						this.findEmptyPosition(e, this.nodes, this.column, i) &&
						(delete e.autoPosition, (s = !0)),
					this.nodes.push(e),
					t && this.addedNodes.push(e),
					s || this._fixCollisions(e),
					this.batchMode || this._packNodes()._notify(),
					e)
				);
			}
			removeNode(e, t = !0, i = !1) {
				return this.nodes.find((t) => t._id === e._id)
					? (i && this.removedNodes.push(e),
					  t && (e._removeDOM = !0),
					  (this.nodes = this.nodes.filter((t) => t._id !== e._id)),
					  e._isAboutToRemove || this._packNodes(),
					  this._notify([e]),
					  this)
					: this;
			}
			removeAll(e = !0, t = !0) {
				if ((delete this._layouts, !this.nodes.length)) return this;
				e && this.nodes.forEach((e) => (e._removeDOM = !0));
				const i = this.nodes;
				return (
					(this.removedNodes = t ? i : []), (this.nodes = []), this._notify(i)
				);
			}
			moveNodeCheck(e, t) {
				if (!this.changedPosConstrain(e, t)) return !1;
				if (((t.pack = !0), !this.maxRow)) return this.moveNode(e, t);
				let o,
					n = new s({
						column: this.column,
						float: this.float,
						nodes: this.nodes.map((t) =>
							t._id === e._id ? ((o = { ...t }), o) : { ...t }
						),
					});
				if (!o) return !1;
				let r =
					n.moveNode(o, t) &&
					n.getRow() <= Math.max(this.getRow(), this.maxRow);
				if (!r && !t.resizing && t.collide) {
					let i = t.collide.el.gridstackNode;
					if (this.swap(e, i)) return this._notify(), !0;
				}
				return (
					!!r &&
					(n.nodes
						.filter((e) => e._dirty)
						.forEach((e) => {
							let t = this.nodes.find((t) => t._id === e._id);
							t && (i.copyPos(t, e), (t._dirty = !0));
						}),
					this._notify(),
					!0)
				);
			}
			willItFit(e) {
				if ((delete e._willFitPos, !this.maxRow)) return !0;
				let t = new s({
						column: this.column,
						float: this.float,
						nodes: this.nodes.map((e) => ({ ...e })),
					}),
					o = { ...e };
				return (
					this.cleanupNode(o),
					delete o.el,
					delete o._id,
					delete o.content,
					delete o.grid,
					t.addNode(o),
					t.getRow() <= this.maxRow && ((e._willFitPos = i.copyPos({}, o)), !0)
				);
			}
			changedPosConstrain(e, t) {
				return (
					(t.w = t.w || e.w),
					(t.h = t.h || e.h),
					e.x !== t.x ||
						e.y !== t.y ||
						(e.maxW && (t.w = Math.min(t.w, e.maxW)),
						e.maxH && (t.h = Math.min(t.h, e.maxH)),
						e.minW && (t.w = Math.max(t.w, e.minW)),
						e.minH && (t.h = Math.max(t.h, e.minH)),
						e.w !== t.w || e.h !== t.h)
				);
			}
			moveNode(e, t) {
				if (!e || !t) return !1;
				let s;
				void 0 !== t.pack || this.batchMode || (s = t.pack = !0),
					"number" != typeof t.x && (t.x = e.x),
					"number" != typeof t.y && (t.y = e.y),
					"number" != typeof t.w && (t.w = e.w),
					"number" != typeof t.h && (t.h = e.h);
				let o = e.w !== t.w || e.h !== t.h,
					n = i.copyPos({}, e, !0);
				if (
					(i.copyPos(n, t),
					this.nodeBoundFix(n, o),
					i.copyPos(t, n),
					!t.forceCollide && i.samePos(e, t))
				)
					return !1;
				let r = i.copyPos({}, e),
					l = this.collideAll(e, n, t.skip),
					h = !0;
				if (l.length) {
					let o = e._moving && !t.nested,
						r = o ? this.directionCollideCoverage(e, t, l) : l[0];
					if (o && r && e.grid?.opts?.subGridDynamic && !e.grid._isTemp) {
						let s = i.areaIntercept(t.rect, r._rect),
							o = i.area(t.rect),
							n = i.area(r._rect);
						s / (o < n ? o : n) > 0.8 &&
							(r.grid.makeSubGrid(r.el, void 0, e), (r = void 0));
					}
					r
						? (h = !this._fixCollisions(e, n, r, t))
						: ((h = !1), s && delete t.pack);
				}
				return (
					h && ((e._dirty = !0), i.copyPos(e, n)),
					t.pack && this._packNodes()._notify(),
					!i.samePos(e, r)
				);
			}
			getRow() {
				return this.nodes.reduce((e, t) => Math.max(e, t.y + t.h), 0);
			}
			beginUpdate(e) {
				return (
					e._updating ||
						((e._updating = !0),
						delete e._skipDown,
						this.batchMode || this.saveInitial()),
					this
				);
			}
			endUpdate() {
				let e = this.nodes.find((e) => e._updating);
				return e && (delete e._updating, delete e._skipDown), this;
			}
			save(e = !0, t) {
				let s = this._layouts?.length,
					o = s && this.column !== s - 1 ? this._layouts[s - 1] : null,
					n = [];
				return (
					this.sortNodes(),
					this.nodes.forEach((s) => {
						let r = o?.find((e) => e._id === s._id),
							l = { ...s, ...(r || {}) };
						i.removeInternalForSave(l, !e), t && t(s, l), n.push(l);
					}),
					n
				);
			}
			layoutsNodesChange(e) {
				return (
					!this._layouts ||
						this._inColumnResize ||
						this._layouts.forEach((t, i) => {
							if (!t || i === this.column) return this;
							if (i < this.column) this._layouts[i] = void 0;
							else {
								let s = i / this.column;
								e.forEach((e) => {
									if (!e._orig) return;
									let i = t.find((t) => t._id === e._id);
									i &&
										(i.y >= 0 && e.y !== e._orig.y && (i.y += e.y - e._orig.y),
										e.x !== e._orig.x && (i.x = Math.round(e.x * s)),
										e.w !== e._orig.w && (i.w = Math.round(e.w * s)));
								});
							}
						}),
					this
				);
			}
			columnChanged(e, t, s = "moveScale") {
				if (!this.nodes.length || !t || e === t) return this;
				if ("none" === s) return this;
				const o = "compact" === s || "list" === s;
				o && this.sortNodes(1),
					t < e && this.cacheLayout(this.nodes, e),
					this.batchUpdate();
				let n = [],
					r = o ? this.nodes : i.sort(this.nodes, -1);
				if (t > e && this._layouts) {
					const i = this._layouts[t] || [];
					let s = this._layouts.length - 1;
					!i.length &&
						e !== s &&
						this._layouts[s]?.length &&
						((e = s),
						this._layouts[s].forEach((e) => {
							let t = r.find((t) => t._id === e._id);
							t &&
								(o ||
									e.autoPosition ||
									((t.x = e.x ?? t.x), (t.y = e.y ?? t.y)),
								(t.w = e.w ?? t.w),
								(null != e.x && void 0 !== e.y) || (t.autoPosition = !0));
						})),
						i.forEach((e) => {
							let t = r.findIndex((t) => t._id === e._id);
							if (-1 !== t) {
								const i = r[t];
								if (o) return void (i.w = e.w);
								(e.autoPosition || isNaN(e.x) || isNaN(e.y)) &&
									this.findEmptyPosition(e, n),
									e.autoPosition ||
										((i.x = e.x ?? i.x),
										(i.y = e.y ?? i.y),
										(i.w = e.w ?? i.w),
										n.push(i)),
									r.splice(t, 1);
							}
						});
				}
				if (o) this.compact(s, !1);
				else {
					if (r.length)
						if ("function" == typeof s) s(t, e, n, r);
						else {
							let i = o ? 1 : t / e,
								l = "move" === s || "moveScale" === s,
								h = "scale" === s || "moveScale" === s;
							r.forEach((s) => {
								(s.x =
									1 === t ? 0 : l ? Math.round(s.x * i) : Math.min(s.x, t - 1)),
									(s.w =
										1 === t || 1 === e
											? 1
											: h
											? Math.round(s.w * i) || 1
											: Math.min(s.w, t)),
									n.push(s);
							}),
								(r = []);
						}
					(n = i.sort(n, -1)),
						(this._inColumnResize = !0),
						(this.nodes = []),
						n.forEach((e) => {
							this.addNode(e, !1), delete e._orig;
						});
				}
				return (
					this.nodes.forEach((e) => delete e._orig),
					this.batchUpdate(!1, !o),
					delete this._inColumnResize,
					this
				);
			}
			cacheLayout(e, t, i = !1) {
				let o = [];
				return (
					e.forEach((e, t) => {
						if (void 0 === e._id) {
							const t = e.id ? this.nodes.find((t) => t.id === e.id) : void 0;
							e._id = t?._id ?? s._idSeq++;
						}
						o[t] = { x: e.x, y: e.y, w: e.w, _id: e._id };
					}),
					(this._layouts = i ? [] : this._layouts || []),
					(this._layouts[t] = o),
					this
				);
			}
			cacheOneLayout(e, t) {
				e._id = e._id ?? s._idSeq++;
				let i = { x: e.x, y: e.y, w: e.w, _id: e._id };
				(e.autoPosition || void 0 === e.x) &&
					(delete i.x, delete i.y, e.autoPosition && (i.autoPosition = !0)),
					(this._layouts = this._layouts || []),
					(this._layouts[t] = this._layouts[t] || []);
				let o = this.findCacheLayout(e, t);
				return (
					-1 === o ? this._layouts[t].push(i) : (this._layouts[t][o] = i), this
				);
			}
			findCacheLayout(e, t) {
				return this._layouts?.[t]?.findIndex((t) => t._id === e._id) ?? -1;
			}
			removeNodeFromLayoutCache(e) {
				if (this._layouts)
					for (let t = 0; t < this._layouts.length; t++) {
						let i = this.findCacheLayout(e, t);
						-1 !== i && this._layouts[t].splice(i, 1);
					}
			}
			cleanupNode(e) {
				for (let t in e) "_" === t[0] && "_id" !== t && delete e[t];
				return this;
			}
		}
		s._idSeq = 0;
		const o = {
				alwaysShowResizeHandle: "mobile",
				animate: !0,
				auto: !0,
				cellHeight: "auto",
				cellHeightThrottle: 100,
				cellHeightUnit: "px",
				column: 12,
				draggable: {
					handle: ".grid-stack-item-content",
					appendTo: "body",
					scroll: !0,
				},
				handle: ".grid-stack-item-content",
				itemClass: "grid-stack-item",
				margin: 10,
				marginUnit: "px",
				maxRow: 0,
				minRow: 0,
				placeholderClass: "grid-stack-placeholder",
				placeholderText: "",
				removableOptions: {
					accept: "grid-stack-item",
					decline: "grid-stack-non-removable",
				},
				resizable: { handles: "se" },
				rtl: "auto",
			},
			n = { handle: ".grid-stack-item-content", appendTo: "body" };
		class r {}
		const l =
			"undefined" != typeof window &&
			"undefined" != typeof document &&
			("ontouchstart" in document ||
				"ontouchstart" in window ||
				(window.DocumentTouch && document instanceof window.DocumentTouch) ||
				navigator.maxTouchPoints > 0 ||
				navigator.msMaxTouchPoints > 0);
		class h {}
		function a(e, t) {
			if (e.touches.length > 1) return;
			e.cancelable && e.preventDefault();
			const i = e.changedTouches[0],
				s = document.createEvent("MouseEvents");
			s.initMouseEvent(
				t,
				!0,
				!0,
				window,
				1,
				i.screenX,
				i.screenY,
				i.clientX,
				i.clientY,
				!1,
				!1,
				!1,
				!1,
				0,
				null
			),
				e.target.dispatchEvent(s);
		}
		function d(e, t) {
			e.cancelable && e.preventDefault();
			const i = document.createEvent("MouseEvents");
			i.initMouseEvent(
				t,
				!0,
				!0,
				window,
				1,
				e.screenX,
				e.screenY,
				e.clientX,
				e.clientY,
				!1,
				!1,
				!1,
				!1,
				0,
				null
			),
				e.target.dispatchEvent(i);
		}
		function c(e) {
			h.touchHandled || ((h.touchHandled = !0), a(e, "mousedown"));
		}
		function g(e) {
			h.touchHandled && a(e, "mousemove");
		}
		function p(e) {
			if (!h.touchHandled) return;
			h.pointerLeaveTimeout &&
				(window.clearTimeout(h.pointerLeaveTimeout),
				delete h.pointerLeaveTimeout);
			const t = !!r.dragElement;
			a(e, "mouseup"), t || a(e, "click"), (h.touchHandled = !1);
		}
		function u(e) {
			"mouse" !== e.pointerType && e.target.releasePointerCapture(e.pointerId);
		}
		function m(e) {
			r.dragElement && "mouse" !== e.pointerType && d(e, "mouseenter");
		}
		function f(e) {
			r.dragElement &&
				"mouse" !== e.pointerType &&
				(h.pointerLeaveTimeout = window.setTimeout(() => {
					delete h.pointerLeaveTimeout, d(e, "mouseleave");
				}, 10));
		}
		class _ {
			constructor(e, t, i) {
				(this.host = e),
					(this.dir = t),
					(this.option = i),
					(this.moving = !1),
					(this._mouseDown = this._mouseDown.bind(this)),
					(this._mouseMove = this._mouseMove.bind(this)),
					(this._mouseUp = this._mouseUp.bind(this)),
					(this._keyEvent = this._keyEvent.bind(this)),
					this._init();
			}
			_init() {
				const e = (this.el = document.createElement("div"));
				return (
					e.classList.add("ui-resizable-handle"),
					e.classList.add(`${_.prefix}${this.dir}`),
					(e.style.zIndex = "100"),
					(e.style.userSelect = "none"),
					this.host.appendChild(this.el),
					this.el.addEventListener("mousedown", this._mouseDown),
					l &&
						(this.el.addEventListener("touchstart", c),
						this.el.addEventListener("pointerdown", u)),
					this
				);
			}
			destroy() {
				return (
					this.moving && this._mouseUp(this.mouseDownEvent),
					this.el.removeEventListener("mousedown", this._mouseDown),
					l &&
						(this.el.removeEventListener("touchstart", c),
						this.el.removeEventListener("pointerdown", u)),
					this.host.removeChild(this.el),
					delete this.el,
					delete this.host,
					this
				);
			}
			_mouseDown(e) {
				(this.mouseDownEvent = e),
					document.addEventListener("mousemove", this._mouseMove, {
						capture: !0,
						passive: !0,
					}),
					document.addEventListener("mouseup", this._mouseUp, !0),
					l &&
						(this.el.addEventListener("touchmove", g),
						this.el.addEventListener("touchend", p)),
					e.stopPropagation(),
					e.preventDefault();
			}
			_mouseMove(e) {
				let t = this.mouseDownEvent;
				this.moving
					? this._triggerEvent("move", e)
					: Math.abs(e.x - t.x) + Math.abs(e.y - t.y) > 2 &&
					  ((this.moving = !0),
					  this._triggerEvent("start", this.mouseDownEvent),
					  this._triggerEvent("move", e),
					  document.addEventListener("keydown", this._keyEvent)),
					e.stopPropagation();
			}
			_mouseUp(e) {
				this.moving &&
					(this._triggerEvent("stop", e),
					document.removeEventListener("keydown", this._keyEvent)),
					document.removeEventListener("mousemove", this._mouseMove, !0),
					document.removeEventListener("mouseup", this._mouseUp, !0),
					l &&
						(this.el.removeEventListener("touchmove", g),
						this.el.removeEventListener("touchend", p)),
					delete this.moving,
					delete this.mouseDownEvent,
					e.stopPropagation(),
					e.preventDefault();
			}
			_keyEvent(e) {
				"Escape" === e.key &&
					(this.host.gridstackNode?.grid?.engine.restoreInitial(),
					this._mouseUp(this.mouseDownEvent));
			}
			_triggerEvent(e, t) {
				return this.option[e] && this.option[e](t), this;
			}
		}
		_.prefix = "ui-resizable-";
		class y {
			constructor() {
				this._eventRegister = {};
			}
			get disabled() {
				return this._disabled;
			}
			on(e, t) {
				this._eventRegister[e] = t;
			}
			off(e) {
				delete this._eventRegister[e];
			}
			enable() {
				this._disabled = !1;
			}
			disable() {
				this._disabled = !0;
			}
			destroy() {
				delete this._eventRegister;
			}
			triggerEvent(e, t) {
				if (!this.disabled && this._eventRegister && this._eventRegister[e])
					return this._eventRegister[e](t);
			}
		}
		class v extends y {
			constructor(e, t = {}) {
				super(),
					(this.el = e),
					(this.option = t),
					(this.rectScale = { x: 1, y: 1 }),
					(this._ui = () => {
						const e = this.el.parentElement.getBoundingClientRect(),
							t = {
								width: this.originalRect.width,
								height: this.originalRect.height + this.scrolled,
								left: this.originalRect.left,
								top: this.originalRect.top - this.scrolled,
							},
							i = this.temporalRect || t;
						return {
							position: {
								left: (i.left - e.left) * this.rectScale.x,
								top: (i.top - e.top) * this.rectScale.y,
							},
							size: {
								width: i.width * this.rectScale.x,
								height: i.height * this.rectScale.y,
							},
						};
					}),
					(this._mouseOver = this._mouseOver.bind(this)),
					(this._mouseOut = this._mouseOut.bind(this)),
					this.enable(),
					this._setupAutoHide(this.option.autoHide),
					this._setupHandlers();
			}
			on(e, t) {
				super.on(e, t);
			}
			off(e) {
				super.off(e);
			}
			enable() {
				super.enable(),
					this.el.classList.remove("ui-resizable-disabled"),
					this._setupAutoHide(this.option.autoHide);
			}
			disable() {
				super.disable(),
					this.el.classList.add("ui-resizable-disabled"),
					this._setupAutoHide(!1);
			}
			destroy() {
				this._removeHandlers(),
					this._setupAutoHide(!1),
					delete this.el,
					super.destroy();
			}
			updateOption(e) {
				let t = e.handles && e.handles !== this.option.handles,
					i = e.autoHide && e.autoHide !== this.option.autoHide;
				return (
					Object.keys(e).forEach((t) => (this.option[t] = e[t])),
					t && (this._removeHandlers(), this._setupHandlers()),
					i && this._setupAutoHide(this.option.autoHide),
					this
				);
			}
			_setupAutoHide(e) {
				return (
					e
						? (this.el.classList.add("ui-resizable-autohide"),
						  this.el.addEventListener("mouseover", this._mouseOver),
						  this.el.addEventListener("mouseout", this._mouseOut))
						: (this.el.classList.remove("ui-resizable-autohide"),
						  this.el.removeEventListener("mouseover", this._mouseOver),
						  this.el.removeEventListener("mouseout", this._mouseOut),
						  r.overResizeElement === this && delete r.overResizeElement),
					this
				);
			}
			_mouseOver(e) {
				r.overResizeElement ||
					r.dragElement ||
					((r.overResizeElement = this),
					this.el.classList.remove("ui-resizable-autohide"));
			}
			_mouseOut(e) {
				r.overResizeElement === this &&
					(delete r.overResizeElement,
					this.el.classList.add("ui-resizable-autohide"));
			}
			_setupHandlers() {
				return (
					(this.handlers = this.option.handles
						.split(",")
						.map((e) => e.trim())
						.map(
							(e) =>
								new _(this.el, e, {
									start: (e) => {
										this._resizeStart(e);
									},
									stop: (e) => {
										this._resizeStop(e);
									},
									move: (t) => {
										this._resizing(t, e);
									},
								})
						)),
					this
				);
			}
			_resizeStart(e) {
				(this.sizeToContent = i.shouldSizeToContent(this.el.gridstackNode, !0)),
					(this.originalRect = this.el.getBoundingClientRect()),
					(this.scrollEl = i.getScrollElement(this.el)),
					(this.scrollY = this.scrollEl.scrollTop),
					(this.scrolled = 0),
					(this.startEvent = e),
					this._setupHelper(),
					this._applyChange();
				const t = i.initEvent(e, { type: "resizestart", target: this.el });
				return (
					this.option.start && this.option.start(t, this._ui()),
					this.el.classList.add("ui-resizable-resizing"),
					this.triggerEvent("resizestart", t),
					this
				);
			}
			_resizing(e, t) {
				(this.scrolled = this.scrollEl.scrollTop - this.scrollY),
					(this.temporalRect = this._getChange(e, t)),
					this._applyChange();
				const s = i.initEvent(e, { type: "resize", target: this.el });
				return (
					this.option.resize && this.option.resize(s, this._ui()),
					this.triggerEvent("resize", s),
					this
				);
			}
			_resizeStop(e) {
				const t = i.initEvent(e, { type: "resizestop", target: this.el });
				return (
					this.option.stop && this.option.stop(t),
					this.el.classList.remove("ui-resizable-resizing"),
					this.triggerEvent("resizestop", t),
					this._cleanHelper(),
					delete this.startEvent,
					delete this.originalRect,
					delete this.temporalRect,
					delete this.scrollY,
					delete this.scrolled,
					this
				);
			}
			_setupHelper() {
				(this.elOriginStyleVal = v._originStyleProp.map(
					(e) => this.el.style[e]
				)),
					(this.parentOriginStylePosition =
						this.el.parentElement.style.position);
				const e = this.el.parentElement,
					t = i.getValuesFromTransformedElement(e);
				return (
					(this.rectScale = { x: t.xScale, y: t.yScale }),
					getComputedStyle(this.el.parentElement).position.match(/static/) &&
						(this.el.parentElement.style.position = "relative"),
					(this.el.style.position = "absolute"),
					(this.el.style.opacity = "0.8"),
					this
				);
			}
			_cleanHelper() {
				return (
					v._originStyleProp.forEach((e, t) => {
						this.el.style[e] = this.elOriginStyleVal[t] || null;
					}),
					(this.el.parentElement.style.position =
						this.parentOriginStylePosition || null),
					this
				);
			}
			_getChange(e, t) {
				const i = this.startEvent,
					s = {
						width: this.originalRect.width,
						height: this.originalRect.height + this.scrolled,
						left: this.originalRect.left,
						top: this.originalRect.top - this.scrolled,
					},
					o = e.clientX - i.clientX,
					n = this.sizeToContent ? 0 : e.clientY - i.clientY;
				let r, l;
				t.indexOf("e") > -1
					? (s.width += o)
					: t.indexOf("w") > -1 && ((s.width -= o), (s.left += o), (r = !0)),
					t.indexOf("s") > -1
						? (s.height += n)
						: t.indexOf("n") > -1 && ((s.height -= n), (s.top += n), (l = !0));
				const h = this._constrainSize(s.width, s.height, r, l);
				return (
					Math.round(s.width) !== Math.round(h.width) &&
						(t.indexOf("w") > -1 && (s.left += s.width - h.width),
						(s.width = h.width)),
					Math.round(s.height) !== Math.round(h.height) &&
						(t.indexOf("n") > -1 && (s.top += s.height - h.height),
						(s.height = h.height)),
					s
				);
			}
			_constrainSize(e, t, i, s) {
				const o = this.option,
					n = (i ? o.maxWidthMoveLeft : o.maxWidth) || Number.MAX_SAFE_INTEGER,
					r = o.minWidth / this.rectScale.x || e,
					l = (s ? o.maxHeightMoveUp : o.maxHeight) || Number.MAX_SAFE_INTEGER,
					h = o.minHeight / this.rectScale.y || t;
				return {
					width: Math.min(n, Math.max(r, e)),
					height: Math.min(l, Math.max(h, t)),
				};
			}
			_applyChange() {
				let e = { left: 0, top: 0, width: 0, height: 0 };
				if ("absolute" === this.el.style.position) {
					const t = this.el.parentElement,
						{ left: i, top: s } = t.getBoundingClientRect();
					e = { left: i, top: s, width: 0, height: 0 };
				}
				return this.temporalRect
					? (Object.keys(this.temporalRect).forEach((t) => {
							const i = this.temporalRect[t],
								s =
									"width" === t || "left" === t
										? this.rectScale.x
										: "height" === t || "top" === t
										? this.rectScale.y
										: 1;
							this.el.style[t] = (i - e[t]) * s + "px";
					  }),
					  this)
					: this;
			}
			_removeHandlers() {
				return (
					this.handlers.forEach((e) => e.destroy()), delete this.handlers, this
				);
			}
		}
		v._originStyleProp = [
			"width",
			"height",
			"position",
			"left",
			"top",
			"opacity",
			"zIndex",
		];
		class b extends y {
			constructor(e, t = {}) {
				super(),
					(this.el = e),
					(this.option = t),
					(this.dragTransform = {
						xScale: 1,
						yScale: 1,
						xOffset: 0,
						yOffset: 0,
					});
				const i = t.handle.substring(1),
					s = e.gridstackNode;
				(this.dragEls = e.classList.contains(i)
					? [e]
					: s?.subGrid
					? [e.querySelector(t.handle) || e]
					: Array.from(e.querySelectorAll(t.handle))),
					0 === this.dragEls.length && (this.dragEls = [e]),
					(this._mouseDown = this._mouseDown.bind(this)),
					(this._mouseMove = this._mouseMove.bind(this)),
					(this._mouseUp = this._mouseUp.bind(this)),
					(this._keyEvent = this._keyEvent.bind(this)),
					this.enable();
			}
			on(e, t) {
				super.on(e, t);
			}
			off(e) {
				super.off(e);
			}
			enable() {
				!1 !== this.disabled &&
					(super.enable(),
					this.dragEls.forEach((e) => {
						e.addEventListener("mousedown", this._mouseDown),
							l &&
								(e.addEventListener("touchstart", c),
								e.addEventListener("pointerdown", u));
					}),
					this.el.classList.remove("ui-draggable-disabled"));
			}
			disable(e = !1) {
				!0 !== this.disabled &&
					(super.disable(),
					this.dragEls.forEach((e) => {
						e.removeEventListener("mousedown", this._mouseDown),
							l &&
								(e.removeEventListener("touchstart", c),
								e.removeEventListener("pointerdown", u));
					}),
					e || this.el.classList.add("ui-draggable-disabled"));
			}
			destroy() {
				this.dragTimeout && window.clearTimeout(this.dragTimeout),
					delete this.dragTimeout,
					this.mouseDownEvent && this._mouseUp(this.mouseDownEvent),
					this.disable(!0),
					delete this.el,
					delete this.helper,
					delete this.option,
					super.destroy();
			}
			updateOption(e) {
				return Object.keys(e).forEach((t) => (this.option[t] = e[t])), this;
			}
			_mouseDown(e) {
				if (!r.mouseHandled)
					return (
						0 !== e.button ||
							(!this.dragEls.find((t) => t === e.target) &&
								e.target.closest(
									'input,textarea,button,select,option,[contenteditable="true"],.ui-resizable-handle'
								)) ||
							(this.option.cancel && e.target.closest(this.option.cancel)) ||
							((this.mouseDownEvent = e),
							delete this.dragging,
							delete r.dragElement,
							delete r.dropElement,
							document.addEventListener("mousemove", this._mouseMove, {
								capture: !0,
								passive: !0,
							}),
							document.addEventListener("mouseup", this._mouseUp, !0),
							l &&
								(e.target.addEventListener("touchmove", g),
								e.target.addEventListener("touchend", p)),
							e.preventDefault(),
							document.activeElement && document.activeElement.blur(),
							(r.mouseHandled = !0)),
						!0
					);
			}
			_callDrag(e) {
				if (!this.dragging) return;
				const t = i.initEvent(e, { target: this.el, type: "drag" });
				this.option.drag && this.option.drag(t, this.ui()),
					this.triggerEvent("drag", t);
			}
			_mouseMove(e) {
				let t = this.mouseDownEvent;
				if (((this.lastDrag = e), this.dragging))
					if ((this._dragFollow(e), r.pauseDrag)) {
						const t = Number.isInteger(r.pauseDrag) ? r.pauseDrag : 100;
						this.dragTimeout && window.clearTimeout(this.dragTimeout),
							(this.dragTimeout = window.setTimeout(
								() => this._callDrag(e),
								t
							));
					} else this._callDrag(e);
				else if (Math.abs(e.x - t.x) + Math.abs(e.y - t.y) > 3) {
					(this.dragging = !0), (r.dragElement = this);
					let t = this.el.gridstackNode?.grid;
					t
						? (r.dropElement = t.el.ddElement.ddDroppable)
						: delete r.dropElement,
						(this.helper = this._createHelper(e)),
						this._setupHelperContainmentStyle(),
						(this.dragTransform = i.getValuesFromTransformedElement(
							this.helperContainment
						)),
						(this.dragOffset = this._getDragOffset(
							e,
							this.el,
							this.helperContainment
						)),
						this._setupHelperStyle(e);
					const s = i.initEvent(e, { target: this.el, type: "dragstart" });
					this.option.start && this.option.start(s, this.ui()),
						this.triggerEvent("dragstart", s),
						document.addEventListener("keydown", this._keyEvent);
				}
				return !0;
			}
			_mouseUp(e) {
				if (
					(document.removeEventListener("mousemove", this._mouseMove, !0),
					document.removeEventListener("mouseup", this._mouseUp, !0),
					l &&
						(e.target.removeEventListener("touchmove", g, !0),
						e.target.removeEventListener("touchend", p, !0)),
					this.dragging)
				) {
					delete this.dragging,
						delete this.el.gridstackNode?._origRotate,
						document.removeEventListener("keydown", this._keyEvent),
						r.dropElement?.el === this.el.parentElement && delete r.dropElement,
						(this.helperContainment.style.position =
							this.parentOriginStylePosition || null),
						this.helper === this.el
							? this._removeHelperStyle()
							: this.helper.remove();
					const t = i.initEvent(e, { target: this.el, type: "dragstop" });
					this.option.stop && this.option.stop(t),
						this.triggerEvent("dragstop", t),
						r.dropElement && r.dropElement.drop(e);
				}
				delete this.helper,
					delete this.mouseDownEvent,
					delete r.dragElement,
					delete r.dropElement,
					delete r.mouseHandled,
					e.preventDefault();
			}
			_keyEvent(e) {
				const t = this.el.gridstackNode;
				if (!t?.grid) return;
				const s = t.grid;
				if ("Escape" === e.key)
					t._origRotate && ((t._orig = t._origRotate), delete t._origRotate),
						s.engine.restoreInitial(),
						this._mouseUp(this.mouseDownEvent);
				else if ("r" === e.key || "R" === e.key) {
					if (!i.canBeRotated(t)) return;
					(t._origRotate = t._origRotate || { ...t._orig }),
						delete t._moving,
						s
							.setAnimation(!1)
							.rotate(t.el, {
								top: -this.dragOffset.offsetTop,
								left: -this.dragOffset.offsetLeft,
							})
							.setAnimation(),
						(t._moving = !0),
						(this.dragOffset = this._getDragOffset(
							this.lastDrag,
							t.el,
							this.helperContainment
						)),
						(this.helper.style.width = this.dragOffset.width + "px"),
						(this.helper.style.height = this.dragOffset.height + "px"),
						i.swap(t._orig, "w", "h"),
						delete t._rect,
						this._mouseMove(this.lastDrag);
				}
			}
			_createHelper(e) {
				let t = this.el;
				return (
					"function" == typeof this.option.helper
						? (t = this.option.helper(e))
						: "clone" === this.option.helper && (t = i.cloneNode(this.el)),
					document.body.contains(t) ||
						i.appendTo(
							t,
							"parent" === this.option.appendTo
								? this.el.parentElement
								: this.option.appendTo
						),
					t === this.el &&
						(this.dragElementOriginStyle = b.originStyleProp.map(
							(e) => this.el.style[e]
						)),
					t
				);
			}
			_setupHelperStyle(e) {
				this.helper.classList.add("ui-draggable-dragging");
				const t = this.helper.style;
				return (
					(t.pointerEvents = "none"),
					(t.width = this.dragOffset.width + "px"),
					(t.height = this.dragOffset.height + "px"),
					(t.willChange = "left, top"),
					(t.position = "fixed"),
					this._dragFollow(e),
					(t.transition = "none"),
					setTimeout(() => {
						this.helper && (t.transition = null);
					}, 0),
					this
				);
			}
			_removeHelperStyle() {
				this.helper.classList.remove("ui-draggable-dragging");
				let e = this.helper?.gridstackNode;
				if (!e?._isAboutToRemove && this.dragElementOriginStyle) {
					let e = this.helper,
						t = this.dragElementOriginStyle.transition || null;
					(e.style.transition = this.dragElementOriginStyle.transition =
						"none"),
						b.originStyleProp.forEach(
							(t) => (e.style[t] = this.dragElementOriginStyle[t] || null)
						),
						setTimeout(() => (e.style.transition = t), 50);
				}
				return delete this.dragElementOriginStyle, this;
			}
			_dragFollow(e) {
				const t = this.helper.style,
					i = this.dragOffset;
				(t.left =
					(e.clientX + i.offsetLeft - 0) * this.dragTransform.xScale + "px"),
					(t.top =
						(e.clientY + i.offsetTop - 0) * this.dragTransform.yScale + "px");
			}
			_setupHelperContainmentStyle() {
				return (
					(this.helperContainment = this.helper.parentElement),
					"fixed" !== this.helper.style.position &&
						((this.parentOriginStylePosition =
							this.helperContainment.style.position),
						getComputedStyle(this.helperContainment).position.match(/static/) &&
							(this.helperContainment.style.position = "relative")),
					this
				);
			}
			_getDragOffset(e, t, i) {
				let s = 0,
					o = 0;
				i &&
					((s = this.dragTransform.xOffset), (o = this.dragTransform.yOffset));
				const n = t.getBoundingClientRect();
				return {
					left: n.left,
					top: n.top,
					offsetLeft: -e.clientX + n.left - s,
					offsetTop: -e.clientY + n.top - o,
					width: n.width * this.dragTransform.xScale,
					height: n.height * this.dragTransform.yScale,
				};
			}
			ui() {
				const e = this.el.parentElement.getBoundingClientRect(),
					t = this.helper.getBoundingClientRect();
				return {
					position: {
						top: (t.top - e.top) * this.dragTransform.yScale,
						left: (t.left - e.left) * this.dragTransform.xScale,
					},
				};
			}
		}
		b.originStyleProp = [
			"transition",
			"pointerEvents",
			"position",
			"left",
			"top",
			"minWidth",
			"willChange",
		];
		class E extends y {
			constructor(e, t = {}) {
				super(),
					(this.el = e),
					(this.option = t),
					(this._mouseEnter = this._mouseEnter.bind(this)),
					(this._mouseLeave = this._mouseLeave.bind(this)),
					this.enable(),
					this._setupAccept();
			}
			on(e, t) {
				super.on(e, t);
			}
			off(e) {
				super.off(e);
			}
			enable() {
				!1 !== this.disabled &&
					(super.enable(),
					this.el.classList.add("ui-droppable"),
					this.el.classList.remove("ui-droppable-disabled"),
					this.el.addEventListener("mouseenter", this._mouseEnter),
					this.el.addEventListener("mouseleave", this._mouseLeave),
					l &&
						(this.el.addEventListener("pointerenter", m),
						this.el.addEventListener("pointerleave", f)));
			}
			disable(e = !1) {
				!0 !== this.disabled &&
					(super.disable(),
					this.el.classList.remove("ui-droppable"),
					e || this.el.classList.add("ui-droppable-disabled"),
					this.el.removeEventListener("mouseenter", this._mouseEnter),
					this.el.removeEventListener("mouseleave", this._mouseLeave),
					l &&
						(this.el.removeEventListener("pointerenter", m),
						this.el.removeEventListener("pointerleave", f)));
			}
			destroy() {
				this.disable(!0),
					this.el.classList.remove("ui-droppable"),
					this.el.classList.remove("ui-droppable-disabled"),
					super.destroy();
			}
			updateOption(e) {
				return (
					Object.keys(e).forEach((t) => (this.option[t] = e[t])),
					this._setupAccept(),
					this
				);
			}
			_mouseEnter(e) {
				if (!r.dragElement) return;
				if (!this._canDrop(r.dragElement.el)) return;
				e.preventDefault(),
					e.stopPropagation(),
					r.dropElement &&
						r.dropElement !== this &&
						r.dropElement._mouseLeave(e, !0),
					(r.dropElement = this);
				const t = i.initEvent(e, { target: this.el, type: "dropover" });
				this.option.over && this.option.over(t, this._ui(r.dragElement)),
					this.triggerEvent("dropover", t),
					this.el.classList.add("ui-droppable-over");
			}
			_mouseLeave(e, t = !1) {
				if (!r.dragElement || r.dropElement !== this) return;
				e.preventDefault(), e.stopPropagation();
				const s = i.initEvent(e, { target: this.el, type: "dropout" });
				if (
					(this.option.out && this.option.out(s, this._ui(r.dragElement)),
					this.triggerEvent("dropout", s),
					r.dropElement === this && (delete r.dropElement, !t))
				) {
					let t,
						i = this.el.parentElement;
					for (; !t && i; )
						(t = i.ddElement?.ddDroppable), (i = i.parentElement);
					t && t._mouseEnter(e);
				}
			}
			drop(e) {
				e.preventDefault();
				const t = i.initEvent(e, { target: this.el, type: "drop" });
				this.option.drop && this.option.drop(t, this._ui(r.dragElement)),
					this.triggerEvent("drop", t);
			}
			_canDrop(e) {
				return e && (!this.accept || this.accept(e));
			}
			_setupAccept() {
				return this.option.accept
					? ("string" == typeof this.option.accept
							? (this.accept = (e) =>
									e.classList.contains(this.option.accept) ||
									e.matches(this.option.accept))
							: (this.accept = this.option.accept),
					  this)
					: this;
			}
			_ui(e) {
				return { draggable: e.el, ...e.ui() };
			}
		}
		class w {
			static init(e) {
				return e.ddElement || (e.ddElement = new w(e)), e.ddElement;
			}
			constructor(e) {
				this.el = e;
			}
			on(e, t) {
				return (
					this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(e) > -1
						? this.ddDraggable.on(e, t)
						: this.ddDroppable &&
						  ["drop", "dropover", "dropout"].indexOf(e) > -1
						? this.ddDroppable.on(e, t)
						: this.ddResizable &&
						  ["resizestart", "resize", "resizestop"].indexOf(e) > -1 &&
						  this.ddResizable.on(e, t),
					this
				);
			}
			off(e) {
				return (
					this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(e) > -1
						? this.ddDraggable.off(e)
						: this.ddDroppable &&
						  ["drop", "dropover", "dropout"].indexOf(e) > -1
						? this.ddDroppable.off(e)
						: this.ddResizable &&
						  ["resizestart", "resize", "resizestop"].indexOf(e) > -1 &&
						  this.ddResizable.off(e),
					this
				);
			}
			setupDraggable(e) {
				return (
					this.ddDraggable
						? this.ddDraggable.updateOption(e)
						: (this.ddDraggable = new b(this.el, e)),
					this
				);
			}
			cleanDraggable() {
				return (
					this.ddDraggable &&
						(this.ddDraggable.destroy(), delete this.ddDraggable),
					this
				);
			}
			setupResizable(e) {
				return (
					this.ddResizable
						? this.ddResizable.updateOption(e)
						: (this.ddResizable = new v(this.el, e)),
					this
				);
			}
			cleanResizable() {
				return (
					this.ddResizable &&
						(this.ddResizable.destroy(), delete this.ddResizable),
					this
				);
			}
			setupDroppable(e) {
				return (
					this.ddDroppable
						? this.ddDroppable.updateOption(e)
						: (this.ddDroppable = new E(this.el, e)),
					this
				);
			}
			cleanDroppable() {
				return (
					this.ddDroppable &&
						(this.ddDroppable.destroy(), delete this.ddDroppable),
					this
				);
			}
		}
		const x = new (class {
			resizable(e, t, i, s) {
				return (
					this._getDDElements(e).forEach((e) => {
						if ("disable" === t || "enable" === t)
							e.ddResizable && e.ddResizable[t]();
						else if ("destroy" === t) e.ddResizable && e.cleanResizable();
						else if ("option" === t) e.setupResizable({ [i]: s });
						else {
							const i = e.el.gridstackNode.grid;
							let s =
								e.el.getAttribute("gs-resize-handles") ||
								i.opts.resizable.handles ||
								"e,s,se";
							"all" === s && (s = "n,e,s,w,se,sw,ne,nw");
							const o = !i.opts.alwaysShowResizeHandle;
							e.setupResizable({
								...i.opts.resizable,
								handles: s,
								autoHide: o,
								start: t.start,
								stop: t.stop,
								resize: t.resize,
							});
						}
					}),
					this
				);
			}
			draggable(e, t, i, s) {
				return (
					this._getDDElements(e).forEach((e) => {
						if ("disable" === t || "enable" === t)
							e.ddDraggable && e.ddDraggable[t]();
						else if ("destroy" === t) e.ddDraggable && e.cleanDraggable();
						else if ("option" === t) e.setupDraggable({ [i]: s });
						else {
							const i = e.el.gridstackNode.grid;
							e.setupDraggable({
								...i.opts.draggable,
								start: t.start,
								stop: t.stop,
								drag: t.drag,
							});
						}
					}),
					this
				);
			}
			dragIn(e, t) {
				return this._getDDElements(e).forEach((e) => e.setupDraggable(t)), this;
			}
			droppable(e, t, i, s) {
				return (
					"function" != typeof t.accept ||
						t._accept ||
						((t._accept = t.accept), (t.accept = (e) => t._accept(e))),
					this._getDDElements(e).forEach((e) => {
						"disable" === t || "enable" === t
							? e.ddDroppable && e.ddDroppable[t]()
							: "destroy" === t
							? e.ddDroppable && e.cleanDroppable()
							: "option" === t
							? e.setupDroppable({ [i]: s })
							: e.setupDroppable(t);
					}),
					this
				);
			}
			isDroppable(e) {
				return !(
					!(e && e.ddElement && e.ddElement.ddDroppable) ||
					e.ddElement.ddDroppable.disabled
				);
			}
			isDraggable(e) {
				return !(
					!(e && e.ddElement && e.ddElement.ddDraggable) ||
					e.ddElement.ddDraggable.disabled
				);
			}
			isResizable(e) {
				return !(
					!(e && e.ddElement && e.ddElement.ddResizable) ||
					e.ddElement.ddResizable.disabled
				);
			}
			on(e, t, i) {
				return (
					this._getDDElements(e).forEach((e) =>
						e.on(t, (e) => {
							i(
								e,
								r.dragElement ? r.dragElement.el : e.target,
								r.dragElement ? r.dragElement.helper : null
							);
						})
					),
					this
				);
			}
			off(e, t) {
				return this._getDDElements(e).forEach((e) => e.off(t)), this;
			}
			_getDDElements(e, t = !0) {
				let s = i.getElements(e);
				if (!s.length) return [];
				let o = s.map((e) => e.ddElement || (t ? w.init(e) : null));
				return t || o.filter((e) => e), o;
			}
		})();
		class C {
			static init(e = {}, t = ".grid-stack") {
				if ("undefined" == typeof document) return null;
				let s = C.getGridElement(t);
				return s
					? (s.gridstack || (s.gridstack = new C(s, i.cloneDeep(e))),
					  s.gridstack)
					: ("string" == typeof t
							? console.error(
									'GridStack.initAll() no grid was found with selector "' +
										t +
										'" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.'
							  )
							: console.error("GridStack.init() no grid element was passed."),
					  null);
			}
			static initAll(e = {}, t = ".grid-stack") {
				let s = [];
				return (
					"undefined" == typeof document ||
						(C.getGridElements(t).forEach((t) => {
							t.gridstack || (t.gridstack = new C(t, i.cloneDeep(e))),
								s.push(t.gridstack);
						}),
						0 === s.length &&
							console.error(
								'GridStack.initAll() no grid was found with selector "' +
									t +
									'" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.'
							)),
					s
				);
			}
			static addGrid(e, t = {}) {
				if (!e) return null;
				let i = e;
				if (i.gridstack) {
					const e = i.gridstack;
					return (
						t && (e.opts = { ...e.opts, ...t }),
						void 0 !== t.children && e.load(t.children),
						e
					);
				}
				if (!e.classList.contains("grid-stack") || C.addRemoveCB)
					if (C.addRemoveCB) i = C.addRemoveCB(e, t, !0, !0);
					else {
						let s = document.implementation.createHTMLDocument("");
						(s.body.innerHTML = `<div class="grid-stack ${
							t.class || ""
						}"></div>`),
							(i = s.body.children[0]),
							e.appendChild(i);
					}
				return C.init(t, i);
			}
			static registerEngine(e) {
				C.engineClass = e;
			}
			get placeholder() {
				if (!this._placeholder) {
					let e = document.createElement("div");
					(e.className = "placeholder-content"),
						this.opts.placeholderText &&
							(e.innerHTML = this.opts.placeholderText),
						(this._placeholder = document.createElement("div")),
						this._placeholder.classList.add(
							this.opts.placeholderClass,
							o.itemClass,
							this.opts.itemClass
						),
						this.placeholder.appendChild(e);
				}
				return this._placeholder;
			}
			constructor(e, t = {}) {
				(this.el = e),
					(this.opts = t),
					(this._gsEventHandler = {}),
					(this._extraDragRow = 0),
					(this.dragTransform = {
						xScale: 1,
						yScale: 1,
						xOffset: 0,
						yOffset: 0,
					}),
					(e.gridstack = this),
					(t = t || {}),
					e.classList.contains("grid-stack") ||
						this.el.classList.add("grid-stack"),
					t.row && ((t.minRow = t.maxRow = t.row), delete t.row);
				let n = i.toNumber(e.getAttribute("gs-row"));
				"auto" === t.column && delete t.column,
					void 0 !== t.alwaysShowResizeHandle &&
						(t._alwaysShowResizeHandle = t.alwaysShowResizeHandle);
				let h = t.columnOpts?.breakpoints;
				const a = t;
				if (
					(a.oneColumnModeDomSort &&
						(delete a.oneColumnModeDomSort,
						console.log(
							"warning: Gridstack oneColumnModeDomSort no longer supported. Use GridStackOptions.columnOpts instead."
						)),
					a.oneColumnSize || !1 === a.disableOneColumnMode)
				) {
					const e = a.oneColumnSize || 768;
					delete a.oneColumnSize,
						delete a.disableOneColumnMode,
						(t.columnOpts = t.columnOpts || {}),
						(h = t.columnOpts.breakpoints = t.columnOpts.breakpoints || []);
					let i = h.find((e) => 1 === e.c);
					i
						? (i.w = e)
						: ((i = { c: 1, w: e }), h.push(i, { c: 12, w: e + 1 }));
				}
				const d = t.columnOpts;
				d &&
					(d.columnWidth || d.breakpoints?.length
						? (d.columnMax = d.columnMax || 12)
						: (delete t.columnOpts, (h = void 0))),
					h?.length > 1 && h.sort((e, t) => (t.w || 0) - (e.w || 0));
				let c = {
					...i.cloneDeep(o),
					column: i.toNumber(e.getAttribute("gs-column")) || o.column,
					minRow: n || i.toNumber(e.getAttribute("gs-min-row")) || o.minRow,
					maxRow: n || i.toNumber(e.getAttribute("gs-max-row")) || o.maxRow,
					staticGrid: i.toBool(e.getAttribute("gs-static")) || o.staticGrid,
					draggable: {
						handle:
							(t.handleClass
								? "." + t.handleClass
								: t.handle
								? t.handle
								: "") || o.draggable.handle,
					},
					removableOptions: {
						accept: t.itemClass || o.removableOptions.accept,
						decline: o.removableOptions.decline,
					},
				};
				e.getAttribute("gs-animate") &&
					(c.animate = i.toBool(e.getAttribute("gs-animate"))),
					(t = i.defaults(t, c)),
					this._initMargin(),
					this.checkDynamicColumn(),
					this.el.classList.add("gs-" + t.column),
					"auto" === t.rtl && (t.rtl = "rtl" === e.style.direction),
					t.rtl && this.el.classList.add("grid-stack-rtl");
				const g = this.el.parentElement?.parentElement;
				let p = g?.classList.contains(o.itemClass) ? g.gridstackNode : void 0;
				p &&
					((p.subGrid = this),
					(this.parentGridItem = p),
					this.el.classList.add("grid-stack-nested"),
					p.el.classList.add("grid-stack-sub-grid")),
					(this._isAutoCellHeight = "auto" === t.cellHeight),
					this._isAutoCellHeight || "initial" === t.cellHeight
						? this.cellHeight(void 0, !1)
						: ("number" == typeof t.cellHeight &&
								t.cellHeightUnit &&
								t.cellHeightUnit !== o.cellHeightUnit &&
								((t.cellHeight = t.cellHeight + t.cellHeightUnit),
								delete t.cellHeightUnit),
						  this.cellHeight(t.cellHeight, !1)),
					"mobile" === t.alwaysShowResizeHandle &&
						(t.alwaysShowResizeHandle = l),
					(this._styleSheetClass = "gs-id-" + s._idSeq++),
					this.el.classList.add(this._styleSheetClass),
					this._setStaticClass();
				let u = t.engineClass || C.engineClass || s;
				if (
					((this.engine = new u({
						column: this.getColumn(),
						float: t.float,
						maxRow: t.maxRow,
						onChange: (e) => {
							let t = 0;
							this.engine.nodes.forEach((e) => {
								t = Math.max(t, e.y + e.h);
							}),
								e.forEach((e) => {
									let t = e.el;
									t &&
										(e._removeDOM
											? (t && t.remove(), delete e._removeDOM)
											: this._writePosAttr(t, e));
								}),
								this._updateStyles(!1, t);
						},
					})),
					this._updateStyles(!1, 0),
					t.auto &&
						(this.batchUpdate(),
						(this.engine._loading = !0),
						this.getGridItems().forEach((e) => this._prepareElement(e)),
						delete this.engine._loading,
						this.batchUpdate(!1)),
					t.children)
				) {
					const e = t.children;
					delete t.children, e.length && this.load(e);
				}
				this.setAnimation(),
					t.subGridDynamic && !r.pauseDrag && (r.pauseDrag = !0),
					void 0 !== t.draggable?.pause && (r.pauseDrag = t.draggable.pause),
					this._setupRemoveDrop(),
					this._setupAcceptWidget(),
					this._updateResizeEvent();
			}
			addWidget(e, t) {
				let s, o;
				if ("string" == typeof e) {
					let t = document.implementation.createHTMLDocument("");
					(t.body.innerHTML = e), (s = t.body.children[0]);
				} else if (
					0 === arguments.length ||
					(1 === arguments.length &&
						(void 0 !== (n = e).el ||
							void 0 !== n.x ||
							void 0 !== n.y ||
							void 0 !== n.w ||
							void 0 !== n.h ||
							void 0 !== n.content))
				)
					if (((o = t = e), o?.el)) s = o.el;
					else if (C.addRemoveCB) s = C.addRemoveCB(this.el, t, !0, !1);
					else {
						let e = t?.content || "",
							i = document.implementation.createHTMLDocument("");
						(i.body.innerHTML = `<div class="grid-stack-item ${
							this.opts.itemClass || ""
						}"><div class="grid-stack-item-content">${e}</div></div>`),
							(s = i.body.children[0]);
					}
				else s = e;
				var n;
				if (!s) return;
				if (
					((o = s.gridstackNode),
					o &&
						s.parentElement === this.el &&
						this.engine.nodes.find((e) => e._id === o._id))
				)
					return s;
				let r = this._readAttr(s);
				return (
					(t = i.cloneDeep(t) || {}),
					i.defaults(t, r),
					(o = this.engine.prepareNode(t)),
					this._writeAttr(s, t),
					this.el.appendChild(s),
					this.makeWidget(s, t),
					s
				);
			}
			makeSubGrid(e, t, s, o = !0) {
				let n,
					r = e.gridstackNode;
				if ((r || (r = this.makeWidget(e).gridstackNode), r.subGrid?.el))
					return r.subGrid;
				let l,
					h = this;
				for (; h && !n; )
					(n = h.opts?.subGridOpts), (h = h.parentGridItem?.grid);
				(t = i.cloneDeep({
					...(n || {}),
					children: void 0,
					...(t || r.subGridOpts || {}),
				})),
					(r.subGridOpts = t),
					"auto" === t.column &&
						((l = !0),
						(t.column = Math.max(r.w || 1, s?.w || 1)),
						delete t.columnOpts);
				let a,
					d,
					c = r.el.querySelector(".grid-stack-item-content");
				if (o) {
					if (
						(this._removeDD(r.el),
						(d = { ...r, x: 0, y: 0 }),
						i.removeInternalForSave(d),
						delete d.subGridOpts,
						r.content && ((d.content = r.content), delete r.content),
						C.addRemoveCB)
					)
						a = C.addRemoveCB(this.el, d, !0, !1);
					else {
						let e = document.implementation.createHTMLDocument("");
						(e.body.innerHTML = '<div class="grid-stack-item"></div>'),
							(a = e.body.children[0]),
							a.appendChild(c),
							(e.body.innerHTML =
								'<div class="grid-stack-item-content"></div>'),
							(c = e.body.children[0]),
							r.el.appendChild(c);
					}
					this._prepareDragDropByNode(r);
				}
				if (s) {
					let e = l ? t.column : r.w,
						i = r.h + s.h,
						o = r.el.style;
					(o.transition = "none"),
						this.update(r.el, { w: e, h: i }),
						setTimeout(() => (o.transition = null));
				}
				let g = (r.subGrid = C.addGrid(c, t));
				return (
					s?._moving && (g._isTemp = !0),
					l && (g._autoColumn = !0),
					o && g.addWidget(a, d),
					s &&
						(s._moving
							? window.setTimeout(
									() => i.simulateMouseEvent(s._event, "mouseenter", g.el),
									0
							  )
							: g.addWidget(r.el, r)),
					g
				);
			}
			removeAsSubGrid(e) {
				let t = this.parentGridItem?.grid;
				t &&
					(t.batchUpdate(),
					t.removeWidget(this.parentGridItem.el, !0, !0),
					this.engine.nodes.forEach((e) => {
						(e.x += this.parentGridItem.x),
							(e.y += this.parentGridItem.y),
							t.addWidget(e.el, e);
					}),
					t.batchUpdate(!1),
					this.parentGridItem && delete this.parentGridItem.subGrid,
					delete this.parentGridItem,
					e &&
						window.setTimeout(
							() => i.simulateMouseEvent(e._event, "mouseenter", t.el),
							0
						));
			}
			save(e = !0, t = !1, s = C.saveCB) {
				let n = this.engine.save(e, s);
				if (
					(n.forEach((i) => {
						if (e && i.el && !i.subGrid && !s) {
							let e = i.el.querySelector(".grid-stack-item-content");
							(i.content = e ? e.innerHTML : void 0),
								i.content || delete i.content;
						} else if ((e || s || delete i.content, i.subGrid?.el)) {
							const o = i.subGrid.save(e, t, s);
							(i.subGridOpts = t ? o : { children: o }), delete i.subGrid;
						}
						delete i.el;
					}),
					t)
				) {
					let e = i.cloneDeep(this.opts);
					e.marginBottom === e.marginTop &&
						e.marginRight === e.marginLeft &&
						e.marginTop === e.marginRight &&
						((e.margin = e.marginTop),
						delete e.marginTop,
						delete e.marginRight,
						delete e.marginBottom,
						delete e.marginLeft),
						e.rtl === ("rtl" === this.el.style.direction) && (e.rtl = "auto"),
						this._isAutoCellHeight && (e.cellHeight = "auto"),
						this._autoColumn && (e.column = "auto");
					const t = e._alwaysShowResizeHandle;
					return (
						delete e._alwaysShowResizeHandle,
						void 0 !== t
							? (e.alwaysShowResizeHandle = t)
							: delete e.alwaysShowResizeHandle,
						i.removeInternalAndSame(e, o),
						(e.children = n),
						e
					);
				}
				return n;
			}
			load(e, t = C.addRemoveCB || !0) {
				e = i.cloneDeep(e);
				const s = this.getColumn();
				e.forEach((e) => {
					(e.w = e.w || 1), (e.h = e.h || 1);
				}),
					(e = i.sort(e));
				let o = 0;
				e.forEach((e) => {
					o = Math.max(o, (e.x || 0) + e.w);
				}),
					o > s &&
						((this._ignoreLayoutsNodeChange = !0),
						this.engine.cacheLayout(e, o, !0));
				const n = C.addRemoveCB;
				"function" == typeof t && (C.addRemoveCB = t);
				let r = [];
				this.batchUpdate();
				const l = !this.engine.nodes.length;
				l && this.setAnimation(!1),
					!l &&
						t &&
						[...this.engine.nodes].forEach((t) => {
							t.id &&
								(i.find(e, t.id) ||
									(C.addRemoveCB && C.addRemoveCB(this.el, t, !1, !1),
									r.push(t),
									this.removeWidget(t.el, !0, !1)));
						}),
					(this.engine._loading = !0);
				let h = [];
				return (
					(this.engine.nodes = this.engine.nodes.filter(
						(t) => !i.find(e, t.id) || (h.push(t), !1)
					)),
					e.forEach((e) => {
						let s = i.find(h, e.id);
						if (s) {
							if (
								(i.shouldSizeToContent(s) && (e.h = s.h),
								this.engine.nodeBoundFix(e),
								(e.autoPosition || void 0 === e.x || void 0 === e.y) &&
									((e.w = e.w || s.w),
									(e.h = e.h || s.h),
									this.engine.findEmptyPosition(e)),
								this.engine.nodes.push(s),
								i.samePos(s, e) && this.moveNode(s, { ...e, forceCollide: !0 }),
								this.update(s.el, e),
								e.subGridOpts?.children)
							) {
								let t = s.el.querySelector(".grid-stack");
								t && t.gridstack && t.gridstack.load(e.subGridOpts.children);
							}
						} else t && this.addWidget(e);
					}),
					delete this.engine._loading,
					(this.engine.removedNodes = r),
					this.batchUpdate(!1),
					delete this._ignoreLayoutsNodeChange,
					n ? (C.addRemoveCB = n) : delete C.addRemoveCB,
					l && this.opts?.animate && this.setAnimation(this.opts.animate, !0),
					this
				);
			}
			batchUpdate(e = !0) {
				return (
					this.engine.batchUpdate(e),
					e ||
						(this._updateContainerHeight(),
						this._triggerRemoveEvent(),
						this._triggerAddEvent(),
						this._triggerChangeEvent()),
					this
				);
			}
			getCellHeight(e = !1) {
				if (
					this.opts.cellHeight &&
					"auto" !== this.opts.cellHeight &&
					(!e || !this.opts.cellHeightUnit || "px" === this.opts.cellHeightUnit)
				)
					return this.opts.cellHeight;
				if ("rem" === this.opts.cellHeightUnit)
					return (
						this.opts.cellHeight *
						parseFloat(getComputedStyle(document.documentElement).fontSize)
					);
				if ("em" === this.opts.cellHeightUnit)
					return (
						this.opts.cellHeight *
						parseFloat(getComputedStyle(this.el).fontSize)
					);
				if ("cm" === this.opts.cellHeightUnit)
					return this.opts.cellHeight * (96 / 2.54);
				if ("mm" === this.opts.cellHeightUnit)
					return (this.opts.cellHeight * (96 / 2.54)) / 10;
				let t = this.el.querySelector("." + this.opts.itemClass);
				if (t) {
					let e = i.toNumber(t.getAttribute("gs-h")) || 1;
					return Math.round(t.offsetHeight / e);
				}
				let s = parseInt(this.el.getAttribute("gs-current-row"));
				return s
					? Math.round(this.el.getBoundingClientRect().height / s)
					: this.opts.cellHeight;
			}
			cellHeight(e, t = !0) {
				if (
					(t &&
						void 0 !== e &&
						this._isAutoCellHeight !== ("auto" === e) &&
						((this._isAutoCellHeight = "auto" === e),
						this._updateResizeEvent()),
					("initial" !== e && "auto" !== e) || (e = void 0),
					void 0 === e)
				) {
					let t =
						-this.opts.marginRight -
						this.opts.marginLeft +
						this.opts.marginTop +
						this.opts.marginBottom;
					e = this.cellWidth() + t;
				}
				let s = i.parseHeight(e);
				return (
					(this.opts.cellHeightUnit === s.unit &&
						this.opts.cellHeight === s.h) ||
						((this.opts.cellHeightUnit = s.unit),
						(this.opts.cellHeight = s.h),
						this.resizeToContentCheck(),
						t && this._updateStyles(!0)),
					this
				);
			}
			cellWidth() {
				return this._widthOrContainer() / this.getColumn();
			}
			_widthOrContainer(e = !1) {
				return e && this.opts.columnOpts?.breakpointForWindow
					? window.innerWidth
					: this.el.clientWidth ||
							this.el.parentElement.clientWidth ||
							window.innerWidth;
			}
			checkDynamicColumn() {
				const e = this.opts.columnOpts;
				if (!e || (!e.columnWidth && !e.breakpoints?.length)) return !1;
				const t = this.getColumn();
				let i = t;
				const s = this._widthOrContainer(!0);
				if (e.columnWidth)
					i = Math.min(Math.round(s / e.columnWidth) || 1, e.columnMax);
				else {
					i = e.columnMax;
					let o = 0;
					for (; o < e.breakpoints.length && s <= e.breakpoints[o].w; )
						i = e.breakpoints[o++].c || t;
				}
				if (i !== t) {
					const t = e.breakpoints?.find((e) => e.c === i);
					return this.column(i, t?.layout || e.layout), !0;
				}
				return !1;
			}
			compact(e = "compact", t = !0) {
				return this.engine.compact(e, t), this._triggerChangeEvent(), this;
			}
			column(e, t = "moveScale") {
				if (!e || e < 1 || this.opts.column === e) return this;
				let i = this.getColumn();
				return (
					(this.opts.column = e),
					this.engine
						? ((this.engine.column = e),
						  this.el.classList.remove("gs-" + i),
						  this.el.classList.add("gs-" + e),
						  this.engine.columnChanged(i, e, t),
						  this._isAutoCellHeight && this.cellHeight(),
						  this.resizeToContentCheck(!0),
						  (this._ignoreLayoutsNodeChange = !0),
						  this._triggerChangeEvent(),
						  delete this._ignoreLayoutsNodeChange,
						  this)
						: this
				);
			}
			getColumn() {
				return this.opts.column;
			}
			getGridItems() {
				return Array.from(this.el.children).filter(
					(e) =>
						e.matches("." + this.opts.itemClass) &&
						!e.matches("." + this.opts.placeholderClass)
				);
			}
			destroy(e = !0) {
				if (this.el)
					return (
						this.offAll(),
						this._updateResizeEvent(!0),
						this.setStatic(!0, !1),
						this.setAnimation(!1),
						e
							? this.el.parentNode.removeChild(this.el)
							: (this.removeAll(e),
							  this.el.classList.remove(this._styleSheetClass),
							  this.el.removeAttribute("gs-current-row")),
						this._removeStylesheet(),
						this.parentGridItem && delete this.parentGridItem.subGrid,
						delete this.parentGridItem,
						delete this.opts,
						delete this._placeholder,
						delete this.engine,
						delete this.el.gridstack,
						delete this.el,
						this
					);
			}
			float(e) {
				return (
					this.opts.float !== e &&
						((this.opts.float = this.engine.float = e),
						this._triggerChangeEvent()),
					this
				);
			}
			getFloat() {
				return this.engine.float;
			}
			getCellFromPixel(e, t = !1) {
				let i,
					s = this.el.getBoundingClientRect();
				i = t
					? { top: s.top + document.documentElement.scrollTop, left: s.left }
					: { top: this.el.offsetTop, left: this.el.offsetLeft };
				let o = e.left - i.left,
					n = e.top - i.top,
					r = s.width / this.getColumn(),
					l = s.height / parseInt(this.el.getAttribute("gs-current-row"));
				return { x: Math.floor(o / r), y: Math.floor(n / l) };
			}
			getRow() {
				return Math.max(this.engine.getRow(), this.opts.minRow);
			}
			isAreaEmpty(e, t, i, s) {
				return this.engine.isAreaEmpty(e, t, i, s);
			}
			makeWidget(e, t) {
				let i = C.getElement(e);
				this._prepareElement(i, !0, t);
				const s = i.gridstackNode;
				return (
					this._updateContainerHeight(),
					s.subGridOpts && this.makeSubGrid(i, s.subGridOpts, void 0, !1),
					1 === this.opts.column && (this._ignoreLayoutsNodeChange = !0),
					this._triggerAddEvent(),
					this._triggerChangeEvent(),
					delete this._ignoreLayoutsNodeChange,
					i
				);
			}
			on(e, t) {
				if (-1 !== e.indexOf(" "))
					return e.split(" ").forEach((e) => this.on(e, t)), this;
				if (
					"change" === e ||
					"added" === e ||
					"removed" === e ||
					"enable" === e ||
					"disable" === e
				) {
					let i = "enable" === e || "disable" === e;
					(this._gsEventHandler[e] = i ? (e) => t(e) : (e) => t(e, e.detail)),
						this.el.addEventListener(e, this._gsEventHandler[e]);
				} else
					"drag" === e ||
					"dragstart" === e ||
					"dragstop" === e ||
					"resizestart" === e ||
					"resize" === e ||
					"resizestop" === e ||
					"dropped" === e ||
					"resizecontent" === e
						? (this._gsEventHandler[e] = t)
						: console.error("GridStack.on(" + e + ") event not supported");
				return this;
			}
			off(e) {
				return -1 !== e.indexOf(" ")
					? (e.split(" ").forEach((e) => this.off(e)), this)
					: (("change" !== e &&
							"added" !== e &&
							"removed" !== e &&
							"enable" !== e &&
							"disable" !== e) ||
							(this._gsEventHandler[e] &&
								this.el.removeEventListener(e, this._gsEventHandler[e])),
					  delete this._gsEventHandler[e],
					  this);
			}
			offAll() {
				return (
					Object.keys(this._gsEventHandler).forEach((e) => this.off(e)), this
				);
			}
			removeWidget(e, t = !0, i = !0) {
				return (
					C.getElements(e).forEach((e) => {
						if (e.parentElement && e.parentElement !== this.el) return;
						let s = e.gridstackNode;
						s || (s = this.engine.nodes.find((t) => e === t.el)),
							s &&
								(t && C.addRemoveCB && C.addRemoveCB(this.el, s, !1, !1),
								delete e.gridstackNode,
								this._removeDD(e),
								this.engine.removeNode(s, t, i),
								t && e.parentElement && e.remove());
					}),
					i && (this._triggerRemoveEvent(), this._triggerChangeEvent()),
					this
				);
			}
			removeAll(e = !0, t = !0) {
				return (
					this.engine.nodes.forEach((t) => {
						e && C.addRemoveCB && C.addRemoveCB(this.el, t, !1, !1),
							delete t.el.gridstackNode,
							this.opts.staticGrid || this._removeDD(t.el);
					}),
					this.engine.removeAll(e, t),
					t && this._triggerRemoveEvent(),
					this
				);
			}
			setAnimation(e = this.opts.animate, t) {
				return (
					t
						? setTimeout(() => {
								this.opts && this.setAnimation(e);
						  })
						: e
						? this.el.classList.add("grid-stack-animate")
						: this.el.classList.remove("grid-stack-animate"),
					this
				);
			}
			hasAnimationCSS() {
				return this.el.classList.contains("grid-stack-animate");
			}
			setStatic(e, t = !0, i = !0) {
				return (
					!!this.opts.staticGrid === e ||
						(e ? (this.opts.staticGrid = !0) : delete this.opts.staticGrid,
						this._setupRemoveDrop(),
						this._setupAcceptWidget(),
						this.engine.nodes.forEach((s) => {
							this._prepareDragDropByNode(s),
								s.subGrid && i && s.subGrid.setStatic(e, t, i);
						}),
						t && this._setStaticClass()),
					this
				);
			}
			update(e, t) {
				if (arguments.length > 2) {
					console.warn(
						"gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update(el, {x, w, content, ...})`. It will be removed soon"
					);
					let i = arguments,
						s = 1;
					return (
						(t = { x: i[s++], y: i[s++], w: i[s++], h: i[s++] }),
						this.update(e, t)
					);
				}
				return (
					C.getElements(e).forEach((e) => {
						let s = e?.gridstackNode;
						if (!s) return;
						let o = i.cloneDeep(t);
						this.engine.nodeBoundFix(o), delete o.autoPosition, delete o.id;
						let n,
							r = ["x", "y", "w", "h"];
						if (
							(r.some((e) => void 0 !== o[e] && o[e] !== s[e]) &&
								((n = {}),
								r.forEach((e) => {
									(n[e] = void 0 !== o[e] ? o[e] : s[e]), delete o[e];
								})),
							!n && (o.minW || o.minH || o.maxW || o.maxH) && (n = {}),
							void 0 !== o.content)
						) {
							const t = e.querySelector(".grid-stack-item-content");
							t &&
								t.innerHTML !== o.content &&
								((t.innerHTML = o.content),
								s.subGrid?.el &&
									(t.appendChild(s.subGrid.el),
									s.subGrid.opts.styleInHead || s.subGrid._updateStyles(!0))),
								delete o.content;
						}
						let l = !1,
							h = !1;
						for (const e in o)
							"_" !== e[0] &&
								s[e] !== o[e] &&
								((s[e] = o[e]),
								(l = !0),
								(h =
									h ||
									(!this.opts.staticGrid &&
										("noResize" === e || "noMove" === e || "locked" === e))));
						if ((i.sanitizeMinMax(s), n)) {
							const e = void 0 !== n.w && n.w !== s.w;
							this.moveNode(s, n),
								this.resizeToContentCheck(e, s),
								delete s._orig;
						}
						(n || l) && this._writeAttr(e, s),
							h && this._prepareDragDropByNode(s);
					}),
					this
				);
			}
			moveNode(e, t) {
				const i = e._updating;
				i || this.engine.cleanNodes().beginUpdate(e),
					this.engine.moveNode(e, t),
					this._updateContainerHeight(),
					i || (this._triggerChangeEvent(), this.engine.endUpdate());
			}
			resizeToContent(e) {
				if (!e) return;
				if ((e.classList.remove("size-to-content-max"), !e.clientHeight))
					return;
				const t = e.gridstackNode;
				if (!t) return;
				const i = t.grid;
				if (!i || e.parentElement !== i.el) return;
				const s = i.getCellHeight(!0);
				if (!s) return;
				let o,
					n = t.h ? t.h * s : e.clientHeight;
				if (
					(t.resizeToContentParent &&
						(o = e.querySelector(t.resizeToContentParent)),
					o || (o = e.querySelector(C.resizeToContentParent)),
					!o)
				)
					return;
				const r = e.clientHeight - o.clientHeight,
					l = t.h ? t.h * s - r : o.clientHeight;
				let h;
				if (t.subGrid) h = t.subGrid.getRow() * t.subGrid.getCellHeight(!0);
				else {
					if (t.subGridOpts?.children?.length) return;
					{
						const e = o.firstElementChild;
						if (!e)
							return void console.error(
								`Error: GridStack.resizeToContent() widget id:${t.id} '${C.resizeToContentParent}'.firstElementChild is null, make sure to have a div like container. Skipping sizing.`
							);
						h = e.getBoundingClientRect().height || l;
					}
				}
				if (l === h) return;
				n += h - l;
				let a = Math.ceil(n / s);
				const d = Number.isInteger(t.sizeToContent) ? t.sizeToContent : 0;
				d && a > d && ((a = d), e.classList.add("size-to-content-max")),
					t.minH && a < t.minH
						? (a = t.minH)
						: t.maxH && a > t.maxH && (a = t.maxH),
					a !== t.h &&
						((i._ignoreLayoutsNodeChange = !0),
						i.moveNode(t, { h: a }),
						delete i._ignoreLayoutsNodeChange);
			}
			resizeToContentCBCheck(e) {
				C.resizeToContentCB ? C.resizeToContentCB(e) : this.resizeToContent(e);
			}
			rotate(e, t) {
				return (
					C.getElements(e).forEach((e) => {
						let s = e.gridstackNode;
						if (!i.canBeRotated(s)) return;
						const o = {
							w: s.h,
							h: s.w,
							minH: s.minW,
							minW: s.minH,
							maxH: s.maxW,
							maxW: s.maxH,
						};
						if (t) {
							let e = t.left > 0 ? Math.floor(t.left / this.cellWidth()) : 0,
								i = t.top > 0 ? Math.floor(t.top / this.opts.cellHeight) : 0;
							(o.x = s.x + e - (s.h - (i + 1))), (o.y = s.y + i - e);
						}
						Object.keys(o).forEach((e) => {
							void 0 === o[e] && delete o[e];
						});
						const n = s._orig;
						this.update(e, o), (s._orig = n);
					}),
					this
				);
			}
			margin(e) {
				if (!("string" == typeof e && e.split(" ").length > 1)) {
					let t = i.parseHeight(e);
					if (this.opts.marginUnit === t.unit && this.opts.margin === t.h)
						return;
				}
				return (
					(this.opts.margin = e),
					(this.opts.marginTop =
						this.opts.marginBottom =
						this.opts.marginLeft =
						this.opts.marginRight =
							void 0),
					this._initMargin(),
					this._updateStyles(!0),
					this
				);
			}
			getMargin() {
				return this.opts.margin;
			}
			willItFit(e) {
				if (arguments.length > 1) {
					console.warn(
						"gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon"
					);
					let e = arguments,
						t = 0,
						i = {
							x: e[t++],
							y: e[t++],
							w: e[t++],
							h: e[t++],
							autoPosition: e[t++],
						};
					return this.willItFit(i);
				}
				return this.engine.willItFit(e);
			}
			_triggerChangeEvent() {
				if (this.engine.batchMode) return this;
				let e = this.engine.getDirtyNodes(!0);
				return (
					e &&
						e.length &&
						(this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(e),
						this._triggerEvent("change", e)),
					this.engine.saveInitial(),
					this
				);
			}
			_triggerAddEvent() {
				if (this.engine.batchMode) return this;
				if (this.engine.addedNodes?.length) {
					this._ignoreLayoutsNodeChange ||
						this.engine.layoutsNodesChange(this.engine.addedNodes),
						this.engine.addedNodes.forEach((e) => {
							delete e._dirty;
						});
					const e = [...this.engine.addedNodes];
					(this.engine.addedNodes = []), this._triggerEvent("added", e);
				}
				return this;
			}
			_triggerRemoveEvent() {
				if (this.engine.batchMode) return this;
				if (this.engine.removedNodes?.length) {
					const e = [...this.engine.removedNodes];
					(this.engine.removedNodes = []), this._triggerEvent("removed", e);
				}
				return this;
			}
			_triggerEvent(e, t) {
				let i = t
					? new CustomEvent(e, { bubbles: !1, detail: t })
					: new Event(e);
				return this.el.dispatchEvent(i), this;
			}
			_removeStylesheet() {
				if (this._styles) {
					const e = this.opts.styleInHead ? void 0 : this.el.parentNode;
					i.removeStylesheet(this._styleSheetClass, e), delete this._styles;
				}
				return this;
			}
			_updateStyles(e = !1, t) {
				if (
					(e && this._removeStylesheet(),
					void 0 === t && (t = this.getRow()),
					this._updateContainerHeight(),
					0 === this.opts.cellHeight)
				)
					return this;
				let s = this.opts.cellHeight,
					o = this.opts.cellHeightUnit,
					n = `.${this._styleSheetClass} > .${this.opts.itemClass}`;
				if (!this._styles) {
					const e = this.opts.styleInHead ? void 0 : this.el.parentNode;
					if (
						((this._styles = i.createStylesheet(this._styleSheetClass, e, {
							nonce: this.opts.nonce,
						})),
						!this._styles)
					)
						return this;
					(this._styles._max = 0),
						i.addCSSRule(this._styles, n, `height: ${s}${o}`);
					let t = this.opts.marginTop + this.opts.marginUnit,
						r = this.opts.marginBottom + this.opts.marginUnit,
						l = this.opts.marginRight + this.opts.marginUnit,
						h = this.opts.marginLeft + this.opts.marginUnit,
						a = `${n} > .grid-stack-item-content`,
						d = `.${this._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
					i.addCSSRule(
						this._styles,
						a,
						`top: ${t}; right: ${l}; bottom: ${r}; left: ${h};`
					),
						i.addCSSRule(
							this._styles,
							d,
							`top: ${t}; right: ${l}; bottom: ${r}; left: ${h};`
						),
						i.addCSSRule(this._styles, `${n} > .ui-resizable-n`, `top: ${t};`),
						i.addCSSRule(
							this._styles,
							`${n} > .ui-resizable-s`,
							`bottom: ${r}`
						),
						i.addCSSRule(
							this._styles,
							`${n} > .ui-resizable-ne`,
							`right: ${l}`
						),
						i.addCSSRule(this._styles, `${n} > .ui-resizable-e`, `right: ${l}`),
						i.addCSSRule(
							this._styles,
							`${n} > .ui-resizable-se`,
							`right: ${l}; bottom: ${r}`
						),
						i.addCSSRule(this._styles, `${n} > .ui-resizable-nw`, `left: ${h}`),
						i.addCSSRule(this._styles, `${n} > .ui-resizable-w`, `left: ${h}`),
						i.addCSSRule(
							this._styles,
							`${n} > .ui-resizable-sw`,
							`left: ${h}; bottom: ${r}`
						);
				}
				if ((t = t || this._styles._max) > this._styles._max) {
					let e = (e) => s * e + o;
					for (let s = this._styles._max + 1; s <= t; s++)
						i.addCSSRule(this._styles, `${n}[gs-y="${s}"]`, `top: ${e(s)}`),
							i.addCSSRule(
								this._styles,
								`${n}[gs-h="${s + 1}"]`,
								`height: ${e(s + 1)}`
							);
					this._styles._max = t;
				}
				return this;
			}
			_updateContainerHeight() {
				if (!this.engine || this.engine.batchMode) return this;
				const e = this.parentGridItem;
				let t = this.getRow() + this._extraDragRow;
				const s = this.opts.cellHeight,
					o = this.opts.cellHeightUnit;
				if (!s) return this;
				if (!e) {
					const e = i.parseHeight(getComputedStyle(this.el).minHeight);
					if (e.h > 0 && e.unit === o) {
						const i = Math.floor(e.h / s);
						t < i && (t = i);
					}
				}
				return (
					this.el.setAttribute("gs-current-row", String(t)),
					this.el.style.removeProperty("min-height"),
					this.el.style.removeProperty("height"),
					t && (this.el.style[e ? "minHeight" : "height"] = t * s + o),
					e &&
						!e.grid.engine.batchMode &&
						i.shouldSizeToContent(e) &&
						e.grid.resizeToContentCBCheck(e.el),
					this
				);
			}
			_prepareElement(e, t = !1, s) {
				(s = s || this._readAttr(e)),
					(e.gridstackNode = s),
					(s.el = e),
					(s.grid = this),
					(s = this.engine.addNode(s, t)),
					this._writeAttr(e, s),
					e.classList.add(o.itemClass, this.opts.itemClass);
				const n = i.shouldSizeToContent(s);
				return (
					n
						? e.classList.add("size-to-content")
						: e.classList.remove("size-to-content"),
					n && this.resizeToContentCheck(!1, s),
					this._prepareDragDropByNode(s),
					this
				);
			}
			_writePosAttr(e, t) {
				return (
					void 0 !== t.x && null !== t.x && e.setAttribute("gs-x", String(t.x)),
					void 0 !== t.y && null !== t.y && e.setAttribute("gs-y", String(t.y)),
					t.w > 1
						? e.setAttribute("gs-w", String(t.w))
						: e.removeAttribute("gs-w"),
					t.h > 1
						? e.setAttribute("gs-h", String(t.h))
						: e.removeAttribute("gs-h"),
					this
				);
			}
			_writeAttr(e, t) {
				if (!t) return this;
				this._writePosAttr(e, t);
				let i = {
					autoPosition: "gs-auto-position",
					noResize: "gs-no-resize",
					noMove: "gs-no-move",
					locked: "gs-locked",
					id: "gs-id",
				};
				for (const s in i)
					t[s] ? e.setAttribute(i[s], String(t[s])) : e.removeAttribute(i[s]);
				return this;
			}
			_readAttr(e, t = !0) {
				let s = {};
				(s.x = i.toNumber(e.getAttribute("gs-x"))),
					(s.y = i.toNumber(e.getAttribute("gs-y"))),
					(s.w = i.toNumber(e.getAttribute("gs-w"))),
					(s.h = i.toNumber(e.getAttribute("gs-h"))),
					(s.autoPosition = i.toBool(e.getAttribute("gs-auto-position"))),
					(s.noResize = i.toBool(e.getAttribute("gs-no-resize"))),
					(s.noMove = i.toBool(e.getAttribute("gs-no-move"))),
					(s.locked = i.toBool(e.getAttribute("gs-locked"))),
					(s.id = e.getAttribute("gs-id")),
					(s.maxW = i.toNumber(e.getAttribute("gs-max-w"))),
					(s.minW = i.toNumber(e.getAttribute("gs-min-w"))),
					(s.maxH = i.toNumber(e.getAttribute("gs-max-h"))),
					(s.minH = i.toNumber(e.getAttribute("gs-min-h"))),
					t &&
						(1 === s.w && e.removeAttribute("gs-w"),
						1 === s.h && e.removeAttribute("gs-h"),
						s.maxW && e.removeAttribute("gs-max-w"),
						s.minW && e.removeAttribute("gs-min-w"),
						s.maxH && e.removeAttribute("gs-max-h"),
						s.minH && e.removeAttribute("gs-min-h"));
				for (const e in s) {
					if (!s.hasOwnProperty(e)) return;
					s[e] || 0 === s[e] || delete s[e];
				}
				return s;
			}
			_setStaticClass() {
				let e = ["grid-stack-static"];
				return (
					this.opts.staticGrid
						? (this.el.classList.add(...e),
						  this.el.setAttribute("gs-static", "true"))
						: (this.el.classList.remove(...e),
						  this.el.removeAttribute("gs-static")),
					this
				);
			}
			onResize() {
				if (!this.el?.clientWidth) return;
				if (this.prevWidth === this.el.clientWidth) return;
				(this.prevWidth = this.el.clientWidth), this.batchUpdate();
				let e = !1;
				return (
					this._autoColumn && this.parentGridItem
						? this.opts.column !== this.parentGridItem.w &&
						  (this.column(this.parentGridItem.w, "none"), (e = !0))
						: (e = this.checkDynamicColumn()),
					this._isAutoCellHeight && this.cellHeight(),
					this.engine.nodes.forEach((e) => {
						e.subGrid && e.subGrid.onResize();
					}),
					this._skipInitialResize || this.resizeToContentCheck(e),
					delete this._skipInitialResize,
					this.batchUpdate(!1),
					this
				);
			}
			resizeToContentCheck(e = !1, t = undefined) {
				if (this.engine) {
					if (e && this.hasAnimationCSS())
						return setTimeout(() => this.resizeToContentCheck(!1, t), 310);
					if (t) i.shouldSizeToContent(t) && this.resizeToContentCBCheck(t.el);
					else if (this.engine.nodes.some((e) => i.shouldSizeToContent(e))) {
						const e = [...this.engine.nodes];
						this.batchUpdate(),
							e.forEach((e) => {
								i.shouldSizeToContent(e) && this.resizeToContentCBCheck(e.el);
							}),
							this.batchUpdate(!1);
					}
					this._gsEventHandler.resizecontent &&
						this._gsEventHandler.resizecontent(
							null,
							t ? [t] : this.engine.nodes
						);
				}
			}
			_updateResizeEvent(e = !1) {
				const t =
					!this.parentGridItem &&
					(this._isAutoCellHeight ||
						this.opts.sizeToContent ||
						this.opts.columnOpts ||
						this.engine.nodes.find((e) => e.sizeToContent));
				return (
					e || !t || this.resizeObserver
						? (!e && t) ||
						  !this.resizeObserver ||
						  (this.resizeObserver.disconnect(),
						  delete this.resizeObserver,
						  delete this._sizeThrottle)
						: ((this._sizeThrottle = i.throttle(
								() => this.onResize(),
								this.opts.cellHeightThrottle
						  )),
						  (this.resizeObserver = new ResizeObserver(() =>
								this._sizeThrottle()
						  )),
						  this.resizeObserver.observe(this.el),
						  (this._skipInitialResize = !0)),
					this
				);
			}
			static getElement(e = ".grid-stack-item") {
				return i.getElement(e);
			}
			static getElements(e = ".grid-stack-item") {
				return i.getElements(e);
			}
			static getGridElement(e) {
				return C.getElement(e);
			}
			static getGridElements(e) {
				return i.getElements(e);
			}
			_initMargin() {
				let e,
					t = 0,
					s = [];
				return (
					"string" == typeof this.opts.margin &&
						(s = this.opts.margin.split(" ")),
					2 === s.length
						? ((this.opts.marginTop = this.opts.marginBottom = s[0]),
						  (this.opts.marginLeft = this.opts.marginRight = s[1]))
						: 4 === s.length
						? ((this.opts.marginTop = s[0]),
						  (this.opts.marginRight = s[1]),
						  (this.opts.marginBottom = s[2]),
						  (this.opts.marginLeft = s[3]))
						: ((e = i.parseHeight(this.opts.margin)),
						  (this.opts.marginUnit = e.unit),
						  (t = this.opts.margin = e.h)),
					void 0 === this.opts.marginTop
						? (this.opts.marginTop = t)
						: ((e = i.parseHeight(this.opts.marginTop)),
						  (this.opts.marginTop = e.h),
						  delete this.opts.margin),
					void 0 === this.opts.marginBottom
						? (this.opts.marginBottom = t)
						: ((e = i.parseHeight(this.opts.marginBottom)),
						  (this.opts.marginBottom = e.h),
						  delete this.opts.margin),
					void 0 === this.opts.marginRight
						? (this.opts.marginRight = t)
						: ((e = i.parseHeight(this.opts.marginRight)),
						  (this.opts.marginRight = e.h),
						  delete this.opts.margin),
					void 0 === this.opts.marginLeft
						? (this.opts.marginLeft = t)
						: ((e = i.parseHeight(this.opts.marginLeft)),
						  (this.opts.marginLeft = e.h),
						  delete this.opts.margin),
					(this.opts.marginUnit = e.unit),
					this.opts.marginTop === this.opts.marginBottom &&
						this.opts.marginLeft === this.opts.marginRight &&
						this.opts.marginTop === this.opts.marginRight &&
						(this.opts.margin = this.opts.marginTop),
					this
				);
			}
			static getDD() {
				return x;
			}
			static setupDragIn(e, t, s = document) {
				void 0 !== t?.pause && (r.pauseDrag = t.pause),
					(t = { ...n, ...(t || {}) });
				let o = "string" == typeof e ? i.getElements(e, s) : e;
				o.length &&
					o?.forEach((e) => {
						x.isDraggable(e) || x.dragIn(e, t);
					});
			}
			movable(e, t) {
				return (
					this.opts.staticGrid ||
						C.getElements(e).forEach((e) => {
							const i = e.gridstackNode;
							i &&
								(t ? delete i.noMove : (i.noMove = !0),
								this._prepareDragDropByNode(i));
						}),
					this
				);
			}
			resizable(e, t) {
				return (
					this.opts.staticGrid ||
						C.getElements(e).forEach((e) => {
							let i = e.gridstackNode;
							i &&
								(t ? delete i.noResize : (i.noResize = !0),
								this._prepareDragDropByNode(i));
						}),
					this
				);
			}
			disable(e = !0) {
				if (!this.opts.staticGrid)
					return (
						this.enableMove(!1, e),
						this.enableResize(!1, e),
						this._triggerEvent("disable"),
						this
					);
			}
			enable(e = !0) {
				if (!this.opts.staticGrid)
					return (
						this.enableMove(!0, e),
						this.enableResize(!0, e),
						this._triggerEvent("enable"),
						this
					);
			}
			enableMove(e, t = !0) {
				return (
					this.opts.staticGrid ||
						(e ? delete this.opts.disableDrag : (this.opts.disableDrag = !0),
						this.engine.nodes.forEach((i) => {
							this._prepareDragDropByNode(i),
								i.subGrid && t && i.subGrid.enableMove(e, t);
						})),
					this
				);
			}
			enableResize(e, t = !0) {
				return (
					this.opts.staticGrid ||
						(e
							? delete this.opts.disableResize
							: (this.opts.disableResize = !0),
						this.engine.nodes.forEach((i) => {
							this._prepareDragDropByNode(i),
								i.subGrid && t && i.subGrid.enableResize(e, t);
						})),
					this
				);
			}
			_removeDD(e) {
				return (
					x.draggable(e, "destroy").resizable(e, "destroy"),
					e.gridstackNode && delete e.gridstackNode._initDD,
					delete e.ddElement,
					this
				);
			}
			_setupAcceptWidget() {
				if (
					this.opts.staticGrid ||
					(!this.opts.acceptWidgets && !this.opts.removable)
				)
					return x.droppable(this.el, "destroy"), this;
				let e,
					t,
					s = (s, o, n) => {
						let r = o.gridstackNode;
						if (!r) return;
						if (((n = n || o), !r.grid?.el)) {
							n.style.transform = `scale(${1 / this.dragTransform.xScale},${
								1 / this.dragTransform.yScale
							})`;
							const e = n.getBoundingClientRect();
							(n.style.left =
								e.x +
								((this.dragTransform.xScale - 1) * (s.clientX - e.x)) /
									this.dragTransform.xScale +
								"px"),
								(n.style.top =
									e.y +
									((this.dragTransform.yScale - 1) * (s.clientY - e.y)) /
										this.dragTransform.yScale +
									"px"),
								(n.style.transformOrigin = "0px 0px");
						}
						let l = this.el.getBoundingClientRect(),
							{ top: h, left: a } = n.getBoundingClientRect();
						(a -= l.left), (h -= l.top);
						let d = {
							position: {
								top: h * this.dragTransform.xScale,
								left: a * this.dragTransform.yScale,
							},
						};
						if (r._temporaryRemoved) {
							if (
								((r.x = Math.max(0, Math.round(a / t))),
								(r.y = Math.max(0, Math.round(h / e))),
								delete r.autoPosition,
								this.engine.nodeBoundFix(r),
								!this.engine.willItFit(r))
							) {
								if (((r.autoPosition = !0), !this.engine.willItFit(r)))
									return void x.off(o, "drag");
								r._willFitPos &&
									(i.copyPos(r, r._willFitPos), delete r._willFitPos);
							}
							this._onStartMoving(n, s, d, r, t, e);
						} else this._dragOrResize(n, s, d, r, t, e);
					};
				return (
					x
						.droppable(this.el, {
							accept: (e) => {
								let t = e.gridstackNode || this._readAttr(e, !1);
								if (t?.grid === this) return !0;
								if (!this.opts.acceptWidgets) return !1;
								let i = !0;
								if ("function" == typeof this.opts.acceptWidgets)
									i = this.opts.acceptWidgets(e);
								else {
									let t =
										!0 === this.opts.acceptWidgets
											? ".grid-stack-item"
											: this.opts.acceptWidgets;
									i = e.matches(t);
								}
								if (i && t && this.opts.maxRow) {
									let e = { w: t.w, h: t.h, minW: t.minW, minH: t.minH };
									i = this.engine.willItFit(e);
								}
								return i;
							},
						})
						.on(this.el, "dropover", (i, o, n) => {
							let r = o.gridstackNode;
							if (r?.grid === this && !r._temporaryRemoved) return !1;
							r?.grid &&
								r.grid !== this &&
								!r._temporaryRemoved &&
								r.grid._leave(o, n),
								(t = this.cellWidth()),
								(e = this.getCellHeight(!0)),
								r || (r = this._readAttr(o, !1)),
								r.grid || ((r._isExternal = !0), (o.gridstackNode = r)),
								(n = n || o);
							let l = r.w || Math.round(n.offsetWidth / t) || 1,
								h = r.h || Math.round(n.offsetHeight / e) || 1;
							return (
								r.grid && r.grid !== this
									? (o._gridstackNodeOrig || (o._gridstackNodeOrig = r),
									  (o.gridstackNode = r = { ...r, w: l, h, grid: this }),
									  delete r.x,
									  delete r.y,
									  this.engine.cleanupNode(r).nodeBoundFix(r),
									  (r._initDD = r._isExternal = r._temporaryRemoved = !0))
									: ((r.w = l), (r.h = h), (r._temporaryRemoved = !0)),
								C._itemRemoving(r.el, !1),
								x.on(o, "drag", s),
								s(i, o, n),
								!1
							);
						})
						.on(this.el, "dropout", (e, t, i) => {
							let s = t.gridstackNode;
							return (
								!!s &&
								((s.grid && s.grid !== this) ||
									(this._leave(t, i), this._isTemp && this.removeAsSubGrid(s)),
								!1)
							);
						})
						.on(this.el, "drop", (e, t, s) => {
							let o = t.gridstackNode;
							if (o?.grid === this && !o._isExternal) return !1;
							const n = !!this.placeholder.parentElement;
							this.placeholder.remove();
							const r = n && this.opts.animate;
							r && this.setAnimation(!1);
							let l = t._gridstackNodeOrig;
							if (
								(delete t._gridstackNodeOrig, n && l?.grid && l.grid !== this)
							) {
								let e = l.grid;
								e.engine.removeNodeFromLayoutCache(l),
									e.engine.removedNodes.push(l),
									e._triggerRemoveEvent()._triggerChangeEvent(),
									e.parentGridItem &&
										!e.engine.nodes.length &&
										e.opts.subGridDynamic &&
										e.removeAsSubGrid();
							}
							if (!o) return !1;
							if (
								(n && (this.engine.cleanupNode(o), (o.grid = this)),
								delete o.grid?._isTemp,
								x.off(t, "drag"),
								s !== t
									? (s.remove(),
									  (t.gridstackNode = l),
									  n && (t = t.cloneNode(!0)))
									: (t.remove(), this._removeDD(t)),
								!n)
							)
								return !1;
							(t.gridstackNode = o), (o.el = t);
							let h = o.subGrid?.el?.gridstack;
							return (
								i.copyPos(o, this._readAttr(this.placeholder)),
								i.removePositioningStyles(t),
								this.el.appendChild(t),
								this._prepareElement(t, !0, o),
								h &&
									((h.parentGridItem = o),
									h.opts.styleInHead || h._updateStyles(!0)),
								this._updateContainerHeight(),
								this.engine.addedNodes.push(o),
								this._triggerAddEvent(),
								this._triggerChangeEvent(),
								this.engine.endUpdate(),
								this._gsEventHandler.dropped &&
									this._gsEventHandler.dropped(
										{ ...e, type: "dropped" },
										l && l.grid ? l : void 0,
										o
									),
								r && this.setAnimation(this.opts.animate, !0),
								!1
							);
						}),
					this
				);
			}
			static _itemRemoving(e, t) {
				const i = e ? e.gridstackNode : void 0;
				i?.grid &&
					!e.classList.contains(i.grid.opts.removableOptions.decline) &&
					(t ? (i._isAboutToRemove = !0) : delete i._isAboutToRemove,
					t
						? e.classList.add("grid-stack-item-removing")
						: e.classList.remove("grid-stack-item-removing"));
			}
			_setupRemoveDrop() {
				if ("string" != typeof this.opts.removable) return this;
				let e = document.querySelector(this.opts.removable);
				return e
					? (this.opts.staticGrid ||
							x.isDroppable(e) ||
							x
								.droppable(e, this.opts.removableOptions)
								.on(e, "dropover", (e, t) => C._itemRemoving(t, !0))
								.on(e, "dropout", (e, t) => C._itemRemoving(t, !1)),
					  this)
					: this;
			}
			_prepareDragDropByNode(e) {
				let t = e.el;
				const s = e.noMove || this.opts.disableDrag,
					o = e.noResize || this.opts.disableResize;
				if (this.opts.staticGrid || (s && o))
					return (
						e._initDD && (this._removeDD(t), delete e._initDD),
						t.classList.add("ui-draggable-disabled", "ui-resizable-disabled"),
						this
					);
				if (!e._initDD) {
					let s,
						o,
						n = (i, n) => {
							this._gsEventHandler[i.type] &&
								this._gsEventHandler[i.type](i, i.target),
								(s = this.cellWidth()),
								(o = this.getCellHeight(!0)),
								this._onStartMoving(t, i, n, e, s, o);
						},
						r = (i, n) => {
							this._dragOrResize(t, i, n, e, s, o);
						},
						l = (s) => {
							this.placeholder.remove(),
								delete e._moving,
								delete e._event,
								delete e._lastTried;
							const o = e.w !== e._orig.w;
							let n = s.target;
							if (n.gridstackNode && n.gridstackNode.grid === this) {
								if (((e.el = n), e._isAboutToRemove)) {
									let i = t.gridstackNode.grid;
									i._gsEventHandler[s.type] && i._gsEventHandler[s.type](s, n),
										i.engine.nodes.push(e),
										i.removeWidget(t, !0, !0);
								} else
									i.removePositioningStyles(n),
										e._temporaryRemoved
											? (i.copyPos(e, e._orig),
											  this._writePosAttr(n, e),
											  this.engine.addNode(e))
											: this._writePosAttr(n, e),
										this._gsEventHandler[s.type] &&
											this._gsEventHandler[s.type](s, n);
								(this._extraDragRow = 0),
									this._updateContainerHeight(),
									this._triggerChangeEvent(),
									this.engine.endUpdate(),
									"resizestop" === s.type &&
										(Number.isInteger(e.sizeToContent) &&
											(e.sizeToContent = e.h),
										this.resizeToContentCheck(o, e));
							}
						};
					x
						.draggable(t, { start: n, stop: l, drag: r })
						.resizable(t, { start: n, stop: l, resize: r }),
						(e._initDD = !0);
				}
				return (
					x
						.draggable(t, s ? "disable" : "enable")
						.resizable(t, o ? "disable" : "enable"),
					this
				);
			}
			_onStartMoving(e, t, s, o, n, r) {
				if (
					(this.engine.cleanNodes().beginUpdate(o),
					this._writePosAttr(this.placeholder, o),
					this.el.appendChild(this.placeholder),
					(this.placeholder.gridstackNode = o),
					o.grid?.el)
				)
					this.dragTransform = i.getValuesFromTransformedElement(e);
				else if (this.placeholder && this.placeholder.closest(".grid-stack")) {
					const e = this.placeholder.closest(".grid-stack");
					this.dragTransform = i.getValuesFromTransformedElement(e);
				} else
					this.dragTransform = { xScale: 1, xOffset: 0, yScale: 1, yOffset: 0 };
				if (
					((o.el = this.placeholder),
					(o._lastUiPosition = s.position),
					(o._prevYPix = s.position.top),
					(o._moving = "dragstart" === t.type),
					delete o._lastTried,
					"dropover" === t.type &&
						o._temporaryRemoved &&
						(this.engine.addNode(o), (o._moving = !0)),
					this.engine.cacheRects(
						n,
						r,
						this.opts.marginTop,
						this.opts.marginRight,
						this.opts.marginBottom,
						this.opts.marginLeft
					),
					"resizestart" === t.type)
				) {
					const t = this.getColumn() - o.x,
						i = (this.opts.maxRow || Number.MAX_SAFE_INTEGER) - o.y;
					x.resizable(e, "option", "minWidth", n * Math.min(o.minW || 1, t))
						.resizable(e, "option", "minHeight", r * Math.min(o.minH || 1, i))
						.resizable(
							e,
							"option",
							"maxWidth",
							n * Math.min(o.maxW || Number.MAX_SAFE_INTEGER, t)
						)
						.resizable(
							e,
							"option",
							"maxWidthMoveLeft",
							n * Math.min(o.maxW || Number.MAX_SAFE_INTEGER, o.x + o.w)
						)
						.resizable(
							e,
							"option",
							"maxHeight",
							r * Math.min(o.maxH || Number.MAX_SAFE_INTEGER, i)
						)
						.resizable(
							e,
							"option",
							"maxHeightMoveUp",
							r * Math.min(o.maxH || Number.MAX_SAFE_INTEGER, o.y + o.h)
						);
				}
			}
			_dragOrResize(e, t, s, o, n, r) {
				let l,
					h = { ...o._orig },
					a = this.opts.marginLeft,
					d = this.opts.marginRight,
					c = this.opts.marginTop,
					g = this.opts.marginBottom,
					p = Math.round(0.1 * r),
					u = Math.round(0.1 * n);
				if (
					((a = Math.min(a, u)),
					(d = Math.min(d, u)),
					(c = Math.min(c, p)),
					(g = Math.min(g, p)),
					"drag" === t.type)
				) {
					if (o._temporaryRemoved) return;
					let t = s.position.top - o._prevYPix;
					(o._prevYPix = s.position.top),
						!1 !== this.opts.draggable.scroll &&
							i.updateScrollPosition(e, s.position, t);
					let l =
							s.position.left +
							(s.position.left > o._lastUiPosition.left ? -d : a),
						p =
							s.position.top +
							(s.position.top > o._lastUiPosition.top ? -g : c);
					(h.x = Math.round(l / n)), (h.y = Math.round(p / r));
					let u = this._extraDragRow;
					if (this.engine.collide(o, h)) {
						let e = this.getRow(),
							t = Math.max(0, h.y + o.h - e);
						this.opts.maxRow &&
							e + t > this.opts.maxRow &&
							(t = Math.max(0, this.opts.maxRow - e)),
							(this._extraDragRow = t);
					} else this._extraDragRow = 0;
					if (
						(this._extraDragRow !== u && this._updateContainerHeight(),
						o.x === h.x && o.y === h.y)
					)
						return;
				} else if ("resize" === t.type) {
					if (h.x < 0) return;
					if (
						(i.updateScrollResize(t, e, r),
						(h.w = Math.round((s.size.width - a) / n)),
						(h.h = Math.round((s.size.height - c) / r)),
						o.w === h.w && o.h === h.h)
					)
						return;
					if (o._lastTried && o._lastTried.w === h.w && o._lastTried.h === h.h)
						return;
					let d = s.position.left + a,
						g = s.position.top + c;
					(h.x = Math.round(d / n)), (h.y = Math.round(g / r)), (l = !0);
				}
				(o._event = t), (o._lastTried = h);
				let m = {
					x: s.position.left + a,
					y: s.position.top + c,
					w: (s.size ? s.size.width : o.w * n) - a - d,
					h: (s.size ? s.size.height : o.h * r) - c - g,
				};
				if (
					this.engine.moveNodeCheck(o, {
						...h,
						cellWidth: n,
						cellHeight: r,
						rect: m,
						resizing: l,
					})
				) {
					(o._lastUiPosition = s.position),
						this.engine.cacheRects(n, r, c, d, g, a),
						delete o._skipDown,
						l && o.subGrid && o.subGrid.onResize(),
						(this._extraDragRow = 0),
						this._updateContainerHeight();
					let e = t.target;
					this._writePosAttr(e, o),
						this._gsEventHandler[t.type] && this._gsEventHandler[t.type](t, e);
				}
			}
			_leave(e, t) {
				let i = e.gridstackNode;
				i &&
					(((t = t || e).style.transform = "scale(1)"),
					x.off(e, "drag"),
					i._temporaryRemoved ||
						((i._temporaryRemoved = !0),
						this.engine.removeNode(i),
						(i.el = i._isExternal && t ? t : e),
						!0 === this.opts.removable && C._itemRemoving(e, !0),
						e._gridstackNodeOrig
							? ((e.gridstackNode = e._gridstackNodeOrig),
							  delete e._gridstackNodeOrig)
							: i._isExternal &&
							  (delete i.el,
							  delete e.gridstackNode,
							  this.engine.restoreInitial())));
			}
			commit() {
				return this.batchUpdate(!1).prototype, this;
			}
		}
		return (
			(C.resizeToContentParent = ".grid-stack-item-content"),
			(C.Utils = i),
			(C.Engine = s),
			(C.GDRev = "10.3.1"),
			t.GridStack
		);
	})()
);
//# sourceMappingURL=gridstack-all.js.map
