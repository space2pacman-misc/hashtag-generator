Vue.component("hashtag-link", {
	data() {
		return {
			link: this.item.link.replace("%hashtag%", this.hashtag)
		}
	},
	props: ["item", "hashtag"],
	template: "#template-hashtag-link"
})

Vue.component("hashtag-card", {
	props: ["hashtag"],
	template: "#template-hashtag-card"
})

var app = new Vue({
	el: "#app",
	data: {
		text: "",
		hashtags: [],
		uploadData: [],
		links: [
			{
				link: "https://www.instagram.com/explore/tags/%hashtag%",
				icon: "img/instagram.svg"
			},
			{
				link: "https://twitter.com/hashtag/%hashtag%?src=hash",
				icon: "img/twitter.svg"
			}
		],
		db: {
			url: "https://api.myjson.com/bins/t1p5y"
		}
	},
	methods: {
		createHashtag() {
			var hashtag = new Hashtag(this.text).create();

			this.uploadData.push({
				link: hashtag.slice(1).toLowerCase(),
				label: hashtag
			});
			this.text = "";
			this.update(handler.bind(this));

			function handler(data) {
				this.hashtags = JSON.parse(data);
				this.uploadData = [];		
			}
		},
		load(cb) {
			this._ajax("GET", this.db.url, null, handler.bind(this));

			function handler(data) {
				this.hashtags = JSON.parse(data);
				if(cb) cb();
			}
		},
		update(cb) {
			this.load(handler.bind(this));

			function handler() {
				this._ajax("PUT", this.db.url, JSON.stringify(this.uploadData.concat(this.hashtags)), cb);
			}
		},
		clear() {
			this._ajax("PUT", this.db.url, "[]");
			this.load();
		},
		_ajax(type, url, data, cb) {
			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = () => {
				if(xhr.status === 200 && xhr.readyState === 4) {
					if(cb) cb(xhr.responseText);
				}
			}

			switch(type) {
				case "GET":
					xhr.open(type, url);
					xhr.send();

					break;
				case "PUT":
					xhr.open(type, url);
					xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
					xhr.send(data);

					break;
			}
		}
	},
	created() {
		this.load();
	}
})