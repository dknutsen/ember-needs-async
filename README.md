ember-needs-async
==============================================================================

Lightweight provider component and helpers that allow declarative, composable async data fetching and async-aware rendering in just a template. The component waits for an async task and yields the results as well as loading and error states. It can also be used with any ember-concurrency task. The helpers provide shorthand concurrency task wrappers around common Ember Data operations. Example:

```
<div class="user-card">
  <NeedsAsync @needs={{find-record "user" userId}} as |states|>
    {{#states.loading}}
      <LoadingSpinner/>
    {{/states.loading}}
  
    {{#states.error as |error|}}
      There was an error loading the user
      <div class="error-message">{{error}}</div>
    {{/states.error}}
  
    {{#states.loaded as |user|}}
      <img class="user-card-avatar" src={{user.avatar}} alt="{{user.fullName}} profile picture">
      <div class="user-card-name">{{user.firstName}} {{user.lastName}}</div>
      <div class="user-card-occupation">{{user.jobTitle}} at {{user.company}}</div>
    {{/states.loaded}}
  </NeedsAsync>
</div>
```


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-needs-async
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
