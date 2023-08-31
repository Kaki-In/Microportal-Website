export class Shelve {
	constructor () {
		return new Proxy(this, 
		{
			get (target, name) {
				return target.get(name);
			},
			
			set (target, name, value) {
				return target.set(name, value);
			},

			deleteProperty (target, name) {
				return target.deleteProperty(name);
			}
			
		});
	}

	get (name) {
		if (name === "constructor") {
			return this.constructor;
		}
		try {
			let cookie = document.cookie.split("; ").find((row) => row.startsWith(name + "="));
			if (cookie) {
				let result = JSON.parse(cookie.split("=")[1]);
				return result;
			}
		} catch {
		}
	}
	
	set (name, value) {
		var dateExpiration = new Date();
		var time = dateExpiration.getTime();
		var expireTime = time + 24 * 3600 * 1000;
		dateExpiration.setTime(expireTime);
		document.cookie = name + "=" + JSON.stringify(value) + "; expires=" + dateExpiration.toGMTString() + "; path=/";
		return true;
	}

	deleteProperty(name) {
		document.cookie = name + "=; expires=January 1 1970 12:0:0 GMT+00:00; path=/";
		return true;
	}
	
}
