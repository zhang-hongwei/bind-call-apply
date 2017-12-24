if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1), // 剩余的参数转成数组
            fToBind = this, //保存原函数
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        // 维护原型关系
        if (this.prototype) {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
    };
}


if (! function () {}.bind) {

    Function.prototype.bind = function (context) {
        var self = this,
            args = Array.prototype.slice.call(arguments);

        return function () {
            return self.apply(context, args.slice(1));
        }
    };
}