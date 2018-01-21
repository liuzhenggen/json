function QueryParams() {
}
function Notify() {
    this.dom = {};
    var e = this;
    util.addEventListener(document, "keydown", function (t) {
        e.onKeyDown(t)
    })
}
function FileRetriever(e) {
    e = e || {}, this.options = {
        maxSize: void 0 != e.maxSize ? e.maxSize : 1048576,
        html5: void 0 != e.html5 ? e.html5 : !0
    }, this.timeout = Number(e.timeout) || 3e4, this.headers = {Accept: "application/json"}, this.scriptUrl = e.scriptUrl || "fileretriever.php", this.notify = e.notify || void 0, this.defaultFilename = "document.json", this.dom = {}
}
function OnlineStore(e) {
    this.url = e.url, this.notify = e.notify, this.queue = [], this.saving = !1, this.revs = {}, "/" !== this.url[this.url.length - 1] && (this.url += "/")
}
function Splitter(e) {
    if (!e || !e.container)throw new Error("params.container undefined in Splitter constructor");
    var t = this;
    util.addEventListener(e.container, "mousedown", function (e) {
        t.onMouseDown(e)
    }), this.container = e.container, this.snap = Number(e.snap) || 200, this.width = void 0, this.value = void 0, this.onChange = e.change ? e.change : function () {
    }, this.params = {}
}
function newFeatureInfo() {
    if (!localStorage.hideOnlineStorageMessage && new Date < new Date(2014, 10, 1)) {
        var e = app.notify.showMessage({
            type: "notification",
            closeButton: !0,
            message: '<p><span style="color: red;">NEW:</span> JSON Editor Online now features <b>online document storage!</b></p><p>You can load and save documents via the top right menu. Stored documents can be shared via their url. <a href="doc/index.html#main_menu" target="_blank">Click here</a> to read more.</p><p><input type="button" id="gotIt" value="Ok, got it"/></p>'
        });
        document.getElementById("gotIt").onclick = function () {
            localStorage.hideOnlineStorageMessage = !0, app.notify.removeMessage(e)
        }
    }
}
function addDragDropListener(e, t) {
    e.addEventListener("dragenter", function (e) {
        return e.stopPropagation(), e.preventDefault(), !1
    }), e.addEventListener("dragover", function (e) {
        return e.stopPropagation(), e.preventDefault(), !1
    }), e.addEventListener("drop", function (e) {
        if (e.stopPropagation(), e.preventDefault(), e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            var i = e.dataTransfer.files[0];
            if ("undefined" != typeof window.FileReader) {
                var n = new FileReader;
                n.onload = function (e) {
                    t(null, e.target.result, i.name)
                }, n.onerror = function (e) {
                    t(e)
                }, n.readAsText(i)
            } else t(new Error("Sorry, drag and drop is not supported by your browser."))
        }
    })
}
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? exports.JSONEditor = t() : e.JSONEditor = t()
}(this, function () {
    return function (e) {
        function t(n) {
            if (i[n])return i[n].exports;
            var r = i[n] = {exports: {}, id: n, loaded: !1};
            return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
        }

        var i = {};
        return t.m = e, t.c = i, t.p = "", t(0)
    }([function (e, t, i) {
        function n(e, t, i) {
            if (!(this instanceof n))throw new Error('JSONEditor constructor called without "new".');
            var r = l.getInternetExplorerVersion();
            if (-1 != r && 9 > r)throw new Error("Unsupported browser, IE9 or newer required. Please install the newest version of your browser.");
            if (t && (t.error && (console.warn('Option "error" has been renamed to "onError"'), t.onError = t.error, delete t.error), t.change && (console.warn('Option "change" has been renamed to "onChange"'), t.onChange = t.change, delete t.change), t.editable && (console.warn('Option "editable" has been renamed to "onEditable"'), t.onEditable = t.editable, delete t.editable), t)) {
                var o = ["ace", "theme", "ajv", "schema", "onChange", "onEditable", "onError", "onModeChange", "escapeUnicode", "history", "search", "mode", "modes", "name", "indentation"];
                Object.keys(t).forEach(function (e) {
                    -1 === o.indexOf(e) && console.warn('Unknown option "' + e + '". This option will be ignored')
                })
            }
            arguments.length && this._create(e, t, i)
        }

        var r;
        try {
            r = i(10)
        } catch (o) {
        }
        var s = i(1), a = i(2), l = i(3);
        n.modes = {}, n.prototype.DEBOUNCE_INTERVAL = 150, n.prototype._create = function (e, t, i) {
            this.container = e, this.options = t || {}, this.json = i || {};
            var n = this.options.mode || "tree";
            this.setMode(n)
        }, n.prototype._delete = function () {
        }, n.prototype.set = function (e) {
            this.json = e
        }, n.prototype.get = function () {
            return this.json
        }, n.prototype.setText = function (e) {
            this.json = l.parse(e)
        }, n.prototype.getText = function () {
            return JSON.stringify(this.json)
        }, n.prototype.setName = function (e) {
            this.options || (this.options = {}), this.options.name = e
        }, n.prototype.getName = function () {
            return this.options && this.options.name
        }, n.prototype.setMode = function (e) {
            var t, i, r = this.container, o = l.extend({}, this.options), s = o.mode;
            o.mode = e;
            var a = n.modes[e];
            if (!a)throw new Error('Unknown mode "' + o.mode + '"');
            try {
                var c = "text" == a.data;
                if (i = this.getName(), t = this[c ? "getText" : "get"](), this._delete(), l.clear(this), l.extend(this, a.mixin), this.create(r, o), this.setName(i), this[c ? "setText" : "set"](t), "function" == typeof a.load)try {
                    a.load.call(this)
                } catch (h) {
                    console.error(h)
                }
                if ("function" == typeof o.onModeChange && e !== s)try {
                    o.onModeChange(e, s)
                } catch (h) {
                    console.error(h)
                }
            } catch (h) {
                this._onError(h)
            }
        }, n.prototype.getMode = function () {
            return this.options.mode
        }, n.prototype._onError = function (e) {
            if (!this.options || "function" != typeof this.options.onError)throw e;
            this.options.onError(e)
        }, n.prototype.setSchema = function (e) {
            if (e) {
                var t;
                try {
                    t = this.options.ajv || r({allErrors: !0, verbose: !0})
                } catch (i) {
                    console.warn("Failed to create an instance of Ajv, JSON Schema validation is not available. Please use a JSONEditor bundle including Ajv, or pass an instance of Ajv as via the configuration option `ajv`.")
                }
                t && (this.validateSchema = t.compile(e), this.options.schema = e, this.validate())
            } else this.validateSchema = null, this.options.schema = null, this.validate()
        }, n.prototype.validate = function () {
        }, n.registerMode = function (e) {
            var t, i;
            if (l.isArray(e))for (t = 0; t < e.length; t++)n.registerMode(e[t]); else {
                if (!("mode"in e))throw new Error('Property "mode" missing');
                if (!("mixin"in e))throw new Error('Property "mixin" missing');
                if (!("data"in e))throw new Error('Property "data" missing');
                var r = e.mode;
                if (r in n.modes)throw new Error('Mode "' + r + '" already registered');
                if ("function" != typeof e.mixin.create)throw new Error('Required function "create" missing on mixin');
                var o = ["setMode", "registerMode", "modes"];
                for (t = 0; t < o.length; t++)if (i = o[t], i in e.mixin)throw new Error('Reserved property "' + i + '" not allowed in mixin');
                n.modes[r] = e
            }
        }, n.registerMode(s), n.registerMode(a), e.exports = n
    }, function (e, t, i) {
        var n = i(5), r = i(6), o = i(7), s = i(8), a = i(9), l = i(4), c = i(3), h = {};
        h.create = function (e, t) {
            if (!e)throw new Error("No container element provided.");
            this.container = e, this.dom = {}, this.highlighter = new n, this.selection = void 0, this.multiselection = {nodes: []}, this.validateSchema = null, this.errorNodes = [], this._setOptions(t), this.options.history && "view" !== this.options.mode && (this.history = new r(this)), this._createFrame(), this._createTable()
        }, h._delete = function () {
            this.frame && this.container && this.frame.parentNode == this.container && this.container.removeChild(this.frame)
        }, h._setOptions = function (e) {
            if (this.options = {
                    search: !0,
                    history: !0,
                    mode: "tree",
                    name: void 0,
                    schema: null
                }, e)for (var t in e)e.hasOwnProperty(t) && (this.options[t] = e[t]);
            this.setSchema(this.options.schema), this._debouncedValidate = c.debounce(this.validate.bind(this), this.DEBOUNCE_INTERVAL)
        };
        var d = void 0, u = null;
        h.set = function (e, t) {
            if (t && (console.warn('Second parameter "name" is deprecated. Use setName(name) instead.'), this.options.name = t), e instanceof Function || void 0 === e)this.clear(); else {
                this.content.removeChild(this.table);
                var i = {field: this.options.name, value: e}, n = new a(this, i);
                this._setRoot(n), this.validate();
                var r = !1;
                this.node.expand(r), this.content.appendChild(this.table)
            }
            this.history && this.history.clear(), this.searchBox && this.searchBox.clear()
        }, h.get = function () {
            return d && d.blur(), this.node ? this.node.getValue() : void 0
        }, h.getText = function () {
            return JSON.stringify(this.get())
        }, h.setText = function (e) {
            this.set(c.parse(e))
        }, h.setName = function (e) {
            this.options.name = e, this.node && this.node.updateField(this.options.name)
        }, h.getName = function () {
            return this.options.name
        }, h.focus = function () {
            var e = this.content.querySelector("[contenteditable=true]");
            e ? e.focus() : this.node.dom.expand ? this.node.dom.expand.focus() : this.node.dom.menu ? this.node.dom.menu.focus() : (e = this.frame.querySelector("button"), e && e.focus())
        }, h.clear = function () {
            this.node && (this.node.collapse(), this.tbody.removeChild(this.node.getDom()), delete this.node)
        }, h._setRoot = function (e) {
            this.clear(), this.node = e, this.tbody.appendChild(e.getDom())
        }, h.search = function (e) {
            var t;
            return this.node ? (this.content.removeChild(this.table), t = this.node.search(e), this.content.appendChild(this.table)) : t = [], t
        }, h.expandAll = function () {
            this.node && (this.content.removeChild(this.table), this.node.expand(), this.content.appendChild(this.table))
        }, h.collapseAll = function () {
            this.node && (this.content.removeChild(this.table), this.node.collapse(), this.content.appendChild(this.table))
        }, h._onAction = function (e, t) {
            this.history && this.history.add(e, t), this._onChange()
        }, h._onChange = function () {
            if (this._debouncedValidate(), this.options.onChange)try {
                this.options.onChange()
            } catch (e) {
                console.error("Error in onChange callback: ", e)
            }
        }, h.validate = function () {
            this.errorNodes && this.errorNodes.forEach(function (e) {
                e.setError(null)
            });
            var e = this.node;
            if (e) {
                var t = e.validate(), i = [];
                if (this.validateSchema) {
                    var n = this.validateSchema(e.getValue());
                    n || (i = this.validateSchema.errors.map(function (e) {
                        return c.improveSchemaError(e)
                    }).map(function (t) {
                        return {node: e.findNode(t.dataPath), error: t}
                    }).filter(function (e) {
                        return null != e.node
                    }))
                }
                this.errorNodes = t.concat(i).reduce(function (e, t) {
                    return t.node.findParents().map(function (e) {
                        return {
                            node: e,
                            child: t.node,
                            error: {message: "object" === e.type ? "Contains invalid properties" : "Contains invalid items"}
                        }
                    }).concat(e, [t])
                }, []).map(function (e) {
                    return e.node.setError(e.error, e.child), e.node
                })
            }
        }, h.startAutoScroll = function (e) {
            var t = this, i = this.content, n = c.getAbsoluteTop(i), r = i.clientHeight, o = n + r, s = 24, a = 50;
            n + s > e && i.scrollTop > 0 ? this.autoScrollStep = (n + s - e) / 3 : e > o - s && r + i.scrollTop < i.scrollHeight ? this.autoScrollStep = (o - s - e) / 3 : this.autoScrollStep = void 0, this.autoScrollStep ? this.autoScrollTimer || (this.autoScrollTimer = setInterval(function () {
                t.autoScrollStep ? i.scrollTop -= t.autoScrollStep : t.stopAutoScroll()
            }, a)) : this.stopAutoScroll()
        }, h.stopAutoScroll = function () {
            this.autoScrollTimer && (clearTimeout(this.autoScrollTimer), delete this.autoScrollTimer), this.autoScrollStep && delete this.autoScrollStep
        }, h.setSelection = function (e) {
            e && ("scrollTop"in e && this.content && (this.content.scrollTop = e.scrollTop), e.nodes && this.select(e.nodes), e.range && c.setSelectionOffset(e.range), e.dom && e.dom.focus())
        }, h.getSelection = function () {
            var e = c.getSelectionOffset();
            return e && "DIV" !== e.container.nodeName && (e = null), {
                dom: u,
                range: e,
                nodes: this.multiselection.nodes.slice(0),
                scrollTop: this.content ? this.content.scrollTop : 0
            }
        }, h.scrollTo = function (e, t) {
            var i = this.content;
            if (i) {
                var n = this;
                n.animateTimeout && (clearTimeout(n.animateTimeout), delete n.animateTimeout), n.animateCallback && (n.animateCallback(!1), delete n.animateCallback);
                var r = i.clientHeight, o = i.scrollHeight - r, s = Math.min(Math.max(e - r / 4, 0), o), a = function () {
                    var e = i.scrollTop, r = s - e;
                    Math.abs(r) > 3 ? (i.scrollTop += r / 3, n.animateCallback = t, n.animateTimeout = setTimeout(a, 50)) : (t && t(!0), i.scrollTop = s, delete n.animateTimeout, delete n.animateCallback)
                };
                a()
            } else t && t(!1)
        }, h._createFrame = function () {
            function e(e) {
                t._onEvent && t._onEvent(e)
            }

            this.frame = document.createElement("div"), this.frame.className = "jsoneditor jsoneditor-mode-" + this.options.mode, this.container.appendChild(this.frame);
            var t = this;
            this.frame.onclick = function (t) {
                var i = t.target;
                e(t), "BUTTON" == i.nodeName && t.preventDefault()
            }, this.frame.oninput = e, this.frame.onchange = e, this.frame.onkeydown = e, this.frame.onkeyup = e, this.frame.oncut = e, this.frame.onpaste = e, this.frame.onmousedown = e, this.frame.onmouseup = e, this.frame.onmouseover = e, this.frame.onmouseout = e, c.addEventListener(this.frame, "focus", e, !0), c.addEventListener(this.frame, "blur", e, !0), this.frame.onfocusin = e, this.frame.onfocusout = e, this.menu = document.createElement("div"), this.menu.className = "jsoneditor-menu", this.frame.appendChild(this.menu);
            var i = document.createElement("button");
            i.className = "jsoneditor-expand-all", i.title = "Expand all fields", i.onclick = function () {
                t.expandAll()
            }, this.menu.appendChild(i);
            var n = document.createElement("button");
            if (n.title = "Collapse all fields", n.className = "jsoneditor-collapse-all", n.onclick = function () {
                    t.collapseAll()
                }, this.menu.appendChild(n), this.history) {
                var r = document.createElement("button");
                r.className = "jsoneditor-undo jsoneditor-separator", r.title = "Undo last action (Ctrl+Z)", r.onclick = function () {
                    t._onUndo()
                }, this.menu.appendChild(r), this.dom.undo = r;
                var s = document.createElement("button");
                s.className = "jsoneditor-redo", s.title = "Redo (Ctrl+Shift+Z)", s.onclick = function () {
                    t._onRedo()
                }, this.menu.appendChild(s), this.dom.redo = s, this.history.onChange = function () {
                    r.disabled = !t.history.canUndo(), s.disabled = !t.history.canRedo()
                }, this.history.onChange()
            }
            if (this.options && this.options.modes && this.options.modes.length) {
                var a = l.create(this, this.options.modes, this.options.mode);
                this.menu.appendChild(a), this.dom.modeBox = a
            }
            this.options.search && (this.searchBox = new o(this, this.menu))
        }, h._onUndo = function () {
            this.history && (this.history.undo(), this._onChange())
        }, h._onRedo = function () {
            this.history && (this.history.redo(), this._onChange())
        }, h._onEvent = function (e) {
            "keydown" == e.type && this._onKeyDown(e), "focus" == e.type && (u = e.target), "mousedown" == e.type && this._startDragDistance(e), ("mousemove" == e.type || "mouseup" == e.type || "click" == e.type) && this._updateDragDistance(e);
            var t = a.getNodeFromTarget(e.target);
            if (t && t.selected) {
                if ("click" == e.type) {
                    if (e.target == t.dom.menu)return void this.showContextMenu(e.target);
                    e.hasMoved || this.deselect()
                }
                "mousedown" == e.type && a.onDragStart(this.multiselection.nodes, e)
            } else"mousedown" == e.type && (this.deselect(), t && e.target == t.dom.drag ? a.onDragStart(t, e) : (!t || e.target != t.dom.field && e.target != t.dom.value) && this._onMultiSelectStart(e));
            t && t.onEvent(e)
        }, h._startDragDistance = function (e) {
            this.dragDistanceEvent = {
                initialTarget: e.target,
                initialPageX: e.pageX,
                initialPageY: e.pageY,
                dragDistance: 0,
                hasMoved: !1
            }
        }, h._updateDragDistance = function (e) {
            this.dragDistanceEvent || this._startDragDistance(e);
            var t = e.pageX - this.dragDistanceEvent.initialPageX, i = e.pageY - this.dragDistanceEvent.initialPageY;
            return this.dragDistanceEvent.dragDistance = Math.sqrt(t * t + i * i), this.dragDistanceEvent.hasMoved = this.dragDistanceEvent.hasMoved || this.dragDistanceEvent.dragDistance > 10, e.dragDistance = this.dragDistanceEvent.dragDistance, e.hasMoved = this.dragDistanceEvent.hasMoved, e.dragDistance
        }, h._onMultiSelectStart = function (e) {
            var t = a.getNodeFromTarget(e.target);
            if ("tree" === this.options.mode && void 0 === this.options.onEditable) {
                this.multiselection = {start: t || null, end: null, nodes: []}, this._startDragDistance(e);
                var i = this;
                this.mousemove || (this.mousemove = c.addEventListener(window, "mousemove", function (e) {
                    i._onMultiSelect(e)
                })), this.mouseup || (this.mouseup = c.addEventListener(window, "mouseup", function (e) {
                    i._onMultiSelectEnd(e)
                }))
            }
        }, h._onMultiSelect = function (e) {
            if (e.preventDefault(), this._updateDragDistance(e), e.hasMoved) {
                var t = a.getNodeFromTarget(e.target);
                t && (null == this.multiselection.start && (this.multiselection.start = t), this.multiselection.end = t), this.deselect();
                var i = this.multiselection.start, n = this.multiselection.end || this.multiselection.start;
                i && n && (this.multiselection.nodes = this._findTopLevelNodes(i, n), this.select(this.multiselection.nodes))
            }
        }, h._onMultiSelectEnd = function (e) {
            this.multiselection.nodes[0] && this.multiselection.nodes[0].dom.menu.focus(), this.multiselection.start = null, this.multiselection.end = null, this.mousemove && (c.removeEventListener(window, "mousemove", this.mousemove), delete this.mousemove), this.mouseup && (c.removeEventListener(window, "mouseup", this.mouseup), delete this.mouseup)
        }, h.deselect = function (e) {
            this.multiselection.nodes.forEach(function (e) {
                e.setSelected(!1)
            }), this.multiselection.nodes = [], e && (this.multiselection.start = null, this.multiselection.end = null)
        }, h.select = function (e) {
            if (!Array.isArray(e))return this.select([e]);
            if (e) {
                this.deselect(), this.multiselection.nodes = e.slice(0);
                var t = e[0];
                e.forEach(function (e) {
                    e.setSelected(!0, e === t)
                })
            }
        }, h._findTopLevelNodes = function (e, t) {
            for (var i = e.getPath(), n = t.getPath(), r = 0; r < i.length && i[r] === n[r];)r++;
            var o = i[r - 1], s = i[r], a = n[r];
            if (s && a || (o.parent ? (s = o, a = o, o = o.parent) : (s = o.childs[0], a = o.childs[o.childs.length - 1])), o && s && a) {
                var l = o.childs.indexOf(s), c = o.childs.indexOf(a), h = Math.min(l, c), d = Math.max(l, c);
                return o.childs.slice(h, d + 1)
            }
            return []
        }, h._onKeyDown = function (e) {
            var t = e.which || e.keyCode, i = e.ctrlKey, n = e.shiftKey, r = !1;
            if (9 == t && setTimeout(function () {
                    c.selectContentEditable(u)
                }, 0), this.searchBox)if (i && 70 == t)this.searchBox.dom.search.focus(), this.searchBox.dom.search.select(), r = !0; else if (114 == t || i && 71 == t) {
                var o = !0;
                n ? this.searchBox.previous(o) : this.searchBox.next(o), r = !0
            }
            this.history && (i && !n && 90 == t ? (this._onUndo(), r = !0) : i && n && 90 == t && (this._onRedo(), r = !0)), r && (e.preventDefault(), e.stopPropagation())
        }, h._createTable = function () {
            var e = document.createElement("div");
            e.className = "jsoneditor-outer", this.contentOuter = e, this.content = document.createElement("div"), this.content.className = "jsoneditor-tree", e.appendChild(this.content), this.table = document.createElement("table"), this.table.className = "jsoneditor-tree", this.content.appendChild(this.table);
            var t;
            this.colgroupContent = document.createElement("colgroup"), "tree" === this.options.mode && (t = document.createElement("col"), t.width = "24px", this.colgroupContent.appendChild(t)), t = document.createElement("col"), t.width = "24px", this.colgroupContent.appendChild(t), t = document.createElement("col"), this.colgroupContent.appendChild(t), this.table.appendChild(this.colgroupContent), this.tbody = document.createElement("tbody"), this.table.appendChild(this.tbody), this.frame.appendChild(e)
        }, h.showContextMenu = function (e, t) {
            var i = [], n = this;
            i.push({
                text: "Duplicate",
                title: "Duplicate selected fields (Ctrl+D)",
                className: "jsoneditor-duplicate",
                click: function () {
                    a.onDuplicate(n.multiselection.nodes)
                }
            }), i.push({
                text: "Remove",
                title: "Remove selected fields (Ctrl+Del)",
                className: "jsoneditor-remove",
                click: function () {
                    a.onRemove(n.multiselection.nodes)
                }
            });
            var r = new s(i, {close: t});
            r.show(e, this.content)
        }, e.exports = [{mode: "tree", mixin: h, data: "json"}, {mode: "view", mixin: h, data: "json"}, {
            mode: "form",
            mixin: h,
            data: "json"
        }]
    }, function (e, t, i) {
        var n;
        try {
            n = i(11)
        } catch (r) {
        }
        var o = i(4), s = i(3), a = {}, l = 3;
        a.create = function (e, t) {
            t = t || {}, this.options = t, t.indentation ? this.indentation = Number(t.indentation) : this.indentation = 2;
            var i = t.ace ? t.ace : n;
            this.mode = "code" == t.mode ? "code" : "text", "code" == this.mode && "undefined" == typeof i && (this.mode = "text", console.warn("Failed to load Ace editor, falling back to plain text mode. Please use a JSONEditor bundle including Ace, or pass Ace as via the configuration option `ace`.")), this.theme = t.theme || "ace/theme/jsoneditor";
            var r = this;
            this.container = e, this.dom = {}, this.aceEditor = void 0, this.textarea = void 0, this.validateSchema = null, this._debouncedValidate = s.debounce(this.validate.bind(this), this.DEBOUNCE_INTERVAL), this.width = e.clientWidth, this.height = e.clientHeight, this.frame = document.createElement("div"), this.frame.className = "jsoneditor jsoneditor-mode-" + this.options.mode, this.frame.onclick = function (e) {
                e.preventDefault()
            }, this.frame.onkeydown = function (e) {
                r._onKeyDown(e)
            }, this.menu = document.createElement("div"), this.menu.className = "jsoneditor-menu", this.frame.appendChild(this.menu);
            var a = document.createElement("button");
            a.className = "jsoneditor-format", a.title = "Format JSON data, with proper indentation and line feeds (Ctrl+\\)", this.menu.appendChild(a), a.onclick = function () {
                try {
                    r.format(), r._onChange()
                } catch (e) {
                    r._onError(e)
                }
            };
            var l = document.createElement("button");
            if (l.className = "jsoneditor-compact", l.title = "Compact JSON data, remove all whitespaces (Ctrl+Shift+\\)", this.menu.appendChild(l), l.onclick = function () {
                    try {
                        r.compact(), r._onChange()
                    } catch (e) {
                        r._onError(e)
                    }
                }, this.options && this.options.modes && this.options.modes.length) {
                var c = o.create(this, this.options.modes, this.options.mode);
                this.menu.appendChild(c), this.dom.modeBox = c
            }
            if (this.content = document.createElement("div"), this.content.className = "jsoneditor-outer", this.frame.appendChild(this.content), this.container.appendChild(this.frame), "code" == this.mode) {
                this.editorDom = document.createElement("div"), this.editorDom.style.height = "100%", this.editorDom.style.width = "100%", this.content.appendChild(this.editorDom);
                var h = i.edit(this.editorDom);
                h.$blockScrolling = 1 / 0, h.setTheme(this.theme), h.setShowPrintMargin(!1), h.setFontSize(13), h.getSession().setMode("ace/mode/json"), h.getSession().setTabSize(this.indentation), h.getSession().setUseSoftTabs(!0), h.getSession().setUseWrapMode(!0), h.commands.bindKey("Ctrl-L", null), h.commands.bindKey("Command-L", null), this.aceEditor = h, this.hasOwnProperty("editor") || Object.defineProperty(this, "editor", {
                    get: function () {
                        return console.warn('Property "editor" has been renamed to "aceEditor".'), r.aceEditor
                    }, set: function (e) {
                        console.warn('Property "editor" has been renamed to "aceEditor".'), r.aceEditor = e
                    }
                });
                var d = document.createElement("a");
                d.appendChild(document.createTextNode("powered by ace")), d.href = "http://ace.ajax.org", d.target = "_blank", d.className = "jsoneditor-poweredBy", d.onclick = function () {
                    window.open(d.href, d.target)
                }, this.menu.appendChild(d), h.on("change", this._onChange.bind(this))
            } else {
                var u = document.createElement("textarea");
                u.className = "jsoneditor-text", u.spellcheck = !1, this.content.appendChild(u), this.textarea = u, null === this.textarea.oninput ? this.textarea.oninput = this._onChange.bind(this) : this.textarea.onchange = this._onChange.bind(this)
            }
            this.setSchema(this.options.schema)
        }, a._onChange = function () {
            if (this._debouncedValidate(), this.options.onChange)try {
                this.options.onChange()
            } catch (e) {
                console.error("Error in onChange callback: ", e)
            }
        }, a._onKeyDown = function (e) {
            var t = e.which || e.keyCode, i = !1;
            220 == t && e.ctrlKey && (e.shiftKey ? (this.compact(), this._onChange()) : (this.format(), this._onChange()), i = !0), i && (e.preventDefault(), e.stopPropagation())
        }, a._delete = function () {
            this.aceEditor && this.aceEditor.destroy(), this.frame && this.container && this.frame.parentNode == this.container && this.container.removeChild(this.frame)
        }, a.compact = function () {
            var e = this.get(), t = JSON.stringify(e);
            this.setText(t)
        }, a.format = function () {
            var e = this.get(), t = JSON.stringify(e, null, this.indentation);
            this.setText(t)
        }, a.focus = function () {
            this.textarea && this.textarea.focus(), this.aceEditor && this.aceEditor.focus()
        }, a.resize = function () {
            if (this.aceEditor) {
                var e = !1;
                this.aceEditor.resize(e)
            }
        }, a.set = function (e) {
            this.setText(JSON.stringify(e, null, this.indentation))
        }, a.get = function () {
            var e, t = this.getText();
            try {
                e = s.parse(t)
            } catch (i) {
                t = s.sanitize(t), e = s.parse(t)
            }
            return e
        }, a.getText = function () {
            return this.textarea ? this.textarea.value : this.aceEditor ? this.aceEditor.getValue() : ""
        }, a.setText = function (e) {
            if (this.options.escapeUnicode === !0 ? text = s.escapeUnicodeChars(e) : text = e, this.textarea && (this.textarea.value = text), this.aceEditor) {
                var t = this.options.onChange;
                this.options.onChange = null, this.aceEditor.setValue(text, -1), this.options.onChange = t
            }
            this.validate()
        }, a.validate = function () {
            this.dom.validationErrors && (this.dom.validationErrors.parentNode.removeChild(this.dom.validationErrors), this.dom.validationErrors = null, this.content.style.marginBottom = "", this.content.style.paddingBottom = "");
            var e, t = !1, i = [];
            try {
                e = this.get(), t = !0
            } catch (n) {
            }
            if (t && this.validateSchema) {
                var r = this.validateSchema(e);
                r || (i = this.validateSchema.errors.map(function (e) {
                    return s.improveSchemaError(e)
                }))
            }
            if (i.length > 0) {
                var o = i.length > l;
                if (o) {
                    i = i.slice(0, l);
                    var a = this.validateSchema.errors.length - l;
                    i.push("(" + a + " more errors...)")
                }
                var c = document.createElement("div");
                c.innerHTML = '<table class="jsoneditor-text-errors"><tbody>' + i.map(function (e) {
                        var t;
                        return t = "string" == typeof e ? '<td colspan="2"><pre>' + e + "</pre></td>" : "<td>" + e.dataPath + "</td><td>" + e.message + "</td>", '<tr><td><button class="jsoneditor-schema-error"></button></td>' + t + "</tr>"
                    }).join("") + "</tbody></table>", this.dom.validationErrors = c, this.frame.appendChild(c);
                var h = c.clientHeight;
                this.content.style.marginBottom = -h + "px", this.content.style.paddingBottom = h + "px"
            }
            if (this.aceEditor) {
                var d = !1;
                this.aceEditor.resize(d)
            }
        }, e.exports = [{mode: "text", mixin: a, data: "text", load: a.format}, {
            mode: "code",
            mixin: a,
            data: "text",
            load: a.format
        }]
    }, function (e, t, i) {
        var n = i(12);
        t.parse = function (e) {
            try {
                return JSON.parse(e)
            } catch (i) {
                throw t.validate(e), i
            }
        }, t.sanitize = function (e) {
            function t() {
                return e.charAt(h)
            }

            function i() {
                return e.charAt(h + 1)
            }

            function n() {
                return e.charAt(h - 1)
            }

            function r() {
                for (var e = c.length - 1; e >= 0;) {
                    var t = c[e];
                    if (" " !== t && "\n" !== t && "\r" !== t && "	" !== t)return t;
                    e--
                }
                return ""
            }

            function o() {
                for (h += 2; h < e.length && ("*" !== t() || "/" !== i());)h++;
                h += 2
            }

            function s() {
                for (h += 2; h < e.length && "\n" !== t();)h++
            }

            function a(i) {
                c.push('"'), h++;
                for (var r = t(); h < e.length && r !== i;)'"' === r && "\\" !== n() && c.push("\\"), "\\" === r && (h++, r = t(), "'" !== r && c.push("\\")), c.push(r), h++, r = t();
                r === i && (c.push('"'), h++)
            }

            function l() {
                for (var e = ["null", "true", "false"], i = "", n = t(), r = /[a-zA-Z_$\d]/; r.test(n);)i += n, h++, n = t();
                -1 === e.indexOf(i) ? c.push('"' + i + '"') : c.push(i)
            }

            var c = [], h = 0, d = e.match(/^\s*(\/\*(.|[\r\n])*?\*\/)?\s*[\da-zA-Z_$]+\s*\(([\s\S]*)\)\s*;?\s*$/);
            for (d && (e = d[3]); h < e.length;) {
                var u = t();
                "/" === u && "*" === i() ? o() : "/" === u && "/" === i() ? s() : "'" === u || '"' === u ? a(u) : /[a-zA-Z_$]/.test(u) && -1 !== ["{", ","].indexOf(r()) ? l() : (c.push(u), h++)
            }
            return c.join("")
        }, t.escapeUnicodeChars = function (e) {
            return e.replace(/[\u007F-\uFFFF]/g, function (e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            })
        }, t.validate = function (e) {
            "undefined" != typeof n ? n.parse(e) : JSON.parse(e)
        }, t.extend = function (e, t) {
            for (var i in t)t.hasOwnProperty(i) && (e[i] = t[i]);
            return e
        }, t.clear = function (e) {
            for (var t in e)e.hasOwnProperty(t) && delete e[t];
            return e
        }, t.type = function (e) {
            return null === e ? "null" : void 0 === e ? "undefined" : e instanceof Number || "number" == typeof e ? "number" : e instanceof String || "string" == typeof e ? "string" : e instanceof Boolean || "boolean" == typeof e ? "boolean" : e instanceof RegExp || "regexp" == typeof e ? "regexp" : t.isArray(e) ? "array" : "object"
        };
        var r = /^https?:\/\/\S+$/;
        t.isUrl = function (e) {
            return ("string" == typeof e || e instanceof String) && r.test(e)
        }, t.isArray = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, t.getAbsoluteLeft = function (e) {
            var t = e.getBoundingClientRect();
            return t.left + window.pageXOffset || document.scrollLeft || 0
        }, t.getAbsoluteTop = function (e) {
            var t = e.getBoundingClientRect();
            return t.top + window.pageYOffset || document.scrollTop || 0
        }, t.addClassName = function (e, t) {
            var i = e.className.split(" ");
            -1 == i.indexOf(t) && (i.push(t), e.className = i.join(" "))
        }, t.removeClassName = function (e, t) {
            var i = e.className.split(" "), n = i.indexOf(t);
            -1 != n && (i.splice(n, 1), e.className = i.join(" "))
        }, t.stripFormatting = function (e) {
            for (var i = e.childNodes, n = 0, r = i.length; r > n; n++) {
                var o = i[n];
                o.style && o.removeAttribute("style");
                var s = o.attributes;
                if (s)for (var a = s.length - 1; a >= 0; a--) {
                    var l = s[a];
                    l.specified === !0 && o.removeAttribute(l.name)
                }
                t.stripFormatting(o)
            }
        }, t.setEndOfContentEditable = function (e) {
            var t, i;
            document.createRange && (t = document.createRange(), t.selectNodeContents(e), t.collapse(!1), i = window.getSelection(), i.removeAllRanges(), i.addRange(t))
        }, t.selectContentEditable = function (e) {
            if (e && "DIV" == e.nodeName) {
                var t, i;
                window.getSelection && document.createRange && (i = document.createRange(), i.selectNodeContents(e), t = window.getSelection(), t.removeAllRanges(), t.addRange(i))
            }
        }, t.getSelection = function () {
            if (window.getSelection) {
                var e = window.getSelection();
                if (e.getRangeAt && e.rangeCount)return e.getRangeAt(0)
            }
            return null
        }, t.setSelection = function (e) {
            if (e && window.getSelection) {
                var t = window.getSelection();
                t.removeAllRanges(), t.addRange(e)
            }
        }, t.getSelectionOffset = function () {
            var e = t.getSelection();
            return e && "startOffset"in e && "endOffset"in e && e.startContainer && e.startContainer == e.endContainer ? {
                startOffset: e.startOffset,
                endOffset: e.endOffset,
                container: e.startContainer.parentNode
            } : null
        }, t.setSelectionOffset = function (e) {
            if (document.createRange && window.getSelection) {
                var i = window.getSelection();
                if (i) {
                    var n = document.createRange();
                    e.container.firstChild || e.container.appendChild(document.createTextNode("")), n.setStart(e.container.firstChild, e.startOffset), n.setEnd(e.container.firstChild, e.endOffset), t.setSelection(n)
                }
            }
        }, t.getInnerText = function (e, i) {
            var n = void 0 == i;
            if (n && (i = {
                    text: "", flush: function () {
                        var e = this.text;
                        return this.text = "", e
                    }, set: function (e) {
                        this.text = e
                    }
                }), e.nodeValue)return i.flush() + e.nodeValue;
            if (e.hasChildNodes()) {
                for (var r = e.childNodes, o = "", s = 0, a = r.length; a > s; s++) {
                    var l = r[s];
                    if ("DIV" == l.nodeName || "P" == l.nodeName) {
                        var c = r[s - 1], h = c ? c.nodeName : void 0;
                        h && "DIV" != h && "P" != h && "BR" != h && (o += "\n", i.flush()), o += t.getInnerText(l, i), i.set("\n")
                    } else"BR" == l.nodeName ? (o += i.flush(), i.set("\n")) : o += t.getInnerText(l, i)
                }
                return o
            }
            return "P" == e.nodeName && -1 != t.getInternetExplorerVersion() ? i.flush() : ""
        }, t.getInternetExplorerVersion = function () {
            if (-1 == o) {
                var e = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var t = navigator.userAgent, i = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                    null != i.exec(t) && (e = parseFloat(RegExp.$1))
                }
                o = e
            }
            return o
        }, t.isFirefox = function () {
            return -1 != navigator.userAgent.indexOf("Firefox")
        };
        var o = -1;
        t.addEventListener = function (e, i, n, r) {
            if (e.addEventListener)return void 0 === r && (r = !1), "mousewheel" === i && t.isFirefox() && (i = "DOMMouseScroll"), e.addEventListener(i, n, r), n;
            if (e.attachEvent) {
                var o = function () {
                    return n.call(e, window.event)
                };
                return e.attachEvent("on" + i, o), o
            }
        }, t.removeEventListener = function (e, i, n, r) {
            e.removeEventListener ? (void 0 === r && (r = !1), "mousewheel" === i && t.isFirefox() && (i = "DOMMouseScroll"), e.removeEventListener(i, n, r)) : e.detachEvent && e.detachEvent("on" + i, n)
        }, t.parsePath = function s(e) {
            var t, i;
            if (0 === e.length)return [];
            var n = e.match(/^\.(\w+)/);
            if (n)t = n[1], i = e.substr(t.length + 1); else {
                if ("[" !== e[0])throw new SyntaxError("Failed to parse path");
                var r = e.indexOf("]");
                if (-1 === r)throw new SyntaxError("Character ] expected in path");
                if (1 === r)throw new SyntaxError("Index expected after [");
                t = JSON.parse(e.substring(1, r)), i = e.substr(r + 1)
            }
            return [t].concat(s(i))
        }, t.improveSchemaError = function (e) {
            if ("enum" === e.keyword && Array.isArray(e.schema)) {
                var t = e.schema;
                if (t) {
                    if (t = t.map(function (e) {
                            return JSON.stringify(e)
                        }), t.length > 5) {
                        var i = ["(" + (t.length - 5) + " more...)"];
                        t = t.slice(0, 5), t.push(i)
                    }
                    e.message = "should be equal to one of: " + t.join(", ")
                }
            }
            return e
        }, t.insideRect = function (e, t, i) {
            var n = void 0 !== i ? i : 0;
            return t.left - n >= e.left && t.right + n <= e.right && t.top - n >= e.top && t.bottom + n <= e.bottom
        }, t.debounce = function (e, t, i) {
            var n;
            return function () {
                var r = this, o = arguments, s = function () {
                    n = null, i || e.apply(r, o)
                }, a = i && !n;
                clearTimeout(n), n = setTimeout(s, t), a && e.apply(r, o)
            }
        }, t.textDiff = function (e, t) {
            for (var i = t.length, n = 0, r = e.length, o = t.length; t.charAt(n) === e.charAt(n) && i > n;)n++;
            for (; t.charAt(o - 1) === e.charAt(r - 1) && o > n && r > 0;)o--, r--;
            return {start: n, end: o}
        }
    }, function (e, t, i) {
        function n(e, t, i) {
            function n(t) {
                e.setMode(t);
                var i = e.dom && e.dom.modeBox;
                i && i.focus()
            }

            for (var o = {
                code: {
                    text: "Code", title: "Switch to code highlighter", click: function () {
                        n("code")
                    }
                }, form: {
                    text: "Form", title: "Switch to form editor", click: function () {
                        n("form")
                    }
                }, text: {
                    text: "Text", title: "Switch to plain text editor", click: function () {
                        n("text")
                    }
                }, tree: {
                    text: "Tree", title: "Switch to tree editor", click: function () {
                        n("tree")
                    }
                }, view: {
                    text: "View", title: "Switch to tree view", click: function () {
                        n("view")
                    }
                }
            }, s = [], a = 0; a < t.length; a++) {
                var l = t[a], c = o[l];
                if (!c)throw new Error('Unknown mode "' + l + '"');
                c.className = "jsoneditor-type-modes" + (i == l ? " jsoneditor-selected" : ""), s.push(c)
            }
            var h = o[i];
            if (!h)throw new Error('Unknown mode "' + i + '"');
            var d = h.text, u = document.createElement("button");
            u.className = "jsoneditor-modes jsoneditor-separator", u.innerHTML = d + " &#x25BE;", u.title = "Switch editor mode", u.onclick = function () {
                var e = new r(s);
                e.show(u)
            };
            var f = document.createElement("div");
            return f.className = "jsoneditor-modes", f.style.position = "relative", f.appendChild(u), f
        }

        var r = i(8);
        t.create = n
    }, function (e, t, i) {
        function n() {
            this.locked = !1
        }

        n.prototype.highlight = function (e) {
            this.locked || (this.node != e && (this.node && this.node.setHighlight(!1), this.node = e, this.node.setHighlight(!0)), this._cancelUnhighlight())
        }, n.prototype.unhighlight = function () {
            if (!this.locked) {
                var e = this;
                this.node && (this._cancelUnhighlight(), this.unhighlightTimer = setTimeout(function () {
                    e.node.setHighlight(!1), e.node = void 0, e.unhighlightTimer = void 0;
                }, 0))
            }
        }, n.prototype._cancelUnhighlight = function () {
            this.unhighlightTimer && (clearTimeout(this.unhighlightTimer), this.unhighlightTimer = void 0)
        }, n.prototype.lock = function () {
            this.locked = !0
        }, n.prototype.unlock = function () {
            this.locked = !1
        }, e.exports = n
    }, function (e, t, i) {
        function n(e) {
            this.editor = e, this.clear(), this.actions = {
                editField: {
                    undo: function (e) {
                        e.node.updateField(e.oldValue)
                    }, redo: function (e) {
                        e.node.updateField(e.newValue)
                    }
                }, editValue: {
                    undo: function (e) {
                        e.node.updateValue(e.oldValue)
                    }, redo: function (e) {
                        e.node.updateValue(e.newValue)
                    }
                }, changeType: {
                    undo: function (e) {
                        e.node.changeType(e.oldType)
                    }, redo: function (e) {
                        e.node.changeType(e.newType)
                    }
                }, appendNodes: {
                    undo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.parent.removeChild(t)
                        })
                    }, redo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.parent.appendChild(t)
                        })
                    }
                }, insertBeforeNodes: {
                    undo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.parent.removeChild(t)
                        })
                    }, redo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.parent.insertBefore(t, e.beforeNode)
                        })
                    }
                }, insertAfterNodes: {
                    undo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.parent.removeChild(t)
                        })
                    }, redo: function (e) {
                        var t = e.afterNode;
                        e.nodes.forEach(function (i) {
                            e.parent.insertAfter(e.node, t), t = i
                        })
                    }
                }, removeNodes: {
                    undo: function (e) {
                        var t = e.parent, i = t.childs[e.index] || t.append;
                        e.nodes.forEach(function (e) {
                            t.insertBefore(e, i)
                        })
                    }, redo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.parent.removeChild(t)
                        })
                    }
                }, duplicateNodes: {
                    undo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.parent.removeChild(t)
                        })
                    }, redo: function (e) {
                        var t = e.afterNode;
                        e.nodes.forEach(function (i) {
                            e.parent.insertAfter(i, t), t = i
                        })
                    }
                }, moveNodes: {
                    undo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.oldBeforeNode.parent.moveBefore(t, e.oldBeforeNode)
                        })
                    }, redo: function (e) {
                        e.nodes.forEach(function (t) {
                            e.newBeforeNode.parent.moveBefore(t, e.newBeforeNode)
                        })
                    }
                }, sort: {
                    undo: function (e) {
                        var t = e.node;
                        t.hideChilds(), t.sort = e.oldSort, t.childs = e.oldChilds, t.showChilds()
                    }, redo: function (e) {
                        var t = e.node;
                        t.hideChilds(), t.sort = e.newSort, t.childs = e.newChilds, t.showChilds()
                    }
                }
            }
        }

        i(3);
        n.prototype.onChange = function () {
        }, n.prototype.add = function (e, t) {
            this.index++, this.history[this.index] = {
                action: e,
                params: t,
                timestamp: new Date
            }, this.index < this.history.length - 1 && this.history.splice(this.index + 1, this.history.length - this.index - 1), this.onChange()
        }, n.prototype.clear = function () {
            this.history = [], this.index = -1, this.onChange()
        }, n.prototype.canUndo = function () {
            return this.index >= 0
        }, n.prototype.canRedo = function () {
            return this.index < this.history.length - 1
        }, n.prototype.undo = function () {
            if (this.canUndo()) {
                var e = this.history[this.index];
                if (e) {
                    var t = this.actions[e.action];
                    t && t.undo ? (t.undo(e.params), e.params.oldSelection && this.editor.setSelection(e.params.oldSelection)) : console.error(new Error('unknown action "' + e.action + '"'))
                }
                this.index--, this.onChange()
            }
        }, n.prototype.redo = function () {
            if (this.canRedo()) {
                this.index++;
                var e = this.history[this.index];
                if (e) {
                    var t = this.actions[e.action];
                    t && t.redo ? (t.redo(e.params), e.params.newSelection && this.editor.setSelection(e.params.newSelection)) : console.error(new Error('unknown action "' + e.action + '"'))
                }
                this.onChange()
            }
        }, e.exports = n
    }, function (e, t, i) {
        function n(e, t) {
            var i = this;
            this.editor = e, this.timeout = void 0, this.delay = 200, this.lastText = void 0, this.dom = {}, this.dom.container = t;
            var n = document.createElement("table");
            this.dom.table = n, n.className = "jsoneditor-search", t.appendChild(n);
            var r = document.createElement("tbody");
            this.dom.tbody = r, n.appendChild(r);
            var o = document.createElement("tr");
            r.appendChild(o);
            var s = document.createElement("td");
            o.appendChild(s);
            var a = document.createElement("div");
            this.dom.results = a, a.className = "jsoneditor-results", s.appendChild(a), s = document.createElement("td"), o.appendChild(s);
            var l = document.createElement("div");
            this.dom.input = l, l.className = "jsoneditor-frame", l.title = "Search fields and values", s.appendChild(l);
            var c = document.createElement("table");
            l.appendChild(c);
            var h = document.createElement("tbody");
            c.appendChild(h), o = document.createElement("tr"), h.appendChild(o);
            var d = document.createElement("button");
            d.className = "jsoneditor-refresh", s = document.createElement("td"), s.appendChild(d), o.appendChild(s);
            var u = document.createElement("input");
            this.dom.search = u, u.oninput = function (e) {
                i._onDelayedSearch(e)
            }, u.onchange = function (e) {
                i._onSearch()
            }, u.onkeydown = function (e) {
                i._onKeyDown(e)
            }, u.onkeyup = function (e) {
                i._onKeyUp(e)
            }, d.onclick = function (e) {
                u.select()
            }, s = document.createElement("td"), s.appendChild(u), o.appendChild(s);
            var f = document.createElement("button");
            f.title = "Next result (Enter)", f.className = "jsoneditor-next", f.onclick = function () {
                i.next()
            }, s = document.createElement("td"), s.appendChild(f), o.appendChild(s);
            var p = document.createElement("button");
            p.title = "Previous result (Shift+Enter)", p.className = "jsoneditor-previous", p.onclick = function () {
                i.previous()
            }, s = document.createElement("td"), s.appendChild(p), o.appendChild(s)
        }

        n.prototype.next = function (e) {
            if (void 0 != this.results) {
                var t = void 0 != this.resultIndex ? this.resultIndex + 1 : 0;
                t > this.results.length - 1 && (t = 0), this._setActiveResult(t, e)
            }
        }, n.prototype.previous = function (e) {
            if (void 0 != this.results) {
                var t = this.results.length - 1, i = void 0 != this.resultIndex ? this.resultIndex - 1 : t;
                0 > i && (i = t), this._setActiveResult(i, e)
            }
        }, n.prototype._setActiveResult = function (e, t) {
            if (this.activeResult) {
                var i = this.activeResult.node, n = this.activeResult.elem;
                "field" == n ? delete i.searchFieldActive : delete i.searchValueActive, i.updateDom()
            }
            if (!this.results || !this.results[e])return this.resultIndex = void 0, void(this.activeResult = void 0);
            this.resultIndex = e;
            var r = this.results[this.resultIndex].node, o = this.results[this.resultIndex].elem;
            "field" == o ? r.searchFieldActive = !0 : r.searchValueActive = !0, this.activeResult = this.results[this.resultIndex], r.updateDom(), r.scrollTo(function () {
                t && r.focus(o)
            })
        }, n.prototype._clearDelay = function () {
            void 0 != this.timeout && (clearTimeout(this.timeout), delete this.timeout)
        }, n.prototype._onDelayedSearch = function (e) {
            this._clearDelay();
            var t = this;
            this.timeout = setTimeout(function (e) {
                t._onSearch()
            }, this.delay)
        }, n.prototype._onSearch = function (e) {
            this._clearDelay();
            var t = this.dom.search.value, i = t.length > 0 ? t : void 0;
            if (i != this.lastText || e)if (this.lastText = i, this.results = this.editor.search(i), this._setActiveResult(void 0), void 0 != i) {
                var n = this.results.length;
                switch (n) {
                    case 0:
                        this.dom.results.innerHTML = "no&nbsp;results";
                        break;
                    case 1:
                        this.dom.results.innerHTML = "1&nbsp;result";
                        break;
                    default:
                        this.dom.results.innerHTML = n + "&nbsp;results"
                }
            } else this.dom.results.innerHTML = ""
        }, n.prototype._onKeyDown = function (e) {
            var t = e.which;
            27 == t ? (this.dom.search.value = "", this._onSearch(), e.preventDefault(), e.stopPropagation()) : 13 == t && (e.ctrlKey ? this._onSearch(!0) : e.shiftKey ? this.previous() : this.next(), e.preventDefault(), e.stopPropagation())
        }, n.prototype._onKeyUp = function (e) {
            var t = e.keyCode;
            27 != t && 13 != t && this._onDelayedSearch(e)
        }, n.prototype.clear = function () {
            this.dom.search.value = "", this._onSearch()
        }, e.exports = n
    }, function (e, t, i) {
        function n(e, t) {
            function i(e, t, r) {
                r.forEach(function (r) {
                    if ("separator" == r.type) {
                        var o = document.createElement("div");
                        o.className = "jsoneditor-separator", a = document.createElement("li"), a.appendChild(o), e.appendChild(a)
                    } else {
                        var s = {}, a = document.createElement("li");
                        e.appendChild(a);
                        var l = document.createElement("button");
                        if (l.className = r.className, s.button = l, r.title && (l.title = r.title), r.click && (l.onclick = function (e) {
                                e.preventDefault(), n.hide(), r.click()
                            }), a.appendChild(l), r.submenu) {
                            var c = document.createElement("div");
                            c.className = "jsoneditor-icon", l.appendChild(c), l.appendChild(document.createTextNode(r.text));
                            var h;
                            if (r.click) {
                                l.className += " jsoneditor-default";
                                var d = document.createElement("button");
                                s.buttonExpand = d, d.className = "jsoneditor-expand", d.innerHTML = '<div class="jsoneditor-expand"></div>', a.appendChild(d), r.submenuTitle && (d.title = r.submenuTitle), h = d
                            } else {
                                var u = document.createElement("div");
                                u.className = "jsoneditor-expand", l.appendChild(u), h = l
                            }
                            h.onclick = function (e) {
                                e.preventDefault(), n._onExpandItem(s), h.focus()
                            };
                            var f = [];
                            s.subItems = f;
                            var p = document.createElement("ul");
                            s.ul = p, p.className = "jsoneditor-menu", p.style.height = "0", a.appendChild(p), i(p, f, r.submenu)
                        } else l.innerHTML = '<div class="jsoneditor-icon"></div>' + r.text;
                        t.push(s)
                    }
                })
            }

            this.dom = {};
            var n = this, r = this.dom;
            this.anchor = void 0, this.items = e, this.eventListeners = {}, this.selection = void 0, this.onClose = t ? t.close : void 0;
            var o = document.createElement("div");
            o.className = "jsoneditor-contextmenu-root", r.root = o;
            var s = document.createElement("div");
            s.className = "jsoneditor-contextmenu", r.menu = s, o.appendChild(s);
            var a = document.createElement("ul");
            a.className = "jsoneditor-menu", s.appendChild(a), r.list = a, r.items = [];
            var l = document.createElement("button");
            r.focusButton = l;
            var c = document.createElement("li");
            c.style.overflow = "hidden", c.style.height = "0", c.appendChild(l), a.appendChild(c), i(a, this.dom.items, e), this.maxHeight = 0, e.forEach(function (t) {
                var i = 24 * (e.length + (t.submenu ? t.submenu.length : 0));
                n.maxHeight = Math.max(n.maxHeight, i)
            })
        }

        var r = i(3);
        n.prototype._getVisibleButtons = function () {
            var e = [], t = this;
            return this.dom.items.forEach(function (i) {
                e.push(i.button), i.buttonExpand && e.push(i.buttonExpand), i.subItems && i == t.expandedItem && i.subItems.forEach(function (t) {
                    e.push(t.button), t.buttonExpand && e.push(t.buttonExpand)
                })
            }), e
        }, n.visibleMenu = void 0, n.prototype.show = function (e, t) {
            this.hide();
            var i = !0;
            if (t) {
                var o = e.getBoundingClientRect(), s = t.getBoundingClientRect();
                o.bottom + this.maxHeight < s.bottom || o.top - this.maxHeight > s.top && (i = !1)
            }
            if (i) {
                var a = e.offsetHeight;
                this.dom.menu.style.left = "0px", this.dom.menu.style.top = a + "px", this.dom.menu.style.bottom = ""
            } else this.dom.menu.style.left = "0px", this.dom.menu.style.top = "", this.dom.menu.style.bottom = "0px";
            var l = e.parentNode;
            l.insertBefore(this.dom.root, l.firstChild);
            var c = this, h = this.dom.list;
            this.eventListeners.mousedown = r.addEventListener(window, "mousedown", function (e) {
                var t = e.target;
                t == h || c._isChildOf(t, h) || (c.hide(), e.stopPropagation(), e.preventDefault())
            }), this.eventListeners.keydown = r.addEventListener(window, "keydown", function (e) {
                c._onKeyDown(e)
            }), this.selection = r.getSelection(), this.anchor = e, setTimeout(function () {
                c.dom.focusButton.focus()
            }, 0), n.visibleMenu && n.visibleMenu.hide(), n.visibleMenu = this
        }, n.prototype.hide = function () {
            this.dom.root.parentNode && (this.dom.root.parentNode.removeChild(this.dom.root), this.onClose && this.onClose());
            for (var e in this.eventListeners)if (this.eventListeners.hasOwnProperty(e)) {
                var t = this.eventListeners[e];
                t && r.removeEventListener(window, e, t), delete this.eventListeners[e]
            }
            n.visibleMenu == this && (n.visibleMenu = void 0)
        }, n.prototype._onExpandItem = function (e) {
            var t = this, i = e == this.expandedItem, n = this.expandedItem;
            if (n && (n.ul.style.height = "0", n.ul.style.padding = "", setTimeout(function () {
                    t.expandedItem != n && (n.ul.style.display = "", r.removeClassName(n.ul.parentNode, "jsoneditor-selected"))
                }, 300), this.expandedItem = void 0), !i) {
                var o = e.ul;
                o.style.display = "block";
                o.clientHeight;
                setTimeout(function () {
                    t.expandedItem == e && (o.style.height = 24 * o.childNodes.length + "px", o.style.padding = "5px 10px")
                }, 0), r.addClassName(o.parentNode, "jsoneditor-selected"), this.expandedItem = e
            }
        }, n.prototype._onKeyDown = function (e) {
            var t, i, n, o, s = e.target, a = e.which, l = !1;
            27 == a ? (this.selection && r.setSelection(this.selection), this.anchor && this.anchor.focus(), this.hide(), l = !0) : 9 == a ? e.shiftKey ? (t = this._getVisibleButtons(), i = t.indexOf(s), 0 == i && (t[t.length - 1].focus(), l = !0)) : (t = this._getVisibleButtons(), i = t.indexOf(s), i == t.length - 1 && (t[0].focus(), l = !0)) : 37 == a ? ("jsoneditor-expand" == s.className && (t = this._getVisibleButtons(), i = t.indexOf(s), n = t[i - 1], n && n.focus()), l = !0) : 38 == a ? (t = this._getVisibleButtons(), i = t.indexOf(s), n = t[i - 1], n && "jsoneditor-expand" == n.className && (n = t[i - 2]), n || (n = t[t.length - 1]), n && n.focus(), l = !0) : 39 == a ? (t = this._getVisibleButtons(), i = t.indexOf(s), o = t[i + 1], o && "jsoneditor-expand" == o.className && o.focus(), l = !0) : 40 == a && (t = this._getVisibleButtons(), i = t.indexOf(s), o = t[i + 1], o && "jsoneditor-expand" == o.className && (o = t[i + 2]), o || (o = t[0]), o && (o.focus(), l = !0), l = !0), l && (e.stopPropagation(), e.preventDefault())
        }, n.prototype._isChildOf = function (e, t) {
            for (var i = e.parentNode; i;) {
                if (i == t)return !0;
                i = i.parentNode
            }
            return !1
        }, e.exports = n
    }, function (e, t, i) {
        function n(e, t) {
            this.editor = e, this.dom = {}, this.expanded = !1, t && t instanceof Object ? (this.setField(t.field, t.fieldEditable), this.setValue(t.value, t.type)) : (this.setField(""), this.setValue(null)), this._debouncedOnChangeValue = s.debounce(this._onChangeValue.bind(this), n.prototype.DEBOUNCE_INTERVAL), this._debouncedOnChangeField = s.debounce(this._onChangeField.bind(this), n.prototype.DEBOUNCE_INTERVAL)
        }

        var r = i(8), o = i(13), s = i(3);
        n.prototype.DEBOUNCE_INTERVAL = 150, n.prototype._updateEditability = function () {
            if (this.editable = {
                    field: !0,
                    value: !0
                }, this.editor && (this.editable.field = "tree" === this.editor.options.mode, this.editable.value = "view" !== this.editor.options.mode, ("tree" === this.editor.options.mode || "form" === this.editor.options.mode) && "function" == typeof this.editor.options.onEditable)) {
                var e = this.editor.options.onEditable({
                    field: this.field,
                    value: this.value,
                    path: this.getFieldsPath()
                });
                "boolean" == typeof e ? (this.editable.field = e, this.editable.value = e) : ("boolean" == typeof e.field && (this.editable.field = e.field), "boolean" == typeof e.value && (this.editable.value = e.value))
            }
        }, n.prototype.getFieldsPath = function () {
            for (var e = this, t = []; e;) {
                var i = void 0 != e.field ? e.field : e.index;
                void 0 !== i && t.unshift(i), e = e.parent
            }
            return t
        }, n.prototype.findNode = function (e) {
            for (var t = s.parsePath(e), i = this; i && t.length > 0;) {
                var n = t.shift();
                if ("number" == typeof n) {
                    if ("array" !== i.type)throw new Error("Cannot get child node at index " + n + ": node is no array");
                    i = i.childs[n]
                } else {
                    if ("object" !== i.type)throw new Error("Cannot get child node " + n + ": node is no object");
                    i = i.childs.filter(function (e) {
                        return e.field === n
                    })[0]
                }
            }
            return i
        }, n.prototype.findParents = function () {
            for (var e = [], t = this.parent; t;)e.unshift(t), t = t.parent;
            return e
        }, n.prototype.setError = function (e, t) {
            this.getDom(), this.error = e;
            var i = this.dom.tdError;
            if (e) {
                i || (i = document.createElement("td"), this.dom.tdError = i, this.dom.tdValue.parentNode.appendChild(i));
                var n = document.createElement("div");
                n.className = "jsoneditor-popover jsoneditor-right", n.appendChild(document.createTextNode(e.message));
                var r = document.createElement("button");
                for (r.className = "jsoneditor-schema-error", r.appendChild(n), r.onmouseover = r.onfocus = function () {
                    for (var e = ["right", "above", "below", "left"], t = 0; t < e.length; t++) {
                        var i = e[t];
                        n.className = "jsoneditor-popover jsoneditor-" + i;
                        var r = this.editor.content.getBoundingClientRect(), o = n.getBoundingClientRect(), a = 20, l = s.insideRect(r, o, a);
                        if (l)break
                    }
                }.bind(this), t && (r.onclick = function () {
                    t.findParents().forEach(function (e) {
                        e.expand(!1)
                    }), t.scrollTo(function () {
                        t.focus()
                    })
                }); i.firstChild;)i.removeChild(i.firstChild);
                i.appendChild(r)
            } else i && (this.dom.tdError.parentNode.removeChild(this.dom.tdError), delete this.dom.tdError)
        }, n.prototype.getIndex = function () {
            return this.parent ? this.parent.childs.indexOf(this) : -1
        }, n.prototype.setParent = function (e) {
            this.parent = e
        }, n.prototype.setField = function (e, t) {
            this.field = e, this.previousField = e, this.fieldEditable = t === !0
        }, n.prototype.getField = function () {
            return void 0 === this.field && this._getDomField(), this.field
        }, n.prototype.setValue = function (e, t) {
            var i, r, o = this.childs;
            if (o)for (; o.length;)this.removeChild(o[0]);
            if (this.type = this._getType(e), t && t != this.type) {
                if ("string" != t || "auto" != this.type)throw new Error('Type mismatch: cannot cast value of type "' + this.type + ' to the specified type "' + t + '"');
                this.type = t
            }
            if ("array" == this.type) {
                this.childs = [];
                for (var s = 0, a = e.length; a > s; s++)i = e[s], void 0 === i || i instanceof Function || (r = new n(this.editor, {value: i}), this.appendChild(r));
                this.value = ""
            } else if ("object" == this.type) {
                this.childs = [];
                for (var l in e)e.hasOwnProperty(l) && (i = e[l], void 0 === i || i instanceof Function || (r = new n(this.editor, {
                    field: l,
                    value: i
                }), this.appendChild(r)));
                this.value = ""
            } else this.childs = void 0, this.value = e;
            this.previousValue = this.value
        }, n.prototype.getValue = function () {
            if ("array" == this.type) {
                var e = [];
                return this.childs.forEach(function (t) {
                    e.push(t.getValue())
                }), e
            }
            if ("object" == this.type) {
                var t = {};
                return this.childs.forEach(function (e) {
                    t[e.getField()] = e.getValue()
                }), t
            }
            return void 0 === this.value && this._getDomValue(), this.value
        }, n.prototype.getLevel = function () {
            return this.parent ? this.parent.getLevel() + 1 : 0
        }, n.prototype.getPath = function () {
            var e = this.parent ? this.parent.getPath() : [];
            return e.push(this), e
        }, n.prototype.clone = function () {
            var e = new n(this.editor);
            if (e.type = this.type, e.field = this.field, e.fieldInnerText = this.fieldInnerText, e.fieldEditable = this.fieldEditable, e.value = this.value, e.valueInnerText = this.valueInnerText, e.expanded = this.expanded, this.childs) {
                var t = [];
                this.childs.forEach(function (i) {
                    var n = i.clone();
                    n.setParent(e), t.push(n)
                }), e.childs = t
            } else e.childs = void 0;
            return e
        }, n.prototype.expand = function (e) {
            this.childs && (this.expanded = !0, this.dom.expand && (this.dom.expand.className = "jsoneditor-expanded"), this.showChilds(), e !== !1 && this.childs.forEach(function (t) {
                t.expand(e)
            }))
        }, n.prototype.collapse = function (e) {
            this.childs && (this.hideChilds(), e !== !1 && this.childs.forEach(function (t) {
                t.collapse(e)
            }), this.dom.expand && (this.dom.expand.className = "jsoneditor-collapsed"), this.expanded = !1)
        }, n.prototype.showChilds = function () {
            var e = this.childs;
            if (e && this.expanded) {
                var t = this.dom.tr, i = t ? t.parentNode : void 0;
                if (i) {
                    var n = this.getAppend(), r = t.nextSibling;
                    r ? i.insertBefore(n, r) : i.appendChild(n), this.childs.forEach(function (e) {
                        i.insertBefore(e.getDom(), n), e.showChilds()
                    })
                }
            }
        }, n.prototype.hide = function () {
            var e = this.dom.tr, t = e ? e.parentNode : void 0;
            t && t.removeChild(e), this.hideChilds()
        }, n.prototype.hideChilds = function () {
            var e = this.childs;
            if (e && this.expanded) {
                var t = this.getAppend();
                t.parentNode && t.parentNode.removeChild(t), this.childs.forEach(function (e) {
                    e.hide()
                })
            }
        }, n.prototype.appendChild = function (e) {
            if (this._hasChilds()) {
                if (e.setParent(this), e.fieldEditable = "object" == this.type, "array" == this.type && (e.index = this.childs.length), this.childs.push(e), this.expanded) {
                    var t = e.getDom(), i = this.getAppend(), n = i ? i.parentNode : void 0;
                    i && n && n.insertBefore(t, i), e.showChilds()
                }
                this.updateDom({updateIndexes: !0}), e.updateDom({recurse: !0})
            }
        }, n.prototype.moveBefore = function (e, t) {
            if (this._hasChilds()) {
                var i = this.dom.tr ? this.dom.tr.parentNode : void 0;
                if (i) {
                    var n = document.createElement("tr");
                    n.style.height = i.clientHeight + "px", i.appendChild(n)
                }
                e.parent && e.parent.removeChild(e), t instanceof a ? this.appendChild(e) : this.insertBefore(e, t), i && i.removeChild(n)
            }
        }, n.prototype.moveTo = function (e, t) {
            if (e.parent == this) {
                var i = this.childs.indexOf(e);
                t > i && t++
            }
            var n = this.childs[t] || this.append;
            this.moveBefore(e, n)
        }, n.prototype.insertBefore = function (e, t) {
            if (this._hasChilds()) {
                if (t == this.append)e.setParent(this), e.fieldEditable = "object" == this.type, this.childs.push(e); else {
                    var i = this.childs.indexOf(t);
                    if (-1 == i)throw new Error("Node not found");
                    e.setParent(this), e.fieldEditable = "object" == this.type, this.childs.splice(i, 0, e)
                }
                if (this.expanded) {
                    var n = e.getDom(), r = t.getDom(), o = r ? r.parentNode : void 0;
                    r && o && o.insertBefore(n, r), e.showChilds()
                }
                this.updateDom({updateIndexes: !0}), e.updateDom({recurse: !0})
            }
        }, n.prototype.insertAfter = function (e, t) {
            if (this._hasChilds()) {
                var i = this.childs.indexOf(t), n = this.childs[i + 1];
                n ? this.insertBefore(e, n) : this.appendChild(e)
            }
        }, n.prototype.search = function (e) {
            var t, i = [], n = e ? e.toLowerCase() : void 0;
            if (delete this.searchField, delete this.searchValue, void 0 != this.field) {
                var r = String(this.field).toLowerCase();
                t = r.indexOf(n), -1 != t && (this.searchField = !0, i.push({
                    node: this,
                    elem: "field"
                })), this._updateDomField()
            }
            if (this._hasChilds()) {
                if (this.childs) {
                    var o = [];
                    this.childs.forEach(function (t) {
                        o = o.concat(t.search(e))
                    }), i = i.concat(o)
                }
                if (void 0 != n) {
                    var s = !1;
                    0 == o.length ? this.collapse(s) : this.expand(s)
                }
            } else {
                if (void 0 != this.value) {
                    var a = String(this.value).toLowerCase();
                    t = a.indexOf(n), -1 != t && (this.searchValue = !0, i.push({node: this, elem: "value"}))
                }
                this._updateDomValue()
            }
            return i
        }, n.prototype.scrollTo = function (e) {
            if (!this.dom.tr || !this.dom.tr.parentNode)for (var t = this.parent, i = !1; t;)t.expand(i), t = t.parent;
            this.dom.tr && this.dom.tr.parentNode && this.editor.scrollTo(this.dom.tr.offsetTop, e)
        }, n.focusElement = void 0, n.prototype.focus = function (e) {
            if (n.focusElement = e, this.dom.tr && this.dom.tr.parentNode) {
                var t = this.dom;
                switch (e) {
                    case"drag":
                        t.drag ? t.drag.focus() : t.menu.focus();
                        break;
                    case"menu":
                        t.menu.focus();
                        break;
                    case"expand":
                        this._hasChilds() ? t.expand.focus() : t.field && this.fieldEditable ? (t.field.focus(), s.selectContentEditable(t.field)) : t.value && !this._hasChilds() ? (t.value.focus(), s.selectContentEditable(t.value)) : t.menu.focus();
                        break;
                    case"field":
                        t.field && this.fieldEditable ? (t.field.focus(), s.selectContentEditable(t.field)) : t.value && !this._hasChilds() ? (t.value.focus(), s.selectContentEditable(t.value)) : this._hasChilds() ? t.expand.focus() : t.menu.focus();
                        break;
                    case"value":
                    default:
                        t.value && !this._hasChilds() ? (t.value.focus(), s.selectContentEditable(t.value)) : t.field && this.fieldEditable ? (t.field.focus(), s.selectContentEditable(t.field)) : this._hasChilds() ? t.expand.focus() : t.menu.focus()
                }
            }
        }, n.select = function (e) {
            setTimeout(function () {
                s.selectContentEditable(e)
            }, 0)
        }, n.prototype.blur = function () {
            this._getDomValue(!1), this._getDomField(!1)
        }, n.prototype.containsNode = function (e) {
            if (this == e)return !0;
            var t = this.childs;
            if (t)for (var i = 0, n = t.length; n > i; i++)if (t[i].containsNode(e))return !0;
            return !1
        }, n.prototype._move = function (e, t) {
            if (e != t) {
                if (e.containsNode(this))throw new Error("Cannot move a field into a child of itself");
                e.parent && e.parent.removeChild(e);
                var i = e.clone();
                e.clearDom(), t ? this.insertBefore(i, t) : this.appendChild(i)
            }
        }, n.prototype.removeChild = function (e) {
            if (this.childs) {
                var t = this.childs.indexOf(e);
                if (-1 != t) {
                    e.hide(), delete e.searchField, delete e.searchValue;
                    var i = this.childs.splice(t, 1)[0];
                    return i.parent = null, this.updateDom({updateIndexes: !0}), i
                }
            }
        }, n.prototype._remove = function (e) {
            this.removeChild(e)
        }, n.prototype.changeType = function (e) {
            var t = this.type;
            if (t != e) {
                if ("string" != e && "auto" != e || "string" != t && "auto" != t) {
                    var i, n = this.dom.tr ? this.dom.tr.parentNode : void 0;
                    i = this.expanded ? this.getAppend() : this.getDom();
                    var r = i && i.parentNode ? i.nextSibling : void 0;
                    this.hide(), this.clearDom(), this.type = e, "object" == e ? (this.childs || (this.childs = []), this.childs.forEach(function (e, t) {
                        e.clearDom(), delete e.index, e.fieldEditable = !0, void 0 == e.field && (e.field = "")
                    }), ("string" == t || "auto" == t) && (this.expanded = !0)) : "array" == e ? (this.childs || (this.childs = []), this.childs.forEach(function (e, t) {
                        e.clearDom(), e.fieldEditable = !1, e.index = t
                    }), ("string" == t || "auto" == t) && (this.expanded = !0)) : this.expanded = !1, n && (r ? n.insertBefore(this.getDom(), r) : n.appendChild(this.getDom())), this.showChilds()
                } else this.type = e;
                ("auto" == e || "string" == e) && ("string" == e ? this.value = String(this.value) : this.value = this._stringCast(String(this.value)), this.focus()), this.updateDom({updateIndexes: !0})
            }
        }, n.prototype._getDomValue = function (e) {
            if (this.dom.value && "array" != this.type && "object" != this.type && (this.valueInnerText = s.getInnerText(this.dom.value)), void 0 != this.valueInnerText)try {
                var t;
                if ("string" == this.type)t = this._unescapeHTML(this.valueInnerText); else {
                    var i = this._unescapeHTML(this.valueInnerText);
                    t = this._stringCast(i)
                }
                t !== this.value && (this.value = t, this._debouncedOnChangeValue())
            } catch (n) {
                if (this.value = void 0, e !== !0)throw n
            }
        }, n.prototype._onChangeValue = function () {
            var e = this.editor.getSelection();
            if (e.range) {
                var t = s.textDiff(String(this.value), String(this.previousValue));
                e.range.startOffset = t.start, e.range.endOffset = t.end
            }
            var i = this.editor.getSelection();
            if (i.range) {
                var n = s.textDiff(String(this.previousValue), String(this.value));
                i.range.startOffset = n.start, i.range.endOffset = n.end
            }
            this.editor._onAction("editValue", {
                node: this,
                oldValue: this.previousValue,
                newValue: this.value,
                oldSelection: e,
                newSelection: i
            }), this.previousValue = this.value
        }, n.prototype._onChangeField = function () {
            var e = this.editor.getSelection();
            if (e.range) {
                var t = s.textDiff(this.field, this.previousField);
                e.range.startOffset = t.start, e.range.endOffset = t.end
            }
            var i = this.editor.getSelection();
            if (i.range) {
                var n = s.textDiff(this.previousField, this.field);
                i.range.startOffset = n.start, i.range.endOffset = n.end
            }
            this.editor._onAction("editField", {
                node: this,
                oldValue: this.previousField,
                newValue: this.field,
                oldSelection: e,
                newSelection: i
            }), this.previousField = this.field
        }, n.prototype._updateDomValue = function () {
            var e = this.dom.value;
            if (e) {
                var t = ["jsoneditor-value"], i = this.value, n = "auto" == this.type ? s.type(i) : this.type, r = "string" == n && s.isUrl(i);
                t.push("jsoneditor-" + n), r && t.push("jsoneditor-url");
                var o = "" == String(this.value) && "array" != this.type && "object" != this.type;
                if (o && t.push("jsoneditor-empty"), this.searchValueActive && t.push("jsoneditor-highlight-active"), this.searchValue && t.push("jsoneditor-highlight"), e.className = t.join(" "), "array" == n || "object" == n) {
                    var a = this.childs ? this.childs.length : 0;
                    e.title = this.type + " containing " + a + " items"
                } else r && this.editable.value ? e.title = "Ctrl+Click or Ctrl+Enter to open url in new window" : e.title = "";
                "boolean" === n ? (this.dom.checkbox || (this.dom.checkbox = document.createElement("input"), this.dom.checkbox.type = "checkbox", this.dom.tdCheckbox = document.createElement("td"), this.dom.tdCheckbox.className = "jsoneditor-tree", this.dom.tdCheckbox.appendChild(this.dom.checkbox), this.dom.tdValue.parentNode.insertBefore(this.dom.tdCheckbox, this.dom.tdValue)), this.dom.checkbox.checked = this.value) : this.dom.tdCheckbox && (this.dom.tdCheckbox.parentNode.removeChild(this.dom.tdCheckbox), delete this.dom.tdCheckbox, delete this.dom.checkbox), s.stripFormatting(e)
            }
        }, n.prototype._updateDomField = function () {
            var e = this.dom.field;
            if (e) {
                var t = "" == String(this.field) && "array" != this.parent.type;
                t ? s.addClassName(e, "jsoneditor-empty") : s.removeClassName(e, "jsoneditor-empty"), this.searchFieldActive ? s.addClassName(e, "jsoneditor-highlight-active") : s.removeClassName(e, "jsoneditor-highlight-active"), this.searchField ? s.addClassName(e, "jsoneditor-highlight") : s.removeClassName(e, "jsoneditor-highlight"), s.stripFormatting(e)
            }
        }, n.prototype._getDomField = function (e) {
            if (this.dom.field && this.fieldEditable && (this.fieldInnerText = s.getInnerText(this.dom.field)), void 0 != this.fieldInnerText)try {
                var t = this._unescapeHTML(this.fieldInnerText);
                t !== this.field && (this.field = t, this._debouncedOnChangeField())
            } catch (i) {
                if (this.field = void 0, e !== !0)throw i
            }
        }, n.prototype.validate = function () {
            var e = [];
            if ("object" === this.type) {
                for (var t = {}, i = [], n = 0; n < this.childs.length; n++) {
                    var r = this.childs[n];
                    t[r.field] && i.push(r.field), t[r.field] = !0
                }
                i.length > 0 && (e = this.childs.filter(function (e) {
                    return -1 !== i.indexOf(e.field)
                }).map(function (e) {
                    return {node: e, error: {message: 'duplicate key "' + e.field + '"'}}
                }))
            }
            if (this.childs)for (var n = 0; n < this.childs.length; n++) {
                var o = this.childs[n].validate();
                o.length > 0 && (e = e.concat(o))
            }
            return e
        }, n.prototype.clearDom = function () {
            this.dom = {}
        }, n.prototype.getDom = function () {
            var e = this.dom;
            if (e.tr)return e.tr;
            if (this._updateEditability(), e.tr = document.createElement("tr"), e.tr.node = this, "tree" === this.editor.options.mode) {
                var t = document.createElement("td");
                if (this.editable.field && this.parent) {
                    var i = document.createElement("button");
                    e.drag = i, i.className = "jsoneditor-dragarea", i.title = "Drag to move this field (Alt+Shift+Arrows)", t.appendChild(i)
                }
                e.tr.appendChild(t);
                var n = document.createElement("td"), r = document.createElement("button");
                e.menu = r, r.className = "jsoneditor-contextmenu", r.title = "Click to open the actions menu (Ctrl+M)", n.appendChild(e.menu), e.tr.appendChild(n)
            }
            var o = document.createElement("td");
            return e.tr.appendChild(o), e.tree = this._createDomTree(), o.appendChild(e.tree), this.updateDom({updateIndexes: !0}), e.tr
        }, n.onDragStart = function (e, t) {
            if (!Array.isArray(e))return n.onDragStart([e], t);
            if (0 !== e.length) {
                var i = e[0], r = e[e.length - 1], o = n.getNodeFromTarget(t.target), a = r._nextSibling(), l = i.editor, c = s.getAbsoluteTop(o.dom.tr) - s.getAbsoluteTop(i.dom.tr);
                l.mousemove || (l.mousemove = s.addEventListener(window, "mousemove", function (t) {
                    n.onDrag(e, t)
                })), l.mouseup || (l.mouseup = s.addEventListener(window, "mouseup", function (t) {
                    n.onDragEnd(e, t)
                })), l.highlighter.lock(), l.drag = {
                    oldCursor: document.body.style.cursor,
                    oldSelection: l.getSelection(),
                    oldBeforeNode: a,
                    mouseX: t.pageX,
                    offsetY: c,
                    level: i.getLevel()
                }, document.body.style.cursor = "move", t.preventDefault()
            }
        }, n.onDrag = function (e, t) {
            if (!Array.isArray(e))return n.onDrag([e], t);
            if (0 !== e.length) {
                var i, r, o, l, c, h, d, u, f, p, m, g, v, w, y = e[0].editor, A = t.pageY - y.drag.offsetY, E = t.pageX, C = !1, b = e[0];
                if (i = b.dom.tr, f = s.getAbsoluteTop(i), g = i.offsetHeight, f > A) {
                    r = i;
                    do r = r.previousSibling, d = n.getNodeFromTarget(r), p = r ? s.getAbsoluteTop(r) : 0; while (r && p > A);
                    d && !d.parent && (d = void 0), d || (h = i.parentNode.firstChild, r = h ? h.nextSibling : void 0, d = n.getNodeFromTarget(r), d == b && (d = void 0)), d && (r = d.dom.tr, p = r ? s.getAbsoluteTop(r) : 0, A > p + g && (d = void 0)), d && (e.forEach(function (e) {
                        d.parent.moveBefore(e, d)
                    }), C = !0)
                } else {
                    var F = e[e.length - 1];
                    if (c = F.expanded && F.append ? F.append.getDom() : F.dom.tr, l = c ? c.nextSibling : void 0) {
                        m = s.getAbsoluteTop(l), o = l;
                        do u = n.getNodeFromTarget(o), o && (v = o.nextSibling ? s.getAbsoluteTop(o.nextSibling) : 0, w = o ? v - m : 0, u.parent.childs.length == e.length && u.parent.childs[e.length - 1] == F && (f += 27)), o = o.nextSibling; while (o && A > f + w);
                        if (u && u.parent) {
                            var x = E - y.drag.mouseX, S = Math.round(x / 24 / 2), $ = y.drag.level + S, D = u.getLevel();
                            for (r = u.dom.tr.previousSibling; $ > D && r;) {
                                d = n.getNodeFromTarget(r);
                                var k = e.some(function (e) {
                                    return e === d || d._isChildOf(e)
                                });
                                if (k); else {
                                    if (!(d instanceof a))break;
                                    var B = d.parent.childs;
                                    if (B.length == e.length && B[e.length - 1] == F)break;
                                    u = n.getNodeFromTarget(r), D = u.getLevel()
                                }
                                r = r.previousSibling
                            }
                            c.nextSibling != u.dom.tr && (e.forEach(function (e) {
                                u.parent.moveBefore(e, u)
                            }), C = !0)
                        }
                    }
                }
                C && (y.drag.mouseX = E, y.drag.level = b.getLevel()), y.startAutoScroll(A), t.preventDefault()
            }
        }, n.onDragEnd = function (e, t) {
            if (!Array.isArray(e))return n.onDrag([e], t);
            if (0 !== e.length) {
                var i = e[0], r = i.editor, o = i.parent, a = o.childs.indexOf(i), l = o.childs[a + e.length] || o.append;
                e[0] && e[0].dom.menu.focus();
                var c = {
                    nodes: e,
                    oldSelection: r.drag.oldSelection,
                    newSelection: r.getSelection(),
                    oldBeforeNode: r.drag.oldBeforeNode,
                    newBeforeNode: l
                };
                c.oldBeforeNode != c.newBeforeNode && r._onAction("moveNodes", c), document.body.style.cursor = r.drag.oldCursor, r.highlighter.unlock(), e.forEach(function (e) {
                    t.target !== e.dom.drag && t.target !== e.dom.menu && r.highlighter.unhighlight()
                }), delete r.drag, r.mousemove && (s.removeEventListener(window, "mousemove", r.mousemove), delete r.mousemove), r.mouseup && (s.removeEventListener(window, "mouseup", r.mouseup), delete r.mouseup), r.stopAutoScroll(), t.preventDefault()
            }
        }, n.prototype._isChildOf = function (e) {
            for (var t = this.parent; t;) {
                if (t == e)return !0;
                t = t.parent
            }
            return !1
        }, n.prototype._createDomField = function () {
            return document.createElement("div")
        }, n.prototype.setHighlight = function (e) {
            this.dom.tr && (e ? s.addClassName(this.dom.tr, "jsoneditor-highlight") : s.removeClassName(this.dom.tr, "jsoneditor-highlight"), this.append && this.append.setHighlight(e), this.childs && this.childs.forEach(function (t) {
                t.setHighlight(e)
            }))
        }, n.prototype.setSelected = function (e, t) {
            this.selected = e, this.dom.tr && (e ? s.addClassName(this.dom.tr, "jsoneditor-selected") : s.removeClassName(this.dom.tr, "jsoneditor-selected"), t ? s.addClassName(this.dom.tr, "jsoneditor-first") : s.removeClassName(this.dom.tr, "jsoneditor-first"), this.append && this.append.setSelected(e), this.childs && this.childs.forEach(function (t) {
                t.setSelected(e)
            }))
        }, n.prototype.updateValue = function (e) {
            this.value = e, this.updateDom()
        }, n.prototype.updateField = function (e) {
            this.field = e, this.updateDom()
        }, n.prototype.updateDom = function (e) {
            var t = this.dom.tree;
            t && (t.style.marginLeft = 24 * this.getLevel() + "px");
            var i = this.dom.field;
            if (i) {
                this.fieldEditable ? (i.contentEditable = this.editable.field, i.spellcheck = !1, i.className = "jsoneditor-field") : i.className = "jsoneditor-readonly";
                var n;
                n = void 0 != this.index ? this.index : void 0 != this.field ? this.field : this._hasChilds() ? this.type : "", i.innerHTML = this._escapeHTML(n)
            }
            var r = this.dom.value;
            if (r) {
                var o = this.childs ? this.childs.length : 0;
                "array" == this.type ? (r.innerHTML = "[" + o + "]", s.addClassName(this.dom.tr, "jsoneditor-expandable")) : "object" == this.type ? (r.innerHTML = "{" + o + "}", s.addClassName(this.dom.tr, "jsoneditor-expandable")) : (r.innerHTML = this._escapeHTML(this.value), s.removeClassName(this.dom.tr, "jsoneditor-expandable"))
            }
            this._updateDomField(), this._updateDomValue(), e && e.updateIndexes === !0 && this._updateDomIndexes(), e && e.recurse === !0 && this.childs && this.childs.forEach(function (t) {
                t.updateDom(e)
            }), this.append && this.append.updateDom()
        }, n.prototype._updateDomIndexes = function () {
            var e = this.dom.value, t = this.childs;
            e && t && ("array" == this.type ? t.forEach(function (e, t) {
                e.index = t;
                var i = e.dom.field;
                i && (i.innerHTML = t)
            }) : "object" == this.type && t.forEach(function (e) {
                void 0 != e.index && (delete e.index, void 0 == e.field && (e.field = ""))
            }))
        }, n.prototype._createDomValue = function () {
            var e;
            return "array" == this.type ? (e = document.createElement("div"), e.innerHTML = "[...]") : "object" == this.type ? (e = document.createElement("div"), e.innerHTML = "{...}") : !this.editable.value && s.isUrl(this.value) ? (e = document.createElement("a"), e.href = this.value, e.target = "_blank", e.innerHTML = this._escapeHTML(this.value)) : (e = document.createElement("div"), e.contentEditable = this.editable.value, e.spellcheck = !1, e.innerHTML = this._escapeHTML(this.value)), e
        }, n.prototype._createDomExpandButton = function () {
            var e = document.createElement("button");
            return this._hasChilds() ? (e.className = this.expanded ? "jsoneditor-expanded" : "jsoneditor-collapsed", e.title = "Click to expand/collapse this field (Ctrl+E). \nCtrl+Click to expand/collapse including all childs.") : (e.className = "jsoneditor-invisible", e.title = ""), e
        }, n.prototype._createDomTree = function () {
            var e = this.dom, t = document.createElement("table"), i = document.createElement("tbody");
            t.style.borderCollapse = "collapse", t.className = "jsoneditor-values", t.appendChild(i);
            var n = document.createElement("tr");
            i.appendChild(n);
            var r = document.createElement("td");
            r.className = "jsoneditor-tree", n.appendChild(r), e.expand = this._createDomExpandButton(), r.appendChild(e.expand), e.tdExpand = r;
            var o = document.createElement("td");
            o.className = "jsoneditor-tree", n.appendChild(o), e.field = this._createDomField(), o.appendChild(e.field), e.tdField = o;
            var s = document.createElement("td");
            s.className = "jsoneditor-tree", n.appendChild(s), "object" != this.type && "array" != this.type && (s.appendChild(document.createTextNode(":")), s.className = "jsoneditor-separator"), e.tdSeparator = s;
            var a = document.createElement("td");
            return a.className = "jsoneditor-tree", n.appendChild(a), e.value = this._createDomValue(), a.appendChild(e.value), e.tdValue = a, t
        }, n.prototype.onEvent = function (e) {
            var t, i = e.type, n = e.target || e.srcElement, r = this.dom, o = this, a = this._hasChilds();
            if ((n == r.drag || n == r.menu) && ("mouseover" == i ? this.editor.highlighter.highlight(this) : "mouseout" == i && this.editor.highlighter.unhighlight()), "click" == i && n == r.menu) {
                var l = o.editor.highlighter;
                l.highlight(o), l.lock(), s.addClassName(r.menu, "jsoneditor-selected"), this.showContextMenu(r.menu, function () {
                    s.removeClassName(r.menu, "jsoneditor-selected"), l.unlock(), l.unhighlight()
                })
            }
            if ("click" == i && (n == r.expand || ("view" === o.editor.options.mode || "form" === o.editor.options.mode) && "DIV" === n.nodeName) && a) {
                var c = e.ctrlKey;
                this._onExpand(c)
            }
            "change" == i && n == r.checkbox && (this.dom.value.innerHTML = !this.value, this._getDomValue());
            var h = r.value;
            if (n == h)switch (i) {
                case"focus":
                    t = this;
                    break;
                case"blur":
                case"change":
                    this._getDomValue(!0), this._updateDomValue(), this.value && (h.innerHTML = this._escapeHTML(this.value));
                    break;
                case"input":
                    this._getDomValue(!0), this._updateDomValue();
                    break;
                case"keydown":
                case"mousedown":
                    this.editor.selection = this.editor.getSelection();
                    break;
                case"click":
                    (e.ctrlKey || !this.editable.value) && s.isUrl(this.value) && window.open(this.value, "_blank");
                    break;
                case"keyup":
                    this._getDomValue(!0), this._updateDomValue();
                    break;
                case"cut":
                case"paste":
                    setTimeout(function () {
                        o._getDomValue(!0), o._updateDomValue()
                    }, 1)
            }
            var d = r.field;
            if (n == d)switch (i) {
                case"focus":
                    t = this;
                    break;
                case"blur":
                case"change":
                    this._getDomField(!0), this._updateDomField(), this.field && (d.innerHTML = this._escapeHTML(this.field));
                    break;
                case"input":
                    this._getDomField(!0), this._updateDomField();
                    break;
                case"keydown":
                case"mousedown":
                    this.editor.selection = this.editor.getSelection();
                    break;
                case"keyup":
                    this._getDomField(!0), this._updateDomField();
                    break;
                case"cut":
                case"paste":
                    setTimeout(function () {
                        o._getDomField(!0), o._updateDomField()
                    }, 1)
            }
            var u = r.tree;
            if (n == u.parentNode && "click" == i && !e.hasMoved) {
                var f = void 0 != e.offsetX ? e.offsetX < 24 * (this.getLevel() + 1) : e.pageX < s.getAbsoluteLeft(r.tdSeparator);
                f || a ? d && (s.setEndOfContentEditable(d), d.focus()) : h && (s.setEndOfContentEditable(h), h.focus())
            }
            (n != r.tdExpand || a) && n != r.tdField && n != r.tdSeparator || "click" != i || e.hasMoved || d && (s.setEndOfContentEditable(d), d.focus()), "keydown" == i && this.onKeyDown(e)
        }, n.prototype.onKeyDown = function (e) {
            var t, i, r, o, l, c, h, d, u = e.which || e.keyCode, f = e.target || e.srcElement, p = e.ctrlKey, m = e.shiftKey, g = e.altKey, v = !1, w = "tree" === this.editor.options.mode, y = this.editor.multiselection.nodes.length > 0 ? this.editor.multiselection.nodes : [this], A = y[0], E = y[y.length - 1];
            if (13 == u) {
                if (f == this.dom.value)(!this.editable.value || e.ctrlKey) && s.isUrl(this.value) && (window.open(this.value, "_blank"), v = !0); else if (f == this.dom.expand) {
                    var C = this._hasChilds();
                    if (C) {
                        var b = e.ctrlKey;
                        this._onExpand(b), f.focus(), v = !0
                    }
                }
            } else if (68 == u)p && w && (n.onDuplicate(y), v = !0); else if (69 == u)p && (this._onExpand(m), f.focus(), v = !0); else if (77 == u && w)p && (this.showContextMenu(f), v = !0); else if (46 == u && w)p && (n.onRemove(y), v = !0); else if (45 == u && w)p && !m ? (this._onInsertBefore(), v = !0) : p && m && (this._onInsertAfter(), v = !0); else if (35 == u) {
                if (g) {
                    var F = this._lastNode();
                    F && F.focus(n.focusElement || this._getElementName(f)), v = !0
                }
            } else if (36 == u) {
                if (g) {
                    var x = this._firstNode();
                    x && x.focus(n.focusElement || this._getElementName(f)), v = !0
                }
            } else if (37 == u) {
                if (g && !m) {
                    var S = this._previousElement(f);
                    S && this.focus(this._getElementName(S)), v = !0
                } else if (g && m && w) {
                    if (E.expanded) {
                        var $ = E.getAppend();
                        r = $ ? $.nextSibling : void 0
                    } else {
                        var D = E.getDom();
                        r = D.nextSibling
                    }
                    r && (i = n.getNodeFromTarget(r), o = r.nextSibling, _ = n.getNodeFromTarget(o), i && i instanceof a && 1 != E.parent.childs.length && _ && _.parent && (l = this.editor.getSelection(), c = E._nextSibling(), y.forEach(function (e) {
                        _.parent.moveBefore(e, _)
                    }), this.focus(n.focusElement || this._getElementName(f)), this.editor._onAction("moveNodes", {
                        nodes: y,
                        oldBeforeNode: c,
                        newBeforeNode: _,
                        oldSelection: l,
                        newSelection: this.editor.getSelection()
                    })))
                }
            } else if (38 == u)g && !m ? (t = this._previousNode(), t && (this.editor.deselect(!0), t.focus(n.focusElement || this._getElementName(f))), v = !0) : !g && p && m && w ? (t = this._previousNode(), t && (d = this.editor.multiselection, d.start = d.start || this, d.end = t, h = this.editor._findTopLevelNodes(d.start, d.end), this.editor.select(h), t.focus("field")), v = !0) : g && m && w && (t = A._previousNode(), t && t.parent && (l = this.editor.getSelection(), c = E._nextSibling(), y.forEach(function (e) {
                t.parent.moveBefore(e, t)
            }), this.focus(n.focusElement || this._getElementName(f)), this.editor._onAction("moveNodes", {
                nodes: y,
                oldBeforeNode: c,
                newBeforeNode: t,
                oldSelection: l,
                newSelection: this.editor.getSelection()
            })), v = !0); else if (39 == u) {
                if (g && !m) {
                    var k = this._nextElement(f);
                    k && this.focus(this._getElementName(k)), v = !0
                } else if (g && m && w) {
                    D = A.getDom();
                    var B = D.previousSibling;
                    B && (t = n.getNodeFromTarget(B), t && t.parent && t instanceof a && !t.isVisible() && (l = this.editor.getSelection(), c = E._nextSibling(), y.forEach(function (e) {
                        t.parent.moveBefore(e, t)
                    }), this.focus(n.focusElement || this._getElementName(f)), this.editor._onAction("moveNodes", {
                        nodes: y,
                        oldBeforeNode: c,
                        newBeforeNode: t,
                        oldSelection: l,
                        newSelection: this.editor.getSelection()
                    })))
                }
            } else if (40 == u)if (g && !m)i = this._nextNode(), i && (this.editor.deselect(!0), i.focus(n.focusElement || this._getElementName(f))), v = !0; else if (!g && p && m && w)i = this._nextNode(), i && (d = this.editor.multiselection, d.start = d.start || this, d.end = i, h = this.editor._findTopLevelNodes(d.start, d.end), this.editor.select(h), i.focus("field")), v = !0; else if (g && m && w) {
                i = E.expanded ? E.append ? E.append._nextNode() : void 0 : E._nextNode();
                var _ = i && (i._nextNode() || i.parent.append);
                _ && _.parent && (l = this.editor.getSelection(), c = E._nextSibling(), y.forEach(function (e) {
                    _.parent.moveBefore(e, _)
                }), this.focus(n.focusElement || this._getElementName(f)), this.editor._onAction("moveNodes", {
                    nodes: y,
                    oldBeforeNode: c,
                    newBeforeNode: _,
                    oldSelection: l,
                    newSelection: this.editor.getSelection()
                })), v = !0
            }
            v && (e.preventDefault(), e.stopPropagation())
        }, n.prototype._onExpand = function (e) {
            if (e) {
                var t = this.dom.tr.parentNode, i = t.parentNode, n = i.scrollTop;
                i.removeChild(t)
            }
            this.expanded ? this.collapse(e) : this.expand(e), e && (i.appendChild(t), i.scrollTop = n)
        }, n.onRemove = function (e) {
            if (!Array.isArray(e))return n.onRemove([e]);
            if (e && e.length > 0) {
                var t = e[0], i = t.parent, r = t.editor, o = t.getIndex();
                r.highlighter.unhighlight();
                var s = r.getSelection();
                n.blurNodes(e);
                var a = r.getSelection();
                e.forEach(function (e) {
                    e.parent._remove(e)
                }), r._onAction("removeNodes", {
                    nodes: e.slice(0),
                    parent: i,
                    index: o,
                    oldSelection: s,
                    newSelection: a
                })
            }
        }, n.onDuplicate = function (e) {
            if (!Array.isArray(e))return n.onDuplicate([e]);
            if (e && e.length > 0) {
                var t = e[e.length - 1], i = t.parent, r = t.editor;
                r.deselect(r.multiselection.nodes);
                var o = r.getSelection(), s = t, a = e.map(function (e) {
                    var t = e.clone();
                    return i.insertAfter(t, s), s = t, t
                });
                1 === e.length ? a[0].focus() : r.select(a);
                var l = r.getSelection();
                r._onAction("duplicateNodes", {afterNode: t, nodes: a, parent: i, oldSelection: o, newSelection: l})
            }
        }, n.prototype._onInsertBefore = function (e, t, i) {
            var r = this.editor.getSelection(), o = new n(this.editor, {
                field: void 0 != e ? e : "",
                value: void 0 != t ? t : "",
                type: i
            });
            o.expand(!0), this.parent.insertBefore(o, this), this.editor.highlighter.unhighlight(), o.focus("field");
            var s = this.editor.getSelection();
            this.editor._onAction("insertBeforeNodes", {
                nodes: [o],
                beforeNode: this,
                parent: this.parent,
                oldSelection: r,
                newSelection: s
            })
        }, n.prototype._onInsertAfter = function (e, t, i) {
            var r = this.editor.getSelection(), o = new n(this.editor, {
                field: void 0 != e ? e : "",
                value: void 0 != t ? t : "",
                type: i
            });
            o.expand(!0), this.parent.insertAfter(o, this), this.editor.highlighter.unhighlight(), o.focus("field");
            var s = this.editor.getSelection();
            this.editor._onAction("insertAfterNodes", {
                nodes: [o],
                afterNode: this,
                parent: this.parent,
                oldSelection: r,
                newSelection: s
            })
        }, n.prototype._onAppend = function (e, t, i) {
            var r = this.editor.getSelection(), o = new n(this.editor, {
                field: void 0 != e ? e : "",
                value: void 0 != t ? t : "",
                type: i
            });
            o.expand(!0), this.parent.appendChild(o), this.editor.highlighter.unhighlight(), o.focus("field");
            var s = this.editor.getSelection();
            this.editor._onAction("appendNodes", {nodes: [o], parent: this.parent, oldSelection: r, newSelection: s})
        }, n.prototype._onChangeType = function (e) {
            var t = this.type;
            if (e != t) {
                var i = this.editor.getSelection();
                this.changeType(e);
                var n = this.editor.getSelection();
                this.editor._onAction("changeType", {
                    node: this,
                    oldType: t,
                    newType: e,
                    oldSelection: i,
                    newSelection: n
                })
            }
        }, n.prototype._onSort = function (e) {
            if (this._hasChilds()) {
                var t = "desc" == e ? -1 : 1, i = "array" == this.type ? "value" : "field";
                this.hideChilds();
                var n = this.childs, r = this.sort;
                this.childs = this.childs.concat(), this.childs.sort(function (e, n) {
                    return e[i] > n[i] ? t : e[i] < n[i] ? -t : 0
                }), this.sort = 1 == t ? "asc" : "desc", this.editor._onAction("sort", {
                    node: this,
                    oldChilds: n,
                    oldSort: r,
                    newChilds: this.childs,
                    newSort: this.sort
                }), this.showChilds()
            }
        }, n.prototype.getAppend = function () {
            return this.append || (this.append = new a(this.editor), this.append.setParent(this)), this.append.getDom()
        }, n.getNodeFromTarget = function (e) {
            for (; e;) {
                if (e.node)return e.node;
                e = e.parentNode
            }
        }, n.blurNodes = function (e) {
            if (!Array.isArray(e))return void n.blurNodes([e]);
            var t = e[0], i = t.parent, r = t.getIndex();
            i.childs[r + e.length] ? i.childs[r + e.length].focus() : i.childs[r - 1] ? i.childs[r - 1].focus() : i.focus()
        }, n.prototype._nextSibling = function () {
            var e = this.parent.childs.indexOf(this);
            return this.parent.childs[e + 1] || this.parent.append
        }, n.prototype._previousNode = function () {
            var e = null, t = this.getDom();
            if (t && t.parentNode) {
                var i = t;
                do i = i.previousSibling, e = n.getNodeFromTarget(i); while (i && e instanceof a && !e.isVisible())
            }
            return e
        }, n.prototype._nextNode = function () {
            var e = null, t = this.getDom();
            if (t && t.parentNode) {
                var i = t;
                do i = i.nextSibling, e = n.getNodeFromTarget(i); while (i && e instanceof a && !e.isVisible())
            }
            return e
        }, n.prototype._firstNode = function () {
            var e = null, t = this.getDom();
            if (t && t.parentNode) {
                var i = t.parentNode.firstChild;
                e = n.getNodeFromTarget(i)
            }
            return e
        }, n.prototype._lastNode = function () {
            var e = null, t = this.getDom();
            if (t && t.parentNode) {
                var i = t.parentNode.lastChild;
                for (e = n.getNodeFromTarget(i); i && e instanceof a && !e.isVisible();)i = i.previousSibling, e = n.getNodeFromTarget(i)
            }
            return e
        }, n.prototype._previousElement = function (e) {
            var t = this.dom;
            switch (e) {
                case t.value:
                    if (this.fieldEditable)return t.field;
                case t.field:
                    if (this._hasChilds())return t.expand;
                case t.expand:
                    return t.menu;
                case t.menu:
                    if (t.drag)return t.drag;
                default:
                    return null
            }
        }, n.prototype._nextElement = function (e) {
            var t = this.dom;
            switch (e) {
                case t.drag:
                    return t.menu;
                case t.menu:
                    if (this._hasChilds())return t.expand;
                case t.expand:
                    if (this.fieldEditable)return t.field;
                case t.field:
                    if (!this._hasChilds())return t.value;
                default:
                    return null
            }
        }, n.prototype._getElementName = function (e) {
            var t = this.dom;
            for (var i in t)if (t.hasOwnProperty(i) && t[i] == e)return i;
            return null
        }, n.prototype._hasChilds = function () {
            return "array" == this.type || "object" == this.type
        }, n.TYPE_TITLES = {
            auto: 'Field type "auto". The field type is automatically determined from the value and can be a string, number, boolean, or null.',
            object: 'Field type "object". An object contains an unordered set of key/value pairs.',
            array: 'Field type "array". An array contains an ordered collection of values.',
            string: 'Field type "string". Field type is not determined from the value, but always returned as string.'
        }, n.prototype.showContextMenu = function (e, t) {
            var i = this, o = n.TYPE_TITLES, s = [];
            if (this.editable.value && s.push({
                    text: "Type",
                    title: "Change the type of this field",
                    className: "jsoneditor-type-" + this.type,
                    submenu: [{
                        text: "Auto",
                        className: "jsoneditor-type-auto" + ("auto" == this.type ? " jsoneditor-selected" : ""),
                        title: o.auto,
                        click: function () {
                            i._onChangeType("auto")
                        }
                    }, {
                        text: "Array",
                        className: "jsoneditor-type-array" + ("array" == this.type ? " jsoneditor-selected" : ""),
                        title: o.array,
                        click: function () {
                            i._onChangeType("array")
                        }
                    }, {
                        text: "Object",
                        className: "jsoneditor-type-object" + ("object" == this.type ? " jsoneditor-selected" : ""),
                        title: o.object,
                        click: function () {
                            i._onChangeType("object")
                        }
                    }, {
                        text: "String",
                        className: "jsoneditor-type-string" + ("string" == this.type ? " jsoneditor-selected" : ""),
                        title: o.string,
                        click: function () {
                            i._onChangeType("string")
                        }
                    }]
                }), this._hasChilds()) {
                var a = "asc" == this.sort ? "desc" : "asc";
                s.push({
                    text: "Sort",
                    title: "Sort the childs of this " + this.type,
                    className: "jsoneditor-sort-" + a,
                    click: function () {
                        i._onSort(a)
                    },
                    submenu: [{
                        text: "Ascending",
                        className: "jsoneditor-sort-asc",
                        title: "Sort the childs of this " + this.type + " in ascending order",
                        click: function () {
                            i._onSort("asc")
                        }
                    }, {
                        text: "Descending",
                        className: "jsoneditor-sort-desc",
                        title: "Sort the childs of this " + this.type + " in descending order",
                        click: function () {
                            i._onSort("desc")
                        }
                    }]
                })
            }
            if (this.parent && this.parent._hasChilds()) {
                s.length && s.push({type: "separator"});
                var l = i.parent.childs;
                i == l[l.length - 1] && s.push({
                    text: "Append",
                    title: "Append a new field with type 'auto' after this field (Ctrl+Shift+Ins)",
                    submenuTitle: "Select the type of the field to be appended",
                    className: "jsoneditor-append",
                    click: function () {
                        i._onAppend("", "", "auto")
                    },
                    submenu: [{
                        text: "Auto", className: "jsoneditor-type-auto", title: o.auto, click: function () {
                            i._onAppend("", "", "auto")
                        }
                    }, {
                        text: "Array", className: "jsoneditor-type-array", title: o.array, click: function () {
                            i._onAppend("", [])
                        }
                    }, {
                        text: "Object", className: "jsoneditor-type-object", title: o.object, click: function () {
                            i._onAppend("", {})
                        }
                    }, {
                        text: "String", className: "jsoneditor-type-string", title: o.string, click: function () {
                            i._onAppend("", "", "string")
                        }
                    }]
                }), s.push({
                    text: "Insert",
                    title: "Insert a new field with type 'auto' before this field (Ctrl+Ins)",
                    submenuTitle: "Select the type of the field to be inserted",
                    className: "jsoneditor-insert",
                    click: function () {
                        i._onInsertBefore("", "", "auto")
                    },
                    submenu: [{
                        text: "Auto", className: "jsoneditor-type-auto", title: o.auto, click: function () {
                            i._onInsertBefore("", "", "auto")
                        }
                    }, {
                        text: "Array", className: "jsoneditor-type-array", title: o.array, click: function () {
                            i._onInsertBefore("", [])
                        }
                    }, {
                        text: "Object", className: "jsoneditor-type-object", title: o.object, click: function () {
                            i._onInsertBefore("", {})
                        }
                    }, {
                        text: "String", className: "jsoneditor-type-string", title: o.string, click: function () {
                            i._onInsertBefore("", "", "string")
                        }
                    }]
                }), this.editable.field && (s.push({
                    text: "Duplicate",
                    title: "Duplicate this field (Ctrl+D)",
                    className: "jsoneditor-duplicate",
                    click: function () {
                        n.onDuplicate(i)
                    }
                }), s.push({
                    text: "Remove",
                    title: "Remove this field (Ctrl+Del)",
                    className: "jsoneditor-remove",
                    click: function () {
                        n.onRemove(i)
                    }
                }))
            }
            var c = new r(s, {close: t});
            c.show(e, this.editor.content)
        }, n.prototype._getType = function (e) {
            return e instanceof Array ? "array" : e instanceof Object ? "object" : "string" == typeof e && "string" != typeof this._stringCast(e) ? "string" : "auto"
        }, n.prototype._stringCast = function (e) {
            var t = e.toLowerCase(), i = Number(e), n = parseFloat(e);
            return "" == e ? "" : "null" == t ? null : "true" == t ? !0 : "false" == t ? !1 : isNaN(i) || isNaN(n) ? e : i
        }, n.prototype._escapeHTML = function (e) {
            if ("string" != typeof e)return String(e);
            var t = String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/  /g, " &nbsp;").replace(/^ /, "&nbsp;").replace(/ $/, "&nbsp;"), i = JSON.stringify(t), n = i.substring(1, i.length - 1);
            return this.editor.options.escapeUnicode === !0 && (n = s.escapeUnicodeChars(n)), n
        }, n.prototype._unescapeHTML = function (e) {
            var t = '"' + this._escapeJSON(e) + '"', i = s.parse(t);
            return i.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;|\u00A0/g, " ").replace(/&amp;/g, "&")
        }, n.prototype._escapeJSON = function (e) {
            for (var t = "", i = 0; i < e.length;) {
                var n = e.charAt(i);
                "\n" == n ? t += "\\n" : "\\" == n ? (t += n, i++, n = e.charAt(i), ("" === n || -1 == '"\\/bfnrtu'.indexOf(n)) && (t += "\\"), t += n) : t += '"' == n ? '\\"' : n, i++
            }
            return t
        };
        var a = o(n);
        e.exports = n
    }, function (e, t, i) {
        "use strict";
        function n(e) {
            return p.test(e)
        }

        function r(e) {
            function t(e, t) {
                var i;
                if ("string" == typeof e) {
                    if (i = y(e), !i)throw new Error('no schema with key or ref "' + e + '"')
                } else {
                    var n = C(e);
                    i = n.validate || b(n)
                }
                var r = i(t);
                return k.errors = i.errors, r
            }

            function m(e) {
                var t = C(e);
                return t.validate || b(t)
            }

            function g(e, t, i, n) {
                if (Array.isArray(e))for (var r = 0; r < e.length; r++)g(e[r]); else {
                    t = s.normalizeId(t || e.id), D(t);
                    var o = k._schemas[t] = C(e, i);
                    o.meta = n
                }
            }

            function v(e, t, i) {
                g(e, t, i, !0)
            }

            function w(e, i) {
                var r = e.$schema || (k.opts.v5 ? u.META_SCHEMA_ID : f), o = k._formats.uri;
                k._formats.uri = "function" == typeof o ? n : p;
                var s = t(r, e);
                if (k._formats.uri = o, !s && i) {
                    var a = "schema is invalid:" + F();
                    if ("log" != k.opts.validateSchema)throw new Error(a);
                    console.error(a)
                }
                return s
            }

            function y(e) {
                var t = A(e);
                switch (typeof t) {
                    case"object":
                        return t.validate || b(t);
                    case"string":
                        return y(t)
                }
            }

            function A(e) {
                return e = s.normalizeId(e), k._schemas[e] || k._refs[e]
            }

            function E(e) {
                switch (typeof e) {
                    case"string":
                        var t = A(e);
                        k._cache.del(t.jsonStr), delete k._schemas[e], delete k._refs[e];
                        break;
                    case"object":
                        var i = c(e);
                        k._cache.del(i);
                        var n = e.id;
                        n && (n = s.normalizeId(n), delete k._refs[n])
                }
            }

            function C(e, t) {
                if ("object" != typeof e)throw new Error("schema should be object");
                var i = c(e), n = k._cache.get(i);
                if (n)return n;
                var r = s.normalizeId(e.id);
                r && D(r), k.opts.validateSchema === !1 || t || w(e, !0);
                var o = s.ids.call(k, e), a = new l({id: r, schema: e, localRefs: o, jsonStr: i});
                return "#" != r[0] && (k._refs[r] = a), k._cache.put(i, a), a
            }

            function b(e, t) {
                function i() {
                    var t = e.validate, n = t.apply(null, arguments);
                    return i.errors = t.errors, n
                }

                if (e.compiling)return e.validate = i, i.schema = e.schema, i.errors = null, i.root = t ? t : i, i;
                e.compiling = !0;
                var n = k.opts.removeAdditional, r = k.opts.useDefaults;
                e.meta && (n && (k.opts.removeAdditional = !1), r && (k.opts.useDefaults = !1));
                var s;
                try {
                    s = o.call(k, e.schema, t, e.localRefs)
                } finally {
                    e.compiling = !1, n && (k.opts.removeAdditional = n), r && (k.opts.useDefaults = r)
                }
                return e.validate = s, e.refs = s.refs, e.refVal = s.refVal, e.root = s.root, s
            }

            function F(e, t) {
                if (e = e || k.errors, !e)return "No errors";
                t = t || {};
                for (var i = t.separator || ", ", n = t.dataVar || "data", r = "", o = 0; o < e.length; o++) {
                    var s = e[o];
                    s && (r += n + s.dataPath + " " + s.message + i)
                }
                return r.slice(0, -i.length)
            }

            function x(e, t) {
                "string" == typeof t && (t = new RegExp(t)), k._formats[e] = t
            }

            function S() {
                if (k.opts.meta !== !1) {
                    var e = i(28);
                    v(e, f, !0), k._refs["http://json-schema.org/schema"] = f
                }
                var t = k.opts.schemas;
                if (t)if (Array.isArray(t))g(t); else for (var n in t)g(t[n], n)
            }

            function $() {
                for (var e in k.opts.formats) {
                    var t = k.opts.formats[e];
                    x(e, t)
                }
            }

            function D(e) {
                if (k._schemas[e] || k._refs[e])throw new Error('schema with key or id "' + e + '" already exists')
            }

            if (!(this instanceof r))return new r(e);
            var k = this;
            this.opts = e || {}, this._schemas = {}, this._refs = {}, this._formats = h(this.opts.format), this._cache = this.opts.cache || new a, this._loadingSchemas = {}, this.RULES = d(), this.validate = t, this.compile = m, this.addSchema = g, this.addMetaSchema = v, this.validateSchema = w, this.getSchema = y, this.removeSchema = E, this.addFormat = x, this.errorsText = F, this._addSchema = C, this._compile = b, S(), this.opts.formats && $(), "property" == this.opts.errorDataPath && (this.opts._errorDataPathProperty = !0), this.opts.v5 && u.enable(this), this.opts.loopRequired = this.opts.loopRequired || 1 / 0
        }

        var o = i(23), s = i(14), a = i(15), l = i(16), c = i(24), h = i(17), d = i(18), u = i(19);
        e.exports = r, r.prototype.compileAsync = i(20), r.prototype.addKeyword = i(21);
        var f = "http://json-schema.org/draft-04/schema", p = /^(?:(?:[a-z][a-z0-9+-.]*:)?\/\/)?[^\s]*$/i
    }, function (e, t, i) {
        var n = i(25);
        i(26), i(27), i(22), e.exports = n
    }, function (e, t, i) {
        var n = function () {
            var e = {
                trace: function () {
                },
                yy: {},
                symbols_: {
                    error: 2,
                    JSONString: 3,
                    STRING: 4,
                    JSONNumber: 5,
                    NUMBER: 6,
                    JSONNullLiteral: 7,
                    NULL: 8,
                    JSONBooleanLiteral: 9,
                    TRUE: 10,
                    FALSE: 11,
                    JSONText: 12,
                    JSONValue: 13,
                    EOF: 14,
                    JSONObject: 15,
                    JSONArray: 16,
                    "{": 17,
                    "}": 18,
                    JSONMemberList: 19,
                    JSONMember: 20,
                    ":": 21,
                    ",": 22,
                    "[": 23,
                    "]": 24,
                    JSONElementList: 25,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    4: "STRING",
                    6: "NUMBER",
                    8: "NULL",
                    10: "TRUE",
                    11: "FALSE",
                    14: "EOF",
                    17: "{",
                    18: "}",
                    21: ":",
                    22: ",",
                    23: "[",
                    24: "]"
                },
                productions_: [0, [3, 1], [5, 1], [7, 1], [9, 1], [9, 1], [12, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [15, 2], [15, 3], [20, 3], [19, 1], [19, 3], [16, 2], [16, 3], [25, 1], [25, 3]],
                performAction: function (e, t, i, n, r, o, s) {
                    var a = o.length - 1;
                    switch (r) {
                        case 1:
                            this.$ = e.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\v/g, "\x0B").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                            break;
                        case 2:
                            this.$ = Number(e);
                            break;
                        case 3:
                            this.$ = null;
                            break;
                        case 4:
                            this.$ = !0;
                            break;
                        case 5:
                            this.$ = !1;
                            break;
                        case 6:
                            return this.$ = o[a - 1];
                        case 13:
                            this.$ = {};
                            break;
                        case 14:
                            this.$ = o[a - 1];
                            break;
                        case 15:
                            this.$ = [o[a - 2], o[a]];
                            break;
                        case 16:
                            this.$ = {}, this.$[o[a][0]] = o[a][1];
                            break;
                        case 17:
                            this.$ = o[a - 2], o[a - 2][o[a][0]] = o[a][1];
                            break;
                        case 18:
                            this.$ = [];
                            break;
                        case 19:
                            this.$ = o[a - 1];
                            break;
                        case 20:
                            this.$ = [o[a]];
                            break;
                        case 21:
                            this.$ = o[a - 2], o[a - 2].push(o[a])
                    }
                },
                table: [{
                    3: 5,
                    4: [1, 12],
                    5: 6,
                    6: [1, 13],
                    7: 3,
                    8: [1, 9],
                    9: 4,
                    10: [1, 10],
                    11: [1, 11],
                    12: 1,
                    13: 2,
                    15: 7,
                    16: 8,
                    17: [1, 14],
                    23: [1, 15]
                }, {1: [3]}, {14: [1, 16]}, {14: [2, 7], 18: [2, 7], 22: [2, 7], 24: [2, 7]}, {
                    14: [2, 8],
                    18: [2, 8],
                    22: [2, 8],
                    24: [2, 8]
                }, {14: [2, 9], 18: [2, 9], 22: [2, 9], 24: [2, 9]}, {
                    14: [2, 10],
                    18: [2, 10],
                    22: [2, 10],
                    24: [2, 10]
                }, {14: [2, 11], 18: [2, 11], 22: [2, 11], 24: [2, 11]}, {
                    14: [2, 12],
                    18: [2, 12],
                    22: [2, 12],
                    24: [2, 12]
                }, {14: [2, 3], 18: [2, 3], 22: [2, 3], 24: [2, 3]}, {
                    14: [2, 4],
                    18: [2, 4],
                    22: [2, 4],
                    24: [2, 4]
                }, {14: [2, 5], 18: [2, 5], 22: [2, 5], 24: [2, 5]}, {
                    14: [2, 1],
                    18: [2, 1],
                    21: [2, 1],
                    22: [2, 1],
                    24: [2, 1]
                }, {14: [2, 2], 18: [2, 2], 22: [2, 2], 24: [2, 2]}, {
                    3: 20,
                    4: [1, 12],
                    18: [1, 17],
                    19: 18,
                    20: 19
                }, {
                    3: 5,
                    4: [1, 12],
                    5: 6,
                    6: [1, 13],
                    7: 3,
                    8: [1, 9],
                    9: 4,
                    10: [1, 10],
                    11: [1, 11],
                    13: 23,
                    15: 7,
                    16: 8,
                    17: [1, 14],
                    23: [1, 15],
                    24: [1, 21],
                    25: 22
                }, {1: [2, 6]}, {14: [2, 13], 18: [2, 13], 22: [2, 13], 24: [2, 13]}, {
                    18: [1, 24],
                    22: [1, 25]
                }, {18: [2, 16], 22: [2, 16]}, {21: [1, 26]}, {
                    14: [2, 18],
                    18: [2, 18],
                    22: [2, 18],
                    24: [2, 18]
                }, {22: [1, 28], 24: [1, 27]}, {22: [2, 20], 24: [2, 20]}, {
                    14: [2, 14],
                    18: [2, 14],
                    22: [2, 14],
                    24: [2, 14]
                }, {3: 20, 4: [1, 12], 20: 29}, {
                    3: 5,
                    4: [1, 12],
                    5: 6,
                    6: [1, 13],
                    7: 3,
                    8: [1, 9],
                    9: 4,
                    10: [1, 10],
                    11: [1, 11],
                    13: 30,
                    15: 7,
                    16: 8,
                    17: [1, 14],
                    23: [1, 15]
                }, {14: [2, 19], 18: [2, 19], 22: [2, 19], 24: [2, 19]}, {
                    3: 5,
                    4: [1, 12],
                    5: 6,
                    6: [1, 13],
                    7: 3,
                    8: [1, 9],
                    9: 4,
                    10: [1, 10],
                    11: [1, 11],
                    13: 31,
                    15: 7,
                    16: 8,
                    17: [1, 14],
                    23: [1, 15]
                }, {18: [2, 17], 22: [2, 17]}, {18: [2, 15], 22: [2, 15]}, {22: [2, 21], 24: [2, 21]}],
                defaultActions: {16: [2, 6]},
                parseError: function (e, t) {
                    throw new Error(e)
                },
                parse: function (e) {
                    function t(e) {
                        r.length = r.length - 2 * e, o.length = o.length - e, s.length = s.length - e
                    }

                    function i() {
                        var e;
                        return e = n.lexer.lex() || 1, "number" != typeof e && (e = n.symbols_[e] || e), e
                    }

                    var n = this, r = [0], o = [null], s = [], a = this.table, l = "", c = 0, h = 0, d = 0, u = 2, f = 1;
                    this.lexer.setInput(e), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                    var p = this.lexer.yylloc;
                    s.push(p), "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                    for (var m, g, v, w, y, A, E, C, b, F = {}; ;) {
                        if (v = r[r.length - 1], this.defaultActions[v] ? w = this.defaultActions[v] : (null == m && (m = i()), w = a[v] && a[v][m]), "undefined" == typeof w || !w.length || !w[0]) {
                            if (!d) {
                                b = [];
                                for (A in a[v])this.terminals_[A] && A > 2 && b.push("'" + this.terminals_[A] + "'");
                                var x = "";
                                x = this.lexer.showPosition ? "Parse error on line " + (c + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + b.join(", ") + ", got '" + this.terminals_[m] + "'" : "Parse error on line " + (c + 1) + ": Unexpected " + (1 == m ? "end of input" : "'" + (this.terminals_[m] || m) + "'"), this.parseError(x, {
                                    text: this.lexer.match,
                                    token: this.terminals_[m] || m,
                                    line: this.lexer.yylineno,
                                    loc: p,
                                    expected: b
                                })
                            }
                            if (3 == d) {
                                if (m == f)throw new Error(x || "Parsing halted.");
                                h = this.lexer.yyleng, l = this.lexer.yytext, c = this.lexer.yylineno, p = this.lexer.yylloc, m = i()
                            }
                            for (; ;) {
                                if (u.toString()in a[v])break;
                                if (0 == v)throw new Error(x || "Parsing halted.");
                                t(1), v = r[r.length - 1]
                            }
                            g = m, m = u, v = r[r.length - 1], w = a[v] && a[v][u], d = 3
                        }
                        if (w[0]instanceof Array && w.length > 1)throw new Error("Parse Error: multiple actions possible at state: " + v + ", token: " + m);
                        switch (w[0]) {
                            case 1:
                                r.push(m), o.push(this.lexer.yytext), s.push(this.lexer.yylloc), r.push(w[1]), m = null, g ? (m = g, g = null) : (h = this.lexer.yyleng, l = this.lexer.yytext, c = this.lexer.yylineno, p = this.lexer.yylloc, d > 0 && d--);
                                break;
                            case 2:
                                if (E = this.productions_[w[1]][1], F.$ = o[o.length - E], F._$ = {
                                        first_line: s[s.length - (E || 1)].first_line,
                                        last_line: s[s.length - 1].last_line,
                                        first_column: s[s.length - (E || 1)].first_column,
                                        last_column: s[s.length - 1].last_column
                                    }, y = this.performAction.call(F, l, h, c, this.yy, w[1], o, s), "undefined" != typeof y)return y;
                                E && (r = r.slice(0, -1 * E * 2), o = o.slice(0, -1 * E), s = s.slice(0, -1 * E)), r.push(this.productions_[w[1]][0]), o.push(F.$), s.push(F._$), C = a[r[r.length - 2]][r[r.length - 1]], r.push(C);
                                break;
                            case 3:
                                return !0
                        }
                    }
                    return !0
                }
            }, t = function () {
                var e = {
                    EOF: 1, parseError: function (e, t) {
                        if (!this.yy.parseError)throw new Error(e);
                        this.yy.parseError(e, t)
                    }, setInput: function (e) {
                        return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        }, this
                    }, input: function () {
                        var e = this._input[0];
                        this.yytext += e, this.yyleng++, this.match += e, this.matched += e;
                        var t = e.match(/\n/);
                        return t && this.yylineno++, this._input = this._input.slice(1), e
                    }, unput: function (e) {
                        return this._input = e + this._input, this
                    }, more: function () {
                        return this._more = !0, this
                    }, less: function (e) {
                        this._input = this.match.slice(e) + this._input
                    }, pastInput: function () {
                        var e = this.matched.substr(0, this.matched.length - this.match.length);
                        return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                    }, upcomingInput: function () {
                        var e = this.match;
                        return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                    }, showPosition: function () {
                        var e = this.pastInput(), t = new Array(e.length + 1).join("-");
                        return e + this.upcomingInput() + "\n" + t + "^"
                    }, next: function () {
                        if (this.done)return this.EOF;
                        this._input || (this.done = !0);
                        var e, t, i, n, r;
                        this._more || (this.yytext = "", this.match = "");
                        for (var o = this._currentRules(), s = 0; s < o.length && (i = this._input.match(this.rules[o[s]]), !i || t && !(i[0].length > t[0].length) || (t = i, n = s, this.options.flex)); s++);
                        return t ? (r = t[0].match(/\n.*/g), r && (this.yylineno += r.length), this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: r ? r[r.length - 1].length - 1 : this.yylloc.last_column + t[0].length
                        }, this.yytext += t[0], this.match += t[0], this.yyleng = this.yytext.length, this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, o[n], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), e ? e : void 0) : "" === this._input ? this.EOF : void this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    }, lex: function () {
                        var e = this.next();
                        return "undefined" != typeof e ? e : this.lex()
                    }, begin: function (e) {
                        this.conditionStack.push(e)
                    }, popState: function () {
                        return this.conditionStack.pop()
                    }, _currentRules: function () {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                    }, topState: function () {
                        return this.conditionStack[this.conditionStack.length - 2]
                    }, pushState: function (e) {
                        this.begin(e)
                    }
                };
                return e.options = {}, e.performAction = function (e, t, i, n) {
                    switch (i) {
                        case 0:
                            break;
                        case 1:
                            return 6;
                        case 2:
                            return t.yytext = t.yytext.substr(1, t.yyleng - 2), 4;
                        case 3:
                            return 17;
                        case 4:
                            return 18;
                        case 5:
                            return 23;
                        case 6:
                            return 24;
                        case 7:
                            return 22;
                        case 8:
                            return 21;
                        case 9:
                            return 10;
                        case 10:
                            return 11;
                        case 11:
                            return 8;
                        case 12:
                            return 14;
                        case 13:
                            return "INVALID"
                    }
                }, e.rules = [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/], e.conditions = {
                    INITIAL: {
                        rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                        inclusive: !0
                    }
                }, e
            }();
            return e.lexer = t, e
        }();
        t.parser = n, t.parse = n.parse.bind(n)
    }, function (e, t, i) {
        function n(e) {
            function t(e) {
                this.editor = e, this.dom = {}
            }

            return t.prototype = new e, t.prototype.getDom = function () {
                var e = this.dom;
                if (e.tr)return e.tr;
                this._updateEditability();
                var t = document.createElement("tr");
                if (t.node = this, e.tr = t, this.editable.field) {
                    e.tdDrag = document.createElement("td");
                    var i = document.createElement("td");
                    e.tdMenu = i;
                    var n = document.createElement("button");
                    n.className = "jsoneditor-contextmenu", n.title = "Click to open the actions menu (Ctrl+M)", e.menu = n, i.appendChild(e.menu)
                }
                var r = document.createElement("td"), o = document.createElement("div");
                return o.innerHTML = "(empty)", o.className = "jsoneditor-readonly", r.appendChild(o), e.td = r, e.text = o, this.updateDom(), t
            }, t.prototype.updateDom = function () {
                var e = this.dom, t = e.td;
                t && (t.style.paddingLeft = 24 * this.getLevel() + 26 + "px");
                var i = e.text;
                i && (i.innerHTML = "(empty " + this.parent.type + ")");
                var n = e.tr;
                this.isVisible() ? e.tr.firstChild || (e.tdDrag && n.appendChild(e.tdDrag), e.tdMenu && n.appendChild(e.tdMenu), n.appendChild(t)) : e.tr.firstChild && (e.tdDrag && n.removeChild(e.tdDrag), e.tdMenu && n.removeChild(e.tdMenu), n.removeChild(t))
            }, t.prototype.isVisible = function () {
                return 0 == this.parent.childs.length
            }, t.prototype.showContextMenu = function (t, i) {
                var n = this, r = e.TYPE_TITLES, s = [{
                    text: "Append",
                    title: "Append a new field with type 'auto' (Ctrl+Shift+Ins)",
                    submenuTitle: "Select the type of the field to be appended",
                    className: "jsoneditor-insert",
                    click: function () {
                        n._onAppend("", "", "auto")
                    },
                    submenu: [{
                        text: "Auto", className: "jsoneditor-type-auto", title: r.auto, click: function () {
                            n._onAppend("", "", "auto")
                        }
                    }, {
                        text: "Array", className: "jsoneditor-type-array", title: r.array, click: function () {
                            n._onAppend("", [])
                        }
                    }, {
                        text: "Object", className: "jsoneditor-type-object", title: r.object, click: function () {
                            n._onAppend("", {})
                        }
                    }, {
                        text: "String", className: "jsoneditor-type-string", title: r.string, click: function () {
                            n._onAppend("", "", "string")
                        }
                    }]
                }], a = new o(s, {close: i});
                a.show(t, this.editor.content)
            }, t.prototype.onEvent = function (e) {
                var t = e.type, i = e.target || e.srcElement, n = this.dom, o = n.menu;
                if (i == o && ("mouseover" == t ? this.editor.highlighter.highlight(this.parent) : "mouseout" == t && this.editor.highlighter.unhighlight()), "click" == t && i == n.menu) {
                    var s = this.editor.highlighter;
                    s.highlight(this.parent), s.lock(), r.addClassName(n.menu, "jsoneditor-selected"), this.showContextMenu(n.menu, function () {
                        r.removeClassName(n.menu, "jsoneditor-selected"), s.unlock(), s.unhighlight()
                    })
                }
                "keydown" == t && this.onKeyDown(e)
            }, t
        }

        var r = i(3), o = i(8);
        e.exports = n
    }, function (e, t, i) {
        "use strict";
        function n(e, t, i) {
            var o = this._refs[i];
            if ("string" == typeof o) {
                if (!this._refs[o])return n.call(this, e, t, o);
                o = this._refs[o]
            }
            if (o = o || this._schemas[i], o instanceof w)return a(o.schema, this.opts.inlineRefs) ? o.schema : o.validate || this._compile(o);
            var s, l, c, h = r.call(this, t, i);
            return h && (s = h.schema, t = h.root, c = h.baseId), s instanceof w ? l = s.validate || e.call(this, s.schema, t, void 0, c) : s && (l = a(s, this.opts.inlineRefs) ? s : e.call(this, s, t, void 0, c)),
                l
        }

        function r(e, t) {
            var i = m.parse(t, !1, !0), n = d(i), r = h(e.schema.id);
            if (n !== r) {
                var a = u(n), l = this._refs[a];
                if ("string" == typeof l)return o.call(this, e, l, i);
                if (l instanceof w)l.validate || this._compile(l), e = l; else if (l = this._schemas[a], l instanceof w) {
                    if (l.validate || this._compile(l), a == u(t))return {schema: l, root: e, baseId: r};
                    e = l
                }
                if (!e.schema)return;
                r = h(e.schema.id)
            }
            return s.call(this, i, r, e.schema, e)
        }

        function o(e, t, i) {
            var n = r.call(this, e, t);
            if (n) {
                var o = n.schema, a = n.baseId;
                return e = n.root, o.id && (a = f(a, o.id)), s.call(this, i, a, o, e)
            }
        }

        function s(e, t, i, n) {
            if (e.hash = e.hash || "", "#/" == e.hash.slice(0, 2)) {
                for (var o = e.hash.split("/"), s = 1; s < o.length; s++) {
                    var a = o[s];
                    if (a) {
                        if (a = v.unescapeFragment(a), i = i[a], !i)break;
                        if (i.id && !y[a] && (t = f(t, i.id)), i.$ref) {
                            var l = f(t, i.$ref), c = r.call(this, n, l);
                            c && (i = c.schema, n = c.root, t = c.baseId)
                        }
                    }
                }
                return i && i != n.schema ? {schema: i, root: n, baseId: t} : void 0
            }
        }

        function a(e, t) {
            return void 0 === t ? l(e) : t ? c(e) <= t : void 0
        }

        function l(e) {
            var t;
            if (Array.isArray(e)) {
                for (var i = 0; i < e.length; i++)if (t = e[i], "object" == typeof t && !l(t))return !1
            } else for (var n in e) {
                if ("$ref" == n)return !1;
                if (t = e[n], "object" == typeof t && !l(t))return !1
            }
            return !0
        }

        function c(e) {
            var t, i = 0;
            if (Array.isArray(e)) {
                for (var n = 0; n < e.length; n++)if (t = e[n], "object" == typeof t && (i += c(t)), i == 1 / 0)return 1 / 0
            } else for (var r in e) {
                if ("$ref" == r)return 1 / 0;
                if (A[r])i++; else if (t = e[r], "object" == typeof t && (i += c(t) + 1), i == 1 / 0)return 1 / 0
            }
            return i
        }

        function h(e, t) {
            t !== !1 && (e = u(e));
            var i = m.parse(e, !1, !0);
            return d(i)
        }

        function d(e) {
            return (e.protocol || "") + (e.protocol ? "//" : "") + (e.host || "") + (e.path || "") + "#"
        }

        function u(e) {
            return e ? e.replace(E, "") : ""
        }

        function f(e, t) {
            return t = u(t), m.resolve(e, t)
        }

        function p(e) {
            function t(e, i, r) {
                if (Array.isArray(e))for (var o = 0; o < e.length; o++)t.call(this, e[o], i + "/" + o, r); else if (e && "object" == typeof e) {
                    if ("string" == typeof e.id) {
                        var s = r = r ? m.resolve(r, e.id) : u(e.id), a = this._refs[s];
                        if ("string" == typeof a && (a = this._refs[a]), a && a.schema) {
                            if (!g(e, a.schema))throw new Error('id "' + s + '" resolves to more than one schema')
                        } else if (s != u(i))if ("#" == s[0]) {
                            if (n[s] && !g(e, n[s]))throw new Error('id "' + s + '" resolves to more than one schema');
                            n[s] = e
                        } else this._refs[s] = i
                    }
                    for (var l in e)t.call(this, e[l], i + "/" + v.escapeFragment(l), r)
                }
            }

            var i = u(e.id), n = {};
            return t.call(this, e, h(i, !1), i), n
        }

        var m = i(37), g = i(29), v = i(30), w = i(16);
        e.exports = n, n.normalizeId = u, n.fullPath = h, n.url = f, n.ids = p, n.inlineRef = a;
        var y = v.toHash(["properties", "patternProperties", "enum", "dependencies", "definitions"]), A = v.toHash(["type", "format", "pattern", "maxLength", "minLength", "maxProperties", "minProperties", "maxItems", "minItems", "maximum", "minimum", "uniqueItems", "multipleOf", "required", "enum"]), E = /#\/?$/
    }, function (e, t, i) {
        "use strict";
        var n = e.exports = function () {
            this._cache = {}
        };
        n.prototype.put = function (e, t) {
            this._cache[e] = t
        }, n.prototype.get = function (e) {
            return this._cache[e]
        }, n.prototype.del = function (e) {
            delete this._cache[e]
        }
    }, function (e, t, i) {
        "use strict";
        function n(e) {
            r.copy(e, this)
        }

        var r = i(30);
        e.exports = n
    }, function (e, t, i) {
        "use strict";
        function n(e) {
            e = "full" == e ? "full" : "fast";
            var t = f.copy(n[e]);
            for (var i in n.compare)t[i] = {validate: t[i], compare: n.compare[i]};
            return t
        }

        function r(e) {
            var t = e.match(p);
            if (!t)return !1;
            var i = +t[1], n = +t[2];
            return i >= 1 && 12 >= i && n >= 1 && n <= m[i]
        }

        function o(e, t) {
            var i = e.match(g);
            if (!i)return !1;
            var n = i[1], r = i[2], o = i[3], s = i[5];
            return 23 >= n && 59 >= r && 59 >= o && (!t || s)
        }

        function s(e) {
            var t = e.split(C);
            return r(t[0]) && o(t[1], !0)
        }

        function a(e) {
            return e.length <= 255 && v.test(e)
        }

        function l(e) {
            return b.test(e) && w.test(e)
        }

        function c(e) {
            try {
                return new RegExp(e), !0
            } catch (t) {
                return !1
            }
        }

        function h(e, t) {
            return e && t ? e > t ? 1 : t > e ? -1 : e === t ? 0 : void 0 : void 0
        }

        function d(e, t) {
            return e && t && (e = e.match(g), t = t.match(g), e && t) ? (e = e[1] + e[2] + e[3] + (e[4] || ""), t = t[1] + t[2] + t[3] + (t[4] || ""), e > t ? 1 : t > e ? -1 : e === t ? 0 : void 0) : void 0
        }

        function u(e, t) {
            if (e && t) {
                e = e.split(C), t = t.split(C);
                var i = h(e[0], t[0]);
                if (void 0 !== i)return i || d(e[1], t[1])
            }
        }

        var f = i(30), p = /^\d\d\d\d-(\d\d)-(\d\d)$/, m = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], g = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i, v = /^[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?(\.[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?)*$/i, w = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*)?(?:\#(?:[a-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*)?$/i, y = /^(?:urn\:uuid\:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i, A = /^(?:\/(?:[^~\/]|~0|~1)+)*(?:\/)?$|^\#(?:\/(?:[a-z0-9_\-\.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)+)*(?:\/)?$/i, E = /^(?:0|[1-9][0-9]*)(?:\#|(?:\/(?:[^~\/]|~0|~1)+)*(?:\/)?)$/;
        e.exports = n, n.fast = {
            date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
            time: /^[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
            "date-time": /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i,
            uri: /^(?:[a-z][a-z0-9+-.]*)?(?:\:|\/)\/?[^\s]*$/i,
            email: /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
            hostname: v,
            ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
            ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
            regex: c,
            uuid: y,
            "json-pointer": A,
            "relative-json-pointer": E
        }, n.full = {
            date: r,
            time: o,
            "date-time": s,
            uri: l,
            email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
            hostname: a,
            ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
            ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
            regex: c,
            uuid: y,
            "json-pointer": A,
            "relative-json-pointer": E
        }, n.compare = {date: h, time: d, "date-time": u};
        var C = /t|\s/i, b = /\/|\:/
    }, function (e, t, i) {
        "use strict";
        var n = i(31), r = i(30);
        e.exports = function () {
            var e = [{type: "number", rules: ["maximum", "minimum", "multipleOf"]}, {
                type: "string",
                rules: ["maxLength", "minLength", "pattern", "format"]
            }, {type: "array", rules: ["maxItems", "minItems", "uniqueItems", "items"]}, {
                type: "object",
                rules: ["maxProperties", "minProperties", "required", "dependencies", "properties"]
            }, {rules: ["$ref", "enum", "not", "anyOf", "oneOf", "allOf"]}];
            return e.all = ["type", "additionalProperties", "patternProperties"], e.keywords = ["additionalItems", "$schema", "id", "title", "description", "default"], e.types = ["number", "integer", "string", "array", "object", "boolean", "null"], e.forEach(function (t) {
                t.rules = t.rules.map(function (t) {
                    return e.all.push(t), {keyword: t, code: n[t]}
                })
            }), e.keywords = r.toHash(e.all.concat(e.keywords)), e.all = r.toHash(e.all), e.types = r.toHash(e.types), e
        }
    }, function (e, t, i) {
        "use strict";
        function n(e) {
            if (e.opts.meta !== !1) {
                var t = i(32);
                e.addMetaSchema(t, o)
            }
            e.addKeyword("constant", {
                inline: i(33),
                statements: !0,
                errors: "full"
            }), e.addKeyword("contains", {type: "array", macro: r});
            var n = i(34);
            e.addKeyword("formatMaximum", {
                type: "string",
                inline: n,
                statements: !0,
                errors: "full"
            }), e.addKeyword("formatMinimum", {
                type: "string",
                inline: n,
                statements: !0,
                errors: "full"
            }), e.addKeyword("exclusiveFormatMaximum"), e.addKeyword("exclusiveFormatMinimum"), e.addKeyword("patternGroups"), e.addKeyword("switch", {
                inline: i(35),
                statements: !0,
                errors: "full"
            })
        }

        function r(e) {
            return {not: {items: {not: e}}}
        }

        var o = "https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/json-schema-v5.json";
        e.exports = {enable: n, META_SCHEMA_ID: o}
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            function i(e, t, n) {
                function o(n) {
                    function o(n, o) {
                        if (n)t(n); else {
                            if (!r._refs[s] && !r._schemas[s])try {
                                r.addSchema(o, s)
                            } catch (a) {
                                return void t(a)
                            }
                            i(e, t)
                        }
                    }

                    var s = n.missingSchema;
                    if (r._refs[s] || r._schemas[s])return t(new Error("Schema " + s + " is loaded but" + n.missingRef + "cannot be resolved"));
                    var a = r._loadingSchemas[s];
                    a ? "function" == typeof a ? r._loadingSchemas[s] = [a, o] : a[a.length] = o : (r._loadingSchemas[s] = o, r.opts.loadSchema(s, function (e, t) {
                        var i = r._loadingSchemas[s];
                        if (delete r._loadingSchemas[s], "function" == typeof i)i(e, t); else for (var n = 0; n < i.length; n++)i[n](e, t)
                    }))
                }

                function s(e, i) {
                    n ? setTimeout(function () {
                        t(e, i)
                    }) : t(e, i)
                }

                var a;
                try {
                    a = r.compile(e)
                } catch (l) {
                    return void(l.missingSchema ? o(l) : s(l))
                }
                s(null, a)
            }

            var n, r = this;
            try {
                n = this._addSchema(e)
            } catch (o) {
                return void setTimeout(function () {
                    t(o)
                })
            }
            if (n.validate)setTimeout(function () {
                t(null, n.validate)
            }); else {
                if ("function" != typeof this.opts.loadSchema)throw new Error("options.loadSchema should be a function");
                i(e, t, !0)
            }
        }
    }, function (e, t, i) {
        "use strict";
        var n = /^[a-z_$][a-z0-9_$]*$/i;
        e.exports = function (e, t) {
            function i(e, t, i) {
                for (var n, r = 0; r < o.RULES.length; r++) {
                    var s = o.RULES[r];
                    if (s.type == t) {
                        n = s;
                        break
                    }
                }
                n || (n = {type: t, rules: []}, o.RULES.push(n));
                var a = {keyword: e, definition: i, custom: !0};
                n.rules.push(a)
            }

            function r(e) {
                if (!o.RULES.types[e])throw new Error("Unknown type " + e)
            }

            var o = this;
            if (this.RULES.keywords[e])throw new Error("Keyword " + e + " is already defined");
            if (!n.test(e))throw new Error("Keyword " + e + " is not a valid identifier");
            if (t) {
                var s = t.type;
                if (Array.isArray(s)) {
                    var a, l = s.length;
                    for (a = 0; l > a; a++)r(s[a]);
                    for (a = 0; l > a; a++)i(e, s[a], t)
                } else s && r(s), i(e, s, t)
            }
            this.RULES.keywords[e] = !0, this.RULES.all[e] = !0
        }
    }, function (e, t, i) {
        ace.define("ace/theme/jsoneditor", ["require", "exports", "module", "ace/lib/dom"], function (e, t, i) {
            t.isDark = !1, t.cssClass = "ace-jsoneditor", t.cssText = '.ace-jsoneditor .ace_gutter {	background: #ebebeb;	color: #333	}		.ace-jsoneditor.ace_editor {	font-family: droid sans mono, consolas, monospace, courier new, courier, sans-serif;	line-height: 1.3;	}	.ace-jsoneditor .ace_print-margin {	width: 1px;	background: #e8e8e8	}	.ace-jsoneditor .ace_scroller {	background-color: #FFFFFF	}	.ace-jsoneditor .ace_text-layer {	color: gray	}	.ace-jsoneditor .ace_variable {	color: #1a1a1a	}	.ace-jsoneditor .ace_cursor {	border-left: 2px solid #000000	}	.ace-jsoneditor .ace_overwrite-cursors .ace_cursor {	border-left: 0px;	border-bottom: 1px solid #000000	}	.ace-jsoneditor .ace_marker-layer .ace_selection {	background: lightgray	}	.ace-jsoneditor.ace_multiselect .ace_selection.ace_start {	box-shadow: 0 0 3px 0px #FFFFFF;	border-radius: 2px	}	.ace-jsoneditor .ace_marker-layer .ace_step {	background: rgb(255, 255, 0)	}	.ace-jsoneditor .ace_marker-layer .ace_bracket {	margin: -1px 0 0 -1px;	border: 1px solid #BFBFBF	}	.ace-jsoneditor .ace_marker-layer .ace_active-line {	background: #FFFBD1	}	.ace-jsoneditor .ace_gutter-active-line {	background-color : #dcdcdc	}	.ace-jsoneditor .ace_marker-layer .ace_selected-word {	border: 1px solid lightgray	}	.ace-jsoneditor .ace_invisible {	color: #BFBFBF	}	.ace-jsoneditor .ace_keyword,	.ace-jsoneditor .ace_meta,	.ace-jsoneditor .ace_support.ace_constant.ace_property-value {	color: #AF956F	}	.ace-jsoneditor .ace_keyword.ace_operator {	color: #484848	}	.ace-jsoneditor .ace_keyword.ace_other.ace_unit {	color: #96DC5F	}	.ace-jsoneditor .ace_constant.ace_language {	color: darkorange	}	.ace-jsoneditor .ace_constant.ace_numeric {	color: red	}	.ace-jsoneditor .ace_constant.ace_character.ace_entity {	color: #BF78CC	}	.ace-jsoneditor .ace_invalid {	color: #FFFFFF;	background-color: #FF002A;	}	.ace-jsoneditor .ace_fold {	background-color: #AF956F;	border-color: #000000	}	.ace-jsoneditor .ace_storage,	.ace-jsoneditor .ace_support.ace_class,	.ace-jsoneditor .ace_support.ace_function,	.ace-jsoneditor .ace_support.ace_other,	.ace-jsoneditor .ace_support.ace_type {	color: #C52727	}	.ace-jsoneditor .ace_string {	color: green	}	.ace-jsoneditor .ace_comment {	color: #BCC8BA	}	.ace-jsoneditor .ace_entity.ace_name.ace_tag,	.ace-jsoneditor .ace_entity.ace_other.ace_attribute-name {	color: #606060	}	.ace-jsoneditor .ace_markup.ace_underline {	text-decoration: underline	}	.ace-jsoneditor .ace_indent-guide {	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y	}';
            var n = e("../lib/dom");
            n.importCssString(t.cssText, t.cssClass)
        })
    }, function (module, exports, __webpack_require__) {
        "use strict";
        function compile(schema, root, localRefs, baseId) {
            function localCompile(_schema, _root, localRefs, baseId) {
                var isRoot = !_root || _root && _root.schema == _schema;
                if (_root.schema != root.schema)return compile.call(self, _schema, _root, localRefs, baseId);
                var validateCode = validateGenerator({
                    isTop: !0,
                    schema: _schema,
                    isRoot: isRoot,
                    baseId: baseId,
                    root: _root,
                    schemaPath: "",
                    errSchemaPath: "#",
                    errorPath: '""',
                    RULES: RULES,
                    validate: validateGenerator,
                    util: util,
                    resolve: resolve,
                    resolveRef: resolveRef,
                    usePattern: usePattern,
                    useDefault: useDefault,
                    useCustomRule: useCustomRule,
                    opts: self.opts,
                    formats: formats,
                    self: self
                });
                if (validateCode = vars(refVal, refValCode) + vars(patterns, patternCode) + vars(defaults, defaultCode) + vars(customRules, customRuleCode) + validateCode, self.opts.beautify) {
                    var opts = self.opts.beautify === !0 ? {indent_size: 2} : self.opts.beautify;
                    beautify ? validateCode = beautify(validateCode, opts) : console.error('"npm install js-beautify" to use beautify option')
                }
                var validate;
                try {
                    eval(validateCode), refVal[0] = validate
                } catch (e) {
                    throw console.log("Error compiling schema, function code:", validateCode), e
                }
                return validate.schema = _schema, validate.errors = null, validate.refs = refs, validate.refVal = refVal, validate.root = isRoot ? validate : _root, validate
            }

            function resolveRef(e, t, i) {
                t = resolve.url(e, t);
                var n, r, o = refs[t];
                if (void 0 !== o)return n = refVal[o], r = "refVal[" + o + "]", resolvedRef(n, r);
                if (!i) {
                    var s = root.refs[t];
                    if (void 0 !== s)return n = root.refVal[s], r = addLocalRef(t, n), resolvedRef(n, r)
                }
                r = addLocalRef(t);
                var a = resolve.call(self, localCompile, root, t);
                if (!a) {
                    var l = localRefs && localRefs[t];
                    l && (a = resolve.inlineRef(l, self.opts.inlineRefs) ? l : compile.call(self, l, root, localRefs, e))
                }
                return a ? (replaceLocalRef(t, a), resolvedRef(a, r)) : void 0
            }

            function addLocalRef(e, t) {
                var i = refVal.length;
                return refVal[i] = t, refs[e] = i, "refVal" + i
            }

            function replaceLocalRef(e, t) {
                var i = refs[e];
                refVal[i] = t
            }

            function resolvedRef(e, t) {
                return "object" == typeof e ? {schema: e, code: t} : t
            }

            function usePattern(e) {
                var t = patternsHash[e];
                return void 0 === t && (t = patternsHash[e] = patterns.length, patterns[t] = e), "pattern" + t
            }

            function useDefault(e) {
                switch (typeof e) {
                    case"boolean":
                    case"number":
                        return "" + e;
                    case"string":
                        return util.toQuotedString(e);
                    case"object":
                        if (null === e)return "null";
                        var t = stableStringify(e), i = defaultsHash[t];
                        return void 0 === i && (i = defaultsHash[t] = defaults.length, defaults[i] = e), "default" + i
                }
            }

            function useCustomRule(e, t, i, n) {
                var r, o = e.definition.compile, s = e.definition.inline, a = e.definition.macro;
                o ? r = o.call(self, t, i) : a ? (r = a.call(self, t, i), self.opts.validateSchema !== !1 && self.validateSchema(r, !0)) : r = s ? s.call(self, n, e.keyword, t, i) : e.definition.validate;
                var l = customRules.length;
                return customRules[l] = r, {code: "customRule" + l, validate: r}
            }

            var self = this, refVal = [void 0], refs = {}, patterns = [], patternsHash = {}, defaults = [], defaultsHash = {}, customRules = [], customRulesHash = {};
            root = root || {schema: schema, refVal: refVal, refs: refs};
            var formats = this._formats, RULES = this.RULES;
            return localCompile(schema, root, localRefs, baseId)
        }

        function patternCode(e, t) {
            return "var pattern" + e + " = new RegExp(" + util.toQuotedString(t[e]) + ");"
        }

        function defaultCode(e) {
            return "var default" + e + " = defaults[" + e + "];"
        }

        function refValCode(e, t) {
            return t[e] ? "var refVal" + e + " = refVal[" + e + "];" : ""
        }

        function customRuleCode(e) {
            return "var customRule" + e + " = customRules[" + e + "];"
        }

        function vars(e, t) {
            if (!e.length)return "";
            for (var i = "", n = 0; n < e.length; n++)i += t(n, e);
            return i
        }

        var resolve = __webpack_require__(14), util = __webpack_require__(30), equal = __webpack_require__(29), stableStringify = __webpack_require__(24), beautify = function () {
            try {
                return __webpack_require__(!function () {
                    var e = new Error('Cannot find module "js-beautify"');
                    throw e.code = "MODULE_NOT_FOUND", e
                }()).js_beautify
            } catch (e) {
            }
        }(), validateGenerator = __webpack_require__(36);
        module.exports = compile;
        var ucs2length = util.ucs2length
    }, function (e, t, i) {
        var n = "undefined" != typeof JSON ? JSON : i(57);
        e.exports = function (e, t) {
            t || (t = {}), "function" == typeof t && (t = {cmp: t});
            var i = t.space || "";
            "number" == typeof i && (i = Array(i + 1).join(" "));
            var s = "boolean" == typeof t.cycles ? t.cycles : !1, a = t.replacer || function (e, t) {
                    return t
                }, l = t.cmp && function (e) {
                    return function (t) {
                        return function (i, n) {
                            var r = {key: i, value: t[i]}, o = {key: n, value: t[n]};
                            return e(r, o)
                        }
                    }
                }(t.cmp), c = [];
            return function h(e, t, d, u) {
                var f = i ? "\n" + new Array(u + 1).join(i) : "", p = i ? ": " : ":";
                if (d && d.toJSON && "function" == typeof d.toJSON && (d = d.toJSON()), d = a.call(e, t, d), void 0 !== d) {
                    if ("object" != typeof d || null === d)return n.stringify(d);
                    if (r(d)) {
                        for (var m = [], g = 0; g < d.length; g++) {
                            var v = h(d, g, d[g], u + 1) || n.stringify(null);
                            m.push(f + i + v)
                        }
                        return "[" + m.join(",") + f + "]"
                    }
                    if (-1 !== c.indexOf(d)) {
                        if (s)return n.stringify("__cycle__");
                        throw new TypeError("Converting circular structure to JSON")
                    }
                    c.push(d);
                    for (var w = o(d).sort(l && l(d)), m = [], g = 0; g < w.length; g++) {
                        var t = w[g], y = h(d, t, d[t], u + 1);
                        if (y) {
                            var A = n.stringify(t) + p + y;
                            m.push(f + i + A)
                        }
                    }
                    return "{" + m.join(",") + f + "}"
                }
            }({"": e}, "", e, 0)
        };
        var r = Array.isArray || function (e) {
                return "[object Array]" === {}.toString.call(e)
            }, o = Object.keys || function (e) {
                var t = Object.prototype.hasOwnProperty || function () {
                        return !0
                    }, i = [];
                for (var n in e)t.call(e, n) && i.push(n);
                return i
            }
    }, function (e, t, i) {
        !function () {
            function e(e) {
                var t = i;
                e && (i[e] || (i[e] = {}), t = i[e]), t.define && t.define.packaged || (n.original = t.define, t.define = n, t.define.packaged = !0), t.acequire && t.acequire.packaged || (o.original = t.acequire, t.acequire = o, t.acequire.packaged = !0)
            }

            var t = "ace", i = function () {
                return this
            }();
            if (i || "undefined" == typeof window || (i = window), t || "undefined" == typeof acequirejs) {
                var n = function (e, t, i) {
                    return "string" != typeof e ? void(n.original ? n.original.apply(this, arguments) : (console.error("dropping module because define wasn't a string."), console.trace())) : (2 == arguments.length && (i = t), void(n.modules[e] || (n.payloads[e] = i, n.modules[e] = null)))
                };
                n.modules = {}, n.payloads = {};
                var r = function (e, t, i) {
                    if ("string" == typeof t) {
                        var n = a(e, t);
                        if (void 0 != n)return i && i(), n
                    } else if ("[object Array]" === Object.prototype.toString.call(t)) {
                        for (var r = [], s = 0, l = t.length; l > s; ++s) {
                            var c = a(e, t[s]);
                            if (void 0 == c && o.original)return;
                            r.push(c)
                        }
                        return i && i.apply(null, r) || !0
                    }
                }, o = function (e, t) {
                    var i = r("", e, t);
                    return void 0 == i && o.original ? o.original.apply(this, arguments) : i
                }, s = function (e, t) {
                    if (-1 !== t.indexOf("!")) {
                        var i = t.split("!");
                        return s(e, i[0]) + "!" + s(e, i[1])
                    }
                    if ("." == t.charAt(0)) {
                        var n = e.split("/").slice(0, -1).join("/");
                        for (t = n + "/" + t; -1 !== t.indexOf(".") && r != t;) {
                            var r = t;
                            t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
                        }
                    }
                    return t
                }, a = function (e, t) {
                    t = s(e, t);
                    var i = n.modules[t];
                    if (!i) {
                        if (i = n.payloads[t], "function" == typeof i) {
                            var o = {}, a = {id: t, uri: "", exports: o, packaged: !0}, l = function (e, i) {
                                return r(t, e, i)
                            }, c = i(l, o, a);
                            o = c || a.exports, n.modules[t] = o, delete n.payloads[t]
                        }
                        i = n.modules[t] = o || i
                    }
                    return i
                };
                e(t)
            }
        }(), ace.define("ace/lib/regexp", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            function n(e) {
                return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "")
            }

            function r(e, t, i) {
                if (Array.prototype.indexOf)return e.indexOf(t, i);
                for (var n = i || 0; n < e.length; n++)if (e[n] === t)return n;
                return -1
            }

            var o = {
                exec: RegExp.prototype.exec,
                test: RegExp.prototype.test,
                match: String.prototype.match,
                replace: String.prototype.replace,
                split: String.prototype.split
            }, s = void 0 === o.exec.call(/()??/, "")[1], a = function () {
                var e = /^/g;
                return o.test.call(e, ""), !e.lastIndex
            }();
            a && s || (RegExp.prototype.exec = function (e) {
                var t, i, l = o.exec.apply(this, arguments);
                if ("string" == typeof e && l) {
                    if (!s && l.length > 1 && r(l, "") > -1 && (i = RegExp(this.source, o.replace.call(n(this), "g", "")), o.replace.call(e.slice(l.index), i, function () {
                            for (var e = 1; e < arguments.length - 2; e++)void 0 === arguments[e] && (l[e] = void 0)
                        })), this._xregexp && this._xregexp.captureNames)for (var c = 1; c < l.length; c++)t = this._xregexp.captureNames[c - 1], t && (l[t] = l[c]);
                    !a && this.global && !l[0].length && this.lastIndex > l.index && this.lastIndex--
                }
                return l
            }, a || (RegExp.prototype.test = function (e) {
                var t = o.exec.call(this, e);
                return t && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--, !!t
            }))
        }), ace.define("ace/lib/es5-shim", ["require", "exports", "module"], function (e, t, i) {
            function n() {
            }

            function r(e) {
                try {
                    return Object.defineProperty(e, "sentinel", {}), "sentinel"in e
                } catch (t) {
                }
            }

            function o(e) {
                return e = +e, e !== e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -(1 / 0) && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
            }

            Function.prototype.bind || (Function.prototype.bind = function (e) {
                var t = this;
                if ("function" != typeof t)throw new TypeError("Function.prototype.bind called on incompatible " + t);
                var i = p.call(arguments, 1), r = function () {
                    if (this instanceof r) {
                        var n = t.apply(this, i.concat(p.call(arguments)));
                        return Object(n) === n ? n : this
                    }
                    return t.apply(e, i.concat(p.call(arguments)))
                };
                return t.prototype && (n.prototype = t.prototype, r.prototype = new n, n.prototype = null), r
            });
            var s, a, l, c, h, d = Function.prototype.call, u = Array.prototype, f = Object.prototype, p = u.slice, m = d.bind(f.toString), g = d.bind(f.hasOwnProperty);
            if ((h = g(f, "__defineGetter__")) && (s = d.bind(f.__defineGetter__), a = d.bind(f.__defineSetter__), l = d.bind(f.__lookupGetter__), c = d.bind(f.__lookupSetter__)), 2 != [1, 2].splice(0).length)if (function () {
                    function e(e) {
                        var t = new Array(e + 2);
                        return t[0] = t[1] = 0, t
                    }

                    var t, i = [];
                    return i.splice.apply(i, e(20)), i.splice.apply(i, e(26)), t = i.length, i.splice(5, 0, "XXX"), t + 1 == i.length, t + 1 == i.length ? !0 : void 0
                }()) {
                var v = Array.prototype.splice;
                Array.prototype.splice = function (e, t) {
                    return arguments.length ? v.apply(this, [void 0 === e ? 0 : e, void 0 === t ? this.length - e : t].concat(p.call(arguments, 2))) : []
                }
            } else Array.prototype.splice = function (e, t) {
                var i = this.length;
                e > 0 ? e > i && (e = i) : void 0 == e ? e = 0 : 0 > e && (e = Math.max(i + e, 0)), i > e + t || (t = i - e);
                var n = this.slice(e, e + t), r = p.call(arguments, 2), o = r.length;
                if (e === i)o && this.push.apply(this, r); else {
                    var s = Math.min(t, i - e), a = e + s, l = a + o - s, c = i - a, h = i - s;
                    if (a > l)for (var d = 0; c > d; ++d)this[l + d] = this[a + d]; else if (l > a)for (d = c; d--;)this[l + d] = this[a + d];
                    if (o && e === h)this.length = h, this.push.apply(this, r); else for (this.length = h + o, d = 0; o > d; ++d)this[e + d] = r[d]
                }
                return n
            };
            Array.isArray || (Array.isArray = function (e) {
                return "[object Array]" == m(e)
            });
            var w = Object("a"), y = "a" != w[0] || !(0 in w);
            if (Array.prototype.forEach || (Array.prototype.forEach = function (e) {
                    var t = P(this), i = y && "[object String]" == m(this) ? this.split("") : t, n = arguments[1], r = -1, o = i.length >>> 0;
                    if ("[object Function]" != m(e))throw new TypeError;
                    for (; ++r < o;)r in i && e.call(n, i[r], r, t)
                }), Array.prototype.map || (Array.prototype.map = function (e) {
                    var t = P(this), i = y && "[object String]" == m(this) ? this.split("") : t, n = i.length >>> 0, r = Array(n), o = arguments[1];
                    if ("[object Function]" != m(e))throw new TypeError(e + " is not a function");
                    for (var s = 0; n > s; s++)s in i && (r[s] = e.call(o, i[s], s, t));
                    return r
                }), Array.prototype.filter || (Array.prototype.filter = function (e) {
                    var t, i = P(this), n = y && "[object String]" == m(this) ? this.split("") : i, r = n.length >>> 0, o = [], s = arguments[1];
                    if ("[object Function]" != m(e))throw new TypeError(e + " is not a function");
                    for (var a = 0; r > a; a++)a in n && (t = n[a], e.call(s, t, a, i) && o.push(t));
                    return o
                }), Array.prototype.every || (Array.prototype.every = function (e) {
                    var t = P(this), i = y && "[object String]" == m(this) ? this.split("") : t, n = i.length >>> 0, r = arguments[1];
                    if ("[object Function]" != m(e))throw new TypeError(e + " is not a function");
                    for (var o = 0; n > o; o++)if (o in i && !e.call(r, i[o], o, t))return !1;
                    return !0
                }), Array.prototype.some || (Array.prototype.some = function (e) {
                    var t = P(this), i = y && "[object String]" == m(this) ? this.split("") : t, n = i.length >>> 0, r = arguments[1];
                    if ("[object Function]" != m(e))throw new TypeError(e + " is not a function");
                    for (var o = 0; n > o; o++)if (o in i && e.call(r, i[o], o, t))return !0;
                    return !1
                }), Array.prototype.reduce || (Array.prototype.reduce = function (e) {
                    var t = P(this), i = y && "[object String]" == m(this) ? this.split("") : t, n = i.length >>> 0;
                    if ("[object Function]" != m(e))throw new TypeError(e + " is not a function");
                    if (!n && 1 == arguments.length)throw new TypeError("reduce of empty array with no initial value");
                    var r, o = 0;
                    if (arguments.length >= 2)r = arguments[1]; else for (; ;) {
                        if (o in i) {
                            r = i[o++];
                            break
                        }
                        if (++o >= n)throw new TypeError("reduce of empty array with no initial value")
                    }
                    for (; n > o; o++)o in i && (r = e.call(void 0, r, i[o], o, t));
                    return r
                }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function (e) {
                    var t = P(this), i = y && "[object String]" == m(this) ? this.split("") : t, n = i.length >>> 0;
                    if ("[object Function]" != m(e))throw new TypeError(e + " is not a function");
                    if (!n && 1 == arguments.length)throw new TypeError("reduceRight of empty array with no initial value");
                    var r, o = n - 1;
                    if (arguments.length >= 2)r = arguments[1]; else for (; ;) {
                        if (o in i) {
                            r = i[o--];
                            break
                        }
                        if (--o < 0)throw new TypeError("reduceRight of empty array with no initial value")
                    }
                    do o in this && (r = e.call(void 0, r, i[o], o, t)); while (o--);
                    return r
                }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function (e) {
                    var t = y && "[object String]" == m(this) ? this.split("") : P(this), i = t.length >>> 0;
                    if (!i)return -1;
                    var n = 0;
                    for (arguments.length > 1 && (n = o(arguments[1])), n = n >= 0 ? n : Math.max(0, i + n); i > n; n++)if (n in t && t[n] === e)return n;
                    return -1
                }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function (e) {
                    var t = y && "[object String]" == m(this) ? this.split("") : P(this), i = t.length >>> 0;
                    if (!i)return -1;
                    var n = i - 1;
                    for (arguments.length > 1 && (n = Math.min(n, o(arguments[1]))), n = n >= 0 ? n : i - Math.abs(n); n >= 0; n--)if (n in t && e === t[n])return n;
                    return -1
                }), Object.getPrototypeOf || (Object.getPrototypeOf = function (e) {
                    return e.__proto__ || (e.constructor ? e.constructor.prototype : f)
                }), !Object.getOwnPropertyDescriptor) {
                var A = "Object.getOwnPropertyDescriptor called on a non-object: ";
                Object.getOwnPropertyDescriptor = function (e, t) {
                    if ("object" != typeof e && "function" != typeof e || null === e)throw new TypeError(A + e);
                    if (g(e, t)) {
                        var i, n, r;
                        if (i = {enumerable: !0, configurable: !0}, h) {
                            var o = e.__proto__;
                            e.__proto__ = f;
                            var n = l(e, t), r = c(e, t);
                            if (e.__proto__ = o, n || r)return n && (i.get = n), r && (i.set = r), i
                        }
                        return i.value = e[t], i
                    }
                }
            }
            if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (e) {
                    return Object.keys(e)
                }), !Object.create) {
                var E;
                E = null === Object.prototype.__proto__ ? function () {
                    return {__proto__: null}
                } : function () {
                    var e = {};
                    for (var t in e)e[t] = null;
                    return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
                }, Object.create = function (e, t) {
                    var i;
                    if (null === e)i = E(); else {
                        if ("object" != typeof e)throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
                        var n = function () {
                        };
                        n.prototype = e, i = new n, i.__proto__ = e
                    }
                    return void 0 !== t && Object.defineProperties(i, t), i
                }
            }
            if (Object.defineProperty) {
                var C = r({}), b = "undefined" == typeof document || r(document.createElement("div"));
                if (!C || !b)var F = Object.defineProperty
            }
            if (!Object.defineProperty || F) {
                var x = "Property description must be an object: ", S = "Object.defineProperty called on non-object: ", $ = "getters & setters can not be defined on this javascript engine";
                Object.defineProperty = function (e, t, i) {
                    if ("object" != typeof e && "function" != typeof e || null === e)throw new TypeError(S + e);
                    if ("object" != typeof i && "function" != typeof i || null === i)throw new TypeError(x + i);
                    if (F)try {
                        return F.call(Object, e, t, i)
                    } catch (n) {
                    }
                    if (g(i, "value"))if (h && (l(e, t) || c(e, t))) {
                        var r = e.__proto__;
                        e.__proto__ = f, delete e[t], e[t] = i.value, e.__proto__ = r
                    } else e[t] = i.value; else {
                        if (!h)throw new TypeError($);
                        g(i, "get") && s(e, t, i.get), g(i, "set") && a(e, t, i.set)
                    }
                    return e
                }
            }
            Object.defineProperties || (Object.defineProperties = function (e, t) {
                for (var i in t)g(t, i) && Object.defineProperty(e, i, t[i]);
                return e
            }), Object.seal || (Object.seal = function (e) {
                return e
            }), Object.freeze || (Object.freeze = function (e) {
                return e
            });
            try {
                Object.freeze(function () {
                })
            } catch (D) {
                Object.freeze = function (e) {
                    return function (t) {
                        return "function" == typeof t ? t : e(t)
                    }
                }(Object.freeze)
            }
            if (Object.preventExtensions || (Object.preventExtensions = function (e) {
                    return e
                }), Object.isSealed || (Object.isSealed = function (e) {
                    return !1
                }), Object.isFrozen || (Object.isFrozen = function (e) {
                    return !1
                }), Object.isExtensible || (Object.isExtensible = function (e) {
                    if (Object(e) === e)throw new TypeError;
                    for (var t = ""; g(e, t);)t += "?";
                    e[t] = !0;
                    var i = g(e, t);
                    return delete e[t], i
                }), !Object.keys) {
                var k = !0, B = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], _ = B.length;
                for (var L in{toString: null})k = !1;
                Object.keys = function O(e) {
                    if ("object" != typeof e && "function" != typeof e || null === e)throw new TypeError("Object.keys called on a non-object");
                    var O = [];
                    for (var t in e)g(e, t) && O.push(t);
                    if (k)for (var i = 0, n = _; n > i; i++) {
                        var r = B[i];
                        g(e, r) && O.push(r)
                    }
                    return O
                }
            }
            Date.now || (Date.now = function () {
                return (new Date).getTime()
            });
            var R = "	\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff";
            if (!String.prototype.trim || R.trim()) {
                R = "[" + R + "]";
                var T = new RegExp("^" + R + R + "*"), M = new RegExp(R + R + "*$");
                String.prototype.trim = function () {
                    return String(this).replace(T, "").replace(M, "")
                }
            }
            var P = function (e) {
                if (null == e)throw new TypeError("can't convert " + e + " to object");
                return Object(e)
            }
        }), ace.define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function (e, t, i) {
            "use strict";
            e("./regexp"), e("./es5-shim")
        }), ace.define("ace/lib/dom", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            var n = "http://www.w3.org/1999/xhtml";
            return t.getDocumentHead = function (e) {
                return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement
            }, t.createElement = function (e, t) {
                return document.createElementNS ? document.createElementNS(t || n, e) : document.createElement(e)
            }, t.hasCssClass = function (e, t) {
                var i = (e.className || "").split(/\s+/g);
                return -1 !== i.indexOf(t)
            }, t.addCssClass = function (e, i) {
                t.hasCssClass(e, i) || (e.className += " " + i)
            }, t.removeCssClass = function (e, t) {
                for (var i = e.className.split(/\s+/g); ;) {
                    var n = i.indexOf(t);
                    if (-1 == n)break;
                    i.splice(n, 1)
                }
                e.className = i.join(" ")
            }, t.toggleCssClass = function (e, t) {
                for (var i = e.className.split(/\s+/g), n = !0; ;) {
                    var r = i.indexOf(t);
                    if (-1 == r)break;
                    n = !1, i.splice(r, 1)
                }
                return n && i.push(t), e.className = i.join(" "), n
            }, t.setCssClass = function (e, i, n) {
                n ? t.addCssClass(e, i) : t.removeCssClass(e, i)
            }, t.hasCssString = function (e, t) {
                var i, n = 0;
                if (t = t || document, t.createStyleSheet && (i = t.styleSheets)) {
                    for (; n < i.length;)if (i[n++].owningElement.id === e)return !0
                } else if (i = t.getElementsByTagName("style"))for (; n < i.length;)if (i[n++].id === e)return !0;
                return !1
            }, t.importCssString = function (e, i, n) {
                if (n = n || document, i && t.hasCssString(i, n))return null;
                var r;
                i && (e += "\n/*# sourceURL=ace/css/" + i + " */"), n.createStyleSheet ? (r = n.createStyleSheet(), r.cssText = e, i && (r.owningElement.id = i)) : (r = t.createElement("style"), r.appendChild(n.createTextNode(e)), i && (r.id = i), t.getDocumentHead(n).appendChild(r))
            }, t.importCssStylsheet = function (e, i) {
                if (i.createStyleSheet)i.createStyleSheet(e); else {
                    var n = t.createElement("link");
                    n.rel = "stylesheet", n.href = e, t.getDocumentHead(i).appendChild(n)
                }
            }, t.getInnerWidth = function (e) {
                return parseInt(t.computedStyle(e, "paddingLeft"), 10) + parseInt(t.computedStyle(e, "paddingRight"), 10) + e.clientWidth
            }, t.getInnerHeight = function (e) {
                return parseInt(t.computedStyle(e, "paddingTop"), 10) + parseInt(t.computedStyle(e, "paddingBottom"), 10) + e.clientHeight
            }, t.scrollbarWidth = function (e) {
                var i = t.createElement("ace_inner");
                i.style.width = "100%", i.style.minWidth = "0px", i.style.height = "200px", i.style.display = "block";
                var n = t.createElement("ace_outer"), r = n.style;
                r.position = "absolute", r.left = "-10000px", r.overflow = "hidden", r.width = "200px", r.minWidth = "0px", r.height = "150px", r.display = "block", n.appendChild(i);
                var o = e.documentElement;
                o.appendChild(n);
                var s = i.offsetWidth;
                r.overflow = "scroll";
                var a = i.offsetWidth;
                return s == a && (a = n.clientWidth), o.removeChild(n), s - a
            }, "undefined" == typeof document ? void(t.importCssString = function () {
            }) : (void 0 !== window.pageYOffset ? (t.getPageScrollTop = function () {
                return window.pageYOffset
            }, t.getPageScrollLeft = function () {
                return window.pageXOffset
            }) : (t.getPageScrollTop = function () {
                return document.body.scrollTop
            }, t.getPageScrollLeft = function () {
                return document.body.scrollLeft
            }), window.getComputedStyle ? t.computedStyle = function (e, t) {
                return t ? (window.getComputedStyle(e, "") || {})[t] || "" : window.getComputedStyle(e, "") || {}
            } : t.computedStyle = function (e, t) {
                return t ? e.currentStyle[t] : e.currentStyle
            }, t.setInnerHtml = function (e, t) {
                var i = e.cloneNode(!1);
                return i.innerHTML = t, e.parentNode.replaceChild(i, e), i
            }, "textContent"in document.documentElement ? (t.setInnerText = function (e, t) {
                e.textContent = t
            }, t.getInnerText = function (e) {
                return e.textContent
            }) : (t.setInnerText = function (e, t) {
                e.innerText = t
            }, t.getInnerText = function (e) {
                return e.innerText
            }), void(t.getParentWindow = function (e) {
                return e.defaultView || e.parentWindow
            }))
        }), ace.define("ace/lib/oop", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            t.inherits = function (e, t) {
                e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            }, t.mixin = function (e, t) {
                for (var i in t)e[i] = t[i];
                return e
            }, t.implement = function (e, i) {
                t.mixin(e, i)
            }
        }), ace.define("ace/lib/keys", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop"], function (e, t, i) {
            "use strict";
            e("./fixoldbrowsers");
            var n = e("./oop"), r = function () {
                var e, t, i = {
                    MODIFIER_KEYS: {16: "Shift", 17: "Ctrl", 18: "Alt", 224: "Meta"},
                    KEY_MODS: {ctrl: 1, alt: 2, option: 2, shift: 4, "super": 8, meta: 8, command: 8, cmd: 8},
                    FUNCTION_KEYS: {
                        8: "Backspace",
                        9: "Tab",
                        13: "Return",
                        19: "Pause",
                        27: "Esc",
                        32: "Space",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "Left",
                        38: "Up",
                        39: "Right",
                        40: "Down",
                        44: "Print",
                        45: "Insert",
                        46: "Delete",
                        96: "Numpad0",
                        97: "Numpad1",
                        98: "Numpad2",
                        99: "Numpad3",
                        100: "Numpad4",
                        101: "Numpad5",
                        102: "Numpad6",
                        103: "Numpad7",
                        104: "Numpad8",
                        105: "Numpad9",
                        "-13": "NumpadEnter",
                        112: "F1",
                        113: "F2",
                        114: "F3",
                        115: "F4",
                        116: "F5",
                        117: "F6",
                        118: "F7",
                        119: "F8",
                        120: "F9",
                        121: "F10",
                        122: "F11",
                        123: "F12",
                        144: "Numlock",
                        145: "Scrolllock"
                    },
                    PRINTABLE_KEYS: {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        61: "=",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        107: "+",
                        109: "-",
                        110: ".",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'",
                        111: "/",
                        106: "*"
                    }
                };
                for (t in i.FUNCTION_KEYS)e = i.FUNCTION_KEYS[t].toLowerCase(), i[e] = parseInt(t, 10);
                for (t in i.PRINTABLE_KEYS)e = i.PRINTABLE_KEYS[t].toLowerCase(), i[e] = parseInt(t, 10);
                return n.mixin(i, i.MODIFIER_KEYS), n.mixin(i, i.PRINTABLE_KEYS), n.mixin(i, i.FUNCTION_KEYS), i.enter = i["return"], i.escape = i.esc, i.del = i["delete"], i[173] = "-", function () {
                    for (var e = ["cmd", "ctrl", "alt", "shift"], t = Math.pow(2, e.length); t--;)i.KEY_MODS[t] = e.filter(function (e) {
                            return t & i.KEY_MODS[e]
                        }).join("-") + "-"
                }(), i.KEY_MODS[0] = "", i.KEY_MODS[-1] = "input-", i
            }();
            n.mixin(t, r), t.keyCodeToString = function (e) {
                var t = r[e];
                return "string" != typeof t && (t = String.fromCharCode(e)), t.toLowerCase()
            }
        }), ace.define("ace/lib/useragent", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            if (t.OS = {LINUX: "LINUX", MAC: "MAC", WINDOWS: "WINDOWS"}, t.getOS = function () {
                    return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS
                }, "object" == typeof navigator) {
                var n = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(), r = navigator.userAgent;
                t.isWin = "win" == n, t.isMac = "mac" == n, t.isLinux = "linux" == n, t.isIE = "Microsoft Internet Explorer" == navigator.appName || navigator.appName.indexOf("MSAppHost") >= 0 ? parseFloat((r.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((r.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = (window.Controllers || window.controllers) && "Gecko" === window.navigator.product, t.isOldGecko = t.isGecko && parseInt((r.match(/rv\:(\d+)/) || [])[1], 10) < 4, t.isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera), t.isWebKit = parseFloat(r.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(r.split(" Chrome/")[1]) || void 0, t.isAIR = r.indexOf("AdobeAIR") >= 0, t.isIPad = r.indexOf("iPad") >= 0, t.isTouchPad = r.indexOf("TouchPad") >= 0, t.isChromeOS = r.indexOf(" CrOS ") >= 0
            }
        }), ace.define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function (e, t, i) {
            "use strict";
            function n(e, t, i) {
                var n = c(t);
                if (!s.isMac && a) {
                    if (a.OSKey && (n |= 8), a.altGr) {
                        if (3 == (3 & n))return;
                        a.altGr = 0
                    }
                    if (18 === i || 17 === i) {
                        var r = "location"in t ? t.location : t.keyLocation;
                        if (17 === i && 1 === r)1 == a[i] && (l = t.timeStamp); else if (18 === i && 3 === n && 2 === r) {
                            var h = t.timeStamp - l;
                            50 > h && (a.altGr = !0)
                        }
                    }
                }
                if (i in o.MODIFIER_KEYS && (i = -1), 8 & n && i >= 91 && 93 >= i && (i = -1), !n && 13 === i) {
                    var r = "location"in t ? t.location : t.keyLocation;
                    if (3 === r && (e(t, n, -i), t.defaultPrevented))return
                }
                if (s.isChromeOS && 8 & n) {
                    if (e(t, n, i), t.defaultPrevented)return;
                    n &= -9
                }
                return n || i in o.FUNCTION_KEYS || i in o.PRINTABLE_KEYS ? e(t, n, i) : !1
            }

            function r() {
                a = Object.create(null), a.count = 0, a.lastT = 0
            }

            var o = e("./keys"), s = e("./useragent"), a = null, l = 0;
            t.addListener = function (e, t, i) {
                if (e.addEventListener)return e.addEventListener(t, i, !1);
                if (e.attachEvent) {
                    var n = function () {
                        i.call(e, window.event)
                    };
                    i._wrapper = n, e.attachEvent("on" + t, n)
                }
            }, t.removeListener = function (e, t, i) {
                return e.removeEventListener ? e.removeEventListener(t, i, !1) : void(e.detachEvent && e.detachEvent("on" + t, i._wrapper || i))
            }, t.stopEvent = function (e) {
                return t.stopPropagation(e), t.preventDefault(e), !1
            }, t.stopPropagation = function (e) {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }, t.preventDefault = function (e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }, t.getButton = function (e) {
                return "dblclick" == e.type ? 0 : "contextmenu" == e.type || s.isMac && e.ctrlKey && !e.altKey && !e.shiftKey ? 2 : e.preventDefault ? e.button : {
                    1: 0,
                    2: 2,
                    4: 1
                }[e.button]
            }, t.capture = function (e, i, n) {
                function r(e) {
                    i && i(e), n && n(e), t.removeListener(document, "mousemove", i, !0), t.removeListener(document, "mouseup", r, !0), t.removeListener(document, "dragstart", r, !0)
                }

                return t.addListener(document, "mousemove", i, !0), t.addListener(document, "mouseup", r, !0), t.addListener(document, "dragstart", r, !0), r
            }, t.addTouchMoveListener = function (e, i) {
                if ("ontouchmove"in e) {
                    var n, r;
                    t.addListener(e, "touchstart", function (e) {
                        var t = e.changedTouches[0];
                        n = t.clientX, r = t.clientY
                    }), t.addListener(e, "touchmove", function (e) {
                        var t = 1, o = e.changedTouches[0];
                        e.wheelX = -(o.clientX - n) / t, e.wheelY = -(o.clientY - r) / t, n = o.clientX, r = o.clientY, i(e)
                    })
                }
            }, t.addMouseWheelListener = function (e, i) {
                "onmousewheel"in e ? t.addListener(e, "mousewheel", function (e) {
                    var t = 8;
                    void 0 !== e.wheelDeltaX ? (e.wheelX = -e.wheelDeltaX / t, e.wheelY = -e.wheelDeltaY / t) : (e.wheelX = 0, e.wheelY = -e.wheelDelta / t), i(e)
                }) : "onwheel"in e ? t.addListener(e, "wheel", function (e) {
                    var t = .35;
                    switch (e.deltaMode) {
                        case e.DOM_DELTA_PIXEL:
                            e.wheelX = e.deltaX * t || 0, e.wheelY = e.deltaY * t || 0;
                            break;
                        case e.DOM_DELTA_LINE:
                        case e.DOM_DELTA_PAGE:
                            e.wheelX = 5 * (e.deltaX || 0), e.wheelY = 5 * (e.deltaY || 0)
                    }
                    i(e)
                }) : t.addListener(e, "DOMMouseScroll", function (e) {
                    e.axis && e.axis == e.HORIZONTAL_AXIS ? (e.wheelX = 5 * (e.detail || 0), e.wheelY = 0) : (e.wheelX = 0, e.wheelY = 5 * (e.detail || 0)), i(e)
                })
            }, t.addMultiMouseDownListener = function (e, i, n, r) {
                var o, a, l, c = 0, h = {2: "dblclick", 3: "tripleclick", 4: "quadclick"};
                t.addListener(e, "mousedown", function (e) {
                    if (0 !== t.getButton(e) ? c = 0 : e.detail > 1 ? (c++, c > 4 && (c = 1)) : c = 1, s.isIE) {
                        var d = Math.abs(e.clientX - o) > 5 || Math.abs(e.clientY - a) > 5;
                        (!l || d) && (c = 1), l && clearTimeout(l), l = setTimeout(function () {
                            l = null
                        }, i[c - 1] || 600), 1 == c && (o = e.clientX, a = e.clientY)
                    }
                    if (e._clicks = c, n[r]("mousedown", e), c > 4)c = 0; else if (c > 1)return n[r](h[c], e)
                }), s.isOldIE && t.addListener(e, "dblclick", function (e) {
                    c = 2, l && clearTimeout(l), l = setTimeout(function () {
                        l = null
                    }, i[c - 1] || 600), n[r]("mousedown", e), n[r](h[c], e)
                })
            };
            var c = !s.isMac || !s.isOpera || "KeyboardEvent"in window ? function (e) {
                return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0)
            } : function (e) {
                return 0 | (e.metaKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.ctrlKey ? 8 : 0)
            };
            if (t.getModifierString = function (e) {
                    return o.KEY_MODS[c(e)]
                }, t.addCommandKeyListener = function (e, i) {
                    var o = t.addListener;
                    if (s.isOldGecko || s.isOpera && !("KeyboardEvent"in window)) {
                        var l = null;
                        o(e, "keydown", function (e) {
                            l = e.keyCode
                        }), o(e, "keypress", function (e) {
                            return n(i, e, l)
                        })
                    } else {
                        var c = null;
                        o(e, "keydown", function (e) {
                            var t = e.keyCode;
                            a[t] = (a[t] || 0) + 1, 91 == t || 92 == t ? a.OSKey = !0 : a.OSKey && e.timeStamp - a.lastT > 200 && 1 == a.count && r(), 1 == a[t] && a.count++, a.lastT = e.timeStamp;
                            var o = n(i, e, t);
                            return c = e.defaultPrevented, o
                        }), o(e, "keypress", function (e) {
                            c && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && (t.stopEvent(e), c = null)
                        }), o(e, "keyup", function (e) {
                            var t = e.keyCode;
                            a[t] ? a.count = Math.max(a.count - 1, 0) : r(), (91 == t || 92 == t) && (a.OSKey = !1), a[t] = null
                        }), a || (r(), o(window, "focus", r))
                    }
                }, "object" == typeof window && window.postMessage && !s.isOldIE) {
                var h = 1;
                t.nextTick = function (e, i) {
                    i = i || window;
                    var n = "zero-timeout-message-" + h;
                    t.addListener(i, "message", function r(o) {
                        o.data == n && (t.stopPropagation(o), t.removeListener(i, "message", r), e())
                    }), i.postMessage(n, "*")
                }
            }
            t.nextFrame = "object" == typeof window && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame), t.nextFrame ? t.nextFrame = t.nextFrame.bind(window) : t.nextFrame = function (e) {
                setTimeout(e, 17)
            }
        }), ace.define("ace/lib/lang", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            t.last = function (e) {
                return e[e.length - 1]
            }, t.stringReverse = function (e) {
                return e.split("").reverse().join("")
            }, t.stringRepeat = function (e, t) {
                for (var i = ""; t > 0;)1 & t && (i += e), (t >>= 1) && (e += e);
                return i
            };
            var n = /^\s\s*/, r = /\s\s*$/;
            t.stringTrimLeft = function (e) {
                return e.replace(n, "")
            }, t.stringTrimRight = function (e) {
                return e.replace(r, "")
            }, t.copyObject = function (e) {
                var t = {};
                for (var i in e)t[i] = e[i];
                return t
            }, t.copyArray = function (e) {
                for (var t = [], i = 0, n = e.length; n > i; i++)e[i] && "object" == typeof e[i] ? t[i] = this.copyObject(e[i]) : t[i] = e[i];
                return t
            }, t.deepCopy = function o(e) {
                if ("object" != typeof e || !e)return e;
                var t;
                if (Array.isArray(e)) {
                    t = [];
                    for (var i = 0; i < e.length; i++)t[i] = o(e[i]);
                    return t
                }
                var n = e.constructor;
                if (n === RegExp)return e;
                t = n();
                for (var i in e)t[i] = o(e[i]);
                return t
            }, t.arrayToMap = function (e) {
                for (var t = {}, i = 0; i < e.length; i++)t[e[i]] = 1;
                return t
            }, t.createMap = function (e) {
                var t = Object.create(null);
                for (var i in e)t[i] = e[i];
                return t
            }, t.arrayRemove = function (e, t) {
                for (var i = 0; i <= e.length; i++)t === e[i] && e.splice(i, 1)
            }, t.escapeRegExp = function (e) {
                return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
            }, t.escapeHTML = function (e) {
                return e.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
            }, t.getMatchOffsets = function (e, t) {
                var i = [];
                return e.replace(t, function (e) {
                    i.push({offset: arguments[arguments.length - 2], length: e.length})
                }), i
            }, t.deferredCall = function (e) {
                var t = null, i = function () {
                    t = null, e()
                }, n = function (e) {
                    return n.cancel(), t = setTimeout(i, e || 0), n
                };
                return n.schedule = n, n.call = function () {
                    return this.cancel(), e(), n
                }, n.cancel = function () {
                    return clearTimeout(t), t = null, n
                }, n.isPending = function () {
                    return t
                }, n
            }, t.delayedCall = function (e, t) {
                var i = null, n = function () {
                    i = null, e()
                }, r = function (e) {
                    null == i && (i = setTimeout(n, e || t))
                };
                return r.delay = function (e) {
                    i && clearTimeout(i), i = setTimeout(n, e || t)
                }, r.schedule = r, r.call = function () {
                    this.cancel(), e()
                }, r.cancel = function () {
                    i && clearTimeout(i), i = null
                }, r.isPending = function () {
                    return i
                }, r
            }
        }), ace.define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang"], function (e, t, i) {
            "use strict";
            var n = e("../lib/event"), r = e("../lib/useragent"), o = e("../lib/dom"), s = e("../lib/lang"), a = r.isChrome < 18, l = r.isIE, c = function (e, t) {
                function i(e) {
                    if (!m) {
                        if (m = !0, D)t = 0, i = e ? 0 : d.value.length - 1; else var t = e ? 2 : 1, i = 2;
                        try {
                            d.setSelectionRange(t, i)
                        } catch (n) {
                        }
                        m = !1
                    }
                }

                function c() {
                    m || (d.value = u, r.isWebKit && E.schedule())
                }

                function h() {
                    clearTimeout(W), W = setTimeout(function () {
                        g && (d.style.cssText = g, g = ""), null == t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = !0, t.renderer.$moveTextAreaToCursor())
                    }, r.isOldIE ? 200 : 0)
                }

                var d = o.createElement("textarea");
                d.className = "ace_text-input", r.isTouchPad && d.setAttribute("x-palm-disable-auto-cap", !0), d.setAttribute("wrap", "off"), d.setAttribute("autocorrect", "off"), d.setAttribute("autocapitalize", "off"), d.setAttribute("spellcheck", !1), d.style.opacity = "0", r.isOldIE && (d.style.top = "-1000px"), e.insertBefore(d, e.firstChild);
                var u = "", f = !1, p = !1, m = !1, g = "", v = !0;
                try {
                    var w = document.activeElement === d
                } catch (y) {
                }
                n.addListener(d, "blur", function (e) {
                    t.onBlur(e), w = !1
                }), n.addListener(d, "focus", function (e) {
                    w = !0, t.onFocus(e), i()
                }), this.focus = function () {
                    if (g)return d.focus();
                    var e = d.style.top;
                    d.style.position = "fixed", d.style.top = "-1000px", d.focus(), setTimeout(function () {
                        d.style.position = "", "-1000px" == d.style.top && (d.style.top = e)
                    }, 0)
                }, this.blur = function () {
                    d.blur()
                }, this.isFocused = function () {
                    return w
                };
                var A = s.delayedCall(function () {
                    w && i(v)
                }), E = s.delayedCall(function () {
                    m || (d.value = u, w && i())
                });
                r.isWebKit || t.addEventListener("changeSelection", function () {
                    t.selection.isEmpty() != v && (v = !v, A.schedule())
                }), c(), w && t.onFocus();
                var C = function (e) {
                    return 0 === e.selectionStart && e.selectionEnd === e.value.length
                };
                if (!d.setSelectionRange && d.createTextRange && (d.setSelectionRange = function (e, t) {
                        var i = this.createTextRange();
                        i.collapse(!0), i.moveStart("character", e), i.moveEnd("character", t), i.select()
                    }, C = function (e) {
                        try {
                            var t = e.ownerDocument.selection.createRange()
                        } catch (i) {
                        }
                        return t && t.parentElement() == e ? t.text == e.value : !1
                    }), r.isOldIE) {
                    var b = !1, F = function (e) {
                        if (!b) {
                            var t = d.value;
                            if (!m && t && t != u) {
                                if (e && t == u[0])return x.schedule();
                                B(t), b = !0, c(), b = !1
                            }
                        }
                    }, x = s.delayedCall(F);
                    n.addListener(d, "propertychange", F);
                    var S = {13: 1, 27: 1};
                    n.addListener(d, "keyup", function (e) {
                        return !m || d.value && !S[e.keyCode] || setTimeout(I, 0), (d.value.charCodeAt(0) || 0) < 129 ? x.call() : void(m ? N() : O())
                    }), n.addListener(d, "keydown", function (e) {
                        x.schedule(50)
                    })
                }
                var $ = function (e) {
                    f ? f = !1 : C(d) ? (t.selectAll(), i()) : D && i(t.selection.isEmpty())
                }, D = null;
                this.setInputHandler = function (e) {
                    D = e
                }, this.getInputHandler = function () {
                    return D
                };
                var k = !1, B = function (e) {
                    D && (e = D(e), D = null), p ? (i(), e && t.onPaste(e), p = !1) : e == u.charAt(0) ? k ? t.execCommand("del", {source: "ace"}) : t.execCommand("backspace", {source: "ace"}) : (e.substring(0, 2) == u ? e = e.substr(2) : e.charAt(0) == u.charAt(0) ? e = e.substr(1) : e.charAt(e.length - 1) == u.charAt(0) && (e = e.slice(0, -1)), e.charAt(e.length - 1) == u.charAt(0) && (e = e.slice(0, -1)), e && t.onTextInput(e)), k && (k = !1)
                }, _ = function (e) {
                    if (!m) {
                        var t = d.value;
                        B(t), c()
                    }
                }, L = function (e, t) {
                    var i = e.clipboardData || window.clipboardData;
                    if (i && !a) {
                        var n = l ? "Text" : "text/plain";
                        return t ? i.setData(n, t) !== !1 : i.getData(n)
                    }
                }, R = function (e, r) {
                    var o = t.getCopyText();
                    return o ? void(L(e, o) ? (r ? t.onCut() : t.onCopy(), n.preventDefault(e)) : (f = !0, d.value = o, d.select(), setTimeout(function () {
                        f = !1, c(), i(), r ? t.onCut() : t.onCopy()
                    }))) : n.preventDefault(e)
                }, T = function (e) {
                    R(e, !0)
                }, M = function (e) {
                    R(e, !1)
                }, P = function (e) {
                    var o = L(e);
                    "string" == typeof o ? (o && t.onPaste(o, e), r.isIE && setTimeout(i), n.preventDefault(e)) : (d.value = "", p = !0)
                };
                n.addCommandKeyListener(d, t.onCommandKey.bind(t)), n.addListener(d, "select", $), n.addListener(d, "input", _), n.addListener(d, "cut", T), n.addListener(d, "copy", M), n.addListener(d, "paste", P), "oncut"in d && "oncopy"in d && "onpaste"in d || n.addListener(e, "keydown", function (e) {
                    if ((!r.isMac || e.metaKey) && e.ctrlKey)switch (e.keyCode) {
                        case 67:
                            M(e);
                            break;
                        case 86:
                            P(e);
                            break;
                        case 88:
                            T(e)
                    }
                });
                var O = function (e) {
                    m || !t.onCompositionStart || t.$readOnly || (m = {}, t.onCompositionStart(), setTimeout(N, 0), t.on("mousedown", I), t.selection.isEmpty() || (t.insert(""), t.session.markUndoGroup(), t.selection.clearSelection()), t.session.markUndoGroup())
                }, N = function () {
                    if (m && t.onCompositionUpdate && !t.$readOnly) {
                        var e = d.value.replace(/\x01/g, "");
                        if (m.lastValue !== e && (t.onCompositionUpdate(e), m.lastValue && t.undo(), m.lastValue = e, m.lastValue)) {
                            var i = t.selection.getRange();
                            t.insert(m.lastValue), t.session.markUndoGroup(), m.range = t.selection.getRange(), t.selection.setRange(i), t.selection.clearSelection()
                        }
                    }
                }, I = function (e) {
                    if (t.onCompositionEnd && !t.$readOnly) {
                        var i = m;
                        m = !1;
                        var n = setTimeout(function () {
                            n = null;
                            var e = d.value.replace(/\x01/g, "");
                            m || (e == i.lastValue ? c() : !i.lastValue && e && (c(), B(e)))
                        });
                        D = function (e) {
                            return n && clearTimeout(n), e = e.replace(/\x01/g, ""), e == i.lastValue ? "" : (i.lastValue && n && t.undo(), e)
                        }, t.onCompositionEnd(), t.removeListener("mousedown", I), "compositionend" == e.type && i.range && t.selection.setRange(i.range)
                    }
                }, j = s.delayedCall(N, 50);
                n.addListener(d, "compositionstart", O), r.isGecko ? n.addListener(d, "text", function () {
                    j.schedule()
                }) : (n.addListener(d, "keyup", function () {
                    j.schedule()
                }), n.addListener(d, "keydown", function () {
                    j.schedule()
                })), n.addListener(d, "compositionend", I), this.getElement = function () {
                    return d
                }, this.setReadOnly = function (e) {
                    d.readOnly = e
                }, this.onContextMenu = function (e) {
                    k = !0, i(t.selection.isEmpty()), t._emit("nativecontextmenu", {
                        target: t,
                        domEvent: e
                    }), this.moveToMouse(e, !0)
                }, this.moveToMouse = function (e, i) {
                    if (i || !r.isOldIE) {
                        g || (g = d.style.cssText), d.style.cssText = (i ? "z-index:100000;" : "") + "height:" + d.style.height + ";" + (r.isIE ? "opacity:0.1;" : "");
                        var s = t.container.getBoundingClientRect(), a = o.computedStyle(t.container), l = s.top + (parseInt(a.borderTopWidth) || 0), c = s.left + (parseInt(s.borderLeftWidth) || 0), u = s.bottom - l - d.clientHeight - 2, f = function (e) {
                            d.style.left = e.clientX - c - 2 + "px", d.style.top = Math.min(e.clientY - l - 2, u) + "px"
                        };
                        f(e), "mousedown" == e.type && (t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = null), r.isWin && !r.isOldIE && n.capture(t.container, f, h))
                    }
                }, this.onContextMenuClose = h;
                var W, H = function (e) {
                    t.textInput.onContextMenu(e), h()
                };
                n.addListener(t.renderer.scroller, "contextmenu", H), n.addListener(d, "contextmenu", H)
            };
            t.TextInput = c
        }), ace.define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function (e, t, i) {
            "use strict";
            function n(e) {
                e.$clickSelection = null;
                var t = e.editor;
                t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e)), t.setDefaultHandler("touchmove", this.onTouchMove.bind(e));
                var i = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];
                i.forEach(function (t) {
                    e[t] = this[t]
                }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange")
            }

            function r(e, t, i, n) {
                return Math.sqrt(Math.pow(i - e, 2) + Math.pow(n - t, 2))
            }

            function o(e, t) {
                if (e.start.row == e.end.row)var i = 2 * t.column - e.start.column - e.end.column; else if (e.start.row != e.end.row - 1 || e.start.column || e.end.column)var i = 2 * t.row - e.start.row - e.end.row; else var i = t.column - 4;
                return 0 > i ? {cursor: e.start, anchor: e.end} : {cursor: e.end, anchor: e.start}
            }

            var s = (e("../lib/dom"), e("../lib/event"), e("../lib/useragent"), 0);
            (function () {
                this.onMouseDown = function (e) {
                    var t = e.inSelection(), i = e.getDocumentPosition();
                    this.mousedownEvent = e;
                    var n = this.editor, r = e.getButton();
                    if (0 !== r) {
                        var o = n.getSelectionRange(), s = o.isEmpty();
                        return n.$blockScrolling++, s && n.selection.moveToPosition(i), n.$blockScrolling--, void n.textInput.onContextMenu(e.domEvent)
                    }
                    return this.mousedownEvent.time = Date.now(), !t || n.isFocused() || (n.focus(), !this.$focusTimout || this.$clickSelection || n.inMultiSelectMode) ? (this.captureMouse(e), this.startSelect(i, e.domEvent._clicks > 1), e.preventDefault()) : (this.setState("focusWait"), void this.captureMouse(e))
                }, this.startSelect = function (e, t) {
                    e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
                    var i = this.editor;
                    i.$blockScrolling++, this.mousedownEvent.getShiftKey() ? i.selection.selectToPosition(e) : t || i.selection.moveToPosition(e), t || this.select(), i.renderer.scroller.setCapture && i.renderer.scroller.setCapture(), i.setStyle("ace_selecting"), this.setState("select"), i.$blockScrolling--
                }, this.select = function () {
                    var e, t = this.editor, i = t.renderer.screenToTextCoordinates(this.x, this.y);
                    if (t.$blockScrolling++, this.$clickSelection) {
                        var n = this.$clickSelection.comparePoint(i);
                        if (-1 == n)e = this.$clickSelection.end; else if (1 == n)e = this.$clickSelection.start; else {
                            var r = o(this.$clickSelection, i);
                            i = r.cursor, e = r.anchor
                        }
                        t.selection.setSelectionAnchor(e.row, e.column)
                    }
                    t.selection.selectToPosition(i), t.$blockScrolling--, t.renderer.scrollCursorIntoView()
                }, this.extendSelectionBy = function (e) {
                    var t, i = this.editor, n = i.renderer.screenToTextCoordinates(this.x, this.y), r = i.selection[e](n.row, n.column);
                    if (i.$blockScrolling++, this.$clickSelection) {
                        var s = this.$clickSelection.comparePoint(r.start), a = this.$clickSelection.comparePoint(r.end);
                        if (-1 == s && 0 >= a)t = this.$clickSelection.end, (r.end.row != n.row || r.end.column != n.column) && (n = r.start); else if (1 == a && s >= 0)t = this.$clickSelection.start, (r.start.row != n.row || r.start.column != n.column) && (n = r.end); else if (-1 == s && 1 == a)n = r.end, t = r.start; else {
                            var l = o(this.$clickSelection, n);
                            n = l.cursor, t = l.anchor
                        }
                        i.selection.setSelectionAnchor(t.row, t.column)
                    }
                    i.selection.selectToPosition(n), i.$blockScrolling--, i.renderer.scrollCursorIntoView()
                }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function () {
                    this.$clickSelection = null, this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture()
                }, this.focusWait = function () {
                    var e = r(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y), t = Date.now();
                    (e > s || t - this.mousedownEvent.time > this.$focusTimout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
                }, this.onDoubleClick = function (e) {
                    var t = e.getDocumentPosition(), i = this.editor, n = i.session, r = n.getBracketRange(t);
                    r ? (r.isEmpty() && (r.start.column--, r.end.column++), this.setState("select")) : (r = i.selection.getWordRange(t.row, t.column), this.setState("selectByWords")), this.$clickSelection = r, this.select()
                }, this.onTripleClick = function (e) {
                    var t = e.getDocumentPosition(), i = this.editor;
                    this.setState("selectByLines");
                    var n = i.getSelectionRange();
                    n.isMultiLine() && n.contains(t.row, t.column) ? (this.$clickSelection = i.selection.getLineRange(n.start.row), this.$clickSelection.end = i.selection.getLineRange(n.end.row).end) : this.$clickSelection = i.selection.getLineRange(t.row), this.select()
                }, this.onQuadClick = function (e) {
                    var t = this.editor;
                    t.selectAll(), this.$clickSelection = t.getSelectionRange(), this.setState("selectAll")
                }, this.onMouseWheel = function (e) {
                    if (!e.getAccelKey()) {
                        e.getShiftKey() && e.wheelY && !e.wheelX && (e.wheelX = e.wheelY, e.wheelY = 0);
                        var t = e.domEvent.timeStamp, i = t - (this.$lastScrollTime || 0), n = this.editor, r = n.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed);
                        return r || 200 > i ? (this.$lastScrollTime = t, n.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0
                    }
                }, this.onTouchMove = function (e) {
                    var t = e.domEvent.timeStamp, i = t - (this.$lastScrollTime || 0), n = this.editor, r = n.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed);
                    return r || 200 > i ? (this.$lastScrollTime = t, n.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0
                }
            }).call(n.prototype), t.DefaultHandlers = n
        }), ace.define("ace/tooltip", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"], function (e, t, i) {
            "use strict";
            function n(e) {
                this.isOpen = !1, this.$element = null, this.$parentNode = e
            }

            var r = (e("./lib/oop"), e("./lib/dom"));
            (function () {
                this.$init = function () {
                    return this.$element = r.createElement("div"), this.$element.className = "ace_tooltip", this.$element.style.display = "none", this.$parentNode.appendChild(this.$element), this.$element
                }, this.getElement = function () {
                    return this.$element || this.$init()
                }, this.setText = function (e) {
                    r.setInnerText(this.getElement(), e)
                }, this.setHtml = function (e) {
                    this.getElement().innerHTML = e
                }, this.setPosition = function (e, t) {
                    this.getElement().style.left = e + "px", this.getElement().style.top = t + "px"
                }, this.setClassName = function (e) {
                    r.addCssClass(this.getElement(), e)
                }, this.show = function (e, t, i) {
                    null != e && this.setText(e), null != t && null != i && this.setPosition(t, i), this.isOpen || (this.getElement().style.display = "block", this.isOpen = !0)
                }, this.hide = function () {
                    this.isOpen && (this.getElement().style.display = "none", this.isOpen = !1)
                }, this.getHeight = function () {
                    return this.getElement().offsetHeight
                }, this.getWidth = function () {
                    return this.getElement().offsetWidth
                }
            }).call(n.prototype), t.Tooltip = n
        }), ace.define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event", "ace/tooltip"], function (e, t, i) {
            "use strict";
            function n(e) {
                function t() {
                    var t = d.getDocumentPosition().row, r = l.$annotations[t];
                    if (!r)return i();
                    var o = s.session.getLength();
                    if (t == o) {
                        var a = s.renderer.pixelToScreenCoordinates(0, d.y).row, h = d.$pos;
                        if (a > s.session.documentToScreenRow(h.row, h.column))return i()
                    }
                    if (u != r)if (u = r.text.join("<br/>"), c.setHtml(u), c.show(), s.on("mousewheel", i), e.$tooltipFollowsMouse)n(d); else {
                        var f = d.domEvent.target, p = f.getBoundingClientRect(), m = c.getElement().style;
                        m.left = p.right + "px", m.top = p.bottom + "px"
                    }
                }

                function i() {
                    h && (h = clearTimeout(h)), u && (c.hide(), u = null, s.removeEventListener("mousewheel", i))
                }

                function n(e) {
                    c.setPosition(e.x, e.y)
                }

                var s = e.editor, l = s.renderer.$gutterLayer, c = new r(s.container);
                e.editor.setDefaultHandler("guttermousedown", function (t) {
                    if (s.isFocused() && 0 == t.getButton()) {
                        var i = l.getRegion(t);
                        if ("foldWidgets" != i) {
                            var n = t.getDocumentPosition().row, r = s.session.selection;
                            if (t.getShiftKey())r.selectTo(n, 0); else {
                                if (2 == t.domEvent.detail)return s.selectAll(), t.preventDefault();
                                e.$clickSelection = s.selection.getLineRange(n)
                            }
                            return e.setState("selectByLines"), e.captureMouse(t), t.preventDefault()
                        }
                    }
                });
                var h, d, u;
                e.editor.setDefaultHandler("guttermousemove", function (r) {
                    var s = r.domEvent.target || r.domEvent.srcElement;
                    return o.hasCssClass(s, "ace_fold-widget") ? i() : (u && e.$tooltipFollowsMouse && n(r), d = r, void(h || (h = setTimeout(function () {
                        h = null, d && !e.isMousePressed ? t() : i()
                    }, 50))))
                }), a.addListener(s.renderer.$gutter, "mouseout", function (e) {
                    d = null, u && !h && (h = setTimeout(function () {
                        h = null, i()
                    }, 50))
                }), s.on("changeSession", i)
            }

            function r(e) {
                l.call(this, e)
            }

            var o = e("../lib/dom"), s = e("../lib/oop"), a = e("../lib/event"), l = e("../tooltip").Tooltip;
            s.inherits(r, l), function () {
                this.setPosition = function (e, t) {
                    var i = window.innerWidth || document.documentElement.clientWidth, n = window.innerHeight || document.documentElement.clientHeight, r = this.getWidth(), o = this.getHeight();
                    e += 15, t += 15, e + r > i && (e -= e + r - i), t + o > n && (t -= 20 + o), l.prototype.setPosition.call(this, e, t)
                }
            }.call(r.prototype), t.GutterHandler = n
        }), ace.define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (e, t, i) {
            "use strict";
            var n = e("../lib/event"), r = e("../lib/useragent"), o = t.MouseEvent = function (e, t) {
                this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
            };
            (function () {
                this.stopPropagation = function () {
                    n.stopPropagation(this.domEvent), this.propagationStopped = !0
                }, this.preventDefault = function () {
                    n.preventDefault(this.domEvent), this.defaultPrevented = !0
                }, this.stop = function () {
                    this.stopPropagation(), this.preventDefault()
                }, this.getDocumentPosition = function () {
                    return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
                }, this.inSelection = function () {
                    if (null !== this.$inSelection)return this.$inSelection;
                    var e = this.editor, t = e.getSelectionRange();
                    if (t.isEmpty())this.$inSelection = !1; else {
                        var i = this.getDocumentPosition();
                        this.$inSelection = t.contains(i.row, i.column)
                    }
                    return this.$inSelection
                }, this.getButton = function () {
                    return n.getButton(this.domEvent)
                }, this.getShiftKey = function () {
                    return this.domEvent.shiftKey
                }, this.getAccelKey = r.isMac ? function () {
                    return this.domEvent.metaKey
                } : function () {
                    return this.domEvent.ctrlKey
                }
            }).call(o.prototype)
        }), ace.define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function (e, t, i) {
            "use strict";
            function n(e) {
                function t(e, t) {
                    var i = Date.now(), n = !t || e.row != t.row, o = !t || e.column != t.column;
                    if (!D || n || o)g.$blockScrolling += 1, g.moveCursorToPosition(e), g.$blockScrolling -= 1, D = i, k = {
                        x: A,
                        y: E
                    }; else {
                        var s = r(k.x, k.y, A, E);
                        s > h ? D = null : i - D >= c && (g.renderer.scrollCursorIntoView(), D = null)
                    }
                }

                function i(e, t) {
                    var i = Date.now(), n = g.renderer.layerConfig.lineHeight, r = g.renderer.layerConfig.characterWidth, o = g.renderer.scroller.getBoundingClientRect(), s = {
                        x: {
                            left: A - o.left,
                            right: o.right - A
                        }, y: {top: E - o.top, bottom: o.bottom - E}
                    }, a = Math.min(s.x.left, s.x.right), c = Math.min(s.y.top, s.y.bottom), h = {
                        row: e.row,
                        column: e.column
                    };
                    2 >= a / r && (h.column += s.x.left < s.x.right ? -3 : 2), 1 >= c / n && (h.row += s.y.top < s.y.bottom ? -1 : 1);
                    var d = e.row != h.row, u = e.column != h.column, f = !t || e.row != t.row;
                    d || u && !f ? $ ? i - $ >= l && g.renderer.scrollCursorIntoView(h) : $ = i : $ = null
                }

                function n() {
                    var e = F;
                    F = g.renderer.screenToTextCoordinates(A, E), t(F, e), i(F, e)
                }

                function d() {
                    b = g.selection.toOrientedRange(), y = g.session.addMarker(b, "ace_selection", g.getSelectionStyle()), g.clearSelection(), g.isFocused() && g.renderer.$cursorLayer.setBlinking(!1), clearInterval(C), n(), C = setInterval(n, 20), _ = 0, s.addListener(document, "mousemove", f)
                }

                function u() {
                    clearInterval(C), g.session.removeMarker(y), y = null, g.$blockScrolling += 1, g.selection.fromOrientedRange(b), g.$blockScrolling -= 1, g.isFocused() && !S && g.renderer.$cursorLayer.setBlinking(!g.getReadOnly()), b = null, F = null, _ = 0, $ = null, D = null, s.removeListener(document, "mousemove", f)
                }

                function f() {
                    null == L && (L = setTimeout(function () {
                        null != L && y && u()
                    }, 20))
                }

                function p(e) {
                    var t = e.types;
                    return !t || Array.prototype.some.call(t, function (e) {
                            return "text/plain" == e || "Text" == e
                        })
                }

                function m(e) {
                    var t = ["copy", "copymove", "all", "uninitialized"], i = ["move", "copymove", "linkmove", "all", "uninitialized"], n = a.isMac ? e.altKey : e.ctrlKey, r = "uninitialized";
                    try {
                        r = e.dataTransfer.effectAllowed.toLowerCase()
                    } catch (e) {
                    }
                    var o = "none";
                    return n && t.indexOf(r) >= 0 ? o = "copy" : i.indexOf(r) >= 0 ? o = "move" : t.indexOf(r) >= 0 && (o = "copy"), o
                }

                var g = e.editor, v = o.createElement("img");
                v.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", a.isOpera && (v.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");
                var w = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];
                w.forEach(function (t) {
                    e[t] = this[t]
                }, this), g.addEventListener("mousedown", this.onMouseDown.bind(e));
                var y, A, E, C, b, F, x, S, $, D, k, B = g.container, _ = 0;
                this.onDragStart = function (e) {
                    if (this.cancelDrag || !B.draggable) {
                        var t = this;
                        return setTimeout(function () {
                            t.startSelect(), t.captureMouse(e)
                        }, 0), e.preventDefault()
                    }
                    b = g.getSelectionRange();
                    var i = e.dataTransfer;
                    i.effectAllowed = g.getReadOnly() ? "copy" : "copyMove", a.isOpera && (g.container.appendChild(v), v.scrollTop = 0), i.setDragImage && i.setDragImage(v, 0, 0), a.isOpera && g.container.removeChild(v), i.clearData(), i.setData("Text", g.session.getTextRange()), S = !0, this.setState("drag")
                }, this.onDragEnd = function (e) {
                    if (B.draggable = !1, S = !1, this.setState(null), !g.getReadOnly()) {
                        var t = e.dataTransfer.dropEffect;
                        x || "move" != t || g.session.remove(g.getSelectionRange()), g.renderer.$cursorLayer.setBlinking(!0)
                    }
                    this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle("")
                }, this.onDragEnter = function (e) {
                    return !g.getReadOnly() && p(e.dataTransfer) ? (A = e.clientX, E = e.clientY, y || d(), _++, e.dataTransfer.dropEffect = x = m(e), s.preventDefault(e)) : void 0
                }, this.onDragOver = function (e) {
                    return !g.getReadOnly() && p(e.dataTransfer) ? (A = e.clientX, E = e.clientY, y || (d(), _++), null !== L && (L = null), e.dataTransfer.dropEffect = x = m(e), s.preventDefault(e)) : void 0
                }, this.onDragLeave = function (e) {
                    return _--, 0 >= _ && y ? (u(), x = null, s.preventDefault(e)) : void 0
                }, this.onDrop = function (e) {
                    if (F) {
                        var t = e.dataTransfer;
                        if (S)switch (x) {
                            case"move":
                                b = b.contains(F.row, F.column) ? {start: F, end: F} : g.moveText(b, F);
                                break;
                            case"copy":
                                b = g.moveText(b, F, !0)
                        } else {
                            var i = t.getData("Text");
                            b = {start: F, end: g.session.insert(F, i)}, g.focus(), x = null
                        }
                        return u(), s.preventDefault(e)
                    }
                }, s.addListener(B, "dragstart", this.onDragStart.bind(e)), s.addListener(B, "dragend", this.onDragEnd.bind(e)), s.addListener(B, "dragenter", this.onDragEnter.bind(e)), s.addListener(B, "dragover", this.onDragOver.bind(e)), s.addListener(B, "dragleave", this.onDragLeave.bind(e)), s.addListener(B, "drop", this.onDrop.bind(e));
                var L = null
            }

            function r(e, t, i, n) {
                return Math.sqrt(Math.pow(i - e, 2) + Math.pow(n - t, 2))
            }

            var o = e("../lib/dom"), s = e("../lib/event"), a = e("../lib/useragent"), l = 200, c = 200, h = 5;
            (function () {
                this.dragWait = function () {
                    var e = Date.now() - this.mousedownEvent.time;
                    e > this.editor.getDragDelay() && this.startDrag()
                }, this.dragWaitEnd = function () {
                    var e = this.editor.container;
                    e.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd()
                }, this.dragReadyEnd = function (e) {
                    this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly()), this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle(""), this.dragWaitEnd()
                }, this.startDrag = function () {
                    this.cancelDrag = !1;
                    var e = this.editor, t = e.container;
                    t.draggable = !0, e.renderer.$cursorLayer.setBlinking(!1), e.setStyle("ace_dragging");
                    var i = a.isWin ? "default" : "move";
                    e.renderer.setCursorStyle(i), this.setState("dragReady")
                }, this.onMouseDrag = function (e) {
                    var t = this.editor.container;
                    if (a.isIE && "dragReady" == this.state) {
                        var i = r(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                        i > 3 && t.dragDrop()
                    }
                    if ("dragWait" === this.state) {
                        var i = r(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                        i > 0 && (t.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()))
                    }
                }, this.onMouseDown = function (e) {
                    if (this.$dragEnabled) {
                        this.mousedownEvent = e;
                        var t = this.editor, i = e.inSelection(), n = e.getButton(), r = e.domEvent.detail || 1;
                        if (1 === r && 0 === n && i) {
                            if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey()))return;
                            this.mousedownEvent.time = Date.now();
                            var o = e.domEvent.target || e.domEvent.srcElement;
                            if ("unselectable"in o && (o.unselectable = "on"), t.getDragDelay()) {
                                if (a.isWebKit) {
                                    this.cancelDrag = !0;
                                    var s = t.container;
                                    s.draggable = !0
                                }
                                this.setState("dragWait")
                            } else this.startDrag();
                            this.captureMouse(e, this.onMouseDrag.bind(this)), e.defaultPrevented = !0
                        }
                    }
                }
            }).call(n.prototype), t.DragdropHandler = n
        }), ace.define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function (e, t, i) {
            "use strict";
            var n = e("./dom");
            t.get = function (e, t) {
                var i = new XMLHttpRequest;
                i.open("GET", e, !0), i.onreadystatechange = function () {
                    4 === i.readyState && t(i.responseText)
                }, i.send(null)
            }, t.loadScript = function (e, t) {
                var i = n.getDocumentHead(), r = document.createElement("script");
                r.src = e, i.appendChild(r), r.onload = r.onreadystatechange = function (e, i) {
                    (i || !r.readyState || "loaded" == r.readyState || "complete" == r.readyState) && (r = r.onload = r.onreadystatechange = null, i || t())
                }
            }, t.qualifyURL = function (e) {
                var t = document.createElement("a");
                return t.href = e, t.href
            }
        }), ace.define("ace/lib/event_emitter", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            var n = {}, r = function () {
                this.propagationStopped = !0
            }, o = function () {
                this.defaultPrevented = !0
            };
            n._emit = n._dispatchEvent = function (e, t) {
                this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
                var i = this._eventRegistry[e] || [], n = this._defaultHandlers[e];
                if (i.length || n) {
                    "object" == typeof t && t || (t = {}), t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = r), t.preventDefault || (t.preventDefault = o), i = i.slice();
                    for (var s = 0; s < i.length && (i[s](t, this), !t.propagationStopped); s++);
                    return n && !t.defaultPrevented ? n(t, this) : void 0
                }
            }, n._signal = function (e, t) {
                var i = (this._eventRegistry || {})[e];
                if (i) {
                    i = i.slice();
                    for (var n = 0; n < i.length; n++)i[n](t, this)
                }
            }, n.once = function (e, t) {
                var i = this;
                t && this.addEventListener(e, function n() {
                    i.removeEventListener(e, n), t.apply(null, arguments)
                })
            }, n.setDefaultHandler = function (e, t) {
                var i = this._defaultHandlers;
                if (i || (i = this._defaultHandlers = {_disabled_: {}}), i[e]) {
                    var n = i[e], r = i._disabled_[e];
                    r || (i._disabled_[e] = r = []), r.push(n);
                    var o = r.indexOf(t);
                    -1 != o && r.splice(o, 1)
                }
                i[e] = t
            }, n.removeDefaultHandler = function (e, t) {
                var i = this._defaultHandlers;
                if (i) {
                    var n = i._disabled_[e];
                    if (i[e] == t) {
                        i[e];
                        n && this.setDefaultHandler(e, n.pop())
                    } else if (n) {
                        var r = n.indexOf(t);
                        -1 != r && n.splice(r, 1)
                    }
                }
            }, n.on = n.addEventListener = function (e, t, i) {
                this._eventRegistry = this._eventRegistry || {};
                var n = this._eventRegistry[e];
                return n || (n = this._eventRegistry[e] = []), -1 == n.indexOf(t) && n[i ? "unshift" : "push"](t), t
            }, n.off = n.removeListener = n.removeEventListener = function (e, t) {
                this._eventRegistry = this._eventRegistry || {};
                var i = this._eventRegistry[e];
                if (i) {
                    var n = i.indexOf(t);
                    -1 !== n && i.splice(n, 1)
                }
            }, n.removeAllListeners = function (e) {
                this._eventRegistry && (this._eventRegistry[e] = [])
            }, t.EventEmitter = n
        }), ace.define("ace/lib/app_config", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, i) {
            "no use strict";
            function n(e) {
                "undefined" != typeof console && console.warn && console.warn.apply(console, arguments)
            }

            function r(e, t) {
                var i = new Error(e);
                i.data = t, "object" == typeof console && console.error && console.error(i), setTimeout(function () {
                    throw i
                })
            }

            var o = e("./oop"), s = e("./event_emitter").EventEmitter, a = {
                setOptions: function (e) {
                    Object.keys(e).forEach(function (t) {
                        this.setOption(t, e[t])
                    }, this)
                }, getOptions: function (e) {
                    var t = {};
                    return e ? Array.isArray(e) || (t = e, e = Object.keys(t)) : e = Object.keys(this.$options), e.forEach(function (e) {
                        t[e] = this.getOption(e)
                    }, this), t
                }, setOption: function (e, t) {
                    if (this["$" + e] !== t) {
                        var i = this.$options[e];
                        if (!i)return n('misspelled option "' + e + '"');
                        if (i.forwardTo)return this[i.forwardTo] && this[i.forwardTo].setOption(e, t);
                        i.handlesSet || (this["$" + e] = t), i && i.set && i.set.call(this, t)
                    }
                }, getOption: function (e) {
                    var t = this.$options[e];
                    return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : n('misspelled option "' + e + '"')
                }
            }, l = function () {
                this.$defaultOptions = {}
            };
            (function () {
                o.implement(this, s), this.defineOptions = function (e, t, i) {
                    return e.$options || (this.$defaultOptions[t] = e.$options = {}), Object.keys(i).forEach(function (t) {
                        var n = i[t];
                        "string" == typeof n && (n = {forwardTo: n}), n.name || (n.name = t), e.$options[n.name] = n, "initialValue"in n && (e["$" + n.name] = n.initialValue)
                    }), o.implement(e, a), this
                }, this.resetOptions = function (e) {
                    Object.keys(e.$options).forEach(function (t) {
                        var i = e.$options[t];
                        "value"in i && e.setOption(t, i.value)
                    })
                }, this.setDefaultValue = function (e, t, i) {
                    var n = this.$defaultOptions[e] || (this.$defaultOptions[e] = {});
                    n[t] && (n.forwardTo ? this.setDefaultValue(n.forwardTo, t, i) : n[t].value = i)
                }, this.setDefaultValues = function (e, t) {
                    Object.keys(t).forEach(function (i) {
                        this.setDefaultValue(e, i, t[i])
                    }, this)
                }, this.warn = n, this.reportError = r
            }).call(l.prototype), t.AppConfig = l
        }), ace.define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/app_config"], function (e, t, n) {
            "no use strict";
            function r(r) {
                if (h.packaged = r || e.packaged || n.packaged || c.define && i(58).packaged, !c.document)return "";
                for (var s = {}, a = "", l = document.currentScript || document._currentScript, d = l && l.ownerDocument || document, u = d.getElementsByTagName("script"), f = 0; f < u.length; f++) {
                    var p = u[f], m = p.src || p.getAttribute("src");
                    if (m) {
                        for (var g = p.attributes, v = 0, w = g.length; w > v; v++) {
                            var y = g[v];
                            0 === y.name.indexOf("data-ace-") && (s[o(y.name.replace(/^data-ace-/, ""))] = y.value)
                        }
                        var A = m.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
                        A && (a = A[1])
                    }
                }
                a && (s.base = s.base || a, s.packaged = !0), s.basePath = s.base, s.workerPath = s.workerPath || s.base, s.modePath = s.modePath || s.base, s.themePath = s.themePath || s.base, delete s.base;
                for (var E in s)"undefined" != typeof s[E] && t.set(E, s[E])
            }

            function o(e) {
                return e.replace(/-(.)/g, function (e, t) {
                    return t.toUpperCase()
                })
            }

            var s = e("./lib/lang"), a = (e("./lib/oop"), e("./lib/net")), l = e("./lib/app_config").AppConfig;
            n.exports = t = new l;
            var c = function () {
                return this || "undefined" != typeof window && window
            }(), h = {
                packaged: !1,
                workerPath: null,
                modePath: null,
                themePath: null,
                basePath: "",
                suffix: ".js",
                $moduleUrls: {}
            };
            t.get = function (e) {
                if (!h.hasOwnProperty(e))throw new Error("Unknown config key: " + e);
                return h[e]
            }, t.set = function (e, t) {
                if (!h.hasOwnProperty(e))throw new Error("Unknown config key: " + e);
                h[e] = t
            }, t.all = function () {
                return s.copyObject(h)
            }, t.moduleUrl = function (e, t) {
                if (h.$moduleUrls[e])return h.$moduleUrls[e];
                var i = e.split("/");
                t = t || i[i.length - 2] || "";
                var n = "snippets" == t ? "/" : "-", r = i[i.length - 1];
                if ("worker" == t && "-" == n) {
                    var o = new RegExp("^" + t + "[\\-_]|[\\-_]" + t + "$", "g");
                    r = r.replace(o, "")
                }
                (!r || r == t) && i.length > 1 && (r = i[i.length - 2]);
                var s = h[t + "Path"];
                return null == s ? s = h.basePath : "/" == n && (t = n = ""), s && "/" != s.slice(-1) && (s += "/"), s + t + n + r + this.get("suffix")
            }, t.setModuleUrl = function (e, t) {
                return h.$moduleUrls[e] = t
            }, t.$loading = {}, t.loadModule = function (i, n) {
                var r, o;
                Array.isArray(i) && (o = i[0], i = i[1]);
                try {
                    r = e(i)
                } catch (s) {
                }
                if (r && !t.$loading[i])return n && n(r);
                if (t.$loading[i] || (t.$loading[i] = []), t.$loading[i].push(n), !(t.$loading[i].length > 1)) {
                    var l = function () {
                        e([i], function (e) {
                            t._emit("load.module", {name: i, module: e});
                            var n = t.$loading[i];
                            t.$loading[i] = null, n.forEach(function (t) {
                                t && t(e)
                            })
                        })
                    };
                    return t.get("packaged") ? void a.loadScript(t.moduleUrl(i, o), l) : l()
                }
            }, r(!0), t.init = r
        }), ace.define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/config"], function (e, t, i) {
            "use strict";
            var n = e("../lib/event"), r = e("../lib/useragent"), o = e("./default_handlers").DefaultHandlers, s = e("./default_gutter_handler").GutterHandler, a = e("./mouse_event").MouseEvent, l = e("./dragdrop_handler").DragdropHandler, c = e("../config"), h = function (e) {
                var t = this;
                this.editor = e, new o(this), new s(this), new l(this);
                var i = function (t) {
                    document.hasFocus && document.hasFocus() || window.focus(), e.focus(), e.isFocused() || window.focus()
                }, a = e.renderer.getMouseEventTarget();
                n.addListener(a, "click", this.onMouseEvent.bind(this, "click")), n.addListener(a, "mousemove", this.onMouseMove.bind(this, "mousemove")), n.addMultiMouseDownListener(a, [400, 300, 250], this, "onMouseEvent"), e.renderer.scrollBarV && (n.addMultiMouseDownListener(e.renderer.scrollBarV.inner, [400, 300, 250], this, "onMouseEvent"), n.addMultiMouseDownListener(e.renderer.scrollBarH.inner, [400, 300, 250], this, "onMouseEvent"), r.isIE && (n.addListener(e.renderer.scrollBarV.element, "mousedown", i), n.addListener(e.renderer.scrollBarH.element, "mousedown", i))), n.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel")), n.addTouchMoveListener(e.container, this.onTouchMove.bind(this, "touchmove"));
                var c = e.renderer.$gutter;
                n.addListener(c, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), n.addListener(c, "click", this.onMouseEvent.bind(this, "gutterclick")), n.addListener(c, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), n.addListener(c, "mousemove", this.onMouseEvent.bind(this, "guttermousemove")), n.addListener(a, "mousedown", i), n.addListener(c, "mousedown", function (t) {
                    return e.focus(), n.preventDefault(t)
                }), e.on("mousemove", function (i) {
                    if (!t.state && !t.$dragDelay && t.$dragEnabled) {
                        var n = e.renderer.screenToTextCoordinates(i.x, i.y), r = e.session.selection.getRange(), o = e.renderer;
                        !r.isEmpty() && r.insideStart(n.row, n.column) ? o.setCursorStyle("default") : o.setCursorStyle("")
                    }
                })
            };
            (function () {
                this.onMouseEvent = function (e, t) {
                    this.editor._emit(e, new a(t, this.editor))
                }, this.onMouseMove = function (e, t) {
                    var i = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
                    i && i.length && this.editor._emit(e, new a(t, this.editor))
                }, this.onMouseWheel = function (e, t) {
                    var i = new a(t, this.editor);
                    i.speed = 2 * this.$scrollSpeed, i.wheelX = t.wheelX, i.wheelY = t.wheelY, this.editor._emit(e, i)
                }, this.onTouchMove = function (e, t) {
                    var i = new a(t, this.editor);
                    i.speed = 1, i.wheelX = t.wheelX, i.wheelY = t.wheelY, this.editor._emit(e, i)
                }, this.setState = function (e) {
                    this.state = e
                }, this.captureMouse = function (e, t) {
                    this.x = e.x, this.y = e.y, this.isMousePressed = !0;
                    var i = this.editor.renderer;
                    i.$keepTextAreaAtCursor && (i.$keepTextAreaAtCursor = null);
                    var o = this, s = function (e) {
                        if (e) {
                            if (r.isWebKit && !e.which && o.releaseMouse)return o.releaseMouse();
                            o.x = e.clientX, o.y = e.clientY, t && t(e), o.mouseEvent = new a(e, o.editor), o.$mouseMoved = !0
                        }
                    }, l = function (e) {
                        clearInterval(h), c(), o[o.state + "End"] && o[o.state + "End"](e), o.state = "", null == i.$keepTextAreaAtCursor && (i.$keepTextAreaAtCursor = !0, i.$moveTextAreaToCursor()), o.isMousePressed = !1, o.$onCaptureMouseMove = o.releaseMouse = null, e && o.onMouseEvent("mouseup", e)
                    }, c = function () {
                        o[o.state] && o[o.state](), o.$mouseMoved = !1
                    };
                    if (r.isOldIE && "dblclick" == e.domEvent.type)return setTimeout(function () {
                        l(e)
                    });
                    o.$onCaptureMouseMove = s, o.releaseMouse = n.capture(this.editor.container, s, l);
                    var h = setInterval(c, 20)
                }, this.releaseMouse = null, this.cancelContextMenu = function () {
                    var e = function (t) {
                        t && t.domEvent && "contextmenu" != t.domEvent.type || (this.editor.off("nativecontextmenu", e), t && t.domEvent && n.stopEvent(t.domEvent))
                    }.bind(this);
                    setTimeout(e, 10), this.editor.on("nativecontextmenu", e)
                }
            }).call(h.prototype), c.defineOptions(h.prototype, "mouseHandler", {
                scrollSpeed: {initialValue: 2},
                dragDelay: {initialValue: r.isMac ? 150 : 0},
                dragEnabled: {initialValue: !0},
                focusTimout: {initialValue: 0},
                tooltipFollowsMouse: {initialValue: !0}
            }), t.MouseHandler = h
        }), ace.define("ace/mouse/fold_handler", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            function n(e) {
                e.on("click", function (t) {
                    var i = t.getDocumentPosition(), n = e.session, r = n.getFoldAt(i.row, i.column, 1);
                    r && (t.getAccelKey() ? n.removeFold(r) : n.expandFold(r), t.stop())
                }), e.on("gutterclick", function (t) {
                    var i = e.renderer.$gutterLayer.getRegion(t);
                    if ("foldWidgets" == i) {
                        var n = t.getDocumentPosition().row, r = e.session;
                        r.foldWidgets && r.foldWidgets[n] && e.session.onFoldWidgetClick(n, t), e.isFocused() || e.focus(), t.stop()
                    }
                }), e.on("gutterdblclick", function (t) {
                    var i = e.renderer.$gutterLayer.getRegion(t);
                    if ("foldWidgets" == i) {
                        var n = t.getDocumentPosition().row, r = e.session, o = r.getParentFoldRangeData(n, !0), s = o.range || o.firstRange;
                        if (s) {
                            n = s.start.row;
                            var a = r.getFoldAt(n, r.getLine(n).length, 1);
                            a ? r.removeFold(a) : (r.addFold("...", s), e.renderer.scrollCursorIntoView({
                                row: s.start.row,
                                column: 0
                            }))
                        }
                        t.stop()
                    }
                })
            }

            t.FoldHandler = n
        }), ace.define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function (e, t, i) {
            "use strict";
            var n = e("../lib/keys"), r = e("../lib/event"), o = function (e) {
                this.$editor = e, this.$data = {editor: e}, this.$handlers = [], this.setDefaultHandler(e.commands)
            };
            (function () {
                this.setDefaultHandler = function (e) {
                    this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0)
                }, this.setKeyboardHandler = function (e) {
                    var t = this.$handlers;
                    if (t[t.length - 1] != e) {
                        for (; t[t.length - 1] && t[t.length - 1] != this.$defaultHandler;)this.removeKeyboardHandler(t[t.length - 1]);
                        this.addKeyboardHandler(e, 1)
                    }
                }, this.addKeyboardHandler = function (e, t) {
                    if (e) {
                        "function" != typeof e || e.handleKeyboard || (e.handleKeyboard = e);
                        var i = this.$handlers.indexOf(e);
                        -1 != i && this.$handlers.splice(i, 1), void 0 == t ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), -1 == i && e.attach && e.attach(this.$editor)
                    }
                }, this.removeKeyboardHandler = function (e) {
                    var t = this.$handlers.indexOf(e);
                    return -1 == t ? !1 : (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0)
                }, this.getKeyboardHandler = function () {
                    return this.$handlers[this.$handlers.length - 1]
                }, this.getStatusText = function () {
                    var e = this.$data, t = e.editor;
                    return this.$handlers.map(function (i) {
                        return i.getStatusText && i.getStatusText(t, e) || ""
                    }).filter(Boolean).join(" ")
                }, this.$callKeyboardHandlers = function (e, t, i, n) {
                    for (var o, s = !1, a = this.$editor.commands, l = this.$handlers.length; l-- && (o = this.$handlers[l].handleKeyboard(this.$data, e, t, i, n), !(o && o.command && (s = "null" == o.command ? !0 : a.exec(o.command, this.$editor, o.args, n), s && n && -1 != e && 1 != o.passEvent && 1 != o.command.passEvent && r.stopEvent(n), s))););
                    return s || -1 != e || (o = {command: "insertstring"}, s = a.exec("insertstring", this.$editor, t)), s && this.$editor._signal("keyboardActivity", o), s
                }, this.onCommandKey = function (e, t, i) {
                    var r = n.keyCodeToString(i);
                    this.$callKeyboardHandlers(t, r, i, e)
                }, this.onTextInput = function (e) {
                    this.$callKeyboardHandlers(-1, e)
                }
            }).call(o.prototype), t.KeyBinding = o
        }), ace.define("ace/range", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            var n = function (e, t) {
                return e.row - t.row || e.column - t.column
            }, r = function (e, t, i, n) {
                this.start = {row: e, column: t}, this.end = {row: i, column: n}
            };
            (function () {
                this.isEqual = function (e) {
                    return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column
                }, this.toString = function () {
                    return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
                }, this.contains = function (e, t) {
                    return 0 == this.compare(e, t)
                }, this.compareRange = function (e) {
                    var t, i = e.end, n = e.start;
                    return t = this.compare(i.row, i.column), 1 == t ? (t = this.compare(n.row, n.column), 1 == t ? 2 : 0 == t ? 1 : 0) : -1 == t ? -2 : (t = this.compare(n.row, n.column), -1 == t ? -1 : 1 == t ? 42 : 0)
                }, this.comparePoint = function (e) {
                    return this.compare(e.row, e.column)
                }, this.containsRange = function (e) {
                    return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end)
                }, this.intersects = function (e) {
                    var t = this.compareRange(e);
                    return -1 == t || 0 == t || 1 == t
                }, this.isEnd = function (e, t) {
                    return this.end.row == e && this.end.column == t
                }, this.isStart = function (e, t) {
                    return this.start.row == e && this.start.column == t
                }, this.setStart = function (e, t) {
                    "object" == typeof e ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t)
                }, this.setEnd = function (e, t) {
                    "object" == typeof e ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t)
                }, this.inside = function (e, t) {
                    return 0 == this.compare(e, t) ? this.isEnd(e, t) || this.isStart(e, t) ? !1 : !0 : !1
                }, this.insideStart = function (e, t) {
                    return 0 == this.compare(e, t) ? this.isEnd(e, t) ? !1 : !0 : !1
                }, this.insideEnd = function (e, t) {
                    return 0 == this.compare(e, t) ? this.isStart(e, t) ? !1 : !0 : !1
                }, this.compare = function (e, t) {
                    return this.isMultiLine() || e !== this.start.row ? e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0 : t < this.start.column ? -1 : t > this.end.column ? 1 : 0
                }, this.compareStart = function (e, t) {
                    return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
                }, this.compareEnd = function (e, t) {
                    return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t)
                }, this.compareInside = function (e, t) {
                    return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
                }, this.clipRows = function (e, t) {
                    if (this.end.row > t)var i = {row: t + 1, column: 0}; else if (this.end.row < e)var i = {
                        row: e,
                        column: 0
                    };
                    if (this.start.row > t)var n = {row: t + 1, column: 0}; else if (this.start.row < e)var n = {
                        row: e,
                        column: 0
                    };
                    return r.fromPoints(n || this.start, i || this.end)
                }, this.extend = function (e, t) {
                    var i = this.compare(e, t);
                    if (0 == i)return this;
                    if (-1 == i)var n = {row: e, column: t}; else var o = {row: e, column: t};
                    return r.fromPoints(n || this.start, o || this.end)
                }, this.isEmpty = function () {
                    return this.start.row === this.end.row && this.start.column === this.end.column
                }, this.isMultiLine = function () {
                    return this.start.row !== this.end.row
                }, this.clone = function () {
                    return r.fromPoints(this.start, this.end)
                }, this.collapseRows = function () {
                    return 0 == this.end.column ? new r(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new r(this.start.row, 0, this.end.row, 0)
                }, this.toScreenRange = function (e) {
                    var t = e.documentToScreenPosition(this.start), i = e.documentToScreenPosition(this.end);
                    return new r(t.row, t.column, i.row, i.column)
                }, this.moveBy = function (e, t) {
                    this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t
                }
            }).call(r.prototype), r.fromPoints = function (e, t) {
                return new r(e.row, e.column, t.row, t.column)
            }, r.comparePoints = n, r.comparePoints = function (e, t) {
                return e.row - t.row || e.column - t.column
            }, t.Range = r
        }), ace.define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function (e, t, i) {
            "use strict";
            var n = e("./lib/oop"), r = e("./lib/lang"), o = e("./lib/event_emitter").EventEmitter, s = e("./range").Range, a = function (e) {
                this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
                var t = this;
                this.lead.on("change", function (e) {
                    t._emit("changeCursor"), t.$isEmpty || t._emit("changeSelection"), t.$keepDesiredColumnOnChange || e.old.column == e.value.column || (t.$desiredColumn = null)
                }), this.selectionAnchor.on("change", function () {
                    t.$isEmpty || t._emit("changeSelection")
                })
            };
            (function () {
                n.implement(this, o), this.isEmpty = function () {
                    return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
                }, this.isMultiLine = function () {
                    return this.isEmpty() ? !1 : this.getRange().isMultiLine()
                }, this.getCursor = function () {
                    return this.lead.getPosition()
                }, this.setSelectionAnchor = function (e, t) {
                    this.anchor.setPosition(e, t), this.$isEmpty && (this.$isEmpty = !1, this._emit("changeSelection"))
                }, this.getSelectionAnchor = function () {
                    return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
                }, this.getSelectionLead = function () {
                    return this.lead.getPosition()
                }, this.shiftSelection = function (e) {
                    if (this.$isEmpty)return void this.moveCursorTo(this.lead.row, this.lead.column + e);
                    var t = this.getSelectionAnchor(), i = this.getSelectionLead(), n = this.isBackwards();
                    n && 0 === t.column || this.setSelectionAnchor(t.row, t.column + e), (n || 0 !== i.column) && this.$moveSelection(function () {
                        this.moveCursorTo(i.row, i.column + e)
                    })
                }, this.isBackwards = function () {
                    var e = this.anchor, t = this.lead;
                    return e.row > t.row || e.row == t.row && e.column > t.column
                }, this.getRange = function () {
                    var e = this.anchor, t = this.lead;
                    return this.isEmpty() ? s.fromPoints(t, t) : this.isBackwards() ? s.fromPoints(t, e) : s.fromPoints(e, t)
                }, this.clearSelection = function () {
                    this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
                }, this.selectAll = function () {
                    var e = this.doc.getLength() - 1;
                    this.setSelectionAnchor(0, 0), this.moveCursorTo(e, this.doc.getLine(e).length)
                }, this.setRange = this.setSelectionRange = function (e, t) {
                    t ? (this.setSelectionAnchor(e.end.row, e.end.column), this.selectTo(e.start.row, e.start.column)) : (this.setSelectionAnchor(e.start.row, e.start.column), this.selectTo(e.end.row, e.end.column)), this.getRange().isEmpty() && (this.$isEmpty = !0), this.$desiredColumn = null
                }, this.$moveSelection = function (e) {
                    var t = this.lead;
                    this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this)
                }, this.selectTo = function (e, t) {
                    this.$moveSelection(function () {
                        this.moveCursorTo(e, t)
                    })
                }, this.selectToPosition = function (e) {
                    this.$moveSelection(function () {
                        this.moveCursorToPosition(e)
                    })
                }, this.moveTo = function (e, t) {
                    this.clearSelection(), this.moveCursorTo(e, t)
                }, this.moveToPosition = function (e) {
                    this.clearSelection(), this.moveCursorToPosition(e)
                }, this.selectUp = function () {
                    this.$moveSelection(this.moveCursorUp)
                }, this.selectDown = function () {
                    this.$moveSelection(this.moveCursorDown)
                }, this.selectRight = function () {
                    this.$moveSelection(this.moveCursorRight)
                }, this.selectLeft = function () {
                    this.$moveSelection(this.moveCursorLeft)
                }, this.selectLineStart = function () {
                    this.$moveSelection(this.moveCursorLineStart)
                }, this.selectLineEnd = function () {
                    this.$moveSelection(this.moveCursorLineEnd)
                }, this.selectFileEnd = function () {
                    this.$moveSelection(this.moveCursorFileEnd)
                }, this.selectFileStart = function () {
                    this.$moveSelection(this.moveCursorFileStart)
                }, this.selectWordRight = function () {
                    this.$moveSelection(this.moveCursorWordRight)
                }, this.selectWordLeft = function () {
                    this.$moveSelection(this.moveCursorWordLeft)
                }, this.getWordRange = function (e, t) {
                    if ("undefined" == typeof t) {
                        var i = e || this.lead;
                        e = i.row, t = i.column
                    }
                    return this.session.getWordRange(e, t)
                }, this.selectWord = function () {
                    this.setSelectionRange(this.getWordRange())
                }, this.selectAWord = function () {
                    var e = this.getCursor(), t = this.session.getAWordRange(e.row, e.column);
                    this.setSelectionRange(t)
                }, this.getLineRange = function (e, t) {
                    var i, n = "number" == typeof e ? e : this.lead.row, r = this.session.getFoldLine(n);
                    return r ? (n = r.start.row, i = r.end.row) : i = n, t === !0 ? new s(n, 0, i, this.session.getLine(i).length) : new s(n, 0, i + 1, 0)
                }, this.selectLine = function () {
                    this.setSelectionRange(this.getLineRange())
                }, this.moveCursorUp = function () {
                    this.moveCursorBy(-1, 0)
                }, this.moveCursorDown = function () {
                    this.moveCursorBy(1, 0)
                }, this.moveCursorLeft = function () {
                    var e, t = this.lead.getPosition();
                    if (e = this.session.getFoldAt(t.row, t.column, -1))this.moveCursorTo(e.start.row, e.start.column); else if (0 === t.column)t.row > 0 && this.moveCursorTo(t.row - 1, this.doc.getLine(t.row - 1).length); else {
                        var i = this.session.getTabSize();
                        this.session.isTabStop(t) && this.doc.getLine(t.row).slice(t.column - i, t.column).split(" ").length - 1 == i ? this.moveCursorBy(0, -i) : this.moveCursorBy(0, -1)
                    }
                }, this.moveCursorRight = function () {
                    var e, t = this.lead.getPosition();
                    if (e = this.session.getFoldAt(t.row, t.column, 1))this.moveCursorTo(e.end.row, e.end.column); else if (this.lead.column == this.doc.getLine(this.lead.row).length)this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0); else {
                        var i = this.session.getTabSize(), t = this.lead;
                        this.session.isTabStop(t) && this.doc.getLine(t.row).slice(t.column, t.column + i).split(" ").length - 1 == i ? this.moveCursorBy(0, i) : this.moveCursorBy(0, 1)
                    }
                }, this.moveCursorLineStart = function () {
                    var e = this.lead.row, t = this.lead.column, i = this.session.documentToScreenRow(e, t), n = this.session.screenToDocumentPosition(i, 0), r = this.session.getDisplayLine(e, null, n.row, n.column), o = r.match(/^\s*/);
                    o[0].length == t || this.session.$useEmacsStyleLineStart || (n.column += o[0].length), this.moveCursorToPosition(n)
                }, this.moveCursorLineEnd = function () {
                    var e = this.lead, t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
                    if (this.lead.column == t.column) {
                        var i = this.session.getLine(t.row);
                        if (t.column == i.length) {
                            var n = i.search(/\s+$/);
                            n > 0 && (t.column = n)
                        }
                    }
                    this.moveCursorTo(t.row, t.column)
                }, this.moveCursorFileEnd = function () {
                    var e = this.doc.getLength() - 1, t = this.doc.getLine(e).length;
                    this.moveCursorTo(e, t)
                }, this.moveCursorFileStart = function () {
                    this.moveCursorTo(0, 0)
                }, this.moveCursorLongWordRight = function () {
                    var e, t = this.lead.row, i = this.lead.column, n = this.doc.getLine(t), r = n.substring(i);
                    this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
                    var o = this.session.getFoldAt(t, i, 1);
                    return o ? void this.moveCursorTo(o.end.row, o.end.column) : ((e = this.session.nonTokenRe.exec(r)) && (i += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, r = n.substring(i)), i >= n.length ? (this.moveCursorTo(t, n.length), this.moveCursorRight(), void(t < this.doc.getLength() - 1 && this.moveCursorWordRight())) : ((e = this.session.tokenRe.exec(r)) && (i += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(t, i)))
                }, this.moveCursorLongWordLeft = function () {
                    var e, t = this.lead.row, i = this.lead.column;
                    if (e = this.session.getFoldAt(t, i, -1))return void this.moveCursorTo(e.start.row, e.start.column);
                    var n = this.session.getFoldStringAt(t, i, -1);
                    null == n && (n = this.doc.getLine(t).substring(0, i));
                    var o, s = r.stringReverse(n);
                    return this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, (o = this.session.nonTokenRe.exec(s)) && (i -= this.session.nonTokenRe.lastIndex, s = s.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), 0 >= i ? (this.moveCursorTo(t, 0), this.moveCursorLeft(), void(t > 0 && this.moveCursorWordLeft())) : ((o = this.session.tokenRe.exec(s)) && (i -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(t, i))
                }, this.$shortWordEndIndex = function (e) {
                    var t, i, n = 0, r = /\s/, o = this.session.tokenRe;
                    if (o.lastIndex = 0, t = this.session.tokenRe.exec(e))n = this.session.tokenRe.lastIndex; else {
                        for (; (i = e[n]) && r.test(i);)n++;
                        if (1 > n)for (o.lastIndex = 0; (i = e[n]) && !o.test(i);)if (o.lastIndex = 0, n++, r.test(i)) {
                            if (n > 2) {
                                n--;
                                break
                            }
                            for (; (i = e[n]) && r.test(i);)n++;
                            if (n > 2)break
                        }
                    }
                    return o.lastIndex = 0, n
                }, this.moveCursorShortWordRight = function () {
                    var e = this.lead.row, t = this.lead.column, i = this.doc.getLine(e), n = i.substring(t), r = this.session.getFoldAt(e, t, 1);
                    if (r)return this.moveCursorTo(r.end.row, r.end.column);
                    if (t == i.length) {
                        var o = this.doc.getLength();
                        do e++, n = this.doc.getLine(e); while (o > e && /^\s*$/.test(n));
                        /^\s+/.test(n) || (n = ""), t = 0
                    }
                    var s = this.$shortWordEndIndex(n);
                    this.moveCursorTo(e, t + s)
                }, this.moveCursorShortWordLeft = function () {
                    var e, t = this.lead.row, i = this.lead.column;
                    if (e = this.session.getFoldAt(t, i, -1))return this.moveCursorTo(e.start.row, e.start.column);
                    var n = this.session.getLine(t).substring(0, i);
                    if (0 === i) {
                        do t--, n = this.doc.getLine(t); while (t > 0 && /^\s*$/.test(n));
                        i = n.length, /\s+$/.test(n) || (n = "")
                    }
                    var o = r.stringReverse(n), s = this.$shortWordEndIndex(o);
                    return this.moveCursorTo(t, i - s)
                }, this.moveCursorWordRight = function () {
                    this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
                }, this.moveCursorWordLeft = function () {
                    this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
                }, this.moveCursorBy = function (e, t) {
                    var i = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
                    0 === t && (this.$desiredColumn ? i.column = this.$desiredColumn : this.$desiredColumn = i.column);
                    var n = this.session.screenToDocumentPosition(i.row + e, i.column);
                    0 !== e && 0 === t && n.row === this.lead.row && n.column === this.lead.column && this.session.lineWidgets && this.session.lineWidgets[n.row] && (n.row > 0 || e > 0) && n.row++, this.moveCursorTo(n.row, n.column + t, 0 === t)
                }, this.moveCursorToPosition = function (e) {
                    this.moveCursorTo(e.row, e.column)
                }, this.moveCursorTo = function (e, t, i) {
                    var n = this.session.getFoldAt(e, t, 1);
                    n && (e = n.start.row, t = n.start.column), this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, i || (this.$desiredColumn = null)
                }, this.moveCursorToScreen = function (e, t, i) {
                    var n = this.session.screenToDocumentPosition(e, t);
                    this.moveCursorTo(n.row, n.column, i)
                }, this.detach = function () {
                    this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
                }, this.fromOrientedRange = function (e) {
                    this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn
                }, this.toOrientedRange = function (e) {
                    var t = this.getRange();
                    return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e
                }, this.getRangeOfMovements = function (e) {
                    var t = this.getCursor();
                    try {
                        e.call(null, this);
                        var i = this.getCursor();
                        return s.fromPoints(t, i)
                    } catch (n) {
                        return s.fromPoints(t, t)
                    } finally {
                        this.moveCursorToPosition(t)
                    }
                }, this.toJSON = function () {
                    if (this.rangeCount)var e = this.ranges.map(function (e) {
                        var t = e.clone();
                        return t.isBackwards = e.cursor == e.start, t
                    }); else {
                        var e = this.getRange();
                        e.isBackwards = this.isBackwards()
                    }
                    return e
                }, this.fromJSON = function (e) {
                    if (void 0 == e.start) {
                        if (this.rangeList) {
                            this.toSingleRange(e[0]);
                            for (var t = e.length; t--;) {
                                var i = s.fromPoints(e[t].start, e[t].end);
                                e[t].isBackwards && (i.cursor = i.start), this.addRange(i, !0);
                            }
                            return
                        }
                        e = e[0]
                    }
                    this.rangeList && this.toSingleRange(e), this.setSelectionRange(e, e.isBackwards)
                }, this.isEqual = function (e) {
                    if ((e.length || this.rangeCount) && e.length != this.rangeCount)return !1;
                    if (!e.length || !this.ranges)return this.getRange().isEqual(e);
                    for (var t = this.ranges.length; t--;)if (!this.ranges[t].isEqual(e[t]))return !1;
                    return !0
                }
            }).call(a.prototype), t.Selection = a
        }), ace.define("ace/tokenizer", ["require", "exports", "module", "ace/config"], function (e, t, i) {
            "use strict";
            var n = e("./config"), r = 2e3, o = function (e) {
                this.states = e, this.regExps = {}, this.matchMappings = {};
                for (var t in this.states) {
                    for (var i = this.states[t], n = [], r = 0, o = this.matchMappings[t] = {defaultToken: "text"}, s = "g", a = [], l = 0; l < i.length; l++) {
                        var c = i[l];
                        if (c.defaultToken && (o.defaultToken = c.defaultToken), c.caseInsensitive && (s = "gi"), null != c.regex) {
                            c.regex instanceof RegExp && (c.regex = c.regex.toString().slice(1, -1));
                            var h = c.regex, d = new RegExp("(?:(" + h + ")|(.))").exec("a").length - 2;
                            Array.isArray(c.token) ? 1 == c.token.length || 1 == d ? c.token = c.token[0] : d - 1 != c.token.length ? (this.reportError("number of classes and regexp groups doesn't match", {
                                rule: c,
                                groupCount: d - 1
                            }), c.token = c.token[0]) : (c.tokenArray = c.token, c.token = null, c.onMatch = this.$arrayTokens) : "function" != typeof c.token || c.onMatch || (d > 1 ? c.onMatch = this.$applyToken : c.onMatch = c.token), d > 1 && (/\\\d/.test(c.regex) ? h = c.regex.replace(/\\([0-9]+)/g, function (e, t) {
                                return "\\" + (parseInt(t, 10) + r + 1)
                            }) : (d = 1, h = this.removeCapturingGroups(c.regex)), c.splitRegex || "string" == typeof c.token || a.push(c)), o[r] = l, r += d, n.push(h), c.onMatch || (c.onMatch = null)
                        }
                    }
                    n.length || (o[0] = 0, n.push("$")), a.forEach(function (e) {
                        e.splitRegex = this.createSplitterRegexp(e.regex, s)
                    }, this), this.regExps[t] = new RegExp("(" + n.join(")|(") + ")|($)", s)
                }
            };
            (function () {
                this.$setMaxTokenCount = function (e) {
                    r = 0 | e
                }, this.$applyToken = function (e) {
                    var t = this.splitRegex.exec(e).slice(1), i = this.token.apply(this, t);
                    if ("string" == typeof i)return [{type: i, value: e}];
                    for (var n = [], r = 0, o = i.length; o > r; r++)t[r] && (n[n.length] = {type: i[r], value: t[r]});
                    return n
                }, this.$arrayTokens = function (e) {
                    if (!e)return [];
                    var t = this.splitRegex.exec(e);
                    if (!t)return "text";
                    for (var i = [], n = this.tokenArray, r = 0, o = n.length; o > r; r++)t[r + 1] && (i[i.length] = {
                        type: n[r],
                        value: t[r + 1]
                    });
                    return i
                }, this.removeCapturingGroups = function (e) {
                    var t = e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function (e, t) {
                        return t ? "(?:" : e
                    });
                    return t
                }, this.createSplitterRegexp = function (e, t) {
                    if (-1 != e.indexOf("(?=")) {
                        var i = 0, n = !1, r = {};
                        e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function (e, t, o, s, a, l) {
                            return n ? n = "]" != a : a ? n = !0 : s ? (i == r.stack && (r.end = l + 1, r.stack = -1), i--) : o && (i++, 1 != o.length && (r.stack = i, r.start = l)), e
                        }), null != r.end && /^\)*$/.test(e.substr(r.end)) && (e = e.substring(0, r.start) + e.substr(r.end))
                    }
                    return "^" != e.charAt(0) && (e = "^" + e), "$" != e.charAt(e.length - 1) && (e += "$"), new RegExp(e, (t || "").replace("g", ""))
                }, this.getLineTokens = function (e, t) {
                    if (t && "string" != typeof t) {
                        var i = t.slice(0);
                        t = i[0], "#tmp" === t && (i.shift(), t = i.shift())
                    } else var i = [];
                    var n = t || "start", o = this.states[n];
                    o || (n = "start", o = this.states[n]);
                    var s = this.matchMappings[n], a = this.regExps[n];
                    a.lastIndex = 0;
                    for (var l, c = [], h = 0, d = 0, u = {type: null, value: ""}; l = a.exec(e);) {
                        var f = s.defaultToken, p = null, m = l[0], g = a.lastIndex;
                        if (g - m.length > h) {
                            var v = e.substring(h, g - m.length);
                            u.type == f ? u.value += v : (u.type && c.push(u), u = {type: f, value: v})
                        }
                        for (var w = 0; w < l.length - 2; w++)if (void 0 !== l[w + 1]) {
                            p = o[s[w]], f = p.onMatch ? p.onMatch(m, n, i) : p.token, p.next && (n = "string" == typeof p.next ? p.next : p.next(n, i), o = this.states[n], o || (this.reportError("state doesn't exist", n), n = "start", o = this.states[n]), s = this.matchMappings[n], h = g, a = this.regExps[n], a.lastIndex = g);
                            break
                        }
                        if (m)if ("string" == typeof f)p && p.merge === !1 || u.type !== f ? (u.type && c.push(u), u = {
                            type: f,
                            value: m
                        }) : u.value += m; else if (f) {
                            u.type && c.push(u), u = {type: null, value: ""};
                            for (var w = 0; w < f.length; w++)c.push(f[w])
                        }
                        if (h == e.length)break;
                        if (h = g, d++ > r) {
                            for (d > 2 * e.length && this.reportError("infinite loop with in ace tokenizer", {
                                startState: t,
                                line: e
                            }); h < e.length;)u.type && c.push(u), u = {
                                value: e.substring(h, h += 2e3),
                                type: "overflow"
                            };
                            n = "start", i = [];
                            break
                        }
                    }
                    return u.type && c.push(u), i.length > 1 && i[0] !== n && i.unshift("#tmp", n), {
                        tokens: c,
                        state: i.length ? i : n
                    }
                }, this.reportError = n.reportError
            }).call(o.prototype), t.Tokenizer = o
        }), ace.define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function (e, t, i) {
            "use strict";
            var n = e("../lib/lang"), r = function () {
                this.$rules = {start: [{token: "empty_line", regex: "^$"}, {defaultToken: "text"}]}
            };
            (function () {
                this.addRules = function (e, t) {
                    if (t)for (var i in e) {
                        for (var n = e[i], r = 0; r < n.length; r++) {
                            var o = n[r];
                            (o.next || o.onMatch) && ("string" == typeof o.next && 0 !== o.next.indexOf(t) && (o.next = t + o.next), o.nextState && 0 !== o.nextState.indexOf(t) && (o.nextState = t + o.nextState))
                        }
                        this.$rules[t + i] = n
                    } else for (var i in e)this.$rules[i] = e[i]
                }, this.getRules = function () {
                    return this.$rules
                }, this.embedRules = function (e, t, i, r, o) {
                    var s = "function" == typeof e ? (new e).getRules() : e;
                    if (r)for (var a = 0; a < r.length; a++)r[a] = t + r[a]; else {
                        r = [];
                        for (var l in s)r.push(t + l)
                    }
                    if (this.addRules(s, t), i)for (var c = Array.prototype[o ? "push" : "unshift"], a = 0; a < r.length; a++)c.apply(this.$rules[r[a]], n.deepCopy(i));
                    this.$embeds || (this.$embeds = []), this.$embeds.push(t)
                }, this.getEmbeds = function () {
                    return this.$embeds
                };
                var e = function (e, t) {
                    return ("start" != e || t.length) && t.unshift(this.nextState, e), this.nextState
                }, t = function (e, t) {
                    return t.shift(), t.shift() || "start"
                };
                this.normalizeRules = function () {
                    function i(o) {
                        var s = r[o];
                        s.processed = !0;
                        for (var a = 0; a < s.length; a++) {
                            var l = s[a];
                            !l.regex && l.start && (l.regex = l.start, l.next || (l.next = []), l.next.push({defaultToken: l.token}, {
                                token: l.token + ".end",
                                regex: l.end || l.start,
                                next: "pop"
                            }), l.token = l.token + ".start", l.push = !0);
                            var c = l.next || l.push;
                            if (c && Array.isArray(c)) {
                                var h = l.stateName;
                                h || (h = l.token, "string" != typeof h && (h = h[0] || ""), r[h] && (h += n++)), r[h] = c, l.next = h, i(h)
                            } else"pop" == c && (l.next = t);
                            if (l.push && (l.nextState = l.next || l.push, l.next = e, delete l.push), l.rules)for (var d in l.rules)r[d] ? r[d].push && r[d].push.apply(r[d], l.rules[d]) : r[d] = l.rules[d];
                            if (l.include || "string" == typeof l)var u = l.include || l, f = r[u]; else Array.isArray(l) && (f = l);
                            if (f) {
                                var p = [a, 1].concat(f);
                                l.noEscape && (p = p.filter(function (e) {
                                    return !e.next
                                })), s.splice.apply(s, p), a--, f = null
                            }
                            l.keywordMap && (l.token = this.createKeywordMapper(l.keywordMap, l.defaultToken || "text", l.caseInsensitive), delete l.defaultToken)
                        }
                    }

                    var n = 0, r = this.$rules;
                    Object.keys(r).forEach(i, this)
                }, this.createKeywordMapper = function (e, t, i, n) {
                    var r = Object.create(null);
                    return Object.keys(e).forEach(function (t) {
                        var o = e[t];
                        i && (o = o.toLowerCase());
                        for (var s = o.split(n || "|"), a = s.length; a--;)r[s[a]] = t
                    }), Object.getPrototypeOf(r) && (r.__proto__ = null), this.$keywordList = Object.keys(r), e = null, i ? function (e) {
                        return r[e.toLowerCase()] || t
                    } : function (e) {
                        return r[e] || t
                    }
                }, this.getKeywords = function () {
                    return this.$keywords
                }
            }).call(r.prototype), t.TextHighlightRules = r
        }), ace.define("ace/mode/behaviour", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            var n = function () {
                this.$behaviours = {}
            };
            (function () {
                this.add = function (e, t, i) {
                    switch (void 0) {
                        case this.$behaviours:
                            this.$behaviours = {};
                        case this.$behaviours[e]:
                            this.$behaviours[e] = {}
                    }
                    this.$behaviours[e][t] = i
                }, this.addBehaviours = function (e) {
                    for (var t in e)for (var i in e[t])this.add(t, i, e[t][i])
                }, this.remove = function (e) {
                    this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e]
                }, this.inherit = function (e, t) {
                    if ("function" == typeof e)var i = (new e).getBehaviours(t); else var i = e.getBehaviours(t);
                    this.addBehaviours(i)
                }, this.getBehaviours = function (e) {
                    if (e) {
                        for (var t = {}, i = 0; i < e.length; i++)this.$behaviours[e[i]] && (t[e[i]] = this.$behaviours[e[i]]);
                        return t
                    }
                    return this.$behaviours
                }
            }).call(n.prototype), t.Behaviour = n
        }), ace.define("ace/unicode", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            function n(e) {
                var i = /\w{4}/g;
                for (var n in e)t.packages[n] = e[n].replace(i, "\\u$&")
            }

            t.packages = {}, n({
                L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
                Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
                Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
                Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
                Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
                Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
                M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
                Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
                Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
                Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
                N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
                Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
                Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
                No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
                P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
                Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
                Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
                Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
                Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
                Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
                Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
                Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
                S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
                Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
                Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
                Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
                So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
                Z: "002000A01680180E2000-200A20282029202F205F3000",
                Zs: "002000A01680180E2000-200A202F205F3000",
                Zl: "2028",
                Zp: "2029",
                C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
                Cc: "0000-001F007F-009F",
                Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
                Co: "E000-F8FF",
                Cs: "D800-DFFF",
                Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
            })
        }), ace.define("ace/token_iterator", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            var n = function (e, t, i) {
                this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
                var n = e.getTokenAt(t, i);
                this.$tokenIndex = n ? n.index : -1
            };
            (function () {
                this.stepBackward = function () {
                    for (this.$tokenIndex -= 1; this.$tokenIndex < 0;) {
                        if (this.$row -= 1, this.$row < 0)return this.$row = 0, null;
                        this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
                    }
                    return this.$rowTokens[this.$tokenIndex]
                }, this.stepForward = function () {
                    this.$tokenIndex += 1;
                    for (var e; this.$tokenIndex >= this.$rowTokens.length;) {
                        if (this.$row += 1, e || (e = this.$session.getLength()), this.$row >= e)return this.$row = e - 1, null;
                        this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
                    }
                    return this.$rowTokens[this.$tokenIndex]
                }, this.getCurrentToken = function () {
                    return this.$rowTokens[this.$tokenIndex]
                }, this.getCurrentTokenRow = function () {
                    return this.$row
                }, this.getCurrentTokenColumn = function () {
                    var e = this.$rowTokens, t = this.$tokenIndex, i = e[t].start;
                    if (void 0 !== i)return i;
                    for (i = 0; t > 0;)t -= 1, i += e[t].value.length;
                    return i
                }, this.getCurrentTokenPosition = function () {
                    return {row: this.$row, column: this.getCurrentTokenColumn()}
                }
            }).call(n.prototype), t.TokenIterator = n
        }), ace.define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function (e, t, i) {
            "use strict";
            var n = e("../tokenizer").Tokenizer, r = e("./text_highlight_rules").TextHighlightRules, o = e("./behaviour").Behaviour, s = e("../unicode"), a = e("../lib/lang"), l = e("../token_iterator").TokenIterator, c = e("../range").Range, h = function () {
                this.HighlightRules = r, this.$behaviour = new o
            };
            (function () {
                this.tokenRe = new RegExp("^[" + s.packages.L + s.packages.Mn + s.packages.Mc + s.packages.Nd + s.packages.Pc + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + s.packages.L + s.packages.Mn + s.packages.Mc + s.packages.Nd + s.packages.Pc + "\\$_]|\\s])+", "g"), this.getTokenizer = function () {
                    return this.$tokenizer || (this.$highlightRules = this.$highlightRules || new this.HighlightRules, this.$tokenizer = new n(this.$highlightRules.getRules())), this.$tokenizer
                }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function (e, t, i, n) {
                    function r(e) {
                        for (var t = i; n >= t; t++)e(o.getLine(t), t)
                    }

                    var o = t.doc, s = !0, l = !0, c = 1 / 0, h = t.getTabSize(), d = !1;
                    if (this.lineCommentStart) {
                        if (Array.isArray(this.lineCommentStart))var u = this.lineCommentStart.map(a.escapeRegExp).join("|"), f = this.lineCommentStart[0]; else var u = a.escapeRegExp(this.lineCommentStart), f = this.lineCommentStart;
                        u = new RegExp("^(\\s*)(?:" + u + ") ?"), d = t.getUseSoftTabs();
                        var p = function (e, t) {
                            var i = e.match(u);
                            if (i) {
                                var n = i[1].length, r = i[0].length;
                                w(e, n, r) || " " != i[0][r - 1] || r--, o.removeInLine(t, n, r)
                            }
                        }, m = f + " ", g = function (e, t) {
                            (!s || /\S/.test(e)) && (w(e, c, c) ? o.insertInLine({
                                row: t,
                                column: c
                            }, m) : o.insertInLine({row: t, column: c}, f))
                        }, v = function (e, t) {
                            return u.test(e)
                        }, w = function (e, t, i) {
                            for (var n = 0; t-- && " " == e.charAt(t);)n++;
                            if (n % h != 0)return !1;
                            for (var n = 0; " " == e.charAt(i++);)n++;
                            return h > 2 ? n % h != h - 1 : n % h == 0
                        }
                    } else {
                        if (!this.blockComment)return !1;
                        var f = this.blockComment.start, y = this.blockComment.end, u = new RegExp("^(\\s*)(?:" + a.escapeRegExp(f) + ")"), A = new RegExp("(?:" + a.escapeRegExp(y) + ")\\s*$"), g = function (e, t) {
                            v(e, t) || (!s || /\S/.test(e)) && (o.insertInLine({
                                row: t,
                                column: e.length
                            }, y), o.insertInLine({row: t, column: c}, f))
                        }, p = function (e, t) {
                            var i;
                            (i = e.match(A)) && o.removeInLine(t, e.length - i[0].length, e.length), (i = e.match(u)) && o.removeInLine(t, i[1].length, i[0].length)
                        }, v = function (e, i) {
                            if (u.test(e))return !0;
                            for (var n = t.getTokens(i), r = 0; r < n.length; r++)if ("comment" === n[r].type)return !0
                        }
                    }
                    var E = 1 / 0;
                    r(function (e, t) {
                        var i = e.search(/\S/);
                        -1 !== i ? (c > i && (c = i), l && !v(e, t) && (l = !1)) : E > e.length && (E = e.length)
                    }), c == 1 / 0 && (c = E, s = !1, l = !1), d && c % h != 0 && (c = Math.floor(c / h) * h), r(l ? p : g)
                }, this.toggleBlockComment = function (e, t, i, n) {
                    var r = this.blockComment;
                    if (r) {
                        !r.start && r[0] && (r = r[0]);
                        var o, s, a = new l(t, n.row, n.column), h = a.getCurrentToken(), d = (t.selection, t.selection.toOrientedRange());
                        if (h && /comment/.test(h.type)) {
                            for (var u, f; h && /comment/.test(h.type);) {
                                var p = h.value.indexOf(r.start);
                                if (-1 != p) {
                                    var m = a.getCurrentTokenRow(), g = a.getCurrentTokenColumn() + p;
                                    u = new c(m, g, m, g + r.start.length);
                                    break
                                }
                                h = a.stepBackward()
                            }
                            for (var a = new l(t, n.row, n.column), h = a.getCurrentToken(); h && /comment/.test(h.type);) {
                                var p = h.value.indexOf(r.end);
                                if (-1 != p) {
                                    var m = a.getCurrentTokenRow(), g = a.getCurrentTokenColumn() + p;
                                    f = new c(m, g, m, g + r.end.length);
                                    break
                                }
                                h = a.stepForward()
                            }
                            f && t.remove(f), u && (t.remove(u), o = u.start.row, s = -r.start.length)
                        } else s = r.start.length, o = i.start.row, t.insert(i.end, r.end), t.insert(i.start, r.start);
                        d.start.row == o && (d.start.column += s), d.end.row == o && (d.end.column += s), t.selection.fromOrientedRange(d)
                    }
                }, this.getNextLineIndent = function (e, t, i) {
                    return this.$getIndent(t)
                }, this.checkOutdent = function (e, t, i) {
                    return !1
                }, this.autoOutdent = function (e, t, i) {
                }, this.$getIndent = function (e) {
                    return e.match(/^\s*/)[0]
                }, this.createWorker = function (e) {
                    return null
                }, this.createModeDelegates = function (e) {
                    this.$embeds = [], this.$modes = {};
                    for (var t in e)e[t] && (this.$embeds.push(t), this.$modes[t] = new e[t]);
                    for (var i = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"], t = 0; t < i.length; t++)!function (e) {
                        var n = i[t], r = e[n];
                        e[i[t]] = function () {
                            return this.$delegator(n, arguments, r)
                        }
                    }(this)
                }, this.$delegator = function (e, t, i) {
                    var n = t[0];
                    "string" != typeof n && (n = n[0]);
                    for (var r = 0; r < this.$embeds.length; r++)if (this.$modes[this.$embeds[r]]) {
                        var o = n.split(this.$embeds[r]);
                        if (!o[0] && o[1]) {
                            t[0] = o[1];
                            var s = this.$modes[this.$embeds[r]];
                            return s[e].apply(s, t)
                        }
                    }
                    var a = i.apply(this, t);
                    return i ? a : void 0
                }, this.transformAction = function (e, t, i, n, r) {
                    if (this.$behaviour) {
                        var o = this.$behaviour.getBehaviours();
                        for (var s in o)if (o[s][t]) {
                            var a = o[s][t].apply(this, arguments);
                            if (a)return a
                        }
                    }
                }, this.getKeywords = function (e) {
                    if (!this.completionKeywords) {
                        var t = this.$tokenizer.rules, i = [];
                        for (var n in t)for (var r = t[n], o = 0, s = r.length; s > o; o++)if ("string" == typeof r[o].token)/keyword|support|storage/.test(r[o].token) && i.push(r[o].regex); else if ("object" == typeof r[o].token)for (var a = 0, l = r[o].token.length; l > a; a++)if (/keyword|support|storage/.test(r[o].token[a])) {
                            var n = r[o].regex.match(/\(.+?\)/g)[a];
                            i.push(n.substr(1, n.length - 2))
                        }
                        this.completionKeywords = i
                    }
                    return e ? i.concat(this.$keywordList || []) : this.$keywordList
                }, this.$createKeywordList = function () {
                    return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || []
                }, this.getCompletions = function (e, t, i, n) {
                    var r = this.$keywordList || this.$createKeywordList();
                    return r.map(function (e) {
                        return {name: e, value: e, score: 0, meta: "keyword"}
                    })
                }, this.$id = "ace/mode/text"
            }).call(h.prototype), t.Mode = h
        }), ace.define("ace/apply_delta", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            t.applyDelta = function (e, t, i) {
                var n = t.start.row, r = t.start.column, o = e[n] || "";
                switch (t.action) {
                    case"insert":
                        var s = t.lines;
                        if (1 === s.length)e[n] = o.substring(0, r) + t.lines[0] + o.substring(r); else {
                            var a = [n, 1].concat(t.lines);
                            e.splice.apply(e, a), e[n] = o.substring(0, r) + e[n], e[n + t.lines.length - 1] += o.substring(r)
                        }
                        break;
                    case"remove":
                        var l = t.end.column, c = t.end.row;
                        n === c ? e[n] = o.substring(0, r) + o.substring(l) : e.splice(n, c - n + 1, o.substring(0, r) + e[c].substring(l))
                }
            }
        }), ace.define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, i) {
            "use strict";
            var n = e("./lib/oop"), r = e("./lib/event_emitter").EventEmitter, o = t.Anchor = function (e, t, i) {
                this.$onChange = this.onChange.bind(this), this.attach(e), "undefined" == typeof i ? this.setPosition(t.row, t.column) : this.setPosition(t, i)
            };
            (function () {
                function e(e, t, i) {
                    var n = i ? e.column <= t.column : e.column < t.column;
                    return e.row < t.row || e.row == t.row && n
                }

                function t(t, i, n) {
                    var r = "insert" == t.action, o = (r ? 1 : -1) * (t.end.row - t.start.row), s = (r ? 1 : -1) * (t.end.column - t.start.column), a = t.start, l = r ? a : t.end;
                    return e(i, a, n) ? {row: i.row, column: i.column} : e(l, i, !n) ? {
                        row: i.row + o,
                        column: i.column + (i.row == l.row ? s : 0)
                    } : {row: a.row, column: a.column}
                }

                n.implement(this, r), this.getPosition = function () {
                    return this.$clipPositionToDocument(this.row, this.column)
                }, this.getDocument = function () {
                    return this.document
                }, this.$insertRight = !1, this.onChange = function (e) {
                    if (!(e.start.row == e.end.row && e.start.row != this.row || e.start.row > this.row)) {
                        var i = t(e, {row: this.row, column: this.column}, this.$insertRight);
                        this.setPosition(i.row, i.column, !0)
                    }
                }, this.setPosition = function (e, t, i) {
                    var n;
                    if (n = i ? {
                            row: e,
                            column: t
                        } : this.$clipPositionToDocument(e, t), this.row != n.row || this.column != n.column) {
                        var r = {row: this.row, column: this.column};
                        this.row = n.row, this.column = n.column, this._signal("change", {old: r, value: n})
                    }
                }, this.detach = function () {
                    this.document.removeEventListener("change", this.$onChange)
                }, this.attach = function (e) {
                    this.document = e || this.document, this.document.on("change", this.$onChange)
                }, this.$clipPositionToDocument = function (e, t) {
                    var i = {};
                    return e >= this.document.getLength() ? (i.row = Math.max(0, this.document.getLength() - 1), i.column = this.document.getLine(i.row).length) : 0 > e ? (i.row = 0, i.column = 0) : (i.row = e, i.column = Math.min(this.document.getLine(i.row).length, Math.max(0, t))), 0 > t && (i.column = 0), i
                }
            }).call(o.prototype)
        }), ace.define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/apply_delta", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function (e, t, i) {
            "use strict";
            var n = e("./lib/oop"), r = e("./apply_delta").applyDelta, o = e("./lib/event_emitter").EventEmitter, s = e("./range").Range, a = e("./anchor").Anchor, l = function (e) {
                this.$lines = [""], 0 === e.length ? this.$lines = [""] : Array.isArray(e) ? this.insertMergedLines({
                    row: 0,
                    column: 0
                }, e) : this.insert({row: 0, column: 0}, e)
            };
            (function () {
                n.implement(this, o), this.setValue = function (e) {
                    var t = this.getLength() - 1;
                    this.remove(new s(0, 0, t, this.getLine(t).length)), this.insert({row: 0, column: 0}, e)
                }, this.getValue = function () {
                    return this.getAllLines().join(this.getNewLineCharacter())
                }, this.createAnchor = function (e, t) {
                    return new a(this, e, t)
                }, 0 === "aaa".split(/a/).length ? this.$split = function (e) {
                    return e.replace(/\r\n|\r/g, "\n").split("\n")
                } : this.$split = function (e) {
                    return e.split(/\r\n|\r|\n/)
                }, this.$detectNewLine = function (e) {
                    var t = e.match(/^.*?(\r\n|\r|\n)/m);
                    this.$autoNewLine = t ? t[1] : "\n", this._signal("changeNewLineMode")
                }, this.getNewLineCharacter = function () {
                    switch (this.$newLineMode) {
                        case"windows":
                            return "\r\n";
                        case"unix":
                            return "\n";
                        default:
                            return this.$autoNewLine || "\n"
                    }
                }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function (e) {
                    this.$newLineMode !== e && (this.$newLineMode = e, this._signal("changeNewLineMode"))
                }, this.getNewLineMode = function () {
                    return this.$newLineMode
                }, this.isNewLine = function (e) {
                    return "\r\n" == e || "\r" == e || "\n" == e
                }, this.getLine = function (e) {
                    return this.$lines[e] || ""
                }, this.getLines = function (e, t) {
                    return this.$lines.slice(e, t + 1)
                }, this.getAllLines = function () {
                    return this.getLines(0, this.getLength())
                }, this.getLength = function () {
                    return this.$lines.length
                }, this.getTextRange = function (e) {
                    return this.getLinesForRange(e).join(this.getNewLineCharacter())
                }, this.getLinesForRange = function (e) {
                    var t;
                    if (e.start.row === e.end.row)t = [this.getLine(e.start.row).substring(e.start.column, e.end.column)]; else {
                        t = this.getLines(e.start.row, e.end.row), t[0] = (t[0] || "").substring(e.start.column);
                        var i = t.length - 1;
                        e.end.row - e.start.row == i && (t[i] = t[i].substring(0, e.end.column))
                    }
                    return t
                }, this.insertLines = function (e, t) {
                    return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e, t)
                }, this.removeLines = function (e, t) {
                    return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e, t)
                }, this.insertNewLine = function (e) {
                    return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e, ["", ""])
                }, this.insert = function (e, t) {
                    return this.getLength() <= 1 && this.$detectNewLine(t), this.insertMergedLines(e, this.$split(t))
                }, this.insertInLine = function (e, t) {
                    var i = this.clippedPos(e.row, e.column), n = this.pos(e.row, e.column + t.length);
                    return this.applyDelta({start: i, end: n, action: "insert", lines: [t]}, !0), this.clonePos(n)
                }, this.clippedPos = function (e, t) {
                    var i = this.getLength();
                    void 0 === e ? e = i : 0 > e ? e = 0 : e >= i && (e = i - 1, t = void 0);
                    var n = this.getLine(e);
                    return void 0 == t && (t = n.length), t = Math.min(Math.max(t, 0), n.length), {row: e, column: t}
                }, this.clonePos = function (e) {
                    return {row: e.row, column: e.column}
                }, this.pos = function (e, t) {
                    return {row: e, column: t}
                }, this.$clipPosition = function (e) {
                    var t = this.getLength();
                    return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : (e.row = Math.max(0, e.row), e.column = Math.min(Math.max(e.column, 0), this.getLine(e.row).length)), e
                }, this.insertFullLines = function (e, t) {
                    e = Math.min(Math.max(e, 0), this.getLength());
                    var i = 0;
                    e < this.getLength() ? (t = t.concat([""]), i = 0) : (t = [""].concat(t), e--, i = this.$lines[e].length), this.insertMergedLines({
                        row: e,
                        column: i
                    }, t)
                }, this.insertMergedLines = function (e, t) {
                    var i = this.clippedPos(e.row, e.column), n = {
                        row: i.row + t.length - 1,
                        column: (1 == t.length ? i.column : 0) + t[t.length - 1].length
                    };
                    return this.applyDelta({start: i, end: n, action: "insert", lines: t}), this.clonePos(n)
                }, this.remove = function (e) {
                    var t = this.clippedPos(e.start.row, e.start.column), i = this.clippedPos(e.end.row, e.end.column);
                    return this.applyDelta({
                        start: t,
                        end: i,
                        action: "remove",
                        lines: this.getLinesForRange({start: t, end: i})
                    }), this.clonePos(t)
                }, this.removeInLine = function (e, t, i) {
                    var n = this.clippedPos(e, t), r = this.clippedPos(e, i);
                    return this.applyDelta({
                        start: n,
                        end: r,
                        action: "remove",
                        lines: this.getLinesForRange({start: n, end: r})
                    }, !0), this.clonePos(n)
                }, this.removeFullLines = function (e, t) {
                    e = Math.min(Math.max(0, e), this.getLength() - 1), t = Math.min(Math.max(0, t), this.getLength() - 1);
                    var i = t == this.getLength() - 1 && e > 0, n = t < this.getLength() - 1, r = i ? e - 1 : e, o = i ? this.getLine(r).length : 0, a = n ? t + 1 : t, l = n ? 0 : this.getLine(a).length, c = new s(r, o, a, l), h = this.$lines.slice(e, t + 1);
                    return this.applyDelta({
                        start: c.start,
                        end: c.end,
                        action: "remove",
                        lines: this.getLinesForRange(c)
                    }), h
                }, this.removeNewLine = function (e) {
                    e < this.getLength() - 1 && e >= 0 && this.applyDelta({
                        start: this.pos(e, this.getLine(e).length),
                        end: this.pos(e + 1, 0),
                        action: "remove",
                        lines: ["", ""]
                    })
                }, this.replace = function (e, t) {
                    if (e instanceof s || (e = s.fromPoints(e.start, e.end)), 0 === t.length && e.isEmpty())return e.start;
                    if (t == this.getTextRange(e))return e.end;
                    this.remove(e);
                    var i;
                    return i = t ? this.insert(e.start, t) : e.start
                }, this.applyDeltas = function (e) {
                    for (var t = 0; t < e.length; t++)this.applyDelta(e[t])
                }, this.revertDeltas = function (e) {
                    for (var t = e.length - 1; t >= 0; t--)this.revertDelta(e[t])
                }, this.applyDelta = function (e, t) {
                    var i = "insert" == e.action;
                    (i ? e.lines.length <= 1 && !e.lines[0] : !s.comparePoints(e.start, e.end)) || (i && e.lines.length > 2e4 && this.$splitAndapplyLargeDelta(e, 2e4), r(this.$lines, e, t), this._signal("change", e))
                }, this.$splitAndapplyLargeDelta = function (e, t) {
                    for (var i = e.lines, n = i.length, r = e.start.row, o = e.start.column, s = 0, a = 0; ;) {
                        s = a, a += t - 1;
                        var l = i.slice(s, a);
                        if (a > n) {
                            e.lines = l, e.start.row = r + s, e.start.column = o;
                            break
                        }
                        l.push(""), this.applyDelta({
                            start: this.pos(r + s, o),
                            end: this.pos(r + a, o = 0),
                            action: e.action,
                            lines: l
                        }, !0)
                    }
                }, this.revertDelta = function (e) {
                    this.applyDelta({
                        start: this.clonePos(e.start),
                        end: this.clonePos(e.end),
                        action: "insert" == e.action ? "remove" : "insert",
                        lines: e.lines.slice()
                    })
                }, this.indexToPosition = function (e, t) {
                    for (var i = this.$lines || this.getAllLines(), n = this.getNewLineCharacter().length, r = t || 0, o = i.length; o > r; r++)if (e -= i[r].length + n, 0 > e)return {
                        row: r,
                        column: e + i[r].length + n
                    };
                    return {row: o - 1, column: i[o - 1].length}
                }, this.positionToIndex = function (e, t) {
                    for (var i = this.$lines || this.getAllLines(), n = this.getNewLineCharacter().length, r = 0, o = Math.min(e.row, i.length), s = t || 0; o > s; ++s)r += i[s].length + n;
                    return r + e.column
                }
            }).call(l.prototype), t.Document = l
        }), ace.define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, i) {
            "use strict";
            var n = e("./lib/oop"), r = e("./lib/event_emitter").EventEmitter, o = function (e, t) {
                this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
                var i = this;
                this.$worker = function () {
                    if (i.running) {
                        for (var e = new Date, t = i.currentLine, n = -1, r = i.doc, o = t; i.lines[t];)t++;
                        var s = r.getLength(), a = 0;
                        for (i.running = !1; s > t;) {
                            i.$tokenizeRow(t), n = t;
                            do t++; while (i.lines[t]);
                            if (a++, a % 5 === 0 && new Date - e > 20) {
                                i.running = setTimeout(i.$worker, 20);
                                break
                            }
                        }
                        i.currentLine = t, n >= o && i.fireUpdateEvent(o, n)
                    }
                }
            };
            (function () {
                n.implement(this, r), this.setTokenizer = function (e) {
                    this.tokenizer = e, this.lines = [], this.states = [], this.start(0)
                }, this.setDocument = function (e) {
                    this.doc = e, this.lines = [], this.states = [], this.stop()
                }, this.fireUpdateEvent = function (e, t) {
                    var i = {first: e, last: t};
                    this._signal("update", {data: i})
                }, this.start = function (e) {
                    this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
                }, this.scheduleStart = function () {
                    this.running || (this.running = setTimeout(this.$worker, 700))
                }, this.$updateOnChange = function (e) {
                    var t = e.start.row, i = e.end.row - t;
                    if (0 === i)this.lines[t] = null; else if ("remove" == e.action)this.lines.splice(t, i + 1, null), this.states.splice(t, i + 1, null); else {
                        var n = Array(i + 1);
                        n.unshift(t, 1), this.lines.splice.apply(this.lines, n), this.states.splice.apply(this.states, n)
                    }
                    this.currentLine = Math.min(t, this.currentLine, this.doc.getLength()), this.stop()
                }, this.stop = function () {
                    this.running && clearTimeout(this.running), this.running = !1
                }, this.getTokens = function (e) {
                    return this.lines[e] || this.$tokenizeRow(e)
                }, this.getState = function (e) {
                    return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start"
                }, this.$tokenizeRow = function (e) {
                    var t = this.doc.getLine(e), i = this.states[e - 1], n = this.tokenizer.getLineTokens(t, i, e);
                    return this.states[e] + "" != n.state + "" ? (this.states[e] = n.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = n.tokens
                }
            }).call(o.prototype), t.BackgroundTokenizer = o
        }), ace.define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (e, t, i) {
            "use strict";
            var n = e("./lib/lang"), r = (e("./lib/oop"), e("./range").Range), o = function (e, t, i) {
                this.setRegexp(e), this.clazz = t, this.type = i || "text"
            };
            (function () {
                this.MAX_RANGES = 500, this.setRegexp = function (e) {
                    this.regExp + "" != e + "" && (this.regExp = e, this.cache = [])
                }, this.update = function (e, t, i, o) {
                    if (this.regExp)for (var s = o.firstRow, a = o.lastRow, l = s; a >= l; l++) {
                        var c = this.cache[l];
                        null == c && (c = n.getMatchOffsets(i.getLine(l), this.regExp), c.length > this.MAX_RANGES && (c = c.slice(0, this.MAX_RANGES)), c = c.map(function (e) {
                            return new r(l, e.offset, l, e.offset + e.length)
                        }), this.cache[l] = c.length ? c : "");
                        for (var h = c.length; h--;)t.drawSingleLineMarker(e, c[h].toScreenRange(i), this.clazz, o)
                    }
                }
            }).call(o.prototype), t.SearchHighlight = o
        }), ace.define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function (e, t, i) {
            "use strict";
            function n(e, t) {
                this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
                var i = t[t.length - 1];
                this.range = new r(t[0].start.row, t[0].start.column, i.end.row, i.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function (e) {
                    e.setFoldLine(this)
                }, this)
            }

            var r = e("../range").Range;
            (function () {
                this.shiftRow = function (e) {
                    this.start.row += e, this.end.row += e, this.folds.forEach(function (t) {
                        t.start.row += e, t.end.row += e
                    })
                }, this.addFold = function (e) {
                    if (e.sameRow) {
                        if (e.start.row < this.startRow || e.endRow > this.endRow)throw new Error("Can't add a fold to this FoldLine as it has no connection");
                        this.folds.push(e), this.folds.sort(function (e, t) {
                            return -e.range.compareEnd(t.start.row, t.start.column)
                        }), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column)
                    } else if (e.start.row == this.end.row)this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column; else {
                        if (e.end.row != this.start.row)throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
                        this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column
                    }
                    e.foldLine = this
                }, this.containsRow = function (e) {
                    return e >= this.start.row && e <= this.end.row
                }, this.walk = function (e, t, i) {
                    var n, r, o, s = 0, a = this.folds, l = !0;
                    null == t && (t = this.end.row, i = this.end.column);
                    for (var c = 0; c < a.length; c++) {
                        if (n = a[c], r = n.range.compareStart(t, i), -1 == r)return void e(null, t, i, s, l);
                        if (o = e(null, n.start.row, n.start.column, s, l), o = !o && e(n.placeholder, n.start.row, n.start.column, s), o || 0 === r)return;
                        l = !n.sameRow, s = n.end.column
                    }
                    e(null, t, i, s, l)
                }, this.getNextFoldTo = function (e, t) {
                    for (var i, n, r = 0; r < this.folds.length; r++) {
                        if (i = this.folds[r], n = i.range.compareEnd(e, t), -1 == n)return {fold: i, kind: "after"};
                        if (0 === n)return {fold: i, kind: "inside"}
                    }
                    return null
                }, this.addRemoveChars = function (e, t, i) {
                    var n, r, o = this.getNextFoldTo(e, t);
                    if (o)if (n = o.fold, "inside" == o.kind && n.start.column != t && n.start.row != e)window.console && window.console.log(e, t, n); else if (n.start.row == e) {
                        r = this.folds;
                        var s = r.indexOf(n);
                        for (0 === s && (this.start.column += i), s; s < r.length; s++) {
                            if (n = r[s], n.start.column += i, !n.sameRow)return;
                            n.end.column += i
                        }
                        this.end.column += i
                    }
                }, this.split = function (e, t) {
                    var i = this.getNextFoldTo(e, t);
                    if (!i || "inside" == i.kind)return null;
                    var r = i.fold, o = this.folds, s = this.foldData, a = o.indexOf(r), l = o[a - 1];
                    this.end.row = l.end.row, this.end.column = l.end.column, o = o.splice(a, o.length - a);
                    var c = new n(s, o);
                    return s.splice(s.indexOf(this) + 1, 0, c), c
                }, this.merge = function (e) {
                    for (var t = e.folds, i = 0; i < t.length; i++)this.addFold(t[i]);
                    var n = this.foldData;
                    n.splice(n.indexOf(e), 1)
                }, this.toString = function () {
                    var e = [this.range.toString() + ": ["];
                    return this.folds.forEach(function (t) {
                        e.push("  " + t.toString())
                    }), e.push("]"), e.join("\n")
                }, this.idxToPosition = function (e) {
                    for (var t = 0, i = 0; i < this.folds.length; i++) {
                        var n = this.folds[i];
                        if (e -= n.start.column - t, 0 > e)return {row: n.start.row, column: n.start.column + e};
                        if (e -= n.placeholder.length, 0 > e)return n.start;
                        t = n.end.column
                    }
                    return {row: this.end.row, column: this.end.column + e}
                }
            }).call(n.prototype), t.FoldLine = n
        }), ace.define("ace/range_list", ["require", "exports", "module", "ace/range"], function (e, t, i) {
            "use strict";
            var n = e("./range").Range, r = n.comparePoints, o = function () {
                this.ranges = []
            };
            (function () {
                this.comparePoints = r, this.pointIndex = function (e, t, i) {
                    for (var n = this.ranges, o = i || 0; o < n.length; o++) {
                        var s = n[o], a = r(e, s.end);
                        if (!(a > 0)) {
                            var l = r(e, s.start);
                            return 0 === a ? t && 0 !== l ? -o - 2 : o : l > 0 || 0 === l && !t ? o : -o - 1
                        }
                    }
                    return -o - 1
                }, this.add = function (e) {
                    var t = !e.isEmpty(), i = this.pointIndex(e.start, t);
                    0 > i && (i = -i - 1);
                    var n = this.pointIndex(e.end, t, i);
                    return 0 > n ? n = -n - 1 : n++, this.ranges.splice(i, n - i, e)
                }, this.addList = function (e) {
                    for (var t = [], i = e.length; i--;)t.push.call(t, this.add(e[i]));
                    return t
                }, this.substractPoint = function (e) {
                    var t = this.pointIndex(e);
                    return t >= 0 ? this.ranges.splice(t, 1) : void 0
                }, this.merge = function () {
                    var e = [], t = this.ranges;
                    t = t.sort(function (e, t) {
                        return r(e.start, t.start)
                    });
                    for (var i, n = t[0], o = 1; o < t.length; o++) {
                        i = n, n = t[o];
                        var s = r(i.end, n.start);
                        0 > s || (0 != s || i.isEmpty() || n.isEmpty()) && (r(i.end, n.end) < 0 && (i.end.row = n.end.row, i.end.column = n.end.column), t.splice(o, 1), e.push(n), n = i, o--)
                    }
                    return this.ranges = t, e
                }, this.contains = function (e, t) {
                    return this.pointIndex({row: e, column: t}) >= 0
                }, this.containsPoint = function (e) {
                    return this.pointIndex(e) >= 0
                }, this.rangeAtPoint = function (e) {
                    var t = this.pointIndex(e);
                    return t >= 0 ? this.ranges[t] : void 0
                }, this.clipRows = function (e, t) {
                    var i = this.ranges;
                    if (i[0].start.row > t || i[i.length - 1].start.row < e)return [];
                    var n = this.pointIndex({row: e, column: 0});
                    0 > n && (n = -n - 1);
                    var r = this.pointIndex({row: t, column: 0}, n);
                    0 > r && (r = -r - 1);
                    for (var o = [], s = n; r > s; s++)o.push(i[s]);
                    return o
                }, this.removeAll = function () {
                    return this.ranges.splice(0, this.ranges.length)
                }, this.attach = function (e) {
                    this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
                }, this.detach = function () {
                    this.session && (this.session.removeListener("change", this.onChange), this.session = null)
                }, this.$onChange = function (e) {
                    if ("insert" == e.action)var t = e.start, i = e.end; else var i = e.start, t = e.end;
                    for (var n = t.row, r = i.row, o = r - n, s = -t.column + i.column, a = this.ranges, l = 0, c = a.length; c > l; l++) {
                        var h = a[l];
                        if (!(h.end.row < n)) {
                            if (h.start.row > n)break;
                            if (h.start.row == n && h.start.column >= t.column && (h.start.column == t.column && this.$insertRight || (h.start.column += s, h.start.row += o)), h.end.row == n && h.end.column >= t.column) {
                                if (h.end.column == t.column && this.$insertRight)continue;
                                h.end.column == t.column && s > 0 && c - 1 > l && h.end.column > h.start.column && h.end.column == a[l + 1].start.column && (h.end.column -= s), h.end.column += s, h.end.row += o
                            }
                        }
                    }
                    if (0 != o && c > l)for (; c > l; l++) {
                        var h = a[l];
                        h.start.row += o, h.end.row += o
                    }
                }
            }).call(o.prototype), t.RangeList = o
        }), ace.define("ace/edit_session/fold", ["require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop"], function (e, t, i) {
            "use strict";
            function n(e, t) {
                e.row -= t.row, 0 == e.row && (e.column -= t.column)
            }

            function r(e, t) {
                n(e.start, t), n(e.end, t)
            }

            function o(e, t) {
                0 == e.row && (e.column += t.column), e.row += t.row
            }

            function s(e, t) {
                o(e.start, t), o(e.end, t)
            }

            var a = (e("../range").Range, e("../range_list").RangeList), l = e("../lib/oop"), c = t.Fold = function (e, t) {
                this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = []
            };
            l.inherits(c, a), function () {
                this.toString = function () {
                    return '"' + this.placeholder + '" ' + this.range.toString()
                }, this.setFoldLine = function (e) {
                    this.foldLine = e, this.subFolds.forEach(function (t) {
                        t.setFoldLine(e)
                    })
                }, this.clone = function () {
                    var e = this.range.clone(), t = new c(e, this.placeholder);
                    return this.subFolds.forEach(function (e) {
                        t.subFolds.push(e.clone())
                    }), t.collapseChildren = this.collapseChildren, t
                }, this.addSubFold = function (e) {
                    if (!this.range.isEqual(e)) {
                        if (!this.range.containsRange(e))throw new Error("A fold can't intersect already existing fold" + e.range + this.range);
                        r(e, this.start);
                        for (var t = e.start.row, i = e.start.column, n = 0, o = -1; n < this.subFolds.length && (o = this.subFolds[n].range.compare(t, i), 1 == o); n++);
                        var s = this.subFolds[n];
                        if (0 == o)return s.addSubFold(e);
                        for (var t = e.range.end.row, i = e.range.end.column, a = n, o = -1; a < this.subFolds.length && (o = this.subFolds[a].range.compare(t, i), 1 == o); a++);
                        this.subFolds[a];
                        if (0 == o)throw new Error("A fold can't intersect already existing fold" + e.range + this.range);
                        this.subFolds.splice(n, a - n, e);
                        return e.setFoldLine(this.foldLine), e
                    }
                }, this.restoreRange = function (e) {
                    return s(e, this.start)
                }
            }.call(c.prototype)
        }), ace.define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function (e, t, i) {
            "use strict";
            function n() {
                this.getFoldAt = function (e, t, i) {
                    var n = this.getFoldLine(e);
                    if (!n)return null;
                    for (var r = n.folds, o = 0; o < r.length; o++) {
                        var s = r[o];
                        if (s.range.contains(e, t)) {
                            if (1 == i && s.range.isEnd(e, t))continue;
                            if (-1 == i && s.range.isStart(e, t))continue;
                            return s
                        }
                    }
                }, this.getFoldsInRange = function (e) {
                    var t = e.start, i = e.end, n = this.$foldData, r = [];
                    t.column += 1, i.column -= 1;
                    for (var o = 0; o < n.length; o++) {
                        var s = n[o].range.compareRange(e);
                        if (2 != s) {
                            if (-2 == s)break;
                            for (var a = n[o].folds, l = 0; l < a.length; l++) {
                                var c = a[l];
                                if (s = c.range.compareRange(e), -2 == s)break;
                                if (2 != s) {
                                    if (42 == s)break;
                                    r.push(c)
                                }
                            }
                        }
                    }
                    return t.column -= 1, i.column += 1, r
                }, this.getFoldsInRangeList = function (e) {
                    if (Array.isArray(e)) {
                        var t = [];
                        e.forEach(function (e) {
                            t = t.concat(this.getFoldsInRange(e))
                        }, this)
                    } else var t = this.getFoldsInRange(e);
                    return t
                }, this.getAllFolds = function () {
                    for (var e = [], t = this.$foldData, i = 0; i < t.length; i++)for (var n = 0; n < t[i].folds.length; n++)e.push(t[i].folds[n]);
                    return e
                }, this.getFoldStringAt = function (e, t, i, n) {
                    if (n = n || this.getFoldLine(e), !n)return null;
                    for (var r, o, s = {end: {column: 0}}, a = 0; a < n.folds.length; a++) {
                        o = n.folds[a];
                        var l = o.range.compareEnd(e, t);
                        if (-1 == l) {
                            r = this.getLine(o.start.row).substring(s.end.column, o.start.column);
                            break
                        }
                        if (0 === l)return null;
                        s = o
                    }
                    return r || (r = this.getLine(o.start.row).substring(s.end.column)), -1 == i ? r.substring(0, t - s.end.column) : 1 == i ? r.substring(t - s.end.column) : r
                }, this.getFoldLine = function (e, t) {
                    var i = this.$foldData, n = 0;
                    for (t && (n = i.indexOf(t)), -1 == n && (n = 0), n; n < i.length; n++) {
                        var r = i[n];
                        if (r.start.row <= e && r.end.row >= e)return r;
                        if (r.end.row > e)return null
                    }
                    return null
                }, this.getNextFoldLine = function (e, t) {
                    var i = this.$foldData, n = 0;
                    for (t && (n = i.indexOf(t)), -1 == n && (n = 0), n; n < i.length; n++) {
                        var r = i[n];
                        if (r.end.row >= e)return r
                    }
                    return null
                }, this.getFoldedRowCount = function (e, t) {
                    for (var i = this.$foldData, n = t - e + 1, r = 0; r < i.length; r++) {
                        var o = i[r], s = o.end.row, a = o.start.row;
                        if (s >= t) {
                            t > a && (a >= e ? n -= t - a : n = 0);
                            break
                        }
                        s >= e && (n -= a >= e ? s - a : s - e + 1)
                    }
                    return n
                }, this.$addFoldLine = function (e) {
                    return this.$foldData.push(e), this.$foldData.sort(function (e, t) {
                        return e.start.row - t.start.row
                    }), e
                }, this.addFold = function (e, t) {
                    var i, n = this.$foldData, r = !1;
                    e instanceof s ? i = e : (i = new s(t, e), i.collapseChildren = t.collapseChildren), this.$clipRangeToDocument(i.range);
                    var a = i.start.row, l = i.start.column, c = i.end.row, h = i.end.column;
                    if (!(c > a || a == c && h - 2 >= l))throw new Error("The range has to be at least 2 characters width");
                    var d = this.getFoldAt(a, l, 1), u = this.getFoldAt(c, h, -1);
                    if (d && u == d)return d.addSubFold(i);
                    d && !d.range.isStart(a, l) && this.removeFold(d), u && !u.range.isEnd(c, h) && this.removeFold(u);
                    var f = this.getFoldsInRange(i.range);
                    f.length > 0 && (this.removeFolds(f), f.forEach(function (e) {
                        i.addSubFold(e)
                    }));
                    for (var p = 0; p < n.length; p++) {
                        var m = n[p];
                        if (c == m.start.row) {
                            m.addFold(i), r = !0;
                            break
                        }
                        if (a == m.end.row) {
                            if (m.addFold(i), r = !0, !i.sameRow) {
                                var g = n[p + 1];
                                if (g && g.start.row == c) {
                                    m.merge(g);
                                    break
                                }
                            }
                            break
                        }
                        if (c <= m.start.row)break
                    }
                    return r || (m = this.$addFoldLine(new o(this.$foldData, i))), this.$useWrapMode ? this.$updateWrapData(m.start.row, m.start.row) : this.$updateRowLengthCache(m.start.row, m.start.row), this.$modified = !0, this._signal("changeFold", {
                        data: i,
                        action: "add"
                    }), i
                }, this.addFolds = function (e) {
                    e.forEach(function (e) {
                        this.addFold(e)
                    }, this)
                }, this.removeFold = function (e) {
                    var t = e.foldLine, i = t.start.row, n = t.end.row, r = this.$foldData, o = t.folds;
                    if (1 == o.length)r.splice(r.indexOf(t), 1); else if (t.range.isEnd(e.end.row, e.end.column))o.pop(), t.end.row = o[o.length - 1].end.row, t.end.column = o[o.length - 1].end.column; else if (t.range.isStart(e.start.row, e.start.column))o.shift(), t.start.row = o[0].start.row, t.start.column = o[0].start.column; else if (e.sameRow)o.splice(o.indexOf(e), 1); else {
                        var s = t.split(e.start.row, e.start.column);
                        o = s.folds, o.shift(), s.start.row = o[0].start.row, s.start.column = o[0].start.column
                    }
                    this.$updating || (this.$useWrapMode ? this.$updateWrapData(i, n) : this.$updateRowLengthCache(i, n)), this.$modified = !0, this._signal("changeFold", {
                        data: e,
                        action: "remove"
                    })
                }, this.removeFolds = function (e) {
                    for (var t = [], i = 0; i < e.length; i++)t.push(e[i]);
                    t.forEach(function (e) {
                        this.removeFold(e)
                    }, this), this.$modified = !0
                }, this.expandFold = function (e) {
                    this.removeFold(e), e.subFolds.forEach(function (t) {
                        e.restoreRange(t), this.addFold(t)
                    }, this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = []
                }, this.expandFolds = function (e) {
                    e.forEach(function (e) {
                        this.expandFold(e)
                    }, this)
                }, this.unfold = function (e, t) {
                    var i, n;
                    if (null == e ? (i = new r(0, 0, this.getLength(), 0), t = !0) : i = "number" == typeof e ? new r(e, 0, e, this.getLine(e).length) : "row"in e ? r.fromPoints(e, e) : e, n = this.getFoldsInRangeList(i), t)this.removeFolds(n); else for (var o = n; o.length;)this.expandFolds(o), o = this.getFoldsInRangeList(i);
                    return n.length ? n : void 0
                }, this.isRowFolded = function (e, t) {
                    return !!this.getFoldLine(e, t)
                }, this.getRowFoldEnd = function (e, t) {
                    var i = this.getFoldLine(e, t);
                    return i ? i.end.row : e
                }, this.getRowFoldStart = function (e, t) {
                    var i = this.getFoldLine(e, t);
                    return i ? i.start.row : e
                }, this.getFoldDisplayLine = function (e, t, i, n, r) {
                    null == n && (n = e.start.row), null == r && (r = 0), null == t && (t = e.end.row), null == i && (i = this.getLine(t).length);
                    var o = this.doc, s = "";
                    return e.walk(function (e, t, i, a) {
                        if (!(n > t)) {
                            if (t == n) {
                                if (r > i)return;
                                a = Math.max(r, a)
                            }
                            s += null != e ? e : o.getLine(t).substring(a, i)
                        }
                    }, t, i), s
                }, this.getDisplayLine = function (e, t, i, n) {
                    var r = this.getFoldLine(e);
                    if (r)return this.getFoldDisplayLine(r, e, t, i, n);
                    var o;
                    return o = this.doc.getLine(e), o.substring(n || 0, t || o.length)
                }, this.$cloneFoldData = function () {
                    var e = [];
                    return e = this.$foldData.map(function (t) {
                        var i = t.folds.map(function (e) {
                            return e.clone()
                        });
                        return new o(e, i);
                    })
                }, this.toggleFold = function (e) {
                    var t, i, n = this.selection, r = n.getRange();
                    if (r.isEmpty()) {
                        var o = r.start;
                        if (t = this.getFoldAt(o.row, o.column))return void this.expandFold(t);
                        (i = this.findMatchingBracket(o)) ? 1 == r.comparePoint(i) ? r.end = i : (r.start = i, r.start.column++, r.end.column--) : (i = this.findMatchingBracket({
                            row: o.row,
                            column: o.column + 1
                        })) ? (1 == r.comparePoint(i) ? r.end = i : r.start = i, r.start.column++) : r = this.getCommentFoldRange(o.row, o.column) || r
                    } else {
                        var s = this.getFoldsInRange(r);
                        if (e && s.length)return void this.expandFolds(s);
                        1 == s.length && (t = s[0])
                    }
                    if (t || (t = this.getFoldAt(r.start.row, r.start.column)), t && t.range.toString() == r.toString())return void this.expandFold(t);
                    var a = "...";
                    if (!r.isMultiLine()) {
                        if (a = this.getTextRange(r), a.length < 4)return;
                        a = a.trim().substring(0, 2) + ".."
                    }
                    this.addFold(a, r)
                }, this.getCommentFoldRange = function (e, t, i) {
                    var n = new a(this, e, t), o = n.getCurrentToken();
                    if (o && /^comment|string/.test(o.type)) {
                        var s = new r, l = new RegExp(o.type.replace(/\..*/, "\\."));
                        if (1 != i) {
                            do o = n.stepBackward(); while (o && l.test(o.type));
                            n.stepForward()
                        }
                        if (s.start.row = n.getCurrentTokenRow(), s.start.column = n.getCurrentTokenColumn() + 2, n = new a(this, e, t), -1 != i) {
                            do o = n.stepForward(); while (o && l.test(o.type));
                            o = n.stepBackward()
                        } else o = n.getCurrentToken();
                        return s.end.row = n.getCurrentTokenRow(), s.end.column = n.getCurrentTokenColumn() + o.value.length - 2, s
                    }
                }, this.foldAll = function (e, t, i) {
                    void 0 == i && (i = 1e5);
                    var n = this.foldWidgets;
                    if (n) {
                        t = t || this.getLength(), e = e || 0;
                        for (var r = e; t > r; r++)if (null == n[r] && (n[r] = this.getFoldWidget(r)), "start" == n[r]) {
                            var o = this.getFoldWidgetRange(r);
                            if (o && o.isMultiLine() && o.end.row <= t && o.start.row >= e) {
                                r = o.end.row;
                                try {
                                    var s = this.addFold("...", o);
                                    s && (s.collapseChildren = i)
                                } catch (a) {
                                }
                            }
                        }
                    }
                }, this.$foldStyles = {
                    manual: 1,
                    markbegin: 1,
                    markbeginend: 1
                }, this.$foldStyle = "markbegin", this.setFoldStyle = function (e) {
                    if (!this.$foldStyles[e])throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
                    if (this.$foldStyle != e) {
                        this.$foldStyle = e, "manual" == e && this.unfold();
                        var t = this.$foldMode;
                        this.$setFolding(null), this.$setFolding(t)
                    }
                }, this.$setFolding = function (e) {
                    if (this.$foldMode != e) {
                        if (this.$foldMode = e, this.off("change", this.$updateFoldWidgets), this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets), this._signal("changeAnnotation"), !e || "manual" == this.$foldStyle)return void(this.foldWidgets = null);
                        this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets)
                    }
                }, this.getParentFoldRangeData = function (e, t) {
                    var i = this.foldWidgets;
                    if (!i || t && i[e])return {};
                    for (var n, r = e - 1; r >= 0;) {
                        var o = i[r];
                        if (null == o && (o = i[r] = this.getFoldWidget(r)), "start" == o) {
                            var s = this.getFoldWidgetRange(r);
                            if (n || (n = s), s && s.end.row >= e)break
                        }
                        r--
                    }
                    return {range: -1 !== r && s, firstRange: n}
                }, this.onFoldWidgetClick = function (e, t) {
                    t = t.domEvent;
                    var i = {
                        children: t.shiftKey,
                        all: t.ctrlKey || t.metaKey,
                        siblings: t.altKey
                    }, n = this.$toggleFoldWidget(e, i);
                    if (!n) {
                        var r = t.target || t.srcElement;
                        r && /ace_fold-widget/.test(r.className) && (r.className += " ace_invalid")
                    }
                }, this.$toggleFoldWidget = function (e, t) {
                    if (this.getFoldWidget) {
                        var i = this.getFoldWidget(e), n = this.getLine(e), r = "end" === i ? -1 : 1, o = this.getFoldAt(e, -1 === r ? 0 : n.length, r);
                        if (o)return void(t.children || t.all ? this.removeFold(o) : this.expandFold(o));
                        var s = this.getFoldWidgetRange(e, !0);
                        if (s && !s.isMultiLine() && (o = this.getFoldAt(s.start.row, s.start.column, 1), o && s.isEqual(o.range)))return void this.removeFold(o);
                        if (t.siblings) {
                            var a = this.getParentFoldRangeData(e);
                            if (a.range)var l = a.range.start.row + 1, c = a.range.end.row;
                            this.foldAll(l, c, t.all ? 1e4 : 0)
                        } else t.children ? (c = s ? s.end.row : this.getLength(), this.foldAll(e + 1, c, t.all ? 1e4 : 0)) : s && (t.all && (s.collapseChildren = 1e4), this.addFold("...", s));
                        return s
                    }
                }, this.toggleFoldWidget = function (e) {
                    var t = this.selection.getCursor().row;
                    t = this.getRowFoldStart(t);
                    var i = this.$toggleFoldWidget(t, {});
                    if (!i) {
                        var n = this.getParentFoldRangeData(t, !0);
                        if (i = n.range || n.firstRange) {
                            t = i.start.row;
                            var r = this.getFoldAt(t, this.getLine(t).length, 1);
                            r ? this.removeFold(r) : this.addFold("...", i)
                        }
                    }
                }, this.updateFoldWidgets = function (e) {
                    var t = e.start.row, i = e.end.row - t;
                    if (0 === i)this.foldWidgets[t] = null; else if ("remove" == e.action)this.foldWidgets.splice(t, i + 1, null); else {
                        var n = Array(i + 1);
                        n.unshift(t, 1), this.foldWidgets.splice.apply(this.foldWidgets, n)
                    }
                }, this.tokenizerUpdateFoldWidgets = function (e) {
                    var t = e.data;
                    t.first != t.last && this.foldWidgets.length > t.first && this.foldWidgets.splice(t.first, this.foldWidgets.length)
                }
            }

            var r = e("../range").Range, o = e("./fold_line").FoldLine, s = e("./fold").Fold, a = e("../token_iterator").TokenIterator;
            t.Folding = n
        }), ace.define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function (e, t, i) {
            "use strict";
            function n() {
                this.findMatchingBracket = function (e, t) {
                    if (0 == e.column)return null;
                    var i = t || this.getLine(e.row).charAt(e.column - 1);
                    if ("" == i)return null;
                    var n = i.match(/([\(\[\{])|([\)\]\}])/);
                    return n ? n[1] ? this.$findClosingBracket(n[1], e) : this.$findOpeningBracket(n[2], e) : null
                }, this.getBracketRange = function (e) {
                    var t, i = this.getLine(e.row), n = !0, r = i.charAt(e.column - 1), s = r && r.match(/([\(\[\{])|([\)\]\}])/);
                    if (s || (r = i.charAt(e.column), e = {
                            row: e.row,
                            column: e.column + 1
                        }, s = r && r.match(/([\(\[\{])|([\)\]\}])/), n = !1), !s)return null;
                    if (s[1]) {
                        var a = this.$findClosingBracket(s[1], e);
                        if (!a)return null;
                        t = o.fromPoints(e, a), n || (t.end.column++, t.start.column--), t.cursor = t.end
                    } else {
                        var a = this.$findOpeningBracket(s[2], e);
                        if (!a)return null;
                        t = o.fromPoints(a, e), n || (t.start.column++, t.end.column--), t.cursor = t.start
                    }
                    return t
                }, this.$brackets = {
                    ")": "(",
                    "(": ")",
                    "]": "[",
                    "[": "]",
                    "{": "}",
                    "}": "{"
                }, this.$findOpeningBracket = function (e, t, i) {
                    var n = this.$brackets[e], o = 1, s = new r(this, t.row, t.column), a = s.getCurrentToken();
                    if (a || (a = s.stepForward()), a) {
                        i || (i = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+"));
                        for (var l = t.column - s.getCurrentTokenColumn() - 2, c = a.value; ;) {
                            for (; l >= 0;) {
                                var h = c.charAt(l);
                                if (h == n) {
                                    if (o -= 1, 0 == o)return {
                                        row: s.getCurrentTokenRow(),
                                        column: l + s.getCurrentTokenColumn()
                                    }
                                } else h == e && (o += 1);
                                l -= 1
                            }
                            do a = s.stepBackward(); while (a && !i.test(a.type));
                            if (null == a)break;
                            c = a.value, l = c.length - 1
                        }
                        return null
                    }
                }, this.$findClosingBracket = function (e, t, i) {
                    var n = this.$brackets[e], o = 1, s = new r(this, t.row, t.column), a = s.getCurrentToken();
                    if (a || (a = s.stepForward()), a) {
                        i || (i = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+"));
                        for (var l = t.column - s.getCurrentTokenColumn(); ;) {
                            for (var c = a.value, h = c.length; h > l;) {
                                var d = c.charAt(l);
                                if (d == n) {
                                    if (o -= 1, 0 == o)return {
                                        row: s.getCurrentTokenRow(),
                                        column: l + s.getCurrentTokenColumn()
                                    }
                                } else d == e && (o += 1);
                                l += 1
                            }
                            do a = s.stepForward(); while (a && !i.test(a.type));
                            if (null == a)break;
                            l = 0
                        }
                        return null
                    }
                }
            }

            var r = e("../token_iterator").TokenIterator, o = e("../range").Range;
            t.BracketMatch = n
        }), ace.define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function (e, t, i) {
            "use strict";
            var n = e("./lib/oop"), r = e("./lib/lang"), o = e("./config"), s = e("./lib/event_emitter").EventEmitter, a = e("./selection").Selection, l = e("./mode/text").Mode, c = e("./range").Range, h = e("./document").Document, d = e("./background_tokenizer").BackgroundTokenizer, u = e("./search_highlight").SearchHighlight, f = function (e, t) {
                this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.$foldData.toString = function () {
                    return this.join("\n")
                }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == typeof e && e.getLine || (e = new h(e)), this.setDocument(e), this.selection = new a(this), o.resetOptions(this), this.setMode(t), o._signal("session", this)
            };
            (function () {
                function e(e) {
                    return 4352 > e ? !1 : e >= 4352 && 4447 >= e || e >= 4515 && 4519 >= e || e >= 4602 && 4607 >= e || e >= 9001 && 9002 >= e || e >= 11904 && 11929 >= e || e >= 11931 && 12019 >= e || e >= 12032 && 12245 >= e || e >= 12272 && 12283 >= e || e >= 12288 && 12350 >= e || e >= 12353 && 12438 >= e || e >= 12441 && 12543 >= e || e >= 12549 && 12589 >= e || e >= 12593 && 12686 >= e || e >= 12688 && 12730 >= e || e >= 12736 && 12771 >= e || e >= 12784 && 12830 >= e || e >= 12832 && 12871 >= e || e >= 12880 && 13054 >= e || e >= 13056 && 19903 >= e || e >= 19968 && 42124 >= e || e >= 42128 && 42182 >= e || e >= 43360 && 43388 >= e || e >= 44032 && 55203 >= e || e >= 55216 && 55238 >= e || e >= 55243 && 55291 >= e || e >= 63744 && 64255 >= e || e >= 65040 && 65049 >= e || e >= 65072 && 65106 >= e || e >= 65108 && 65126 >= e || e >= 65128 && 65131 >= e || e >= 65281 && 65376 >= e || e >= 65504 && 65510 >= e
                }

                n.implement(this, s), this.setDocument = function (e) {
                    this.doc && this.doc.removeListener("change", this.$onChange), this.doc = e, e.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches()
                }, this.getDocument = function () {
                    return this.doc
                }, this.$resetRowCache = function (e) {
                    if (!e)return this.$docRowCache = [], void(this.$screenRowCache = []);
                    var t = this.$docRowCache.length, i = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
                    t > i && (this.$docRowCache.splice(i, t), this.$screenRowCache.splice(i, t))
                }, this.$getRowCacheIndex = function (e, t) {
                    for (var i = 0, n = e.length - 1; n >= i;) {
                        var r = i + n >> 1, o = e[r];
                        if (t > o)i = r + 1; else {
                            if (!(o > t))return r;
                            n = r - 1
                        }
                    }
                    return i - 1
                }, this.resetCaches = function () {
                    this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0)
                }, this.onChangeFold = function (e) {
                    var t = e.data;
                    this.$resetRowCache(t.start.row)
                }, this.onChange = function (e) {
                    this.$modified = !0, this.$resetRowCache(e.start.row);
                    var t = this.$updateInternalDataOnChange(e);
                    this.$fromUndo || !this.$undoManager || e.ignore || (this.$deltasDoc.push(e), t && 0 != t.length && this.$deltasFold.push({
                        action: "removeFolds",
                        folds: t
                    }), this.$informUndoManager.schedule()), this.bgTokenizer && this.bgTokenizer.$updateOnChange(e), this._signal("change", e)
                }, this.setValue = function (e) {
                    this.doc.setValue(e), this.selection.moveTo(0, 0), this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.setUndoManager(this.$undoManager), this.getUndoManager().reset()
                }, this.getValue = this.toString = function () {
                    return this.doc.getValue()
                }, this.getSelection = function () {
                    return this.selection
                }, this.getState = function (e) {
                    return this.bgTokenizer.getState(e)
                }, this.getTokens = function (e) {
                    return this.bgTokenizer.getTokens(e)
                }, this.getTokenAt = function (e, t) {
                    var i, n = this.bgTokenizer.getTokens(e), r = 0;
                    if (null == t)o = n.length - 1, r = this.getLine(e).length; else for (var o = 0; o < n.length && (r += n[o].value.length, !(r >= t)); o++);
                    return (i = n[o]) ? (i.index = o, i.start = r - i.value.length, i) : null
                }, this.setUndoManager = function (e) {
                    if (this.$undoManager = e, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.$informUndoManager && this.$informUndoManager.cancel(), e) {
                        var t = this;
                        this.$syncInformUndoManager = function () {
                            t.$informUndoManager.cancel(), t.$deltasFold.length && (t.$deltas.push({
                                group: "fold",
                                deltas: t.$deltasFold
                            }), t.$deltasFold = []), t.$deltasDoc.length && (t.$deltas.push({
                                group: "doc",
                                deltas: t.$deltasDoc
                            }), t.$deltasDoc = []), t.$deltas.length > 0 && e.execute({
                                action: "aceupdate",
                                args: [t.$deltas, t],
                                merge: t.mergeUndoDeltas
                            }), t.mergeUndoDeltas = !1, t.$deltas = []
                        }, this.$informUndoManager = r.delayedCall(this.$syncInformUndoManager)
                    }
                }, this.markUndoGroup = function () {
                    this.$syncInformUndoManager && this.$syncInformUndoManager()
                }, this.$defaultUndoManager = {
                    undo: function () {
                    }, redo: function () {
                    }, reset: function () {
                    }
                }, this.getUndoManager = function () {
                    return this.$undoManager || this.$defaultUndoManager
                }, this.getTabString = function () {
                    return this.getUseSoftTabs() ? r.stringRepeat(" ", this.getTabSize()) : "	"
                }, this.setUseSoftTabs = function (e) {
                    this.setOption("useSoftTabs", e)
                }, this.getUseSoftTabs = function () {
                    return this.$useSoftTabs && !this.$mode.$indentWithTabs
                }, this.setTabSize = function (e) {
                    this.setOption("tabSize", e)
                }, this.getTabSize = function () {
                    return this.$tabSize
                }, this.isTabStop = function (e) {
                    return this.$useSoftTabs && e.column % this.$tabSize === 0
                }, this.$overwrite = !1, this.setOverwrite = function (e) {
                    this.setOption("overwrite", e)
                }, this.getOverwrite = function () {
                    return this.$overwrite
                }, this.toggleOverwrite = function () {
                    this.setOverwrite(!this.$overwrite)
                }, this.addGutterDecoration = function (e, t) {
                    this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._signal("changeBreakpoint", {})
                }, this.removeGutterDecoration = function (e, t) {
                    this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._signal("changeBreakpoint", {})
                }, this.getBreakpoints = function () {
                    return this.$breakpoints
                }, this.setBreakpoints = function (e) {
                    this.$breakpoints = [];
                    for (var t = 0; t < e.length; t++)this.$breakpoints[e[t]] = "ace_breakpoint";
                    this._signal("changeBreakpoint", {})
                }, this.clearBreakpoints = function () {
                    this.$breakpoints = [], this._signal("changeBreakpoint", {})
                }, this.setBreakpoint = function (e, t) {
                    void 0 === t && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._signal("changeBreakpoint", {})
                }, this.clearBreakpoint = function (e) {
                    delete this.$breakpoints[e], this._signal("changeBreakpoint", {})
                }, this.addMarker = function (e, t, i, n) {
                    var r = this.$markerId++, o = {
                        range: e,
                        type: i || "line",
                        renderer: "function" == typeof i ? i : null,
                        clazz: t,
                        inFront: !!n,
                        id: r
                    };
                    return n ? (this.$frontMarkers[r] = o, this._signal("changeFrontMarker")) : (this.$backMarkers[r] = o, this._signal("changeBackMarker")), r
                }, this.addDynamicMarker = function (e, t) {
                    if (e.update) {
                        var i = this.$markerId++;
                        return e.id = i, e.inFront = !!t, t ? (this.$frontMarkers[i] = e, this._signal("changeFrontMarker")) : (this.$backMarkers[i] = e, this._signal("changeBackMarker")), e
                    }
                }, this.removeMarker = function (e) {
                    var t = this.$frontMarkers[e] || this.$backMarkers[e];
                    if (t) {
                        var i = t.inFront ? this.$frontMarkers : this.$backMarkers;
                        t && (delete i[e], this._signal(t.inFront ? "changeFrontMarker" : "changeBackMarker"))
                    }
                }, this.getMarkers = function (e) {
                    return e ? this.$frontMarkers : this.$backMarkers
                }, this.highlight = function (e) {
                    if (!this.$searchHighlight) {
                        var t = new u(null, "ace_selected-word", "text");
                        this.$searchHighlight = this.addDynamicMarker(t)
                    }
                    this.$searchHighlight.setRegexp(e)
                }, this.highlightLines = function (e, t, i, n) {
                    "number" != typeof t && (i = t, t = e), i || (i = "ace_step");
                    var r = new c(e, 0, t, 1 / 0);
                    return r.id = this.addMarker(r, i, "fullLine", n), r
                }, this.setAnnotations = function (e) {
                    this.$annotations = e, this._signal("changeAnnotation", {})
                }, this.getAnnotations = function () {
                    return this.$annotations || []
                }, this.clearAnnotations = function () {
                    this.setAnnotations([])
                }, this.$detectNewLine = function (e) {
                    var t = e.match(/^.*?(\r?\n)/m);
                    t ? this.$autoNewLine = t[1] : this.$autoNewLine = "\n"
                }, this.getWordRange = function (e, t) {
                    var i = this.getLine(e), n = !1;
                    if (t > 0 && (n = !!i.charAt(t - 1).match(this.tokenRe)), n || (n = !!i.charAt(t).match(this.tokenRe)), n)var r = this.tokenRe; else if (/^\s+$/.test(i.slice(t - 1, t + 1)))var r = /\s/; else var r = this.nonTokenRe;
                    var o = t;
                    if (o > 0) {
                        do o--; while (o >= 0 && i.charAt(o).match(r));
                        o++
                    }
                    for (var s = t; s < i.length && i.charAt(s).match(r);)s++;
                    return new c(e, o, e, s)
                }, this.getAWordRange = function (e, t) {
                    for (var i = this.getWordRange(e, t), n = this.getLine(i.end.row); n.charAt(i.end.column).match(/[ \t]/);)i.end.column += 1;
                    return i
                }, this.setNewLineMode = function (e) {
                    this.doc.setNewLineMode(e)
                }, this.getNewLineMode = function () {
                    return this.doc.getNewLineMode()
                }, this.setUseWorker = function (e) {
                    this.setOption("useWorker", e)
                }, this.getUseWorker = function () {
                    return this.$useWorker
                }, this.onReloadTokenizer = function (e) {
                    var t = e.data;
                    this.bgTokenizer.start(t.first), this._signal("tokenizerUpdate", e)
                }, this.$modes = {}, this.$mode = null, this.$modeId = null, this.setMode = function (e, t) {
                    if (e && "object" == typeof e) {
                        if (e.getTokenizer)return this.$onChangeMode(e);
                        var i = e, n = i.path
                    } else n = e || "ace/mode/text";
                    return this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new l), this.$modes[n] && !i ? (this.$onChangeMode(this.$modes[n]), void(t && t())) : (this.$modeId = n, o.loadModule(["mode", n], function (e) {
                        return this.$modeId !== n ? t && t() : (this.$modes[n] && !i ? this.$onChangeMode(this.$modes[n]) : e && e.Mode && (e = new e.Mode(i), i || (this.$modes[n] = e, e.$id = n), this.$onChangeMode(e)), void(t && t()))
                    }.bind(this)), void(this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0)))
                }, this.$onChangeMode = function (e, t) {
                    if (t || (this.$modeId = e.$id), this.$mode !== e) {
                        this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
                        var i = e.getTokenizer();
                        if (void 0 !== i.addEventListener) {
                            var n = this.onReloadTokenizer.bind(this);
                            i.addEventListener("update", n)
                        }
                        if (this.bgTokenizer)this.bgTokenizer.setTokenizer(i); else {
                            this.bgTokenizer = new d(i);
                            var r = this;
                            this.bgTokenizer.addEventListener("update", function (e) {
                                r._signal("tokenizerUpdate", e)
                            })
                        }
                        this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, t || (e.attachToSession && e.attachToSession(this), this.$options.wrapMethod.set.call(this, this.$wrapMethod), this.$setFolding(e.foldingRules), this.bgTokenizer.start(0), this._emit("changeMode"))
                    }
                }, this.$stopWorker = function () {
                    this.$worker && (this.$worker.terminate(), this.$worker = null)
                }, this.$startWorker = function () {
                    try {
                        this.$worker = this.$mode.createWorker(this)
                    } catch (e) {
                        o.warn("Could not load worker", e), this.$worker = null
                    }
                }, this.getMode = function () {
                    return this.$mode
                }, this.$scrollTop = 0, this.setScrollTop = function (e) {
                    this.$scrollTop === e || isNaN(e) || (this.$scrollTop = e, this._signal("changeScrollTop", e))
                }, this.getScrollTop = function () {
                    return this.$scrollTop
                }, this.$scrollLeft = 0, this.setScrollLeft = function (e) {
                    this.$scrollLeft === e || isNaN(e) || (this.$scrollLeft = e, this._signal("changeScrollLeft", e))
                }, this.getScrollLeft = function () {
                    return this.$scrollLeft
                }, this.getScreenWidth = function () {
                    return this.$computeWidth(), this.lineWidgets ? Math.max(this.getLineWidgetMaxWidth(), this.screenWidth) : this.screenWidth
                }, this.getLineWidgetMaxWidth = function () {
                    if (null != this.lineWidgetsWidth)return this.lineWidgetsWidth;
                    var e = 0;
                    return this.lineWidgets.forEach(function (t) {
                        t && t.screenWidth > e && (e = t.screenWidth)
                    }), this.lineWidgetWidth = e
                }, this.$computeWidth = function (e) {
                    if (this.$modified || e) {
                        if (this.$modified = !1, this.$useWrapMode)return this.screenWidth = this.$wrapLimit;
                        for (var t = this.doc.getAllLines(), i = this.$rowLengthCache, n = 0, r = 0, o = this.$foldData[r], s = o ? o.start.row : 1 / 0, a = t.length, l = 0; a > l; l++) {
                            if (l > s) {
                                if (l = o.end.row + 1, l >= a)break;
                                o = this.$foldData[r++], s = o ? o.start.row : 1 / 0
                            }
                            null == i[l] && (i[l] = this.$getStringScreenWidth(t[l])[0]), i[l] > n && (n = i[l])
                        }
                        this.screenWidth = n
                    }
                }, this.getLine = function (e) {
                    return this.doc.getLine(e)
                }, this.getLines = function (e, t) {
                    return this.doc.getLines(e, t)
                }, this.getLength = function () {
                    return this.doc.getLength()
                }, this.getTextRange = function (e) {
                    return this.doc.getTextRange(e || this.selection.getRange())
                }, this.insert = function (e, t) {
                    return this.doc.insert(e, t)
                }, this.remove = function (e) {
                    return this.doc.remove(e)
                }, this.removeFullLines = function (e, t) {
                    return this.doc.removeFullLines(e, t)
                }, this.undoChanges = function (e, t) {
                    if (e.length) {
                        this.$fromUndo = !0;
                        for (var i = null, n = e.length - 1; -1 != n; n--) {
                            var r = e[n];
                            "doc" == r.group ? (this.doc.revertDeltas(r.deltas), i = this.$getUndoSelection(r.deltas, !0, i)) : r.deltas.forEach(function (e) {
                                this.addFolds(e.folds)
                            }, this)
                        }
                        return this.$fromUndo = !1, i && this.$undoSelect && !t && this.selection.setSelectionRange(i), i
                    }
                }, this.redoChanges = function (e, t) {
                    if (e.length) {
                        this.$fromUndo = !0;
                        for (var i = null, n = 0; n < e.length; n++) {
                            var r = e[n];
                            "doc" == r.group && (this.doc.applyDeltas(r.deltas), i = this.$getUndoSelection(r.deltas, !1, i))
                        }
                        return this.$fromUndo = !1, i && this.$undoSelect && !t && this.selection.setSelectionRange(i), i
                    }
                }, this.setUndoSelect = function (e) {
                    this.$undoSelect = e
                }, this.$getUndoSelection = function (e, t, i) {
                    function n(e) {
                        return t ? "insert" !== e.action : "insert" === e.action
                    }

                    var r, o, s = e[0], a = !1;
                    n(s) ? (r = c.fromPoints(s.start, s.end), a = !0) : (r = c.fromPoints(s.start, s.start), a = !1);
                    for (var l = 1; l < e.length; l++)s = e[l], n(s) ? (o = s.start, -1 == r.compare(o.row, o.column) && r.setStart(o), o = s.end, 1 == r.compare(o.row, o.column) && r.setEnd(o), a = !0) : (o = s.start, -1 == r.compare(o.row, o.column) && (r = c.fromPoints(s.start, s.start)), a = !1);
                    if (null != i) {
                        0 === c.comparePoints(i.start, r.start) && (i.start.column += r.end.column - r.start.column, i.end.column += r.end.column - r.start.column);
                        var h = i.compareRange(r);
                        1 == h ? r.setStart(i.start) : -1 == h && r.setEnd(i.end)
                    }
                    return r
                }, this.replace = function (e, t) {
                    return this.doc.replace(e, t)
                }, this.moveText = function (e, t, i) {
                    var n = this.getTextRange(e), r = this.getFoldsInRange(e), o = c.fromPoints(t, t);
                    if (!i) {
                        this.remove(e);
                        var s = e.start.row - e.end.row, a = s ? -e.end.column : e.start.column - e.end.column;
                        a && (o.start.row == e.end.row && o.start.column > e.end.column && (o.start.column += a), o.end.row == e.end.row && o.end.column > e.end.column && (o.end.column += a)), s && o.start.row >= e.end.row && (o.start.row += s, o.end.row += s)
                    }
                    if (o.end = this.insert(o.start, n), r.length) {
                        var l = e.start, h = o.start, s = h.row - l.row, a = h.column - l.column;
                        this.addFolds(r.map(function (e) {
                            return e = e.clone(), e.start.row == l.row && (e.start.column += a), e.end.row == l.row && (e.end.column += a), e.start.row += s, e.end.row += s, e
                        }))
                    }
                    return o
                }, this.indentRows = function (e, t, i) {
                    i = i.replace(/\t/g, this.getTabString());
                    for (var n = e; t >= n; n++)this.doc.insertInLine({row: n, column: 0}, i)
                }, this.outdentRows = function (e) {
                    for (var t = e.collapseRows(), i = new c(0, 0, 0, 0), n = this.getTabSize(), r = t.start.row; r <= t.end.row; ++r) {
                        var o = this.getLine(r);
                        i.start.row = r, i.end.row = r;
                        for (var s = 0; n > s && " " == o.charAt(s); ++s);
                        n > s && "	" == o.charAt(s) ? (i.start.column = s, i.end.column = s + 1) : (i.start.column = 0, i.end.column = s), this.remove(i)
                    }
                }, this.$moveLines = function (e, t, i) {
                    if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), 0 > i) {
                        var n = this.getRowFoldStart(e + i);
                        if (0 > n)return 0;
                        var r = n - e
                    } else if (i > 0) {
                        var n = this.getRowFoldEnd(t + i);
                        if (n > this.doc.getLength() - 1)return 0;
                        var r = n - t
                    } else {
                        e = this.$clipRowToDocument(e), t = this.$clipRowToDocument(t);
                        var r = t - e + 1
                    }
                    var o = new c(e, 0, t, Number.MAX_VALUE), s = this.getFoldsInRange(o).map(function (e) {
                        return e = e.clone(), e.start.row += r, e.end.row += r, e
                    }), a = 0 == i ? this.doc.getLines(e, t) : this.doc.removeFullLines(e, t);
                    return this.doc.insertFullLines(e + r, a), s.length && this.addFolds(s), r
                }, this.moveLinesUp = function (e, t) {
                    return this.$moveLines(e, t, -1)
                }, this.moveLinesDown = function (e, t) {
                    return this.$moveLines(e, t, 1)
                }, this.duplicateLines = function (e, t) {
                    return this.$moveLines(e, t, 0)
                }, this.$clipRowToDocument = function (e) {
                    return Math.max(0, Math.min(e, this.doc.getLength() - 1))
                }, this.$clipColumnToRow = function (e, t) {
                    return 0 > t ? 0 : Math.min(this.doc.getLine(e).length, t)
                }, this.$clipPositionToDocument = function (e, t) {
                    if (t = Math.max(0, t), 0 > e)e = 0, t = 0; else {
                        var i = this.doc.getLength();
                        e >= i ? (e = i - 1, t = this.doc.getLine(i - 1).length) : t = Math.min(this.doc.getLine(e).length, t)
                    }
                    return {row: e, column: t}
                }, this.$clipRangeToDocument = function (e) {
                    e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
                    var t = this.doc.getLength() - 1;
                    return e.end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e
                }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
                    min: null,
                    max: null
                }, this.setUseWrapMode = function (e) {
                    if (e != this.$useWrapMode) {
                        if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
                            var t = this.getLength();
                            this.$wrapData = Array(t), this.$updateWrapData(0, t - 1)
                        }
                        this._signal("changeWrapMode")
                    }
                }, this.getUseWrapMode = function () {
                    return this.$useWrapMode
                }, this.setWrapLimitRange = function (e, t) {
                    (this.$wrapLimitRange.min !== e || this.$wrapLimitRange.max !== t) && (this.$wrapLimitRange = {
                        min: e,
                        max: t
                    }, this.$modified = !0, this.$useWrapMode && this._signal("changeWrapMode"))
                }, this.adjustWrapLimit = function (e, t) {
                    var i = this.$wrapLimitRange;
                    i.max < 0 && (i = {min: t, max: t});
                    var n = this.$constrainWrapLimit(e, i.min, i.max);
                    return n != this.$wrapLimit && n > 1 ? (this.$wrapLimit = n, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._signal("changeWrapLimit")), !0) : !1
                }, this.$constrainWrapLimit = function (e, t, i) {
                    return t && (e = Math.max(t, e)), i && (e = Math.min(i, e)), e
                }, this.getWrapLimit = function () {
                    return this.$wrapLimit
                },this.setWrapLimit = function (e) {
                    this.setWrapLimitRange(e, e)
                },this.getWrapLimitRange = function () {
                    return {min: this.$wrapLimitRange.min, max: this.$wrapLimitRange.max}
                },this.$updateInternalDataOnChange = function (e) {
                    var t = this.$useWrapMode, i = e.action, n = e.start, r = e.end, o = n.row, s = r.row, a = s - o, l = null;
                    if (this.$updating = !0, 0 != a)if ("remove" === i) {
                        this[t ? "$wrapData" : "$rowLengthCache"].splice(o, a);
                        var c = this.$foldData;
                        l = this.getFoldsInRange(e), this.removeFolds(l);
                        var h = this.getFoldLine(r.row), d = 0;
                        if (h) {
                            h.addRemoveChars(r.row, r.column, n.column - r.column), h.shiftRow(-a);
                            var u = this.getFoldLine(o);
                            u && u !== h && (u.merge(h), h = u), d = c.indexOf(h) + 1
                        }
                        for (d; d < c.length; d++) {
                            var h = c[d];
                            h.start.row >= r.row && h.shiftRow(-a)
                        }
                        s = o
                    } else {
                        var f = Array(a);
                        f.unshift(o, 0);
                        var p = t ? this.$wrapData : this.$rowLengthCache;
                        p.splice.apply(p, f);
                        var c = this.$foldData, h = this.getFoldLine(o), d = 0;
                        if (h) {
                            var m = h.range.compareInside(n.row, n.column);
                            0 == m ? (h = h.split(n.row, n.column), h && (h.shiftRow(a), h.addRemoveChars(s, 0, r.column - n.column))) : -1 == m && (h.addRemoveChars(o, 0, r.column - n.column), h.shiftRow(a)), d = c.indexOf(h) + 1
                        }
                        for (d; d < c.length; d++) {
                            var h = c[d];
                            h.start.row >= o && h.shiftRow(a)
                        }
                    } else {
                        a = Math.abs(e.start.column - e.end.column), "remove" === i && (l = this.getFoldsInRange(e), this.removeFolds(l), a = -a);
                        var h = this.getFoldLine(o);
                        h && h.addRemoveChars(o, n.column, a)
                    }
                    return t && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, t ? this.$updateWrapData(o, s) : this.$updateRowLengthCache(o, s), l
                },this.$updateRowLengthCache = function (e, t, i) {
                    this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null
                },this.$updateWrapData = function (e, t) {
                    var i, n, r = this.doc.getAllLines(), o = this.getTabSize(), s = this.$wrapData, l = this.$wrapLimit, c = e;
                    for (t = Math.min(t, r.length - 1); t >= c;)n = this.getFoldLine(c, n), n ? (i = [], n.walk(function (e, t, n, o) {
                        var s;
                        if (null != e) {
                            s = this.$getDisplayTokens(e, i.length), s[0] = a;
                            for (var l = 1; l < s.length; l++)s[l] = h
                        } else s = this.$getDisplayTokens(r[t].substring(o, n), i.length);
                        i = i.concat(s)
                    }.bind(this), n.end.row, r[n.end.row].length + 1), s[n.start.row] = this.$computeWrapSplits(i, l, o), c = n.end.row + 1) : (i = this.$getDisplayTokens(r[c]), s[c] = this.$computeWrapSplits(i, l, o), c++)
                };
                var t = 1, i = 2, a = 3, h = 4, f = 9, p = 10, m = 11, g = 12;
                this.$computeWrapSplits = function (e, t, n) {
                    function r() {
                        var t = 0;
                        if (0 === w)return t;
                        if (v)for (var i = 0; i < e.length; i++) {
                            var r = e[i];
                            if (r == p)t += 1; else {
                                if (r != m) {
                                    if (r == g)continue;
                                    break
                                }
                                t += n
                            }
                        }
                        return u && v !== !1 && (t += n), Math.min(t, w)
                    }

                    function o(t) {
                        var i = e.slice(c, t), n = i.length;
                        i.join("").replace(/12/g, function () {
                            n -= 1
                        }).replace(/2/g, function () {
                            n -= 1
                        }), s.length || (y = r(), s.indent = y), d += n, s.push(d), c = t
                    }

                    if (0 == e.length)return [];
                    for (var s = [], l = e.length, c = 0, d = 0, u = this.$wrapAsCode, v = this.$indentedSoftWrap, w = t <= Math.max(2 * n, 8) || v === !1 ? 0 : Math.floor(t / 2), y = 0; l - c > t - y;) {
                        var A = c + t - y;
                        if (e[A - 1] >= p && e[A] >= p)o(A); else if (e[A] != a && e[A] != h) {
                            for (var E = Math.max(A - (t - (t >> 2)), c - 1); A > E && e[A] < a;)A--;
                            if (u) {
                                for (; A > E && e[A] < a;)A--;
                                for (; A > E && e[A] == f;)A--
                            } else for (; A > E && e[A] < p;)A--;
                            A > E ? o(++A) : (A = c + t, e[A] == i && A--, o(A - y))
                        } else {
                            for (A; A != c - 1 && e[A] != a; A--);
                            if (A > c) {
                                o(A);
                                continue
                            }
                            for (A = c + t; A < e.length && e[A] == h; A++);
                            if (A == e.length)break;
                            o(A)
                        }
                    }
                    return s
                }, this.$getDisplayTokens = function (n, r) {
                    var o, s = [];
                    r = r || 0;
                    for (var a = 0; a < n.length; a++) {
                        var l = n.charCodeAt(a);
                        if (9 == l) {
                            o = this.getScreenTabSize(s.length + r), s.push(m);
                            for (var c = 1; o > c; c++)s.push(g)
                        } else 32 == l ? s.push(p) : l > 39 && 48 > l || l > 57 && 64 > l ? s.push(f) : l >= 4352 && e(l) ? s.push(t, i) : s.push(t)
                    }
                    return s
                }, this.$getStringScreenWidth = function (t, i, n) {
                    if (0 == i)return [0, 0];
                    null == i && (i = 1 / 0), n = n || 0;
                    var r, o;
                    for (o = 0; o < t.length && (r = t.charCodeAt(o), n += 9 == r ? this.getScreenTabSize(n) : r >= 4352 && e(r) ? 2 : 1, !(n > i)); o++);
                    return [n, o]
                }, this.lineWidgets = null, this.getRowLength = function (e) {
                    if (this.lineWidgets)var t = this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0; else t = 0;
                    return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t
                }, this.getRowLineCount = function (e) {
                    return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 : 1
                }, this.getRowWrapIndent = function (e) {
                    if (this.$useWrapMode) {
                        var t = this.screenToDocumentPosition(e, Number.MAX_VALUE), i = this.$wrapData[t.row];
                        return i.length && i[0] < t.column ? i.indent : 0
                    }
                    return 0
                }, this.getScreenLastRowColumn = function (e) {
                    var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
                    return this.documentToScreenColumn(t.row, t.column)
                }, this.getDocumentLastRowColumn = function (e, t) {
                    var i = this.documentToScreenRow(e, t);
                    return this.getScreenLastRowColumn(i)
                }, this.getDocumentLastRowColumnPosition = function (e, t) {
                    var i = this.documentToScreenRow(e, t);
                    return this.screenToDocumentPosition(i, Number.MAX_VALUE / 10)
                }, this.getRowSplitData = function (e) {
                    return this.$useWrapMode ? this.$wrapData[e] : void 0
                }, this.getScreenTabSize = function (e) {
                    return this.$tabSize - e % this.$tabSize
                }, this.screenToDocumentRow = function (e, t) {
                    return this.screenToDocumentPosition(e, t).row
                }, this.screenToDocumentColumn = function (e, t) {
                    return this.screenToDocumentPosition(e, t).column
                }, this.screenToDocumentPosition = function (e, t) {
                    if (0 > e)return {row: 0, column: 0};
                    var i, n, r = 0, o = 0, s = 0, a = 0, l = this.$screenRowCache, c = this.$getRowCacheIndex(l, e), h = l.length;
                    if (h && c >= 0)var s = l[c], r = this.$docRowCache[c], d = e > l[h - 1]; else var d = !h;
                    for (var u = this.getLength() - 1, f = this.getNextFoldLine(r), p = f ? f.start.row : 1 / 0; e >= s && (a = this.getRowLength(r), !(s + a > e || r >= u));)s += a, r++, r > p && (r = f.end.row + 1, f = this.getNextFoldLine(r, f), p = f ? f.start.row : 1 / 0), d && (this.$docRowCache.push(r), this.$screenRowCache.push(s));
                    if (f && f.start.row <= r)i = this.getFoldDisplayLine(f), r = f.start.row; else {
                        if (e >= s + a || r > u)return {row: u, column: this.getLine(u).length};
                        i = this.getLine(r), f = null
                    }
                    var m = 0;
                    if (this.$useWrapMode) {
                        var g = this.$wrapData[r];
                        if (g) {
                            var v = Math.floor(e - s);
                            n = g[v], v > 0 && g.length && (m = g.indent, o = g[v - 1] || g[g.length - 1], i = i.substring(o))
                        }
                    }
                    return o += this.$getStringScreenWidth(i, t - m)[1], this.$useWrapMode && o >= n && (o = n - 1), f ? f.idxToPosition(o) : {
                        row: r,
                        column: o
                    }
                }, this.documentToScreenPosition = function (e, t) {
                    if ("undefined" == typeof t)var i = this.$clipPositionToDocument(e.row, e.column); else i = this.$clipPositionToDocument(e, t);
                    e = i.row, t = i.column;
                    var n = 0, r = null, o = null;
                    o = this.getFoldAt(e, t, 1), o && (e = o.start.row, t = o.start.column);
                    var s, a = 0, l = this.$docRowCache, c = this.$getRowCacheIndex(l, e), h = l.length;
                    if (h && c >= 0)var a = l[c], n = this.$screenRowCache[c], d = e > l[h - 1]; else var d = !h;
                    for (var u = this.getNextFoldLine(a), f = u ? u.start.row : 1 / 0; e > a;) {
                        if (a >= f) {
                            if (s = u.end.row + 1, s > e)break;
                            u = this.getNextFoldLine(s, u), f = u ? u.start.row : 1 / 0
                        } else s = a + 1;
                        n += this.getRowLength(a), a = s, d && (this.$docRowCache.push(a), this.$screenRowCache.push(n))
                    }
                    var p = "";
                    u && a >= f ? (p = this.getFoldDisplayLine(u, e, t), r = u.start.row) : (p = this.getLine(e).substring(0, t), r = e);
                    var m = 0;
                    if (this.$useWrapMode) {
                        var g = this.$wrapData[r];
                        if (g) {
                            for (var v = 0; p.length >= g[v];)n++, v++;
                            p = p.substring(g[v - 1] || 0, p.length), m = v > 0 ? g.indent : 0
                        }
                    }
                    return {row: n, column: m + this.$getStringScreenWidth(p)[0]}
                }, this.documentToScreenColumn = function (e, t) {
                    return this.documentToScreenPosition(e, t).column
                }, this.documentToScreenRow = function (e, t) {
                    return this.documentToScreenPosition(e, t).row
                }, this.getScreenLength = function () {
                    var e = 0, t = null;
                    if (this.$useWrapMode)for (var i = this.$wrapData.length, n = 0, r = 0, t = this.$foldData[r++], o = t ? t.start.row : 1 / 0; i > n;) {
                        var s = this.$wrapData[n];
                        e += s ? s.length + 1 : 1, n++, n > o && (n = t.end.row + 1, t = this.$foldData[r++], o = t ? t.start.row : 1 / 0)
                    } else {
                        e = this.getLength();
                        for (var a = this.$foldData, r = 0; r < a.length; r++)t = a[r], e -= t.end.row - t.start.row
                    }
                    return this.lineWidgets && (e += this.$getWidgetScreenLength()), e
                }, this.$setFontMetrics = function (e) {
                    this.$enableVarChar && (this.$getStringScreenWidth = function (t, i, n) {
                        if (0 === i)return [0, 0];
                        i || (i = 1 / 0), n = n || 0;
                        var r, o;
                        for (o = 0; o < t.length && (r = t.charAt(o), n += "	" === r ? this.getScreenTabSize(n) : e.getCharacterWidth(r), !(n > i)); o++);
                        return [n, o]
                    })
                }, this.destroy = function () {
                    this.bgTokenizer && (this.bgTokenizer.setDocument(null), this.bgTokenizer = null), this.$stopWorker()
                }
            }).call(f.prototype), e("./edit_session/folding").Folding.call(f.prototype), e("./edit_session/bracket_match").BracketMatch.call(f.prototype), o.defineOptions(f.prototype, "session", {
                wrap: {
                    set: function (e) {
                        if (e && "off" != e ? "free" == e ? e = !0 : "printMargin" == e ? e = -1 : "string" == typeof e && (e = parseInt(e, 10) || !1) : e = !1, this.$wrap != e)if (this.$wrap = e, e) {
                            var t = "number" == typeof e ? e : null;
                            this.setWrapLimitRange(t, t), this.setUseWrapMode(!0)
                        } else this.setUseWrapMode(!1)
                    }, get: function () {
                        return this.getUseWrapMode() ? -1 == this.$wrap ? "printMargin" : this.getWrapLimitRange().min ? this.$wrap : "free" : "off"
                    }, handlesSet: !0
                }, wrapMethod: {
                    set: function (e) {
                        e = "auto" == e ? "text" != this.$mode.type : "text" != e, e != this.$wrapAsCode && (this.$wrapAsCode = e, this.$useWrapMode && (this.$modified = !0, this.$resetRowCache(0), this.$updateWrapData(0, this.getLength() - 1)))
                    }, initialValue: "auto"
                }, indentedSoftWrap: {initialValue: !0}, firstLineNumber: {
                    set: function () {
                        this._signal("changeBreakpoint")
                    }, initialValue: 1
                }, useWorker: {
                    set: function (e) {
                        this.$useWorker = e, this.$stopWorker(), e && this.$startWorker()
                    }, initialValue: !0
                }, useSoftTabs: {initialValue: !0}, tabSize: {
                    set: function (e) {
                        isNaN(e) || this.$tabSize === e || (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._signal("changeTabSize"))
                    }, initialValue: 4, handlesSet: !0
                }, overwrite: {
                    set: function (e) {
                        this._signal("changeOverwrite")
                    }, initialValue: !1
                }, newLineMode: {
                    set: function (e) {
                        this.doc.setNewLineMode(e)
                    }, get: function () {
                        return this.doc.getNewLineMode()
                    }, handlesSet: !0
                }, mode: {
                    set: function (e) {
                        this.setMode(e)
                    }, get: function () {
                        return this.$modeId
                    }
                }
            }), t.EditSession = f
        }), ace.define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (e, t, i) {
            "use strict";
            var n = e("./lib/lang"), r = e("./lib/oop"), o = e("./range").Range, s = function () {
                this.$options = {}
            };
            (function () {
                this.set = function (e) {
                    return r.mixin(this.$options, e), this
                }, this.getOptions = function () {
                    return n.copyObject(this.$options)
                }, this.setOptions = function (e) {
                    this.$options = e
                }, this.find = function (e) {
                    var t = this.$options, i = this.$matchIterator(e, t);
                    if (!i)return !1;
                    var n = null;
                    return i.forEach(function (e, i, r) {
                        if (e.start)n = e; else {
                            var s = e.offset + (r || 0);
                            if (n = new o(i, s, i, s + e.length), !e.length && t.start && t.start.start && 0 != t.skipCurrent && n.isEqual(t.start))return n = null, !1
                        }
                        return !0
                    }), n
                }, this.findAll = function (e) {
                    var t = this.$options;
                    if (!t.needle)return [];
                    this.$assembleRegExp(t);
                    var i = t.range, r = i ? e.getLines(i.start.row, i.end.row) : e.doc.getAllLines(), s = [], a = t.re;
                    if (t.$isMultiLine) {
                        var l, c = a.length, h = r.length - c;
                        e:for (var d = a.offset || 0; h >= d; d++) {
                            for (var u = 0; c > u; u++)if (-1 == r[d + u].search(a[u]))continue e;
                            var f = r[d], p = r[d + c - 1], m = f.length - f.match(a[0])[0].length, g = p.match(a[c - 1])[0].length;
                            l && l.end.row === d && l.end.column > m || (s.push(l = new o(d, m, d + c - 1, g)), c > 2 && (d = d + c - 2))
                        }
                    } else for (var v = 0; v < r.length; v++)for (var w = n.getMatchOffsets(r[v], a), u = 0; u < w.length; u++) {
                        var y = w[u];
                        s.push(new o(v, y.offset, v, y.offset + y.length))
                    }
                    if (i) {
                        for (var A = i.start.column, E = i.start.column, v = 0, u = s.length - 1; u > v && s[v].start.column < A && s[v].start.row == i.start.row;)v++;
                        for (; u > v && s[u].end.column > E && s[u].end.row == i.end.row;)u--;
                        for (s = s.slice(v, u + 1), v = 0, u = s.length; u > v; v++)s[v].start.row += i.start.row, s[v].end.row += i.start.row
                    }
                    return s
                }, this.replace = function (e, t) {
                    var i = this.$options, n = this.$assembleRegExp(i);
                    if (i.$isMultiLine)return t;
                    if (n) {
                        var r = n.exec(e);
                        if (!r || r[0].length != e.length)return null;
                        if (t = e.replace(n, t), i.preserveCase) {
                            t = t.split("");
                            for (var o = Math.min(e.length, e.length); o--;) {
                                var s = e[o];
                                s && s.toLowerCase() != s ? t[o] = t[o].toUpperCase() : t[o] = t[o].toLowerCase()
                            }
                            t = t.join("")
                        }
                        return t
                    }
                }, this.$matchIterator = function (e, t) {
                    var i = this.$assembleRegExp(t);
                    if (!i)return !1;
                    var r;
                    if (t.$isMultiLine)var s = i.length, a = function (t, n, a) {
                        var l = t.search(i[0]);
                        if (-1 != l) {
                            for (var c = 1; s > c; c++)if (t = e.getLine(n + c), -1 == t.search(i[c]))return;
                            var h = t.match(i[s - 1])[0].length, d = new o(n, l, n + s - 1, h);
                            return 1 == i.offset ? (d.start.row--, d.start.column = Number.MAX_VALUE) : a && (d.start.column += a), r(d) ? !0 : void 0
                        }
                    }; else if (t.backwards)var a = function (e, t, o) {
                        for (var s = n.getMatchOffsets(e, i), a = s.length - 1; a >= 0; a--)if (r(s[a], t, o))return !0
                    }; else var a = function (e, t, o) {
                        for (var s = n.getMatchOffsets(e, i), a = 0; a < s.length; a++)if (r(s[a], t, o))return !0
                    };
                    var l = this.$lineIterator(e, t);
                    return {
                        forEach: function (e) {
                            r = e, l.forEach(a)
                        }
                    }
                }, this.$assembleRegExp = function (e, t) {
                    if (e.needle instanceof RegExp)return e.re = e.needle;
                    var i = e.needle;
                    if (!e.needle)return e.re = !1;
                    e.regExp || (i = n.escapeRegExp(i)), e.wholeWord && (i = "\\b" + i + "\\b");
                    var r = e.caseSensitive ? "gm" : "gmi";
                    if (e.$isMultiLine = !t && /[\n\r]/.test(i), e.$isMultiLine)return e.re = this.$assembleMultilineRegExp(i, r);
                    try {
                        var o = new RegExp(i, r)
                    } catch (s) {
                        o = !1
                    }
                    return e.re = o
                }, this.$assembleMultilineRegExp = function (e, t) {
                    for (var i = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), n = [], r = 0; r < i.length; r++)try {
                        n.push(new RegExp(i[r], t))
                    } catch (o) {
                        return !1
                    }
                    return "" == i[0] ? (n.shift(), n.offset = 1) : n.offset = 0, n
                }, this.$lineIterator = function (e, t) {
                    var i = 1 == t.backwards, n = 0 != t.skipCurrent, r = t.range, o = t.start;
                    o || (o = r ? r[i ? "end" : "start"] : e.selection.getRange()), o.start && (o = o[n != i ? "end" : "start"]);
                    var s = r ? r.start.row : 0, a = r ? r.end.row : e.getLength() - 1, l = i ? function (i) {
                        var n = o.row, r = e.getLine(n).substring(0, o.column);
                        if (!i(r, n)) {
                            for (n--; n >= s; n--)if (i(e.getLine(n), n))return;
                            if (0 != t.wrap)for (n = a, s = o.row; n >= s; n--)if (i(e.getLine(n), n))return
                        }
                    } : function (i) {
                        var n = o.row, r = e.getLine(n).substr(o.column);
                        if (!i(r, n, o.column)) {
                            for (n += 1; a >= n; n++)if (i(e.getLine(n), n))return;
                            if (0 != t.wrap)for (n = s, a = o.row; a >= n; n++)if (i(e.getLine(n), n))return
                        }
                    };
                    return {forEach: l}
                }
            }).call(s.prototype), t.Search = s
        }), ace.define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function (e, t, i) {
            "use strict";
            function n(e, t) {
                this.platform = t || (s.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.addCommands(e), this.$singleCommand = !0
            }

            function r(e, t) {
                n.call(this, e, t), this.$singleCommand = !1
            }

            var o = e("../lib/keys"), s = e("../lib/useragent"), a = o.KEY_MODS;
            r.prototype = n.prototype, function () {
                function e(e) {
                    return "object" == typeof e && e.bindKey && e.bindKey.position || 0
                }

                this.addCommand = function (e) {
                    this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e)
                }, this.removeCommand = function (e, t) {
                    var i = e && ("string" == typeof e ? e : e.name);
                    e = this.commands[i], t || delete this.commands[i];
                    var n = this.commandKeyBinding;
                    for (var r in n) {
                        var o = n[r];
                        if (o == e)delete n[r]; else if (Array.isArray(o)) {
                            var s = o.indexOf(e);
                            -1 != s && (o.splice(s, 1), 1 == o.length && (n[r] = o[0]))
                        }
                    }
                }, this.bindKey = function (e, t, i) {
                    return "object" == typeof e && (void 0 == i && (i = e.position), e = e[this.platform]), e ? "function" == typeof t ? this.addCommand({
                        exec: t,
                        bindKey: e,
                        name: t.name || e
                    }) : void e.split("|").forEach(function (e) {
                        var n = "";
                        if (-1 != e.indexOf(" ")) {
                            var r = e.split(/\s+/);
                            e = r.pop(), r.forEach(function (e) {
                                var t = this.parseKeys(e), i = a[t.hashId] + t.key;
                                n += (n ? " " : "") + i, this._addCommandToBinding(n, "chainKeys")
                            }, this), n += " "
                        }
                        var o = this.parseKeys(e), s = a[o.hashId] + o.key;
                        this._addCommandToBinding(n + s, t, i)
                    }, this) : void 0
                }, this._addCommandToBinding = function (t, i, n) {
                    var r, o = this.commandKeyBinding;
                    if (i)if (!o[t] || this.$singleCommand)o[t] = i; else {
                        Array.isArray(o[t]) ? -1 != (r = o[t].indexOf(i)) && o[t].splice(r, 1) : o[t] = [o[t]], "number" != typeof n && (n = n || i.isDefault ? -100 : e(i));
                        var s = o[t];
                        for (r = 0; r < s.length; r++) {
                            var a = s[r], l = e(a);
                            if (l > n)break
                        }
                        s.splice(r, 0, i)
                    } else delete o[t]
                }, this.addCommands = function (e) {
                    e && Object.keys(e).forEach(function (t) {
                        var i = e[t];
                        if (i) {
                            if ("string" == typeof i)return this.bindKey(i, t);
                            "function" == typeof i && (i = {exec: i}), "object" == typeof i && (i.name || (i.name = t), this.addCommand(i))
                        }
                    }, this)
                }, this.removeCommands = function (e) {
                    Object.keys(e).forEach(function (t) {
                        this.removeCommand(e[t])
                    }, this)
                }, this.bindKeys = function (e) {
                    Object.keys(e).forEach(function (t) {
                        this.bindKey(t, e[t])
                    }, this)
                }, this._buildKeyHash = function (e) {
                    this.bindKey(e.bindKey, e)
                }, this.parseKeys = function (e) {
                    var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function (e) {
                        return e
                    }), i = t.pop(), n = o[i];
                    if (o.FUNCTION_KEYS[n])i = o.FUNCTION_KEYS[n].toLowerCase(); else {
                        if (!t.length)return {key: i, hashId: -1};
                        if (1 == t.length && "shift" == t[0])return {key: i.toUpperCase(), hashId: -1}
                    }
                    for (var r = 0, s = t.length; s--;) {
                        var a = o.KEY_MODS[t[s]];
                        if (null == a)return "undefined" != typeof console && console.error("invalid modifier " + t[s] + " in " + e), !1;
                        r |= a
                    }
                    return {key: i, hashId: r}
                }, this.findKeyCommand = function (e, t) {
                    var i = a[e] + t;
                    return this.commandKeyBinding[i]
                }, this.handleKeyboard = function (e, t, i, n) {
                    if (!(0 > n)) {
                        var r = a[t] + i, o = this.commandKeyBinding[r];
                        return e.$keyChain && (e.$keyChain += " " + r, o = this.commandKeyBinding[e.$keyChain] || o), !o || "chainKeys" != o && "chainKeys" != o[o.length - 1] ? (e.$keyChain && (t && 4 != t || 1 != i.length ? (-1 == t || n > 0) && (e.$keyChain = "") : e.$keyChain = e.$keyChain.slice(0, -r.length - 1)), {command: o}) : (e.$keyChain = e.$keyChain || r, {command: "null"})
                    }
                }, this.getStatusText = function (e, t) {
                    return t.$keyChain || ""
                }
            }.call(n.prototype), t.HashHandler = n, t.MultiHashHandler = r
        }), ace.define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function (e, t, i) {
            "use strict";
            var n = e("../lib/oop"), r = e("../keyboard/hash_handler").MultiHashHandler, o = e("../lib/event_emitter").EventEmitter, s = function (e, t) {
                r.call(this, t, e), this.byName = this.commands, this.setDefaultHandler("exec", function (e) {
                    return e.command.exec(e.editor, e.args || {})
                })
            };
            n.inherits(s, r), function () {
                n.implement(this, o), this.exec = function (e, t, i) {
                    if (Array.isArray(e)) {
                        for (var n = e.length; n--;)if (this.exec(e[n], t, i))return !0;
                        return !1
                    }
                    if ("string" == typeof e && (e = this.commands[e]), !e)return !1;
                    if (t && t.$readOnly && !e.readOnly)return !1;
                    var r = {editor: t, command: e, args: i};
                    return r.returnValue = this._emit("exec", r), this._signal("afterExec", r), r.returnValue === !1 ? !1 : !0
                }, this.toggleRecording = function (e) {
                    return this.$inReplay ? void 0 : (e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function (e) {
                        this.macro.push([e.command, e.args])
                    }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0))
                }, this.replay = function (e) {
                    if (!this.$inReplay && this.macro) {
                        if (this.recording)return this.toggleRecording(e);
                        try {
                            this.$inReplay = !0, this.macro.forEach(function (t) {
                                "string" == typeof t ? this.exec(t, e) : this.exec(t[0], e, t[1])
                            }, this)
                        } finally {
                            this.$inReplay = !1
                        }
                    }
                }, this.trimMacro = function (e) {
                    return e.map(function (e) {
                        return "string" != typeof e[0] && (e[0] = e[0].name), e[1] || (e = e[0]), e
                    })
                }
            }.call(s.prototype), t.CommandManager = s
        }), ace.define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"], function (e, t, i) {
            "use strict";
            function n(e, t) {
                return {win: e, mac: t}
            }

            var r = e("../lib/lang"), o = e("../config"), s = e("../range").Range;
            t.commands = [{
                name: "showSettingsMenu", bindKey: n("Ctrl-,", "Command-,"), exec: function (e) {
                    o.loadModule("ace/ext/settings_menu", function (t) {
                        t.init(e), e.showSettingsMenu()
                    })
                }, readOnly: !0
            }, {
                name: "goToNextError", bindKey: n("Alt-E", "Ctrl-E"), exec: function (e) {
                    o.loadModule("ace/ext/error_marker", function (t) {
                        t.showErrorMarker(e, 1)
                    })
                }, scrollIntoView: "animate", readOnly: !0
            }, {
                name: "goToPreviousError", bindKey: n("Alt-Shift-E", "Ctrl-Shift-E"), exec: function (e) {
                    o.loadModule("ace/ext/error_marker", function (t) {
                        t.showErrorMarker(e, -1)
                    })
                }, scrollIntoView: "animate", readOnly: !0
            }, {
                name: "selectall", bindKey: n("Ctrl-A", "Command-A"), exec: function (e) {
                    e.selectAll()
                }, readOnly: !0
            }, {
                name: "centerselection", bindKey: n(null, "Ctrl-L"), exec: function (e) {
                    e.centerSelection()
                }, readOnly: !0
            }, {
                name: "gotoline", bindKey: n("Ctrl-L", "Command-L"), exec: function (e) {
                    var t = parseInt(prompt("Enter line number:"), 10);
                    isNaN(t) || e.gotoLine(t)
                }, readOnly: !0
            }, {
                name: "fold", bindKey: n("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"), exec: function (e) {
                    e.session.toggleFold(!1)
                }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0
            }, {
                name: "unfold",
                bindKey: n("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
                exec: function (e) {
                    e.session.toggleFold(!0)
                },
                multiSelectAction: "forEach",
                scrollIntoView: "center",
                readOnly: !0
            }, {
                name: "toggleFoldWidget", bindKey: n("F2", "F2"), exec: function (e) {
                    e.session.toggleFoldWidget()
                }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0
            }, {
                name: "toggleParentFoldWidget", bindKey: n("Alt-F2", "Alt-F2"), exec: function (e) {
                    e.session.toggleFoldWidget(!0)
                }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0
            }, {
                name: "foldall", bindKey: n(null, "Ctrl-Command-Option-0"), exec: function (e) {
                    e.session.foldAll()
                }, scrollIntoView: "center", readOnly: !0
            }, {
                name: "foldOther", bindKey: n("Alt-0", "Command-Option-0"), exec: function (e) {
                    e.session.foldAll(), e.session.unfold(e.selection.getAllRanges())
                }, scrollIntoView: "center", readOnly: !0
            }, {
                name: "unfoldall", bindKey: n("Alt-Shift-0", "Command-Option-Shift-0"), exec: function (e) {
                    e.session.unfold()
                }, scrollIntoView: "center", readOnly: !0
            }, {
                name: "findnext", bindKey: n("Ctrl-K", "Command-G"), exec: function (e) {
                    e.findNext()
                }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0
            }, {
                name: "findprevious", bindKey: n("Ctrl-Shift-K", "Command-Shift-G"), exec: function (e) {
                    e.findPrevious()
                }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0
            }, {
                name: "selectOrFindNext", bindKey: n("Alt-K", "Ctrl-G"), exec: function (e) {
                    e.selection.isEmpty() ? e.selection.selectWord() : e.findNext()
                }, readOnly: !0
            }, {
                name: "selectOrFindPrevious", bindKey: n("Alt-Shift-K", "Ctrl-Shift-G"), exec: function (e) {
                    e.selection.isEmpty() ? e.selection.selectWord() : e.findPrevious()
                }, readOnly: !0
            }, {
                name: "find", bindKey: n("Ctrl-F", "Command-F"), exec: function (e) {
                    o.loadModule("ace/ext/searchbox", function (t) {
                        t.Search(e)
                    })
                }, readOnly: !0
            }, {
                name: "overwrite", bindKey: "Insert", exec: function (e) {
                    e.toggleOverwrite()
                }, readOnly: !0
            }, {
                name: "selecttostart", bindKey: n("Ctrl-Shift-Home", "Command-Shift-Up"), exec: function (e) {
                    e.getSelection().selectFileStart()
                }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump"
            }, {
                name: "gotostart", bindKey: n("Ctrl-Home", "Command-Home|Command-Up"), exec: function (e) {
                    e.navigateFileStart()
                }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump"
            }, {
                name: "selectup", bindKey: n("Shift-Up", "Shift-Up"), exec: function (e) {
                    e.getSelection().selectUp()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "golineup", bindKey: n("Up", "Up|Ctrl-P"), exec: function (e, t) {
                    e.navigateUp(t.times)
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selecttoend", bindKey: n("Ctrl-Shift-End", "Command-Shift-Down"), exec: function (e) {
                    e.getSelection().selectFileEnd()
                }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump"
            }, {
                name: "gotoend", bindKey: n("Ctrl-End", "Command-End|Command-Down"), exec: function (e) {
                    e.navigateFileEnd()
                }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump"
            }, {
                name: "selectdown", bindKey: n("Shift-Down", "Shift-Down"), exec: function (e) {
                    e.getSelection().selectDown()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "golinedown", bindKey: n("Down", "Down|Ctrl-N"), exec: function (e, t) {
                    e.navigateDown(t.times)
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectwordleft", bindKey: n("Ctrl-Shift-Left", "Option-Shift-Left"), exec: function (e) {
                    e.getSelection().selectWordLeft()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "gotowordleft", bindKey: n("Ctrl-Left", "Option-Left"), exec: function (e) {
                    e.navigateWordLeft()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selecttolinestart", bindKey: n("Alt-Shift-Left", "Command-Shift-Left"), exec: function (e) {
                    e.getSelection().selectLineStart()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "gotolinestart", bindKey: n("Alt-Left|Home", "Command-Left|Home|Ctrl-A"), exec: function (e) {
                    e.navigateLineStart()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectleft", bindKey: n("Shift-Left", "Shift-Left"), exec: function (e) {
                    e.getSelection().selectLeft()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "gotoleft", bindKey: n("Left", "Left|Ctrl-B"), exec: function (e, t) {
                    e.navigateLeft(t.times)
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectwordright", bindKey: n("Ctrl-Shift-Right", "Option-Shift-Right"), exec: function (e) {
                    e.getSelection().selectWordRight()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "gotowordright", bindKey: n("Ctrl-Right", "Option-Right"), exec: function (e) {
                    e.navigateWordRight()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selecttolineend", bindKey: n("Alt-Shift-Right", "Command-Shift-Right"), exec: function (e) {
                    e.getSelection().selectLineEnd()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "gotolineend", bindKey: n("Alt-Right|End", "Command-Right|End|Ctrl-E"), exec: function (e) {
                    e.navigateLineEnd()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectright", bindKey: n("Shift-Right", "Shift-Right"), exec: function (e) {
                    e.getSelection().selectRight()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "gotoright", bindKey: n("Right", "Right|Ctrl-F"), exec: function (e, t) {
                    e.navigateRight(t.times)
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectpagedown", bindKey: "Shift-PageDown", exec: function (e) {
                    e.selectPageDown()
                }, readOnly: !0
            }, {
                name: "pagedown", bindKey: n(null, "Option-PageDown"), exec: function (e) {
                    e.scrollPageDown()
                }, readOnly: !0
            }, {
                name: "gotopagedown", bindKey: n("PageDown", "PageDown|Ctrl-V"), exec: function (e) {
                    e.gotoPageDown()
                }, readOnly: !0
            }, {
                name: "selectpageup", bindKey: "Shift-PageUp", exec: function (e) {
                    e.selectPageUp()
                }, readOnly: !0
            }, {
                name: "pageup", bindKey: n(null, "Option-PageUp"), exec: function (e) {
                    e.scrollPageUp()
                }, readOnly: !0
            }, {
                name: "gotopageup", bindKey: "PageUp", exec: function (e) {
                    e.gotoPageUp()
                }, readOnly: !0
            }, {
                name: "scrollup", bindKey: n("Ctrl-Up", null), exec: function (e) {
                    e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight)
                }, readOnly: !0
            }, {
                name: "scrolldown", bindKey: n("Ctrl-Down", null), exec: function (e) {
                    e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight)
                }, readOnly: !0
            }, {
                name: "selectlinestart", bindKey: "Shift-Home", exec: function (e) {
                    e.getSelection().selectLineStart()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectlineend", bindKey: "Shift-End", exec: function (e) {
                    e.getSelection().selectLineEnd()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "togglerecording", bindKey: n("Ctrl-Alt-E", "Command-Option-E"), exec: function (e) {
                    e.commands.toggleRecording(e)
                }, readOnly: !0
            }, {
                name: "replaymacro", bindKey: n("Ctrl-Shift-E", "Command-Shift-E"), exec: function (e) {
                    e.commands.replay(e)
                }, readOnly: !0
            }, {
                name: "jumptomatching", bindKey: n("Ctrl-P", "Ctrl-P"), exec: function (e) {
                    e.jumpToMatching()
                }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: !0
            }, {
                name: "selecttomatching", bindKey: n("Ctrl-Shift-P", "Ctrl-Shift-P"), exec: function (e) {
                    e.jumpToMatching(!0)
                }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: !0
            }, {
                name: "expandToMatching", bindKey: n("Ctrl-Shift-M", "Ctrl-Shift-M"), exec: function (e) {
                    e.jumpToMatching(!0, !0)
                }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: !0
            }, {
                name: "passKeysToBrowser", bindKey: n(null, null), exec: function () {
                }, passEvent: !0, readOnly: !0
            }, {
                name: "copy", exec: function (e) {
                }, readOnly: !0
            }, {
                name: "cut", exec: function (e) {
                    var t = e.getSelectionRange();
                    e._emit("cut", t), e.selection.isEmpty() || (e.session.remove(t), e.clearSelection())
                }, scrollIntoView: "cursor", multiSelectAction: "forEach"
            }, {
                name: "paste", exec: function (e, t) {
                    e.$handlePaste(t)
                }, scrollIntoView: "cursor"
            }, {
                name: "removeline", bindKey: n("Ctrl-D", "Command-D"), exec: function (e) {
                    e.removeLines()
                }, scrollIntoView: "cursor", multiSelectAction: "forEachLine"
            }, {
                name: "duplicateSelection", bindKey: n("Ctrl-Shift-D", "Command-Shift-D"), exec: function (e) {
                    e.duplicateSelection()
                }, scrollIntoView: "cursor", multiSelectAction: "forEach"
            }, {
                name: "sortlines", bindKey: n("Ctrl-Alt-S", "Command-Alt-S"), exec: function (e) {
                    e.sortLines()
                }, scrollIntoView: "selection", multiSelectAction: "forEachLine"
            }, {
                name: "togglecomment", bindKey: n("Ctrl-/", "Command-/"), exec: function (e) {
                    e.toggleCommentLines()
                }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart"
            }, {
                name: "toggleBlockComment", bindKey: n("Ctrl-Shift-/", "Command-Shift-/"), exec: function (e) {
                    e.toggleBlockComment()
                }, multiSelectAction: "forEach", scrollIntoView: "selectionPart"
            }, {
                name: "modifyNumberUp", bindKey: n("Ctrl-Shift-Up", "Alt-Shift-Up"), exec: function (e) {
                    e.modifyNumber(1)
                }, scrollIntoView: "cursor", multiSelectAction: "forEach"
            }, {
                name: "modifyNumberDown", bindKey: n("Ctrl-Shift-Down", "Alt-Shift-Down"), exec: function (e) {
                    e.modifyNumber(-1)
                }, scrollIntoView: "cursor", multiSelectAction: "forEach"
            }, {
                name: "replace", bindKey: n("Ctrl-H", "Command-Option-F"), exec: function (e) {
                    o.loadModule("ace/ext/searchbox", function (t) {
                        t.Search(e, !0)
                    })
                }
            }, {
                name: "undo", bindKey: n("Ctrl-Z", "Command-Z"), exec: function (e) {
                    e.undo()
                }
            }, {
                name: "redo", bindKey: n("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"), exec: function (e) {
                    e.redo()
                }
            }, {
                name: "copylinesup", bindKey: n("Alt-Shift-Up", "Command-Option-Up"), exec: function (e) {
                    e.copyLinesUp()
                }, scrollIntoView: "cursor"
            }, {
                name: "movelinesup", bindKey: n("Alt-Up", "Option-Up"), exec: function (e) {
                    e.moveLinesUp()
                }, scrollIntoView: "cursor"
            }, {
                name: "copylinesdown", bindKey: n("Alt-Shift-Down", "Command-Option-Down"), exec: function (e) {
                    e.copyLinesDown()
                }, scrollIntoView: "cursor"
            }, {
                name: "movelinesdown", bindKey: n("Alt-Down", "Option-Down"), exec: function (e) {
                    e.moveLinesDown()
                }, scrollIntoView: "cursor"
            }, {
                name: "del", bindKey: n("Delete", "Delete|Ctrl-D|Shift-Delete"), exec: function (e) {
                    e.remove("right")
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "backspace",
                bindKey: n("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
                exec: function (e) {
                    e.remove("left")
                },
                multiSelectAction: "forEach",
                scrollIntoView: "cursor"
            }, {
                name: "cut_or_delete", bindKey: n("Shift-Delete", null), exec: function (e) {
                    return e.selection.isEmpty() ? void e.remove("left") : !1
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "removetolinestart", bindKey: n("Alt-Backspace", "Command-Backspace"), exec: function (e) {
                    e.removeToLineStart()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "removetolineend", bindKey: n("Alt-Delete", "Ctrl-K"), exec: function (e) {
                    e.removeToLineEnd()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "removewordleft",
                bindKey: n("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
                exec: function (e) {
                    e.removeWordLeft()
                },
                multiSelectAction: "forEach",
                scrollIntoView: "cursor"
            }, {
                name: "removewordright", bindKey: n("Ctrl-Delete", "Alt-Delete"), exec: function (e) {
                    e.removeWordRight()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "outdent", bindKey: n("Shift-Tab", "Shift-Tab"), exec: function (e) {
                    e.blockOutdent()
                }, multiSelectAction: "forEach", scrollIntoView: "selectionPart"
            }, {
                name: "indent", bindKey: n("Tab", "Tab"), exec: function (e) {
                    e.indent()
                }, multiSelectAction: "forEach", scrollIntoView: "selectionPart"
            }, {
                name: "blockoutdent", bindKey: n("Ctrl-[", "Ctrl-["), exec: function (e) {
                    e.blockOutdent()
                }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart"
            }, {
                name: "blockindent", bindKey: n("Ctrl-]", "Ctrl-]"), exec: function (e) {
                    e.blockIndent()
                }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart"
            }, {
                name: "insertstring", exec: function (e, t) {
                    e.insert(t)
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "inserttext", exec: function (e, t) {
                    e.insert(r.stringRepeat(t.text || "", t.times || 1))
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "splitline", bindKey: n(null, "Ctrl-O"), exec: function (e) {
                    e.splitLine()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "transposeletters", bindKey: n("Ctrl-T", "Ctrl-T"), exec: function (e) {
                    e.transposeLetters()
                }, multiSelectAction: function (e) {
                    e.transposeSelections(1)
                }, scrollIntoView: "cursor"
            }, {
                name: "touppercase", bindKey: n("Ctrl-U", "Ctrl-U"), exec: function (e) {
                    e.toUpperCase()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "tolowercase", bindKey: n("Ctrl-Shift-U", "Ctrl-Shift-U"), exec: function (e) {
                    e.toLowerCase()
                }, multiSelectAction: "forEach", scrollIntoView: "cursor"
            }, {
                name: "expandtoline", bindKey: n("Ctrl-Shift-L", "Command-Shift-L"), exec: function (e) {
                    var t = e.selection.getRange();
                    t.start.column = t.end.column = 0, t.end.row++, e.selection.setRange(t, !1)
                }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "joinlines", bindKey: n(null, null), exec: function (e) {
                    for (var t = e.selection.isBackwards(), i = t ? e.selection.getSelectionLead() : e.selection.getSelectionAnchor(), n = t ? e.selection.getSelectionAnchor() : e.selection.getSelectionLead(), o = e.session.doc.getLine(i.row).length, a = e.session.doc.getTextRange(e.selection.getRange()), l = a.replace(/\n\s*/, " ").length, c = e.session.doc.getLine(i.row), h = i.row + 1; h <= n.row + 1; h++) {
                        var d = r.stringTrimLeft(r.stringTrimRight(e.session.doc.getLine(h)));
                        0 !== d.length && (d = " " + d), c += d
                    }
                    n.row + 1 < e.session.doc.getLength() - 1 && (c += e.session.doc.getNewLineCharacter()), e.clearSelection(), e.session.doc.replace(new s(i.row, 0, n.row + 2, 0), c), l > 0 ? (e.selection.moveCursorTo(i.row, i.column), e.selection.selectTo(i.row, i.column + l)) : (o = e.session.doc.getLine(i.row).length > o ? o + 1 : o, e.selection.moveCursorTo(i.row, o))
                }, multiSelectAction: "forEach", readOnly: !0
            }, {
                name: "invertSelection", bindKey: n(null, null), exec: function (e) {
                    var t = e.session.doc.getLength() - 1, i = e.session.doc.getLine(t).length, n = e.selection.rangeList.ranges, r = [];
                    n.length < 1 && (n = [e.selection.getRange()]);
                    for (var o = 0; o < n.length; o++)o == n.length - 1 && (n[o].end.row !== t || n[o].end.column !== i) && r.push(new s(n[o].end.row, n[o].end.column, t, i)), 0 === o ? (0 !== n[o].start.row || 0 !== n[o].start.column) && r.push(new s(0, 0, n[o].start.row, n[o].start.column)) : r.push(new s(n[o - 1].end.row, n[o - 1].end.column, n[o].start.row, n[o].start.column));
                    e.exitMultiSelectMode(), e.clearSelection();
                    for (var o = 0; o < r.length; o++)e.selection.addRange(r[o], !1)
                }, readOnly: !0, scrollIntoView: "none"
            }]
        }), ace.define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config", "ace/token_iterator"], function (e, t, i) {
            "use strict";
            e("./lib/fixoldbrowsers");
            var n = e("./lib/oop"), r = e("./lib/dom"), o = e("./lib/lang"), s = e("./lib/useragent"), a = e("./keyboard/textinput").TextInput, l = e("./mouse/mouse_handler").MouseHandler, c = e("./mouse/fold_handler").FoldHandler, h = e("./keyboard/keybinding").KeyBinding, d = e("./edit_session").EditSession, u = e("./search").Search, f = e("./range").Range, p = e("./lib/event_emitter").EventEmitter, m = e("./commands/command_manager").CommandManager, g = e("./commands/default_commands").commands, v = e("./config"), w = e("./token_iterator").TokenIterator, y = function (e, t) {
                var i = e.getContainerElement();
                this.container = i, this.renderer = e, this.commands = new m(s.isMac ? "mac" : "win", g), this.textInput = new a(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.keyBinding = new h(this), this.$mouseHandler = new l(this), new c(this), this.$blockScrolling = 0, this.$search = (new u).set({wrap: !0}), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = o.delayedCall(function () {
                    this._signal("input", {}), this.session && this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart()
                }.bind(this)), this.on("change", function (e, t) {
                    t._$emitInputEvent.schedule(31)
                }), this.setSession(t || new d("")), v.resetOptions(this), v._signal("editor", this)
            };
            (function () {
                n.implement(this, p), this.$initOperationListeners = function () {
                    this.selections = [], this.commands.on("exec", this.startOperation.bind(this), !0), this.commands.on("afterExec", this.endOperation.bind(this), !0), this.$opResetTimer = o.delayedCall(this.endOperation.bind(this)), this.on("change", function () {
                        this.curOp || this.startOperation(), this.curOp.docChanged = !0
                    }.bind(this), !0), this.on("changeSelection", function () {
                        this.curOp || this.startOperation(), this.curOp.selectionChanged = !0
                    }.bind(this), !0)
                }, this.curOp = null, this.prevOp = {}, this.startOperation = function (e) {
                    if (this.curOp) {
                        if (!e || this.curOp.command)return;
                        this.prevOp = this.curOp
                    }
                    e || (this.previousCommand = null, e = {}), this.$opResetTimer.schedule(), this.curOp = {
                        command: e.command || {},
                        args: e.args,
                        scrollTop: this.renderer.scrollTop
                    }, this.curOp.command.name && void 0 !== this.curOp.command.scrollIntoView && this.$blockScrolling++
                }, this.endOperation = function (e) {
                    if (this.curOp) {
                        if (e && e.returnValue === !1)return this.curOp = null;
                        this._signal("beforeEndOperation");
                        var t = this.curOp.command;
                        t.name && this.$blockScrolling > 0 && this.$blockScrolling--;
                        var i = t && t.scrollIntoView;
                        if (i) {
                            switch (i) {
                                case"center-animate":
                                    i = "animate";
                                case"center":
                                    this.renderer.scrollCursorIntoView(null, .5);
                                    break;
                                case"animate":
                                case"cursor":
                                    this.renderer.scrollCursorIntoView();
                                    break;
                                case"selectionPart":
                                    var n = this.selection.getRange(), r = this.renderer.layerConfig;
                                    (n.start.row >= r.lastRow || n.end.row <= r.firstRow) && this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead)
                            }
                            "animate" == i && this.renderer.animateScrolling(this.curOp.scrollTop)
                        }
                        this.prevOp = this.curOp, this.curOp = null
                    }
                }, this.$mergeableCommands = ["backspace", "del", "insertstring"], this.$historyTracker = function (e) {
                    if (this.$mergeUndoDeltas) {
                        var t = this.prevOp, i = this.$mergeableCommands, n = t.command && e.command.name == t.command.name;
                        if ("insertstring" == e.command.name) {
                            var r = e.args;
                            void 0 === this.mergeNextCommand && (this.mergeNextCommand = !0), n = n && this.mergeNextCommand && (!/\s/.test(r) || /\s/.test(t.args)), this.mergeNextCommand = !0
                        } else n = n && -1 !== i.indexOf(e.command.name);
                        "always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3 && (n = !1), n ? this.session.mergeUndoDeltas = !0 : -1 !== i.indexOf(e.command.name) && (this.sequenceStartTime = Date.now())
                    }
                }, this.setKeyboardHandler = function (e, t) {
                    if (e && "string" == typeof e) {
                        this.$keybindingId = e;
                        var i = this;
                        v.loadModule(["keybinding", e], function (n) {
                            i.$keybindingId == e && i.keyBinding.setKeyboardHandler(n && n.handler), t && t()
                        })
                    } else this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e), t && t()
                }, this.getKeyboardHandler = function () {
                    return this.keyBinding.getKeyboardHandler()
                }, this.setSession = function (e) {
                    if (this.session != e) {
                        this.curOp && this.endOperation(), this.curOp = {};
                        var t = this.session;
                        if (t) {
                            this.session.removeEventListener("change", this.$onDocumentChange), this.session.removeEventListener("changeMode", this.$onChangeMode), this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.session.removeEventListener("changeTabSize", this.$onChangeTabSize), this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode), this.session.removeEventListener("onChangeFold", this.$onChangeFold), this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker), this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation), this.session.removeEventListener("changeOverwrite", this.$onCursorChange), this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange), this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);
                            var i = this.session.getSelection();
                            i.removeEventListener("changeCursor", this.$onCursorChange), i.removeEventListener("changeSelection", this.$onSelectionChange)
                        }
                        this.session = e, e ? (this.$onDocumentChange = this.onDocumentChange.bind(this), e.addEventListener("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.addEventListener("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.addEventListener("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.addEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.addEventListener("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.addEventListener("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker),
                            this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.addEventListener("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.addEventListener("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.addEventListener("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.addEventListener("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull()) : (this.selection = null, this.renderer.setSession(e)), this._signal("changeSession", {
                            session: e,
                            oldSession: t
                        }), this.curOp = null, t && t._signal("changeEditor", {oldEditor: this}), e && e._signal("changeEditor", {editor: this})
                    }
                }, this.getSession = function () {
                    return this.session
                }, this.setValue = function (e, t) {
                    return this.session.doc.setValue(e), t ? 1 == t ? this.navigateFileEnd() : -1 == t && this.navigateFileStart() : this.selectAll(), e
                }, this.getValue = function () {
                    return this.session.getValue()
                }, this.getSelection = function () {
                    return this.selection
                }, this.resize = function (e) {
                    this.renderer.onResize(e)
                }, this.setTheme = function (e, t) {
                    this.renderer.setTheme(e, t)
                }, this.getTheme = function () {
                    return this.renderer.getTheme()
                }, this.setStyle = function (e) {
                    this.renderer.setStyle(e)
                }, this.unsetStyle = function (e) {
                    this.renderer.unsetStyle(e)
                }, this.getFontSize = function () {
                    return this.getOption("fontSize") || r.computedStyle(this.container, "fontSize")
                }, this.setFontSize = function (e) {
                    this.setOption("fontSize", e)
                }, this.$highlightBrackets = function () {
                    if (this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null), !this.$highlightPending) {
                        var e = this;
                        this.$highlightPending = !0, setTimeout(function () {
                            e.$highlightPending = !1;
                            var t = e.session;
                            if (t && t.bgTokenizer) {
                                var i = t.findMatchingBracket(e.getCursorPosition());
                                if (i)var n = new f(i.row, i.column, i.row, i.column + 1); else if (t.$mode.getMatching)var n = t.$mode.getMatching(e.session);
                                n && (t.$bracketHighlight = t.addMarker(n, "ace_bracket", "text"))
                            }
                        }, 50)
                    }
                }, this.$highlightTags = function () {
                    if (!this.$highlightTagPending) {
                        var e = this;
                        this.$highlightTagPending = !0, setTimeout(function () {
                            e.$highlightTagPending = !1;
                            var t = e.session;
                            if (t && t.bgTokenizer) {
                                var i = e.getCursorPosition(), n = new w(e.session, i.row, i.column), r = n.getCurrentToken();
                                if (!r || !/\b(?:tag-open|tag-name)/.test(r.type))return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
                                if (-1 == r.type.indexOf("tag-open") || (r = n.stepForward())) {
                                    var o = r.value, s = 0, a = n.stepBackward();
                                    if ("<" == a.value) {
                                        do a = r, r = n.stepForward(), r && r.value === o && -1 !== r.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--); while (r && s >= 0)
                                    } else {
                                        do r = a, a = n.stepBackward(), r && r.value === o && -1 !== r.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--); while (a && 0 >= s);
                                        n.stepForward()
                                    }
                                    if (!r)return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
                                    var l = n.getCurrentTokenRow(), c = n.getCurrentTokenColumn(), h = new f(l, c, l, c + r.value.length);
                                    t.$tagHighlight && 0 !== h.compareRange(t.$backMarkers[t.$tagHighlight].range) && (t.removeMarker(t.$tagHighlight), t.$tagHighlight = null), h && !t.$tagHighlight && (t.$tagHighlight = t.addMarker(h, "ace_bracket", "text"))
                                }
                            }
                        }, 50)
                    }
                }, this.focus = function () {
                    var e = this;
                    setTimeout(function () {
                        e.textInput.focus()
                    }), this.textInput.focus()
                }, this.isFocused = function () {
                    return this.textInput.isFocused()
                }, this.blur = function () {
                    this.textInput.blur()
                }, this.onFocus = function (e) {
                    this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus", e))
                }, this.onBlur = function (e) {
                    this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur", e))
                }, this.$cursorChange = function () {
                    this.renderer.updateCursor()
                }, this.onDocumentChange = function (e) {
                    var t = this.session.$useWrapMode, i = e.start.row == e.end.row ? e.end.row : 1 / 0;
                    this.renderer.updateLines(e.start.row, i, t), this._signal("change", e), this.$cursorChange(), this.$updateHighlightActiveLine()
                }, this.onTokenizerUpdate = function (e) {
                    var t = e.data;
                    this.renderer.updateLines(t.first, t.last)
                }, this.onScrollTopChange = function () {
                    this.renderer.scrollToY(this.session.getScrollTop())
                }, this.onScrollLeftChange = function () {
                    this.renderer.scrollToX(this.session.getScrollLeft())
                }, this.onCursorChange = function () {
                    this.$cursorChange(), this.$blockScrolling || (v.warn("Automatically scrolling cursor into view after selection change", "this will be disabled in the next version", "set editor.$blockScrolling = Infinity to disable this message"), this.renderer.scrollCursorIntoView()), this.$highlightBrackets(), this.$highlightTags(), this.$updateHighlightActiveLine(), this._signal("changeSelection")
                }, this.$updateHighlightActiveLine = function () {
                    var e, t = this.getSession();
                    if (this.$highlightActiveLine && ("line" == this.$selectionStyle && this.selection.isMultiLine() || (e = this.getCursorPosition()), !this.renderer.$maxLines || 1 !== this.session.getLength() || this.renderer.$minLines > 1 || (e = !1)), t.$highlightLineMarker && !e)t.removeMarker(t.$highlightLineMarker.id), t.$highlightLineMarker = null; else if (!t.$highlightLineMarker && e) {
                        var i = new f(e.row, e.column, e.row, 1 / 0);
                        i.id = t.addMarker(i, "ace_active-line", "screenLine"), t.$highlightLineMarker = i
                    } else e && (t.$highlightLineMarker.start.row = e.row, t.$highlightLineMarker.end.row = e.row, t.$highlightLineMarker.start.column = e.column, t._signal("changeBackMarker"))
                }, this.onSelectionChange = function (e) {
                    var t = this.session;
                    if (t.$selectionMarker && t.removeMarker(t.$selectionMarker), t.$selectionMarker = null, this.selection.isEmpty())this.$updateHighlightActiveLine(); else {
                        var i = this.selection.getRange(), n = this.getSelectionStyle();
                        t.$selectionMarker = t.addMarker(i, "ace_selection", n)
                    }
                    var r = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
                    this.session.highlight(r), this._signal("changeSelection")
                }, this.$getSelectionHighLightRegexp = function () {
                    var e = this.session, t = this.getSelectionRange();
                    if (!t.isEmpty() && !t.isMultiLine()) {
                        var i = t.start.column - 1, n = t.end.column + 1, r = e.getLine(t.start.row), o = r.length, s = r.substring(Math.max(i, 0), Math.min(n, o));
                        if (!(i >= 0 && /^[\w\d]/.test(s) || o >= n && /[\w\d]$/.test(s)) && (s = r.substring(t.start.column, t.end.column), /^[\w\d]+$/.test(s))) {
                            var a = this.$search.$assembleRegExp({wholeWord: !0, caseSensitive: !0, needle: s});
                            return a
                        }
                    }
                }, this.onChangeFrontMarker = function () {
                    this.renderer.updateFrontMarkers()
                }, this.onChangeBackMarker = function () {
                    this.renderer.updateBackMarkers()
                }, this.onChangeBreakpoint = function () {
                    this.renderer.updateBreakpoints()
                }, this.onChangeAnnotation = function () {
                    this.renderer.setAnnotations(this.session.getAnnotations())
                }, this.onChangeMode = function (e) {
                    this.renderer.updateText(), this._emit("changeMode", e)
                }, this.onChangeWrapLimit = function () {
                    this.renderer.updateFull()
                }, this.onChangeWrapMode = function () {
                    this.renderer.onResize(!0)
                }, this.onChangeFold = function () {
                    this.$updateHighlightActiveLine(), this.renderer.updateFull()
                }, this.getSelectedText = function () {
                    return this.session.getTextRange(this.getSelectionRange())
                }, this.getCopyText = function () {
                    var e = this.getSelectedText();
                    return this._signal("copy", e), e
                }, this.onCopy = function () {
                    this.commands.exec("copy", this)
                }, this.onCut = function () {
                    this.commands.exec("cut", this)
                }, this.onPaste = function (e, t) {
                    var i = {text: e, event: t};
                    this.commands.exec("paste", this, i)
                }, this.$handlePaste = function (e) {
                    "string" == typeof e && (e = {text: e}), this._signal("paste", e);
                    var t = e.text;
                    if (!this.inMultiSelectMode || this.inVirtualSelectionMode)this.insert(t); else {
                        var i = t.split(/\r\n|\r|\n/), n = this.selection.rangeList.ranges;
                        if (i.length > n.length || i.length < 2 || !i[1])return this.commands.exec("insertstring", this, t);
                        for (var r = n.length; r--;) {
                            var o = n[r];
                            o.isEmpty() || this.session.remove(o), this.session.insert(o.start, i[r])
                        }
                    }
                }, this.execCommand = function (e, t) {
                    return this.commands.exec(e, this, t)
                }, this.insert = function (e, t) {
                    var i = this.session, n = i.getMode(), r = this.getCursorPosition();
                    if (this.getBehavioursEnabled() && !t) {
                        var o = n.transformAction(i.getState(r.row), "insertion", this, i, e);
                        o && (e !== o.text && (this.session.mergeUndoDeltas = !1, this.$mergeNextCommand = !1), e = o.text)
                    }
                    if ("	" == e && (e = this.session.getTabString()), this.selection.isEmpty()) {
                        if (this.session.getOverwrite()) {
                            var s = new f.fromPoints(r, r);
                            s.end.column += e.length, this.session.remove(s)
                        }
                    } else {
                        var s = this.getSelectionRange();
                        r = this.session.remove(s), this.clearSelection()
                    }
                    if ("\n" == e || "\r\n" == e) {
                        var a = i.getLine(r.row);
                        if (r.column > a.search(/\S|$/)) {
                            var l = a.substr(r.column).search(/\S|$/);
                            i.doc.removeInLine(r.row, r.column, r.column + l)
                        }
                    }
                    this.clearSelection();
                    var c = r.column, h = i.getState(r.row), a = i.getLine(r.row), d = n.checkOutdent(h, a, e);
                    i.insert(r, e);
                    if (o && o.selection && (2 == o.selection.length ? this.selection.setSelectionRange(new f(r.row, c + o.selection[0], r.row, c + o.selection[1])) : this.selection.setSelectionRange(new f(r.row + o.selection[0], o.selection[1], r.row + o.selection[2], o.selection[3]))), i.getDocument().isNewLine(e)) {
                        var u = n.getNextLineIndent(h, a.slice(0, r.column), i.getTabString());
                        i.insert({row: r.row + 1, column: 0}, u)
                    }
                    d && n.autoOutdent(h, i, r.row)
                }, this.onTextInput = function (e) {
                    this.keyBinding.onTextInput(e)
                }, this.onCommandKey = function (e, t, i) {
                    this.keyBinding.onCommandKey(e, t, i)
                }, this.setOverwrite = function (e) {
                    this.session.setOverwrite(e)
                }, this.getOverwrite = function () {
                    return this.session.getOverwrite()
                }, this.toggleOverwrite = function () {
                    this.session.toggleOverwrite()
                }, this.setScrollSpeed = function (e) {
                    this.setOption("scrollSpeed", e)
                }, this.getScrollSpeed = function () {
                    return this.getOption("scrollSpeed")
                }, this.setDragDelay = function (e) {
                    this.setOption("dragDelay", e)
                }, this.getDragDelay = function () {
                    return this.getOption("dragDelay")
                }, this.setSelectionStyle = function (e) {
                    this.setOption("selectionStyle", e)
                }, this.getSelectionStyle = function () {
                    return this.getOption("selectionStyle")
                }, this.setHighlightActiveLine = function (e) {
                    this.setOption("highlightActiveLine", e)
                }, this.getHighlightActiveLine = function () {
                    return this.getOption("highlightActiveLine")
                }, this.setHighlightGutterLine = function (e) {
                    this.setOption("highlightGutterLine", e)
                }, this.getHighlightGutterLine = function () {
                    return this.getOption("highlightGutterLine")
                }, this.setHighlightSelectedWord = function (e) {
                    this.setOption("highlightSelectedWord", e)
                }, this.getHighlightSelectedWord = function () {
                    return this.$highlightSelectedWord
                }, this.setAnimatedScroll = function (e) {
                    this.renderer.setAnimatedScroll(e)
                }, this.getAnimatedScroll = function () {
                    return this.renderer.getAnimatedScroll()
                }, this.setShowInvisibles = function (e) {
                    this.renderer.setShowInvisibles(e)
                }, this.getShowInvisibles = function () {
                    return this.renderer.getShowInvisibles()
                }, this.setDisplayIndentGuides = function (e) {
                    this.renderer.setDisplayIndentGuides(e)
                }, this.getDisplayIndentGuides = function () {
                    return this.renderer.getDisplayIndentGuides()
                }, this.setShowPrintMargin = function (e) {
                    this.renderer.setShowPrintMargin(e)
                }, this.getShowPrintMargin = function () {
                    return this.renderer.getShowPrintMargin()
                }, this.setPrintMarginColumn = function (e) {
                    this.renderer.setPrintMarginColumn(e)
                }, this.getPrintMarginColumn = function () {
                    return this.renderer.getPrintMarginColumn()
                }, this.setReadOnly = function (e) {
                    this.setOption("readOnly", e)
                }, this.getReadOnly = function () {
                    return this.getOption("readOnly")
                }, this.setBehavioursEnabled = function (e) {
                    this.setOption("behavioursEnabled", e)
                }, this.getBehavioursEnabled = function () {
                    return this.getOption("behavioursEnabled")
                }, this.setWrapBehavioursEnabled = function (e) {
                    this.setOption("wrapBehavioursEnabled", e)
                }, this.getWrapBehavioursEnabled = function () {
                    return this.getOption("wrapBehavioursEnabled")
                }, this.setShowFoldWidgets = function (e) {
                    this.setOption("showFoldWidgets", e)
                }, this.getShowFoldWidgets = function () {
                    return this.getOption("showFoldWidgets")
                }, this.setFadeFoldWidgets = function (e) {
                    this.setOption("fadeFoldWidgets", e)
                }, this.getFadeFoldWidgets = function () {
                    return this.getOption("fadeFoldWidgets")
                }, this.remove = function (e) {
                    this.selection.isEmpty() && ("left" == e ? this.selection.selectLeft() : this.selection.selectRight());
                    var t = this.getSelectionRange();
                    if (this.getBehavioursEnabled()) {
                        var i = this.session, n = i.getState(t.start.row), r = i.getMode().transformAction(n, "deletion", this, i, t);
                        if (0 === t.end.column) {
                            var o = i.getTextRange(t);
                            if ("\n" == o[o.length - 1]) {
                                var s = i.getLine(t.end.row);
                                /^\s+$/.test(s) && (t.end.column = s.length)
                            }
                        }
                        r && (t = r)
                    }
                    this.session.remove(t), this.clearSelection()
                }, this.removeWordRight = function () {
                    this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                }, this.removeWordLeft = function () {
                    this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                }, this.removeToLineStart = function () {
                    this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                }, this.removeToLineEnd = function () {
                    this.selection.isEmpty() && this.selection.selectLineEnd();
                    var e = this.getSelectionRange();
                    e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection()
                }, this.splitLine = function () {
                    this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
                    var e = this.getCursorPosition();
                    this.insert("\n"), this.moveCursorToPosition(e)
                }, this.transposeLetters = function () {
                    if (this.selection.isEmpty()) {
                        var e = this.getCursorPosition(), t = e.column;
                        if (0 !== t) {
                            var i, n, r = this.session.getLine(e.row);
                            t < r.length ? (i = r.charAt(t) + r.charAt(t - 1), n = new f(e.row, t - 1, e.row, t + 1)) : (i = r.charAt(t - 1) + r.charAt(t - 2), n = new f(e.row, t - 2, e.row, t)), this.session.replace(n, i)
                        }
                    }
                }, this.toLowerCase = function () {
                    var e = this.getSelectionRange();
                    this.selection.isEmpty() && this.selection.selectWord();
                    var t = this.getSelectionRange(), i = this.session.getTextRange(t);
                    this.session.replace(t, i.toLowerCase()), this.selection.setSelectionRange(e)
                }, this.toUpperCase = function () {
                    var e = this.getSelectionRange();
                    this.selection.isEmpty() && this.selection.selectWord();
                    var t = this.getSelectionRange(), i = this.session.getTextRange(t);
                    this.session.replace(t, i.toUpperCase()), this.selection.setSelectionRange(e)
                }, this.indent = function () {
                    var e = this.session, t = this.getSelectionRange();
                    if (t.start.row < t.end.row) {
                        var i = this.$getSelectedRows();
                        return void e.indentRows(i.first, i.last, "	")
                    }
                    if (t.start.column < t.end.column) {
                        var n = e.getTextRange(t);
                        if (!/^\s+$/.test(n)) {
                            var i = this.$getSelectedRows();
                            return void e.indentRows(i.first, i.last, "	")
                        }
                    }
                    var r = e.getLine(t.start.row), s = t.start, a = e.getTabSize(), l = e.documentToScreenColumn(s.row, s.column);
                    if (this.session.getUseSoftTabs())var c = a - l % a, h = o.stringRepeat(" ", c); else {
                        for (var c = l % a; " " == r[t.start.column] && c;)t.start.column--, c--;
                        this.selection.setSelectionRange(t), h = "	"
                    }
                    return this.insert(h)
                },this.blockIndent = function () {
                    var e = this.$getSelectedRows();
                    this.session.indentRows(e.first, e.last, "	")
                },this.blockOutdent = function () {
                    var e = this.session.getSelection();
                    this.session.outdentRows(e.getRange())
                },this.sortLines = function () {
                    var e = this.$getSelectedRows(), t = this.session, i = [];
                    for (r = e.first; r <= e.last; r++)i.push(t.getLine(r));
                    i.sort(function (e, t) {
                        return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0
                    });
                    for (var n = new f(0, 0, 0, 0), r = e.first; r <= e.last; r++) {
                        var o = t.getLine(r);
                        n.start.row = r, n.end.row = r, n.end.column = o.length, t.replace(n, i[r - e.first])
                    }
                },this.toggleCommentLines = function () {
                    var e = this.session.getState(this.getCursorPosition().row), t = this.$getSelectedRows();
                    this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last)
                },this.toggleBlockComment = function () {
                    var e = this.getCursorPosition(), t = this.session.getState(e.row), i = this.getSelectionRange();
                    this.session.getMode().toggleBlockComment(t, this.session, i, e)
                },this.getNumberAt = function (e, t) {
                    var i = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
                    i.lastIndex = 0;
                    for (var n = this.session.getLine(e); i.lastIndex < t;) {
                        var r = i.exec(n);
                        if (r.index <= t && r.index + r[0].length >= t) {
                            var o = {value: r[0], start: r.index, end: r.index + r[0].length};
                            return o
                        }
                    }
                    return null
                },this.modifyNumber = function (e) {
                    var t = this.selection.getCursor().row, i = this.selection.getCursor().column, n = new f(t, i - 1, t, i), r = this.session.getTextRange(n);
                    if (!isNaN(parseFloat(r)) && isFinite(r)) {
                        var o = this.getNumberAt(t, i);
                        if (o) {
                            var s = o.value.indexOf(".") >= 0 ? o.start + o.value.indexOf(".") + 1 : o.end, a = o.start + o.value.length - s, l = parseFloat(o.value);
                            l *= Math.pow(10, a), e *= s !== o.end && s > i ? Math.pow(10, o.end - i - 1) : Math.pow(10, o.end - i), l += e, l /= Math.pow(10, a);
                            var c = l.toFixed(a), h = new f(t, o.start, t, o.end);
                            this.session.replace(h, c), this.moveCursorTo(t, Math.max(o.start + 1, i + c.length - o.value.length))
                        }
                    }
                },this.removeLines = function () {
                    var e = this.$getSelectedRows();
                    this.session.removeFullLines(e.first, e.last), this.clearSelection()
                },this.duplicateSelection = function () {
                    var e = this.selection, t = this.session, i = e.getRange(), n = e.isBackwards();
                    if (i.isEmpty()) {
                        var r = i.start.row;
                        t.duplicateLines(r, r)
                    } else {
                        var o = n ? i.start : i.end, s = t.insert(o, t.getTextRange(i), !1);
                        i.start = o, i.end = s, e.setSelectionRange(i, n)
                    }
                },this.moveLinesDown = function () {
                    this.$moveLines(1, !1)
                },this.moveLinesUp = function () {
                    this.$moveLines(-1, !1)
                },this.moveText = function (e, t, i) {
                    return this.session.moveText(e, t, i)
                },this.copyLinesUp = function () {
                    this.$moveLines(-1, !0)
                },this.copyLinesDown = function () {
                    this.$moveLines(1, !0)
                },this.$moveLines = function (e, t) {
                    var i, n, r = this.selection;
                    if (!r.inMultiSelectMode || this.inVirtualSelectionMode) {
                        var o = r.toOrientedRange();
                        i = this.$getSelectedRows(o), n = this.session.$moveLines(i.first, i.last, t ? 0 : e), t && -1 == e && (n = 0), o.moveBy(n, 0), r.fromOrientedRange(o)
                    } else {
                        var s = r.rangeList.ranges;
                        r.rangeList.detach(this.session), this.inVirtualSelectionMode = !0;
                        for (var a = 0, l = 0, c = s.length, h = 0; c > h; h++) {
                            var d = h;
                            s[h].moveBy(a, 0), i = this.$getSelectedRows(s[h]);
                            for (var u = i.first, f = i.last; ++h < c;) {
                                l && s[h].moveBy(l, 0);
                                var p = this.$getSelectedRows(s[h]);
                                if (t && p.first != f)break;
                                if (!t && p.first > f + 1)break;
                                f = p.last
                            }
                            for (h--, a = this.session.$moveLines(u, f, t ? 0 : e), t && -1 == e && (d = h + 1); h >= d;)s[d].moveBy(a, 0), d++;
                            t || (a = 0), l += a
                        }
                        r.fromOrientedRange(r.ranges[0]), r.rangeList.attach(this.session), this.inVirtualSelectionMode = !1
                    }
                },this.$getSelectedRows = function (e) {
                    return e = (e || this.getSelectionRange()).collapseRows(), {
                        first: this.session.getRowFoldStart(e.start.row),
                        last: this.session.getRowFoldEnd(e.end.row)
                    }
                },this.onCompositionStart = function (e) {
                    this.renderer.showComposition(this.getCursorPosition())
                },this.onCompositionUpdate = function (e) {
                    this.renderer.setCompositionText(e)
                },this.onCompositionEnd = function () {
                    this.renderer.hideComposition()
                },this.getFirstVisibleRow = function () {
                    return this.renderer.getFirstVisibleRow()
                },this.getLastVisibleRow = function () {
                    return this.renderer.getLastVisibleRow()
                },this.isRowVisible = function (e) {
                    return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow()
                },this.isRowFullyVisible = function (e) {
                    return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow()
                },this.$getVisibleRowCount = function () {
                    return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
                },this.$moveByPage = function (e, t) {
                    var i = this.renderer, n = this.renderer.layerConfig, r = e * Math.floor(n.height / n.lineHeight);
                    this.$blockScrolling++, t === !0 ? this.selection.$moveSelection(function () {
                        this.moveCursorBy(r, 0)
                    }) : t === !1 && (this.selection.moveCursorBy(r, 0), this.selection.clearSelection()), this.$blockScrolling--;
                    var o = i.scrollTop;
                    i.scrollBy(0, r * n.lineHeight), null != t && i.scrollCursorIntoView(null, .5), i.animateScrolling(o)
                },this.selectPageDown = function () {
                    this.$moveByPage(1, !0)
                },this.selectPageUp = function () {
                    this.$moveByPage(-1, !0)
                },this.gotoPageDown = function () {
                    this.$moveByPage(1, !1)
                },this.gotoPageUp = function () {
                    this.$moveByPage(-1, !1)
                },this.scrollPageDown = function () {
                    this.$moveByPage(1)
                },this.scrollPageUp = function () {
                    this.$moveByPage(-1)
                },this.scrollToRow = function (e) {
                    this.renderer.scrollToRow(e)
                },this.scrollToLine = function (e, t, i, n) {
                    this.renderer.scrollToLine(e, t, i, n)
                },this.centerSelection = function () {
                    var e = this.getSelectionRange(), t = {
                        row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2),
                        column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)
                    };
                    this.renderer.alignCursor(t, .5)
                },this.getCursorPosition = function () {
                    return this.selection.getCursor()
                },this.getCursorPositionScreen = function () {
                    return this.session.documentToScreenPosition(this.getCursorPosition())
                },this.getSelectionRange = function () {
                    return this.selection.getRange()
                },this.selectAll = function () {
                    this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1
                },this.clearSelection = function () {
                    this.selection.clearSelection()
                },this.moveCursorTo = function (e, t) {
                    this.selection.moveCursorTo(e, t)
                },this.moveCursorToPosition = function (e) {
                    this.selection.moveCursorToPosition(e)
                },this.jumpToMatching = function (e, t) {
                    var i = this.getCursorPosition(), n = new w(this.session, i.row, i.column), r = n.getCurrentToken(), o = r || n.stepForward();
                    if (o) {
                        var s, a, l = !1, c = {}, h = i.column - o.start, d = {
                            ")": "(",
                            "(": "(",
                            "]": "[",
                            "[": "[",
                            "{": "{",
                            "}": "{"
                        };
                        do {
                            if (o.value.match(/[{}()\[\]]/g)) {
                                for (; h < o.value.length && !l; h++)if (d[o.value[h]])switch (a = d[o.value[h]] + "." + o.type.replace("rparen", "lparen"), isNaN(c[a]) && (c[a] = 0), o.value[h]) {
                                    case"(":
                                    case"[":
                                    case"{":
                                        c[a]++;
                                        break;
                                    case")":
                                    case"]":
                                    case"}":
                                        c[a]--, -1 === c[a] && (s = "bracket", l = !0)
                                }
                            } else o && -1 !== o.type.indexOf("tag-name") && (isNaN(c[o.value]) && (c[o.value] = 0), "<" === r.value ? c[o.value]++ : "</" === r.value && c[o.value]--, -1 === c[o.value] && (s = "tag", l = !0));
                            l || (r = o, o = n.stepForward(), h = 0)
                        } while (o && !l);
                        if (s) {
                            var u, p;
                            if ("bracket" === s)u = this.session.getBracketRange(i), u || (u = new f(n.getCurrentTokenRow(), n.getCurrentTokenColumn() + h - 1, n.getCurrentTokenRow(), n.getCurrentTokenColumn() + h - 1), p = u.start, (t || p.row === i.row && Math.abs(p.column - i.column) < 2) && (u = this.session.getBracketRange(p))); else if ("tag" === s) {
                                if (!o || -1 === o.type.indexOf("tag-name"))return;
                                var m = o.value;
                                if (u = new f(n.getCurrentTokenRow(), n.getCurrentTokenColumn() - 2, n.getCurrentTokenRow(), n.getCurrentTokenColumn() - 2), 0 === u.compare(i.row, i.column)) {
                                    l = !1;
                                    do o = r, r = n.stepBackward(), r && (-1 !== r.type.indexOf("tag-close") && u.setEnd(n.getCurrentTokenRow(), n.getCurrentTokenColumn() + 1), o.value === m && -1 !== o.type.indexOf("tag-name") && ("<" === r.value ? c[m]++ : "</" === r.value && c[m]--, 0 === c[m] && (l = !0))); while (r && !l)
                                }
                                o && o.type.indexOf("tag-name") && (p = u.start, p.row == i.row && Math.abs(p.column - i.column) < 2 && (p = u.end))
                            }
                            p = u && u.cursor || p, p && (e ? u && t ? this.selection.setRange(u) : u && u.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(p.row, p.column) : this.selection.moveTo(p.row, p.column))
                        }
                    }
                },this.gotoLine = function (e, t, i) {
                    this.selection.clearSelection(), this.session.unfold({
                        row: e - 1,
                        column: t || 0
                    }), this.$blockScrolling += 1, this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(e - 1, t || 0), this.$blockScrolling -= 1, this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, i)
                },this.navigateTo = function (e, t) {
                    this.selection.moveTo(e, t)
                },this.navigateUp = function (e) {
                    if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                        var t = this.selection.anchor.getPosition();
                        return this.moveCursorToPosition(t)
                    }
                    this.selection.clearSelection(), this.selection.moveCursorBy(-e || -1, 0)
                },this.navigateDown = function (e) {
                    if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                        var t = this.selection.anchor.getPosition();
                        return this.moveCursorToPosition(t)
                    }
                    this.selection.clearSelection(), this.selection.moveCursorBy(e || 1, 0)
                },this.navigateLeft = function (e) {
                    if (this.selection.isEmpty())for (e = e || 1; e--;)this.selection.moveCursorLeft(); else {
                        var t = this.getSelectionRange().start;
                        this.moveCursorToPosition(t)
                    }
                    this.clearSelection()
                },this.navigateRight = function (e) {
                    if (this.selection.isEmpty())for (e = e || 1; e--;)this.selection.moveCursorRight(); else {
                        var t = this.getSelectionRange().end;
                        this.moveCursorToPosition(t)
                    }
                    this.clearSelection()
                },this.navigateLineStart = function () {
                    this.selection.moveCursorLineStart(), this.clearSelection()
                },this.navigateLineEnd = function () {
                    this.selection.moveCursorLineEnd(), this.clearSelection()
                },this.navigateFileEnd = function () {
                    this.selection.moveCursorFileEnd(), this.clearSelection()
                },this.navigateFileStart = function () {
                    this.selection.moveCursorFileStart(), this.clearSelection()
                },this.navigateWordRight = function () {
                    this.selection.moveCursorWordRight(), this.clearSelection()
                },this.navigateWordLeft = function () {
                    this.selection.moveCursorWordLeft(), this.clearSelection()
                },this.replace = function (e, t) {
                    t && this.$search.set(t);
                    var i = this.$search.find(this.session), n = 0;
                    return i ? (this.$tryReplace(i, e) && (n = 1), null !== i && (this.selection.setSelectionRange(i), this.renderer.scrollSelectionIntoView(i.start, i.end)), n) : n
                },this.replaceAll = function (e, t) {
                    t && this.$search.set(t);
                    var i = this.$search.findAll(this.session), n = 0;
                    if (!i.length)return n;
                    this.$blockScrolling += 1;
                    var r = this.getSelectionRange();
                    this.selection.moveTo(0, 0);
                    for (var o = i.length - 1; o >= 0; --o)this.$tryReplace(i[o], e) && n++;
                    return this.selection.setSelectionRange(r), this.$blockScrolling -= 1, n
                },this.$tryReplace = function (e, t) {
                    var i = this.session.getTextRange(e);
                    return t = this.$search.replace(i, t), null !== t ? (e.end = this.session.replace(e, t), e) : null
                },this.getLastSearchOptions = function () {
                    return this.$search.getOptions()
                },this.find = function (e, t, i) {
                    t || (t = {}), "string" == typeof e || e instanceof RegExp ? t.needle = e : "object" == typeof e && n.mixin(t, e);
                    var r = this.selection.getRange();
                    null == t.needle && (e = this.session.getTextRange(r) || this.$search.$options.needle, e || (r = this.session.getWordRange(r.start.row, r.start.column), e = this.session.getTextRange(r)), this.$search.set({needle: e})), this.$search.set(t), t.start || this.$search.set({start: r});
                    var o = this.$search.find(this.session);
                    return t.preventScroll ? o : o ? (this.revealRange(o, i), o) : (t.backwards ? r.start = r.end : r.end = r.start, void this.selection.setRange(r))
                },this.findNext = function (e, t) {
                    this.find({skipCurrent: !0, backwards: !1}, e, t)
                },this.findPrevious = function (e, t) {
                    this.find(e, {skipCurrent: !0, backwards: !0}, t)
                },this.revealRange = function (e, t) {
                    this.$blockScrolling += 1, this.session.unfold(e), this.selection.setSelectionRange(e), this.$blockScrolling -= 1;
                    var i = this.renderer.scrollTop;
                    this.renderer.scrollSelectionIntoView(e.start, e.end, .5), t !== !1 && this.renderer.animateScrolling(i)
                },this.undo = function () {
                    this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
                },this.redo = function () {
                    this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
                },this.destroy = function () {
                    this.renderer.destroy(), this._signal("destroy", this), this.session && this.session.destroy()
                },this.setAutoScrollEditorIntoView = function (e) {
                    if (e) {
                        var t, i = this, n = !1;
                        this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
                        var r = this.$scrollAnchor;
                        r.style.cssText = "position:absolute", this.container.insertBefore(r, this.container.firstChild);
                        var o = this.on("changeSelection", function () {
                            n = !0
                        }), s = this.renderer.on("beforeRender", function () {
                            n && (t = i.renderer.container.getBoundingClientRect())
                        }), a = this.renderer.on("afterRender", function () {
                            if (n && t && (i.isFocused() || i.searchBox && i.searchBox.isFocused())) {
                                var e = i.renderer, o = e.$cursorLayer.$pixelPos, s = e.layerConfig, a = o.top - s.offset;
                                n = o.top >= 0 && a + t.top < 0 ? !0 : o.top < s.height && o.top + t.top + s.lineHeight > window.innerHeight ? !1 : null, null != n && (r.style.top = a + "px", r.style.left = o.left + "px", r.style.height = s.lineHeight + "px", r.scrollIntoView(n)), n = t = null
                            }
                        });
                        this.setAutoScrollEditorIntoView = function (e) {
                            e || (delete this.setAutoScrollEditorIntoView, this.removeEventListener("changeSelection", o), this.renderer.removeEventListener("afterRender", a), this.renderer.removeEventListener("beforeRender", s))
                        }
                    }
                },this.$resetCursorStyle = function () {
                    var e = this.$cursorStyle || "ace", t = this.renderer.$cursorLayer;
                    t && (t.setSmoothBlinking(/smooth/.test(e)), t.isBlinking = !this.$readOnly && "wide" != e, r.setCssClass(t.element, "ace_slim-cursors", /slim/.test(e)))
                }
            }).call(y.prototype), v.defineOptions(y.prototype, "editor", {
                selectionStyle: {
                    set: function (e) {
                        this.onSelectionChange(), this._signal("changeSelectionStyle", {data: e})
                    }, initialValue: "line"
                },
                highlightActiveLine: {
                    set: function () {
                        this.$updateHighlightActiveLine()
                    }, initialValue: !0
                },
                highlightSelectedWord: {
                    set: function (e) {
                        this.$onSelectionChange()
                    }, initialValue: !0
                },
                readOnly: {
                    set: function (e) {
                        this.$resetCursorStyle()
                    }, initialValue: !1
                },
                cursorStyle: {
                    set: function (e) {
                        this.$resetCursorStyle()
                    }, values: ["ace", "slim", "smooth", "wide"], initialValue: "ace"
                },
                mergeUndoDeltas: {values: [!1, !0, "always"], initialValue: !0},
                behavioursEnabled: {initialValue: !0},
                wrapBehavioursEnabled: {initialValue: !0},
                autoScrollEditorIntoView: {
                    set: function (e) {
                        this.setAutoScrollEditorIntoView(e)
                    }
                },
                hScrollBarAlwaysVisible: "renderer",
                vScrollBarAlwaysVisible: "renderer",
                highlightGutterLine: "renderer",
                animatedScroll: "renderer",
                showInvisibles: "renderer",
                showPrintMargin: "renderer",
                printMarginColumn: "renderer",
                printMargin: "renderer",
                fadeFoldWidgets: "renderer",
                showFoldWidgets: "renderer",
                showLineNumbers: "renderer",
                showGutter: "renderer",
                displayIndentGuides: "renderer",
                fontSize: "renderer",
                fontFamily: "renderer",
                maxLines: "renderer",
                minLines: "renderer",
                scrollPastEnd: "renderer",
                fixedWidthGutter: "renderer",
                theme: "renderer",
                scrollSpeed: "$mouseHandler",
                dragDelay: "$mouseHandler",
                dragEnabled: "$mouseHandler",
                focusTimout: "$mouseHandler",
                tooltipFollowsMouse: "$mouseHandler",
                firstLineNumber: "session",
                overwrite: "session",
                newLineMode: "session",
                useWorker: "session",
                useSoftTabs: "session",
                tabSize: "session",
                wrap: "session",
                indentedSoftWrap: "session",
                foldStyle: "session",
                mode: "session"
            }), t.Editor = y
        }), ace.define("ace/undomanager", ["require", "exports", "module"], function (e, t, i) {
            "use strict";
            var n = function () {
                this.reset()
            };
            (function () {
                function e(e) {
                    return {
                        action: e.action,
                        start: e.start,
                        end: e.end,
                        lines: 1 == e.lines.length ? null : e.lines,
                        text: 1 == e.lines.length ? e.lines[0] : null
                    }
                }

                function t(e) {
                    return {action: e.action, start: e.start, end: e.end, lines: e.lines || [e.text]}
                }

                function i(e, t) {
                    for (var i = new Array(e.length), n = 0; n < e.length; n++) {
                        for (var r = e[n], o = {
                            group: r.group,
                            deltas: new Array(r.length)
                        }, s = 0; s < r.deltas.length; s++) {
                            var a = r.deltas[s];
                            o.deltas[s] = t(a)
                        }
                        i[n] = o
                    }
                    return i
                }

                this.execute = function (e) {
                    var t = e.args[0];
                    this.$doc = e.args[1], e.merge && this.hasUndo() && (this.dirtyCounter--, t = this.$undoStack.pop().concat(t)), this.$undoStack.push(t), this.$redoStack = [], this.dirtyCounter < 0 && (this.dirtyCounter = NaN), this.dirtyCounter++
                }, this.undo = function (e) {
                    var t = this.$undoStack.pop(), i = null;
                    return t && (i = this.$doc.undoChanges(t, e), this.$redoStack.push(t), this.dirtyCounter--), i
                }, this.redo = function (e) {
                    var t = this.$redoStack.pop(), i = null;
                    return t && (i = this.$doc.redoChanges(this.$deserializeDeltas(t), e), this.$undoStack.push(t), this.dirtyCounter++), i
                }, this.reset = function () {
                    this.$undoStack = [], this.$redoStack = [], this.dirtyCounter = 0
                }, this.hasUndo = function () {
                    return this.$undoStack.length > 0
                }, this.hasRedo = function () {
                    return this.$redoStack.length > 0
                }, this.markClean = function () {
                    this.dirtyCounter = 0
                }, this.isClean = function () {
                    return 0 === this.dirtyCounter
                }, this.$serializeDeltas = function (t) {
                    return i(t, e)
                }, this.$deserializeDeltas = function (e) {
                    return i(e, t)
                }
            }).call(n.prototype), t.UndoManager = n
        }), ace.define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter"], function (e, t, i) {
            "use strict";
            var n = e("../lib/dom"), r = e("../lib/oop"), o = e("../lib/lang"), s = e("../lib/event_emitter").EventEmitter, a = function (e) {
                this.element = n.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$cells = []
            };
            (function () {
                r.implement(this, s), this.setSession = function (e) {
                    this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = e, e && e.on("change", this.$updateAnnotations)
                }, this.addGutterDecoration = function (e, t) {
                    window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t)
                }, this.removeGutterDecoration = function (e, t) {
                    window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t)
                }, this.setAnnotations = function (e) {
                    this.$annotations = [];
                    for (var t = 0; t < e.length; t++) {
                        var i = e[t], n = i.row, r = this.$annotations[n];
                        r || (r = this.$annotations[n] = {text: []});
                        var s = i.text;
                        s = s ? o.escapeHTML(s) : i.html || "", -1 === r.text.indexOf(s) && r.text.push(s);
                        var a = i.type;
                        "error" == a ? r.className = " ace_error" : "warning" == a && " ace_error" != r.className ? r.className = " ace_warning" : "info" != a || r.className || (r.className = " ace_info")
                    }
                }, this.$updateAnnotations = function (e) {
                    if (this.$annotations.length) {
                        var t = e.start.row, i = e.end.row - t;
                        if (0 === i); else if ("remove" == e.action)this.$annotations.splice(t, i + 1, null); else {
                            var n = new Array(i + 1);
                            n.unshift(t, 1), this.$annotations.splice.apply(this.$annotations, n)
                        }
                    }
                }, this.update = function (e) {
                    for (var t = this.session, i = e.firstRow, r = Math.min(e.lastRow + e.gutterOffset, t.getLength() - 1), o = t.getNextFoldLine(i), s = o ? o.start.row : 1 / 0, a = this.$showFoldWidgets && t.foldWidgets, l = t.$breakpoints, c = t.$decorations, h = t.$firstLineNumber, d = 0, u = t.gutterRenderer || this.$renderer, f = null, p = -1, m = i; ;) {
                        if (m > s && (m = o.end.row + 1, o = t.getNextFoldLine(m, o), s = o ? o.start.row : 1 / 0), m > r) {
                            for (; this.$cells.length > p + 1;)f = this.$cells.pop(), this.element.removeChild(f.element);
                            break
                        }
                        f = this.$cells[++p], f || (f = {
                            element: null,
                            textNode: null,
                            foldWidget: null
                        }, f.element = n.createElement("div"), f.textNode = document.createTextNode(""), f.element.appendChild(f.textNode), this.element.appendChild(f.element), this.$cells[p] = f);
                        var g = "ace_gutter-cell ";
                        l[m] && (g += l[m]), c[m] && (g += c[m]), this.$annotations[m] && (g += this.$annotations[m].className), f.element.className != g && (f.element.className = g);
                        var v = t.getRowLength(m) * e.lineHeight + "px";
                        if (v != f.element.style.height && (f.element.style.height = v), a) {
                            var w = a[m];
                            null == w && (w = a[m] = t.getFoldWidget(m))
                        }
                        if (w) {
                            f.foldWidget || (f.foldWidget = n.createElement("span"), f.element.appendChild(f.foldWidget));
                            var g = "ace_fold-widget ace_" + w;
                            g += "start" == w && m == s && m < o.end.row ? " ace_closed" : " ace_open", f.foldWidget.className != g && (f.foldWidget.className = g);
                            var v = e.lineHeight + "px";
                            f.foldWidget.style.height != v && (f.foldWidget.style.height = v)
                        } else f.foldWidget && (f.element.removeChild(f.foldWidget), f.foldWidget = null);
                        var y = d = u ? u.getText(t, m) : m + h;
                        y != f.textNode.data && (f.textNode.data = y), m++
                    }
                    this.element.style.height = e.minHeight + "px", (this.$fixedWidth || t.$useWrapMode) && (d = t.getLength() + h);
                    var A = u ? u.getWidth(t, d, e) : d.toString().length * e.characterWidth, E = this.$padding || this.$computePadding();
                    A += E.left + E.right, A === this.gutterWidth || isNaN(A) || (this.gutterWidth = A, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", A))
                }, this.$fixedWidth = !1, this.$showLineNumbers = !0, this.$renderer = "", this.setShowLineNumbers = function (e) {
                    this.$renderer = !e && {
                            getWidth: function () {
                                return ""
                            }, getText: function () {
                                return ""
                            }
                        }
                }, this.getShowLineNumbers = function () {
                    return this.$showLineNumbers
                }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function (e) {
                    e ? n.addCssClass(this.element, "ace_folding-enabled") : n.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null
                }, this.getShowFoldWidgets = function () {
                    return this.$showFoldWidgets
                }, this.$computePadding = function () {
                    if (!this.element.firstChild)return {left: 0, right: 0};
                    var e = n.computedStyle(this.element.firstChild);
                    return this.$padding = {}, this.$padding.left = parseInt(e.paddingLeft) + 1 || 0, this.$padding.right = parseInt(e.paddingRight) || 0, this.$padding
                }, this.getRegion = function (e) {
                    var t = this.$padding || this.$computePadding(), i = this.element.getBoundingClientRect();
                    return e.x < t.left + i.left ? "markers" : this.$showFoldWidgets && e.x > i.right - t.right ? "foldWidgets" : void 0
                }
            }).call(a.prototype), t.Gutter = a
        }), ace.define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function (e, t, i) {
            "use strict";
            var n = e("../range").Range, r = e("../lib/dom"), o = function (e) {
                this.element = r.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element)
            };
            (function () {
                function e(e, t, i, n) {
                    return (e ? 1 : 0) | (t ? 2 : 0) | (i ? 4 : 0) | (n ? 8 : 0)
                }

                this.$padding = 0, this.setPadding = function (e) {
                    this.$padding = e
                }, this.setSession = function (e) {
                    this.session = e
                }, this.setMarkers = function (e) {
                    this.markers = e
                }, this.update = function (e) {
                    var e = e || this.config;
                    if (e) {
                        this.config = e;
                        var t = [];
                        for (var i in this.markers) {
                            var n = this.markers[i];
                            if (n.range) {
                                var r = n.range.clipRows(e.firstRow, e.lastRow);
                                if (!r.isEmpty())if (r = r.toScreenRange(this.session), n.renderer) {
                                    var o = this.$getTop(r.start.row, e), s = this.$padding + r.start.column * e.characterWidth;
                                    n.renderer(t, r, s, o, e)
                                } else"fullLine" == n.type ? this.drawFullLineMarker(t, r, n.clazz, e) : "screenLine" == n.type ? this.drawScreenLineMarker(t, r, n.clazz, e) : r.isMultiLine() ? "text" == n.type ? this.drawTextMarker(t, r, n.clazz, e) : this.drawMultiLineMarker(t, r, n.clazz, e) : this.drawSingleLineMarker(t, r, n.clazz + " ace_start ace_br15", e)
                            } else n.update(t, this, this.session, e)
                        }
                        this.element.innerHTML = t.join("")
                    }
                }, this.$getTop = function (e, t) {
                    return (e - t.firstRowScreen) * t.lineHeight
                }, this.drawTextMarker = function (t, i, r, o, s) {
                    for (var a = this.session, l = i.start.row, c = i.end.row, h = l, d = 0, u = 0, f = a.getScreenLastRowColumn(h), p = new n(h, i.start.column, h, u); c >= h; h++)p.start.row = p.end.row = h, p.start.column = h == l ? i.start.column : a.getRowWrapIndent(h), p.end.column = f, d = u, u = f, f = c > h + 1 ? a.getScreenLastRowColumn(h + 1) : h == c ? 0 : i.end.column, this.drawSingleLineMarker(t, p, r + (h == l ? " ace_start" : "") + " ace_br" + e(h == l || h == l + 1 && i.start.column, u > d, u > f, h == c), o, h == c ? 0 : 1, s)
                }, this.drawMultiLineMarker = function (e, t, i, n, r) {
                    var o = this.$padding, s = n.lineHeight, a = this.$getTop(t.start.row, n), l = o + t.start.column * n.characterWidth;
                    r = r || "", e.push("<div class='", i, " ace_br1 ace_start' style='", "height:", s, "px;", "right:0;", "top:", a, "px;", "left:", l, "px;", r, "'></div>"), a = this.$getTop(t.end.row, n);
                    var c = t.end.column * n.characterWidth;
                    if (e.push("<div class='", i, " ace_br12' style='", "height:", s, "px;", "width:", c, "px;", "top:", a, "px;", "left:", o, "px;", r, "'></div>"), s = (t.end.row - t.start.row - 1) * n.lineHeight, !(0 >= s)) {
                        a = this.$getTop(t.start.row + 1, n);
                        var h = (t.start.column ? 1 : 0) | (t.end.column ? 0 : 8);
                        e.push("<div class='", i, h ? " ace_br" + h : "", "' style='", "height:", s, "px;", "right:0;", "top:", a, "px;", "left:", o, "px;", r, "'></div>")
                    }
                }, this.drawSingleLineMarker = function (e, t, i, n, r, o) {
                    var s = n.lineHeight, a = (t.end.column + (r || 0) - t.start.column) * n.characterWidth, l = this.$getTop(t.start.row, n), c = this.$padding + t.start.column * n.characterWidth;
                    e.push("<div class='", i, "' style='", "height:", s, "px;", "width:", a, "px;", "top:", l, "px;", "left:", c, "px;", o || "", "'></div>")
                }, this.drawFullLineMarker = function (e, t, i, n, r) {
                    var o = this.$getTop(t.start.row, n), s = n.lineHeight;
                    t.start.row != t.end.row && (s += this.$getTop(t.end.row, n) - o), e.push("<div class='", i, "' style='", "height:", s, "px;", "top:", o, "px;", "left:0;right:0;", r || "", "'></div>")
                }, this.drawScreenLineMarker = function (e, t, i, n, r) {
                    var o = this.$getTop(t.start.row, n), s = n.lineHeight;
                    e.push("<div class='", i, "' style='", "height:", s, "px;", "top:", o, "px;", "left:0;right:0;", r || "", "'></div>")
                }
            }).call(o.prototype), t.Marker = o
        }), ace.define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function (e, t, i) {
            "use strict";
            var n = e("../lib/oop"), r = e("../lib/dom"), o = e("../lib/lang"), s = (e("../lib/useragent"), e("../lib/event_emitter").EventEmitter), a = function (e) {
                this.element = r.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$updateEolChar = this.$updateEolChar.bind(this)
            };
            (function () {
                n.implement(this, s), this.EOF_CHAR = "¶", this.EOL_CHAR_LF = "¬", this.EOL_CHAR_CRLF = "¤", this.EOL_CHAR = this.EOL_CHAR_LF, this.TAB_CHAR = "—", this.SPACE_CHAR = "·", this.$padding = 0, this.$updateEolChar = function () {
                    var e = "\n" == this.session.doc.getNewLineCharacter() ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
                    return this.EOL_CHAR != e ? (this.EOL_CHAR = e, !0) : void 0
                }, this.setPadding = function (e) {
                    this.$padding = e, this.element.style.padding = "0 " + e + "px"
                }, this.getLineHeight = function () {
                    return this.$fontMetrics.$characterSize.height || 0
                }, this.getCharacterWidth = function () {
                    return this.$fontMetrics.$characterSize.width || 0
                }, this.$setFontMetrics = function (e) {
                    this.$fontMetrics = e, this.$fontMetrics.on("changeCharacterSize", function (e) {
                        this._signal("changeCharacterSize", e)
                    }.bind(this)), this.$pollSizeChanges()
                }, this.checkForSizeChanges = function () {
                    this.$fontMetrics.checkForSizeChanges()
                }, this.$pollSizeChanges = function () {
                    return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges()
                }, this.setSession = function (e) {
                    this.session = e, e && this.$computeTabString()
                }, this.showInvisibles = !1, this.setShowInvisibles = function (e) {
                    return this.showInvisibles == e ? !1 : (this.showInvisibles = e, this.$computeTabString(), !0)
                }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function (e) {
                    return this.displayIndentGuides == e ? !1 : (this.displayIndentGuides = e, this.$computeTabString(), !0)
                }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function () {
                    var e = this.session.getTabSize();
                    this.tabSize = e;
                    for (var t = this.$tabStrings = [0], i = 1; e + 1 > i; i++)this.showInvisibles ? t.push("<span class='ace_invisible ace_invisible_tab'>" + o.stringRepeat(this.TAB_CHAR, i) + "</span>") : t.push(o.stringRepeat(" ", i));
                    if (this.displayIndentGuides) {
                        this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                        var n = "ace_indent-guide", r = "", s = "";
                        if (this.showInvisibles) {
                            n += " ace_invisible", r = " ace_invisible_space", s = " ace_invisible_tab";
                            var a = o.stringRepeat(this.SPACE_CHAR, this.tabSize), l = o.stringRepeat(this.TAB_CHAR, this.tabSize)
                        } else var a = o.stringRepeat(" ", this.tabSize), l = a;
                        this.$tabStrings[" "] = "<span class='" + n + r + "'>" + a + "</span>", this.$tabStrings["	"] = "<span class='" + n + s + "'>" + l + "</span>"
                    }
                }, this.updateLines = function (e, t, i) {
                    (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) && this.scrollLines(e), this.config = e;
                    for (var n = Math.max(t, e.firstRow), r = Math.min(i, e.lastRow), o = this.element.childNodes, s = 0, a = e.firstRow; n > a; a++) {
                        var l = this.session.getFoldLine(a);
                        if (l) {
                            if (l.containsRow(n)) {
                                n = l.start.row;
                                break
                            }
                            a = l.end.row
                        }
                        s++
                    }
                    for (var a = n, l = this.session.getNextFoldLine(a), c = l ? l.start.row : 1 / 0; ;) {
                        if (a > c && (a = l.end.row + 1, l = this.session.getNextFoldLine(a, l), c = l ? l.start.row : 1 / 0), a > r)break;
                        var h = o[s++];
                        if (h) {
                            var d = [];
                            this.$renderLine(d, a, !this.$useLineGroups(), a == c ? l : !1), h.style.height = e.lineHeight * this.session.getRowLength(a) + "px", h.innerHTML = d.join("")
                        }
                        a++
                    }
                }, this.scrollLines = function (e) {
                    var t = this.config;
                    if (this.config = e, !t || t.lastRow < e.firstRow)return this.update(e);
                    if (e.lastRow < t.firstRow)return this.update(e);
                    var i = this.element;
                    if (t.firstRow < e.firstRow)for (var n = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); n > 0; n--)i.removeChild(i.firstChild);
                    if (t.lastRow > e.lastRow)for (var n = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); n > 0; n--)i.removeChild(i.lastChild);
                    if (e.firstRow < t.firstRow) {
                        var r = this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1);
                        i.firstChild ? i.insertBefore(r, i.firstChild) : i.appendChild(r)
                    }
                    if (e.lastRow > t.lastRow) {
                        var r = this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow);
                        i.appendChild(r)
                    }
                }, this.$renderLinesFragment = function (e, t, i) {
                    for (var n = this.element.ownerDocument.createDocumentFragment(), o = t, s = this.session.getNextFoldLine(o), a = s ? s.start.row : 1 / 0; ;) {
                        if (o > a && (o = s.end.row + 1, s = this.session.getNextFoldLine(o, s), a = s ? s.start.row : 1 / 0), o > i)break;
                        var l = r.createElement("div"), c = [];
                        if (this.$renderLine(c, o, !1, o == a ? s : !1), l.innerHTML = c.join(""), this.$useLineGroups())l.className = "ace_line_group", n.appendChild(l), l.style.height = e.lineHeight * this.session.getRowLength(o) + "px"; else for (; l.firstChild;)n.appendChild(l.firstChild);
                        o++
                    }
                    return n
                }, this.update = function (e) {
                    this.config = e;
                    for (var t = [], i = e.firstRow, n = e.lastRow, r = i, o = this.session.getNextFoldLine(r), s = o ? o.start.row : 1 / 0; ;) {
                        if (r > s && (r = o.end.row + 1, o = this.session.getNextFoldLine(r, o), s = o ? o.start.row : 1 / 0), r > n)break;
                        this.$useLineGroups() && t.push("<div class='ace_line_group' style='height:", e.lineHeight * this.session.getRowLength(r), "px'>"), this.$renderLine(t, r, !1, r == s ? o : !1), this.$useLineGroups() && t.push("</div>"), r++
                    }
                    this.element.innerHTML = t.join("")
                }, this.$textToken = {text: !0, rparen: !0, lparen: !0}, this.$renderToken = function (e, t, i, n) {
                    var r = this, s = /\t|&|<|>|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF\uFFF9-\uFFFC])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g, a = function (e, i, n, s, a) {
                        if (i)return r.showInvisibles ? "<span class='ace_invisible ace_invisible_space'>" + o.stringRepeat(r.SPACE_CHAR, e.length) + "</span>" : e;
                        if ("&" == e)return "&#38;";
                        if ("<" == e)return "&#60;";
                        if (">" == e)return "&#62;";
                        if ("	" == e) {
                            var l = r.session.getScreenTabSize(t + s);
                            return t += l - 1, r.$tabStrings[l]
                        }
                        if ("　" == e) {
                            var c = r.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk", h = r.showInvisibles ? r.SPACE_CHAR : "";
                            return t += 1, "<span class='" + c + "' style='width:" + 2 * r.config.characterWidth + "px'>" + h + "</span>"
                        }
                        return n ? "<span class='ace_invisible ace_invisible_space ace_invalid'>" + r.SPACE_CHAR + "</span>" : (t += 1, "<span class='ace_cjk' style='width:" + 2 * r.config.characterWidth + "px'>" + e + "</span>")
                    }, l = n.replace(s, a);
                    if (this.$textToken[i.type])e.push(l); else {
                        var c = "ace_" + i.type.replace(/\./g, " ace_"), h = "";
                        "fold" == i.type && (h = " style='width:" + i.value.length * this.config.characterWidth + "px;' "), e.push("<span class='", c, "'", h, ">", l, "</span>")
                    }
                    return t + n.length
                }, this.renderIndentGuide = function (e, t, i) {
                    var n = t.search(this.$indentGuideRe);
                    return 0 >= n || n >= i ? t : " " == t[0] ? (n -= n % this.tabSize, e.push(o.stringRepeat(this.$tabStrings[" "], n / this.tabSize)), t.substr(n)) : "	" == t[0] ? (e.push(o.stringRepeat(this.$tabStrings["	"], n)), t.substr(n)) : t
                }, this.$renderWrappedLine = function (e, t, i, n) {
                    for (var r = 0, s = 0, a = i[0], l = 0, c = 0; c < t.length; c++) {
                        var h = t[c], d = h.value;
                        if (0 == c && this.displayIndentGuides) {
                            if (r = d.length, d = this.renderIndentGuide(e, d, a), !d)continue;
                            r -= d.length
                        }
                        if (r + d.length < a)l = this.$renderToken(e, l, h, d), r += d.length; else {
                            for (; r + d.length >= a;)l = this.$renderToken(e, l, h, d.substring(0, a - r)), d = d.substring(a - r), r = a, n || e.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), e.push(o.stringRepeat(" ", i.indent)), s++, l = 0, a = i[s] || Number.MAX_VALUE;
                            0 != d.length && (r += d.length, l = this.$renderToken(e, l, h, d))
                        }
                    }
                }, this.$renderSimpleLine = function (e, t) {
                    var i = 0, n = t[0], r = n.value;
                    this.displayIndentGuides && (r = this.renderIndentGuide(e, r)), r && (i = this.$renderToken(e, i, n, r));
                    for (var o = 1; o < t.length; o++)n = t[o], r = n.value, i = this.$renderToken(e, i, n, r)
                }, this.$renderLine = function (e, t, i, n) {
                    if (n || 0 == n || (n = this.session.getFoldLine(t)), n)var r = this.$getFoldLineTokens(t, n); else var r = this.session.getTokens(t);
                    if (i || e.push("<div class='ace_line' style='height:", this.config.lineHeight * (this.$useLineGroups() ? 1 : this.session.getRowLength(t)), "px'>"), r.length) {
                        var o = this.session.getRowSplitData(t);
                        o && o.length ? this.$renderWrappedLine(e, r, o, i) : this.$renderSimpleLine(e, r)
                    }
                    this.showInvisibles && (n && (t = n.end.row), e.push("<span class='ace_invisible ace_invisible_eol'>", t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")), i || e.push("</div>")
                }, this.$getFoldLineTokens = function (e, t) {
                    function i(e, t, i) {
                        for (var n = 0, o = 0; o + e[n].value.length < t;)if (o += e[n].value.length, n++, n == e.length)return;
                        if (o != t) {
                            var s = e[n].value.substring(t - o);
                            s.length > i - t && (s = s.substring(0, i - t)), r.push({
                                type: e[n].type,
                                value: s
                            }), o = t + s.length, n += 1
                        }
                        for (; i > o && n < e.length;) {
                            var s = e[n].value;
                            s.length + o > i ? r.push({
                                type: e[n].type,
                                value: s.substring(0, i - o)
                            }) : r.push(e[n]), o += s.length, n += 1
                        }
                    }

                    var n = this.session, r = [], o = n.getTokens(e);
                    return t.walk(function (e, t, s, a, l) {
                        null != e ? r.push({
                            type: "fold",
                            value: e
                        }) : (l && (o = n.getTokens(t)), o.length && i(o, a, s))
                    }, t.end.row, this.session.getLine(t.end.row).length), r
                }, this.$useLineGroups = function () {
                    return this.session.getUseWrapMode()
                }, this.destroy = function () {
                    clearInterval(this.$pollSizeChangesTimer), this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode), delete this.$measureNode
                }
            }).call(a.prototype), t.Text = a
        }), ace.define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function (e, t, i) {
            "use strict";
            var n, r = e("../lib/dom"), o = function (e) {
                this.element = r.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), void 0 === n && (n = !("opacity"in this.element.style)), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), r.addCssClass(this.element, "ace_hidden-cursors"), this.$updateCursors = (n ? this.$updateVisibility : this.$updateOpacity).bind(this)
            };
            (function () {
                this.$updateVisibility = function (e) {
                    for (var t = this.cursors, i = t.length; i--;)t[i].style.visibility = e ? "" : "hidden"
                }, this.$updateOpacity = function (e) {
                    for (var t = this.cursors, i = t.length; i--;)t[i].style.opacity = e ? "" : "0"
                }, this.$padding = 0, this.setPadding = function (e) {
                    this.$padding = e
                }, this.setSession = function (e) {
                    this.session = e
                }, this.setBlinking = function (e) {
                    e != this.isBlinking && (this.isBlinking = e, this.restartTimer())
                }, this.setBlinkInterval = function (e) {
                    e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer())
                }, this.setSmoothBlinking = function (e) {
                    e == this.smoothBlinking || n || (this.smoothBlinking = e, r.setCssClass(this.element, "ace_smooth-blinking", e), this.$updateCursors(!0), this.$updateCursors = this.$updateOpacity.bind(this), this.restartTimer())
                }, this.addCursor = function () {
                    var e = r.createElement("div");
                    return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e
                }, this.removeCursor = function () {
                    if (this.cursors.length > 1) {
                        var e = this.cursors.pop();
                        return e.parentNode.removeChild(e), e
                    }
                }, this.hideCursor = function () {
                    this.isVisible = !1, r.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
                }, this.showCursor = function () {
                    this.isVisible = !0, r.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
                }, this.restartTimer = function () {
                    var e = this.$updateCursors;
                    if (clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.smoothBlinking && r.removeCssClass(this.element, "ace_smooth-blinking"), e(!0), this.isBlinking && this.blinkInterval && this.isVisible) {
                        this.smoothBlinking && setTimeout(function () {
                            r.addCssClass(this.element, "ace_smooth-blinking")
                        }.bind(this));
                        var t = function () {
                            this.timeoutId = setTimeout(function () {
                                e(!1)
                            }, .6 * this.blinkInterval)
                        }.bind(this);
                        this.intervalId = setInterval(function () {
                            e(!0), t()
                        }, this.blinkInterval), t()
                    }
                }, this.getPixelPosition = function (e, t) {
                    if (!this.config || !this.session)return {left: 0, top: 0};
                    e || (e = this.session.selection.getCursor());
                    var i = this.session.documentToScreenPosition(e), n = this.$padding + i.column * this.config.characterWidth, r = (i.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
                    return {left: n, top: r}
                }, this.update = function (e) {
                    this.config = e;
                    var t = this.session.$selectionMarkers, i = 0, n = 0;
                    (void 0 === t || 0 === t.length) && (t = [{cursor: null}]);
                    for (var i = 0, r = t.length; r > i; i++) {
                        var o = this.getPixelPosition(t[i].cursor, !0);
                        if (!((o.top > e.height + e.offset || o.top < 0) && i > 1)) {
                            var s = (this.cursors[n++] || this.addCursor()).style;
                            this.drawCursor ? this.drawCursor(s, o, e, t[i], this.session) : (s.left = o.left + "px", s.top = o.top + "px", s.width = e.characterWidth + "px", s.height = e.lineHeight + "px")
                        }
                    }
                    for (; this.cursors.length > n;)this.removeCursor();
                    var a = this.session.getOverwrite();
                    this.$setOverwrite(a), this.$pixelPos = o, this.restartTimer()
                }, this.drawCursor = null, this.$setOverwrite = function (e) {
                    e != this.overwrite && (this.overwrite = e, e ? r.addCssClass(this.element, "ace_overwrite-cursors") : r.removeCssClass(this.element, "ace_overwrite-cursors"))
                }, this.destroy = function () {
                    clearInterval(this.intervalId), clearTimeout(this.timeoutId)
                }
            }).call(o.prototype), t.Cursor = o
        }), ace.define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function (e, t, i) {
            "use strict";
            var n = e("./lib/oop"), r = e("./lib/dom"), o = e("./lib/event"), s = e("./lib/event_emitter").EventEmitter, a = function (e) {
                this.element = r.createElement("div"), this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix, this.inner = r.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.element.appendChild(this.inner), e.appendChild(this.element), this.setVisible(!1), this.skipEvent = !1, o.addListener(this.element, "scroll", this.onScroll.bind(this)), o.addListener(this.element, "mousedown", o.preventDefault)
            };
            (function () {
                n.implement(this, s), this.setVisible = function (e) {
                    this.element.style.display = e ? "" : "none", this.isVisible = e
                }
            }).call(a.prototype);
            var l = function (e, t) {
                a.call(this, e), this.scrollTop = 0, t.$scrollbarWidth = this.width = r.scrollbarWidth(e.ownerDocument), this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px"
            };
            n.inherits(l, a), function () {
                this.classSuffix = "-v", this.onScroll = function () {
                    this.skipEvent || (this.scrollTop = this.element.scrollTop, this._emit("scroll", {data: this.scrollTop})), this.skipEvent = !1
                }, this.getWidth = function () {
                    return this.isVisible ? this.width : 0
                }, this.setHeight = function (e) {
                    this.element.style.height = e + "px"
                }, this.setInnerHeight = function (e) {
                    this.inner.style.height = e + "px"
                }, this.setScrollHeight = function (e) {
                    this.inner.style.height = e + "px"
                }, this.setScrollTop = function (e) {
                    this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = this.element.scrollTop = e)
                }
            }.call(l.prototype);
            var c = function (e, t) {
                a.call(this, e), this.scrollLeft = 0, this.height = t.$scrollbarWidth, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px"
            };
            n.inherits(c, a), function () {
                this.classSuffix = "-h", this.onScroll = function () {
                    this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", {data: this.scrollLeft})), this.skipEvent = !1
                }, this.getHeight = function () {
                    return this.isVisible ? this.height : 0
                }, this.setWidth = function (e) {
                    this.element.style.width = e + "px"
                }, this.setInnerWidth = function (e) {
                    this.inner.style.width = e + "px"
                }, this.setScrollWidth = function (e) {
                    this.inner.style.width = e + "px"
                }, this.setScrollLeft = function (e) {
                    this.scrollLeft != e && (this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = e)
                }
            }.call(c.prototype), t.ScrollBar = l, t.ScrollBarV = l, t.ScrollBarH = c, t.VScrollBar = l, t.HScrollBar = c
        }), ace.define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function (e, t, i) {
            "use strict";
            var n = e("./lib/event"), r = function (e, t) {
                this.onRender = e, this.pending = !1, this.changes = 0, this.window = t || window
            };
            (function () {
                this.schedule = function (e) {
                    if (this.changes = this.changes | e, !this.pending && this.changes) {
                        this.pending = !0;
                        var t = this;
                        n.nextFrame(function () {
                            t.pending = !1;
                            for (var e; e = t.changes;)t.changes = 0, t.onRender(e)
                        }, this.window)
                    }
                }
            }).call(r.prototype), t.RenderLoop = r
        }), ace.define("ace/layer/font_metrics", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function (e, t, i) {
            var n = e("../lib/oop"), r = e("../lib/dom"), o = e("../lib/lang"), s = e("../lib/useragent"), a = e("../lib/event_emitter").EventEmitter, l = 0, c = t.FontMetrics = function (e, t) {
                this.el = r.createElement("div"), this.$setMeasureNodeStyles(this.el.style, !0), this.$main = r.createElement("div"), this.$setMeasureNodeStyles(this.$main.style), this.$measureNode = r.createElement("div"), this.$setMeasureNodeStyles(this.$measureNode.style), this.el.appendChild(this.$main), this.el.appendChild(this.$measureNode), e.appendChild(this.el), l || this.$testFractionalRect(), this.$measureNode.innerHTML = o.stringRepeat("X", l), this.$characterSize = {
                    width: 0,
                    height: 0
                }, this.checkForSizeChanges()
            };
            (function () {
                n.implement(this, a), this.$characterSize = {
                    width: 0,
                    height: 0
                }, this.$testFractionalRect = function () {
                    var e = r.createElement("div");
                    this.$setMeasureNodeStyles(e.style), e.style.width = "0.2px", document.documentElement.appendChild(e);
                    var t = e.getBoundingClientRect().width;
                    l = t > 0 && 1 > t ? 50 : 100, e.parentNode.removeChild(e)
                }, this.$setMeasureNodeStyles = function (e, t) {
                    e.width = e.height = "auto", e.left = e.top = "0px", e.visibility = "hidden", e.position = "absolute", e.whiteSpace = "pre", s.isIE < 8 ? e["font-family"] = "inherit" : e.font = "inherit", e.overflow = t ? "hidden" : "visible"
                }, this.checkForSizeChanges = function () {
                    var e = this.$measureSizes();
                    if (e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
                        this.$measureNode.style.fontWeight = "bold";
                        var t = this.$measureSizes();
                        this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.charSizes = Object.create(null), this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", {data: e})
                    }
                }, this.$pollSizeChanges = function () {
                    if (this.$pollSizeChangesTimer)return this.$pollSizeChangesTimer;
                    var e = this;
                    return this.$pollSizeChangesTimer = setInterval(function () {
                        e.checkForSizeChanges()
                    }, 500)
                }, this.setPolling = function (e) {
                    e ? this.$pollSizeChanges() : this.$pollSizeChangesTimer && (clearInterval(this.$pollSizeChangesTimer), this.$pollSizeChangesTimer = 0)
                }, this.$measureSizes = function () {
                    if (50 === l) {
                        var e = null;
                        try {
                            e = this.$measureNode.getBoundingClientRect()
                        } catch (t) {
                            e = {width: 0, height: 0}
                        }
                        var i = {height: e.height, width: e.width / l}
                    } else var i = {height: this.$measureNode.clientHeight, width: this.$measureNode.clientWidth / l};
                    return 0 === i.width || 0 === i.height ? null : i
                }, this.$measureCharWidth = function (e) {
                    this.$main.innerHTML = o.stringRepeat(e, l);
                    var t = this.$main.getBoundingClientRect();
                    return t.width / l
                }, this.getCharacterWidth = function (e) {
                    var t = this.charSizes[e];
                    return void 0 === t && (t = this.charSizes[e] = this.$measureCharWidth(e) / this.$characterSize.width), t
                }, this.destroy = function () {
                    clearInterval(this.$pollSizeChangesTimer), this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
                }
            }).call(c.prototype)
        }), ace.define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/config", "ace/lib/useragent", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/scrollbar", "ace/renderloop", "ace/layer/font_metrics", "ace/lib/event_emitter"], function (e, t, i) {
            "use strict";
            var n = e("./lib/oop"), r = e("./lib/dom"), o = e("./config"), s = e("./lib/useragent"), a = e("./layer/gutter").Gutter, l = e("./layer/marker").Marker, c = e("./layer/text").Text, h = e("./layer/cursor").Cursor, d = e("./scrollbar").HScrollBar, u = e("./scrollbar").VScrollBar, f = e("./renderloop").RenderLoop, p = e("./layer/font_metrics").FontMetrics, m = e("./lib/event_emitter").EventEmitter, g = '.ace_editor {	position: relative;	overflow: hidden;	font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;	direction: ltr;	}	.ace_scroller {	position: absolute;	overflow: hidden;	top: 0;	bottom: 0;	background-color: inherit;	-ms-user-select: none;	-moz-user-select: none;	-webkit-user-select: none;	user-select: none;	cursor: text;	}	.ace_content {	position: absolute;	-moz-box-sizing: border-box;	-webkit-box-sizing: border-box;	box-sizing: border-box;	min-width: 100%;	}	.ace_dragging .ace_scroller:before{	position: absolute;	top: 0;	left: 0;	right: 0;	bottom: 0;	content: \'\';	background: rgba(250, 250, 250, 0.01);	z-index: 1000;	}	.ace_dragging.ace_dark .ace_scroller:before{	background: rgba(0, 0, 0, 0.01);	}	.ace_selecting, .ace_selecting * {	cursor: text !important;	}	.ace_gutter {	position: absolute;	overflow : hidden;	width: auto;	top: 0;	bottom: 0;	left: 0;	cursor: default;	z-index: 4;	-ms-user-select: none;	-moz-user-select: none;	-webkit-user-select: none;	user-select: none;	}	.ace_gutter-active-line {	position: absolute;	left: 0;	right: 0;	}	.ace_scroller.ace_scroll-left {	box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;	}	.ace_gutter-cell {	padding-left: 19px;	padding-right: 6px;	background-repeat: no-repeat;	}	.ace_gutter-cell.ace_error {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");	background-repeat: no-repeat;	background-position: 2px center;	}	.ace_gutter-cell.ace_warning {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");	background-position: 2px center;	}	.ace_gutter-cell.ace_info {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");	background-position: 2px center;	}	.ace_dark .ace_gutter-cell.ace_info {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");	}	.ace_scrollbar {	position: absolute;	right: 0;	bottom: 0;	z-index: 6;	}	.ace_scrollbar-inner {	position: absolute;	cursor: text;	left: 0;	top: 0;	}	.ace_scrollbar-v{	overflow-x: hidden;	overflow-y: scroll;	top: 0;	}	.ace_scrollbar-h {	overflow-x: scroll;	overflow-y: hidden;	left: 0;	}	.ace_print-margin {	position: absolute;	height: 100%;	}	.ace_text-input {	position: absolute;	z-index: 0;	width: 0.5em;	height: 1em;	opacity: 0;	background: transparent;	-moz-appearance: none;	appearance: none;	border: none;	resize: none;	outline: none;	overflow: hidden;	font: inherit;	padding: 0 1px;	margin: 0 -1px;	text-indent: -1em;	-ms-user-select: text;	-moz-user-select: text;	-webkit-user-select: text;	user-select: text;	white-space: pre!important;	}	.ace_text-input.ace_composition {	background: inherit;	color: inherit;	z-index: 1000;	opacity: 1;	text-indent: 0;	}	.ace_layer {	z-index: 1;	position: absolute;	overflow: hidden;	word-wrap: normal;	white-space: pre;	height: 100%;	width: 100%;	-moz-box-sizing: border-box;	-webkit-box-sizing: border-box;	box-sizing: border-box;	pointer-events: none;	}	.ace_gutter-layer {	position: relative;	width: auto;	text-align: right;	pointer-events: auto;	}	.ace_text-layer {	font: inherit !important;	}	.ace_cjk {	display: inline-block;	text-align: center;	}	.ace_cursor-layer {	z-index: 4;	}	.ace_cursor {	z-index: 4;	position: absolute;	-moz-box-sizing: border-box;	-webkit-box-sizing: border-box;	box-sizing: border-box;	border-left: 2px solid;	transform: translatez(0);	}	.ace_slim-cursors .ace_cursor {	border-left-width: 1px;	}	.ace_overwrite-cursors .ace_cursor {	border-left-width: 0;	border-bottom: 1px solid;	}	.ace_hidden-cursors .ace_cursor {	opacity: 0.2;	}	.ace_smooth-blinking .ace_cursor {	-webkit-transition: opacity 0.18s;	transition: opacity 0.18s;	}	.ace_editor.ace_multiselect .ace_cursor {	border-left-width: 1px;	}	.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {	position: absolute;	z-index: 3;	}	.ace_marker-layer .ace_selection {	position: absolute;	z-index: 5;	}	.ace_marker-layer .ace_bracket {	position: absolute;	z-index: 6;	}	.ace_marker-layer .ace_active-line {	position: absolute;	z-index: 2;	}	.ace_marker-layer .ace_selected-word {	position: absolute;	z-index: 4;	-moz-box-sizing: border-box;	-webkit-box-sizing: border-box;	box-sizing: border-box;	}	.ace_line .ace_fold {	-moz-box-sizing: border-box;	-webkit-box-sizing: border-box;	box-sizing: border-box;	display: inline-block;	height: 11px;	margin-top: -2px;	vertical-align: middle;	background-image:	url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),	url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");	background-repeat: no-repeat, repeat-x;	background-position: center center, top left;	color: transparent;	border: 1px solid black;	border-radius: 2px;	cursor: pointer;	pointer-events: auto;	}	.ace_dark .ace_fold {	}	.ace_fold:hover{	background-image:	url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),	url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");	}	.ace_tooltip {	background-color: #FFF;	background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));	background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));	border: 1px solid gray;	border-radius: 1px;	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);	color: black;	max-width: 100%;	padding: 3px 4px;	position: fixed;	z-index: 999999;	-moz-box-sizing: border-box;	-webkit-box-sizing: border-box;	box-sizing: border-box;	cursor: default;	white-space: pre;	word-wrap: break-word;	line-height: normal;	font-style: normal;	font-weight: normal;	letter-spacing: normal;	pointer-events: none;	}	.ace_folding-enabled > .ace_gutter-cell {	padding-right: 13px;	}	.ace_fold-widget {	-moz-box-sizing: border-box;	-webkit-box-sizing: border-box;	box-sizing: border-box;	margin: 0 -12px 0 1px;	display: none;	width: 11px;	vertical-align: top;	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");	background-repeat: no-repeat;	background-position: center;	border-radius: 3px;	border: 1px solid transparent;	cursor: pointer;	}	.ace_folding-enabled .ace_fold-widget {	display: inline-block;   	}	.ace_fold-widget.ace_end {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");	}	.ace_fold-widget.ace_closed {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");	}	.ace_fold-widget:hover {	border: 1px solid rgba(0, 0, 0, 0.3);	background-color: rgba(255, 255, 255, 0.2);	box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);	}	.ace_fold-widget:active {	border: 1px solid rgba(0, 0, 0, 0.4);	background-color: rgba(0, 0, 0, 0.05);	box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);	}	.ace_dark .ace_fold-widget {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");	}	.ace_dark .ace_fold-widget.ace_end {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");	}	.ace_dark .ace_fold-widget.ace_closed {	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");	}	.ace_dark .ace_fold-widget:hover {	box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);	background-color: rgba(255, 255, 255, 0.1);	}	.ace_dark .ace_fold-widget:active {	box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);	}	.ace_fold-widget.ace_invalid {	background-color: #FFB4B4;	border-color: #DE5555;	}	.ace_fade-fold-widgets .ace_fold-widget {	-webkit-transition: opacity 0.4s ease 0.05s;	transition: opacity 0.4s ease 0.05s;	opacity: 0;	}	.ace_fade-fold-widgets:hover .ace_fold-widget {	-webkit-transition: opacity 0.05s ease 0.05s;	transition: opacity 0.05s ease 0.05s;	opacity:1;	}	.ace_underline {	text-decoration: underline;	}	.ace_bold {	font-weight: bold;	}	.ace_nobold .ace_bold {	font-weight: normal;	}	.ace_italic {	font-style: italic;	}	.ace_error-marker {	background-color: rgba(255, 0, 0,0.2);	position: absolute;	z-index: 9;	}	.ace_highlight-marker {	background-color: rgba(255, 255, 0,0.2);	position: absolute;	z-index: 8;	}	.ace_br1 {border-top-left-radius    : 3px;}	.ace_br2 {border-top-right-radius   : 3px;}	.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}	.ace_br4 {border-bottom-right-radius: 3px;}	.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}	.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}	.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}	.ace_br8 {border-bottom-left-radius : 3px;}	.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}	.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}	.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}	.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}	.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}	.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}	.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}	';
            r.importCssString(g, "ace_editor.css");
            var v = function (e, t) {
                var i = this;
                this.container = e || r.createElement("div"), this.$keepTextAreaAtCursor = !s.isOldIE, r.addCssClass(this.container, "ace_editor"), this.setTheme(t), this.$gutter = r.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.scroller = r.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = r.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new a(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new l(this.content);
                var n = this.$textLayer = new c(this.content);
                this.canvas = n.element, this.$markerFront = new l(this.content), this.$cursorLayer = new h(this.content), this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new u(this.container, this), this.scrollBarH = new d(this.container, this), this.scrollBarV.addEventListener("scroll", function (e) {
                    i.$scrollAnimation || i.session.setScrollTop(e.data - i.scrollMargin.top)
                }), this.scrollBarH.addEventListener("scroll", function (e) {
                    i.$scrollAnimation || i.session.setScrollLeft(e.data - i.scrollMargin.left)
                }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = {
                    row: 0,
                    column: 0
                }, this.$fontMetrics = new p(this.container, 500), this.$textLayer.$setFontMetrics(this.$fontMetrics), this.$textLayer.addEventListener("changeCharacterSize", function (e) {
                    i.updateCharacterSize(), i.onResize(!0, i.gutterWidth, i.$size.width, i.$size.height), i._signal("changeCharacterSize", e)
                }), this.$size = {
                    width: 0,
                    height: 0,
                    scrollerHeight: 0,
                    scrollerWidth: 0,
                    $dirty: !0
                }, this.layerConfig = {
                    width: 1,
                    padding: 0,
                    firstRow: 0,
                    firstRowScreen: 0,
                    lastRow: 0,
                    lineHeight: 0,
                    characterWidth: 0,
                    minHeight: 1,
                    maxHeight: 1,
                    offset: 0,
                    height: 1,
                    gutterOffset: 1
                }, this.scrollMargin = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    v: 0,
                    h: 0
                }, this.$loop = new f(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), o.resetOptions(this), o._emit("renderer", this)
            };
            (function () {
                this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, n.implement(this, m), this.updateCharacterSize = function () {
                    this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin()
                }, this.setSession = function (e) {
                    this.session && this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode), this.session = e, e && this.scrollMargin.top && e.getScrollTop() <= 0 && e.setScrollTop(-this.scrollMargin.top), this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), e && (this.$loop.schedule(this.CHANGE_FULL), this.session.$setFontMetrics(this.$fontMetrics), this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this), this.onChangeNewLineMode(), this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode))
                }, this.updateLines = function (e, t, i) {
                    if (void 0 === t && (t = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = {
                            firstRow: e,
                            lastRow: t
                        }, this.$changedLines.lastRow < this.layerConfig.firstRow) {
                        if (!i)return;
                        this.$changedLines.lastRow = this.layerConfig.lastRow
                    }
                    this.$changedLines.firstRow > this.layerConfig.lastRow || this.$loop.schedule(this.CHANGE_LINES)
                }, this.onChangeNewLineMode = function () {
                    this.$loop.schedule(this.CHANGE_TEXT), this.$textLayer.$updateEolChar()
                }, this.onChangeTabSize = function () {
                    this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
                }, this.updateText = function () {
                    this.$loop.schedule(this.CHANGE_TEXT)
                }, this.updateFull = function (e) {
                    e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
                }, this.updateFontSize = function () {
                    this.$textLayer.checkForSizeChanges()
                }, this.$changes = 0, this.$updateSizeAsync = function () {
                    this.$loop.pending ? this.$size.$dirty = !0 : this.onResize()
                }, this.onResize = function (e, t, i, n) {
                    if (!(this.resizing > 2)) {
                        this.resizing > 0 ? this.resizing++ : this.resizing = e ? 1 : 0;
                        var r = this.container;
                        n || (n = r.clientHeight || r.scrollHeight), i || (i = r.clientWidth || r.scrollWidth);
                        var o = this.$updateCachedSize(e, t, i, n);
                        if (!this.$size.scrollerHeight || !i && !n)return this.resizing = 0;
                        e && (this.$gutterLayer.$padding = null), e ? this.$renderChanges(o | this.$changes, !0) : this.$loop.schedule(o | this.$changes), this.resizing && (this.resizing = 0), this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null
                    }
                }, this.$updateCachedSize = function (e, t, i, n) {
                    n -= this.$extraHeight || 0;
                    var r = 0, o = this.$size, s = {
                        width: o.width,
                        height: o.height,
                        scrollerHeight: o.scrollerHeight,
                        scrollerWidth: o.scrollerWidth
                    };
                    return n && (e || o.height != n) && (o.height = n, r |= this.CHANGE_SIZE, o.scrollerHeight = o.height, this.$horizScroll && (o.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", r |= this.CHANGE_SCROLL), i && (e || o.width != i) && (r |= this.CHANGE_SIZE, o.width = i, null == t && (t = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = t, this.scrollBarH.element.style.left = this.scroller.style.left = t + "px", o.scrollerWidth = Math.max(0, i - t - this.scrollBarV.getWidth()), this.scrollBarH.element.style.right = this.scroller.style.right = this.scrollBarV.getWidth() + "px", this.scroller.style.bottom = this.scrollBarH.getHeight() + "px", (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) && (r |= this.CHANGE_FULL)), o.$dirty = !i || !n, r && this._signal("resize", s), r
                }, this.onGutterResize = function () {
                    var e = this.$showGutter ? this.$gutter.offsetWidth : 0;
                    e != this.gutterWidth && (this.$changes |= this.$updateCachedSize(!0, e, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : this.$size.$dirty ? this.$loop.schedule(this.CHANGE_FULL) : (this.$computeLayerConfig(), this.$loop.schedule(this.CHANGE_MARKER))
                }, this.adjustWrapLimit = function () {
                    var e = this.$size.scrollerWidth - 2 * this.$padding, t = Math.floor(e / this.characterWidth);
                    return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn)
                }, this.setAnimatedScroll = function (e) {
                    this.setOption("animatedScroll", e)
                }, this.getAnimatedScroll = function () {
                    return this.$animatedScroll
                }, this.setShowInvisibles = function (e) {
                    this.setOption("showInvisibles", e)
                }, this.getShowInvisibles = function () {
                    return this.getOption("showInvisibles")
                }, this.getDisplayIndentGuides = function () {
                    return this.getOption("displayIndentGuides")
                }, this.setDisplayIndentGuides = function (e) {
                    this.setOption("displayIndentGuides", e)
                }, this.setShowPrintMargin = function (e) {
                    this.setOption("showPrintMargin", e)
                }, this.getShowPrintMargin = function () {
                    return this.getOption("showPrintMargin")
                }, this.setPrintMarginColumn = function (e) {
                    this.setOption("printMarginColumn", e)
                }, this.getPrintMarginColumn = function () {
                    return this.getOption("printMarginColumn")
                }, this.getShowGutter = function () {
                    return this.getOption("showGutter")
                }, this.setShowGutter = function (e) {
                    return this.setOption("showGutter", e)
                }, this.getFadeFoldWidgets = function () {
                    return this.getOption("fadeFoldWidgets")
                }, this.setFadeFoldWidgets = function (e) {
                    this.setOption("fadeFoldWidgets", e)
                }, this.setHighlightGutterLine = function (e) {
                    this.setOption("highlightGutterLine", e)
                }, this.getHighlightGutterLine = function () {
                    return this.getOption("highlightGutterLine")
                }, this.$updateGutterLineHighlight = function () {
                    var e = this.$cursorLayer.$pixelPos, t = this.layerConfig.lineHeight;
                    if (this.session.getUseWrapMode()) {
                        var i = this.session.selection.getCursor();
                        i.column = 0, e = this.$cursorLayer.getPixelPosition(i, !0), t *= this.session.getRowLength(i.row)
                    }
                    this.$gutterLineHighlight.style.top = e.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = t + "px"
                }, this.$updatePrintMargin = function () {
                    if (this.$showPrintMargin || this.$printMarginEl) {
                        if (!this.$printMarginEl) {
                            var e = r.createElement("div");
                            e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = r.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild)
                        }
                        var t = this.$printMarginEl.style;
                        t.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit()
                    }
                }, this.getContainerElement = function () {
                    return this.container
                }, this.getMouseEventTarget = function () {
                    return this.scroller
                }, this.getTextAreaContainer = function () {
                    return this.container
                }, this.$moveTextAreaToCursor = function () {
                    if (this.$keepTextAreaAtCursor) {
                        var e = this.layerConfig, t = this.$cursorLayer.$pixelPos.top, i = this.$cursorLayer.$pixelPos.left;
                        t -= e.offset;
                        var n = this.textarea.style, r = this.lineHeight;
                        if (0 > t || t > e.height - r)return void(n.top = n.left = "0");
                        var o = this.characterWidth;
                        if (this.$composition) {
                            var s = this.textarea.value.replace(/^\x01+/, "");
                            o *= this.session.$getStringScreenWidth(s)[0] + 2, r += 2
                        }
                        i -= this.scrollLeft, i > this.$size.scrollerWidth - o && (i = this.$size.scrollerWidth - o), i += this.gutterWidth, n.height = r + "px", n.width = o + "px", n.left = Math.min(i, this.$size.scrollerWidth - o) + "px", n.top = Math.min(t, this.$size.height - r) + "px"
                    }
                }, this.getFirstVisibleRow = function () {
                    return this.layerConfig.firstRow
                }, this.getFirstFullyVisibleRow = function () {
                    return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1)
                }, this.getLastFullyVisibleRow = function () {
                    var e = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
                    return this.layerConfig.firstRow - 1 + e
                }, this.getLastVisibleRow = function () {
                    return this.layerConfig.lastRow
                }, this.$padding = null, this.setPadding = function (e) {
                    this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
                }, this.setScrollMargin = function (e, t, i, n) {
                    var r = this.scrollMargin;
                    r.top = 0 | e, r.bottom = 0 | t, r.right = 0 | n, r.left = 0 | i, r.v = r.top + r.bottom, r.h = r.left + r.right, r.top && this.scrollTop <= 0 && this.session && this.session.setScrollTop(-r.top), this.updateFull()
                }, this.getHScrollBarAlwaysVisible = function () {
                    return this.$hScrollBarAlwaysVisible
                }, this.setHScrollBarAlwaysVisible = function (e) {
                    this.setOption("hScrollBarAlwaysVisible", e)
                }, this.getVScrollBarAlwaysVisible = function () {
                    return this.$vScrollBarAlwaysVisible
                }, this.setVScrollBarAlwaysVisible = function (e) {
                    this.setOption("vScrollBarAlwaysVisible", e)
                }, this.$updateScrollBarV = function () {
                    var e = this.layerConfig.maxHeight, t = this.$size.scrollerHeight;
                    !this.$maxLines && this.$scrollPastEnd && (e -= (t - this.lineHeight) * this.$scrollPastEnd, this.scrollTop > e - t && (e = this.scrollTop + t, this.scrollBarV.scrollTop = null)), this.scrollBarV.setScrollHeight(e + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top)
                }, this.$updateScrollBarH = function () {
                    this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left)
                }, this.$frozen = !1, this.freeze = function () {
                    this.$frozen = !0
                }, this.unfreeze = function () {
                    this.$frozen = !1
                }, this.$renderChanges = function (e, t) {
                    if (this.$changes && (e |= this.$changes, this.$changes = 0), !this.session || !this.container.offsetWidth || this.$frozen || !e && !t)return void(this.$changes |= e);
                    if (this.$size.$dirty)return this.$changes |= e, this.onResize(!0);
                    this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender");
                    var i = this.layerConfig;
                    if (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL || e & this.CHANGE_H_SCROLL) {
                        if (e |= this.$computeLayerConfig(), i.firstRow != this.layerConfig.firstRow && i.firstRowScreen == this.layerConfig.firstRowScreen) {
                            var n = this.scrollTop + (i.firstRow - this.layerConfig.firstRow) * this.lineHeight;
                            n > 0 && (this.scrollTop = n, e |= this.CHANGE_SCROLL, e |= this.$computeLayerConfig())
                        }
                        i = this.layerConfig, this.$updateScrollBarV(), e & this.CHANGE_H_SCROLL && this.$updateScrollBarH(), this.$gutterLayer.element.style.marginTop = -i.offset + "px", this.content.style.marginTop = -i.offset + "px", this.content.style.width = i.width + 2 * this.$padding + "px", this.content.style.height = i.minHeight + "px"
                    }
                    return e & this.CHANGE_H_SCROLL && (this.content.style.marginLeft = -this.scrollLeft + "px", this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"), e & this.CHANGE_FULL ? (this.$textLayer.update(i), this.$showGutter && this.$gutterLayer.update(i), this.$markerBack.update(i), this.$markerFront.update(i), this.$cursorLayer.update(i), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight(), void this._signal("afterRender")) : e & this.CHANGE_SCROLL ? (e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(i) : this.$textLayer.scrollLines(i), this.$showGutter && this.$gutterLayer.update(i), this.$markerBack.update(i), this.$markerFront.update(i), this.$cursorLayer.update(i), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this.$moveTextAreaToCursor(), void this._signal("afterRender")) : (e & this.CHANGE_TEXT ? (this.$textLayer.update(i), this.$showGutter && this.$gutterLayer.update(i)) : e & this.CHANGE_LINES ? (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(i) : (e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER) && this.$showGutter && this.$gutterLayer.update(i), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(i), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(i), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(i), void this._signal("afterRender"))
                }, this.$autosize = function () {
                    var e = this.session.getScreenLength() * this.lineHeight, t = this.$maxLines * this.lineHeight, i = Math.max((this.$minLines || 1) * this.lineHeight, Math.min(t, e)) + this.scrollMargin.v + (this.$extraHeight || 0);
                    this.$horizScroll && (i += this.scrollBarH.getHeight());
                    var n = e > t;
                    if (i != this.desiredHeight || this.$size.height != this.desiredHeight || n != this.$vScroll) {
                        n != this.$vScroll && (this.$vScroll = n, this.scrollBarV.setVisible(n));
                        var r = this.container.clientWidth;
                        this.container.style.height = i + "px", this.$updateCachedSize(!0, this.$gutterWidth, r, i), this.desiredHeight = i, this._signal("autosize")
                    }
                }, this.$computeLayerConfig = function () {
                    var e = this.session, t = this.$size, i = t.height <= 2 * this.lineHeight, n = this.session.getScreenLength(), r = n * this.lineHeight, o = this.$getLongestLine(), s = !i && (this.$hScrollBarAlwaysVisible || t.scrollerWidth - o - 2 * this.$padding < 0), a = this.$horizScroll !== s;
                    a && (this.$horizScroll = s, this.scrollBarH.setVisible(s));
                    var l = this.$vScroll;
                    this.$maxLines && this.lineHeight > 1 && this.$autosize();
                    var c = this.scrollTop % this.lineHeight, h = t.scrollerHeight + this.lineHeight, d = !this.$maxLines && this.$scrollPastEnd ? (t.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
                    r += d;
                    var u = this.scrollMargin;
                    this.session.setScrollTop(Math.max(-u.top, Math.min(this.scrollTop, r - t.scrollerHeight + u.bottom))), this.session.setScrollLeft(Math.max(-u.left, Math.min(this.scrollLeft, o + 2 * this.$padding - t.scrollerWidth + u.right)));
                    var f = !i && (this.$vScrollBarAlwaysVisible || t.scrollerHeight - r + d < 0 || this.scrollTop > u.top), p = l !== f;
                    p && (this.$vScroll = f, this.scrollBarV.setVisible(f));
                    var m, g, v = Math.ceil(h / this.lineHeight) - 1, w = Math.max(0, Math.round((this.scrollTop - c) / this.lineHeight)), y = w + v, A = this.lineHeight;
                    w = e.screenToDocumentRow(w, 0);
                    var E = e.getFoldLine(w);
                    E && (w = E.start.row), m = e.documentToScreenRow(w, 0), g = e.getRowLength(w) * A, y = Math.min(e.screenToDocumentRow(y, 0), e.getLength() - 1), h = t.scrollerHeight + e.getRowLength(y) * A + g, c = this.scrollTop - m * A;
                    var C = 0;
                    return this.layerConfig.width != o && (C = this.CHANGE_H_SCROLL), (a || p) && (C = this.$updateCachedSize(!0, this.gutterWidth, t.width, t.height), this._signal("scrollbarVisibilityChanged"), p && (o = this.$getLongestLine())), this.layerConfig = {
                        width: o,
                        padding: this.$padding,
                        firstRow: w,
                        firstRowScreen: m,
                        lastRow: y,
                        lineHeight: A,
                        characterWidth: this.characterWidth,
                        minHeight: h,
                        maxHeight: r,
                        offset: c,
                        gutterOffset: Math.max(0, Math.ceil((c + t.height - t.scrollerHeight) / A)),
                        height: this.$size.scrollerHeight
                    }, C
                }, this.$updateLines = function () {
                    var e = this.$changedLines.firstRow, t = this.$changedLines.lastRow;
                    this.$changedLines = null;
                    var i = this.layerConfig;
                    return e > i.lastRow + 1 || t < i.firstRow ? void 0 : t === 1 / 0 ? (this.$showGutter && this.$gutterLayer.update(i), void this.$textLayer.update(i)) : (this.$textLayer.updateLines(i, e, t), !0)
                }, this.$getLongestLine = function () {
                    var e = this.session.getScreenWidth();
                    return this.showInvisibles && !this.session.$useWrapMode && (e += 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth))
                }, this.updateFrontMarkers = function () {
                    this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
                }, this.updateBackMarkers = function () {
                    this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
                }, this.addGutterDecoration = function (e, t) {
                    this.$gutterLayer.addGutterDecoration(e, t)
                }, this.removeGutterDecoration = function (e, t) {
                    this.$gutterLayer.removeGutterDecoration(e, t)
                }, this.updateBreakpoints = function (e) {
                    this.$loop.schedule(this.CHANGE_GUTTER)
                }, this.setAnnotations = function (e) {
                    this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER)
                }, this.updateCursor = function () {
                    this.$loop.schedule(this.CHANGE_CURSOR)
                }, this.hideCursor = function () {
                    this.$cursorLayer.hideCursor()
                }, this.showCursor = function () {
                    this.$cursorLayer.showCursor()
                }, this.scrollSelectionIntoView = function (e, t, i) {
                    this.scrollCursorIntoView(e, i), this.scrollCursorIntoView(t, i)
                }, this.scrollCursorIntoView = function (e, t, i) {
                    if (0 !== this.$size.scrollerHeight) {
                        var n = this.$cursorLayer.getPixelPosition(e), r = n.left, o = n.top, s = i && i.top || 0, a = i && i.bottom || 0, l = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
                        l + s > o ? (t && (o -= t * this.$size.scrollerHeight), 0 === o && (o = -this.scrollMargin.top), this.session.setScrollTop(o)) : l + this.$size.scrollerHeight - a < o + this.lineHeight && (t && (o += t * this.$size.scrollerHeight), this.session.setScrollTop(o + this.lineHeight - this.$size.scrollerHeight));
                        var c = this.scrollLeft;
                        c > r ? (r < this.$padding + 2 * this.layerConfig.characterWidth && (r = -this.scrollMargin.left), this.session.setScrollLeft(r)) : c + this.$size.scrollerWidth < r + this.characterWidth ? this.session.setScrollLeft(Math.round(r + this.characterWidth - this.$size.scrollerWidth)) : c <= this.$padding && r - c < this.characterWidth && this.session.setScrollLeft(0)
                    }
                }, this.getScrollTop = function () {
                    return this.session.getScrollTop()
                }, this.getScrollLeft = function () {
                    return this.session.getScrollLeft()
                }, this.getScrollTopRow = function () {
                    return this.scrollTop / this.lineHeight
                }, this.getScrollBottomRow = function () {
                    return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
                }, this.scrollToRow = function (e) {
                    this.session.setScrollTop(e * this.lineHeight)
                }, this.alignCursor = function (e, t) {
                    "number" == typeof e && (e = {row: e, column: 0});
                    var i = this.$cursorLayer.getPixelPosition(e), n = this.$size.scrollerHeight - this.lineHeight, r = i.top - n * (t || 0);
                    return this.session.setScrollTop(r), r
                }, this.STEPS = 8, this.$calcSteps = function (e, t) {
                    var i = 0, n = this.STEPS, r = [], o = function (e, t, i) {
                        return i * (Math.pow(e - 1, 3) + 1) + t
                    };
                    for (i = 0; n > i; ++i)r.push(o(i / this.STEPS, e, t - e));
                    return r
                }, this.scrollToLine = function (e, t, i, n) {
                    var r = this.$cursorLayer.getPixelPosition({row: e, column: 0}), o = r.top;
                    t && (o -= this.$size.scrollerHeight / 2);
                    var s = this.scrollTop;
                    this.session.setScrollTop(o), i !== !1 && this.animateScrolling(s, n)
                }, this.animateScrolling = function (e, t) {
                    var i = this.scrollTop;
                    if (this.$animatedScroll) {
                        var n = this;
                        if (e != i) {
                            if (this.$scrollAnimation) {
                                var r = this.$scrollAnimation.steps;
                                if (r.length && (e = r[0], e == i))return
                            }
                            var o = n.$calcSteps(e, i);
                            this.$scrollAnimation = {
                                from: e,
                                to: i,
                                steps: o
                            }, clearInterval(this.$timer), n.session.setScrollTop(o.shift()), n.session.$scrollTop = i, this.$timer = setInterval(function () {
                                o.length ? (n.session.setScrollTop(o.shift()), n.session.$scrollTop = i) : null != i ? (n.session.$scrollTop = -1, n.session.setScrollTop(i), i = null) : (n.$timer = clearInterval(n.$timer), n.$scrollAnimation = null, t && t())
                            }, 10)
                        }
                    }
                }, this.scrollToY = function (e) {
                    this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e)
                }, this.scrollToX = function (e) {
                    this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL)
                }, this.scrollTo = function (e, t) {
                    this.session.setScrollTop(t), this.session.setScrollLeft(t)
                }, this.scrollBy = function (e, t) {
                    t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e)
                }, this.isScrollableBy = function (e, t) {
                    return 0 > t && this.session.getScrollTop() >= 1 - this.scrollMargin.top ? !0 : t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom ? !0 : 0 > e && this.session.getScrollLeft() >= 1 - this.scrollMargin.left ? !0 : e > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right ? !0 : void 0
                }, this.pixelToScreenCoordinates = function (e, t) {
                    var i = this.scroller.getBoundingClientRect(), n = (e + this.scrollLeft - i.left - this.$padding) / this.characterWidth, r = Math.floor((t + this.scrollTop - i.top) / this.lineHeight), o = Math.round(n);
                    return {row: r, column: o, side: n - o > 0 ? 1 : -1}
                }, this.screenToTextCoordinates = function (e, t) {
                    var i = this.scroller.getBoundingClientRect(), n = Math.round((e + this.scrollLeft - i.left - this.$padding) / this.characterWidth), r = (t + this.scrollTop - i.top) / this.lineHeight;
                    return this.session.screenToDocumentPosition(r, Math.max(n, 0))
                }, this.textToScreenCoordinates = function (e, t) {
                    var i = this.scroller.getBoundingClientRect(), n = this.session.documentToScreenPosition(e, t), r = this.$padding + Math.round(n.column * this.characterWidth), o = n.row * this.lineHeight;
                    return {pageX: i.left + r - this.scrollLeft, pageY: i.top + o - this.scrollTop}
                }, this.visualizeFocus = function () {
                    r.addCssClass(this.container, "ace_focus")
                }, this.visualizeBlur = function () {
                    r.removeCssClass(this.container, "ace_focus")
                }, this.showComposition = function (e) {
                    this.$composition || (this.$composition = {
                        keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                        cssText: this.textarea.style.cssText
                    }), this.$keepTextAreaAtCursor = !0, r.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor()
                },this.setCompositionText = function (e) {
                    this.$moveTextAreaToCursor()
                },this.hideComposition = function () {
                    this.$composition && (r.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, this.textarea.style.cssText = this.$composition.cssText, this.$composition = null)
                },this.setTheme = function (e, t) {
                    function i(i) {
                        if (n.$themeId != e)return t && t();
                        if (i.cssClass) {
                            r.importCssString(i.cssText, i.cssClass, n.container.ownerDocument), n.theme && r.removeCssClass(n.container, n.theme.cssClass);
                            var o = "padding"in i ? i.padding : "padding"in(n.theme || {}) ? 4 : n.$padding;
                            n.$padding && o != n.$padding && n.setPadding(o), n.$theme = i.cssClass, n.theme = i, r.addCssClass(n.container, i.cssClass), r.setCssClass(n.container, "ace_dark", i.isDark), n.$size && (n.$size.width = 0, n.$updateSizeAsync()), n._dispatchEvent("themeLoaded", {theme: i}), t && t()
                        }
                    }

                    var n = this;
                    if (this.$themeId = e, n._dispatchEvent("themeChange", {theme: e}), e && "string" != typeof e)i(e); else {
                        var s = e || this.$options.theme.initialValue;
                        o.loadModule(["theme", s], i)
                    }
                },this.getTheme = function () {
                    return this.$themeId
                },this.setStyle = function (e, t) {
                    r.setCssClass(this.container, e, t !== !1)
                },this.unsetStyle = function (e) {
                    r.removeCssClass(this.container, e)
                },this.setCursorStyle = function (e) {
                    this.scroller.style.cursor != e && (this.scroller.style.cursor = e)
                },this.setMouseCursor = function (e) {
                    this.scroller.style.cursor = e
                },this.destroy = function () {
                    this.$textLayer.destroy(), this.$cursorLayer.destroy()
                }
            }).call(v.prototype), o.defineOptions(v.prototype, "renderer", {
                animatedScroll: {initialValue: !1},
                showInvisibles: {
                    set: function (e) {
                        this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT)
                    }, initialValue: !1
                },
                showPrintMargin: {
                    set: function () {
                        this.$updatePrintMargin()
                    }, initialValue: !0
                },
                printMarginColumn: {
                    set: function () {
                        this.$updatePrintMargin()
                    }, initialValue: 80
                },
                printMargin: {
                    set: function (e) {
                        "number" == typeof e && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin()
                    }, get: function () {
                        return this.$showPrintMargin && this.$printMarginColumn
                    }
                },
                showGutter: {
                    set: function (e) {
                        this.$gutter.style.display = e ? "block" : "none", this.$loop.schedule(this.CHANGE_FULL), this.onGutterResize()
                    }, initialValue: !0
                },
                fadeFoldWidgets: {
                    set: function (e) {
                        r.setCssClass(this.$gutter, "ace_fade-fold-widgets", e)
                    }, initialValue: !1
                },
                showFoldWidgets: {
                    set: function (e) {
                        this.$gutterLayer.setShowFoldWidgets(e)
                    }, initialValue: !0
                },
                showLineNumbers: {
                    set: function (e) {
                        this.$gutterLayer.setShowLineNumbers(e), this.$loop.schedule(this.CHANGE_GUTTER)
                    }, initialValue: !0
                },
                displayIndentGuides: {
                    set: function (e) {
                        this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT)
                    }, initialValue: !0
                },
                highlightGutterLine: {
                    set: function (e) {
                        return this.$gutterLineHighlight ? (this.$gutterLineHighlight.style.display = e ? "" : "none", void(this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight())) : (this.$gutterLineHighlight = r.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter-active-line", void this.$gutter.appendChild(this.$gutterLineHighlight))
                    }, initialValue: !1, value: !0
                },
                hScrollBarAlwaysVisible: {
                    set: function (e) {
                        this.$hScrollBarAlwaysVisible && this.$horizScroll || this.$loop.schedule(this.CHANGE_SCROLL)
                    }, initialValue: !1
                },
                vScrollBarAlwaysVisible: {
                    set: function (e) {
                        this.$vScrollBarAlwaysVisible && this.$vScroll || this.$loop.schedule(this.CHANGE_SCROLL)
                    }, initialValue: !1
                },
                fontSize: {
                    set: function (e) {
                        "number" == typeof e && (e += "px"), this.container.style.fontSize = e, this.updateFontSize()
                    }, initialValue: 12
                },
                fontFamily: {
                    set: function (e) {
                        this.container.style.fontFamily = e, this.updateFontSize()
                    }
                },
                maxLines: {
                    set: function (e) {
                        this.updateFull()
                    }
                },
                minLines: {
                    set: function (e) {
                        this.updateFull()
                    }
                },
                scrollPastEnd: {
                    set: function (e) {
                        e = +e || 0, this.$scrollPastEnd != e && (this.$scrollPastEnd = e, this.$loop.schedule(this.CHANGE_SCROLL))
                    }, initialValue: 0, handlesSet: !0
                },
                fixedWidthGutter: {
                    set: function (e) {
                        this.$gutterLayer.$fixedWidth = !!e, this.$loop.schedule(this.CHANGE_GUTTER)
                    }
                },
                theme: {
                    set: function (e) {
                        this.setTheme(e)
                    }, get: function () {
                        return this.$themeId || this.theme
                    }, initialValue: "./theme/textmate", handlesSet: !0
                }
            }), t.VirtualRenderer = v
        }), ace.define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter", "ace/config"], function (e, t, n) {
            "use strict";
            var r = e("../lib/oop"), o = e("../lib/net"), s = e("../lib/event_emitter").EventEmitter, a = e("../config"), l = function (t, n, r, o) {
                if (this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl), a.get("packaged") || !e.toUrl)o = o || a.moduleUrl(n.id, "worker"); else {
                    var s = this.$normalizePath;
                    o = o || s(e.toUrl("ace/worker/worker.js", null, "_"));
                    var l = {};
                    t.forEach(function (t) {
                        l[t] = s(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
                    })
                }
                try {
                    var c = n.src, h = i(59), d = new h([c], {type: "application/javascript"}), u = (window.URL || window.webkitURL).createObjectURL(d);
                    this.$worker = new Worker(u)
                } catch (f) {
                    if (!(f instanceof window.DOMException))throw f;
                    var d = this.$workerBlob(o), p = window.URL || window.webkitURL, m = p.createObjectURL(d);
                    this.$worker = new Worker(m), p.revokeObjectURL(m)
                }
                this.$worker.postMessage({
                    init: !0,
                    tlns: l,
                    module: n.id,
                    classname: r
                }), this.callbackId = 1, this.callbacks = {}, this.$worker.onmessage = this.onMessage
            };
            (function () {
                r.implement(this, s), this.onMessage = function (e) {
                    var t = e.data;
                    switch (t.type) {
                        case"event":
                            this._signal(t.name, {data: t.data});
                            break;
                        case"call":
                            var i = this.callbacks[t.id];
                            i && (i(t.data), delete this.callbacks[t.id]);
                            break;
                        case"error":
                            this.reportError(t.data);
                            break;
                        case"log":
                            window.console && console.log && console.log.apply(console, t.data)
                    }
                }, this.reportError = function (e) {
                    window.console && console.error && console.error(e)
                }, this.$normalizePath = function (e) {
                    return o.qualifyURL(e)
                }, this.terminate = function () {
                    this._signal("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc && this.$doc.off("change", this.changeListener), this.$doc = null
                }, this.send = function (e, t) {
                    this.$worker.postMessage({command: e, args: t})
                }, this.call = function (e, t, i) {
                    if (i) {
                        var n = this.callbackId++;
                        this.callbacks[n] = i, t.push(n)
                    }
                    this.send(e, t)
                }, this.emit = function (e, t) {
                    try {
                        this.$worker.postMessage({event: e, data: {data: t.data}})
                    } catch (i) {
                        console.error(i.stack)
                    }
                }, this.attachToDocument = function (e) {
                    this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener)
                }, this.changeListener = function (e) {
                    this.deltaQueue || (this.deltaQueue = [], setTimeout(this.$sendDeltaQueue, 0)), "insert" == e.action ? this.deltaQueue.push(e.start, e.lines) : this.deltaQueue.push(e.start, e.end)
                }, this.$sendDeltaQueue = function () {
                    var e = this.deltaQueue;
                    e && (this.deltaQueue = null, e.length > 50 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {data: e}))
                }, this.$workerBlob = function (e) {
                    var t = "importScripts('" + o.qualifyURL(e) + "');";
                    try {
                        return new Blob([t], {type: "application/javascript"})
                    } catch (i) {
                        var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder, r = new n;
                        return r.append(t), r.getBlob("application/javascript")
                    }
                }
            }).call(l.prototype);
            var c = function (e, t, i) {
                this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.callbackId = 1, this.callbacks = {}, this.messageBuffer = [];
                var n = null, r = !1, o = Object.create(s), l = this;
                this.$worker = {}, this.$worker.terminate = function () {
                }, this.$worker.postMessage = function (e) {
                    l.messageBuffer.push(e), n && (r ? setTimeout(c) : c())
                }, this.setEmitSync = function (e) {
                    r = e
                };
                var c = function () {
                    var e = l.messageBuffer.shift();
                    e.command ? n[e.command].apply(n, e.args) : e.event && o._signal(e.event, e.data)
                };
                o.postMessage = function (e) {
                    l.onMessage({data: e})
                }, o.callback = function (e, t) {
                    this.postMessage({type: "call", id: t, data: e})
                }, o.emit = function (e, t) {
                    this.postMessage({type: "event", name: e, data: t})
                }, a.loadModule(["worker", t], function (e) {
                    for (n = new e[i](o); l.messageBuffer.length;)c()
                })
            };
            c.prototype = l.prototype, t.UIWorkerClient = c, t.WorkerClient = l
        }), ace.define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function (e, t, i) {
            "use strict";
            var n = e("./range").Range, r = e("./lib/event_emitter").EventEmitter, o = e("./lib/oop"), s = function (e, t, i, n, r, o) {
                var s = this;
                this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = r, this.othersClass = o, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = n, this.$onCursorChange = function () {
                    setTimeout(function () {
                        s.onCursorChange()
                    })
                }, this.$pos = i;
                var a = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {length: -1};
                this.$undoStackDepth = a.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange)
            };
            (function () {
                o.implement(this, r), this.setup = function () {
                    var e = this, t = this.doc, i = this.session;
                    this.selectionBefore = i.selection.toJSON(), i.selection.inMultiSelectMode && i.selection.toSingleRange(), this.pos = t.createAnchor(this.$pos.row, this.$pos.column);
                    var r = this.pos;
                    r.$insertRight = !0, r.detach(), r.markerId = i.addMarker(new n(r.row, r.column, r.row, r.column + this.length), this.mainClass, null, !1), this.others = [], this.$others.forEach(function (i) {
                        var n = t.createAnchor(i.row, i.column);
                        n.$insertRight = !0, n.detach(), e.others.push(n)
                    }), i.setUndoSelect(!1)
                }, this.showOtherMarkers = function () {
                    if (!this.othersActive) {
                        var e = this.session, t = this;
                        this.othersActive = !0, this.others.forEach(function (i) {
                            i.markerId = e.addMarker(new n(i.row, i.column, i.row, i.column + t.length), t.othersClass, null, !1)
                        })
                    }
                }, this.hideOtherMarkers = function () {
                    if (this.othersActive) {
                        this.othersActive = !1;
                        for (var e = 0; e < this.others.length; e++)this.session.removeMarker(this.others[e].markerId)
                    }
                }, this.onUpdate = function (e) {
                    if (this.$updating)return this.updateAnchors(e);
                    var t = e;
                    if (t.start.row === t.end.row && t.start.row === this.pos.row) {
                        this.$updating = !0;
                        var i = "insert" === e.action ? t.end.column - t.start.column : t.start.column - t.end.column, r = t.start.column >= this.pos.column && t.start.column <= this.pos.column + this.length + 1, o = t.start.column - this.pos.column;
                        if (this.updateAnchors(e), r && (this.length += i), r && !this.session.$fromUndo)if ("insert" === e.action)for (var s = this.others.length - 1; s >= 0; s--) {
                            var a = this.others[s], l = {row: a.row, column: a.column + o};
                            this.doc.insertMergedLines(l, e.lines)
                        } else if ("remove" === e.action)for (var s = this.others.length - 1; s >= 0; s--) {
                            var a = this.others[s], l = {row: a.row, column: a.column + o};
                            this.doc.remove(new n(l.row, l.column, l.row, l.column - i))
                        }
                        this.$updating = !1, this.updateMarkers()
                    }
                }, this.updateAnchors = function (e) {
                    this.pos.onChange(e);
                    for (var t = this.others.length; t--;)this.others[t].onChange(e);
                    this.updateMarkers()
                }, this.updateMarkers = function () {
                    if (!this.$updating) {
                        var e = this, t = this.session, i = function (i, r) {
                            t.removeMarker(i.markerId), i.markerId = t.addMarker(new n(i.row, i.column, i.row, i.column + e.length), r, null, !1)
                        };
                        i(this.pos, this.mainClass);
                        for (var r = this.others.length; r--;)i(this.others[r], this.othersClass)
                    }
                }, this.onCursorChange = function (e) {
                    if (!this.$updating && this.session) {
                        var t = this.session.selection.getCursor();
                        t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e))
                    }
                }, this.detach = function () {
                    this.session.removeMarker(this.pos && this.pos.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.session.setUndoSelect(!0), this.session = null
                }, this.cancel = function () {
                    if (-1 !== this.$undoStackDepth) {
                        for (var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth, i = 0; t > i; i++)e.undo(!0);
                        this.selectionBefore && this.session.selection.fromJSON(this.selectionBefore)
                    }
                }
            }).call(s.prototype), t.PlaceHolder = s
        }), ace.define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (e, t, i) {
            function n(e, t) {
                return e.row == t.row && e.column == t.column
            }

            function r(e) {
                var t = e.domEvent, i = t.altKey, r = t.shiftKey, a = t.ctrlKey, l = e.getAccelKey(), c = e.getButton();
                if (a && s.isMac && (c = t.button), e.editor.inMultiSelectMode && 2 == c)return void e.editor.textInput.onContextMenu(e.domEvent);
                if (!a && !i && !l)return void(0 === c && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode());
                if (0 === c) {
                    var h, d = e.editor, u = d.selection, f = d.inMultiSelectMode, p = e.getDocumentPosition(), m = u.getCursor(), g = e.inSelection() || u.isEmpty() && n(p, m), v = e.x, w = e.y, y = function (e) {
                        v = e.clientX, w = e.clientY
                    }, A = d.session, E = d.renderer.pixelToScreenCoordinates(v, w), C = E;
                    if (d.$mouseHandler.$enableJumpToDef)a && i || l && i ? h = r ? "block" : "add" : i && d.$blockSelectEnabled && (h = "block"); else if (l && !i) {
                        if (h = "add", !f && r)return
                    } else i && d.$blockSelectEnabled && (h = "block");
                    if (h && s.isMac && t.ctrlKey && d.$mouseHandler.cancelContextMenu(), "add" == h) {
                        if (!f && g)return;
                        if (!f) {
                            var b = u.toOrientedRange();
                            d.addSelectionMarker(b)
                        }
                        var F = u.rangeList.rangeAtPoint(p);
                        d.$blockScrolling++, d.inVirtualSelectionMode = !0, r && (F = null, b = u.ranges[0] || b, d.removeSelectionMarker(b)), d.once("mouseup", function () {
                            var e = u.toOrientedRange();
                            F && e.isEmpty() && n(F.cursor, e.cursor) ? u.substractPoint(e.cursor) : (r ? u.substractPoint(b.cursor) : b && (d.removeSelectionMarker(b), u.addRange(b)), u.addRange(e)), d.$blockScrolling--, d.inVirtualSelectionMode = !1
                        })
                    } else if ("block" == h) {
                        e.stop(), d.inVirtualSelectionMode = !0;
                        var x, S = [], $ = function () {
                            var e = d.renderer.pixelToScreenCoordinates(v, w), t = A.screenToDocumentPosition(e.row, e.column);
                            n(C, e) && n(t, u.lead) || (C = e, d.$blockScrolling++, d.selection.moveToPosition(t), d.renderer.scrollCursorIntoView(), d.removeSelectionMarkers(S), S = u.rectangularRangeBlock(C, E), d.$mouseHandler.$clickSelection && 1 == S.length && S[0].isEmpty() && (S[0] = d.$mouseHandler.$clickSelection.clone()), S.forEach(d.addSelectionMarker, d), d.updateSelectionMarkers(), d.$blockScrolling--)
                        };
                        d.$blockScrolling++, f && !l ? u.toSingleRange() : !f && l && (x = u.toOrientedRange(), d.addSelectionMarker(x)), r ? E = A.documentToScreenPosition(u.lead) : u.moveToPosition(p), d.$blockScrolling--, C = {
                            row: -1,
                            column: -1
                        };
                        var D = function (e) {
                            clearInterval(B), d.removeSelectionMarkers(S), S.length || (S = [u.toOrientedRange()]), d.$blockScrolling++, x && (d.removeSelectionMarker(x), u.toSingleRange(x));
                            for (var t = 0; t < S.length; t++)u.addRange(S[t]);
                            d.inVirtualSelectionMode = !1, d.$mouseHandler.$clickSelection = null, d.$blockScrolling--
                        }, k = $;
                        o.capture(d.container, y, D);
                        var B = setInterval(function () {
                            k()
                        }, 20);
                        return e.preventDefault()
                    }
                }
            }

            var o = e("../lib/event"), s = e("../lib/useragent");
            t.onMouseDown = r
        }), ace.define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function (e, t, i) {
            t.defaultCommands = [{
                name: "addCursorAbove", exec: function (e) {
                    e.selectMoreLines(-1)
                }, bindKey: {win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up"}, scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "addCursorBelow", exec: function (e) {
                    e.selectMoreLines(1)
                }, bindKey: {win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down"}, scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "addCursorAboveSkipCurrent", exec: function (e) {
                    e.selectMoreLines(-1, !0)
                }, bindKey: {win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up"}, scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "addCursorBelowSkipCurrent",
                exec: function (e) {
                    e.selectMoreLines(1, !0)
                },
                bindKey: {win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down"},
                scrollIntoView: "cursor",
                readOnly: !0
            }, {
                name: "selectMoreBefore", exec: function (e) {
                    e.selectMore(-1)
                }, bindKey: {win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left"}, scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectMoreAfter", exec: function (e) {
                    e.selectMore(1)
                }, bindKey: {win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right"}, scrollIntoView: "cursor", readOnly: !0
            }, {
                name: "selectNextBefore",
                exec: function (e) {
                    e.selectMore(-1, !0)
                },
                bindKey: {win: "Ctrl-Alt-Shift-Left", mac: "Ctrl-Alt-Shift-Left"},
                scrollIntoView: "cursor",
                readOnly: !0
            }, {
                name: "selectNextAfter",
                exec: function (e) {
                    e.selectMore(1, !0)
                },
                bindKey: {win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right"},
                scrollIntoView: "cursor",
                readOnly: !0
            }, {
                name: "splitIntoLines", exec: function (e) {
                    e.multiSelect.splitIntoLines()
                }, bindKey: {win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L"}, readOnly: !0
            }, {
                name: "alignCursors", exec: function (e) {
                    e.alignCursors()
                }, bindKey: {win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A"}, scrollIntoView: "cursor"
            }, {
                name: "findAll", exec: function (e) {
                    e.findAll()
                }, bindKey: {win: "Ctrl-Alt-K", mac: "Ctrl-Alt-G"}, scrollIntoView: "cursor", readOnly: !0
            }], t.multiSelectCommands = [{
                name: "singleSelection", bindKey: "esc", exec: function (e) {
                    e.exitMultiSelectMode()
                }, scrollIntoView: "cursor", readOnly: !0, isAvailable: function (e) {
                    return e && e.inMultiSelectMode
                }
            }];
            var n = e("../keyboard/hash_handler").HashHandler;
            t.keyboardHandler = new n(t.multiSelectCommands)
        }), ace.define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"], function (e, t, i) {
            function n(e, t, i) {
                return m.$options.wrap = !0, m.$options.needle = t, m.$options.backwards = -1 == i, m.find(e)
            }

            function r(e, t) {
                return e.row == t.row && e.column == t.column
            }

            function o(e) {
                e.$multiselectOnSessionChange || (e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), e.$multiselectOnSessionChange = t.onSessionChange.bind(e), e.$checkMultiselectChange = e.$checkMultiselectChange.bind(e), e.$multiselectOnSessionChange(e), e.on("changeSession", e.$multiselectOnSessionChange), e.on("mousedown", h), e.commands.addCommands(f.defaultCommands), s(e))
            }

            function s(e) {
                function t(t) {
                    n && (e.renderer.setMouseCursor(""), n = !1)
                }

                var i = e.textInput.getElement(), n = !1;
                d.addListener(i, "keydown", function (i) {
                    var r = 18 == i.keyCode && !(i.ctrlKey || i.shiftKey || i.metaKey);
                    e.$blockSelectEnabled && r ? n || (e.renderer.setMouseCursor("crosshair"), n = !0) : n && t()
                }), d.addListener(i, "keyup", t), d.addListener(i, "blur", t)
            }

            var a = e("./range_list").RangeList, l = e("./range").Range, c = e("./selection").Selection, h = e("./mouse/multi_select_handler").onMouseDown, d = e("./lib/event"), u = e("./lib/lang"), f = e("./commands/multi_select_commands");
            t.commands = f.defaultCommands.concat(f.multiSelectCommands);
            var p = e("./search").Search, m = new p, g = e("./edit_session").EditSession;
            (function () {
                this.getSelectionMarkers = function () {
                    return this.$selectionMarkers
                }
            }).call(g.prototype), function () {
                this.ranges = null, this.rangeList = null, this.addRange = function (e, t) {
                    if (e) {
                        if (!this.inMultiSelectMode && 0 === this.rangeCount) {
                            var i = this.toOrientedRange();
                            if (this.rangeList.add(i), this.rangeList.add(e), 2 != this.rangeList.ranges.length)return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
                            this.rangeList.removeAll(), this.rangeList.add(i), this.$onAddRange(i)
                        }
                        e.cursor || (e.cursor = e.end);
                        var n = this.rangeList.add(e);
                        return this.$onAddRange(e), n.length && this.$onRemoveRange(n), this.rangeCount > 1 && !this.inMultiSelectMode && (this._signal("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e)
                    }
                }, this.toSingleRange = function (e) {
                    e = e || this.ranges[0];
                    var t = this.rangeList.removeAll();
                    t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e)
                }, this.substractPoint = function (e) {
                    var t = this.rangeList.substractPoint(e);
                    return t ? (this.$onRemoveRange(t), t[0]) : void 0
                }, this.mergeOverlappingRanges = function () {
                    var e = this.rangeList.merge();
                    e.length ? this.$onRemoveRange(e) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
                }, this.$onAddRange = function (e) {
                    this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._signal("addRange", {range: e})
                }, this.$onRemoveRange = function (e) {
                    if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
                        var t = this.rangeList.ranges.pop();
                        e.push(t), this.rangeCount = 0
                    }
                    for (var i = e.length; i--;) {
                        var n = this.ranges.indexOf(e[i]);
                        this.ranges.splice(n, 1)
                    }
                    this._signal("removeRange", {ranges: e}), 0 === this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._signal("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), t = t || this.ranges[0], t && !t.isEqual(this.getRange()) && this.fromOrientedRange(t)
                }, this.$initRangeList = function () {
                    this.rangeList || (this.rangeList = new a, this.ranges = [], this.rangeCount = 0)
                }, this.getAllRanges = function () {
                    return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()]
                }, this.splitIntoLines = function () {
                    if (this.rangeCount > 1) {
                        var e = this.rangeList.ranges, t = e[e.length - 1], i = l.fromPoints(e[0].start, t.end);
                        this.toSingleRange(), this.setSelectionRange(i, t.cursor == t.start)
                    } else {
                        var i = this.getRange(), n = this.isBackwards(), r = i.start.row, o = i.end.row;
                        if (r == o) {
                            if (n)var s = i.end, a = i.start; else var s = i.start, a = i.end;
                            return this.addRange(l.fromPoints(a, a)), void this.addRange(l.fromPoints(s, s))
                        }
                        var c = [], h = this.getLineRange(r, !0);
                        h.start.column = i.start.column, c.push(h);
                        for (var d = r + 1; o > d; d++)c.push(this.getLineRange(d, !0));
                        h = this.getLineRange(o, !0), h.end.column = i.end.column, c.push(h), c.forEach(this.addRange, this)
                    }
                }, this.toggleBlockSelection = function () {
                    if (this.rangeCount > 1) {
                        var e = this.rangeList.ranges, t = e[e.length - 1], i = l.fromPoints(e[0].start, t.end);
                        this.toSingleRange(), this.setSelectionRange(i, t.cursor == t.start)
                    } else {
                        var n = this.session.documentToScreenPosition(this.selectionLead), r = this.session.documentToScreenPosition(this.selectionAnchor), o = this.rectangularRangeBlock(n, r);
                        o.forEach(this.addRange, this)
                    }
                }, this.rectangularRangeBlock = function (e, t, i) {
                    var n = [], o = e.column < t.column;
                    if (o)var s = e.column, a = t.column; else var s = t.column, a = e.column;
                    var c = e.row < t.row;
                    if (c)var h = e.row, d = t.row; else var h = t.row, d = e.row;
                    0 > s && (s = 0), 0 > h && (h = 0), h == d && (i = !0);
                    for (var u = h; d >= u; u++) {
                        var f = l.fromPoints(this.session.screenToDocumentPosition(u, s), this.session.screenToDocumentPosition(u, a));
                        if (f.isEmpty()) {
                            if (p && r(f.end, p))break;
                            var p = f.end
                        }
                        f.cursor = o ? f.start : f.end, n.push(f)
                    }
                    if (c && n.reverse(), !i) {
                        for (var m = n.length - 1; n[m].isEmpty() && m > 0;)m--;
                        if (m > 0)for (var g = 0; n[g].isEmpty();)g++;
                        for (var v = m; v >= g; v--)n[v].isEmpty() && n.splice(v, 1)
                    }
                    return n
                }
            }.call(c.prototype);
            var v = e("./editor").Editor;
            (function () {
                this.updateSelectionMarkers = function () {
                    this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                }, this.addSelectionMarker = function (e) {
                    e.cursor || (e.cursor = e.end);
                    var t = this.getSelectionStyle();
                    return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e
                }, this.removeSelectionMarker = function (e) {
                    if (e.marker) {
                        this.session.removeMarker(e.marker);
                        var t = this.session.$selectionMarkers.indexOf(e);
                        -1 != t && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
                    }
                }, this.removeSelectionMarkers = function (e) {
                    for (var t = this.session.$selectionMarkers, i = e.length; i--;) {
                        var n = e[i];
                        if (n.marker) {
                            this.session.removeMarker(n.marker);
                            var r = t.indexOf(n);
                            -1 != r && t.splice(r, 1)
                        }
                    }
                    this.session.selectionMarkerCount = t.length
                }, this.$onAddRange = function (e) {
                    this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                }, this.$onRemoveRange = function (e) {
                    this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                }, this.$onMultiSelect = function (e) {
                    this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(f.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
                }, this.$onSingleSelect = function (e) {
                    this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(f.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers(), this._emit("changeSelection"))
                }, this.$onMultiSelectExec = function (e) {
                    var t = e.command, i = e.editor;
                    if (i.multiSelect) {
                        if (t.multiSelectAction)"forEach" == t.multiSelectAction ? n = i.forEachSelection(t, e.args) : "forEachLine" == t.multiSelectAction ? n = i.forEachSelection(t, e.args, !0) : "single" == t.multiSelectAction ? (i.exitMultiSelectMode(), n = t.exec(i, e.args || {})) : n = t.multiSelectAction(i, e.args || {}); else {
                            var n = t.exec(i, e.args || {});
                            i.multiSelect.addRange(i.multiSelect.toOrientedRange()), i.multiSelect.mergeOverlappingRanges()
                        }
                        return n
                    }
                }, this.forEachSelection = function (e, t, i) {
                    if (!this.inVirtualSelectionMode) {
                        var n, r = i && i.keepOrder, o = 1 == i || i && i.$byLines, s = this.session, a = this.selection, l = a.rangeList, h = (r ? a : l).ranges;
                        if (!h.length)return e.exec ? e.exec(this, t || {}) : e(this, t || {});
                        var d = a._eventRegistry;
                        a._eventRegistry = {};
                        var u = new c(s);
                        this.inVirtualSelectionMode = !0;
                        for (var f = h.length; f--;) {
                            if (o)for (; f > 0 && h[f].start.row == h[f - 1].end.row;)f--;
                            u.fromOrientedRange(h[f]), u.index = f, this.selection = s.selection = u;
                            var p = e.exec ? e.exec(this, t || {}) : e(this, t || {});
                            n || void 0 === p || (n = p), u.toOrientedRange(h[f])
                        }
                        u.detach(), this.selection = s.selection = a, this.inVirtualSelectionMode = !1, a._eventRegistry = d, a.mergeOverlappingRanges();
                        var m = this.renderer.$scrollAnimation;
                        return this.onCursorChange(), this.onSelectionChange(), m && m.from == m.to && this.renderer.animateScrolling(m.from), n
                    }
                }, this.exitMultiSelectMode = function () {
                    this.inMultiSelectMode && !this.inVirtualSelectionMode && this.multiSelect.toSingleRange()
                }, this.getSelectedText = function () {
                    var e = "";
                    if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                        for (var t = this.multiSelect.rangeList.ranges, i = [], n = 0; n < t.length; n++)i.push(this.session.getTextRange(t[n]));
                        var r = this.session.getDocument().getNewLineCharacter();
                        e = i.join(r), e.length == (i.length - 1) * r.length && (e = "")
                    } else this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
                    return e
                }, this.$checkMultiselectChange = function (e, t) {
                    if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                        var i = this.multiSelect.ranges[0];
                        if (this.multiSelect.isEmpty() && t == this.multiSelect.anchor)return;
                        var n = t == this.multiSelect.anchor ? i.cursor == i.start ? i.end : i.start : i.cursor;
                        (n.row != t.row || this.session.$clipPositionToDocument(n.row, n.column).column != t.column) && this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange())
                    }
                }, this.findAll = function (e, t, i) {
                    if (t = t || {}, t.needle = e || t.needle, void 0 == t.needle) {
                        var n = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
                        t.needle = this.session.getTextRange(n)
                    }
                    this.$search.set(t);
                    var r = this.$search.findAll(this.session);
                    if (!r.length)return 0;
                    this.$blockScrolling += 1;
                    var o = this.multiSelect;
                    i || o.toSingleRange(r[0]);
                    for (var s = r.length; s--;)o.addRange(r[s], !0);
                    return n && o.rangeList.rangeAtPoint(n.start) && o.addRange(n, !0), this.$blockScrolling -= 1, r.length
                }, this.selectMoreLines = function (e, t) {
                    var i = this.selection.toOrientedRange(), n = i.cursor == i.end, r = this.session.documentToScreenPosition(i.cursor);
                    this.selection.$desiredColumn && (r.column = this.selection.$desiredColumn);
                    var o = this.session.screenToDocumentPosition(r.row + e, r.column);
                    if (i.isEmpty())var s = o; else var a = this.session.documentToScreenPosition(n ? i.end : i.start), s = this.session.screenToDocumentPosition(a.row + e, a.column);
                    if (n) {
                        var c = l.fromPoints(o, s);
                        c.cursor = c.start
                    } else {
                        var c = l.fromPoints(s, o);
                        c.cursor = c.end
                    }
                    if (c.desiredColumn = r.column, this.selection.inMultiSelectMode) {
                        if (t)var h = i.cursor
                    } else this.selection.addRange(i);
                    this.selection.addRange(c), h && this.selection.substractPoint(h)
                }, this.transposeSelections = function (e) {
                    for (var t = this.session, i = t.multiSelect, n = i.ranges, r = n.length; r--;) {
                        var o = n[r];
                        if (o.isEmpty()) {
                            var s = t.getWordRange(o.start.row, o.start.column);
                            o.start.row = s.start.row, o.start.column = s.start.column, o.end.row = s.end.row, o.end.column = s.end.column
                        }
                    }
                    i.mergeOverlappingRanges();
                    for (var a = [], r = n.length; r--;) {
                        var o = n[r];
                        a.unshift(t.getTextRange(o))
                    }
                    0 > e ? a.unshift(a.pop()) : a.push(a.shift());
                    for (var r = n.length; r--;) {
                        var o = n[r], s = o.clone();
                        t.replace(o, a[r]), o.start.row = s.start.row, o.start.column = s.start.column
                    }
                }, this.selectMore = function (e, t, i) {
                    var r = this.session, o = r.multiSelect, s = o.toOrientedRange();
                    if (!s.isEmpty() || (s = r.getWordRange(s.start.row, s.start.column), s.cursor = -1 == e ? s.start : s.end, this.multiSelect.addRange(s), !i)) {
                        var a = r.getTextRange(s), l = n(r, a, e);
                        l && (l.cursor = -1 == e ? l.start : l.end, this.$blockScrolling += 1, this.session.unfold(l), this.multiSelect.addRange(l), this.$blockScrolling -= 1, this.renderer.scrollCursorIntoView(null, .5)), t && this.multiSelect.substractPoint(s.cursor)
                    }
                }, this.alignCursors = function () {
                    var e = this.session, t = e.multiSelect, i = t.ranges, n = -1, r = i.filter(function (e) {
                        return e.cursor.row == n ? !0 : void(n = e.cursor.row)
                    });
                    if (i.length && r.length != i.length - 1) {
                        r.forEach(function (e) {
                            t.substractPoint(e.cursor)
                        });
                        var o = 0, s = 1 / 0, a = i.map(function (t) {
                            var i = t.cursor, n = e.getLine(i.row), r = n.substr(i.column).search(/\S/g);
                            return -1 == r && (r = 0), i.column > o && (o = i.column), s > r && (s = r), r
                        });
                        i.forEach(function (t, i) {
                            var n = t.cursor, r = o - n.column, c = a[i] - s;
                            r > c ? e.insert(n, u.stringRepeat(" ", r - c)) : e.remove(new l(n.row, n.column, n.row, n.column - r + c)), t.start.column = t.end.column = o, t.start.row = t.end.row = n.row, t.cursor = t.end
                        }), t.fromOrientedRange(i[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                    } else {
                        var c = this.selection.getRange(), h = c.start.row, d = c.end.row, f = h == d;
                        if (f) {
                            var p, m = this.session.getLength();
                            do p = this.session.getLine(d); while (/[=:]/.test(p) && ++d < m);
                            do p = this.session.getLine(h); while (/[=:]/.test(p) && --h > 0);
                            0 > h && (h = 0), d >= m && (d = m - 1)
                        }
                        var g = this.session.removeFullLines(h, d);
                        g = this.$reAlignText(g, f), this.session.insert({
                            row: h,
                            column: 0
                        }, g.join("\n") + "\n"), f || (c.start.column = 0, c.end.column = g[g.length - 1].length), this.selection.setRange(c)
                    }
                }, this.$reAlignText = function (e, t) {
                    function i(e) {
                        return u.stringRepeat(" ", e)
                    }

                    function n(e) {
                        return e[2] ? i(s) + e[2] + i(a - e[2].length + l) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                    }

                    function r(e) {
                        return e[2] ? i(s + a - e[2].length) + e[2] + i(l, " ") + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                    }

                    function o(e) {
                        return e[2] ? i(s) + e[2] + i(l) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                    }

                    var s, a, l, c = !0, h = !0;
                    return e.map(function (e) {
                        var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
                        return t ? null == s ? (s = t[1].length, a = t[2].length, l = t[3].length, t) : (s + a + l != t[1].length + t[2].length + t[3].length && (h = !1), s != t[1].length && (c = !1), s > t[1].length && (s = t[1].length), a < t[2].length && (a = t[2].length), l > t[3].length && (l = t[3].length), t) : [e]
                    }).map(t ? n : c ? h ? r : n : o)
                }
            }).call(v.prototype), t.onSessionChange = function (e) {
                var t = e.session;
                t && !t.multiSelect && (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t && t.multiSelect;
                var i = e.oldSession;
                i && (i.multiSelect.off("addRange", this.$onAddRange), i.multiSelect.off("removeRange", this.$onRemoveRange), i.multiSelect.off("multiSelect", this.$onMultiSelect), i.multiSelect.off("singleSelect", this.$onSingleSelect), i.multiSelect.lead.off("change", this.$checkMultiselectChange), i.multiSelect.anchor.off("change", this.$checkMultiselectChange)), t && (t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), t.multiSelect.lead.on("change", this.$checkMultiselectChange), t.multiSelect.anchor.on("change", this.$checkMultiselectChange)), t && this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
            }, t.MultiSelect = o, e("./config").defineOptions(v.prototype, "editor", {
                enableMultiselect: {
                    set: function (e) {
                        o(this), e ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", h)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", h))
                    }, value: !0
                }, enableBlockSelect: {
                    set: function (e) {
                        this.$blockSelectEnabled = e
                    }, value: !0
                }
            })
        }), ace.define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (e, t, i) {
            "use strict";
            var n = e("../../range").Range, r = t.FoldMode = function () {
            };
            (function () {
                this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function (e, t, i) {
                    var n = e.getLine(i);
                    return this.foldingStartMarker.test(n) ? "start" : "markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(n) ? "end" : ""
                }, this.getFoldWidgetRange = function (e, t, i) {
                    return null
                }, this.indentationBlock = function (e, t, i) {
                    var r = /\S/, o = e.getLine(t), s = o.search(r);
                    if (-1 != s) {
                        for (var a = i || o.length, l = e.getLength(), c = t, h = t; ++t < l;) {
                            var d = e.getLine(t).search(r);
                            if (-1 != d) {
                                if (s >= d)break;
                                h = t
                            }
                        }
                        if (h > c) {
                            var u = e.getLine(h).length;
                            return new n(c, a, h, u)
                        }
                    }
                }, this.openingBracketBlock = function (e, t, i, r, o) {
                    var s = {row: i, column: r + 1}, a = e.$findClosingBracket(t, s, o);
                    if (a) {
                        var l = e.foldWidgets[a.row];
                        return null == l && (l = e.getFoldWidget(a.row)), "start" == l && a.row > s.row && (a.row--, a.column = e.getLine(a.row).length), n.fromPoints(s, a)
                    }
                }, this.closingBracketBlock = function (e, t, i, r, o) {
                    var s = {row: i, column: r}, a = e.$findOpeningBracket(t, s);
                    return a ? (a.column++, s.column--, n.fromPoints(a, s)) : void 0
                }
            }).call(r.prototype)
        }), ace.define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], function (e, t, i) {
            "use strict";
            t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {	background: #f0f0f0;	color: #333;	}	.ace-tm .ace_print-margin {	width: 1px;	background: #e8e8e8;	}	.ace-tm .ace_fold {	background-color: #6B72E6;	}	.ace-tm {	background-color: #FFFFFF;	color: black;	}	.ace-tm .ace_cursor {	color: black;	}	.ace-tm .ace_invisible {	color: rgb(191, 191, 191);	}	.ace-tm .ace_storage,	.ace-tm .ace_keyword {	color: blue;	}	.ace-tm .ace_constant {	color: rgb(197, 6, 11);	}	.ace-tm .ace_constant.ace_buildin {	color: rgb(88, 72, 246);	}	.ace-tm .ace_constant.ace_language {	color: rgb(88, 92, 246);	}	.ace-tm .ace_constant.ace_library {	color: rgb(6, 150, 14);	}	.ace-tm .ace_invalid {	background-color: rgba(255, 0, 0, 0.1);	color: red;	}	.ace-tm .ace_support.ace_function {	color: rgb(60, 76, 114);	}	.ace-tm .ace_support.ace_constant {	color: rgb(6, 150, 14);	}	.ace-tm .ace_support.ace_type,	.ace-tm .ace_support.ace_class {	color: rgb(109, 121, 222);	}	.ace-tm .ace_keyword.ace_operator {	color: rgb(104, 118, 135);	}	.ace-tm .ace_string {	color: rgb(3, 106, 7);	}	.ace-tm .ace_comment {	color: rgb(76, 136, 107);	}	.ace-tm .ace_comment.ace_doc {	color: rgb(0, 102, 255);	}	.ace-tm .ace_comment.ace_doc.ace_tag {	color: rgb(128, 159, 191);	}	.ace-tm .ace_constant.ace_numeric {	color: rgb(0, 0, 205);	}	.ace-tm .ace_variable {	color: rgb(49, 132, 149);	}	.ace-tm .ace_xml-pe {	color: rgb(104, 104, 91);	}	.ace-tm .ace_entity.ace_name.ace_function {	color: #0000A2;	}	.ace-tm .ace_heading {	color: rgb(12, 7, 255);	}	.ace-tm .ace_list {	color:rgb(185, 6, 144);	}	.ace-tm .ace_meta.ace_tag {	color:rgb(0, 22, 142);	}	.ace-tm .ace_string.ace_regex {	color: rgb(255, 0, 0)	}	.ace-tm .ace_marker-layer .ace_selection {	background: rgb(181, 213, 255);	}	.ace-tm.ace_multiselect .ace_selection.ace_start {	box-shadow: 0 0 3px 0px white;	}	.ace-tm .ace_marker-layer .ace_step {	background: rgb(252, 255, 0);	}	.ace-tm .ace_marker-layer .ace_stack {	background: rgb(164, 229, 101);	}	.ace-tm .ace_marker-layer .ace_bracket {	margin: -1px 0 0 -1px;	border: 1px solid rgb(192, 192, 192);	}	.ace-tm .ace_marker-layer .ace_active-line {	background: rgba(0, 0, 0, 0.07);	}	.ace-tm .ace_gutter-active-line {	background-color : #dcdcdc;	}	.ace-tm .ace_marker-layer .ace_selected-word {	background: rgb(250, 250, 255);	border: 1px solid rgb(200, 200, 250);	}	.ace-tm .ace_indent-guide {	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;	}	';
            var n = e("../lib/dom");
            n.importCssString(t.cssText, t.cssClass)
        }), ace.define("ace/line_widgets", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/range"], function (e, t, i) {
            "use strict";
            function n(e) {
                this.session = e, this.session.widgetManager = this, this.session.getRowLength = this.getRowLength, this.session.$getWidgetScreenLength = this.$getWidgetScreenLength, this.updateOnChange = this.updateOnChange.bind(this), this.renderWidgets = this.renderWidgets.bind(this), this.measureWidgets = this.measureWidgets.bind(this), this.session._changedWidgets = [], this.$onChangeEditor = this.$onChangeEditor.bind(this), this.session.on("change", this.updateOnChange), this.session.on("changeFold", this.updateOnFold), this.session.on("changeEditor", this.$onChangeEditor)
            }

            var r = (e("./lib/oop"), e("./lib/dom"));
            e("./range").Range;
            (function () {
                this.getRowLength = function (e) {
                    var t;
                    return t = this.lineWidgets ? this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0 : 0, this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t
                }, this.$getWidgetScreenLength = function () {
                    var e = 0;
                    return this.lineWidgets.forEach(function (t) {
                        t && t.rowCount && !t.hidden && (e += t.rowCount)
                    }), e
                }, this.$onChangeEditor = function (e) {
                    this.attach(e.editor)
                }, this.attach = function (e) {
                    e && e.widgetManager && e.widgetManager != this && e.widgetManager.detach(), this.editor != e && (this.detach(), this.editor = e, e && (e.widgetManager = this, e.renderer.on("beforeRender", this.measureWidgets), e.renderer.on("afterRender", this.renderWidgets)))
                }, this.detach = function (e) {
                    var t = this.editor;
                    if (t) {
                        this.editor = null, t.widgetManager = null, t.renderer.off("beforeRender", this.measureWidgets), t.renderer.off("afterRender", this.renderWidgets);
                        var i = this.session.lineWidgets;
                        i && i.forEach(function (e) {
                            e && e.el && e.el.parentNode && (e._inDocument = !1, e.el.parentNode.removeChild(e.el))
                        })
                    }
                }, this.updateOnFold = function (e, t) {
                    var i = t.lineWidgets;
                    if (i && e.action) {
                        for (var n = e.data, r = n.start.row, o = n.end.row, s = "add" == e.action, a = r + 1; o > a; a++)i[a] && (i[a].hidden = s);
                        i[o] && (s ? i[r] ? i[o].hidden = s : i[r] = i[o] : (i[r] == i[o] && (i[r] = void 0), i[o].hidden = s))
                    }
                }, this.updateOnChange = function (e) {
                    var t = this.session.lineWidgets;
                    if (t) {
                        var i = e.start.row, n = e.end.row - i;
                        if (0 === n); else if ("remove" == e.action) {
                            var r = t.splice(i + 1, n);
                            r.forEach(function (e) {
                                e && this.removeLineWidget(e)
                            }, this), this.$updateRows()
                        } else {
                            var o = new Array(n);
                            o.unshift(i, 0), t.splice.apply(t, o), this.$updateRows()
                        }
                    }
                }, this.$updateRows = function () {
                    var e = this.session.lineWidgets;
                    if (e) {
                        var t = !0;
                        e.forEach(function (e, i) {
                            if (e)for (t = !1, e.row = i; e.$oldWidget;)e.$oldWidget.row = i, e = e.$oldWidget
                        }), t && (this.session.lineWidgets = null)
                    }
                }, this.addLineWidget = function (e) {
                    this.session.lineWidgets || (this.session.lineWidgets = new Array(this.session.getLength()));
                    var t = this.session.lineWidgets[e.row];
                    t && (e.$oldWidget = t, t.el && t.el.parentNode && (t.el.parentNode.removeChild(t.el), t._inDocument = !1)), this.session.lineWidgets[e.row] = e, e.session = this.session;
                    var i = this.editor.renderer;
                    e.html && !e.el && (e.el = r.createElement("div"), e.el.innerHTML = e.html), e.el && (r.addCssClass(e.el, "ace_lineWidgetContainer"), e.el.style.position = "absolute", e.el.style.zIndex = 5, i.container.appendChild(e.el), e._inDocument = !0), e.coverGutter || (e.el.style.zIndex = 3), e.pixelHeight || (e.pixelHeight = e.el.offsetHeight), null == e.rowCount && (e.rowCount = e.pixelHeight / i.layerConfig.lineHeight);
                    var n = this.session.getFoldAt(e.row, 0);
                    if (e.$fold = n, n) {
                        var o = this.session.lineWidgets;
                        e.row != n.end.row || o[n.start.row] ? e.hidden = !0 : o[n.start.row] = e
                    }
                    return this.session._emit("changeFold", {data: {start: {row: e.row}}}), this.$updateRows(), this.renderWidgets(null, i), this.onWidgetChanged(e), e
                }, this.removeLineWidget = function (e) {
                    if (e._inDocument = !1, e.session = null, e.el && e.el.parentNode && e.el.parentNode.removeChild(e.el), e.editor && e.editor.destroy)try {
                        e.editor.destroy()
                    } catch (t) {
                    }
                    if (this.session.lineWidgets) {
                        var i = this.session.lineWidgets[e.row];
                        if (i == e)this.session.lineWidgets[e.row] = e.$oldWidget, e.$oldWidget && this.onWidgetChanged(e.$oldWidget); else for (; i;) {
                            if (i.$oldWidget == e) {
                                i.$oldWidget = e.$oldWidget;
                                break
                            }
                            i = i.$oldWidget
                        }
                    }
                    this.session._emit("changeFold", {data: {start: {row: e.row}}}), this.$updateRows()
                }, this.getWidgetsAtRow = function (e) {
                    for (var t = this.session.lineWidgets, i = t && t[e], n = []; i;)n.push(i), i = i.$oldWidget;
                    return n
                }, this.onWidgetChanged = function (e) {
                    this.session._changedWidgets.push(e), this.editor && this.editor.renderer.updateFull()
                }, this.measureWidgets = function (e, t) {
                    var i = this.session._changedWidgets, n = t.layerConfig;
                    if (i && i.length) {
                        for (var r = 1 / 0, o = 0; o < i.length; o++) {
                            var s = i[o];
                            if (s && s.el && s.session == this.session) {
                                if (!s._inDocument) {
                                    if (this.session.lineWidgets[s.row] != s)continue;
                                    s._inDocument = !0, t.container.appendChild(s.el)
                                }
                                s.h = s.el.offsetHeight, s.fixedWidth || (s.w = s.el.offsetWidth, s.screenWidth = Math.ceil(s.w / n.characterWidth));
                                var a = s.h / n.lineHeight;
                                s.coverLine && (a -= this.session.getRowLineCount(s.row), 0 > a && (a = 0)), s.rowCount != a && (s.rowCount = a, s.row < r && (r = s.row))
                            }
                        }
                        r != 1 / 0 && (this.session._emit("changeFold", {data: {start: {row: r}}}), this.session.lineWidgetWidth = null), this.session._changedWidgets = []
                    }
                }, this.renderWidgets = function (e, t) {
                    var i = t.layerConfig, n = this.session.lineWidgets;
                    if (n) {
                        for (var r = Math.min(this.firstRow, i.firstRow), o = Math.max(this.lastRow, i.lastRow, n.length); r > 0 && !n[r];)r--;
                        this.firstRow = i.firstRow, this.lastRow = i.lastRow, t.$cursorLayer.config = i;
                        for (var s = r; o >= s; s++) {
                            var a = n[s];
                            if (a && a.el)if (a.hidden)a.el.style.top = -100 - (a.pixelHeight || 0) + "px"; else {
                                a._inDocument || (a._inDocument = !0, t.container.appendChild(a.el));
                                var l = t.$cursorLayer.getPixelPosition({row: s, column: 0}, !0).top;
                                a.coverLine || (l += i.lineHeight * this.session.getRowLineCount(a.row)), a.el.style.top = l - i.offset + "px";
                                var c = a.coverGutter ? 0 : t.gutterWidth;
                                a.fixedWidth || (c -= t.scrollLeft), a.el.style.left = c + "px", a.fullWidth && a.screenWidth && (a.el.style.minWidth = i.width + 2 * i.padding + "px"), a.fixedWidth ? a.el.style.right = t.scrollBar.getWidth() + "px" : a.el.style.right = ""
                            }
                        }
                    }
                }
            }).call(n.prototype), t.LineWidgets = n
        }), ace.define("ace/ext/error_marker", ["require", "exports", "module", "ace/line_widgets", "ace/lib/dom", "ace/range"], function (e, t, i) {
            "use strict";
            function n(e, t, i) {
                for (var n = 0, r = e.length - 1; r >= n;) {
                    var o = n + r >> 1, s = i(t, e[o]);
                    if (s > 0)n = o + 1; else {
                        if (!(0 > s))return o;
                        r = o - 1
                    }
                }
                return -(n + 1)
            }

            function r(e, t, i) {
                var r = e.getAnnotations().sort(a.comparePoints);
                if (r.length) {
                    var o = n(r, {row: t, column: -1}, a.comparePoints);
                    0 > o && (o = -o - 1), o >= r.length ? o = i > 0 ? 0 : r.length - 1 : 0 === o && 0 > i && (o = r.length - 1);
                    var s = r[o];
                    if (s && i) {
                        if (s.row === t) {
                            do s = r[o += i]; while (s && s.row === t);
                            if (!s)return r.slice()
                        }
                        var l = [];
                        t = s.row;
                        do l[0 > i ? "unshift" : "push"](s), s = r[o += i]; while (s && s.row == t);
                        return l.length && l
                    }
                }
            }

            var o = e("../line_widgets").LineWidgets, s = e("../lib/dom"), a = e("../range").Range;
            t.showErrorMarker = function (e, t) {
                var i = e.session;
                i.widgetManager || (i.widgetManager = new o(i), i.widgetManager.attach(e));
                var n = e.getCursorPosition(), a = n.row, l = i.widgetManager.getWidgetsAtRow(a).filter(function (e) {
                    return "errorMarker" == e.type
                })[0];
                l ? l.destroy() : a -= t;
                var c, h = r(i, a, t);
                if (h) {
                    var d = h[0];
                    n.column = (d.pos && "number" != typeof d.column ? d.pos.sc : d.column) || 0, n.row = d.row, c = e.renderer.$gutterLayer.$annotations[n.row]
                } else {
                    if (l)return;
                    c = {text: ["Looks good!"], className: "ace_ok"}
                }
                e.session.unfold(n.row), e.selection.moveToPosition(n);
                var u = {
                    row: n.row,
                    fixedWidth: !0,
                    coverGutter: !0,
                    el: s.createElement("div"),
                    type: "errorMarker"
                }, f = u.el.appendChild(s.createElement("div")), p = u.el.appendChild(s.createElement("div"));
                p.className = "error_widget_arrow " + c.className;
                var m = e.renderer.$cursorLayer.getPixelPosition(n).left;
                p.style.left = m + e.renderer.gutterWidth - 5 + "px", u.el.className = "error_widget_wrapper", f.className = "error_widget " + c.className, f.innerHTML = c.text.join("<br>"), f.appendChild(s.createElement("div"));
                var g = function (e, t, i) {
                    return 0 !== t || "esc" !== i && "return" !== i ? void 0 : (u.destroy(), {command: "null"})
                };
                u.destroy = function () {
                    e.$mouseHandler.isMousePressed || (e.keyBinding.removeKeyboardHandler(g), i.widgetManager.removeLineWidget(u), e.off("changeSelection", u.destroy), e.off("changeSession", u.destroy), e.off("mouseup", u.destroy), e.off("change", u.destroy))
                }, e.keyBinding.addKeyboardHandler(g), e.on("changeSelection", u.destroy), e.on("changeSession", u.destroy), e.on("mouseup", u.destroy), e.on("change", u.destroy), e.session.widgetManager.addLineWidget(u), u.el.onmousedown = e.focus.bind(e), e.renderer.scrollCursorIntoView(null, .5, {bottom: u.el.offsetHeight})
            }, s.importCssString("	    .error_widget_wrapper {	        background: inherit;	        color: inherit;	        border:none	    }	    .error_widget {	        border-top: solid 2px;	        border-bottom: solid 2px;	        margin: 5px 0;	        padding: 10px 40px;	        white-space: pre-wrap;	    }	    .error_widget.ace_error, .error_widget_arrow.ace_error{	        border-color: #ff5a5a	    }	    .error_widget.ace_warning, .error_widget_arrow.ace_warning{	        border-color: #F1D817	    }	    .error_widget.ace_info, .error_widget_arrow.ace_info{	        border-color: #5a5a5a	    }	    .error_widget.ace_ok, .error_widget_arrow.ace_ok{	        border-color: #5aaa5a	    }	    .error_widget_arrow {	        position: absolute;	        border: solid 5px;	        border-top-color: transparent!important;	        border-right-color: transparent!important;	        border-left-color: transparent!important;	        top: -5px;	    }	", "")
        }), ace.define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/multi_select", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/ext/error_marker", "ace/config"], function (e, t, i) {
            "use strict";
            e("./lib/fixoldbrowsers");
            var n = e("./lib/dom"), r = e("./lib/event"), o = e("./editor").Editor, s = e("./edit_session").EditSession, a = e("./undomanager").UndoManager, l = e("./virtual_renderer").VirtualRenderer;
            e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./multi_select"), e("./mode/folding/fold_mode"), e("./theme/textmate"), e("./ext/error_marker"), t.config = e("./config"), t.acequire = e, t.edit = function (e) {
                if ("string" == typeof e) {
                    var i = e;
                    if (e = document.getElementById(i), !e)throw new Error("ace.edit can't find div #" + i)
                }
                if (e && e.env && e.env.editor instanceof o)return e.env.editor;
                var s = "";
                if (e && /input|textarea/i.test(e.tagName)) {
                    var a = e;
                    s = a.value, e = n.createElement("pre"), a.parentNode.replaceChild(e, a)
                } else e && (s = n.getInnerText(e), e.innerHTML = "");
                var c = t.createEditSession(s), h = new o(new l(e));
                h.setSession(c);
                var d = {document: c, editor: h, onResize: h.resize.bind(h, null)};
                return a && (d.textarea = a), r.addListener(window, "resize", d.onResize), h.on("destroy", function () {
                    r.removeListener(window, "resize", d.onResize), d.editor.container.env = null
                }), h.container.env = h.env = d, h
            }, t.createEditSession = function (e, t) {
                var i = new s(e, t);
                return i.setUndoManager(new a), i
            }, t.EditSession = s, t.UndoManager = a, t.version = "1.2.2"
        }), function () {
            ace.acequire(["ace/ace"], function (e) {
                e && e.config.init(!0), window.ace || (window.ace = e);
                for (var t in e)e.hasOwnProperty(t) && (window.ace[t] = e[t])
            })
        }(), e.exports = window.ace.acequire("ace/ace")
    }, function (e, t, i) {
        ace.define("ace/mode/json_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, i) {
            "use strict";
            var n = e("../lib/oop"), r = e("./text_highlight_rules").TextHighlightRules, o = function () {
                this.$rules = {
                    start: [{
                        token: "variable",
                        regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
                    }, {token: "string", regex: '"', next: "string"}, {
                        token: "constant.numeric",
                        regex: "0[xX][0-9a-fA-F]+\\b"
                    }, {
                        token: "constant.numeric",
                        regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                    }, {token: "constant.language.boolean", regex: "(?:true|false)\\b"}, {
                        token: "invalid.illegal",
                        regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
                    }, {token: "invalid.illegal", regex: "\\/\\/.*$"}, {
                        token: "paren.lparen",
                        regex: "[[({]"
                    }, {token: "paren.rparen", regex: "[\\])}]"}, {token: "text", regex: "\\s+"}],
                    string: [{
                        token: "constant.language.escape",
                        regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
                    }, {token: "string", regex: '[^"\\\\]+'}, {
                        token: "string",
                        regex: '"',
                        next: "start"
                    }, {token: "string", regex: "", next: "start"}]
                }
            };
            n.inherits(o, r), t.JsonHighlightRules = o
        }), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, i) {
            "use strict";
            var n = e("../range").Range, r = function () {
            };
            (function () {
                this.checkOutdent = function (e, t) {
                    return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
                }, this.autoOutdent = function (e, t) {
                    var i = e.getLine(t), r = i.match(/^(\s*\})/);
                    if (!r)return 0;
                    var o = r[1].length, s = e.findMatchingBracket({row: t, column: o});
                    if (!s || s.row == t)return 0;
                    var a = this.$getIndent(e.getLine(s.row));
                    e.replace(new n(t, 0, t, o - 1), a)
                }, this.$getIndent = function (e) {
                    return e.match(/^\s*/)[0]
                }
            }).call(r.prototype), t.MatchingBraceOutdent = r
        }), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function (e, t, i) {
            "use strict";
            var n, r = e("../../lib/oop"), o = e("../behaviour").Behaviour, s = e("../../token_iterator").TokenIterator, a = e("../../lib/lang"), l = ["text", "paren.rparen", "punctuation.operator"], c = ["text", "paren.rparen", "punctuation.operator", "comment"], h = {}, d = function (e) {
                var t = -1;
                return e.multiSelect && (t = e.selection.index, h.rangeCount != e.multiSelect.rangeCount && (h = {rangeCount: e.multiSelect.rangeCount})), h[t] ? n = h[t] : void(n = h[t] = {
                    autoInsertedBrackets: 0,
                    autoInsertedRow: -1,
                    autoInsertedLineEnd: "",
                    maybeInsertedBrackets: 0,
                    maybeInsertedRow: -1,
                    maybeInsertedLineStart: "",
                    maybeInsertedLineEnd: ""
                })
            }, u = function (e, t, i, n) {
                var r = e.end.row - e.start.row;
                return {text: i + t + n, selection: [0, e.start.column + 1, r, e.end.column + (r ? 0 : 1)]}
            }, f = function () {
                this.add("braces", "insertion", function (e, t, i, r, o) {
                    var s = i.getCursorPosition(), l = r.doc.getLine(s.row);
                    if ("{" == o) {
                        d(i);
                        var c = i.getSelectionRange(), h = r.doc.getTextRange(c);
                        if ("" !== h && "{" !== h && i.getWrapBehavioursEnabled())return u(c, h, "{", "}");
                        if (f.isSaneInsertion(i, r))return /[\]\}\)]/.test(l[s.column]) || i.inMultiSelectMode ? (f.recordAutoInsert(i, r, "}"), {
                            text: "{}",
                            selection: [1, 1]
                        }) : (f.recordMaybeInsert(i, r, "{"), {text: "{", selection: [1, 1]})
                    } else if ("}" == o) {
                        d(i);
                        var p = l.substring(s.column, s.column + 1);
                        if ("}" == p) {
                            var m = r.$findOpeningBracket("}", {column: s.column + 1, row: s.row});
                            if (null !== m && f.isAutoInsertedClosing(s, l, o))return f.popAutoInsertedClosing(), {
                                text: "",
                                selection: [1, 1]
                            }
                        }
                    } else {
                        if ("\n" == o || "\r\n" == o) {
                            d(i);
                            var g = "";
                            f.isMaybeInsertedClosing(s, l) && (g = a.stringRepeat("}", n.maybeInsertedBrackets), f.clearMaybeInsertedClosing());
                            var p = l.substring(s.column, s.column + 1);
                            if ("}" === p) {
                                var v = r.findMatchingBracket({row: s.row, column: s.column + 1}, "}");
                                if (!v)return null;
                                var w = this.$getIndent(r.getLine(v.row))
                            } else {
                                if (!g)return void f.clearMaybeInsertedClosing();
                                var w = this.$getIndent(l)
                            }
                            var y = w + r.getTabString();
                            return {text: "\n" + y + "\n" + w + g, selection: [1, y.length, 1, y.length]}
                        }
                        f.clearMaybeInsertedClosing()
                    }
                }), this.add("braces", "deletion", function (e, t, i, r, o) {
                    var s = r.doc.getTextRange(o);
                    if (!o.isMultiLine() && "{" == s) {
                        d(i);
                        var a = r.doc.getLine(o.start.row), l = a.substring(o.end.column, o.end.column + 1);
                        if ("}" == l)return o.end.column++, o;
                        n.maybeInsertedBrackets--
                    }
                }), this.add("parens", "insertion", function (e, t, i, n, r) {
                    if ("(" == r) {
                        d(i);
                        var o = i.getSelectionRange(), s = n.doc.getTextRange(o);
                        if ("" !== s && i.getWrapBehavioursEnabled())return u(o, s, "(", ")");
                        if (f.isSaneInsertion(i, n))return f.recordAutoInsert(i, n, ")"), {
                            text: "()",
                            selection: [1, 1]
                        }
                    } else if (")" == r) {
                        d(i);
                        var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                        if (")" == c) {
                            var h = n.$findOpeningBracket(")", {column: a.column + 1, row: a.row});
                            if (null !== h && f.isAutoInsertedClosing(a, l, r))return f.popAutoInsertedClosing(), {
                                text: "",
                                selection: [1, 1]
                            }
                        }
                    }
                }), this.add("parens", "deletion", function (e, t, i, n, r) {
                    var o = n.doc.getTextRange(r);
                    if (!r.isMultiLine() && "(" == o) {
                        d(i);
                        var s = n.doc.getLine(r.start.row), a = s.substring(r.start.column + 1, r.start.column + 2);
                        if (")" == a)return r.end.column++, r
                    }
                }), this.add("brackets", "insertion", function (e, t, i, n, r) {
                    if ("[" == r) {
                        d(i);
                        var o = i.getSelectionRange(), s = n.doc.getTextRange(o);
                        if ("" !== s && i.getWrapBehavioursEnabled())return u(o, s, "[", "]");
                        if (f.isSaneInsertion(i, n))return f.recordAutoInsert(i, n, "]"), {
                            text: "[]",
                            selection: [1, 1]
                        }
                    } else if ("]" == r) {
                        d(i);
                        var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                        if ("]" == c) {
                            var h = n.$findOpeningBracket("]", {column: a.column + 1, row: a.row});
                            if (null !== h && f.isAutoInsertedClosing(a, l, r))return f.popAutoInsertedClosing(), {
                                text: "",
                                selection: [1, 1]
                            }
                        }
                    }
                }), this.add("brackets", "deletion", function (e, t, i, n, r) {
                    var o = n.doc.getTextRange(r);
                    if (!r.isMultiLine() && "[" == o) {
                        d(i);
                        var s = n.doc.getLine(r.start.row), a = s.substring(r.start.column + 1, r.start.column + 2);
                        if ("]" == a)return r.end.column++, r
                    }
                }), this.add("string_dquotes", "insertion", function (e, t, i, n, r) {
                    if ('"' == r || "'" == r) {
                        d(i);
                        var o = r, s = i.getSelectionRange(), a = n.doc.getTextRange(s);
                        if ("" !== a && "'" !== a && '"' != a && i.getWrapBehavioursEnabled())return u(s, a, o, o);
                        if (!a) {
                            var l = i.getCursorPosition(), c = n.doc.getLine(l.row), h = c.substring(l.column - 1, l.column), f = c.substring(l.column, l.column + 1), p = n.getTokenAt(l.row, l.column), m = n.getTokenAt(l.row, l.column + 1);
                            if ("\\" == h && p && /escape/.test(p.type))return null;
                            var g, v = p && /string|escape/.test(p.type), w = !m || /string|escape/.test(m.type);
                            if (f == o)g = v !== w; else {
                                if (v && !w)return null;
                                if (v && w)return null;
                                var y = n.$mode.tokenRe;
                                y.lastIndex = 0;
                                var A = y.test(h);
                                y.lastIndex = 0;
                                var E = y.test(h);
                                if (A || E)return null;
                                if (f && !/[\s;,.})\]\\]/.test(f))return null;
                                g = !0
                            }
                            return {text: g ? o + o : "", selection: [1, 1]}
                        }
                    }
                }), this.add("string_dquotes", "deletion", function (e, t, i, n, r) {
                    var o = n.doc.getTextRange(r);
                    if (!r.isMultiLine() && ('"' == o || "'" == o)) {
                        d(i);
                        var s = n.doc.getLine(r.start.row), a = s.substring(r.start.column + 1, r.start.column + 2);
                        if (a == o)return r.end.column++, r
                    }
                })
            };
            f.isSaneInsertion = function (e, t) {
                var i = e.getCursorPosition(), n = new s(t, i.row, i.column);
                if (!this.$matchTokenType(n.getCurrentToken() || "text", l)) {
                    var r = new s(t, i.row, i.column + 1);
                    if (!this.$matchTokenType(r.getCurrentToken() || "text", l))return !1
                }
                return n.stepForward(), n.getCurrentTokenRow() !== i.row || this.$matchTokenType(n.getCurrentToken() || "text", c)
            }, f.$matchTokenType = function (e, t) {
                return t.indexOf(e.type || e) > -1
            }, f.recordAutoInsert = function (e, t, i) {
                var r = e.getCursorPosition(), o = t.doc.getLine(r.row);
                this.isAutoInsertedClosing(r, o, n.autoInsertedLineEnd[0]) || (n.autoInsertedBrackets = 0), n.autoInsertedRow = r.row, n.autoInsertedLineEnd = i + o.substr(r.column), n.autoInsertedBrackets++
            }, f.recordMaybeInsert = function (e, t, i) {
                var r = e.getCursorPosition(), o = t.doc.getLine(r.row);
                this.isMaybeInsertedClosing(r, o) || (n.maybeInsertedBrackets = 0), n.maybeInsertedRow = r.row, n.maybeInsertedLineStart = o.substr(0, r.column) + i, n.maybeInsertedLineEnd = o.substr(r.column), n.maybeInsertedBrackets++
            }, f.isAutoInsertedClosing = function (e, t, i) {
                return n.autoInsertedBrackets > 0 && e.row === n.autoInsertedRow && i === n.autoInsertedLineEnd[0] && t.substr(e.column) === n.autoInsertedLineEnd
            }, f.isMaybeInsertedClosing = function (e, t) {
                return n.maybeInsertedBrackets > 0 && e.row === n.maybeInsertedRow && t.substr(e.column) === n.maybeInsertedLineEnd && t.substr(0, e.column) == n.maybeInsertedLineStart
            }, f.popAutoInsertedClosing = function () {
                n.autoInsertedLineEnd = n.autoInsertedLineEnd.substr(1), n.autoInsertedBrackets--
            }, f.clearMaybeInsertedClosing = function () {
                n && (n.maybeInsertedBrackets = 0, n.maybeInsertedRow = -1)
            }, r.inherits(f, o), t.CstyleBehaviour = f
        }), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, i) {
            "use strict";
            var n = e("../../lib/oop"), r = e("../../range").Range, o = e("./fold_mode").FoldMode, s = t.FoldMode = function (e) {
                e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
            };
            n.inherits(s, o), function () {
                this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, i) {
                    var n = e.getLine(i);
                    if (this.singleLineBlockCommentRe.test(n) && !this.startRegionRe.test(n) && !this.tripleStarBlockCommentRe.test(n))return "";
                    var r = this._getFoldWidgetBase(e, t, i);
                    return !r && this.startRegionRe.test(n) ? "start" : r
                }, this.getFoldWidgetRange = function (e, t, i, n) {
                    var r = e.getLine(i);
                    if (this.startRegionRe.test(r))return this.getCommentRegionBlock(e, r, i);
                    var o = r.match(this.foldingStartMarker);
                    if (o) {
                        var s = o.index;
                        if (o[1])return this.openingBracketBlock(e, o[1], i, s);
                        var a = e.getCommentFoldRange(i, s + o[0].length, 1);
                        return a && !a.isMultiLine() && (n ? a = this.getSectionRange(e, i) : "all" != t && (a = null)), a
                    }
                    if ("markbegin" !== t) {
                        var o = r.match(this.foldingStopMarker);
                        if (o) {
                            var s = o.index + o[0].length;
                            return o[1] ? this.closingBracketBlock(e, o[1], i, s) : e.getCommentFoldRange(i, s, -1)
                        }
                    }
                }, this.getSectionRange = function (e, t) {
                    var i = e.getLine(t), n = i.search(/\S/), o = t, s = i.length;
                    t += 1;
                    for (var a = t, l = e.getLength(); ++t < l;) {
                        i = e.getLine(t);
                        var c = i.search(/\S/);
                        if (-1 !== c) {
                            if (n > c)break;
                            var h = this.getFoldWidgetRange(e, "all", t);
                            if (h) {
                                if (h.start.row <= o)break;
                                if (h.isMultiLine())t = h.end.row; else if (n == c)break
                            }
                            a = t
                        }
                    }
                    return new r(o, s, a, e.getLine(a).length)
                }, this.getCommentRegionBlock = function (e, t, i) {
                    for (var n = t.search(/\s*$/), o = e.getLength(), s = i, a = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/, l = 1; ++i < o;) {
                        t = e.getLine(i);
                        var c = a.exec(t);
                        if (c && (c[1] ? l-- : l++, !l))break
                    }
                    var h = i;
                    return h > s ? new r(s, n, h, t.length) : void 0
                }
            }.call(s.prototype)
        }), ace.define("ace/mode/json", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/json_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle", "ace/worker/worker_client"], function (e, t, n) {
            "use strict";
            var r = e("../lib/oop"), o = e("./text").Mode, s = e("./json_highlight_rules").JsonHighlightRules, a = e("./matching_brace_outdent").MatchingBraceOutdent, l = e("./behaviour/cstyle").CstyleBehaviour, c = e("./folding/cstyle").FoldMode, h = e("../worker/worker_client").WorkerClient, d = function () {
                this.HighlightRules = s, this.$outdent = new a, this.$behaviour = new l, this.foldingRules = new c
            };
            r.inherits(d, o), function () {
                this.getNextLineIndent = function (e, t, i) {
                    var n = this.$getIndent(t);
                    if ("start" == e) {
                        var r = t.match(/^.*[\{\(\[]\s*$/);
                        r && (n += i)
                    }
                    return n
                }, this.checkOutdent = function (e, t, i) {
                    return this.$outdent.checkOutdent(t, i)
                }, this.autoOutdent = function (e, t, i) {
                    this.$outdent.autoOutdent(t, i)
                }, this.createWorker = function (e) {
                    var t = new h(["ace"], i(38), "JsonWorker");
                    return t.attachToDocument(e.getDocument()), t.on("annotate", function (t) {
                        e.setAnnotations(t.data)
                    }), t.on("terminate", function () {
                        e.clearAnnotations()
                    }), t
                }, this.$id = "ace/mode/json"
            }.call(d.prototype), t.Mode = d
        })
    }, function (e, t, i) {
        ace.define("ace/ext/searchbox", ["require", "exports", "module", "ace/lib/dom", "ace/lib/lang", "ace/lib/event", "ace/keyboard/hash_handler", "ace/lib/keys"], function (e, t, i) {
            "use strict";
            var n = e("../lib/dom"), r = e("../lib/lang"), o = e("../lib/event"), s = "	.ace_search {	background-color: #ddd;	border: 1px solid #cbcbcb;	border-top: 0 none;	max-width: 325px;	overflow: hidden;	margin: 0;	padding: 4px;	padding-right: 6px;	padding-bottom: 0;	position: absolute;	top: 0px;	z-index: 99;	white-space: normal;	}	.ace_search.left {	border-left: 0 none;	border-radius: 0px 0px 5px 0px;	left: 0;	}	.ace_search.right {	border-radius: 0px 0px 0px 5px;	border-right: 0 none;	right: 0;	}	.ace_search_form, .ace_replace_form {	border-radius: 3px;	border: 1px solid #cbcbcb;	float: left;	margin-bottom: 4px;	overflow: hidden;	}	.ace_search_form.ace_nomatch {	outline: 1px solid red;	}	.ace_search_field {	background-color: white;	border-right: 1px solid #cbcbcb;	border: 0 none;	-webkit-box-sizing: border-box;	-moz-box-sizing: border-box;	box-sizing: border-box;	float: left;	height: 22px;	outline: 0;	padding: 0 7px;	width: 214px;	margin: 0;	}	.ace_searchbtn,	.ace_replacebtn {	background: #fff;	border: 0 none;	border-left: 1px solid #dcdcdc;	cursor: pointer;	float: left;	height: 22px;	margin: 0;	position: relative;	}	.ace_searchbtn:last-child,	.ace_replacebtn:last-child {	border-top-right-radius: 3px;	border-bottom-right-radius: 3px;	}	.ace_searchbtn:disabled {	background: none;	cursor: default;	}	.ace_searchbtn {	background-position: 50% 50%;	background-repeat: no-repeat;	width: 27px;	}	.ace_searchbtn.prev {	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNpiSU1NZUAC/6E0I0yACYskCpsJiySKIiY0SUZk40FyTEgCjGgKwTRAgAEAQJUIPCE+qfkAAAAASUVORK5CYII=);    	}	.ace_searchbtn.next {	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADRJREFUeNpiTE1NZQCC/0DMyIAKwGJMUAYDEo3M/s+EpvM/mkKwCQxYjIeLMaELoLMBAgwAU7UJObTKsvAAAAAASUVORK5CYII=);    	}	.ace_searchbtn_close {	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;	border-radius: 50%;	border: 0 none;	color: #656565;	cursor: pointer;	float: right;	font: 16px/16px Arial;	height: 14px;	margin: 5px 1px 9px 5px;	padding: 0;	text-align: center;	width: 14px;	}	.ace_searchbtn_close:hover {	background-color: #656565;	background-position: 50% 100%;	color: white;	}	.ace_replacebtn.prev {	width: 54px	}	.ace_replacebtn.next {	width: 27px	}	.ace_button {	margin-left: 2px;	cursor: pointer;	-webkit-user-select: none;	-moz-user-select: none;	-o-user-select: none;	-ms-user-select: none;	user-select: none;	overflow: hidden;	opacity: 0.7;	border: 1px solid rgba(100,100,100,0.23);	padding: 1px;	-moz-box-sizing: border-box;	box-sizing:    border-box;	color: black;	}	.ace_button:hover {	background-color: #eee;	opacity:1;	}	.ace_button:active {	background-color: #ddd;	}	.ace_button.checked {	border-color: #3399ff;	opacity:1;	}	.ace_search_options{	margin-bottom: 3px;	text-align: right;	-webkit-user-select: none;	-moz-user-select: none;	-o-user-select: none;	-ms-user-select: none;	user-select: none;	}", a = e("../keyboard/hash_handler").HashHandler, l = e("../lib/keys");
            n.importCssString(s, "ace_searchbox");
            var c = '<div class="ace_search right">	    <button type="button" action="hide" class="ace_searchbtn_close"></button>	    <div class="ace_search_form">	        <input class="ace_search_field" placeholder="Search for" spellcheck="false"></input>	        <button type="button" action="findNext" class="ace_searchbtn next"></button>	        <button type="button" action="findPrev" class="ace_searchbtn prev"></button>	        <button type="button" action="findAll" class="ace_searchbtn" title="Alt-Enter">All</button>	    </div>	    <div class="ace_replace_form">	        <input class="ace_search_field" placeholder="Replace with" spellcheck="false"></input>	        <button type="button" action="replaceAndFindNext" class="ace_replacebtn">Replace</button>	        <button type="button" action="replaceAll" class="ace_replacebtn">All</button>	    </div>	    <div class="ace_search_options">	        <span action="toggleRegexpMode" class="ace_button" title="RegExp Search">.*</span>	        <span action="toggleCaseSensitive" class="ace_button" title="CaseSensitive Search">Aa</span>	        <span action="toggleWholeWords" class="ace_button" title="Whole Word Search">\\b</span>	    </div>	</div>'.replace(/>\s+/g, ">"), h = function (e, t, i) {
                var r = n.createElement("div");
                r.innerHTML = c, this.element = r.firstChild, this.$init(), this.setEditor(e)
            };
            (function () {
                this.setEditor = function (e) {
                    e.searchBox = this, e.container.appendChild(this.element), this.editor = e
                }, this.$initElements = function (e) {
                    this.searchBox = e.querySelector(".ace_search_form"), this.replaceBox = e.querySelector(".ace_replace_form"), this.searchOptions = e.querySelector(".ace_search_options"), this.regExpOption = e.querySelector("[action=toggleRegexpMode]"), this.caseSensitiveOption = e.querySelector("[action=toggleCaseSensitive]"), this.wholeWordOption = e.querySelector("[action=toggleWholeWords]"), this.searchInput = this.searchBox.querySelector(".ace_search_field"), this.replaceInput = this.replaceBox.querySelector(".ace_search_field")
                }, this.$init = function () {
                    var e = this.element;
                    this.$initElements(e);
                    var t = this;
                    o.addListener(e, "mousedown", function (e) {
                        setTimeout(function () {
                            t.activeInput.focus()
                        }, 0), o.stopPropagation(e)
                    }), o.addListener(e, "click", function (e) {
                        var i = e.target || e.srcElement, n = i.getAttribute("action");
                        n && t[n] ? t[n]() : t.$searchBarKb.commands[n] && t.$searchBarKb.commands[n].exec(t), o.stopPropagation(e)
                    }), o.addCommandKeyListener(e, function (e, i, n) {
                        var r = l.keyCodeToString(n), s = t.$searchBarKb.findKeyCommand(i, r);
                        s && s.exec && (s.exec(t), o.stopEvent(e))
                    }), this.$onChange = r.delayedCall(function () {
                        t.find(!1, !1)
                    }), o.addListener(this.searchInput, "input", function () {
                        t.$onChange.schedule(20)
                    }), o.addListener(this.searchInput, "focus", function () {
                        t.activeInput = t.searchInput, t.searchInput.value && t.highlight()
                    }), o.addListener(this.replaceInput, "focus", function () {
                        t.activeInput = t.replaceInput, t.searchInput.value && t.highlight()
                    })
                }, this.$closeSearchBarKb = new a([{
                    bindKey: "Esc", name: "closeSearchBar", exec: function (e) {
                        e.searchBox.hide()
                    }
                }]), this.$searchBarKb = new a, this.$searchBarKb.bindKeys({
                    "Ctrl-f|Command-f": function (e) {
                        var t = e.isReplace = !e.isReplace;
                        e.replaceBox.style.display = t ? "" : "none", e.searchInput.focus()
                    }, "Ctrl-H|Command-Option-F": function (e) {
                        e.replaceBox.style.display = "", e.replaceInput.focus()
                    }, "Ctrl-G|Command-G": function (e) {
                        e.findNext()
                    }, "Ctrl-Shift-G|Command-Shift-G": function (e) {
                        e.findPrev()
                    }, esc: function (e) {
                        setTimeout(function () {
                            e.hide()
                        })
                    }, Return: function (e) {
                        e.activeInput == e.replaceInput && e.replace(), e.findNext()
                    }, "Shift-Return": function (e) {
                        e.activeInput == e.replaceInput && e.replace(), e.findPrev()
                    }, "Alt-Return": function (e) {
                        e.activeInput == e.replaceInput && e.replaceAll(), e.findAll()
                    }, Tab: function (e) {
                        (e.activeInput == e.replaceInput ? e.searchInput : e.replaceInput).focus()
                    }
                }), this.$searchBarKb.addCommands([{
                    name: "toggleRegexpMode",
                    bindKey: {win: "Alt-R|Alt-/", mac: "Ctrl-Alt-R|Ctrl-Alt-/"},
                    exec: function (e) {
                        e.regExpOption.checked = !e.regExpOption.checked, e.$syncOptions()
                    }
                }, {
                    name: "toggleCaseSensitive",
                    bindKey: {win: "Alt-C|Alt-I", mac: "Ctrl-Alt-R|Ctrl-Alt-I"},
                    exec: function (e) {
                        e.caseSensitiveOption.checked = !e.caseSensitiveOption.checked, e.$syncOptions()
                    }
                }, {
                    name: "toggleWholeWords",
                    bindKey: {win: "Alt-B|Alt-W", mac: "Ctrl-Alt-B|Ctrl-Alt-W"},
                    exec: function (e) {
                        e.wholeWordOption.checked = !e.wholeWordOption.checked, e.$syncOptions()
                    }
                }]), this.$syncOptions = function () {
                    n.setCssClass(this.regExpOption, "checked", this.regExpOption.checked), n.setCssClass(this.wholeWordOption, "checked", this.wholeWordOption.checked), n.setCssClass(this.caseSensitiveOption, "checked", this.caseSensitiveOption.checked), this.find(!1, !1)
                }, this.highlight = function (e) {
                    this.editor.session.highlight(e || this.editor.$search.$options.re), this.editor.renderer.updateBackMarkers()
                }, this.find = function (e, t, i) {
                    var r = this.editor.find(this.searchInput.value, {
                        skipCurrent: e,
                        backwards: t,
                        wrap: !0,
                        regExp: this.regExpOption.checked,
                        caseSensitive: this.caseSensitiveOption.checked,
                        wholeWord: this.wholeWordOption.checked,
                        preventScroll: i
                    }), o = !r && this.searchInput.value;
                    n.setCssClass(this.searchBox, "ace_nomatch", o), this.editor._emit("findSearchBox", {match: !o}), this.highlight()
                }, this.findNext = function () {
                    this.find(!0, !1)
                }, this.findPrev = function () {
                    this.find(!0, !0)
                }, this.findAll = function () {
                    var e = this.editor.findAll(this.searchInput.value, {
                        regExp: this.regExpOption.checked,
                        caseSensitive: this.caseSensitiveOption.checked,
                        wholeWord: this.wholeWordOption.checked
                    }), t = !e && this.searchInput.value;
                    n.setCssClass(this.searchBox, "ace_nomatch", t), this.editor._emit("findSearchBox", {match: !t}), this.highlight(), this.hide()
                }, this.replace = function () {
                    this.editor.getReadOnly() || this.editor.replace(this.replaceInput.value)
                }, this.replaceAndFindNext = function () {
                    this.editor.getReadOnly() || (this.editor.replace(this.replaceInput.value), this.findNext())
                }, this.replaceAll = function () {
                    this.editor.getReadOnly() || this.editor.replaceAll(this.replaceInput.value)
                }, this.hide = function () {
                    this.element.style.display = "none", this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb), this.editor.focus()
                }, this.show = function (e, t) {
                    this.element.style.display = "", this.replaceBox.style.display = t ? "" : "none", this.isReplace = t, e && (this.searchInput.value = e), this.find(!1, !1, !0), this.searchInput.focus(), this.searchInput.select(), this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb)
                }, this.isFocused = function () {
                    var e = document.activeElement;
                    return e == this.searchInput || e == this.replaceInput
                }
            }).call(h.prototype), t.SearchBox = h, t.Search = function (e, t) {
                var i = e.searchBox || new h(e);
                i.show(e.session.getTextRange(), t)
            }
        }), function () {
            ace.acequire(["ace/ext/searchbox"], function () {
            })
        }()
    }, function (e, t, i) {
        e.exports = {
            id: "http://json-schema.org/draft-04/schema#",
            $schema: "http://json-schema.org/draft-04/schema#",
            description: "Core schema meta-schema",
            definitions: {
                schemaArray: {type: "array", minItems: 1, items: {$ref: "#"}},
                positiveInteger: {type: "integer", minimum: 0},
                positiveIntegerDefault0: {allOf: [{$ref: "#/definitions/positiveInteger"}, {"default": 0}]},
                simpleTypes: {"enum": ["array", "boolean", "integer", "null", "number", "object", "string"]},
                stringArray: {type: "array", items: {type: "string"}, minItems: 1, uniqueItems: !0}
            },
            type: "object",
            properties: {
                id: {type: "string", format: "uri"},
                $schema: {type: "string", format: "uri"},
                title: {type: "string"},
                description: {type: "string"},
                "default": {},
                multipleOf: {type: "number", minimum: 0, exclusiveMinimum: !0},
                maximum: {type: "number"},
                exclusiveMaximum: {type: "boolean", "default": !1},
                minimum: {type: "number"},
                exclusiveMinimum: {type: "boolean", "default": !1},
                maxLength: {$ref: "#/definitions/positiveInteger"},
                minLength: {$ref: "#/definitions/positiveIntegerDefault0"},
                pattern: {type: "string", format: "regex"},
                additionalItems: {anyOf: [{type: "boolean"}, {$ref: "#"}], "default": {}},
                items: {anyOf: [{$ref: "#"}, {$ref: "#/definitions/schemaArray"}], "default": {}},
                maxItems: {$ref: "#/definitions/positiveInteger"},
                minItems: {$ref: "#/definitions/positiveIntegerDefault0"},
                uniqueItems: {type: "boolean", "default": !1},
                maxProperties: {$ref: "#/definitions/positiveInteger"},
                minProperties: {$ref: "#/definitions/positiveIntegerDefault0"},
                required: {$ref: "#/definitions/stringArray"},
                additionalProperties: {anyOf: [{type: "boolean"}, {$ref: "#"}], "default": {}},
                definitions: {type: "object", additionalProperties: {$ref: "#"}, "default": {}},
                properties: {type: "object", additionalProperties: {$ref: "#"}, "default": {}},
                patternProperties: {type: "object", additionalProperties: {$ref: "#"}, "default": {}},
                dependencies: {
                    type: "object",
                    additionalProperties: {anyOf: [{$ref: "#"}, {$ref: "#/definitions/stringArray"}]}
                },
                "enum": {type: "array", minItems: 1, uniqueItems: !0},
                type: {
                    anyOf: [{$ref: "#/definitions/simpleTypes"}, {
                        type: "array",
                        items: {$ref: "#/definitions/simpleTypes"},
                        minItems: 1,
                        uniqueItems: !0
                    }]
                },
                allOf: {$ref: "#/definitions/schemaArray"},
                anyOf: {$ref: "#/definitions/schemaArray"},
                oneOf: {$ref: "#/definitions/schemaArray"},
                not: {$ref: "#"}
            },
            dependencies: {exclusiveMaximum: ["maximum"], exclusiveMinimum: ["minimum"]},
            "default": {}
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function n(e, t) {
            if (e === t)return !0;
            var i, r = Array.isArray(e), o = Array.isArray(t);
            if (r && o) {
                if (e.length != t.length)return !1;
                for (i = 0; i < e.length; i++)if (!n(e[i], t[i]))return !1;
                return !0
            }
            if (r != o)return !1;
            if (e && t && "object" == typeof e && "object" == typeof t) {
                var s = Object.keys(e);
                if (s.length !== Object.keys(t).length)return !1;
                for (i = 0; i < s.length; i++)if (void 0 === t[s[i]])return !1;
                for (i = 0; i < s.length; i++)if (!n(e[s[i]], t[s[i]]))return !1;
                return !0
            }
            return !1
        }
    }, function (e, t, i) {
        "use strict";
        function n(e, t) {
            t = t || {};
            for (var i in e)t[i] = e[i];
            return t
        }

        function r(e, t, i) {
            var n = i ? " !== " : " === ", r = i ? " || " : " && ", o = i ? "!" : "", s = i ? "" : "!";
            switch (e) {
                case"null":
                    return t + n + "null";
                case"array":
                    return o + "Array.isArray(" + t + ")";
                case"object":
                    return "(" + o + t + r + "typeof " + t + n + '"object"' + r + s + "Array.isArray(" + t + "))";
                case"integer":
                    return "(typeof " + t + n + '"number"' + r + s + "(" + t + " % 1))";
                default:
                    return "typeof " + t + n + '"' + e + '"'
            }
        }

        function o(e, t) {
            switch (e.length) {
                case 1:
                    return r(e[0], t, !0);
                default:
                    var i = "", n = s(e);
                    n.array && n.object && (i = n["null"] ? "(" : "(!" + t + " || ", i += "typeof " + t + ' !== "object")', delete n["null"], delete n.array, delete n.object), n.number && delete n.integer;
                    for (var o in n)i += (i ? " && " : "") + r(o, t, !0);
                    return i
            }
        }

        function s(e) {
            for (var t = {}, i = 0; i < e.length; i++)t[e[i]] = !0;
            return t
        }

        function a(e) {
            return "number" == typeof e ? "[" + e + "]" : F.test(e) ? "." + e : "['" + e.replace(x, "\\$&") + "']"
        }

        function l(e) {
            return e.replace(x, "\\$&")
        }

        function c(e) {
            for (var t, i = 0, n = e.length, r = 0; n > r;)i++, t = e.charCodeAt(r++), t >= 55296 && 56319 >= t && n > r && (t = e.charCodeAt(r), 56320 == (64512 & t) && r++);
            return i
        }

        function h(e, t) {
            t += "[^0-9]";
            var i = e.match(new RegExp(t, "g"));
            return i ? i.length : 0
        }

        function d(e, t, i) {
            return t += "([^0-9])", i = i.replace(/\$/g, "$$$$"), e.replace(new RegExp(t, "g"), i + "$1")
        }

        function u(e) {
            return e.replace(S, "").replace($, "").replace(D, "if (!($1))")
        }

        function f(e) {
            var t = e.match(k);
            return t && 2 === t.length ? e.replace(B, "").replace(_, L) : e
        }

        function p(e, t) {
            for (var i in e)if (t[i])return !0
        }

        function m(e) {
            return "'" + l(e) + "'"
        }

        function g(e, t, i, n) {
            var r = i ? "'/' + " + t + (n ? "" : ".replace(/~/g, '~0').replace(/\\//g, '~1')") : n ? "'[' + " + t + " + ']'" : "'[\\'' + " + t + " + '\\']'";
            return y(e, r)
        }

        function v(e, t, i) {
            var n = m(i ? "/" + C(t) : a(t));
            return y(e, n)
        }

        function w(e, t, i) {
            var n = e.match(R);
            if (!n)throw new Error("Invalid relative JSON-pointer: " + e);
            var r = +n[1], o = n[2];
            if ("#" == o) {
                if (r >= t)throw new Error("Cannot access property/index " + r + " levels up, current level is " + t);
                return i[t - r]
            }
            if (r > t)throw new Error("Cannot access data " + r + " levels up, current level is " + t);
            for (var s = "data" + (t - r || ""), l = s, c = o.split("/"), h = 0; h < c.length; h++) {
                var d = c[h];
                d && (s += a(b(d)), l += " && " + s)
            }
            return l
        }

        function y(e, t) {
            return '""' == e ? t : (e + " + " + t).replace(/' \+ '/g, "")
        }

        function A(e) {
            return b(decodeURIComponent(e))
        }

        function E(e) {
            return encodeURIComponent(C(e))
        }

        function C(e) {
            return e.replace(/~/g, "~0").replace(/\//g, "~1")
        }

        function b(e) {
            return e.replace(/~1/g, "/").replace(/~0/g, "~")
        }

        e.exports = {
            copy: n,
            checkDataType: r,
            checkDataTypes: o,
            toHash: s,
            getProperty: a,
            escapeQuotes: l,
            ucs2length: c,
            varOccurences: h,
            varReplace: d,
            cleanUpCode: u,
            cleanUpVarErrors: f,
            schemaHasRules: p,
            stableStringify: i(24),
            toQuotedString: m,
            getPathExpr: g,
            getPath: v,
            getData: w,
            unescapeFragment: A,
            escapeFragment: E,
            escapeJsonPointer: C
        };
        var F = /^[a-z$_][a-z$_0-9]*$/i, x = /'|\\/g, S = /else\s*{\s*}/g, $ = /if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g, D = /if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g, k = /[^v\.]errors/g, B = /var errors = 0;|var vErrors = null;|validate.errors = vErrors;/g, _ = "return errors === 0;", L = "validate.errors = null; return true;", R = /^([0-9]+)((?:[^0-9]|~0|~1)*)$/
    }, function (e, t, i) {
        "use strict";
        e.exports = {
            $ref: i(39),
            allOf: i(40),
            anyOf: i(41),
            dependencies: i(42),
            "enum": i(43),
            format: i(44),
            items: i(45),
            maximum: i(46),
            minimum: i(46),
            maxItems: i(47),
            minItems: i(47),
            maxLength: i(48),
            minLength: i(48),
            maxProperties: i(49),
            minProperties: i(49),
            multipleOf: i(50),
            not: i(51),
            oneOf: i(52),
            pattern: i(53),
            properties: i(54),
            required: i(55),
            uniqueItems: i(56),
            validate: i(36)
        }
    }, function (e, t, i) {
        e.exports = {
            id: "https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/json-schema-v5.json#",
            $schema: "http://json-schema.org/draft-04/schema#",
            description: "Core schema meta-schema (v5 proposals)",
            definitions: {
                schemaArray: {type: "array", minItems: 1, items: {$ref: "#"}},
                positiveInteger: {type: "integer", minimum: 0},
                positiveIntegerDefault0: {allOf: [{$ref: "#/definitions/positiveInteger"}, {"default": 0}]},
                simpleTypes: {"enum": ["array", "boolean", "integer", "null", "number", "object", "string"]},
                stringArray: {type: "array", items: {type: "string"}, minItems: 1, uniqueItems: !0},
                $data: {
                    type: "object",
                    required: ["$data"],
                    properties: {$data: {type: "string", format: "relative-json-pointer"}},
                    additionalProperties: !1
                }
            },
            type: "object",
            properties: {
                id: {type: "string", format: "uri"},
                $schema: {type: "string", format: "uri"},
                title: {type: "string"},
                description: {type: "string"},
                "default": {},
                multipleOf: {
                    anyOf: [{
                        type: "number",
                        minimum: 0,
                        exclusiveMinimum: !0
                    }, {$ref: "#/definitions/$data"}]
                },
                maximum: {anyOf: [{type: "number"}, {$ref: "#/definitions/$data"}]},
                exclusiveMaximum: {anyOf: [{type: "boolean", "default": !1}, {$ref: "#/definitions/$data"}]},
                minimum: {anyOf: [{type: "number"}, {$ref: "#/definitions/$data"}]},
                exclusiveMinimum: {anyOf: [{type: "boolean", "default": !1}, {$ref: "#/definitions/$data"}]},
                maxLength: {anyOf: [{$ref: "#/definitions/positiveInteger"}, {$ref: "#/definitions/$data"}]},
                minLength: {anyOf: [{$ref: "#/definitions/positiveIntegerDefault0"}, {$ref: "#/definitions/$data"}]},
                pattern: {anyOf: [{type: "string", format: "regex"}, {$ref: "#/definitions/$data"}]},
                additionalItems: {
                    anyOf: [{type: "boolean"}, {$ref: "#"}, {$ref: "#/definitions/$data"}],
                    "default": {}
                },
                items: {anyOf: [{$ref: "#"}, {$ref: "#/definitions/schemaArray"}], "default": {}},
                maxItems: {anyOf: [{$ref: "#/definitions/positiveInteger"}, {$ref: "#/definitions/$data"}]},
                minItems: {anyOf: [{$ref: "#/definitions/positiveIntegerDefault0"}, {$ref: "#/definitions/$data"}]},
                uniqueItems: {anyOf: [{type: "boolean", "default": !1}, {$ref: "#/definitions/$data"}]},
                maxProperties: {anyOf: [{$ref: "#/definitions/positiveInteger"}, {$ref: "#/definitions/$data"}]},
                minProperties: {anyOf: [{$ref: "#/definitions/positiveIntegerDefault0"}, {$ref: "#/definitions/$data"}]},
                required: {anyOf: [{$ref: "#/definitions/stringArray"}, {$ref: "#/definitions/$data"}]},
                additionalProperties: {
                    anyOf: [{type: "boolean"}, {$ref: "#"}, {$ref: "#/definitions/$data"}],
                    "default": {}
                },
                definitions: {type: "object", additionalProperties: {$ref: "#"}, "default": {}},
                properties: {type: "object", additionalProperties: {$ref: "#"}, "default": {}},
                patternProperties: {type: "object", additionalProperties: {$ref: "#"}, "default": {}},
                dependencies: {
                    type: "object",
                    additionalProperties: {anyOf: [{$ref: "#"}, {$ref: "#/definitions/stringArray"}]}
                },
                "enum": {anyOf: [{type: "array", minItems: 1, uniqueItems: !0}, {$ref: "#/definitions/$data"}]},
                type: {
                    anyOf: [{$ref: "#/definitions/simpleTypes"}, {
                        type: "array",
                        items: {$ref: "#/definitions/simpleTypes"},
                        minItems: 1,
                        uniqueItems: !0
                    }]
                },
                allOf: {$ref: "#/definitions/schemaArray"},
                anyOf: {$ref: "#/definitions/schemaArray"},
                oneOf: {$ref: "#/definitions/schemaArray"},
                not: {$ref: "#"},
                format: {anyOf: [{type: "string"}, {$ref: "#/definitions/$data"}]},
                formatMaximum: {anyOf: [{type: "string"}, {$ref: "#/definitions/$data"}]},
                formatMinimum: {anyOf: [{type: "string"}, {$ref: "#/definitions/$data"}]},
                exclusiveFormatMaximum: {anyOf: [{type: "boolean", "default": !1}, {$ref: "#/definitions/$data"}]},
                exclusiveFormatMinimum: {anyOf: [{type: "boolean", "default": !1}, {$ref: "#/definitions/$data"}]},
                constant: {anyOf: [{}, {$ref: "#/definitions/$data"}]},
                contains: {$ref: "#"},
                patternGroups: {
                    type: "object",
                    additionalProperties: {
                        type: "object",
                        required: ["schema"],
                        properties: {
                            maximum: {anyOf: [{$ref: "#/definitions/positiveInteger"}, {$ref: "#/definitions/$data"}]},
                            minimum: {anyOf: [{$ref: "#/definitions/positiveIntegerDefault0"}, {$ref: "#/definitions/$data"}]},
                            schema: {$ref: "#"}
                        },
                        additionalProperties: !1
                    },
                    "default": {}
                },
                "switch": {
                    type: "array",
                    items: {
                        required: ["then"],
                        properties: {
                            "if": {$ref: "#"},
                            then: {anyOf: [{type: "boolean"}, {$ref: "#"}]},
                            "continue": {type: "boolean"}
                        },
                        additionalProperties: !1,
                        dependencies: {"continue": ["if"]}
                    }
                }
            },
            dependencies: {
                exclusiveMaximum: ["maximum"],
                exclusiveMinimum: ["minimum"],
                formatMaximum: ["format"],
                formatMinimum: ["format"],
                exclusiveFormatMaximum: ["formatMaximum"],
                exclusiveFormatMinimum: ["formatMinimum"]
            },
            "default": {}
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = e.opts.v5 && s.$data, f = u ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            u && (n += " var schema" + r + " = " + f + "; ", f = "schema" + r), u || (n += " var schema" + r + " = validate.schema" + a + ";"), n += "var " + d + " = equal(" + h + ", schema" + r + "); if (!" + d + ") {   ";
            var p = p || [];
            p.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "constant") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: 'should be equal to constant' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var m = n;
            return n = p.pop(), n += !e.compositeRule && c ? " validate.errors = [" + m + "]; return false; " : " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " }"
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r;
            if (n += "var " + d + " = undefined;", e.opts.format === !1)return n += " " + d + " = true; ";
            var u = e.schema.format, f = e.opts.v5 && u.$data, p = "";
            if (f) {
                var m = e.util.getData(u.$data, o, e.dataPathArr), g = "format" + r, v = "compare" + r;
                n += " var " + g + " = formats[" + m + "] , " + v + " = " + g + " && " + g + ".compare;"
            } else {
                var g = e.formats[u];
                if (!g || !g.compare)return n += "  " + d + " = true; ";
                var v = "formats" + e.util.getProperty(u) + ".compare"
            }
            var w = "formatMaximum" == t, y = "exclusiveFormat" + (w ? "Maximum" : "Minimum"), A = e.schema[y], E = e.opts.v5 && A && A.$data, C = w ? "<" : ">", b = "result" + r, F = e.opts.v5 && s.$data, x = F ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            if (F && (n += " var schema" + r + " = " + x + "; ", x = "schema" + r), E) {
                var S = e.util.getData(A.$data, o, e.dataPathArr), $ = "exclusive" + r, D = "op" + r, k = "' + " + D + " + '";
                n += " var schemaExcl" + r + " = " + S + "; ", S = "schemaExcl" + r, n += " if (typeof " + S + " != 'boolean' && " + S + " !== undefined) { " + d + " = false; ";
                var i = y, B = B || [];
                B.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "_exclusiveFormatLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: '" + y + " should be boolean' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                var _ = n;
                n = B.pop(), n += !e.compositeRule && c ? " validate.errors = [" + _ + "]; return false; " : " var err = " + _ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " }  ", c && (p += "}", n += " else { "), F && (n += " if (" + x + " === undefined) " + d + " = true; else if (typeof " + x + " != 'string') " + d + " = false; else { ", p += "}"), f && (n += " if (!" + v + ") " + d + " = true; else { ", p += "}"), n += " var " + b + " = " + v + "(" + h + ",  ", n += F ? "" + x : "" + e.util.toQuotedString(s), n += " ); if (" + b + " === undefined) " + d + " = false; var exclusive" + r + " = " + S + " === true; if (" + d + " === undefined) { " + d + " = exclusive" + r + " ? " + b + " " + C + " 0 : " + b + " " + C + "= 0; } if (!" + d + ") var op" + r + " = exclusive" + r + " ? '" + C + "' : '" + C + "=';"
            } else {
                var $ = A === !0, k = C;
                $ || (k += "=");
                var D = "'" + k + "'";
                F && (n += " if (" + x + " === undefined) " + d + " = true; else if (typeof " + x + " != 'string') " + d + " = false; else { ", p += "}"), f && (n += " if (!" + v + ") " + d + " = true; else { ", p += "}"), n += " var " + b + " = " + v + "(" + h + ",  ", n += F ? "" + x : "" + e.util.toQuotedString(s), n += " ); if (" + b + " === undefined) " + d + " = false; if (" + d + " === undefined) " + d + " = " + b + " " + C, $ || (n += "="), n += " 0;"
            }
            n += "" + p + "if (!" + d + ") { ";
            var i = t, B = B || [];
            B.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "_formatLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { limit:  ', n += F ? "" + x : "" + e.util.toQuotedString(s), n += "  } ", e.opts.messages !== !1 && (n += " , message: 'should be " + k + ' "', n += F ? "' + " + x + " + '" : "" + e.util.escapeQuotes(s), n += "\"' "), e.opts.verbose && (n += " , schema:  ", n += F ? "validate.schema" + a : "" + e.util.toQuotedString(s), n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var _ = n;
            return n = B.pop(), n += !e.compositeRule && c ? " validate.errors = [" + _ + "]; return false; " : " var err = " + _ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += "}"
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = "errs__" + r, f = e.util.copy(e), p = "";
            f.level++;
            var m, g = "ifPassed" + e.level;
            n += "var " + g + ";";
            var v = s;
            if (v)for (var w, y = -1, A = v.length - 1; A > y;) {
                if (w = v[y += 1], y && !m && (n += " if (!" + g + ") { ", p += "}"), w["if"] && e.util.schemaHasRules(w["if"], e.RULES.all)) {
                    n += " var " + u + " = errors;   ";
                    var E = e.compositeRule;
                    if (e.compositeRule = f.compositeRule = !0, f.createErrors = !1, f.schema = w["if"], f.schemaPath = a + "[" + y + "].if", f.errSchemaPath = l + "/" + y + "/if", n += " " + e.validate(f) + " ", f.createErrors = !0, e.compositeRule = f.compositeRule = E, n += " " + g + " = valid" + f.level + "; if (" + g + ") {  ", "boolean" == typeof w.then) {
                        if (w.then === !1) {
                            var C = C || [];
                            C.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "switch") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { caseIndex: ' + y + " } ", e.opts.messages !== !1 && (n += " , message: 'should pass \"switch\" keyword validation' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                            var b = n;
                            n = C.pop(), n += !e.compositeRule && c ? " validate.errors = [" + b + "]; return false; " : " var err = " + b + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "
                        }
                        n += " var valid" + f.level + " = " + w.then + "; "
                    } else f.schema = w.then, f.schemaPath = a + "[" + y + "].then", f.errSchemaPath = l + "/" + y + "/then", n += " " + e.validate(f) + " ";
                    n += "  } else {  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; } } "
                } else if (n += " " + g + " = true;  ", "boolean" == typeof w.then) {
                    if (w.then === !1) {
                        var C = C || [];
                        C.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "switch") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { caseIndex: ' + y + " } ", e.opts.messages !== !1 && (n += " , message: 'should pass \"switch\" keyword validation' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                        var b = n;
                        n = C.pop(), n += !e.compositeRule && c ? " validate.errors = [" + b + "]; return false; " : " var err = " + b + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "
                    }
                    n += " var valid" + f.level + " = " + w.then + "; "
                } else f.schema = w.then, f.schemaPath = a + "[" + y + "].then", f.errSchemaPath = l + "/" + y + "/then", n += " " + e.validate(f) + " ";
                m = w["continue"]
            }
            return n += "" + p + "var " + d + " = valid" + f.level + "; ", n = e.util.cleanUpCode(n)
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            function i(e) {
                for (var t = 0; t < e.rules.length; t++)if (n(e.rules[t]))return !0
            }

            function n(t) {
                return void 0 !== e.schema[t.keyword] || "properties" == t.keyword && (e.schema.additionalProperties === !1 || "object" == typeof e.schema.additionalProperties || e.schema.patternProperties && Object.keys(e.schema.patternProperties).length || e.opts.v5 && e.schema.patternGroups && Object.keys(e.schema.patternGroups).length)
            }

            var r = "";
            if (e.isTop) {
                var o = e.isTop, s = e.level = 0, a = e.dataLevel = 0, l = "data";
                e.rootId = e.resolve.fullPath(e.root.schema.id), e.baseId = e.baseId || e.rootId, delete e.isTop, e.opts.v5 && (e.dataPathArr = [void 0]), r += " validate = function (data, dataPath) { 'use strict'; var vErrors = null; ", r += " var errors = 0;     "
            } else {
                var s = e.level, a = e.dataLevel, l = "data" + (a || "");
                e.schema.id && (e.baseId = e.resolve.url(e.baseId, e.schema.id)), r += " var errs_" + s + " = errors;"
            }
            var c, h = "valid" + s, d = !e.opts.allErrors, u = "", f = "", p = e.schema.type, m = e.RULES;
            if (m)for (var g, v = -1, w = m.length - 1; w > v;)if (g = m[v += 1], i(g)) {
                if (g.type && (r += " if (" + e.util.checkDataType(g.type, l) + ") { "), e.opts.useDefaults && !e.compositeRule)if ("object" == g.type && e.schema.properties) {
                    var y = e.schema.properties, A = Object.keys(y), E = A;
                    if (E)for (var C, b = -1, F = E.length - 1; F > b;) {
                        C = E[b += 1];
                        var x = y[C];
                        if (void 0 !== x["default"]) {
                            var S = l + e.util.getProperty(C);
                            r += "  if (" + S + " === undefined) " + S + " = " + e.useDefault(x["default"]) + "; "
                        }
                    }
                } else if ("array" == g.type && Array.isArray(e.schema.items)) {
                    var $ = e.schema.items;
                    if ($)for (var x, D = -1, k = $.length - 1; k > D;)if (x = $[D += 1], void 0 !== x["default"]) {
                        var S = l + "[" + D + "]";
                        r += "  if (" + S + " === undefined) " + S + " = " + e.useDefault(x["default"]) + "; "
                    }
                }
                var B = g.rules;
                if (B)for (var _, L = -1, R = B.length - 1; R > L;)if (_ = B[L += 1], n(_)) {
                    if (_.custom) {
                        var y = e.schema[_.keyword], T = e.useCustomRule(_, y, e.schema, e), M = T.code + ".errors", P = e.schemaPath + "." + _.keyword, O = e.errSchemaPath + "/" + _.keyword, N = "errs" + s, D = "i" + s, I = "ruleErr" + s, j = _.definition, W = j.inline, H = j.macro;
                        if (W || H || (r += "" + M + " = null;"), r += "var " + N + " = errors;", W && j.statements)r += " " + T.validate; else if (H) {
                            var V = e.util.copy(e);
                            V.level++, V.schema = T.validate, V.schemaPath = "";
                            var z = e.compositeRule;
                            e.compositeRule = V.compositeRule = !0;
                            var U = e.validate(V).replace(/validate\.schema/g, T.code);
                            e.compositeRule = V.compositeRule = z, r += " " + U
                        }
                        r += "if (! ", W ? r += j.statements ? " valid" + s + " " : " (" + T.validate + ") " : H ? r += " valid" + V.level + " " : (r += " " + T.code + ".call(self ", j.compile ? r += " , " + l + " " : (r += " , validate.schema" + P + " , " + l + " ", T.validate.length > 2 && (r += " , validate.schema" + e.schemaPath + " ")), r += " ) "), r += ") { ", c = _.keyword;
                        var K = K || [];
                        K.push(r), r = "";
                        var K = K || [];
                        K.push(r), r = "", e.createErrors !== !1 ? (r += " { keyword: '" + (c || "custom") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + O + "\" , params: { keyword: '" + _.keyword + "' } ", e.opts.messages !== !1 && (r += " , message: 'should pass \"" + _.keyword + "\" keyword validation' "), e.opts.verbose && (r += " , schema: validate.schema" + P + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + l + " "), r += " } ") : r += " {} ";
                        var q = r;
                        r = K.pop(), r += !e.compositeRule && d ? " validate.errors = [" + q + "]; return false; " : " var err = " + q + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                        var G = r;
                        r = K.pop(), W ? j.errors ? "full" != j.errors && (r += "  for (var " + D + "=" + N + "; " + D + "<errors; " + D + "++) { var " + I + " = vErrors[" + D + "]; if (" + I + ".dataPath === undefined) { " + I + ".dataPath = (dataPath || '') + " + e.errorPath + "; } ", e.opts.verbose && (r += " " + I + ".schema = validate.schema" + P + "; " + I + ".data = " + l + "; "), r += " } ") : j.errors === !1 ? r += " " + G + " " : (r += " if (" + N + " == errors) { " + G + " } else {  for (var " + D + "=" + N + "; " + D + "<errors; " + D + "++) { var " + I + " = vErrors[" + D + "]; if (" + I + ".dataPath === undefined) { " + I + ".dataPath = (dataPath || '') + " + e.errorPath + "; } ", e.opts.verbose && (r += " " + I + ".schema = validate.schema" + P + "; " + I + ".data = " + l + "; "), r += " } } ") : H ? (r += "   var err =   ", e.createErrors !== !1 ? (r += " { keyword: '" + (c || "custom") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + O + "\" , params: { keyword: '" + _.keyword + "' } ", e.opts.messages !== !1 && (r += " , message: 'should pass \"" + _.keyword + "\" keyword validation' "), e.opts.verbose && (r += " , schema: validate.schema" + P + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + l + " "), r += " } ") : r += " {} ", r += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !e.compositeRule && d && (r += " validate.errors = vErrors; return false ")) : (r += " if (Array.isArray(" + M + ")) { if (vErrors === null) vErrors = " + M + "; else vErrors.concat(" + M + "); errors = vErrors.length;  for (var " + D + "=" + N + "; " + D + "<errors; " + D + "++) { var " + I + " = vErrors[" + D + "];  " + I + ".dataPath = (dataPath || '') + " + e.errorPath + ";  ", e.opts.verbose && (r += " " + I + ".schema = validate.schema" + P + "; " + I + ".data = " + l + "; "), r += " } } else { " + G + " } "), c = void 0, r += " } ", d && (r += " else { ")
                    } else r += " " + _.code(e, _.keyword) + " ";
                    d && (u += "}")
                }
                if (d && (r += " " + u + " ", u = ""), g.type && (r += " } ", p && p === g.type)) {
                    var J = !0;
                    r += " else { ";
                    var P = e.schemaPath + ".type", O = e.errSchemaPath + "/type", K = K || [];
                    K.push(r), r = "", e.createErrors !== !1 ? (r += " { keyword: '" + (c || "type") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + O + "\" , params: { type: '", r += Q ? "" + p.join(",") : "" + p, r += "' } ", e.opts.messages !== !1 && (r += " , message: 'should be ", r += Q ? "" + p.join(",") : "" + p, r += "' "), e.opts.verbose && (r += " , schema: validate.schema" + P + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + l + " "), r += " } ") : r += " {} ";
                    var q = r;
                    r = K.pop(), r += !e.compositeRule && d ? " validate.errors = [" + q + "]; return false; " : " var err = " + q + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", r += " } "
                }
                d && (r += " if (errors === ", r += o ? "0" : "errs_" + s, r += ") { ", f += "}")
            }
            if (p && !J) {
                var P = e.schemaPath + ".type", O = e.errSchemaPath + "/type", Q = Array.isArray(p), Y = Q ? "checkDataTypes" : "checkDataType";
                r += " if (" + e.util[Y](p, l, !0) + ") {   ";
                var K = K || [];
                K.push(r), r = "", e.createErrors !== !1 ? (r += " { keyword: '" + (c || "type") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + O + "\" , params: { type: '", r += Q ? "" + p.join(",") : "" + p, r += "' } ", e.opts.messages !== !1 && (r += " , message: 'should be ", r += Q ? "" + p.join(",") : "" + p, r += "' "), e.opts.verbose && (r += " , schema: validate.schema" + P + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + l + " "), r += " } ") : r += " {} ";
                var q = r;
                r = K.pop(), r += !e.compositeRule && d ? " validate.errors = [" + q + "]; return false; " : " var err = " + q + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", r += " }"
            }
            return d && (r += " " + f + " "), o ? (r += " validate.errors = vErrors; ", r += " return errors === 0;       ", r += " }") : r += " var " + h + " = errors === errs_" + s + ";", r = e.util.cleanUpCode(r), o && d && (r = e.util.cleanUpVarErrors(r)), r
        }
    }, function (e, t, i) {
        function n() {
            this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
        }

        function r(e, t, i) {
            if (e && c(e) && e instanceof n)return e;
            var r = new n;
            return r.parse(e, t, i), r
        }

        function o(e) {
            return l(e) && (e = r(e)), e instanceof n ? e.format() : n.prototype.format.call(e)
        }

        function s(e, t) {
            return r(e, !1, !0).resolve(t)
        }

        function a(e, t) {
            return e ? r(e, !1, !0).resolveObject(t) : t
        }

        function l(e) {
            return "string" == typeof e
        }

        function c(e) {
            return "object" == typeof e && null !== e
        }

        function h(e) {
            return null === e
        }

        function d(e) {
            return null == e
        }

        var u = i(60);
        t.parse = r, t.resolve = s, t.resolveObject = a, t.format = o, t.Url = n;
        var f = /^([a-z0-9.+-]+:)/i, p = /:[0-9]*$/, m = ["<", ">", '"', "`", " ", "\r", "\n", "	"], g = ["{", "}", "|", "\\", "^", "`"].concat(m), v = ["'"].concat(g), w = ["%", "/", "?", ";", "#"].concat(v), y = ["/", "?", "#"], A = 255, E = /^[a-z0-9A-Z_-]{0,63}$/, C = /^([a-z0-9A-Z_-]{0,63})(.*)$/, b = {
            javascript: !0,
            "javascript:": !0
        }, F = {javascript: !0, "javascript:": !0}, x = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        }, S = i(63);
        n.prototype.parse = function (e, t, i) {
            if (!l(e))throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
            var n = e;
            n = n.trim();
            var r = f.exec(n);
            if (r) {
                r = r[0];
                var o = r.toLowerCase();
                this.protocol = o, n = n.substr(r.length)
            }
            if (i || r || n.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var s = "//" === n.substr(0, 2);
                !s || r && F[r] || (n = n.substr(2), this.slashes = !0)
            }
            if (!F[r] && (s || r && !x[r])) {
                for (var a = -1, c = 0; c < y.length; c++) {
                    var h = n.indexOf(y[c]);
                    -1 !== h && (-1 === a || a > h) && (a = h)
                }
                var d, p;
                p = -1 === a ? n.lastIndexOf("@") : n.lastIndexOf("@", a), -1 !== p && (d = n.slice(0, p), n = n.slice(p + 1), this.auth = decodeURIComponent(d)), a = -1;
                for (var c = 0; c < w.length; c++) {
                    var h = n.indexOf(w[c]);
                    -1 !== h && (-1 === a || a > h) && (a = h)
                }
                -1 === a && (a = n.length), this.host = n.slice(0, a), n = n.slice(a), this.parseHost(), this.hostname = this.hostname || "";
                var m = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                if (!m)for (var g = this.hostname.split(/\./), c = 0, $ = g.length; $ > c; c++) {
                    var D = g[c];
                    if (D && !D.match(E)) {
                        for (var k = "", B = 0, _ = D.length; _ > B; B++)k += D.charCodeAt(B) > 127 ? "x" : D[B];
                        if (!k.match(E)) {
                            var L = g.slice(0, c), R = g.slice(c + 1), T = D.match(C);
                            T && (L.push(T[1]), R.unshift(T[2])), R.length && (n = "/" + R.join(".") + n), this.hostname = L.join(".");
                            break
                        }
                    }
                }
                if (this.hostname.length > A ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !m) {
                    for (var M = this.hostname.split("."), P = [], c = 0; c < M.length; ++c) {
                        var O = M[c];
                        P.push(O.match(/[^A-Za-z0-9_-]/) ? "xn--" + u.encode(O) : O)
                    }
                    this.hostname = P.join(".")
                }
                var N = this.port ? ":" + this.port : "", I = this.hostname || "";
                this.host = I + N, this.href += this.host, m && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== n[0] && (n = "/" + n))
            }
            if (!b[o])for (var c = 0, $ = v.length; $ > c; c++) {
                var j = v[c], W = encodeURIComponent(j);
                W === j && (W = escape(j)), n = n.split(j).join(W)
            }
            var H = n.indexOf("#");
            -1 !== H && (this.hash = n.substr(H), n = n.slice(0, H));
            var V = n.indexOf("?");
            if (-1 !== V ? (this.search = n.substr(V), this.query = n.substr(V + 1), t && (this.query = S.parse(this.query)), n = n.slice(0, V)) : t && (this.search = "", this.query = {}), n && (this.pathname = n), x[o] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                var N = this.pathname || "", O = this.search || "";
                this.path = N + O
            }
            return this.href = this.format(), this
        }, n.prototype.format = function () {
            var e = this.auth || "";
            e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");
            var t = this.protocol || "", i = this.pathname || "", n = this.hash || "", r = !1, o = "";
            this.host ? r = e + this.host : this.hostname && (r = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (r += ":" + this.port)), this.query && c(this.query) && Object.keys(this.query).length && (o = S.stringify(this.query));
            var s = this.search || o && "?" + o || "";
            return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || x[t]) && r !== !1 ? (r = "//" + (r || ""), i && "/" !== i.charAt(0) && (i = "/" + i)) : r || (r = ""), n && "#" !== n.charAt(0) && (n = "#" + n), s && "?" !== s.charAt(0) && (s = "?" + s), i = i.replace(/[?#]/g, function (e) {
                return encodeURIComponent(e)
            }), s = s.replace("#", "%23"), t + r + i + s + n
        }, n.prototype.resolve = function (e) {
            return this.resolveObject(r(e, !1, !0)).format()
        }, n.prototype.resolveObject = function (e) {
            if (l(e)) {
                var t = new n;
                t.parse(e, !1, !0), e = t
            }
            var i = new n;
            if (Object.keys(this).forEach(function (e) {
                    i[e] = this[e]
                }, this), i.hash = e.hash, "" === e.href)return i.href = i.format(), i;
            if (e.slashes && !e.protocol)return Object.keys(e).forEach(function (t) {
                "protocol" !== t && (i[t] = e[t])
            }), x[i.protocol] && i.hostname && !i.pathname && (i.path = i.pathname = "/"), i.href = i.format(), i;
            if (e.protocol && e.protocol !== i.protocol) {
                if (!x[e.protocol])return Object.keys(e).forEach(function (t) {
                    i[t] = e[t]
                }), i.href = i.format(), i;
                if (i.protocol = e.protocol, e.host || F[e.protocol])i.pathname = e.pathname; else {
                    for (var r = (e.pathname || "").split("/"); r.length && !(e.host = r.shift()););
                    e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== r[0] && r.unshift(""), r.length < 2 && r.unshift(""), i.pathname = r.join("/")
                }
                if (i.search = e.search, i.query = e.query, i.host = e.host || "", i.auth = e.auth, i.hostname = e.hostname || e.host, i.port = e.port, i.pathname || i.search) {
                    var o = i.pathname || "", s = i.search || "";
                    i.path = o + s
                }
                return i.slashes = i.slashes || e.slashes, i.href = i.format(), i
            }
            var a = i.pathname && "/" === i.pathname.charAt(0), c = e.host || e.pathname && "/" === e.pathname.charAt(0), u = c || a || i.host && e.pathname, f = u, p = i.pathname && i.pathname.split("/") || [], r = e.pathname && e.pathname.split("/") || [], m = i.protocol && !x[i.protocol];
            if (m && (i.hostname = "", i.port = null, i.host && ("" === p[0] ? p[0] = i.host : p.unshift(i.host)), i.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === r[0] ? r[0] = e.host : r.unshift(e.host)), e.host = null), u = u && ("" === r[0] || "" === p[0])), c)i.host = e.host || "" === e.host ? e.host : i.host, i.hostname = e.hostname || "" === e.hostname ? e.hostname : i.hostname, i.search = e.search, i.query = e.query, p = r; else if (r.length)p || (p = []), p.pop(), p = p.concat(r), i.search = e.search, i.query = e.query; else if (!d(e.search)) {
                if (m) {
                    i.hostname = i.host = p.shift();
                    var g = i.host && i.host.indexOf("@") > 0 ? i.host.split("@") : !1;
                    g && (i.auth = g.shift(), i.host = i.hostname = g.shift())
                }
                return i.search = e.search, i.query = e.query, h(i.pathname) && h(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.href = i.format(), i
            }
            if (!p.length)return i.pathname = null, i.search ? i.path = "/" + i.search : i.path = null, i.href = i.format(), i;
            for (var v = p.slice(-1)[0], w = (i.host || e.host) && ("." === v || ".." === v) || "" === v, y = 0, A = p.length; A >= 0; A--)v = p[A], "." == v ? p.splice(A, 1) : ".." === v ? (p.splice(A, 1), y++) : y && (p.splice(A, 1), y--);
            if (!u && !f)for (; y--; y)p.unshift("..");
            !u || "" === p[0] || p[0] && "/" === p[0].charAt(0) || p.unshift(""), w && "/" !== p.join("/").substr(-1) && p.push("");
            var E = "" === p[0] || p[0] && "/" === p[0].charAt(0);
            if (m) {
                i.hostname = i.host = E ? "" : p.length ? p.shift() : "";
                var g = i.host && i.host.indexOf("@") > 0 ? i.host.split("@") : !1;
                g && (i.auth = g.shift(), i.host = i.hostname = g.shift())
            }
            return u = u || i.host && p.length, u && !E && p.unshift(""), p.length ? i.pathname = p.join("/") : (i.pathname = null, i.path = null), h(i.pathname) && h(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.auth = e.auth || i.auth, i.slashes = i.slashes || e.slashes, i.href = i.format(), i
        }, n.prototype.parseHost = function () {
            var e = this.host, t = p.exec(e);
            t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e)
        }
    }, function (e, t, i) {
        e.exports.id = "ace/mode/json_worker", e.exports.src = '"no use strict";(function(window){function resolveModuleId(id,paths){for(var testPath=id,tail="";testPath;){var alias=paths[testPath];if("string"==typeof alias)return alias+tail;if(alias)return alias.location.replace(/\\/*$/,"/")+(tail||alias.main||alias.name);if(alias===!1)return"";var i=testPath.lastIndexOf("/");if(-1===i)break;tail=testPath.substr(i)+tail,testPath=testPath.slice(0,i)}return id}if(!(void 0!==window.window&&window.document||window.acequire&&window.define)){window.console||(window.console=function(){var msgs=Array.prototype.slice.call(arguments,0);postMessage({type:"log",data:msgs})},window.console.error=window.console.warn=window.console.log=window.console.trace=window.console),window.window=window,window.ace=window,window.onerror=function(message,file,line,col,err){postMessage({type:"error",data:{message:message,data:err.data,file:file,line:line,col:col,stack:err.stack}})},window.normalizeModule=function(parentId,moduleName){if(-1!==moduleName.indexOf("!")){var chunks=moduleName.split("!");return window.normalizeModule(parentId,chunks[0])+"!"+window.normalizeModule(parentId,chunks[1])}if("."==moduleName.charAt(0)){var base=parentId.split("/").slice(0,-1).join("/");for(moduleName=(base?base+"/":"")+moduleName;-1!==moduleName.indexOf(".")&&previous!=moduleName;){var previous=moduleName;moduleName=moduleName.replace(/^\\.\\//,"").replace(/\\/\\.\\//,"/").replace(/[^\\/]+\\/\\.\\.\\//,"")}}return moduleName},window.acequire=function acequire(parentId,id){if(id||(id=parentId,parentId=null),!id.charAt)throw Error("worker.js acequire() accepts only (parentId, id) as arguments");id=window.normalizeModule(parentId,id);var module=window.acequire.modules[id];if(module)return module.initialized||(module.initialized=!0,module.exports=module.factory().exports),module.exports;if(!window.acequire.tlns)return console.log("unable to load "+id);var path=resolveModuleId(id,window.acequire.tlns);return".js"!=path.slice(-3)&&(path+=".js"),window.acequire.id=id,window.acequire.modules[id]={},importScripts(path),window.acequire(parentId,id)},window.acequire.modules={},window.acequire.tlns={},window.define=function(id,deps,factory){if(2==arguments.length?(factory=deps,"string"!=typeof id&&(deps=id,id=window.acequire.id)):1==arguments.length&&(factory=id,deps=[],id=window.acequire.id),"function"!=typeof factory)return window.acequire.modules[id]={exports:factory,initialized:!0},void 0;deps.length||(deps=["require","exports","module"]);var req=function(childId){return window.acequire(id,childId)};window.acequire.modules[id]={exports:{},factory:function(){var module=this,returnExports=factory.apply(this,deps.map(function(dep){switch(dep){case"require":return req;case"exports":return module.exports;case"module":return module;default:return req(dep)}}));return returnExports&&(module.exports=returnExports),module}}},window.define.amd={},acequire.tlns={},window.initBaseUrls=function(topLevelNamespaces){for(var i in topLevelNamespaces)acequire.tlns[i]=topLevelNamespaces[i]},window.initSender=function(){var EventEmitter=window.acequire("ace/lib/event_emitter").EventEmitter,oop=window.acequire("ace/lib/oop"),Sender=function(){};return function(){oop.implement(this,EventEmitter),this.callback=function(data,callbackId){postMessage({type:"call",id:callbackId,data:data})},this.emit=function(name,data){postMessage({type:"event",name:name,data:data})}}.call(Sender.prototype),new Sender};var main=window.main=null,sender=window.sender=null;window.onmessage=function(e){var msg=e.data;if(msg.event&&sender)sender._signal(msg.event,msg.data);else if(msg.command)if(main[msg.command])main[msg.command].apply(main,msg.args);else{if(!window[msg.command])throw Error("Unknown command:"+msg.command);window[msg.command].apply(window,msg.args)}else if(msg.init){window.initBaseUrls(msg.tlns),acequire("ace/lib/es5-shim"),sender=window.sender=window.initSender();var clazz=acequire(msg.module)[msg.classname];main=window.main=new clazz(sender)}}}})(this),ace.define("ace/lib/oop",["require","exports","module"],function(acequire,exports){"use strict";exports.inherits=function(ctor,superCtor){ctor.super_=superCtor,ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:!1,writable:!0,configurable:!0}})},exports.mixin=function(obj,mixin){for(var key in mixin)obj[key]=mixin[key];return obj},exports.implement=function(proto,mixin){exports.mixin(proto,mixin)}}),ace.define("ace/range",["require","exports","module"],function(acequire,exports){"use strict";var comparePoints=function(p1,p2){return p1.row-p2.row||p1.column-p2.column},Range=function(startRow,startColumn,endRow,endColumn){this.start={row:startRow,column:startColumn},this.end={row:endRow,column:endColumn}};(function(){this.isEqual=function(range){return this.start.row===range.start.row&&this.end.row===range.end.row&&this.start.column===range.start.column&&this.end.column===range.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(row,column){return 0==this.compare(row,column)},this.compareRange=function(range){var cmp,end=range.end,start=range.start;return cmp=this.compare(end.row,end.column),1==cmp?(cmp=this.compare(start.row,start.column),1==cmp?2:0==cmp?1:0):-1==cmp?-2:(cmp=this.compare(start.row,start.column),-1==cmp?-1:1==cmp?42:0)},this.comparePoint=function(p){return this.compare(p.row,p.column)},this.containsRange=function(range){return 0==this.comparePoint(range.start)&&0==this.comparePoint(range.end)},this.intersects=function(range){var cmp=this.compareRange(range);return-1==cmp||0==cmp||1==cmp},this.isEnd=function(row,column){return this.end.row==row&&this.end.column==column},this.isStart=function(row,column){return this.start.row==row&&this.start.column==column},this.setStart=function(row,column){"object"==typeof row?(this.start.column=row.column,this.start.row=row.row):(this.start.row=row,this.start.column=column)},this.setEnd=function(row,column){"object"==typeof row?(this.end.column=row.column,this.end.row=row.row):(this.end.row=row,this.end.column=column)},this.inside=function(row,column){return 0==this.compare(row,column)?this.isEnd(row,column)||this.isStart(row,column)?!1:!0:!1},this.insideStart=function(row,column){return 0==this.compare(row,column)?this.isEnd(row,column)?!1:!0:!1},this.insideEnd=function(row,column){return 0==this.compare(row,column)?this.isStart(row,column)?!1:!0:!1},this.compare=function(row,column){return this.isMultiLine()||row!==this.start.row?this.start.row>row?-1:row>this.end.row?1:this.start.row===row?column>=this.start.column?0:-1:this.end.row===row?this.end.column>=column?0:1:0:this.start.column>column?-1:column>this.end.column?1:0},this.compareStart=function(row,column){return this.start.row==row&&this.start.column==column?-1:this.compare(row,column)},this.compareEnd=function(row,column){return this.end.row==row&&this.end.column==column?1:this.compare(row,column)},this.compareInside=function(row,column){return this.end.row==row&&this.end.column==column?1:this.start.row==row&&this.start.column==column?-1:this.compare(row,column)},this.clipRows=function(firstRow,lastRow){if(this.end.row>lastRow)var end={row:lastRow+1,column:0};else if(firstRow>this.end.row)var end={row:firstRow,column:0};if(this.start.row>lastRow)var start={row:lastRow+1,column:0};else if(firstRow>this.start.row)var start={row:firstRow,column:0};return Range.fromPoints(start||this.start,end||this.end)},this.extend=function(row,column){var cmp=this.compare(row,column);if(0==cmp)return this;if(-1==cmp)var start={row:row,column:column};else var end={row:row,column:column};return Range.fromPoints(start||this.start,end||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return Range.fromPoints(this.start,this.end)},this.collapseRows=function(){return 0==this.end.column?new Range(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new Range(this.start.row,0,this.end.row,0)},this.toScreenRange=function(session){var screenPosStart=session.documentToScreenPosition(this.start),screenPosEnd=session.documentToScreenPosition(this.end);return new Range(screenPosStart.row,screenPosStart.column,screenPosEnd.row,screenPosEnd.column)},this.moveBy=function(row,column){this.start.row+=row,this.start.column+=column,this.end.row+=row,this.end.column+=column}}).call(Range.prototype),Range.fromPoints=function(start,end){return new Range(start.row,start.column,end.row,end.column)},Range.comparePoints=comparePoints,Range.comparePoints=function(p1,p2){return p1.row-p2.row||p1.column-p2.column},exports.Range=Range}),ace.define("ace/apply_delta",["require","exports","module"],function(acequire,exports){"use strict";exports.applyDelta=function(docLines,delta){var row=delta.start.row,startColumn=delta.start.column,line=docLines[row]||"";switch(delta.action){case"insert":var lines=delta.lines;if(1===lines.length)docLines[row]=line.substring(0,startColumn)+delta.lines[0]+line.substring(startColumn);else{var args=[row,1].concat(delta.lines);docLines.splice.apply(docLines,args),docLines[row]=line.substring(0,startColumn)+docLines[row],docLines[row+delta.lines.length-1]+=line.substring(startColumn)}break;case"remove":var endColumn=delta.end.column,endRow=delta.end.row;row===endRow?docLines[row]=line.substring(0,startColumn)+line.substring(endColumn):docLines.splice(row,endRow-row+1,line.substring(0,startColumn)+docLines[endRow].substring(endColumn))}}}),ace.define("ace/lib/event_emitter",["require","exports","module"],function(acequire,exports){"use strict";var EventEmitter={},stopPropagation=function(){this.propagationStopped=!0},preventDefault=function(){this.defaultPrevented=!0};EventEmitter._emit=EventEmitter._dispatchEvent=function(eventName,e){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var listeners=this._eventRegistry[eventName]||[],defaultHandler=this._defaultHandlers[eventName];if(listeners.length||defaultHandler){"object"==typeof e&&e||(e={}),e.type||(e.type=eventName),e.stopPropagation||(e.stopPropagation=stopPropagation),e.preventDefault||(e.preventDefault=preventDefault),listeners=listeners.slice();for(var i=0;listeners.length>i&&(listeners[i](e,this),!e.propagationStopped);i++);return defaultHandler&&!e.defaultPrevented?defaultHandler(e,this):void 0}},EventEmitter._signal=function(eventName,e){var listeners=(this._eventRegistry||{})[eventName];if(listeners){listeners=listeners.slice();for(var i=0;listeners.length>i;i++)listeners[i](e,this)}},EventEmitter.once=function(eventName,callback){var _self=this;callback&&this.addEventListener(eventName,function newCallback(){_self.removeEventListener(eventName,newCallback),callback.apply(null,arguments)})},EventEmitter.setDefaultHandler=function(eventName,callback){var handlers=this._defaultHandlers;if(handlers||(handlers=this._defaultHandlers={_disabled_:{}}),handlers[eventName]){var old=handlers[eventName],disabled=handlers._disabled_[eventName];disabled||(handlers._disabled_[eventName]=disabled=[]),disabled.push(old);var i=disabled.indexOf(callback);-1!=i&&disabled.splice(i,1)}handlers[eventName]=callback},EventEmitter.removeDefaultHandler=function(eventName,callback){var handlers=this._defaultHandlers;if(handlers){var disabled=handlers._disabled_[eventName];if(handlers[eventName]==callback)handlers[eventName],disabled&&this.setDefaultHandler(eventName,disabled.pop());else if(disabled){var i=disabled.indexOf(callback);-1!=i&&disabled.splice(i,1)}}},EventEmitter.on=EventEmitter.addEventListener=function(eventName,callback,capturing){this._eventRegistry=this._eventRegistry||{};var listeners=this._eventRegistry[eventName];return listeners||(listeners=this._eventRegistry[eventName]=[]),-1==listeners.indexOf(callback)&&listeners[capturing?"unshift":"push"](callback),callback},EventEmitter.off=EventEmitter.removeListener=EventEmitter.removeEventListener=function(eventName,callback){this._eventRegistry=this._eventRegistry||{};var listeners=this._eventRegistry[eventName];if(listeners){var index=listeners.indexOf(callback);-1!==index&&listeners.splice(index,1)}},EventEmitter.removeAllListeners=function(eventName){this._eventRegistry&&(this._eventRegistry[eventName]=[])},exports.EventEmitter=EventEmitter}),ace.define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(acequire,exports){"use strict";var oop=acequire("./lib/oop"),EventEmitter=acequire("./lib/event_emitter").EventEmitter,Anchor=exports.Anchor=function(doc,row,column){this.$onChange=this.onChange.bind(this),this.attach(doc),column===void 0?this.setPosition(row.row,row.column):this.setPosition(row,column)};(function(){function $pointsInOrder(point1,point2,equalPointsInOrder){var bColIsAfter=equalPointsInOrder?point1.column<=point2.column:point1.column<point2.column;return point1.row<point2.row||point1.row==point2.row&&bColIsAfter}function $getTransformedPoint(delta,point,moveIfEqual){var deltaIsInsert="insert"==delta.action,deltaRowShift=(deltaIsInsert?1:-1)*(delta.end.row-delta.start.row),deltaColShift=(deltaIsInsert?1:-1)*(delta.end.column-delta.start.column),deltaStart=delta.start,deltaEnd=deltaIsInsert?deltaStart:delta.end;return $pointsInOrder(point,deltaStart,moveIfEqual)?{row:point.row,column:point.column}:$pointsInOrder(deltaEnd,point,!moveIfEqual)?{row:point.row+deltaRowShift,column:point.column+(point.row==deltaEnd.row?deltaColShift:0)}:{row:deltaStart.row,column:deltaStart.column}}oop.implement(this,EventEmitter),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(delta){if(!(delta.start.row==delta.end.row&&delta.start.row!=this.row||delta.start.row>this.row)){var point=$getTransformedPoint(delta,{row:this.row,column:this.column},this.$insertRight);this.setPosition(point.row,point.column,!0)}},this.setPosition=function(row,column,noClip){var pos;if(pos=noClip?{row:row,column:column}:this.$clipPositionToDocument(row,column),this.row!=pos.row||this.column!=pos.column){var old={row:this.row,column:this.column};this.row=pos.row,this.column=pos.column,this._signal("change",{old:old,value:pos})}},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.attach=function(doc){this.document=doc||this.document,this.document.on("change",this.$onChange)},this.$clipPositionToDocument=function(row,column){var pos={};return row>=this.document.getLength()?(pos.row=Math.max(0,this.document.getLength()-1),pos.column=this.document.getLine(pos.row).length):0>row?(pos.row=0,pos.column=0):(pos.row=row,pos.column=Math.min(this.document.getLine(pos.row).length,Math.max(0,column))),0>column&&(pos.column=0),pos}}).call(Anchor.prototype)}),ace.define("ace/document",["require","exports","module","ace/lib/oop","ace/apply_delta","ace/lib/event_emitter","ace/range","ace/anchor"],function(acequire,exports){"use strict";var oop=acequire("./lib/oop"),applyDelta=acequire("./apply_delta").applyDelta,EventEmitter=acequire("./lib/event_emitter").EventEmitter,Range=acequire("./range").Range,Anchor=acequire("./anchor").Anchor,Document=function(textOrLines){this.$lines=[""],0===textOrLines.length?this.$lines=[""]:Array.isArray(textOrLines)?this.insertMergedLines({row:0,column:0},textOrLines):this.insert({row:0,column:0},textOrLines)};(function(){oop.implement(this,EventEmitter),this.setValue=function(text){var len=this.getLength()-1;this.remove(new Range(0,0,len,this.getLine(len).length)),this.insert({row:0,column:0},text)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(row,column){return new Anchor(this,row,column)},this.$split=0==="aaa".split(/a/).length?function(text){return text.replace(/\\r\\n|\\r/g,"\\n").split("\\n")}:function(text){return text.split(/\\r\\n|\\r|\\n/)},this.$detectNewLine=function(text){var match=text.match(/^.*?(\\r\\n|\\r|\\n)/m);this.$autoNewLine=match?match[1]:"\\n",this._signal("changeNewLineMode")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\\r\\n";case"unix":return"\\n";default:return this.$autoNewLine||"\\n"}},this.$autoNewLine="",this.$newLineMode="auto",this.setNewLineMode=function(newLineMode){this.$newLineMode!==newLineMode&&(this.$newLineMode=newLineMode,this._signal("changeNewLineMode"))},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(text){return"\\r\\n"==text||"\\r"==text||"\\n"==text},this.getLine=function(row){return this.$lines[row]||""},this.getLines=function(firstRow,lastRow){return this.$lines.slice(firstRow,lastRow+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(range){return this.getLinesForRange(range).join(this.getNewLineCharacter())},this.getLinesForRange=function(range){var lines;if(range.start.row===range.end.row)lines=[this.getLine(range.start.row).substring(range.start.column,range.end.column)];else{lines=this.getLines(range.start.row,range.end.row),lines[0]=(lines[0]||"").substring(range.start.column);var l=lines.length-1;range.end.row-range.start.row==l&&(lines[l]=lines[l].substring(0,range.end.column))}return lines},this.insertLines=function(row,lines){return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."),this.insertFullLines(row,lines)},this.removeLines=function(firstRow,lastRow){return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."),this.removeFullLines(firstRow,lastRow)},this.insertNewLine=function(position){return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, [\'\', \'\']) instead."),this.insertMergedLines(position,["",""])},this.insert=function(position,text){return 1>=this.getLength()&&this.$detectNewLine(text),this.insertMergedLines(position,this.$split(text))},this.insertInLine=function(position,text){var start=this.clippedPos(position.row,position.column),end=this.pos(position.row,position.column+text.length);return this.applyDelta({start:start,end:end,action:"insert",lines:[text]},!0),this.clonePos(end)},this.clippedPos=function(row,column){var length=this.getLength();void 0===row?row=length:0>row?row=0:row>=length&&(row=length-1,column=void 0);var line=this.getLine(row);return void 0==column&&(column=line.length),column=Math.min(Math.max(column,0),line.length),{row:row,column:column}},this.clonePos=function(pos){return{row:pos.row,column:pos.column}},this.pos=function(row,column){return{row:row,column:column}},this.$clipPosition=function(position){var length=this.getLength();return position.row>=length?(position.row=Math.max(0,length-1),position.column=this.getLine(length-1).length):(position.row=Math.max(0,position.row),position.column=Math.min(Math.max(position.column,0),this.getLine(position.row).length)),position},this.insertFullLines=function(row,lines){row=Math.min(Math.max(row,0),this.getLength());var column=0;this.getLength()>row?(lines=lines.concat([""]),column=0):(lines=[""].concat(lines),row--,column=this.$lines[row].length),this.insertMergedLines({row:row,column:column},lines)},this.insertMergedLines=function(position,lines){var start=this.clippedPos(position.row,position.column),end={row:start.row+lines.length-1,column:(1==lines.length?start.column:0)+lines[lines.length-1].length};return this.applyDelta({start:start,end:end,action:"insert",lines:lines}),this.clonePos(end)},this.remove=function(range){var start=this.clippedPos(range.start.row,range.start.column),end=this.clippedPos(range.end.row,range.end.column);return this.applyDelta({start:start,end:end,action:"remove",lines:this.getLinesForRange({start:start,end:end})}),this.clonePos(start)},this.removeInLine=function(row,startColumn,endColumn){var start=this.clippedPos(row,startColumn),end=this.clippedPos(row,endColumn);return this.applyDelta({start:start,end:end,action:"remove",lines:this.getLinesForRange({start:start,end:end})},!0),this.clonePos(start)},this.removeFullLines=function(firstRow,lastRow){firstRow=Math.min(Math.max(0,firstRow),this.getLength()-1),lastRow=Math.min(Math.max(0,lastRow),this.getLength()-1);var deleteFirstNewLine=lastRow==this.getLength()-1&&firstRow>0,deleteLastNewLine=this.getLength()-1>lastRow,startRow=deleteFirstNewLine?firstRow-1:firstRow,startCol=deleteFirstNewLine?this.getLine(startRow).length:0,endRow=deleteLastNewLine?lastRow+1:lastRow,endCol=deleteLastNewLine?0:this.getLine(endRow).length,range=new Range(startRow,startCol,endRow,endCol),deletedLines=this.$lines.slice(firstRow,lastRow+1);return this.applyDelta({start:range.start,end:range.end,action:"remove",lines:this.getLinesForRange(range)}),deletedLines},this.removeNewLine=function(row){this.getLength()-1>row&&row>=0&&this.applyDelta({start:this.pos(row,this.getLine(row).length),end:this.pos(row+1,0),action:"remove",lines:["",""]})},this.replace=function(range,text){if(range instanceof Range||(range=Range.fromPoints(range.start,range.end)),0===text.length&&range.isEmpty())return range.start;if(text==this.getTextRange(range))return range.end;this.remove(range);var end;return end=text?this.insert(range.start,text):range.start},this.applyDeltas=function(deltas){for(var i=0;deltas.length>i;i++)this.applyDelta(deltas[i])},this.revertDeltas=function(deltas){for(var i=deltas.length-1;i>=0;i--)this.revertDelta(deltas[i])},this.applyDelta=function(delta,doNotValidate){var isInsert="insert"==delta.action;(isInsert?1>=delta.lines.length&&!delta.lines[0]:!Range.comparePoints(delta.start,delta.end))||(isInsert&&delta.lines.length>2e4&&this.$splitAndapplyLargeDelta(delta,2e4),applyDelta(this.$lines,delta,doNotValidate),this._signal("change",delta))},this.$splitAndapplyLargeDelta=function(delta,MAX){for(var lines=delta.lines,l=lines.length,row=delta.start.row,column=delta.start.column,from=0,to=0;;){from=to,to+=MAX-1;var chunk=lines.slice(from,to);if(to>l){delta.lines=chunk,delta.start.row=row+from,delta.start.column=column;break}chunk.push(""),this.applyDelta({start:this.pos(row+from,column),end:this.pos(row+to,column=0),action:delta.action,lines:chunk},!0)}},this.revertDelta=function(delta){this.applyDelta({start:this.clonePos(delta.start),end:this.clonePos(delta.end),action:"insert"==delta.action?"remove":"insert",lines:delta.lines.slice()})},this.indexToPosition=function(index,startRow){for(var lines=this.$lines||this.getAllLines(),newlineLength=this.getNewLineCharacter().length,i=startRow||0,l=lines.length;l>i;i++)if(index-=lines[i].length+newlineLength,0>index)return{row:i,column:index+lines[i].length+newlineLength};return{row:l-1,column:lines[l-1].length}},this.positionToIndex=function(pos,startRow){for(var lines=this.$lines||this.getAllLines(),newlineLength=this.getNewLineCharacter().length,index=0,row=Math.min(pos.row,lines.length),i=startRow||0;row>i;++i)index+=lines[i].length+newlineLength;return index+pos.column}}).call(Document.prototype),exports.Document=Document}),ace.define("ace/lib/lang",["require","exports","module"],function(acequire,exports){"use strict";exports.last=function(a){return a[a.length-1]},exports.stringReverse=function(string){return string.split("").reverse().join("")},exports.stringRepeat=function(string,count){for(var result="";count>0;)1&count&&(result+=string),(count>>=1)&&(string+=string);return result};var trimBeginRegexp=/^\\s\\s*/,trimEndRegexp=/\\s\\s*$/;exports.stringTrimLeft=function(string){return string.replace(trimBeginRegexp,"")},exports.stringTrimRight=function(string){return string.replace(trimEndRegexp,"")},exports.copyObject=function(obj){var copy={};for(var key in obj)copy[key]=obj[key];return copy},exports.copyArray=function(array){for(var copy=[],i=0,l=array.length;l>i;i++)copy[i]=array[i]&&"object"==typeof array[i]?this.copyObject(array[i]):array[i];return copy},exports.deepCopy=function deepCopy(obj){if("object"!=typeof obj||!obj)return obj;var copy;if(Array.isArray(obj)){copy=[];for(var key=0;obj.length>key;key++)copy[key]=deepCopy(obj[key]);return copy}var cons=obj.constructor;if(cons===RegExp)return obj;copy=cons();for(var key in obj)copy[key]=deepCopy(obj[key]);return copy},exports.arrayToMap=function(arr){for(var map={},i=0;arr.length>i;i++)map[arr[i]]=1;return map},exports.createMap=function(props){var map=Object.create(null);for(var i in props)map[i]=props[i];return map},exports.arrayRemove=function(array,value){for(var i=0;array.length>=i;i++)value===array[i]&&array.splice(i,1)},exports.escapeRegExp=function(str){return str.replace(/([.*+?^${}()|[\\]\\/\\\\])/g,"\\\\$1")},exports.escapeHTML=function(str){return str.replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/\'/g,"&#39;").replace(/</g,"&#60;")},exports.getMatchOffsets=function(string,regExp){var matches=[];return string.replace(regExp,function(str){matches.push({offset:arguments[arguments.length-2],length:str.length})}),matches},exports.deferredCall=function(fcn){var timer=null,callback=function(){timer=null,fcn()},deferred=function(timeout){return deferred.cancel(),timer=setTimeout(callback,timeout||0),deferred};return deferred.schedule=deferred,deferred.call=function(){return this.cancel(),fcn(),deferred},deferred.cancel=function(){return clearTimeout(timer),timer=null,deferred},deferred.isPending=function(){return timer},deferred},exports.delayedCall=function(fcn,defaultTimeout){var timer=null,callback=function(){timer=null,fcn()},_self=function(timeout){null==timer&&(timer=setTimeout(callback,timeout||defaultTimeout))};return _self.delay=function(timeout){timer&&clearTimeout(timer),timer=setTimeout(callback,timeout||defaultTimeout)},_self.schedule=_self,_self.call=function(){this.cancel(),fcn()},_self.cancel=function(){timer&&clearTimeout(timer),timer=null},_self.isPending=function(){return timer},_self}}),ace.define("ace/worker/mirror",["require","exports","module","ace/range","ace/document","ace/lib/lang"],function(acequire,exports){"use strict";acequire("../range").Range;var Document=acequire("../document").Document,lang=acequire("../lib/lang"),Mirror=exports.Mirror=function(sender){this.sender=sender;var doc=this.doc=new Document(""),deferredUpdate=this.deferredUpdate=lang.delayedCall(this.onUpdate.bind(this)),_self=this;sender.on("change",function(e){var data=e.data;if(data[0].start)doc.applyDeltas(data);else for(var i=0;data.length>i;i+=2){if(Array.isArray(data[i+1]))var d={action:"insert",start:data[i],lines:data[i+1]};else var d={action:"remove",start:data[i],end:data[i+1]};doc.applyDelta(d,!0)}return _self.$timeout?deferredUpdate.schedule(_self.$timeout):(_self.onUpdate(),void 0)})};(function(){this.$timeout=500,this.setTimeout=function(timeout){this.$timeout=timeout},this.setValue=function(value){this.doc.setValue(value),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(callbackId){this.sender.callback(this.doc.getValue(),callbackId)},this.onUpdate=function(){},this.isPending=function(){return this.deferredUpdate.isPending()}}).call(Mirror.prototype)}),ace.define("ace/mode/json/json_parse",["require","exports","module"],function(){"use strict";var at,ch,text,value,escapee={\'"\':\'"\',"\\\\":"\\\\","/":"/",b:"\\b",f:"\\f",n:"\\n",r:"\\r",t:"	"},error=function(m){throw{name:"SyntaxError",message:m,at:at,text:text}},next=function(c){return c&&c!==ch&&error("Expected \'"+c+"\' instead of \'"+ch+"\'"),ch=text.charAt(at),at+=1,ch},number=function(){var number,string="";for("-"===ch&&(string="-",next("-"));ch>="0"&&"9">=ch;)string+=ch,next();if("."===ch)for(string+=".";next()&&ch>="0"&&"9">=ch;)string+=ch;if("e"===ch||"E"===ch)for(string+=ch,next(),("-"===ch||"+"===ch)&&(string+=ch,next());ch>="0"&&"9">=ch;)string+=ch,next();return number=+string,isNaN(number)?(error("Bad number"),void 0):number},string=function(){var hex,i,uffff,string="";if(\'"\'===ch)for(;next();){if(\'"\'===ch)return next(),string;if("\\\\"===ch)if(next(),"u"===ch){for(uffff=0,i=0;4>i&&(hex=parseInt(next(),16),isFinite(hex));i+=1)uffff=16*uffff+hex;string+=String.fromCharCode(uffff)}else{if("string"!=typeof escapee[ch])break;string+=escapee[ch]}else string+=ch}error("Bad string")},white=function(){for(;ch&&" ">=ch;)next()},word=function(){switch(ch){case"t":return next("t"),next("r"),next("u"),next("e"),!0;case"f":return next("f"),next("a"),next("l"),next("s"),next("e"),!1;case"n":return next("n"),next("u"),next("l"),next("l"),null}error("Unexpected \'"+ch+"\'")},array=function(){var array=[];if("["===ch){if(next("["),white(),"]"===ch)return next("]"),array;for(;ch;){if(array.push(value()),white(),"]"===ch)return next("]"),array;next(","),white()}}error("Bad array")},object=function(){var key,object={};if("{"===ch){if(next("{"),white(),"}"===ch)return next("}"),object;for(;ch;){if(key=string(),white(),next(":"),Object.hasOwnProperty.call(object,key)&&error(\'Duplicate key "\'+key+\'"\'),object[key]=value(),white(),"}"===ch)return next("}"),object;next(","),white()}}error("Bad object")};return value=function(){switch(white(),ch){case"{":return object();case"[":return array();case\'"\':return string();case"-":return number();default:return ch>="0"&&"9">=ch?number():word()}},function(source,reviver){var result;return text=source,at=0,ch=" ",result=value(),white(),ch&&error("Syntax error"),"function"==typeof reviver?function walk(holder,key){var k,v,value=holder[key];if(value&&"object"==typeof value)for(k in value)Object.hasOwnProperty.call(value,k)&&(v=walk(value,k),void 0!==v?value[k]=v:delete value[k]);return reviver.call(holder,key,value)}({"":result},""):result}}),ace.define("ace/mode/json_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror","ace/mode/json/json_parse"],function(acequire,exports){"use strict";var oop=acequire("../lib/oop"),Mirror=acequire("../worker/mirror").Mirror,parse=acequire("./json/json_parse"),JsonWorker=exports.JsonWorker=function(sender){Mirror.call(this,sender),this.setTimeout(200)};oop.inherits(JsonWorker,Mirror),function(){this.onUpdate=function(){var value=this.doc.getValue(),errors=[];try{value&&parse(value)}catch(e){var pos=this.doc.indexToPosition(e.at-1);errors.push({row:pos.row,column:pos.column,text:e.message,type:"error"})}this.sender.emit("annotate",errors)}}.call(JsonWorker.prototype)}),ace.define("ace/lib/es5-shim",["require","exports","module"],function(){function Empty(){}function doesDefinePropertyWork(object){try{return Object.defineProperty(object,"sentinel",{}),"sentinel"in object}catch(exception){}}function toInteger(n){return n=+n,n!==n?n=0:0!==n&&n!==1/0&&n!==-(1/0)&&(n=(n>0||-1)*Math.floor(Math.abs(n))),n}Function.prototype.bind||(Function.prototype.bind=function(that){var target=this;if("function"!=typeof target)throw new TypeError("Function.prototype.bind called on incompatible "+target);var args=slice.call(arguments,1),bound=function(){if(this instanceof bound){var result=target.apply(this,args.concat(slice.call(arguments)));return Object(result)===result?result:this}return target.apply(that,args.concat(slice.call(arguments)))};return target.prototype&&(Empty.prototype=target.prototype,bound.prototype=new Empty,Empty.prototype=null),bound});var defineGetter,defineSetter,lookupGetter,lookupSetter,supportsAccessors,call=Function.prototype.call,prototypeOfArray=Array.prototype,prototypeOfObject=Object.prototype,slice=prototypeOfArray.slice,_toString=call.bind(prototypeOfObject.toString),owns=call.bind(prototypeOfObject.hasOwnProperty);if((supportsAccessors=owns(prototypeOfObject,"__defineGetter__"))&&(defineGetter=call.bind(prototypeOfObject.__defineGetter__),defineSetter=call.bind(prototypeOfObject.__defineSetter__),lookupGetter=call.bind(prototypeOfObject.__lookupGetter__),lookupSetter=call.bind(prototypeOfObject.__lookupSetter__)),2!=[1,2].splice(0).length)if(function(){function makeArray(l){var a=Array(l+2);return a[0]=a[1]=0,a}var lengthBefore,array=[];return array.splice.apply(array,makeArray(20)),array.splice.apply(array,makeArray(26)),lengthBefore=array.length,array.splice(5,0,"XXX"),lengthBefore+1==array.length,lengthBefore+1==array.length?!0:void 0\n}()){var array_splice=Array.prototype.splice;Array.prototype.splice=function(start,deleteCount){return arguments.length?array_splice.apply(this,[void 0===start?0:start,void 0===deleteCount?this.length-start:deleteCount].concat(slice.call(arguments,2))):[]}}else Array.prototype.splice=function(pos,removeCount){var length=this.length;pos>0?pos>length&&(pos=length):void 0==pos?pos=0:0>pos&&(pos=Math.max(length+pos,0)),length>pos+removeCount||(removeCount=length-pos);var removed=this.slice(pos,pos+removeCount),insert=slice.call(arguments,2),add=insert.length;if(pos===length)add&&this.push.apply(this,insert);else{var remove=Math.min(removeCount,length-pos),tailOldPos=pos+remove,tailNewPos=tailOldPos+add-remove,tailCount=length-tailOldPos,lengthAfterRemove=length-remove;if(tailOldPos>tailNewPos)for(var i=0;tailCount>i;++i)this[tailNewPos+i]=this[tailOldPos+i];else if(tailNewPos>tailOldPos)for(i=tailCount;i--;)this[tailNewPos+i]=this[tailOldPos+i];if(add&&pos===lengthAfterRemove)this.length=lengthAfterRemove,this.push.apply(this,insert);else for(this.length=lengthAfterRemove+add,i=0;add>i;++i)this[pos+i]=insert[i]}return removed};Array.isArray||(Array.isArray=function(obj){return"[object Array]"==_toString(obj)});var boxedString=Object("a"),splitString="a"!=boxedString[0]||!(0 in boxedString);if(Array.prototype.forEach||(Array.prototype.forEach=function(fun){var object=toObject(this),self=splitString&&"[object String]"==_toString(this)?this.split(""):object,thisp=arguments[1],i=-1,length=self.length>>>0;if("[object Function]"!=_toString(fun))throw new TypeError;for(;length>++i;)i in self&&fun.call(thisp,self[i],i,object)}),Array.prototype.map||(Array.prototype.map=function(fun){var object=toObject(this),self=splitString&&"[object String]"==_toString(this)?this.split(""):object,length=self.length>>>0,result=Array(length),thisp=arguments[1];if("[object Function]"!=_toString(fun))throw new TypeError(fun+" is not a function");for(var i=0;length>i;i++)i in self&&(result[i]=fun.call(thisp,self[i],i,object));return result}),Array.prototype.filter||(Array.prototype.filter=function(fun){var value,object=toObject(this),self=splitString&&"[object String]"==_toString(this)?this.split(""):object,length=self.length>>>0,result=[],thisp=arguments[1];if("[object Function]"!=_toString(fun))throw new TypeError(fun+" is not a function");for(var i=0;length>i;i++)i in self&&(value=self[i],fun.call(thisp,value,i,object)&&result.push(value));return result}),Array.prototype.every||(Array.prototype.every=function(fun){var object=toObject(this),self=splitString&&"[object String]"==_toString(this)?this.split(""):object,length=self.length>>>0,thisp=arguments[1];if("[object Function]"!=_toString(fun))throw new TypeError(fun+" is not a function");for(var i=0;length>i;i++)if(i in self&&!fun.call(thisp,self[i],i,object))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(fun){var object=toObject(this),self=splitString&&"[object String]"==_toString(this)?this.split(""):object,length=self.length>>>0,thisp=arguments[1];if("[object Function]"!=_toString(fun))throw new TypeError(fun+" is not a function");for(var i=0;length>i;i++)if(i in self&&fun.call(thisp,self[i],i,object))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(fun){var object=toObject(this),self=splitString&&"[object String]"==_toString(this)?this.split(""):object,length=self.length>>>0;if("[object Function]"!=_toString(fun))throw new TypeError(fun+" is not a function");if(!length&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value");var result,i=0;if(arguments.length>=2)result=arguments[1];else for(;;){if(i in self){result=self[i++];break}if(++i>=length)throw new TypeError("reduce of empty array with no initial value")}for(;length>i;i++)i in self&&(result=fun.call(void 0,result,self[i],i,object));return result}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(fun){var object=toObject(this),self=splitString&&"[object String]"==_toString(this)?this.split(""):object,length=self.length>>>0;if("[object Function]"!=_toString(fun))throw new TypeError(fun+" is not a function");if(!length&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var result,i=length-1;if(arguments.length>=2)result=arguments[1];else for(;;){if(i in self){result=self[i--];break}if(0>--i)throw new TypeError("reduceRight of empty array with no initial value")}do i in this&&(result=fun.call(void 0,result,self[i],i,object));while(i--);return result}),Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(sought){var self=splitString&&"[object String]"==_toString(this)?this.split(""):toObject(this),length=self.length>>>0;if(!length)return-1;var i=0;for(arguments.length>1&&(i=toInteger(arguments[1])),i=i>=0?i:Math.max(0,length+i);length>i;i++)if(i in self&&self[i]===sought)return i;return-1}),Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(sought){var self=splitString&&"[object String]"==_toString(this)?this.split(""):toObject(this),length=self.length>>>0;if(!length)return-1;var i=length-1;for(arguments.length>1&&(i=Math.min(i,toInteger(arguments[1]))),i=i>=0?i:length-Math.abs(i);i>=0;i--)if(i in self&&sought===self[i])return i;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(object){return object.__proto__||(object.constructor?object.constructor.prototype:prototypeOfObject)}),!Object.getOwnPropertyDescriptor){var ERR_NON_OBJECT="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(object,property){if("object"!=typeof object&&"function"!=typeof object||null===object)throw new TypeError(ERR_NON_OBJECT+object);if(owns(object,property)){var descriptor,getter,setter;if(descriptor={enumerable:!0,configurable:!0},supportsAccessors){var prototype=object.__proto__;object.__proto__=prototypeOfObject;var getter=lookupGetter(object,property),setter=lookupSetter(object,property);if(object.__proto__=prototype,getter||setter)return getter&&(descriptor.get=getter),setter&&(descriptor.set=setter),descriptor}return descriptor.value=object[property],descriptor}}}if(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(object){return Object.keys(object)}),!Object.create){var createEmpty;createEmpty=null===Object.prototype.__proto__?function(){return{__proto__:null}}:function(){var empty={};for(var i in empty)empty[i]=null;return empty.constructor=empty.hasOwnProperty=empty.propertyIsEnumerable=empty.isPrototypeOf=empty.toLocaleString=empty.toString=empty.valueOf=empty.__proto__=null,empty},Object.create=function(prototype,properties){var object;if(null===prototype)object=createEmpty();else{if("object"!=typeof prototype)throw new TypeError("typeof prototype["+typeof prototype+"] != \'object\'");var Type=function(){};Type.prototype=prototype,object=new Type,object.__proto__=prototype}return void 0!==properties&&Object.defineProperties(object,properties),object}}if(Object.defineProperty){var definePropertyWorksOnObject=doesDefinePropertyWork({}),definePropertyWorksOnDom="undefined"==typeof document||doesDefinePropertyWork(document.createElement("div"));if(!definePropertyWorksOnObject||!definePropertyWorksOnDom)var definePropertyFallback=Object.defineProperty}if(!Object.defineProperty||definePropertyFallback){var ERR_NON_OBJECT_DESCRIPTOR="Property description must be an object: ",ERR_NON_OBJECT_TARGET="Object.defineProperty called on non-object: ",ERR_ACCESSORS_NOT_SUPPORTED="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(object,property,descriptor){if("object"!=typeof object&&"function"!=typeof object||null===object)throw new TypeError(ERR_NON_OBJECT_TARGET+object);if("object"!=typeof descriptor&&"function"!=typeof descriptor||null===descriptor)throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR+descriptor);if(definePropertyFallback)try{return definePropertyFallback.call(Object,object,property,descriptor)}catch(exception){}if(owns(descriptor,"value"))if(supportsAccessors&&(lookupGetter(object,property)||lookupSetter(object,property))){var prototype=object.__proto__;object.__proto__=prototypeOfObject,delete object[property],object[property]=descriptor.value,object.__proto__=prototype}else object[property]=descriptor.value;else{if(!supportsAccessors)throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);owns(descriptor,"get")&&defineGetter(object,property,descriptor.get),owns(descriptor,"set")&&defineSetter(object,property,descriptor.set)}return object}}Object.defineProperties||(Object.defineProperties=function(object,properties){for(var property in properties)owns(properties,property)&&Object.defineProperty(object,property,properties[property]);return object}),Object.seal||(Object.seal=function(object){return object}),Object.freeze||(Object.freeze=function(object){return object});try{Object.freeze(function(){})}catch(exception){Object.freeze=function(freezeObject){return function(object){return"function"==typeof object?object:freezeObject(object)}}(Object.freeze)}if(Object.preventExtensions||(Object.preventExtensions=function(object){return object}),Object.isSealed||(Object.isSealed=function(){return!1}),Object.isFrozen||(Object.isFrozen=function(){return!1}),Object.isExtensible||(Object.isExtensible=function(object){if(Object(object)===object)throw new TypeError;for(var name="";owns(object,name);)name+="?";object[name]=!0;var returnValue=owns(object,name);return delete object[name],returnValue}),!Object.keys){var hasDontEnumBug=!0,dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],dontEnumsLength=dontEnums.length;for(var key in{toString:null})hasDontEnumBug=!1;Object.keys=function(object){if("object"!=typeof object&&"function"!=typeof object||null===object)throw new TypeError("Object.keys called on a non-object");var keys=[];for(var name in object)owns(object,name)&&keys.push(name);if(hasDontEnumBug)for(var i=0,ii=dontEnumsLength;ii>i;i++){var dontEnum=dontEnums[i];owns(object,dontEnum)&&keys.push(dontEnum)}return keys}}Date.now||(Date.now=function(){return(new Date).getTime()});var ws="	\\n\x0B\\f\\r   ᠎             　\\u2028\\u2029\ufeff";if(!String.prototype.trim||ws.trim()){ws="["+ws+"]";var trimBeginRegexp=RegExp("^"+ws+ws+"*"),trimEndRegexp=RegExp(ws+ws+"*$");String.prototype.trim=function(){return(this+"").replace(trimBeginRegexp,"").replace(trimEndRegexp,"")}}var toObject=function(o){if(null==o)throw new TypeError("can\'t convert "+o+" to object");return Object(o)}});';
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.dataLevel, o = e.schema[t], s = e.errSchemaPath + "/" + t, a = !e.opts.allErrors, l = "data" + (r || "");
            if ("#" == o || "#/" == o)e.isRoot ? (n += "  if (! validate(" + l + ", (dataPath || '')", '""' != e.errorPath && (n += " + " + e.errorPath), n += ") ) { if (vErrors === null) vErrors = validate.errors; else vErrors = vErrors.concat(validate.errors); errors = vErrors.length; } ", a && (n += " else { ")) : (n += "  if (! root.refVal[0](" + l + ", (dataPath || '')", '""' != e.errorPath && (n += " + " + e.errorPath), n += ") ) { if (vErrors === null) vErrors = root.refVal[0].errors; else vErrors = vErrors.concat(root.refVal[0].errors); errors = vErrors.length; } ", a && (n += " else { ")); else {
                var c = e.resolveRef(e.baseId, o, e.isRoot);
                if (void 0 === c) {
                    var h = "can't resolve reference " + o + " from id " + e.baseId;
                    if ("fail" == e.opts.missingRefs) {
                        console.log(h);
                        var d = d || [];
                        d.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "$ref") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + s + "\" , params: { ref: '" + e.util.escapeQuotes(o) + "' } ", e.opts.messages !== !1 && (n += " , message: 'can\\'t resolve reference " + e.util.escapeQuotes(o) + "' "), e.opts.verbose && (n += " , schema: " + e.util.toQuotedString(o) + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + l + " "), n += " } ") : n += " {} ";
                        var u = n;
                        n = d.pop(), n += !e.compositeRule && a ? " validate.errors = [" + u + "]; return false; " : " var err = " + u + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", a && (n += " if (false) { ")
                    } else {
                        if ("ignore" != e.opts.missingRefs) {
                            var f = new Error(h);
                            throw f.missingRef = e.resolve.url(e.baseId, o), f.missingSchema = e.resolve.normalizeId(e.resolve.fullPath(f.missingRef)), f
                        }
                        console.log(h), a && (n += " if (true) { ")
                    }
                } else if ("string" == typeof c)n += "  if (! " + c + "(" + l + ", (dataPath || '')", '""' != e.errorPath && (n += " + " + e.errorPath), n += ") ) { if (vErrors === null) vErrors = " + c + ".errors; else vErrors = vErrors.concat(" + c + ".errors); errors = vErrors.length; } ", a && (n += " else { "); else {
                    var p = e.util.copy(e);
                    p.level++, p.schema = c.schema, p.schemaPath = "", p.errSchemaPath = o;
                    var m = e.validate(p).replace(/validate\.schema/g, c.code);
                    n += " " + m + " ", a && (n += " if (valid" + p.level + ") { ")
                }
            }
            return n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i = " ", n = e.schema[t], r = e.schemaPath + "." + t, o = e.errSchemaPath + "/" + t, s = !e.opts.allErrors, a = e.util.copy(e), l = "";
            a.level++;
            var c = n;
            if (c)for (var h, d = -1, u = c.length - 1; u > d;)h = c[d += 1], e.util.schemaHasRules(h, e.RULES.all) && (a.schema = h, a.schemaPath = r + "[" + d + "]", a.errSchemaPath = o + "/" + d, i += " " + e.validate(a) + "  ", s && (i += " if (valid" + a.level + ") { ", l += "}"));
            return s && (i += " " + l.slice(0, -1)), i = e.util.cleanUpCode(i)
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = "errs__" + r, f = e.util.copy(e), p = "";
            f.level++;
            var m = s.every(function (t) {
                return e.util.schemaHasRules(t, e.RULES.all)
            });
            if (m) {
                n += " var " + u + " = errors; var " + d + " = false;  ";
                var g = e.compositeRule;
                e.compositeRule = f.compositeRule = !0;
                var v = s;
                if (v)for (var w, y = -1, A = v.length - 1; A > y;)w = v[y += 1], f.schema = w, f.schemaPath = a + "[" + y + "]", f.errSchemaPath = l + "/" + y, n += " " + e.validate(f) + " " + d + " = " + d + " || valid" + f.level + "; if (!" + d + ") { ", p += "}";
                e.compositeRule = f.compositeRule = g, n += " " + p + " if (!" + d + ") {  var err =   ", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "anyOf") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: 'should match some schema in anyOf' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ", n += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else {  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; } ", e.opts.allErrors && (n += " } "), n = e.util.cleanUpCode(n)
            } else c && (n += " if (true) { ");
            return n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "errs__" + r, u = e.util.copy(e), f = "";
            u.level++;
            var p = {}, m = {};
            for (y in s) {
                var g = s[y], v = Array.isArray(g) ? m : p;
                v[y] = g
            }
            n += "var " + d + " = errors;";
            var w = e.errorPath;
            n += "var missing" + r + ";";
            for (var y in m) {
                v = m[y], n += " if (" + h + e.util.getProperty(y) + " !== undefined && ( ";
                var A = v;
                if (A)for (var E, C = -1, b = A.length - 1; b > C;) {
                    E = A[C += 1], C && (n += " || ");
                    var F = e.util.getProperty(E);
                    n += " ( " + h + F + " === undefined && (missing" + r + " = " + e.util.toQuotedString(e.opts.jsonPointers ? E : F) + ") ) "
                }
                n += ")) {  ";
                var x = "missing" + r, S = "' + " + x + " + '";
                e.opts._errorDataPathProperty && (e.errorPath = e.opts.jsonPointers ? e.util.getPathExpr(w, x, !0) : w + " + " + x);
                var $ = $ || [];
                $.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "dependencies") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { property: '" + e.util.escapeQuotes(y) + "', missingProperty: '" + S + "', depsCount: " + v.length + ", deps: '" + e.util.escapeQuotes(1 == v.length ? v[0] : v.join(", ")) + "' } ", e.opts.messages !== !1 && (n += " , message: 'should have ", n += 1 == v.length ? "property " + e.util.escapeQuotes(v[0]) : "properties " + e.util.escapeQuotes(v.join(", ")), n += " when property " + e.util.escapeQuotes(y) + " is present' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                var D = n;
                n = $.pop(), n += !e.compositeRule && c ? " validate.errors = [" + D + "]; return false; " : " var err = " + D + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " }   ", c && (f += "}", n += " else { ")
            }
            e.errorPath = w;
            for (var y in p) {
                var g = p[y];
                e.util.schemaHasRules(g, e.RULES.all) && (n += " valid" + u.level + " = true; if (" + h + "['" + y + "'] !== undefined) { ", u.schema = g, u.schemaPath = a + e.util.getProperty(y), u.errSchemaPath = l + "/" + e.util.escapeFragment(y), n += " " + e.validate(u) + " }  ", c && (n += " if (valid" + u.level + ") { ", f += "}"))
            }
            return c && (n += "   " + f + " if (" + d + " == errors) {"), n = e.util.cleanUpCode(n)
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = e.opts.v5 && s.$data, f = u ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            u && (n += " var schema" + r + " = " + f + "; ", f = "schema" + r);
            var p = "i" + r;
            u || (n += " var schema" + r + " = validate.schema" + a + ";"), n += "var " + d + ";", u && (n += " if (schema" + r + " === undefined) " + d + " = true; else if (!Array.isArray(schema" + r + ")) " + d + " = false; else {"), n += "" + d + " = false;for (var " + p + "=0; " + p + "<schema" + r + ".length; " + p + "++) if (equal(" + h + ", schema" + r + "[" + p + "])) { " + d + " = true; break; }", u && (n += "  }  "), n += " if (!" + d + ") {   ";
            var m = m || [];
            m.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "enum") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: 'should be equal to one of values' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var g = n;
            return n = m.pop(), n += !e.compositeRule && c ? " validate.errors = [" + g + "]; return false; " : " var err = " + g + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " }", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || "");
            if (e.opts.format === !1)return c && (n += " if (true) { "), n;
            var d = e.opts.v5 && s.$data, u = d ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            if (d && (n += " var schema" + r + " = " + u + "; ", u = "schema" + r), d) {
                var f = "format" + r;
                n += " var " + f + " = formats[" + u + "]; var isObject" + r + " = typeof " + f + " == 'object' && !(" + f + " instanceof RegExp) && " + f + ".validate; if (isObject" + r + ") " + f + " = " + f + ".validate;   if (  ", d && (n += " (" + u + " !== undefined && typeof " + u + " != 'string') || "), n += " (" + f + " && !(typeof " + f + " == 'function' ? " + f + "(" + h + ") : " + f + ".test(" + h + ")))) {"
            } else {
                var f = e.formats[s];
                if (!f)return c && (n += " if (true) { "), n;
                var p = "object" == typeof f && !(f instanceof RegExp) && f.validate;
                p && (f = f.validate), n += " if (! ";
                var m = "formats" + e.util.getProperty(s);
                p && (m += ".validate"), n += "function" == typeof f ? " " + m + "(" + h + ") " : " " + m + ".test(" + h + ") ", n += ") {"
            }
            var g = g || [];
            g.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "format") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { format:  ', n += d ? "" + u : "" + e.util.toQuotedString(s), n += "  } ", e.opts.messages !== !1 && (n += " , message: 'should match format \"", n += d ? "' + " + u + " + '" : "" + e.util.escapeQuotes(s), n += "\"' "), e.opts.verbose && (n += " , schema:  ", n += d ? "validate.schema" + a : "" + e.util.toQuotedString(s), n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var v = n;
            return n = g.pop(), n += !e.compositeRule && c ? " validate.errors = [" + v + "]; return false; " : " var err = " + v + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } ", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = "errs__" + r, f = e.util.copy(e), p = "";
            f.level++;
            var m = f.dataLevel = e.dataLevel + 1, g = "data" + m;
            if (n += "var " + u + " = errors;var " + d + ";", Array.isArray(s)) {
                var v = e.schema.additionalItems;
                if (v === !1) {
                    n += " " + d + " = " + h + ".length <= " + s.length + "; ";
                    var w = l;
                    l = e.errSchemaPath + "/additionalItems", n += "  if (!" + d + ") {   ";
                    var y = y || [];
                    y.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "additionalItems") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { limit: ' + s.length + " } ", e.opts.messages !== !1 && (n += " , message: 'should NOT have more than " + s.length + " items' "), e.opts.verbose && (n += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                    var A = n;
                    n = y.pop(), n += !e.compositeRule && c ? " validate.errors = [" + A + "]; return false; " : " var err = " + A + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } ", l = w, c && (p += "}", n += " else { ")
                }
                var E = s;
                if (E)for (var C, b = -1, F = E.length - 1; F > b;)if (C = E[b += 1], e.util.schemaHasRules(C, e.RULES.all)) {
                    n += " valid" + f.level + " = true; if (" + h + ".length > " + b + ") { ";
                    var x = h + "[" + b + "]";
                    f.schema = C, f.schemaPath = a + "[" + b + "]", f.errSchemaPath = l + "/" + b, f.errorPath = e.util.getPathExpr(e.errorPath, b, e.opts.jsonPointers, !0), e.opts.v5 && (f.dataPathArr[m] = b);
                    var S = e.validate(f);
                    n += e.util.varOccurences(S, g) < 2 ? " " + e.util.varReplace(S, g, x) + " " : " var " + g + " = " + x + "; " + S + " ", n += " }  ", c && (n += " if (valid" + f.level + ") { ", p += "}")
                }
                if ("object" == typeof v && e.util.schemaHasRules(v, e.RULES.all)) {
                    f.schema = v, f.schemaPath = e.schemaPath + ".additionalItems", f.errSchemaPath = e.errSchemaPath + "/additionalItems", n += " valid" + f.level + " = true; if (" + h + ".length > " + s.length + ") {  for (var i" + r + " = " + s.length + "; i" + r + " < " + h + ".length; i" + r + "++) { ", f.errorPath = e.util.getPathExpr(e.errorPath, "i" + r, e.opts.jsonPointers, !0);
                    var x = h + "[i" + r + "]";
                    e.opts.v5 && (f.dataPathArr[m] = "i" + r);
                    var S = e.validate(f);
                    n += e.util.varOccurences(S, g) < 2 ? " " + e.util.varReplace(S, g, x) + " " : " var " + g + " = " + x + "; " + S + " ", c && (n += " if (!valid" + f.level + ") break; "), n += " } }  ", c && (n += " if (valid" + f.level + ") { ", p += "}")
                }
            } else if (e.util.schemaHasRules(s, e.RULES.all)) {
                f.schema = s, f.schemaPath = a, f.errSchemaPath = l, n += "  for (var i" + r + " = 0; i" + r + " < " + h + ".length; i" + r + "++) { ", f.errorPath = e.util.getPathExpr(e.errorPath, "i" + r, e.opts.jsonPointers, !0);
                var x = h + "[i" + r + "]";
                e.opts.v5 && (f.dataPathArr[m] = "i" + r);
                var S = e.validate(f);
                n += e.util.varOccurences(S, g) < 2 ? " " + e.util.varReplace(S, g, x) + " " : " var " + g + " = " + x + "; " + S + " ", c && (n += " if (!valid" + f.level + ") break; "), n += " }  ", c && (n += " if (valid" + f.level + ") { ", p += "}")
            }
            return c && (n += " " + p + " if (" + u + " == errors) {"), n = e.util.cleanUpCode(n)
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = e.opts.v5 && s.$data, u = d ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            d && (n += " var schema" + r + " = " + u + "; ", u = "schema" + r);
            var f = "maximum" == t, p = f ? "exclusiveMaximum" : "exclusiveMinimum", m = e.schema[p], g = e.opts.v5 && m && m.$data, v = f ? "<" : ">", w = f ? ">" : "<";
            if (g) {
                var y = e.util.getData(m.$data, o, e.dataPathArr), A = "exclusive" + r, E = "op" + r, C = "' + " + E + " + '";
                n += " var schemaExcl" + r + " = " + y + "; ", y = "schemaExcl" + r, n += " var exclusive" + r + "; if (typeof " + y + " != 'boolean' && typeof " + y + " != 'undefined') { ";
                var i = p, b = b || [];
                b.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "_exclusiveLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: '" + p + " should be boolean' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                var F = n;
                n = b.pop(), n += !e.compositeRule && c ? " validate.errors = [" + F + "]; return false; " : " var err = " + F + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } else if( ", d && (n += " (" + u + " !== undefined && typeof " + u + " != 'number') || "), n += " ((exclusive" + r + " = " + y + " === true) ? " + h + " " + w + "= " + u + " : " + h + " " + w + " " + u + ")) { var op" + r + " = exclusive" + r + " ? '" + v + "' : '" + v + "=';"
            } else {
                var A = m === !0, C = v;
                A || (C += "=");
                var E = "'" + C + "'";
                n += " if ( ", d && (n += " (" + u + " !== undefined && typeof " + u + " != 'number') || "), n += " " + h + " " + w, A && (n += "="), n += " " + u + ") {"
            }
            var i = t, b = b || [];
            b.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "_limit") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { comparison: ' + E + ", limit: " + u + ", exclusive: " + A + " } ", e.opts.messages !== !1 && (n += " , message: 'should be " + C + " ", n += d ? "' + " + u : "" + s + "'"), e.opts.verbose && (n += " , schema:  ", n += d ? "validate.schema" + a : "" + s, n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var F = n;
            return n = b.pop(), n += !e.compositeRule && c ? " validate.errors = [" + F + "]; return false; " : " var err = " + F + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } ", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = e.opts.v5 && s.$data, u = d ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            d && (n += " var schema" + r + " = " + u + "; ", u = "schema" + r);
            var f = "maxItems" == t ? ">" : "<";
            n += "if ( ", d && (n += " (" + u + " !== undefined && typeof " + u + " != 'number') || "), n += " " + h + ".length " + f + " " + u + ") { ";
            var i = t, p = p || [];
            p.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "_limitItems") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { limit: ' + u + " } ", e.opts.messages !== !1 && (n += " , message: 'should NOT have ", n += "maxItems" == t ? "more" : "less", n += " than ", n += d ? "' + " + u + " + '" : "" + s, n += " items' "), e.opts.verbose && (n += " , schema:  ", n += d ? "validate.schema" + a : "" + s, n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var m = n;
            return n = p.pop(), n += !e.compositeRule && c ? " validate.errors = [" + m + "]; return false; " : " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += "} ", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = e.opts.v5 && s.$data, u = d ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            d && (n += " var schema" + r + " = " + u + "; ", u = "schema" + r);
            var f = "maxLength" == t ? ">" : "<";
            n += "if ( ", d && (n += " (" + u + " !== undefined && typeof " + u + " != 'number') || "), n += e.opts.unicode === !1 ? " " + h + ".length " : " ucs2length(" + h + ") ", n += " " + f + " " + u + ") { ";
            var i = t, p = p || [];
            p.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "_limitLength") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { limit: ' + u + " } ", e.opts.messages !== !1 && (n += " , message: 'should NOT be ", n += "maxLength" == t ? "longer" : "shorter", n += " than ", n += d ? "' + " + u + " + '" : "" + s, n += " characters' "), e.opts.verbose && (n += " , schema:  ", n += d ? "validate.schema" + a : "" + s, n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var m = n;
            return n = p.pop(), n += !e.compositeRule && c ? " validate.errors = [" + m + "]; return false; " : " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += "} ", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = e.opts.v5 && s.$data, u = d ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            d && (n += " var schema" + r + " = " + u + "; ", u = "schema" + r);
            var f = "maxProperties" == t ? ">" : "<";
            n += "if ( ", d && (n += " (" + u + " !== undefined && typeof " + u + " != 'number') || "), n += " Object.keys(" + h + ").length " + f + " " + u + ") { ";
            var i = t, p = p || [];
            p.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "_limitProperties") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { limit: ' + u + " } ", e.opts.messages !== !1 && (n += " , message: 'should NOT have ", n += "maxProperties" == t ? "more" : "less", n += " than ", n += d ? "' + " + u + " + '" : "" + s, n += " properties' "), e.opts.verbose && (n += " , schema:  ", n += d ? "validate.schema" + a : "" + s, n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var m = n;
            return n = p.pop(), n += !e.compositeRule && c ? " validate.errors = [" + m + "]; return false; " : " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += "} ", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = e.opts.v5 && s.$data, u = d ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            d && (n += " var schema" + r + " = " + u + "; ", u = "schema" + r), n += "var division" + r + ";if (", d && (n += " " + u + " !== undefined && ( typeof " + u + " != 'number' || "), n += " (division" + r + " = " + h + " / " + u + ", ", n += e.opts.multipleOfPrecision ? " Math.abs(Math.round(division" + r + ") - division" + r + ") > 1e-" + e.opts.multipleOfPrecision + " " : " division" + r + " !== parseInt(division" + r + ") ", n += " ) ", d && (n += "  )  "), n += " ) {   ";
            var f = f || [];
            f.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "multipleOf") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { multipleOf: ' + u + " } ", e.opts.messages !== !1 && (n += " , message: 'should be multiple of ", n += d ? "' + " + u : "" + s + "'"), e.opts.verbose && (n += " , schema:  ", n += d ? "validate.schema" + a : "" + s, n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var p = n;
            return n = f.pop(), n += !e.compositeRule && c ? " validate.errors = [" + p + "]; return false; " : " var err = " + p + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += "} ", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "errs__" + r, u = e.util.copy(e);
            if (u.level++, e.util.schemaHasRules(s, e.RULES.all)) {
                u.schema = s, u.schemaPath = a, u.errSchemaPath = l, n += " var " + d + " = errors;  ";
                var f = e.compositeRule;
                e.compositeRule = u.compositeRule = !0, u.createErrors = !1, n += " " + e.validate(u) + " ", u.createErrors = !0, e.compositeRule = u.compositeRule = f, n += " if (valid" + u.level + ") {   ";
                var p = p || [];
                p.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "not") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: 'should NOT be valid' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                var m = n;
                n = p.pop(), n += !e.compositeRule && c ? " validate.errors = [" + m + "]; return false; " : " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } else {  errors = " + d + "; if (vErrors !== null) { if (" + d + ") vErrors.length = " + d + "; else vErrors = null; } ", e.opts.allErrors && (n += " } ")
            } else n += "  var err =   ", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "not") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: 'should NOT be valid' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ", n += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", c && (n += " if (false) { ");
            return n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = "errs__" + r, f = e.util.copy(e), p = "";
            f.level++, n += "var " + u + " = errors;var prevValid" + r + " = false;var " + d + " = false; ";
            var m = e.compositeRule;
            e.compositeRule = f.compositeRule = !0;
            var g = s;
            if (g)for (var v, w = -1, y = g.length - 1; y > w;)v = g[w += 1], e.util.schemaHasRules(v, e.RULES.all) ? (f.schema = v, f.schemaPath = a + "[" + w + "]", f.errSchemaPath = l + "/" + w, n += " " + e.validate(f) + " ") : n += " var valid" + f.level + " = true; ", w && (n += " if (valid" + f.level + " && prevValid" + r + ") " + d + " = false; else { ", p += "}"), n += " if (valid" + f.level + ") " + d + " = prevValid" + r + " = true;";
            e.compositeRule = f.compositeRule = m, n += "" + p + "if (!" + d + ") {   ";
            var A = A || [];
            A.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "oneOf") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: {} ', e.opts.messages !== !1 && (n += " , message: 'should match exactly one schema in oneOf' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var E = n;
            return n = A.pop(), n += !e.compositeRule && c ? " validate.errors = [" + E + "]; return false; " : " var err = " + E + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += "} else {  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; }", e.opts.allErrors && (n += " } "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = e.opts.v5 && s.$data, u = d ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            d && (n += " var schema" + r + " = " + u + "; ", u = "schema" + r);
            var f = d ? "(new RegExp(" + u + "))" : e.usePattern(s);
            n += "if ( ", d && (n += " (" + u + " !== undefined && typeof " + u + " != 'string') || "), n += " !" + f + ".test(" + h + ") ) {   ";
            var p = p || [];
            p.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "pattern") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { pattern:  ', n += d ? "" + u : "" + e.util.toQuotedString(s), n += "  } ", e.opts.messages !== !1 && (n += " , message: 'should match pattern \"", n += d ? "' + " + u + " + '" : "" + e.util.escapeQuotes(s), n += "\"' "), e.opts.verbose && (n += " , schema:  ", n += d ? "validate.schema" + a : "" + e.util.toQuotedString(s), n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
            var m = n;
            return n = p.pop(), n += !e.compositeRule && c ? " validate.errors = [" + m + "]; return false; " : " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += "} ", c && (n += " else { "), n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = "errs__" + r, f = e.util.copy(e), p = "";
            f.level++;
            var m = f.dataLevel = e.dataLevel + 1, g = "data" + m, v = Object.keys(s || {}), w = e.schema.patternProperties || {}, y = Object.keys(w), A = e.schema.additionalProperties, E = v.length || y.length, C = A === !1, b = "object" == typeof A && Object.keys(A).length, F = e.opts.removeAdditional, x = C || b || F, S = e.schema.required;
            if (S && (!e.opts.v5 || !S.$data) && S.length < e.opts.loopRequired)var $ = e.util.toHash(S);
            if (e.opts.v5)var D = e.schema.patternGroups || {}, k = Object.keys(D);
            if (n += "var " + u + " = errors;var valid" + f.level + " = true;", x) {
                if (n += " for (var key" + r + " in " + h + ") { ", E) {
                    if (n += " var isAdditional" + r + " = !(false ", v.length)if (v.length > 5)n += " || validate.schema" + a + "[key" + r + "] "; else {
                        var B = v;
                        if (B)for (var _, L = -1, R = B.length - 1; R > L;)_ = B[L += 1], n += " || key" + r + " == " + e.util.toQuotedString(_) + " "
                    }
                    if (y.length) {
                        var T = y;
                        if (T)for (var M, P = -1, O = T.length - 1; O > P;)M = T[P += 1], n += " || " + e.usePattern(M) + ".test(key" + r + ") "
                    }
                    if (e.opts.v5 && k && k.length) {
                        var N = k;
                        if (N)for (var I, P = -1, j = N.length - 1; j > P;)I = N[P += 1], n += " || " + e.usePattern(I) + ".test(key" + r + ") "
                    }
                    n += " ); if (isAdditional" + r + ") { "
                }
                if ("all" == F)n += " delete " + h + "[key" + r + "]; "; else {
                    var W = e.errorPath, H = "' + key" + r + " + '";
                    if (e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(e.errorPath, "key" + r, e.opts.jsonPointers)), C)if (F)n += " delete " + h + "[key" + r + "]; "; else {
                        n += " valid" + f.level + " = false; ";
                        var V = l;
                        l = e.errSchemaPath + "/additionalProperties";
                        var z = z || [];
                        z.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "additionalProperties") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { additionalProperty: '" + H + "' } ", e.opts.messages !== !1 && (n += " , message: 'should NOT have additional properties' "), e.opts.verbose && (n += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                        var U = n;
                        n = z.pop(), n += !e.compositeRule && c ? " validate.errors = [" + U + "]; return false; " : " var err = " + U + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", l = V, c && (n += " break; ")
                    } else if (b)if ("failing" == F) {
                        n += " var " + u + " = errors;  ";
                        var K = e.compositeRule;
                        e.compositeRule = f.compositeRule = !0, f.schema = A, f.schemaPath = e.schemaPath + ".additionalProperties", f.errSchemaPath = e.errSchemaPath + "/additionalProperties", f.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, "key" + r, e.opts.jsonPointers);
                        var q = h + "[key" + r + "]";
                        e.opts.v5 && (f.dataPathArr[m] = "key" + r);
                        var G = e.validate(f);
                        n += e.util.varOccurences(G, g) < 2 ? " " + e.util.varReplace(G, g, q) + " " : " var " + g + " = " + q + "; " + G + " ", n += " if (!valid" + f.level + ") { errors = " + u + "; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete " + h + "[key" + r + "]; }  ", e.compositeRule = f.compositeRule = K
                    } else {
                        f.schema = A, f.schemaPath = e.schemaPath + ".additionalProperties", f.errSchemaPath = e.errSchemaPath + "/additionalProperties", f.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, "key" + r, e.opts.jsonPointers);
                        var q = h + "[key" + r + "]";
                        e.opts.v5 && (f.dataPathArr[m] = "key" + r);
                        var G = e.validate(f);
                        n += e.util.varOccurences(G, g) < 2 ? " " + e.util.varReplace(G, g, q) + " " : " var " + g + " = " + q + "; " + G + " ", c && (n += " if (!valid" + f.level + ") break; ")
                    }
                    e.errorPath = W
                }
                E && (n += " } "), n += " }  ", c && (n += " if (valid" + f.level + ") { ", p += "}")
            }
            var J = e.opts.useDefaults && !e.compositeRule;
            if (v.length) {
                var Q = v;
                if (Q)for (var _, Y = -1, X = Q.length - 1; X > Y;) {
                    _ = Q[Y += 1];
                    var Z = s[_];
                    if (e.util.schemaHasRules(Z, e.RULES.all)) {
                        var ee = e.util.getProperty(_), q = h + ee, te = J && void 0 !== Z["default"];
                        f.schema = Z, f.schemaPath = a + ee, f.errSchemaPath = l + "/" + e.util.escapeFragment(_), f.errorPath = e.util.getPath(e.errorPath, _, e.opts.jsonPointers), e.opts.v5 && (f.dataPathArr[m] = e.util.toQuotedString(_));
                        var G = e.validate(f);
                        if (e.util.varOccurences(G, g) < 2) {
                            G = e.util.varReplace(G, g, q);
                            var ie = q
                        } else {
                            var ie = g;
                            n += " var " + g + " = " + q + "; "
                        }
                        if (te)n += " " + G + " "; else {
                            if ($ && $[_]) {
                                n += " if (" + ie + " === undefined) { valid" + f.level + " = false; ";
                                var W = e.errorPath, V = l, ne = e.util.escapeQuotes(_);
                                e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(W, _, e.opts.jsonPointers)), l = e.errSchemaPath + "/required";
                                var z = z || [];
                                z.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "required") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { missingProperty: '" + ne + "' } ", e.opts.messages !== !1 && (n += " , message: '", n += e.opts._errorDataPathProperty ? "is a required property" : "should have required property \\'" + ne + "\\'", n += "' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                                var U = n;
                                n = z.pop(), n += !e.compositeRule && c ? " validate.errors = [" + U + "]; return false; " : " var err = " + U + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", l = V, e.errorPath = W, n += " } else { "
                            } else n += c ? " if (" + ie + " === undefined) { valid" + f.level + " = true; } else { " : " if (" + ie + " !== undefined) { ";
                            n += " " + G + " } "
                        }
                    }
                    c && (n += " if (valid" + f.level + ") { ", p += "}")
                }
            }
            var re = y;
            if (re)for (var M, oe = -1, se = re.length - 1; se > oe;) {
                M = re[oe += 1];
                var Z = w[M];
                if (e.util.schemaHasRules(Z, e.RULES.all)) {
                    f.schema = Z, f.schemaPath = e.schemaPath + ".patternProperties" + e.util.getProperty(M), f.errSchemaPath = e.errSchemaPath + "/patternProperties/" + e.util.escapeFragment(M), n += " for (var key" + r + " in " + h + ") { if (" + e.usePattern(M) + ".test(key" + r + ")) { ", f.errorPath = e.util.getPathExpr(e.errorPath, "key" + r, e.opts.jsonPointers);
                    var q = h + "[key" + r + "]";
                    e.opts.v5 && (f.dataPathArr[m] = "key" + r);
                    var G = e.validate(f);
                    n += e.util.varOccurences(G, g) < 2 ? " " + e.util.varReplace(G, g, q) + " " : " var " + g + " = " + q + "; " + G + " ", c && (n += " if (!valid" + f.level + ") break; "), n += " } ", c && (n += " else valid" + f.level + " = true; "), n += " }  ", c && (n += " if (valid" + f.level + ") { ", p += "}")
                }
            }
            if (e.opts.v5) {
                var ae = k;
                if (ae)for (var I, le = -1, ce = ae.length - 1; ce > le;) {
                    I = ae[le += 1];
                    var he = D[I], Z = he.schema;
                    if (e.util.schemaHasRules(Z, e.RULES.all)) {
                        f.schema = Z, f.schemaPath = e.schemaPath + ".patternGroups" + e.util.getProperty(I) + ".schema", f.errSchemaPath = e.errSchemaPath + "/patternGroups/" + e.util.escapeFragment(I) + "/schema", n += " var pgPropCount" + r + " = 0; for (var key" + r + " in " + h + ") { if (" + e.usePattern(I) + ".test(key" + r + ")) { pgPropCount" + r + "++; ", f.errorPath = e.util.getPathExpr(e.errorPath, "key" + r, e.opts.jsonPointers);
                        var q = h + "[key" + r + "]";
                        e.opts.v5 && (f.dataPathArr[m] = "key" + r);
                        var G = e.validate(f);
                        n += e.util.varOccurences(G, g) < 2 ? " " + e.util.varReplace(G, g, q) + " " : " var " + g + " = " + q + "; " + G + " ", c && (n += " if (!valid" + f.level + ") break; "), n += " } ", c && (n += " else valid" + f.level + " = true; "), n += " }  ", c && (n += " if (valid" + f.level + ") { ", p += "}");
                        var de = he.minimum, ue = he.maximum;
                        if (void 0 !== de || void 0 !== ue) {
                            n += " var " + d + " = true; ";
                            var V = l;
                            if (void 0 !== de) {
                                var fe = de, pe = "minimum", me = "less";
                                n += " " + d + " = pgPropCount" + r + " >= " + de + "; ", l = e.errSchemaPath + "/patternGroups/minimum", n += "  if (!" + d + ") {   ";
                                var z = z || [];
                                z.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "patternGroups") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { reason: '" + pe + "', limit: " + fe + ", pattern: '" + e.util.escapeQuotes(I) + "' } ", e.opts.messages !== !1 && (n += " , message: 'should NOT have " + me + " than " + fe + ' properties matching pattern "' + e.util.escapeQuotes(I) + "\"' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                                var U = n;
                                n = z.pop(), n += !e.compositeRule && c ? " validate.errors = [" + U + "]; return false; " : " var err = " + U + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } ", void 0 !== ue && (n += " else ")
                            }
                            if (void 0 !== ue) {
                                var fe = ue, pe = "maximum", me = "more";
                                n += " " + d + " = pgPropCount" + r + " <= " + ue + "; ", l = e.errSchemaPath + "/patternGroups/maximum", n += "  if (!" + d + ") {   ";
                                var z = z || [];
                                z.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "patternGroups") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { reason: '" + pe + "', limit: " + fe + ", pattern: '" + e.util.escapeQuotes(I) + "' } ", e.opts.messages !== !1 && (n += " , message: 'should NOT have " + me + " than " + fe + ' properties matching pattern "' + e.util.escapeQuotes(I) + "\"' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                                var U = n;
                                n = z.pop(), n += !e.compositeRule && c ? " validate.errors = [" + U + "]; return false; " : " var err = " + U + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",
                                    n += " } "
                            }
                            l = V, c && (n += " if (" + d + ") { ", p += "}")
                        }
                    }
                }
            }
            return c && (n += " " + p + " if (" + u + " == errors) {"), n = e.util.cleanUpCode(n)
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = e.opts.v5 && s.$data, f = u ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            if (u && (n += " var schema" + r + " = " + f + "; ", f = "schema" + r), !u)if (s.length < e.opts.loopRequired && e.schema.properties && Object.keys(e.schema.properties).length) {
                var p = [], m = s;
                if (m)for (var g, v = -1, w = m.length - 1; w > v;) {
                    g = m[v += 1];
                    var y = e.schema.properties[g];
                    y && e.util.schemaHasRules(y, e.RULES.all) || (p[p.length] = g)
                }
            } else var p = s;
            if (u || p.length) {
                var A = e.errorPath, E = u || p.length >= e.opts.loopRequired;
                if (c)if (n += " var missing" + r + "; ", E) {
                    u || (n += " var schema" + r + " = validate.schema" + a + "; ");
                    var C = "i" + r, b = "schema" + r + "[" + C + "]", F = "' + " + b + " + '";
                    e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(A, b, e.opts.jsonPointers)), n += " var " + d + " = true; ", u && (n += " if (schema" + r + " === undefined) " + d + " = true; else if (!Array.isArray(schema" + r + ")) " + d + " = false; else {"), n += " for (var " + C + " = 0; " + C + " < schema" + r + ".length; " + C + "++) { " + d + " = " + h + "[schema" + r + "[" + C + "]] !== undefined; if (!" + d + ") break; } ", u && (n += "  }  "), n += "  if (!" + d + ") {   ";
                    var x = x || [];
                    x.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "required") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { missingProperty: '" + F + "' } ", e.opts.messages !== !1 && (n += " , message: '", n += e.opts._errorDataPathProperty ? "is a required property" : "should have required property \\'" + F + "\\'", n += "' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                    var S = n;
                    n = x.pop(), n += !e.compositeRule && c ? " validate.errors = [" + S + "]; return false; " : " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } else { "
                } else {
                    n += " if ( ";
                    var $ = p;
                    if ($)for (var D, C = -1, k = $.length - 1; k > C;) {
                        D = $[C += 1], C && (n += " || ");
                        var B = e.util.getProperty(D);
                        n += " ( " + h + B + " === undefined && (missing" + r + " = " + e.util.toQuotedString(e.opts.jsonPointers ? D : B) + ") ) "
                    }
                    n += ") {  ";
                    var b = "missing" + r, F = "' + " + b + " + '";
                    e.opts._errorDataPathProperty && (e.errorPath = e.opts.jsonPointers ? e.util.getPathExpr(A, b, !0) : A + " + " + b);
                    var x = x || [];
                    x.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "required") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { missingProperty: '" + F + "' } ", e.opts.messages !== !1 && (n += " , message: '", n += e.opts._errorDataPathProperty ? "is a required property" : "should have required property \\'" + F + "\\'", n += "' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                    var S = n;
                    n = x.pop(), n += !e.compositeRule && c ? " validate.errors = [" + S + "]; return false; " : " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } else { "
                } else if (E) {
                    u || (n += " var schema" + r + " = validate.schema" + a + "; ");
                    var C = "i" + r, b = "schema" + r + "[" + C + "]", F = "' + " + b + " + '";
                    e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(A, b, e.opts.jsonPointers)), u && (n += " if (schema" + r + " && !Array.isArray(schema" + r + ")) {  var err =   ", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "required") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { missingProperty: '" + F + "' } ", e.opts.messages !== !1 && (n += " , message: '", n += e.opts._errorDataPathProperty ? "is a required property" : "should have required property \\'" + F + "\\'", n += "' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ", n += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (schema" + r + " !== undefined) { "), n += " for (var " + C + " = 0; " + C + " < schema" + r + ".length; " + C + "++) { if (" + h + "[schema" + r + "[" + C + "]] === undefined) {  var err =   ", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "required") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { missingProperty: '" + F + "' } ", e.opts.messages !== !1 && (n += " , message: '", n += e.opts._errorDataPathProperty ? "is a required property" : "should have required property \\'" + F + "\\'", n += "' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ", n += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ", u && (n += "  }  ")
                } else {
                    var _ = p;
                    if (_)for (var g, C = -1, L = _.length - 1; L > C;) {
                        g = _[C += 1];
                        var B = e.util.getProperty(g), F = e.util.escapeQuotes(g);
                        e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(A, g, e.opts.jsonPointers)), n += " if (" + h + B + " === undefined) {  var err =   ", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "required") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + "\" , params: { missingProperty: '" + F + "' } ", e.opts.messages !== !1 && (n += " , message: '", n += e.opts._errorDataPathProperty ? "is a required property" : "should have required property \\'" + F + "\\'", n += "' "), e.opts.verbose && (n += " , schema: validate.schema" + a + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ", n += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } "
                    }
                }
                e.errorPath = A
            } else c && (n += " if (true) {");
            return n
        }
    }, function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i, n = " ", r = e.level, o = e.dataLevel, s = e.schema[t], a = e.schemaPath + "." + t, l = e.errSchemaPath + "/" + t, c = !e.opts.allErrors, h = "data" + (o || ""), d = "valid" + r, u = e.opts.v5 && s.$data, f = u ? e.util.getData(s.$data, o, e.dataPathArr) : s;
            if (u && (n += " var schema" + r + " = " + f + "; ", f = "schema" + r), (s || u) && e.opts.uniqueItems !== !1) {
                u && (n += " var " + d + "; if (" + f + " === false || " + f + " === undefined) " + d + " = true; else if (typeof " + f + " != 'boolean') " + d + " = false; else { "), n += " var " + d + " = true; if (" + h + ".length > 1) { var i = " + h + ".length, j; outer: for (;i--;) { for (j = i; j--;) { if (equal(" + h + "[i], " + h + "[j])) { " + d + " = false; break outer; } } } } ", u && (n += "  }  "), n += " if (!" + d + ") {   ";
                var p = p || [];
                p.push(n), n = "", e.createErrors !== !1 ? (n += " { keyword: '" + (i || "uniqueItems") + "' , dataPath: (dataPath || '') + " + e.errorPath + ' , schemaPath: "' + l + '" , params: { i: i, j: j } ', e.opts.messages !== !1 && (n += " , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' "), e.opts.verbose && (n += " , schema:  ", n += u ? "validate.schema" + a : "" + s, n += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + h + " "), n += " } ") : n += " {} ";
                var m = n;
                n = p.pop(), n += !e.compositeRule && c ? " validate.errors = [" + m + "]; return false; " : " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", n += " } ", c && (n += " else { ")
            } else c && (n += " if (true) { ");
            return n
        }
    }, function (e, t, i) {
        t.parse = i(61), t.stringify = i(62)
    }, function (e, t, i) {
        e.exports = function () {
            throw new Error("define cannot be used indirect")
        }
    }, function (e, t, i) {
        (function (t) {
            function i() {
                if (t.Blob)try {
                    return new Blob(["asdf"], {type: "text/plain"}), Blob
                } catch (e) {
                }
                var i = t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder;
                return function (e, t) {
                    var n = new i, r = t.endings, o = t.type;
                    if (r)for (var s = 0, a = e.length; a > s; ++s)n.append(e[s], r); else for (var s = 0, a = e.length; a > s; ++s)n.append(e[s]);
                    return o ? n.getBlob(o) : n.getBlob()
                }
            }

            e.exports = i()
        }).call(t, function () {
            return this
        }())
    }, function (e, t, i) {
        var n;
        (function (e, r) {
            !function (o) {
                function s(e) {
                    throw RangeError(L[e])
                }

                function a(e, t) {
                    for (var i = e.length, n = []; i--;)n[i] = t(e[i]);
                    return n
                }

                function l(e, t) {
                    var i = e.split("@"), n = "";
                    i.length > 1 && (n = i[0] + "@", e = i[1]), e = e.replace(_, ".");
                    var r = e.split("."), o = a(r, t).join(".");
                    return n + o
                }

                function c(e) {
                    for (var t, i, n = [], r = 0, o = e.length; o > r;)t = e.charCodeAt(r++), t >= 55296 && 56319 >= t && o > r ? (i = e.charCodeAt(r++), 56320 == (64512 & i) ? n.push(((1023 & t) << 10) + (1023 & i) + 65536) : (n.push(t), r--)) : n.push(t);
                    return n
                }

                function h(e) {
                    return a(e, function (e) {
                        var t = "";
                        return e > 65535 && (e -= 65536, t += M(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += M(e)
                    }).join("")
                }

                function d(e) {
                    return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : E
                }

                function u(e, t) {
                    return e + 22 + 75 * (26 > e) - ((0 != t) << 5)
                }

                function f(e, t, i) {
                    var n = 0;
                    for (e = i ? T(e / x) : e >> 1, e += T(e / t); e > R * b >> 1; n += E)e = T(e / R);
                    return T(n + (R + 1) * e / (e + F))
                }

                function p(e) {
                    var t, i, n, r, o, a, l, c, u, p, m = [], g = e.length, v = 0, w = $, y = S;
                    for (i = e.lastIndexOf(D), 0 > i && (i = 0), n = 0; i > n; ++n)e.charCodeAt(n) >= 128 && s("not-basic"), m.push(e.charCodeAt(n));
                    for (r = i > 0 ? i + 1 : 0; g > r;) {
                        for (o = v, a = 1, l = E; r >= g && s("invalid-input"), c = d(e.charCodeAt(r++)), (c >= E || c > T((A - v) / a)) && s("overflow"), v += c * a, u = y >= l ? C : l >= y + b ? b : l - y, !(u > c); l += E)p = E - u, a > T(A / p) && s("overflow"), a *= p;
                        t = m.length + 1, y = f(v - o, t, 0 == o), T(v / t) > A - w && s("overflow"), w += T(v / t), v %= t, m.splice(v++, 0, w)
                    }
                    return h(m)
                }

                function m(e) {
                    var t, i, n, r, o, a, l, h, d, p, m, g, v, w, y, F = [];
                    for (e = c(e), g = e.length, t = $, i = 0, o = S, a = 0; g > a; ++a)m = e[a], 128 > m && F.push(M(m));
                    for (n = r = F.length, r && F.push(D); g > n;) {
                        for (l = A, a = 0; g > a; ++a)m = e[a], m >= t && l > m && (l = m);
                        for (v = n + 1, l - t > T((A - i) / v) && s("overflow"), i += (l - t) * v, t = l, a = 0; g > a; ++a)if (m = e[a], t > m && ++i > A && s("overflow"), m == t) {
                            for (h = i, d = E; p = o >= d ? C : d >= o + b ? b : d - o, !(p > h); d += E)y = h - p, w = E - p, F.push(M(u(p + y % w, 0))), h = T(y / w);
                            F.push(M(u(h, 0))), o = f(i, v, n == r), i = 0, ++n
                        }
                        ++i, ++t
                    }
                    return F.join("")
                }

                function g(e) {
                    return l(e, function (e) {
                        return k.test(e) ? p(e.slice(4).toLowerCase()) : e
                    })
                }

                function v(e) {
                    return l(e, function (e) {
                        return B.test(e) ? "xn--" + m(e) : e
                    })
                }

                var w = ("object" == typeof t && t && !t.nodeType && t, "object" == typeof e && e && !e.nodeType && e, "object" == typeof r && r);
                (w.global === w || w.window === w || w.self === w) && (o = w);
                var y, A = 2147483647, E = 36, C = 1, b = 26, F = 38, x = 700, S = 72, $ = 128, D = "-", k = /^xn--/, B = /[^\x20-\x7E]/, _ = /[\x2E\u3002\uFF0E\uFF61]/g, L = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, R = E - C, T = Math.floor, M = String.fromCharCode;
                y = {
                    version: "1.3.2",
                    ucs2: {decode: c, encode: h},
                    decode: p,
                    encode: m,
                    toASCII: v,
                    toUnicode: g
                }, n = function () {
                    return y
                }.call(t, i, t, e), !(void 0 !== n && (e.exports = n))
            }(this)
        }).call(t, i(64)(e), function () {
            return this
        }())
    }, function (e, t, i) {
        var n, r, o, s, a = {
            '"': '"',
            "\\": "\\",
            "/": "/",
            b: "\b",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "	"
        }, l = function (e) {
            throw{name: "SyntaxError", message: e, at: n, text: o}
        }, c = function (e) {
            return e && e !== r && l("Expected '" + e + "' instead of '" + r + "'"), r = o.charAt(n), n += 1, r
        }, h = function () {
            var e, t = "";
            for ("-" === r && (t = "-", c("-")); r >= "0" && "9" >= r;)t += r, c();
            if ("." === r)for (t += "."; c() && r >= "0" && "9" >= r;)t += r;
            if ("e" === r || "E" === r)for (t += r, c(), ("-" === r || "+" === r) && (t += r, c()); r >= "0" && "9" >= r;)t += r, c();
            return e = +t, isFinite(e) ? e : void l("Bad number")
        }, d = function () {
            var e, t, i, n = "";
            if ('"' === r)for (; c();) {
                if ('"' === r)return c(), n;
                if ("\\" === r)if (c(), "u" === r) {
                    for (i = 0, t = 0; 4 > t && (e = parseInt(c(), 16), isFinite(e)); t += 1)i = 16 * i + e;
                    n += String.fromCharCode(i)
                } else {
                    if ("string" != typeof a[r])break;
                    n += a[r]
                } else n += r
            }
            l("Bad string")
        }, u = function () {
            for (; r && " " >= r;)c()
        }, f = function () {
            switch (r) {
                case"t":
                    return c("t"), c("r"), c("u"), c("e"), !0;
                case"f":
                    return c("f"), c("a"), c("l"), c("s"), c("e"), !1;
                case"n":
                    return c("n"), c("u"), c("l"), c("l"), null
            }
            l("Unexpected '" + r + "'")
        }, p = function () {
            var e = [];
            if ("[" === r) {
                if (c("["), u(), "]" === r)return c("]"), e;
                for (; r;) {
                    if (e.push(s()), u(), "]" === r)return c("]"), e;
                    c(","), u()
                }
            }
            l("Bad array")
        }, m = function () {
            var e, t = {};
            if ("{" === r) {
                if (c("{"), u(), "}" === r)return c("}"), t;
                for (; r;) {
                    if (e = d(), u(), c(":"), Object.hasOwnProperty.call(t, e) && l('Duplicate key "' + e + '"'), t[e] = s(), u(), "}" === r)return c("}"), t;
                    c(","), u()
                }
            }
            l("Bad object")
        };
        s = function () {
            switch (u(), r) {
                case"{":
                    return m();
                case"[":
                    return p();
                case'"':
                    return d();
                case"-":
                    return h();
                default:
                    return r >= "0" && "9" >= r ? h() : f()
            }
        }, e.exports = function (e, t) {
            var i;
            return o = e, n = 0, r = " ", i = s(), u(), r && l("Syntax error"), "function" == typeof t ? function a(e, i) {
                var n, r, o = e[i];
                if (o && "object" == typeof o)for (n in o)Object.prototype.hasOwnProperty.call(o, n) && (r = a(o, n), void 0 !== r ? o[n] = r : delete o[n]);
                return t.call(e, i, o)
            }({"": i}, "") : i
        }
    }, function (e, t, i) {
        function n(e) {
            return l.lastIndex = 0, l.test(e) ? '"' + e.replace(l, function (e) {
                var t = c[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function r(e, t) {
            var i, l, c, h, d, u = o, f = t[e];
            switch (f && "object" == typeof f && "function" == typeof f.toJSON && (f = f.toJSON(e)), "function" == typeof a && (f = a.call(t, e, f)), typeof f) {
                case"string":
                    return n(f);
                case"number":
                    return isFinite(f) ? String(f) : "null";
                case"boolean":
                case"null":
                    return String(f);
                case"object":
                    if (!f)return "null";
                    if (o += s, d = [], "[object Array]" === Object.prototype.toString.apply(f)) {
                        for (h = f.length, i = 0; h > i; i += 1)d[i] = r(i, f) || "null";
                        return c = 0 === d.length ? "[]" : o ? "[\n" + o + d.join(",\n" + o) + "\n" + u + "]" : "[" + d.join(",") + "]", o = u, c
                    }
                    if (a && "object" == typeof a)for (h = a.length, i = 0; h > i; i += 1)l = a[i], "string" == typeof l && (c = r(l, f), c && d.push(n(l) + (o ? ": " : ":") + c)); else for (l in f)Object.prototype.hasOwnProperty.call(f, l) && (c = r(l, f), c && d.push(n(l) + (o ? ": " : ":") + c));
                    return c = 0 === d.length ? "{}" : o ? "{\n" + o + d.join(",\n" + o) + "\n" + u + "}" : "{" + d.join(",") + "}", o = u, c
            }
        }

        var o, s, a, l = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        e.exports = function (e, t, i) {
            var n;
            if (o = "", s = "", "number" == typeof i)for (n = 0; i > n; n += 1)s += " "; else"string" == typeof i && (s = i);
            if (a = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))throw new Error("JSON.stringify");
            return r("", {"": e})
        }
    }, function (e, t, i) {
        "use strict";
        t.decode = t.parse = i(65), t.encode = t.stringify = i(66)
    }, function (e, t, i) {
        e.exports = function (e) {
            return e.webpackPolyfill || (e.deprecate = function () {
            }, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    }, function (e, t, i) {
        "use strict";
        function n(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }

        e.exports = function (e, t, i, r) {
            t = t || "&", i = i || "=";
            var o = {};
            if ("string" != typeof e || 0 === e.length)return o;
            var s = /\+/g;
            e = e.split(t);
            var a = 1e3;
            r && "number" == typeof r.maxKeys && (a = r.maxKeys);
            var l = e.length;
            a > 0 && l > a && (l = a);
            for (var c = 0; l > c; ++c) {
                var h, d, u, f, p = e[c].replace(s, "%20"), m = p.indexOf(i);
                m >= 0 ? (h = p.substr(0, m), d = p.substr(m + 1)) : (h = p, d = ""), u = decodeURIComponent(h), f = decodeURIComponent(d), n(o, u) ? Array.isArray(o[u]) ? o[u].push(f) : o[u] = [o[u], f] : o[u] = f
            }
            return o
        }
    }, function (e, t, i) {
        "use strict";
        var n = function (e) {
            switch (typeof e) {
                case"string":
                    return e;
                case"boolean":
                    return e ? "true" : "false";
                case"number":
                    return isFinite(e) ? e : "";
                default:
                    return ""
            }
        };
        e.exports = function (e, t, i, r) {
            return t = t || "&", i = i || "=", null === e && (e = void 0), "object" == typeof e ? Object.keys(e).map(function (r) {
                var o = encodeURIComponent(n(r)) + i;
                return Array.isArray(e[r]) ? e[r].map(function (e) {
                    return o + encodeURIComponent(n(e))
                }).join(t) : o + encodeURIComponent(n(e[r]))
            }).join(t) : r ? encodeURIComponent(n(r)) + i + encodeURIComponent(n(e)) : ""
        }
    }])
});
var util = {};
util.parse = function (e) {
    try {
        return JSON.parse(e)
    } catch (t) {
        throw util.validate(e), t
    }
}, util.validate = function (e) {
    "undefined" != typeof jsonlint ? jsonlint.parse(e) : JSON.parse(e)
}, util.addClassName = function (e, t) {
    var i = e.className.split(" ");
    -1 == i.indexOf(t) && (i.push(t), e.className = i.join(" "))
}, util.removeClassName = function (e, t) {
    var i = e.className.split(" "), n = i.indexOf(t);
    -1 != n && (i.splice(n, 1), e.className = i.join(" "))
}, util.getInternetExplorerVersion = function () {
    if (-1 == _ieVersion) {
        var e = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var t = navigator.userAgent, i = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            null != i.exec(t) && (e = parseFloat(RegExp.$1))
        }
        _ieVersion = e
    }
    return _ieVersion
}, util.isFirefox = function () {
    return -1 != navigator.userAgent.indexOf("Firefox")
};
var _ieVersion = -1;
util.addEventListener = function (e, t, i, n) {
    if (e.addEventListener)return void 0 === n && (n = !1), "mousewheel" === t && util.isFirefox() && (t = "DOMMouseScroll"), e.addEventListener(t, i, n), i;
    if (e.attachEvent) {
        var r = function () {
            return i.call(e, window.event)
        };
        return e.attachEvent("on" + t, r), r
    }
}, util.removeEventListener = function (e, t, i, n) {
    e.removeEventListener ? (void 0 === n && (n = !1), "mousewheel" === t && util.isFirefox() && (t = "DOMMouseScroll"), e.removeEventListener(t, i, n)) : e.detachEvent && e.detachEvent("on" + t, i)
}, util.prompt = function (e) {
    var t = function () {
        p.parentNode && p.parentNode.removeChild(p), r.parentNode && r.parentNode.removeChild(r), util.removeEventListener(document, "keydown", n)
    }, i = function () {
        t(), e.callback && e.callback(null)
    }, n = util.addEventListener(document, "keydown", function (e) {
        var t = e.which;
        27 == t && (i(), e.preventDefault(), e.stopPropagation())
    }), r = document.createElement("div");
    r.className = "prompt-overlay", document.body.appendChild(r);
    var o = document.createElement("form");
    o.className = "prompt-form", o.target = e.formTarget || "", o.action = e.formAction || "", o.method = e.formMethod || "POST", o.enctype = "multipart/form-data", o.encoding = "multipart/form-data", o.onsubmit = function () {
        return l.value ? (setTimeout(function () {
            t()
        }, 0), e.callback && e.callback(l.value, l), void 0 != e.formAction && void 0 != e.formMethod) : (alert("Enter a " + e.inputName + " first..."), !1)
    };
    var s = document.createElement("div");
    if (s.className = "prompt-title", s.appendChild(document.createTextNode(e.title || "Dialog")), o.appendChild(s), e.description) {
        var a = document.createElement("div");
        a.className = "prompt-description", a.innerHTML = e.description, o.appendChild(a)
    }
    var l = document.createElement("input");
    l.className = "prompt-field flat", l.type = e.inputType || "text", l.name = e.inputName || "text", l.value = e.inputDefault || "";
    var c = document.createElement("div");
    c.className = "prompt-contents", c.appendChild(l), o.appendChild(c);
    var h = document.createElement("input");
    h.className = "prompt-cancel flat", h.type = "button", h.value = e.titleCancel || "Cancel", h.onclick = i;
    var d = document.createElement("input");
    d.className = "prompt-submit flat", d.type = "submit", d.value = e.titleSubmit || "Ok";
    var u = document.createElement("div");
    u.className = "prompt-buttons", u.appendChild(h), u.appendChild(d), o.appendChild(u);
    var f = document.createElement("div");
    f.className = "prompt-border", f.appendChild(o);
    var p = document.createElement("div");
    p.className = "prompt-background", p.appendChild(f), p.onclick = function (e) {
        var t = e.target;
        t == p && i()
    }, document.body.appendChild(p), l.focus(), l.select()
}, util.selectSchema = function (e, t) {
    e = e || {};
    var i = function () {
        y.parentNode && y.parentNode.removeChild(y), o.parentNode && o.parentNode.removeChild(o), util.removeEventListener(document, "keydown", r)
    }, n = function () {
        i(), t(null)
    }, r = util.addEventListener(document, "keydown", function (e) {
        var t = e.which;
        27 == t && (n(), e.preventDefault(), e.stopPropagation())
    }), o = document.createElement("div");
    o.className = "prompt-overlay", document.body.appendChild(o);
    var s = document.createElement("div"), a = document.createElement("div");
    a.className = "prompt-title", a.appendChild(document.createTextNode("Add JSON schema")), s.appendChild(a);
    var l = document.createElement("div");
    l.className = "prompt-contents", s.appendChild(l);
    var c, h = Object.keys(e).map(function (t) {
        var i = e[t].name || t;
        return '<option value="' + t + '">' + i + "</option>"
    });
    c = h.length > 0 ? '<select id="schemaDoc" style="flat">' + h + "</select>" : '<div class="info">(no online documents)</div>', l.innerHTML = '<table class="schema-selection"><tbody><colgroup>  <col width="32">  <col width="*"></colgroup><tr>  <td><input type="radio" name="sourceType" id="sourceTypeDoc" value="document" checked></td>  <td><label for="sourceTypeDoc">Select one of your online stored documents:</label></td></tr><tr>  <td></td>  <td>' + c + '</td></tr><tr>  <td><input type="radio" name="sourceType" id="sourceTypeUrl" value="url"></td>  <td><label for="sourceTypeUrl">Specify a public url. Urls which need authentication or do not have CORS enabled cannot be loaded.</label></td></tr><tr>  <td></td>  <td><input id="schemaUrl" type="text" class="flat"></td></tr></tbody></table>';
    var d = l.querySelector("#schemaDoc"), u = l.querySelector("#schemaUrl"), f = l.querySelector("#sourceTypeDoc"), p = l.querySelector("#sourceTypeUrl");
    d && (d.onchange = d.onfocus = function () {
        f.checked = !0, p.checked = !1
    }), u.onchange = u.oninput = function () {
        f.checked = !1, p.checked = !0
    };
    var m = document.createElement("input");
    m.className = "prompt-cancel flat", m.type = "button", m.value = "Cancel", m.onclick = n;
    var g = document.createElement("input");
    g.className = "prompt-submit flat", g.type = "button", g.value = "Ok", g.onclick = function () {
        i(), t(p.checked ? {type: "url", url: u.value} : d && "" != d.value ? {type: "doc", id: d.value} : null)
    };
    var v = document.createElement("div");
    v.className = "prompt-buttons", v.appendChild(m), v.appendChild(g), s.appendChild(v);
    var w = document.createElement("div");
    w.className = "prompt-border", w.appendChild(s);
    var y = document.createElement("div");
    y.className = "prompt-background", y.appendChild(w), y.onclick = function (e) {
        var t = e.target;
        t == y && n()
    }, document.body.appendChild(y)
}, util.getName = function (e) {
    if (e) {
        var t = /\/?([^\/\.]*)(\.[^\.]*)?$/.exec(e);
        return t ? t[1] : e
    }
    return e
}, QueryParams.prototype.getQuery = function () {
    for (var e, t, i = window.location.search.substring(1), n = i.split("&"), r = {}, o = 0, s = n.length; s > o; o++) {
        var a = n[o].split("=");
        2 == a.length ? (e = decodeURIComponent(a[0]), t = decodeURIComponent(a[1])) : (e = decodeURIComponent(a), t = ""), r[e] = t
    }
    return r
}, QueryParams.prototype.setQuery = function (e) {
    var t = "";
    for (var i in e)if (e.hasOwnProperty(i)) {
        var n = e[i];
        void 0 != n && (t.length && (t += "&"), t += encodeURIComponent(i), t += "=", t += encodeURIComponent(e[i]))
    }
    window.location.search = t.length ? "#" + t : ""
}, QueryParams.prototype.getValue = function (e) {
    var t = this.getQuery();
    return t[e]
}, QueryParams.prototype.setValue = function (e, t) {
    var i = this.getQuery();
    i[e] = t, this.setQuery(i)
};
var ajax = function () {
    function e(e, t, i, n, r) {
        try {
            var o = new XMLHttpRequest;
            if (o.onreadystatechange = function () {
                    4 == o.readyState && r(null, o.responseText, o.status)
                }, o.open(e, t, !0), n)for (var s in n)n.hasOwnProperty(s) && o.setRequestHeader(s, n[s]);
            o.send(i)
        } catch (a) {
            r(a, null, 0)
        }
    }

    function t(t, i, n) {
        e("GET", t, null, i, n)
    }

    function i(t, i, n, r) {
        e("POST", t, i, n, r)
    }

    function n(t, i, n, r) {
        e("PUT", t, i, n, r)
    }

    function r(t, i, n) {
        e("DELETE", t, null, i, n)
    }

    return {fetch: e, get: t, post: i, put: n, del: r}
}();
Notify.prototype.showNotification = function (e, t) {
    var i = this, n = this.showMessage({type: "notification", message: e, closeButton: !1});
    return t && setTimeout(function () {
        i.removeMessage(n)
    }, t), n
}, Notify.prototype.showError = function (e) {
    return this.showMessage({type: "error", message: e.message ? "Error: " + e.message : e.toString(), closeButton: !0})
}, Notify.prototype.showMessage = function (e) {
    var t = this.dom.frame;
    if (!t) {
        var i = 500, n = 5, r = document.body.offsetWidth || window.innerWidth;
        t = document.createElement("div"), t.style.position = "absolute", t.style.left = (r - i) / 2 + "px", t.style.width = i + "px", t.style.top = n + "px", t.style.zIndex = "999", document.body.appendChild(t), this.dom.frame = t
    }
    var o = e.type || "notification", s = e.closeButton !== !1, a = document.createElement("div");
    a.className = o, a.type = o, a.closeable = s, a.style.position = "relative", t.appendChild(a);
    var l = document.createElement("table");
    l.style.width = "100%", a.appendChild(l);
    var c = document.createElement("tbody");
    l.appendChild(c);
    var h = document.createElement("tr");
    c.appendChild(h);
    var d = document.createElement("td");
    if (d.innerHTML = e.message || "", h.appendChild(d), s) {
        var u = document.createElement("td");
        u.style.textAlign = "right", u.style.verticalAlign = "top", h.appendChild(u);
        var f = document.createElement("button");
        f.className = "close", f.innerHTML = "&times;", f.title = "Close message (ESC)", u.appendChild(f);
        var p = this;
        f.onclick = function () {
            p.removeMessage(a)
        }
    }
    return a
}, Notify.prototype.removeMessage = function (e) {
    var t = this.dom.frame;
    if (!e && t) {
        for (var i = t.firstChild; i && !i.closeable;)i = i.nextSibling;
        i && i.closeable && (e = i)
    }
    e && e.parentNode == t && e.parentNode.removeChild(e), t && 0 == t.childNodes.length && (t.parentNode.removeChild(t), delete this.dom.frame)
}, Notify.prototype.onKeyDown = function (e) {
    var t = e.which;
    27 == t && (this.removeMessage(), e.preventDefault(), e.stopPropagation())
}, FileRetriever.prototype._hide = function (e) {
    e.style.visibility = "hidden", e.style.position = "absolute", e.style.left = "-1000px", e.style.top = "-1000px", e.style.width = "0", e.style.height = "0"
}, FileRetriever.prototype.remove = function () {
    var e = this.dom;
    for (var t in e)if (e.hasOwnProperty(t)) {
        var i = e[t];
        i.parentNode && i.parentNode.removeChild(i)
    }
    this.dom = {}
}, FileRetriever.prototype._getFilename = function (e) {
    return e ? e.replace(/^.*[\\\/]/, "") : ""
}, FileRetriever.prototype.setUrl = function (e) {
    this.url = e
}, FileRetriever.prototype.getUrl = function () {
    return this.url
}, FileRetriever.prototype.loadUrl = function (e, t) {
    this.setUrl(e);
    var i = void 0;
    this.notify && (i = this.notify.showNotification("loading url..."));
    var n = this, r = function (e, r) {
        t && (t(e, r), t = void 0), n.notify && i && (n.notify.removeMessage(i), i = void 0)
    }, o = this.scriptUrl;
    ajax.get(e, n.headers, function (t, i, s) {
        if (s >= 200 && 300 > s)r(null, i); else {
            var a = o + "?url=" + encodeURIComponent(e);
            ajax.get(a, n.headers, function (t, i, n) {
                n >= 200 && 300 > n ? r(null, i) : 404 == n ? (console.log('Error: url "' + e + '" not found', n, i), t = new Error('Error: url "' + e + '" not found'), r(t, null)) : (console.log('Error: failed to load url "' + e + '"', n, i), t = new Error('Error: failed to load url "' + e + '"'), r(t, null))
            })
        }
    }), setTimeout(function () {
        r(new Error("Error loading url (time out)"))
    }, this.timeout)
}, FileRetriever.prototype.loadFile = function (e) {
    var t = void 0, i = this, n = function () {
        i.notify && !t && (t = i.notify.showNotification("loading file...")), setTimeout(function () {
            r(new Error("Error loading url (time out)"))
        }, i.timeout)
    }, r = function (n, r, o) {
        e && (e(n, r, o), e = null), i.notify && t && (i.notify.removeMessage(t), t = void 0)
    }, o = i.options.html5 && window.File && window.FileReader;
    if (o)util.prompt({
        title: "Open file",
        titleSubmit: "Open",
        description: "<p>Select a file on your computer.</p><p>Tip: you can also drag and drop files.</p>",
        inputType: "file",
        inputName: "file",
        callback: function (e, t) {
            if (e) {
                if (o) {
                    var i = t.files[0], s = new FileReader;
                    s.onload = function (e) {
                        var t = e.target.result, n = i.name;
                        r(null, t, n)
                    }, s.readAsText(i)
                }
                n()
            }
        }
    }); else {
        var s = "fileretriever-upload-" + Math.round(1e15 * Math.random()), a = document.createElement("iframe");
        a.name = s, i._hide(a), a.onload = function () {
            var e = a.contentWindow.document.body.innerHTML;
            if (e) {
                var t = i.scriptUrl + "?id=" + e + "&filename=" + i.defaultFilename;
                ajax.get(t, i.headers, function (e, t, n) {
                    if (n >= 200 && 300 > n)r(null, t); else {
                        var e = new Error("Error loading file " + i.defaultFilename);
                        r(e, null)
                    }
                    a.parentNode === document.body && document.body.removeChild(a)
                })
            }
        }, document.body.appendChild(a), util.prompt({
            title: "Open file",
            titleSubmit: "Open",
            description: "Select a file on your computer.",
            inputType: "file",
            inputName: "file",
            formAction: this.scriptUrl,
            formMethod: "POST",
            formTarget: s,
            callback: function (e) {
                e && n()
            }
        })
    }
}, FileRetriever.prototype.loadUrlDialog = function (e) {
    util.prompt({
        title: "Open url",
        titleSubmit: "Open",
        description: "Enter a public url. Urls which need authentication or do not have CORS enabled cannot be loaded.",
        inputType: "text",
        inputName: "url",
        inputDefault: this.getUrl(),
        callback: e
    })
}, FileRetriever.prototype.saveFile = function (e, t, i) {
    var n = t ? t + ".json" : this.defaultFilename, r = void 0;
    this.notify && (r = this.notify.showNotification("saving file..."));
    var o = this, s = function (e) {
        i && (i(e), i = void 0), o.notify && r && (o.notify.removeMessage(r), r = void 0)
    }, a = document.createElement("a");
    this.options.html5 && void 0 != a.download && !util.isFirefox() ? (a.style.display = "none", a.href = "data:application/json;charset=utf-8," + encodeURIComponent(e), a.download = n, document.body.appendChild(a), a.click(), document.body.removeChild(a), s()) : e.length < this.options.maxSize ? ajax.post(o.scriptUrl, e, o.headers, function (e, t, i) {
        if (i >= 200 && 300 > i) {
            var r = document.createElement("iframe");
            r.src = o.scriptUrl + "?id=" + t + "&filename=" + n, o._hide(r), document.body.appendChild(r), s()
        } else s(new Error("Error saving file"))
    }) : s(new Error("Maximum allowed file size exceeded (" + this.options.maxSize + " bytes)")), setTimeout(function () {
        s(new Error("Error saving file (time out)"))
    }, this.timeout)
}, OnlineStore.prototype.save = function (e, t, i) {
    this.queue.push({doc: e, options: t, callback: i}), this.revs[e._id] = e._rev, this.saving || this._save()
}, OnlineStore.prototype._save = function () {
    var e = this.queue.shift();
    if (e) {
        var t = e.doc, i = e.options, n = e.callback;
        this.saving = !0;
        var r, o = this, s = t.name || null, a = i && i.silent || !1;
        t.name = s, t._rev = this.revs[t._id] || t._rev, a || (r = this.notify.showNotification("saving document..."));
        var l = JSON.stringify(t), c = {"content-type": "application/json"};
        ajax.put(this.url, l, c, function (e, i, a) {
            if (o.notify.removeMessage(r), a >= 200 && 300 > a) {
                var l = JSON.parse(i), c = l && l.id || t._id || null, h = l && l.rev || t._rev || null;
                o.revs[c] = h, n(null, {name: s || null, _id: c, _rev: h})
            } else n(OnlineStore._createError(e || i, new Error("Failed to save document")), null);
            o._save()
        })
    } else this.saving = !1
}, OnlineStore.prototype.load = function (e, t) {
    var i = this.notify, n = i.showNotification("loading document...");
    ajax.get(this.url + e, null, function (e, r, o) {
        i.removeMessage(n), o >= 200 && 300 > o ? t(null, JSON.parse(r)) : t(OnlineStore._createError(e || r, new Error("Failed to load document")), null)
    })
}, OnlineStore.prototype.getDataUrl = function (e) {
    return this.url + e + "/data"
}, OnlineStore.prototype.remove = function (e, t) {
    var i = this.notify, n = i.showNotification("deleting document...");
    ajax.del(this.url + e._id + "/" + e._rev, null, function (e, r, o) {
        i.removeMessage(n), o >= 200 && 300 > o || 404 == o ? t(null, r) : t(OnlineStore._createError(e || r, new Error("Failed to delete document")), null)
    })
}, OnlineStore._createError = function (e, t) {
    return e instanceof Error ? e : "Error: deleted" == e ? new Error("Document is deleted") : "Error: missing" == e ? new Error("Document not found") : e && 0 == e.indexOf("Error:") ? new Error(e.substring(7)) : t || new Error("An unknown error occurred")
}, Splitter.prototype.onMouseDown = function (e) {
    var t = this, i = e.which ? 1 == e.which : 1 == e.button;
    i && (util.addClassName(this.container, "active"), this.params.mousedown || (this.params.mousedown = !0, this.params.mousemove = util.addEventListener(document, "mousemove", function (e) {
        t.onMouseMove(e)
    }), this.params.mouseup = util.addEventListener(document, "mouseup", function (e) {
        t.onMouseUp(e)
    }), this.params.screenX = e.screenX, this.params.changed = !1, this.params.value = this.getValue()), e.preventDefault(), e.stopPropagation())
}, Splitter.prototype.onMouseMove = function (e) {
    if (void 0 != this.width) {
        var t = e.screenX - this.params.screenX, i = this.params.value + t / this.width;
        i = this.setValue(i), i != this.params.value && (this.params.changed = !0), this.onChange(i)
    }
    e.preventDefault(), e.stopPropagation()
}, Splitter.prototype.onMouseUp = function (e) {
    if (util.removeClassName(this.container, "active"), this.params.mousedown) {
        util.removeEventListener(document, "mousemove", this.params.mousemove), util.removeEventListener(document, "mouseup", this.params.mouseup), this.params.mousemove = void 0, this.params.mouseup = void 0, this.params.mousedown = !1;
        var t = this.getValue();
        this.params.changed || (0 == t && (t = this.setValue(.2), this.onChange(t)), 1 == t && (t = this.setValue(.8), this.onChange(t)))
    }
    e.preventDefault(), e.stopPropagation()
}, Splitter.prototype.setWidth = function (e) {
    this.width = e
}, Splitter.prototype.setValue = function (e) {
    e = Number(e), void 0 != this.width && this.width > this.snap && (e < this.snap / this.width && (e = 0), e > (this.width - this.snap) / this.width && (e = 1)), this.value = e;
    try {
        localStorage.splitterValue = e
    } catch (t) {
        console && console.log && console.log(t)
    }
    return e
}, Splitter.prototype.getValue = function () {
    var e = this.value;
    if (void 0 == e)try {
        void 0 != localStorage.splitterValue && (e = Number(localStorage.splitterValue), e = this.setValue(e))
    } catch (t) {
        console.log(t)
    }
    return void 0 == e && (e = this.setValue(.5)), e
};
var treeEditor = null, codeEditor = null;
"https:" === location.protocol && (location.href = location.href.replace(/^https:/, "http:"));
var app = {}, AUTO_SAVE_DELAY = 4e3, LOCAL_SAVE_DELAY = 1e3;
app.doc = {
    name: null,
    _id: null,
    _rev: null
}, app.lastChanged = void 0, app.changed = !1, app.autoSaveTimer = null, app.localSaveTimer = null, app.conflictMessages = [], app.codeToTree = function () {
    try {
        treeEditor.set(codeEditor.get())
    } catch (e) {
        app.notify.showError(app.formatError(e))
    }
}, app.treeToCode = function () {
    try {
        codeEditor.set(treeEditor.get())
    } catch (e) {
        app.notify.showError(app.formatError(e))
    }
}, app.load = function () {
    try {
        app.notify = new Notify, app.retriever = new FileRetriever({
            scriptUrl: "fileretriever.php",
            notify: app.notify
        }), app.store = new OnlineStore({url: "//api.jsoneditoronline.org/v1/docs/", notify: app.notify});
        var e = document.getElementById("codeEditor");
        codeEditor = new JSONEditor(e, {
            mode: "code", onChange: function () {
                app.setChanged(codeEditor)
            }, onError: function (e) {
                app.notify.showError(app.formatError(e))
            }
        }), localStorage.indentation && (codeEditor.indentation = parseInt(localStorage.indentation)), e = document.getElementById("treeEditor"),
            treeEditor = new JSONEditor(e, {
                mode: "tree", onChange: function () {
                    app.setChanged(treeEditor)
                }, onError: function (e) {
                    app.notify.showError(app.formatError(e))
                }
            }), app.applySchema(localStorage.schemaUrl), app.splitter = new Splitter({
            container: document.getElementById("drag"),
            change: function () {
                app.resize()
            }
        });
        var t = document.getElementById("toTree");
        t.onclick = function () {
            this.focus(), app.codeToTree()
        };
        var i = document.getElementById("toCode");
        i.onclick = function () {
            this.focus(), app.treeToCode()
        }, util.addEventListener(window, "resize", app.resize), codeEditor.aceEditor.commands.removeCommand("showSettingsMenu"), document.body.onkeydown = function (e) {
            var t = e.which ? e.which : e.keyCode || 0;
            if (e.ctrlKey)switch (t) {
                case 83:
                    app.saveOnline(), e.stopPropagation(), e.preventDefault();
                    break;
                case 188:
                    app.treeToCode(), codeEditor.focus();
                    break;
                case 190:
                    app.codeToTree();
                    var i = treeEditor.content.querySelector("[contenteditable=true]");
                    i ? i.focus() : treeEditor.node.dom.expand ? treeEditor.node.dom.expand.focus() : treeEditor.node.dom.menu ? treeEditor.node.dom.menu.focus() : (i = this.frame.querySelector("button"), i && i.focus())
            }
        };
        var n = document.getElementById("name");
        n.onclick = app.renameOnline;
        var r = document.getElementById("new");
        r.href = document.location.pathname + "#new", r.onclick = function (e) {
            app.doc._id || (document.location.href = document.location.pathname + "#new", location.reload())
        };
        var o = document.getElementById("openFromDisk");
        o.onclick = function (e) {
            app.openFromDisk(), e.stopPropagation(), e.preventDefault()
        };
        var s = document.getElementById("openUrl");
        s.onclick = function (e) {
            app.openUrl(), e.stopPropagation(), e.preventDefault()
        };
        var a = document.getElementById("saveToDisk");
        a.onclick = app.saveToDisk;
        var l = document.getElementById("saveOnline");
        l.onclick = app.saveOnline;
        var c = document.getElementById("indentation");
        c.value = localStorage.indentation || "2", c.onfocus = function () {
            util.addClassName(document.querySelector("li.settings"), "active")
        }, c.onchange = function () {
            app.applyIndentation(c.value, !0)
        }, c.onblur = function () {
            app.applyIndentation(c.value), util.removeClassName(document.querySelector("li.settings"), "active")
        }, addDragDropListener(window, function (e, t, i) {
            if (e)app.notify.showError(e); else if (app.doc.name && app.doc._id) {
                if (app.changed) {
                    var n = !0;
                    app._saveOnline(n)
                }
                localStorage.data = t, document.location.href = document.location.pathname
            } else app.setData(t), app.setMetaData({name: i})
        }), window.onblur = app._saveOnlineIfChanged, document.getElementById("menu").onmouseover = app._saveOnlineIfChanged, window.onfocus = function () {
            app.showFilesList(), app.showSchemasList()
        }, codeEditor.focus(), document.body.spellcheck = !1, app.showFilesList(), app.showSchemasList();
        var h, d = new QueryParams, u = d.getValue("json"), f = d.getValue("url"), p = d.getValue("id"), m = "#new" == location.hash, g = "#open" == location.hash;
        if (p)app.openOnline(p); else if (u)codeEditor.setText(u), treeEditor.setText(u), app.changed = !1; else if (f)app.openUrl(f); else if (m)location.hash = "", codeEditor.setText(""), app.changed = !1; else if (g)location.hash = "", app.openFromDisk(); else if (void 0 !== (h = localStorage.data))codeEditor.setText(h), treeEditor.setText(h), app.changed = !1; else {
            var v = {
                array: [1, 2, 3],
                "boolean": !0,
                "null": null,
                number: 123,
                object: {a: "b", c: "d", e: "f"},
                string: "Hello World"
            };
            codeEditor.set(v), treeEditor.set(v)
        }
        newFeatureInfo()
    } catch (w) {
        try {
            app.notify.showError(app.formatError(w))
        } catch (y) {
            console && console.log && console.log(w), alert(w)
        }
    }
}, app.setChanged = function (e) {
    app.lastChanged = e, app.changed = !0, app.doc._id ? (app.showStatus('changed (<a href="javascript: app._saveOnline(true)">save now</a>)'), app.autoSaveTimer && clearTimeout(app.autoSaveTimer), app.autoSaveTimer = setTimeout(app._saveOnlineIfChanged, AUTO_SAVE_DELAY)) : (app.localSaveTimer && clearTimeout(app.localSaveTimer), app.localSaveTimer = setTimeout(function () {
        app.changed && (app.changed = !1, localStorage.data = app.getData())
    }, LOCAL_SAVE_DELAY))
}, app.sync = function () {
    app.lastChanged == treeEditor && app.treeToCode()
}, app.setData = function (e) {
    codeEditor.setText(e);
    try {
        var t = util.parse(e);
        treeEditor.set(t)
    } catch (i) {
        treeEditor.set({}), app.notify.showError(app.formatError(i))
    }
}, app.setMetaData = function (e) {
    void 0 != e._id && (this.doc._id = e._id), void 0 != e._rev && (this.doc._rev = e._rev), void 0 != e.name && (this.doc.name = e.name), e._id && app.showName(e.name || "unnamed document")
}, app.showName = function (e) {
    for (var t = document.getElementById("name"); t.firstChild;)t.removeChild(t.firstChild);
    t.appendChild(document.createTextNode(e)), t.style.visibility = "visible", document.title = e + " - JSON Editor Online"
}, app.openFromDisk = function () {
    app.doc._id ? document.location.href = document.location.pathname + "#open" : app.retriever.loadFile(function (e, t, i) {
        e ? app.notify.showError(e) : (app.setData(t), app.setMetaData({name: util.getName(i)}))
    })
}, app.openUrl = function (e) {
    function t(t, i) {
        t ? app.notify.showError(t) : i && (app.setData(i), app.setMetaData({name: util.getName(e)}))
    }

    e ? app.retriever.loadUrl(e, t) : app.retriever.loadUrlDialog(function (e) {
        e && (document.location.href = document.location.pathname + "?url=" + e)
    })
}, app.getData = function () {
    return app.lastChanged === treeEditor ? JSON.stringify(treeEditor.get(), null, codeEditor.indentation) : codeEditor.getText()
}, app.saveToDisk = function () {
    app.sync();
    var e = app.getData();
    app.retriever.saveFile(e, app.doc.name, function (e) {
        e && app.notify.showError(e)
    })
}, app.saveOnline = function () {
    if (app.sync(), app.doc.name && app.doc._id)app._saveOnline(); else {
        var e = app.doc.name || null;
        util.prompt({
            title: "Save online",
            titleSubmit: "Save",
            description: "Enter a name for the document.<br><br>The saved document is stored online and can be shared with others via an url.",
            inputType: "text",
            inputName: "filename",
            inputDefault: e,
            callback: function (e) {
                void 0 != e && (app.setMetaData({name: e}), app._saveOnline())
            }
        })
    }
}, app.saveLocal = function (e) {
    var t = localStorage.files, i = t ? JSON.parse(t) : {};
    i[e._id] = {
        _id: e._id,
        _rev: e._rev,
        name: e.name,
        updated: (new Date).toISOString()
    }, localStorage.files = JSON.stringify(i), app.showFilesList(i), app.showSchemasList()
}, app.applyIndentation = function (e, t) {
    var i = parseInt(e);
    isNaN(i) ? t || app.notify.showError(new TypeError("Integer number expected for indentation")) : (localStorage.indentation = i, codeEditor.indentation = i, codeEditor.aceEditor.getSession().setTabSize(i))
}, app.applySchema = function (e) {
    if (e || (e = ""), localStorage.schemaUrl = e, "" !== e.trim()) {
        var t = app.notify.showNotification("loading schema...");
        ajax.get(e, {}, function (e, i, n) {
            if (app.notify.removeMessage(t), n >= 200 && 300 > n)try {
                var r = util.parse(i);
                treeEditor.setSchema(r), codeEditor.setSchema(r)
            } catch (o) {
                app.notify.showError(app.formatError("Failed to parse JSON schema: " + o))
            } else app.notify.showError(e || new Error("Failed to load JSON schema"))
        })
    } else treeEditor.setSchema(null), codeEditor.setSchema(null);
    app.showSchemasList()
}, app.lastFilesStr = null, app.showFilesList = function (e) {
    if (!e) {
        var t = localStorage.files;
        e = t ? JSON.parse(t) : {}
    }
    if (app.lastFilesStr != t) {
        app.lastFilesStr = t;
        var i = document.getElementById("filesList"), n = Object.keys(e).sort(function (t, i) {
            return e[t].updated < e[i].updated
        });
        i.innerHTML = "", n.length > 0 && n.forEach(function (t) {
            var n = e[t], r = document.createElement("div");
            r.className = "file";
            var o = document.createElement("a");
            o.className = "open", o.href = location.pathname + "?id=" + t, o.appendChild(document.createTextNode(n.name || t)), o.title = "Date: " + n.updated.substring(0, 19).replace("T", " "), r.appendChild(o);
            var s = document.createElement("a");
            s.className = "remove", s.innerHTML = "&times;", s.title = 'Delete "' + n.name + '"', s.onclick = function (e) {
                e.stopPropagation(), e.preventDefault(), confirm('Are you sure you want to delete document "' + n.name + '"?\n\nThis action cannot be undone') && app.removeOnline(n)
            }, r.appendChild(s), i.appendChild(r)
        })
    }
}, app.lastSchemasStr = null, app.showSchemasList = function () {
    var e = JSON.parse(localStorage.schemas || "[]"), t = JSON.stringify(e);
    if (app.lastSchemasStr != t) {
        app.lastSchemasStr = t;
        var i = document.getElementById("schemasList");
        i.innerHTML = "";
        var n = document.createElement("div");
        n.appendChild(document.createTextNode("JSON schema validation")), i.appendChild(n);
        var r = e.map(app.schemaMetaData).filter(function (e) {
            return null != e
        });
        if (r.length < e.length) {
            var o = r.map(function (e) {
                return e.schema
            });
            localStorage.schemas = JSON.stringify(o)
        }
        if (r.length > 0)r.forEach(function (e) {
            var t = document.createElement("div");
            t.className = "schema";
            var n = document.createElement("label");
            t.appendChild(n);
            var r = document.createElement("input");
            r.type = "checkbox", r.checked = localStorage.schemaUrl === e.url, r.onchange = function () {
                if (r.checked) {
                    for (var t = i.querySelectorAll("input"), n = 0; n < t.length; n++)t[n] !== r && (t[n].checked = !1);
                    app.applySchema(e.url)
                } else app.applySchema(null)
            }, n.appendChild(r), n.appendChild(document.createTextNode(" " + e.name)), n.title = e.title;
            var o = document.createElement("a");
            o.className = "remove", o.innerHTML = "&times;", o.title = 'Remove "' + e.name + '" from the list (the file itself will not be removed)', o.onclick = function (t) {
                t.stopPropagation(), t.preventDefault(), app.removeSchema(e.url)
            }, t.appendChild(o), i.appendChild(t)
        }); else {
            var s = document.createElement("div");
            s.className = "info", s.appendChild(document.createTextNode("(no schemas added yet)")), i.appendChild(s)
        }
        var a = document.createElement("button");
        a.className = "addSchema flat", a.appendChild(document.createTextNode("Add schema")), a.onclick = app.addSchema;
        var l = document.createElement("div");
        l.appendChild(a), i.appendChild(l)
    }
}, app.schemaMetaData = function (e) {
    try {
        var t = JSON.parse(localStorage.files || "{}");
        return "url" === e.type ? {
            url: e.url,
            name: e.url.split("/").pop(),
            title: e.url,
            schema: e
        } : {url: app.store.getDataUrl(e.id), name: t[e.id].name, title: "id: " + e.id, schema: e}
    } catch (i) {
        console.error(i)
    }
    return null
}, app.addSchema = function () {
    var e = JSON.parse(localStorage.files || "{}");
    util.addClassName(document.querySelector("li.settings"), "active"), util.selectSchema(e, function (e) {
        if (util.removeClassName(document.querySelector("li.settings"), "active"), e) {
            var t = JSON.parse(localStorage.schemas || "[]");
            t.push(e), localStorage.schemas = JSON.stringify(t);
            var i = app.schemaMetaData(e).url;
            app.applySchema(i), app.showSchemasList()
        }
    })
}, app.removeSchema = function (e) {
    var t = JSON.parse(localStorage.schemas || "[]"), i = t.filter(function (t) {
        return app.schemaMetaData(t).url !== e
    });
    localStorage.schemas = JSON.stringify(i), app.showSchemasList()
}, app.renameOnline = function () {
    var e = app.doc.name || null;
    util.prompt({
        title: "Rename file",
        titleSubmit: "Save",
        description: "Enter a new name for the document.",
        inputType: "text",
        inputName: "filename",
        inputDefault: e,
        callback: function (e) {
            void 0 != e && (app.setMetaData({name: e}), app.doc._id && app._saveOnline())
        }
    })
}, app._saveOnlineIfChanged = function () {
    if (app.changed && app.doc._id) {
        app.changed = !1;
        var e = !0;
        return app._saveOnline(e), "Still saving your latest changes..."
    }
}, app._saveOnline = function (e) {
    var t = {name: app.doc.name || null, data: app.getData()};
    app.doc._id && app.doc._rev && (t._id = app.doc._id, t._rev = app.doc._rev), app.changed = !1;
    var i = {silent: e};
    app.showStatus("saving changes..."), app.store.save(t, i, function (t, i) {
        if (t)"Error: Document update conflict." == t.toString() && (t = new Error('Document update conflict.<p>This document has been changed in an other browser or tab.</p><p>Solutions:</p><ul><li><a href="javascript: location.reload();">load latest version from the server</a> (overrides your local changes)</li><li><a href="javascript: app._forceSaveOnline();">save my version to the server</a> (overrides the changes on the server)</li></ul>')), app.conflictMessages.push(app.notify.showError(t)), app.showStatus("failed to save"); else {
            app.saveLocal(i), app.setMetaData(i), app.showStatus("saved"), app.showFilesList(), e || app.notify.showNotification('file has been saved as "' + app.doc.name + '"', 1e3);
            var n = (new QueryParams).getValue("id");
            app.doc._id != n && (document.location.href = document.location.pathname + "?id=" + i._id)
        }
    })
}, app._forceSaveOnline = function () {
    for (var e; e = app.conflictMessages.shift();)app.notify.removeMessage(e);
    app.store.load(app.doc._id, function (e, t) {
        e ? app.notify.showError(e) : (app.setMetaData(t), app.saveLocal(t), app._saveOnline())
    })
}, app.removeOnline = function (e) {
    app.store.remove(e, function (t, i) {
        if (t)app.notify.showError(t); else {
            var n = localStorage.files, r = n ? JSON.parse(n) : {};
            delete r[e._id], localStorage.files = JSON.stringify(r), app.doc._id == e._id ? (app.changed = !1, document.location.href = document.location.pathname + "#new") : (app.showFilesList(r), app.showSchemasList())
        }
    })
}, app.showStatus = function (e) {
    document.getElementById("name-status").innerHTML = e
}, app.openOnline = function (e) {
    app.changed = !1, app.store.load(e, function (e, t) {
        e ? app.notify.showError(e) : (app.setData(t.data), app.setMetaData(t), app.saveLocal(t), app.changed = !1, app.showStatus("saved"))
    })
}, app.askTitle = function (e, t) {
    util.prompt({
        title: "Save online",
        titleSubmit: "Save",
        description: "Enter a name for the document.<br><br>The saved document is stored online and can be shared with others via an url.",
        inputType: "text",
        inputName: "filename",
        inputDefault: e,
        callback: t
    })
}, app.formatError = function (e) {
    var t = e.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return -1 !== t.indexOf("Parse error") ? '<pre class="error">' + t + '</pre><a class="error" href="http://zaach.github.com/jsonlint/" target="_blank">validated by jsonlint</a>' : t
}, app.clearFile = function () {
    var e = {};
    codeEditor.set(e), treeEditor.set(e)
}, app.resize = function () {
    var e = document.getElementById("menu"), t = document.getElementById("treeEditor"), i = document.getElementById("codeEditor"), n = document.getElementById("splitter"), r = document.getElementById("buttons"), o = document.getElementById("drag"), s = document.getElementById("ad"), a = 15, l = window.innerWidth || document.body.offsetWidth || document.documentElement.offsetWidth, c = s ? s.clientWidth : 0;
    if (c && (l -= c + a), app.splitter) {
        app.splitter.setWidth(l);
        var h = app.splitter.getValue(), d = h > 0, u = 1 > h, f = d && u;
        r.style.display = f ? "" : "none";
        var p, m = n.clientWidth;
        if (d)if (u) {
            p = l * h - m / 2;
            var g = 8 == util.getInternetExplorerVersion();
            o.innerHTML = g ? "|" : "&#8942;", o.title = "Drag left or right to change the width of the panels"
        } else p = l * h - m, o.innerHTML = "&lsaquo;", o.title = "Drag left to show the tree editor"; else p = 0, o.innerHTML = "&rsaquo;", o.title = "Drag right to show the code editor";
        i.style.display = 0 == h ? "none" : "", i.style.width = Math.max(Math.round(p), 0) + "px", codeEditor.resize(), o.style.height = n.clientHeight - r.clientHeight - 2 * a - (f ? a : 0) + "px", o.style.lineHeight = o.style.height, t.style.display = 1 == h ? "none" : "", t.style.left = Math.round(p + m) + "px", t.style.width = Math.max(Math.round(l - p - m - 2), 0) + "px"
    }
    e && (c ? e.style.right = a + (c + a) + "px" : e.style.right = a + "px")
}, window.addEventListener("load", function () {
    var e = document.getElementById("ad");
    if (e && "function" == typeof window.getComputedStyle) {
        var t = window.getComputedStyle(e, null);
        e.style.width = t.getPropertyValue("width"), e.style.height = t.getPropertyValue("height")
    }
});