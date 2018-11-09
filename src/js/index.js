var List = Vue.extend({
	template: '#quote-list',
	data: function () {
		return {
			quotes: [],
			searchKey: ''
		};
  },
  filters: {
    formatUnix: function (value) {
      if (value) {
        const d = new Date(value+1000);
        return d.toLocaleString();
      }
    }
  },
  created: function() {
    this.fetchQuotes();
  },
  methods: {
    fetchQuotes() {
      this.$http.get('http://localhost:8080/api').then(response => {
        this.quotes = response.body;
      }, response => {
        this.quotes = [];
      });
    }
  },
	computed: {
		filteredQuotes: function () {
			var self = this;
      if (!self.quotes) return;
			return self.quotes.filter(function (quote) {
				return quote.author.indexOf(self.searchKey) !== -1
			})
		}
	}
});

var Quote = Vue.extend({
	template: '#quote',
	data: function () {
		return {
			quote: {}
		};
  },
  created: function () {
    this.fetchQuote();
  },
  methods: {
    fetchQuote: function () {
      const id = this.$route.params.quote_id;
      this.$http.get(`http://localhost:8080/api?id=${id}`).then(response => {
      	this.quote = response.body;
      }, response => {
      	this.quote = [];
      });
    }
  }
});

var QuoteEdit = Vue.extend({
	template: '#quote-edit',
	data: function () {
		return {
			quote: {}
		};
  },
  created: function() {
    this.fetchQuote();
  },
	methods: {
    fetchQuote: function () {
      const id = this.$route.params.quote_id;
      this.$http.get(`http://localhost:8080/api?id=${id}`).then(response => {
        this.quote = response.body;
      }, response => {
        this.quote = [];
      });
    },
		updateQuote: function () {
			var quote = this.quote;
      this.$http.post('http://localhost:8080/api', quote).then(response => {
        router.push('/');
      }, response => {
        alert(response.body);
      });
		}
	}
});

var QuoteDelete = Vue.extend({
	template: '#quote-delete',
	data: function () {
		return {
      quote: {}
		};
  },
  created: function () {
    this.fetchQuote();
  },
	methods: {
    fetchQuote: function () {
    	const id = this.$route.params.quote_id;
    	this.$http.get(`http://localhost:8080/api?id=${id}`).then(response => {
    		this.quote = response.body;
    	}, response => {
    		this.quote = [];
    	});
    },
		deleteQuote: function () {
      this.$http.delete(`http://localhost:8080/api?id=${this.quote.id}`).then(response => {
        router.push('/');
      }, response => {
        alert(response.body);
      });
		}
	}
});

var AddQuote = Vue.extend({
	template: '#add-quote',
	data: function () {
		return {
			quote: {
				author: '',
				quote: ''
			}
		}
	},
	methods: {
		createQuote: function () {
			var quote = this.quote;
      this.$http.put('http://localhost:8080/api', quote).then(response => {
        router.push('/');
      }, response => {
        alert(response.body);
      });
		}
	}
});

var router = new VueRouter({
	routes: [{
			path: '/',
			component: List
		},
		{
			path: '/quotes/:quote_id',
			component: Quote,
			name: 'quote'
		},
		{
			path: '/add-quote',
			component: AddQuote
		},
		{
			path: '/quote/:quote_id/edit',
			component: QuoteEdit,
			name: 'quote-edit'
		},
		{
			path: '/quote/:quote_id/delete',
			component: QuoteDelete,
			name: 'quote-delete'
		}
	]
});

new Vue({
	el: '#app',
	router: router,
	template: '<router-view></router-view>'
});
