(function ()
{
    function vaild_ip(addr)
    {
        var php = require('./php.js');
        return php.inet_pton(addr) !== false;
    }

    function ver(addr)
    {
        var php = require('./php.js');
        if (php.ip2long(addr)) //IPv4
        {
            return 4;
        }
        else //IPv6
        {
            return 6;
        }
    }

    function in_range(addr, range)
    {
        if (typeof (range) === 'string')
        {
            if (range.indexOf('/') !== -1)
            {
                var range_data = range.split('/');

                var ipaddr = require('ipaddr.js');

                var parse_addr = ipaddr.parse(addr);
                var parse_range = ipaddr.parse(range_data[0]);

                return parse_addr.match(parse_range, range_data[1]);
            }
            else
            {
                return false;
            }
        }
        else if (typeof (range) === 'object') //list
        {
            for (var check_range in range)
            {
                if (in_range(addr, range[check_range]) === true)
                {
                    return true;
                }
            }
            return false;
        }
        else
        {
            return false;
        }
    }

    // Export public API
    var range_check = {};
    range_check.vaild_ip = vaild_ip;
    range_check.ver = ver;
    range_check.in_range = in_range;
    module.exports = range_check;
}());