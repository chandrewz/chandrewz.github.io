I've been working with [Vue.js](https://vuejs.org/) for a project for about a month now, and it's pretty fun! I was searching up how to handle authentication with [vue-router](http://router.vuejs.org/en/) and there weren't too many resources. I originally had a parent function that handled redirects upon `ready()`, but there are a few problems:
1. Too many one-liners. I have to call the function each time in many views.
2. You see a "flash" of the the dashboard before being redirected the the login page because `ready()` fires the redirect after part of the rendering is done.

So I knew I had to do it better.

Ryan Chenkie wrote a tutorial on authentication: [Build an App with Vue.js: From Authentication to Calling an API](https://auth0.com/blog/2015/11/13/build-an-app-with-vuejs/). It helped me get started but I ended up doing things a differently. He uses vue-router's `canActivate` hook and injects it in his `.vue` file. I noticed in vue-router's documentation, there are custom fields which can be used for authentication. So I wanted to take advantage of `beforeEach` like the documentation does in its example.

#### Write an auth service

I had my login/logout functions in my .vue files originally, so the login code was in `Login.vue` and not accessible to my vue-router. It'd make sense to extract the authentication service out so it can be accessed by both the router and the Vue object. I prefer to keep my `user` object in my `$root`.

`/services/auth.js`

```javascript
import {router} from '../app.js'

export default {

	// authentication status
	authenticated: false,

	// Send a request to the login URL and save the returned JWT
	login(context, creds, redirect) {
		context.$http.post('/api/login', creds, (data) => {
			localStorage.setItem('user', JSON.stringify(data))

			this.authenticated = true
			context.$root.user = data

			// Redirect to a specified route
			if (redirect) {
				router.go(redirect)
			}

		}).error((errors) => {
			context.errors = errors;
		})
	},

	// To log out
	logout: function() {
		localStorage.removeItem('user');
		this.authenticated = false;
		router.go('/login')
	}
}
```

#### Use a custom field `auth` and check authentication using `beforeEach`

I add an `auth: true` to the root route of my application, so all my app routes are now "authed" :) When a nested route is matched, all custom fields will be merged on to the same `$route` object. When a sub route and a parent route has the same custom field, the sub route's value will overwrite the parent's.

A condensed version of my `app.js` - hopefully it provides an example of how your router, auth service, and root Vue object should interact.

```javascript

export var router = new VueRouter();

router.map({
	'/': {
		component: require('./views/App.vue'),
		subRoutes: {
			'/': {
				component: require('./views/Dashboard.vue'),
				name: 'Dashboard'
			},
			'settings': {
				component: require('./views/settings/Settings.vue'),
				name: 'Settings'
			},
		},
		auth: true
	},
	'login': {
		component: require('./views/Login.vue')
	}
});

// authentication service
import Auth from './services/auth.js';

router.beforeEach(function (transition) {
	if (transition.to.auth && !Auth.authenticated) {
		// if route requires auth and user isn't authenticated
		transition.redirect('/login')
	} else {
		transition.next()
	}
})

router.start(Vue.extend({
	data: function() {
		return { user: {} };
	},
	computed: {
		auth: function() {
			return Auth;
		}
	},
	methods: {
		checkLocalStorage: function() {
			if (localStorage.user) {
				this.user = JSON.parse(localStorage.user);
				Vue.http.headers.common['Authorization'] = 'Bearer ' + this.user.api_token;
				Auth.authenticated = true;
			}
		},
		logout: function() {
			this.user = {};
			Auth.logout();
		}
	},
	ready: function() {
		this.checkLocalStorage();
	}
}), '#app');

```