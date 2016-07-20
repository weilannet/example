angular.module('jinmaofu.valueGoodsList.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = [{
        id: '111',
        title: '美国进口星冰乐美国进口星冰乐美国进口星冰乐美国进口星冰乐',
        src: 'http://wxdemo2.maxrocky.com/images/goodsPic1.jpg',
        shipping: '包邮',
        goods: '现货',
        price: '298.00'
    }, {
        id: '222',
        title: '日本进口巧克力日本进口巧克力日本进口巧克力日本进口巧克力',
        src: 'http://wxdemo2.maxrocky.com/images/goodsPic2.jpg',
        shipping: '包邮',
        goods: '现货',
        price: '198.00'
    }, {
        id: '222',
        src: 'http://wxdemo2.maxrocky.com/images/goodsPic3.jpg',
    }, {
        id: '222',
        src: 'http://wxdemo2.maxrocky.com/images/goodsPic4.jpg',
    }, {
        id: '222',
        src: 'http://wxdemo2.maxrocky.com/images/goodsPic5.jpg',
    }, {
        id: '222',
        src: 'http://wxdemo2.maxrocky.com/images/goodsPic6.jpg',
    }];

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getValueGoodList').respond(result);



}])