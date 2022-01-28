
class T9Dictionary {
    constructor() {
        this.items = [];
        this.items.push(['-'])
        this.items.push(['--'])
        this.items.push(['a', 'b', 'c'])
        this.items.push(['d', 'e', 'f'])
        this.items.push(['g', 'h', 'i'])
        this.items.push(['j', 'k', 'l'])
        this.items.push(['m', 'n', 'o'])
        this.items.push(['p', 'q', 'r'])
        this.items.push(['s', 't', 'u'])
        this.items.push(['v', 'w', 'x'])
    }

    getItem = (key) => {
        if (key) return this.items[key];
    }
}

const contains = (list, item) => {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == item) {
            return true;
        }
    }
    return false;
}


exports.findWords = (inputs) => {
    var result = "";

    const distnctArr = [];
    const arr = [];
    if (inputs) {
        //get distinct list of inputs
        for (var i = 0; i < inputs.length; i++) {

            var index = 0;
            while (index < inputs.length) {
                if (contains(distnctArr, inputs[i]) == true) {
                    break;
                } else {
                    distnctArr.push(inputs[i]);
                }
                index++;
            }
        }


        // get combinations list
        var d = new T9Dictionary();
        for (var i = 0; i < distnctArr.length; i++) {
            var dis = d.getItem(distnctArr[i]);
            arr.push(dis);
        }

        // Number of arrays
        let n = arr.length;

        // To keep track of next element in
        // each of the n arrays
        let indices = new Array(n);

        // Initialize with first element's index
        for (let i = 0; i < n; i++)
            indices[i] = 0;

        while (true) {

            // Print current combination
            for (let i = 0; i < n; i++)
                result +=
                    arr[i][indices[i]] + ",";

            result += "/";

            // Find the rightmost array that has more
            // elements left after the current element
            // in that array
            let next = n - 1;
            while (next >= 0 && (indices[next] + 1 >=
                arr[next].length))
                next--;

            // No such array is found so no more
            // combinations left
            if (next < 0)
                break;

            // If found move to next element in that
            // array
            indices[next]++;

            // For all arrays to the right of this
            // array current index again points to
            // first element
            for (let i = next + 1; i < n; i++)
                indices[i] = 0;
        }
    }
    return result;
}
