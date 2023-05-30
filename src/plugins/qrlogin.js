!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define(n)
    : ((e = e || self).WwLogin = n());
})(this, function () {
  "use strict";
  function e(e, n) {
    if (!(e instanceof n))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(e, n) {
    for (var t = 0; t < n.length; t++) {
      var o = n[t];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(e, o.key, o);
    }
  }
  var t = {
    sso: "/wwopen/sso/qrConnect",
    tww: "/login/wwLogin/sso/qrConnect",
    native: "/native/sso/qrConnect",
  };
  return (function () {
    function o() {
      var n =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      e(this, o),
        (n.version = "1.2.4"),
        (this.options = n),
        (this.url = this.getUrl(n)),
        this.init(this.url);
    }
    var i, s, r;
    return (
      (i = o),
      (s = [
        {
          key: "init",
          value: function (e) {
            this.options.is_mobile
              ? (window.location = e)
              : this.createFrame(e);
          },
        },
        {
          key: "getUrl",
          value: function (e) {
            var n = ["login_type=jssdk"];
            for (var o in e)
              e[o] && "id" !== o && n.push("".concat(o, "=").concat(e[o]));
            e.business_type = e.business_type || "sso";
            var i = t[e.business_type];
            if (!i)
              throw new Error(
                "Argument business_type not match. Current version is ".concat(
                  "1.2.4",
                  "."
                )
              );
            return ""
              .concat("https://open.work.weixin.qq.com")
              .concat(i, "?")
              .concat(n.join("&"));
          },
        },
        {
          key: "createFrame",
          value: function (e) {
            var n = document.createElement("iframe"),
              t = document.getElementById(this.options.id);
            (n.src = e),
              (n.frameBorder = "0"),
              (n.allowTransparency = "true"),
              (n.scrolling = "no"),
              (n.width = "300px"),
              (n.height = "400px"),
              (t.innerHTML = ""),
              t.appendChild(n),
              (n.onload = function () {
                n.contentWindow.postMessage &&
                  window.addEventListener &&
                  (window.addEventListener("message", function (e) {
                    var n = e.data;
                    "string" == typeof n &&
                      /^http/.test(n) &&
                      n &&
                      /work.weixin.qq.com$/.test(e.origin) &&
                      /https?:\/\//.test(e.data) &&
                      (window.location.href = n);
                  }),
                  n.contentWindow.postMessage("ask_usePostMessage", "*"));
              });
          },
        },
      ]) && n(i.prototype, s),
      r && n(i, r),
      o
    );
  })();
});
