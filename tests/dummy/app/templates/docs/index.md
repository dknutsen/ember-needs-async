# Introduction

ember-needs-async is a little experiment into the idea of loading data in templates. It's very lightweight and consists of just a couple simple parts:

* a `needs-async` provider component which takes a "need" (technically an ember concurrency task instance) and yields "state" provider components such as "loading", "loaded" and "error"
* a few helpers which correspond to common Ember Data operations such as `find-record`, `has-many`, etc.

These pieces together allow declarative asynchronous data fetching and rendering using only a handlebars template. While there are undoubtedly very valid criticisms of this approach and particularly this implementation, there are probably also some valid use cases for loading data in this manner. It's also fun to play around with. Check out {{#link-to "docs.usage"}}usage{{/link-to}} for the basics on how to use the addon or head over to {{#link-to "examples"}}examples{{/link-to}} to see some samples and ideas.
