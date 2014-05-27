describe('rdx.quotes.Quotes', function(){
  var $httpBackend, Quotes;

  beforeEach(module('rdx.quotes'));

  beforeEach(module(function ($provide) {
    Interview = {
      current: function() { return {id: 2} }
    };
    $provide.value('Interview', Interview);
  }));

  beforeEach(inject(function(_$httpBackend_, _Quotes_) {
    Quotes = _Quotes_;
    $httpBackend = _$httpBackend_;
  }));

  it('can get the quotes', function() {
    var response = [ { AnnualPremium: 609.25,
                        MonthlyPremium: 53,
                        QuarterlyPremium: 170.59,
                        SemiAnnualPremium: 316.81,
                        FaceAmount: 25000,
                        HealthRating: '4',
                        PlanCode: 'RDEXPT1',
                        TermLength: 10,
                        Tobacco: true },
                      { AnnualPremium: 1133.5,
                        MonthlyPremium: 98.61,
                        QuarterlyPremium: 317.38,
                        SemiAnnualPremium: 589.42,
                        FaceAmount: 50000,
                        HealthRating: '4',
                        PlanCode: 'RDEXPT1',
                        TermLength: 10,
                        Tobacco: true }
                      ];

    $httpBackend.expectGET('api/quotes/2').respond(response);

    var quotesPromise = Quotes.getQuotes();

    var quotes;
    quotesPromise.then(function(resp) {
      quotes = resp;
    });

    $httpBackend.flush();

    expect(quotes).toEqual(response);
  });

  it('can find a quote by premium', function() {
  });

});
