describe('rdx.interview.InterviewController', function() {
  var scope, Cases;

  beforeEach(module('rdx.interview'));
  beforeEach(module('ui.router'));

  beforeEach(module(function ($provide) {
    Interview = {
      current: function() { return {} },
      save: function(interview) {}
    };
    $provide.value('Interview', Interview);
  }));

  describe('initialization and scope assignments', function() {

    beforeEach(inject(function($rootScope, $state, $controller) {
      scope = $rootScope.$new();
      scope.interview = {};
      scope.$state = $state;
      $controller('InterviewController', {$scope: scope, Interview: Interview});
    }));

    it('should assign breadcrumbs with interview step states', function() {
      expect(scope.breadcrumbs.length).toEqual(5);
      var crumbs = [];
      angular.forEach(scope.breadcrumbs, function(crumb) {
        crumbs.push(crumb.breadcrumb);
      }, crumbs);
      expect(crumbs).toEqual(['Who Are You?','About You','Your Quote','Who Wins?','Review']);
    });

    it('should define a save method', function() {
      expect(angular.isFunction(scope.save)).toBe(true);
    });

    it('should define a pageHeader method', function() {
      expect(angular.isFunction(scope.pageHeader)).toBe(true);
    });
  });

  describe('functions', function() {

    beforeEach(inject(function($rootScope, $state, $controller) {
      scope = $rootScope.$new();
      scope.$state = $state;
      scope.$state.current = {
        pageHeader: 'I am a page header'
      };
      $controller('InterviewController', {$scope: scope, Interview: Interview});
    }));

    it('should set submitted true and not do anything else when save(false, "nextStep") is called', function() {
      scope.save(false, 'nextStep');
      expect(scope.submitted).toBe(true);
    });

    it('should save current interview, set submitted false and go to the next step when save(true, "nextStep") is called', function() {
      spyOn(Interview, 'save');
      spyOn(scope.$state, 'go');

      scope.save(true, 'nextStep');

      expect(Interview.save).toHaveBeenCalled();
      expect(scope.$state.go).toHaveBeenCalledWith('nextStep');
      expect(scope.submitted).toBe(false);
    });

    it('should return the current pageHeader when pageHeader() is called', function() {
      expect(scope.pageHeader()).toEqual('I am a page header');
    });
  });
});
