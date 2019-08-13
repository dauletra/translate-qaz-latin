var assert = require('assert');
var { convert } = require('./converter');

describe('Empty strings', function() {
    it('converts empty strings', () => {
        assert.strictEqual(convert(''), '');
    });
    it('converts empty strings with length', () => {
        assert.strictEqual(convert('   '), '');
    });
    it('converts empty strings on sides', () => {
        assert.strictEqual(convert('   1'), '1');
        assert.strictEqual(convert('1   '), '1');
        assert.strictEqual(convert('  1  '), '1');
        assert.strictEqual(convert('   1  1  '), '1  1');
    });
});

describe('Alphabet', function() {
    it('converts Á á', () => {
        assert.strictEqual(convert('Ә ә'), 'Á á');
    });
    it('converts Ǵ ǵ', () => {
        assert.strictEqual(convert('Ғ ғ'), 'Ǵ ǵ');
    });
    it('converts I i', () => {
        assert.strictEqual(convert('І і'), 'I i');
    });
    it('converts I ı', () => {
        assert.strictEqual(convert('И и'), 'I ı');
    });
    it('converts Ń ń', () => {
        assert.strictEqual(convert('Ң ң'), 'Ń ń');
        assert.strictEqual(convert('мөртаңба еңбек таңертең мең заң'), 'mórtańba eńbek tańerteń meń zań')
    });
    it('converts Ó ó', () => {
        assert.strictEqual(convert('Ө ө'), 'Ó ó');
    });
    describe('Letter Ю', function() {
        it('converts аю', () => {
            assert.strictEqual(convert('аю'), 'aıý')
        });
        it('converts юрта', () => {
            assert.strictEqual(convert('юрта'), 'úrta')
        })
    });
    it('converts alphabet of 32+ letters', () => {
        assert.strictEqual(convert('А а Ә ә Б б Д д Е е Ф ф Г г Ғ ғ Һ һ Х х І і И и Й й Ж ж К к Л л М м Н н Ң ң О о Ө ө П п Қ қ Р р С с Т т Ұ ұ Ү ү В в Ы ы У у З з Ш ш Ч ч'), 'A a Á á B b D d E e F f G g Ǵ ǵ H h H h I i I ı I ı J j K k L l M m N n Ń ń O o Ó ó P p Q q R r S s T t U u Ú ú V v Y y Ý ý Z z Sh sh Ch ch');
    })
});

describe('Kazakh words', function() {
    it('converts text in kazakh 1', () => {
        assert.strictEqual(convert('сөз өнері, әлеуметтік мәні бар шығармалар жиынтығы'), 'sóz óneri, áleýmettik máni bar shyǵarmalar jıyntyǵy');
    });
    it('converts text in kazakh 2', () => {
        assert.strictEqual(convert('Адам бейнесін жасауда жеке бір адамға тән мінез-құлықты да, көпке ортақ сипаттарды да жинақтау тәжірибесі пайдаланылады.'), 'Adam beınesin jasaýda jeke bir adamǵa tán minez-qulyqty da, kópke ortaq sıpattardy da jınaqtaý tájirıbesi paıdalanylady.');
    });
    it('converts text in kazakh 3', () => {
        assert.strictEqual(convert('Оның дәстүрмен байланысы, жаңашылдығының да сыры осында. Сөйтіп, әр халықтың өзіндік Ә-інің үлгісі жалпы'), 'Onyń dástúrmen baılanysy, jańashyldyǵynyń da syry osynda. Sóıtip, ár halyqtyń ózindik Á-iniń úlgisi jalpy');
    });
    it('converts text in kazakh 4', () => {
        assert.strictEqual(convert('Ж. Аймауытовтың, М. Әуезовтің, С. Сейфуллиннің, Қ. Жансүгіровтің, Б. Майлиннің, С. Мұқановтың, Ғ. Мүсіреповтің, Ғ. Мұстафиннің,'), 'J. Aımaýytovtyń, M. Áýezovtiń, S. Seıfýllınniń, Q. Jansúgirovtiń, B. Maılınniń, S. Muqanovtyń, Ǵ. Músirepovtiń, Ǵ. Mustafınniń,');
    });
    it('converts text in kazakh 5', () => {
        assert.strictEqual(convert('Ә. ауыз әдебиеті және жазба әдебиеті болып бөлінеді. Қазақ әдебиетінің көшпелі дәстүрде туған, ауызша шығарылып, халық жадында сақталған'), 'Á. aýyz ádebıeti jáne jazba ádebıeti bolyp bólinedi. Qazaq ádebıetiniń kóshpeli dástúrde týǵan, aýyzsha shyǵarylyp, halyq jadynda saqtalǵan')
    })
});

describe('Unusual words', function() {
    it('converts word алкоголь', () => {
        assert.strictEqual(convert('алкоголь'), 'alkogól')
    });
    it('converts word манёвр', () => {
        assert.strictEqual(convert('манёвр'), 'manóvr')
    });
});
