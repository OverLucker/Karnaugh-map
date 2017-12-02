export default function (func, ms) {
    // декоратор на функцию который не дает ей вызываться чаще чем в ms,
    // при этом всегда вызовется последний раз
    // хорошо работает при запросах к серверу повешенных на onChange у инпута

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}