
function toString(utc, length, timeOnly) {

    let outputString;

    if (utc) {
        outputString = this.dateTime.toISOString();
    } else {
        outputString = this.dateTime.getFullYear() + '-'
            + pad(this.dateTime.getMonth() + 1) + '-'
            + pad(this.dateTime.getDate()) + 'T'
            + pad(this.dateTime.getHours()) + ':'
            + pad(this.dateTime.getMinutes()) + ':'
            + pad(this.dateTime.getSeconds());

        if (this.dateTime.getTimezoneOffset() == 0) {
            outputString += 'Z';
        } else {
            outputString += getOffsetFromUTC(this.dateTime);
        }
    }
    
    if (!length) {
        length = outputString.length;
    }

    return outputString.substr(timeOnly ? 11 : 0, length - (timeOnly ? 11 : 0));

    function pad(n) { return n < 10 ? '0' + n : n }

    function getOffsetFromUTC(dateTime) {
        var offset = dateTime.getTimezoneOffset();
        return ((offset < 0 ? '+' : '-')
            + pad(Math.abs(offset / 60), 2)
            + ':'
            + pad(Math.abs(offset % 60), 2))
    };
}

// https://stackoverflow.com/a/16177227/1527706
export class DateTime {Z

    constructor(obj) {
        if (!obj) {
            obj = new Date();
        }

        if (obj instanceof Date) {
            this.dateTime = obj;
        } else if (typeof obj.dateTime === "string") {
            this.dateTime = new Date(Date.parse(obj.dateTime));
        } else if (obj instanceof DateTime) {
            this.dateTime = obj.dateTime;
        } else if (typeof obj === "number") {
            this.dateTime = new Date(obj);
        } else if (obj.dateTime instanceof Date) {
            this.dateTime = obj.dateTime;
        } else {
            this.dateTime = new Date(Date.parse(obj));
        }
    }

    toString() {
        return toString.apply(this, arguments && arguments.length > 0 ? arguments : [false, 10]);
    }

    toShortString(utc) {
        return this.toString(utc, 10);
    }

    toTimeString(utc) {
        return this.toString(utc, 16, true);
    }
    
    toShortMonthString() {
        return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][this.dateTime.getMonth()];
    }
    
    toMonthString() {
        return ["January","Febuary","March","April","May","June","July","August","September","October","November","December"][this.dateTime.getMonth()];
    }

    get key() {
        return this.toShortString(false);
    }
    
    date(utc) {
        return new DateTime(this.toShortString(utc));
    }

    addDays(days) {
        return new DateTime(new Date(this.dateTime).setDate(this.dateTime.getDate() + days));
    }

    daysBetween(other) {
      other = new DateTime(other);

      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(this.dateTime.getFullYear(), this.dateTime.getMonth(), this.dateTime.getDate());
      const utc2 = Date.UTC(other.dateTime.getFullYear(), other.dateTime.getMonth(), other.dateTime.getDate());

      return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
    }
}

DateTime.fromProps = (obj) => {
    return (obj.props && obj.props.dateTime) ||
        (obj.getParam && obj.getParam("dateTime")) ||
        obj.props.navigation.getParam("dateTime") ||
        new DateTime();
};






































