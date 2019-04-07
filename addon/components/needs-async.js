import Component from '@ember/component';
import layout from '../templates/components/needs-async';

/**
  Usage:

  ```hbs
    <NeedsAsync @needs=(find-record 'user' '1') as |States|>
      <States.loading>
        <!-- render a loading state here -->
      </States.loading>
      <States.loaded as |user|>
        <!-- render whatever needs 'user' here -->
      </States.loaded>
      <States.error as |error|>
        <!-- render an error state here optionally using 'error' -->
      </States.error>
    </NeedsAsync>
  ```

  @class NeedsAsync
  @yield {Hash} States
  @yield {TaskInstance} States.taskInstance an Ember Concurrency TaskInstance
  @yield {Component} States.loading a component that renders its block if the task instance is still loading
  @yield {Component} States.loaded a component that renders its block and yields the task value once the task is done loading
  @yield {Component} States.error a component that renders its block and yields an error if the tak encountered an error
*/
export default Component.extend({
  layout,
  tagName: '',

  needs: null,
});
