class Hashtag {
	constructor(string) {
		this._string = string;
	}

	_checkString(string) {
		if(string.length === 0 
			|| string.trim().length === 0
			|| string.replace(/\s\s+/g, " ").length >= 140) {
				return false;
		} else {
			return true;
		}
	}

	create() {
		if(this._checkString(this._string)) {
			var string = this._string.trim().replace(/\s\s+/g, " ");
			var result = string.split(" ").map(word => {
				return word[0].toUpperCase() + word.slice(1); 
			});

			return "#" + result.join("");
		} else {

		}
	}
}