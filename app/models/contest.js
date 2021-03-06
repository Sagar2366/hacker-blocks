/**
 * Created by umair on 30/12/16.
 */

import DS from 'ember-data';
import moment from 'npm:moment';

export default DS.Model.extend({
  name: DS.attr(),
  startTime: DS.attr(),
  endTime: DS.attr(),
  location: DS.attr(),
  showBanner: DS.attr(),
  image: DS.attr(),
  duration: DS.attr(),
  problems: DS.hasMany('problems'),
  allowEditorialUnlocks: DS.attr (),
  allowTestcaseUnlocks: DS.attr (),
  quizzes: DS.hasMany('quizzes', { async: true }),
  description: DS.attr(),
  competitionName: DS.attr (),
  competitionId: DS.attr (),
  meta: DS.attr(),
  problemCount: Ember.computed ('meta.problem-count', function () {
    const metaProblemCount = this.get ('meta.problem-count')

    if (! metaProblemCount) {
      return this.get ('problems.length')
    }

    return metaProblemCount
  }),
  showCounts: Ember.computed ('problemCount', function () {
    return (parseInt (this.get ('problemCount')) > 0)
  }),
  quizCount: 0, // TODO
  showLeaderboard: DS.attr(),
  allowedLanguages: DS.attr(),
  showTags: DS.attr(),
  java: Ember.computed('allowedLanguages.[]', function(){
      return this.get('allowedLanguages').includes('java');
  }),
  c: Ember.computed('allowedLanguages.[]', function(){
      return this.get('allowedLanguages').includes('c');
  }),
  cpp: Ember.computed('allowedLanguages.[]', function(){
      return this.get('allowedLanguages').includes('cpp');
  }),
  js: Ember.computed('allowedLanguages.[]', function(){
      return this.get('allowedLanguages').includes('js');
  }),
  csharp: Ember.computed('allowedLanguages.[]', function(){
      return this.get('allowedLanguages').includes('csharp');
  }),
  py2: Ember.computed('allowedLanguages.[]', function(){
      return this.get('allowedLanguages').includes('py2');
  }),
  endTimeObj: Ember.computed('endTime', {
    get() {
      let obj = {};
      let unix = moment.unix(this.get('endTime'));
      obj.day = unix.format('DD');
      obj.month = moment.monthsShort()[unix.format('M') - 1].toUpperCase();
      obj.hour = unix.format('h');
      obj.min = unix.format('mm');
      let meri = unix.format('a');
      obj.meri1 = meri.substring(0, 1).toUpperCase();
      obj.meri2 = meri.substring(1).toUpperCase();
      return obj;
    }
  }),
  points: Ember.computed ('problemCount', function () {
    return this.get ('problemCount') * 100
  }),
  isFinished: Ember.computed('endTime', {
    get() {
      return moment().unix() > this.get('endTime');
    }
  })
});
