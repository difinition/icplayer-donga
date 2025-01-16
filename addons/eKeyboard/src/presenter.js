function AddoneKeyboard_create(){

    (function(){
//        console.log("한글 조합");
        'use strict';
        var CHO = [
                'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
                'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
                'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ',
                'ㅍ', 'ㅎ'
            ],
            JUNG = [
                'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
                'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', ['ㅗ', 'ㅏ'], ['ㅗ', 'ㅐ'],
                ['ㅗ', 'ㅣ'], 'ㅛ', 'ㅜ', ['ㅜ','ㅓ'], ['ㅜ','ㅔ'], ['ㅜ','ㅣ'],
                'ㅠ', 'ㅡ', ['ㅡ', 'ㅣ'], 'ㅣ'
            ],
            JONG = [
                '', 'ㄱ', 'ㄲ', ['ㄱ','ㅅ'], 'ㄴ', ['ㄴ','ㅈ'], ['ㄴ', 'ㅎ'], 'ㄷ', 'ㄹ',
                ['ㄹ', 'ㄱ'], ['ㄹ','ㅁ'], ['ㄹ','ㅂ'], ['ㄹ','ㅅ'], ['ㄹ','ㅌ'], ['ㄹ','ㅍ'], ['ㄹ','ㅎ'], 'ㅁ',
                'ㅂ', ['ㅂ','ㅅ'], 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
            ],
            HANGUL_OFFSET = 0xAC00,
            CONSONANTS = [
                'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ',
                'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
                'ㅁ', 'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ',
                'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
            ],
            COMPLETE_CHO = [
                'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
                'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
                'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
            ],
            COMPLETE_JUNG = [
                'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
                'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ',
                'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
                'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
            ],
            COMPLETE_JONG = [
                '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ',
                'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ',
                'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
            ],
            COMPLEX_CONSONANTS = [
                ['ㄱ','ㅅ','ㄳ'],
                ['ㄴ','ㅈ','ㄵ'],
                ['ㄴ','ㅎ','ㄶ'],
                ['ㄹ','ㄱ','ㄺ'],
                ['ㄹ','ㅁ','ㄻ'],
                ['ㄹ','ㅂ','ㄼ'],
                ['ㄹ','ㅅ','ㄽ'],
                ['ㄹ','ㅌ','ㄾ'],
                ['ㄹ','ㅍ','ㄿ'],
                ['ㄹ','ㅎ','ㅀ'],
                ['ㅂ','ㅅ','ㅄ']
            ],
            COMPLEX_VOWELS = [
                ['ㅗ','ㅏ','ㅘ'],
                ['ㅗ','ㅐ','ㅙ'],
                ['ㅗ','ㅣ','ㅚ'],
                ['ㅜ','ㅓ','ㅝ'],
                ['ㅜ','ㅔ','ㅞ'],
                ['ㅜ','ㅣ','ㅟ'],
                ['ㅡ','ㅣ','ㅢ']
            ],
            CONSONANTS_HASH,
            CHO_HASH,
            JUNG_HASH,
            JONG_HASH,
            COMPLEX_CONSONANTS_HASH,
            COMPLEX_VOWELS_HASH;

        function _makeHash(array){
            var length = array.length,
                hash = {0 : 0};

            for (var i = 0; i<length; i++) {
                if(array[i]){
                    hash[array[i].charCodeAt(0)] = i;
                }

            }
            return hash;
        }

        CONSONANTS_HASH = _makeHash(CONSONANTS);
        CHO_HASH = _makeHash(COMPLETE_CHO);
        JUNG_HASH = _makeHash(COMPLETE_JUNG);
        JONG_HASH = _makeHash(COMPLETE_JONG);

        function _makeComplexHash(array){
            var length = array.length,
                hash = {},
                code1,
                code2
            ;
            for (var i = 0; i < length; i++) {
            code1 = array[i][0].charCodeAt(0);
            code2 = array[i][1].charCodeAt(0);
            if (typeof hash[code1] === 'undefined') {
                hash[code1] = {};
            }
            hash[code1][code2] = array[i][2].charCodeAt(0);
            }
            return hash;
        }

        COMPLEX_CONSONANTS_HASH = _makeComplexHash(COMPLEX_CONSONANTS);
        COMPLEX_VOWELS_HASH = _makeComplexHash(COMPLEX_VOWELS);

        function _isConsonant(c) {
            return typeof CONSONANTS_HASH[c] !== 'undefined';
        }

        function _isCho(c){
            return typeof CHO_HASH[c] !== 'undefined';
        }

        function _isJung(c){
            return typeof JUNG_HASH[c] !== 'undefined';
        }

        function _isJong(c){
            return typeof JONG_HASH[c] !== 'undefined';
        }

        function _isHangul(c /* code number */){
            return 0xAC00 <= c && c <= 0xd7a3;
        }

        function _isJungJoinable(a,b){
            return (COMPLEX_VOWELS_HASH[a] && COMPLEX_VOWELS_HASH[a][b]) ? COMPLEX_VOWELS_HASH[a][b] : false;
        }

        function _isJongJoinable(a,b){
            return COMPLEX_CONSONANTS_HASH[a] && COMPLEX_CONSONANTS_HASH[a][b] ? COMPLEX_CONSONANTS_HASH[a][b] : false;
        }

        var disassemble = function(string, grouped){
            if (string === null) {
            throw new Error('Arguments cannot be null');
            }

            if (typeof string === 'object') {
            string = string.join('');
            }

            var result = [],
                length = string.length,
                cho,
                jung,
                jong,
                code,
                r
            ;

            for (var i = 0; i < length; i++) {
            var temp = [];

            code = string.charCodeAt(i);
            if (_isHangul(code)) { // 완성된 한글이면
                code -= HANGUL_OFFSET;
                jong = code % 28;
                jung = (code - jong) / 28 % 21;
                cho = parseInt((code - jong) / 28 / 21);
                temp.push(CHO[cho]);
                if (typeof JUNG[jung] === 'object') {
                temp = temp.concat(JUNG[jung]);
                } else {
                temp.push(JUNG[jung]);
                }
                if (jong > 0) {
                if(typeof JONG[jong] === 'object') {
                    temp = temp.concat(JONG[jong]);
                } else {
                    temp.push(JONG[jong]);
                }
                }
            } else if (_isConsonant(code)) { //자음이면
                if (_isCho(code)) {
                r = CHO[CHO_HASH[code]];
                } else {
                r = JONG[JONG_HASH[code]];
                }
                if (typeof r === 'string') {
                temp.push(r);
                } else {
                temp = temp.concat(r);
                }
            } else if (_isJung(code)) {
                r = JUNG[JUNG_HASH[code]];
                if (typeof r === 'string') {
                temp.push(r);
                } else {
                temp = temp.concat(r);
                }
            } else {
                temp.push(string.charAt(i));
            }

            if(grouped) result.push(temp);
            else result = result.concat(temp);
            }

            return result;
        };

        var disassembleToString =  function(str) {
            if (typeof str !== 'string') {
            return '';
            }
            str = disassemble(str);
            return str.join('');
        };


        CONSONANTS_HASH = _makeHash(CONSONANTS);
        CHO_HASH = _makeHash(COMPLETE_CHO);
        JUNG_HASH = _makeHash(COMPLETE_JUNG);
        JONG_HASH = _makeHash(COMPLETE_JONG);

        function _makeComplexHash(array){
            var length = array.length,
                hash = {},
                code1,
                code2
            ;
            for (var i = 0; i < length; i++) {
            code1 = array[i][0].charCodeAt(0);
            code2 = array[i][1].charCodeAt(0);
            if (typeof hash[code1] === 'undefined') {
                hash[code1] = {};
            }
            hash[code1][code2] = array[i][2].charCodeAt(0);
            }
            return hash;
        }

        COMPLEX_CONSONANTS_HASH = _makeComplexHash(COMPLEX_CONSONANTS);
        COMPLEX_VOWELS_HASH = _makeComplexHash(COMPLEX_VOWELS);

        function _isConsonant(c) {
            return typeof CONSONANTS_HASH[c] !== 'undefined';
        }

        function _isCho(c){
            return typeof CHO_HASH[c] !== 'undefined';
        }

        function _isJung(c){
            return typeof JUNG_HASH[c] !== 'undefined';
        }

        function _isJong(c){
            return typeof JONG_HASH[c] !== 'undefined';
        }

        function _isHangul(c /* code number */){
            return 0xAC00 <= c && c <= 0xd7a3;
        }

        function _isJungJoinable(a,b){
            return (COMPLEX_VOWELS_HASH[a] && COMPLEX_VOWELS_HASH[a][b]) ? COMPLEX_VOWELS_HASH[a][b] : false;
        }

        function _isJongJoinable(a,b){
            return COMPLEX_CONSONANTS_HASH[a] && COMPLEX_CONSONANTS_HASH[a][b] ? COMPLEX_CONSONANTS_HASH[a][b] : false;
        }

        var disassemble = function(string, grouped){
            if (string === null) {
            throw new Error('Arguments cannot be null');
            }

            if (typeof string === 'object') {
            string = string.join('');
            }

            var result = [],
                length = string.length,
                cho,
                jung,
                jong,
                code,
                r
            ;

            for (var i = 0; i < length; i++) {
            var temp = [];

            code = string.charCodeAt(i);
            if (_isHangul(code)) { // 완성된 한글이면
                code -= HANGUL_OFFSET;
                jong = code % 28;
                jung = (code - jong) / 28 % 21;
                cho = parseInt((code - jong) / 28 / 21);
                temp.push(CHO[cho]);
                if (typeof JUNG[jung] === 'object') {
                temp = temp.concat(JUNG[jung]);
                } else {
                temp.push(JUNG[jung]);
                }
                if (jong > 0) {
                if(typeof JONG[jong] === 'object') {
                    temp = temp.concat(JONG[jong]);
                } else {
                    temp.push(JONG[jong]);
                }
                }
            } else if (_isConsonant(code)) { //자음이면
                if (_isCho(code)) {
                r = CHO[CHO_HASH[code]];
                } else {
                r = JONG[JONG_HASH[code]];
                }
                if (typeof r === 'string') {
                temp.push(r);
                } else {
                temp = temp.concat(r);
                }
            } else if (_isJung(code)) {
                r = JUNG[JUNG_HASH[code]];
                if (typeof r === 'string') {
                temp.push(r);
                } else {
                temp = temp.concat(r);
                }
            } else {
                temp.push(string.charAt(i));
            }

            if(grouped) result.push(temp);
            else result = result.concat(temp);
            }

            return result;
        };

        var disassembleToString =  function(str) {
            if (typeof str !== 'string') {
            return '';
            }
            str = disassemble(str);
            return str.join('');
        };

        var assemble = function(array){
            if (typeof array === 'string') {
            array = disassemble(array);
            }

            var result = [],
                length = array.length,
                code ,
                stage = 0,
                complete_index = -1, //완성된 곳의 인덱스
                previous_code
            ;

            function _makeHangul(index){ // complete_index + 1부터 index까지를 greedy하게 한글로 만든다.
            var code,
                cho,
                jung1,
                jung2,
                jong1 = 0,
                jong2,
                hangul = ''
                ;
            if (complete_index + 1 > index) {
                return;
            }
            for (var step = 1; ; step++) {
                if (step === 1) {
                cho = array[complete_index + step].charCodeAt(0);
                if (_isJung(cho)) { // 첫번째 것이 모음이면 1) ㅏ같은 경우이거나 2) ㅙ같은 경우이다
                    if (complete_index + step + 1 <= index && _isJung(jung1 = array[complete_index + step + 1].charCodeAt(0))) { //다음것이 있고 모음이면
                    result.push(String.fromCharCode(_isJungJoinable(cho, jung1)));
                    complete_index = index;
                    return;
                    } else {
                    result.push(array[complete_index + step]);
                    complete_index = index;
                    return;
                    }
                } else if (!_isCho(cho)) {
                    result.push(array[complete_index + step]);
                    complete_index = index;
                    return;
                }
                hangul = array[complete_index + step];
                } else if (step === 2) {
                jung1 = array[complete_index + step].charCodeAt(0);
                if (_isCho(jung1)) { //두번째 또 자음이 오면 ㄳ 에서 ㅅ같은 경우이다
                    cho = _isJongJoinable(cho, jung1);
                    hangul = String.fromCharCode(cho);
                    result.push(hangul);
                    complete_index = index;
                    return;
                } else {
                    hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + HANGUL_OFFSET);
                }
                } else if (step === 3) {
                jung2 = array[complete_index + step].charCodeAt(0);
                if (_isJungJoinable(jung1, jung2)) {
                    jung1 = _isJungJoinable(jung1, jung2);
                } else {
                    jong1 = jung2;
                }
                hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET);
                } else if (step === 4) {
                jong2 = array[complete_index + step].charCodeAt(0);
                if (_isJongJoinable(jong1, jong2)) {
                    jong1 = _isJongJoinable(jong1, jong2);
                } else {
                    jong1 = jong2;
                }
                hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET);
                } else if (step === 5) {
                jong2 = array[complete_index + step].charCodeAt(0);
                jong1 = _isJongJoinable(jong1, jong2);
                hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET);
                }

                if (complete_index + step >= index) {
                result.push(hangul);
                complete_index = index;
                return;
                }
            }
            }

            for (var i = 0 ; i < length ; i++) {
            code = array[i].charCodeAt(0);
            if (!_isCho(code) && !_isJung(code) && !_isJong(code)){ //초, 중, 종성 다 아니면
                _makeHangul(i-1);
                _makeHangul(i);
                stage = 0;
                continue;
            }
            //console.log(stage, array[i]);
            if (stage === 0) { // 초성이 올 차례
                if (_isCho(code)) { // 초성이 오면 아무 문제 없다.
                stage = 1;
                } else if (_isJung(code)) {
                // 중성이오면 ㅐ 또는 ㅘ 인것이다. 바로 구분을 못한다. 따라서 특수한 stage인 stage4로 이동
                stage = 4;
                }
            } else if (stage == 1) { //중성이 올 차례
                if (_isJung(code)) { //중성이 오면 문제없음 진행.
                stage = 2;
                } else { //아니고 자음이오면 ㄻ같은 경우가 있고 ㄹㅋ같은 경우가 있다.
                //합쳐질 수 없다면 앞 글자 완성 후 여전히 중성이 올 차례
                    _makeHangul(i-1);
                }

                /*if (_isJung(code)) { //중성이 오면 문제없음 진행.
                stage = 2;
                } else { //아니고 자음이오면 ㄻ같은 경우가 있고 ㄹㅋ같은 경우가 있다.
                if (_isJongJoinable(previous_code, code)) {
                    // 합쳐질 수 있다면 ㄻ 같은 경우인데 이 뒤에 모음이 와서 ㄹ마 가 될수도 있고 초성이 올 수도 있다. 따라서 섣불리 완성할 수 없다. 이땐 stage5로 간다.
                    stage = 5;
                } else { //합쳐질 수 없다면 앞 글자 완성 후 여전히 중성이 올 차례
                    _makeHangul(i-1);
                }
                }*/
            } else if (stage == 2) { //종성이 올 차례
                if (_isJong(code)) { //종성이 오면 다음엔 자음 또는 모음이 온다.
                stage = 3;
                } else if (_isJung(code)) { //그런데 중성이 오면 앞의 모음과 합칠 수 있는지 본다.
                if (_isJungJoinable(previous_code, code)) { //합칠 수 있으면 여전히 종성이 올 차례고 그대로 진행
                } else { // 합칠 수 없다면 오타가 생긴 경우
                    _makeHangul(i-1);
                    stage = 4;
                }
                } else { // 받침이 안되는 자음이 오면 ㄸ 같은 이전까지 완성하고 다시시작
                _makeHangul(i-1);
                stage = 1;
                }
            } else if (stage == 3) { // 종성이 하나 온 상태.
                if (_isJong(code)) { // 또 종성이면 합칠수 있는지 본다.
                if (_isJongJoinable(previous_code, code)) { //합칠 수 있으면 계속 진행. 왜냐하면 이번에 온 자음이 다음 글자의 초성이 될 수도 있기 때문
                } else { //없으면 한글자 완성
                    _makeHangul(i-1);
                    stage = 1; // 이 종성이 초성이 되고 중성부터 시작
                }
                } else if (_isCho(code)) { // 초성이면 한글자 완성.
                _makeHangul(i-1);
                stage = 1; //이 글자가 초성이되므로 중성부터 시작
                } else if (_isJung(code)) { // 중성이면 이전 종성은 이 중성과 합쳐지고 앞 글자는 받침이 없다.
                _makeHangul(i-2);
                stage = 2;
                }
            } else if (stage == 4) { // 중성이 하나 온 상태
                if (_isJung(code)) { //중성이 온 경우
                if(_isJungJoinable(previous_code, code)) { //이전 중성과 합쳐질 수 있는 경우
                    _makeHangul(i);
                    stage = 0;
                } else { //중성이 왔지만 못합치는 경우. ㅒㅗ 같은
                    _makeHangul(i-1);
                }
                } else { // 아니면 자음이 온 경우.
                _makeHangul(i-1);
                stage = 1;
                }
            } else if (stage == 5) { // 초성이 연속해서 두개 온 상태 ㄺ
                if (_isJung(code)) { //이번에 중성이면 ㄹ가
                _makeHangul(i-2);
                stage = 2;
                } else {
                _makeHangul(i-1);
                stage = 1;
                }
            }
            previous_code = code;
            }
            _makeHangul(i-1);
            return result.join('');
        };

        var search = function(a, b){
            var ad = disassemble(a).join(''),
                bd = disassemble(b).join('')
                ;

            return ad.indexOf(bd);
        };

        var rangeSearch = function(haystack, needle){
            var hex = disassemble(haystack).join(''),
                nex = disassemble(needle).join(''),
                grouped = disassemble(haystack, true),
                re = new RegExp(nex, 'gi'),
                indices = [],
                result;

            if(!needle.length) return [];

            while((result = re.exec(hex))) {
            indices.push(result.index);
            }

            function findStart(index) {
            for(var i = 0, length = 0; i < grouped.length; ++i) {
                length += grouped[i].length;
                if(index < length) return i;
            }
            }

            function findEnd(index) {
            for(var i = 0, length = 0; i < grouped.length; ++i) {
                length += grouped[i].length;
                if(index + nex.length <= length) return i;
            }
            }

            return indices.map(function(i) {
            return [findStart(i), findEnd(i)];
            });
        };

        function Searcher(string) {
            this.string = string;
            this.disassembled = disassemble(string).join('');
        }

        Searcher.prototype.search = function(string) {
            return disassemble(string).join('').indexOf(this.disassembled);
        };

        var endsWithConsonant = function (string) {
            if (typeof string === 'object') {
            string = string.join('');
            }

            var code = string.charCodeAt(string.length - 1);

            if (_isHangul(code)) { // 완성된 한글이면
            code -= HANGUL_OFFSET;
            var jong = code % 28;
            if (jong > 0) {
                return true;
            }
            } else if (_isConsonant(code)) { //자음이면
            return true;
            }
            return false;
        };

        var hangul = {
            disassemble: disassemble,
            d: disassemble, // alias for disassemble
            disassembleToString: disassembleToString,
            ds: disassembleToString, // alias for disassembleToString
            assemble: assemble,
            a: assemble, // alias for assemble
            search: search,
            rangeSearch: rangeSearch,
            Searcher: Searcher,
            endsWithConsonant: endsWithConsonant,
            isHangul: function(c){
            if (typeof c === 'string')
                c = c.charCodeAt(0);
            return _isHangul(c);
            },
            isComplete: function(c){
            if (typeof c === 'string')
                c = c.charCodeAt(0);
            return _isHangul(c);
            },
            isConsonant: function(c){
            if (typeof c === 'string')
                c = c.charCodeAt(0);
            return _isConsonant(c);
            },
            isVowel: function(c){
            if (typeof c === 'string')
                c = c.charCodeAt(0);
            return _isJung(c);
            },
            isCho: function(c){
            if (typeof c === 'string')
                c = c.charCodeAt(0);
            return _isCho(c);
            },
            isJong: function(c){
            if (typeof c === 'string')
                c = c.charCodeAt(0);
            return _isJong(c);
            },
            isHangulAll: function(str){
            if (typeof str !== 'string') return false;
            for (var i = 0; i < str.length; i++) {
                if (!_isHangul(str.charCodeAt(i))) return false;
            }
            return true;
            },
            isCompleteAll: function(str){
            if (typeof str !== 'string') return false;
            for (var i = 0; i < str.length; i++) {
                if (!_isHangul(str.charCodeAt(i))) return false;
            }
            return true;
            },
            isConsonantAll: function(str){
            if (typeof str !== 'string') return false;
            for (var i = 0; i < str.length; i++) {
                if (!_isConsonant(str.charCodeAt(i))) return false;
            }
            return true;
            },
            isVowelAll: function(str){
            if (typeof str !== 'string') return false;
            for (var i = 0; i < str.length; i++) {
                if (!_isJung(str.charCodeAt(i))) return false;
            }
            return true;
            },
            isChoAll: function(str){
            if (typeof str !== 'string') return false;
            for (var i = 0; i < str.length; i++) {
                if (!_isCho(str.charCodeAt(i))) return false;
            }
            return true;
            },
            isJongAll: function(str){
            if (typeof str !== 'string') return false;
            for (var i = 0; i < str.length; i++) {
                if (!_isJong(str.charCodeAt(i))) return false;
            }
            return true;
            }
        };

        if (typeof define == 'function' && define.amd) {
            define(function(){
            return hangul;
            });
        } else if (typeof module !== 'undefined') {
            module.exports = hangul;
        } else {
            window.Hangul = hangul;
        }

    })();
    var presenter = function(){};

    presenter.playerController = null;
    presenter.eventBus = null;
    presenter.display = null;
    presenter.isLoaded = false;
    presenter.functionsQueue = [];

    var keyboardIsVisible = true;
    var closeButtonElement = null;
    var openButtonElement = null;
    var lastClickedElement = null;
    var movedInput = false;
    var escClicked = false;

    presenter.ERROR_CODES = {
        'E01' : 'The position is wrong. See documentation for more details.',
        'E02' : 'Module ID not found.',
        'E03' : 'The module you provided has no getView method implemented.',
        'E04' : 'Max Characters must be a digit or empty string (unlimited).'
    };



//    console.log("AddoneKeyboard_create");


    presenter.LAYOUT_TO_LANGUAGE_MAPPING = {
        'french (special characters)' : "{ \
            'default': ['\u00e0 \u00e2 \u00e7 \u00e8 \u00e9 \u00ea \u00eb \u00ee \u00ef \u00f4 \u00f9 \u00fb \u00e6 \u0153 \u00ab \u00bb {shift}'], \
            'shift':   ['\u00c0 \u00c2 \u00c7 \u00c8 \u00c9 \u00ca \u00cb \u00ce \u00cf \u00d4 \u00d9 \u00db \u00c6 \u0152 \u00ab \u00bb {shift}'] \
        }",
        'german (special characters)' : "{ \
            'default': ['\u00e4 \u00f6 \u00fc \u00df {shift}'], \
            'shift': ['\u00c4 \u00d6 \u00dc {empty} {shift}'] \
        }",
        'spanish (special characters)' : "{ \
            'default': ['\u00e1 \u00e9 \u00ed \u00f3 \u00fa \u00f1 \u00e7 \u00fc \u00a1 \u00bf \u00ba \u00aa {shift}'], \
            'shift': ['\u00c1 \u00c9 \u00cd \u00d3 \u00da \u00d1 \u00c7 \u00dc {empty} {empty} {empty} {empty} {shift}'] \
        }",
        'italian (special characters)' : "{ \
            'default': ['\u00e0 \u00e8 \u00e9 \u00ec \u00f2 \u00f9 {shift}'], \
            'shift': ['\u00c0 \u00c8 \u00c9 \u00cc \u00d2 \u00d9 {shift}'] \
        }"
        /*,
            'type1 (numeric)' : "{ \
            'default': ['1 2 3 4 5 {b}', '6 7 8 9 0 .'] \
        }",
            'type2 (numeric sign)' : "{ \
            'default': ['1 2 3 4 5 {b}', '6 7 8 9 0 .', '+ - × ÷ = %'] \
        }",
            'type3 (hangul jaum)' : "{ \
            'default': ['\u3131 \u3134 \u3137 \u3139 \u3141 \u3142', '\u3145 \u3147 \u3148 \u314A \u314B \u314C', '\u314D \u314E {b} {empty} {empty} {empty}'] \
        }",
            'type4 (hangul jaum moum)' : "{ \
            'default': ['\u3142 \u3148 \u3137 \u3131 \u3145 \u315B \u3155 \u3151 \u3150 \u3154' , '\u3141 \u3134 \u3147 \u3139 \u314E \u3157 \u3153 \u314F \u3163', '\u314B \u314C \u314A \u314D \u3160 \u315C \u3161', '{s} {space} {b} {alt} {meta1} {cancel}' ], 'shift': ['\u3143 \u3149 \u3138 \u3132 \u3146 \u315B \u3155 \u3151 \u3152 \u3156', '\u3141 \u3134 \u3147 \u3139 \u314E \u3157 \u3153 \u314F \u3163 ', '\u314B \u314C \u314A \u314D \u3160 \u315C \u3161', '{s} {space} {b} {alt} {meta1} {cancel}'], 'alt' : ['q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m', '{s} {space} {b} {alt} {meta1} {cancel}'], 'alt-shift' : ['Q W E R T Y U I O P', 'A S D F G H J K L', 'Z X C V B N M', '{s} {space} {b} {alt} {meta1} {cancel}'], 'meta1' : ['1 2 3 4 5 6 7 8 9 0', '+ - \u00D7 \u00F7 = / ', ', . \u318D \u25B3 \u25A1 \u25CB', '{s} {space} {b} {default} {cancel}'] \
        }"*/
        /* , 'type5 (hangul full)' : "{ \
        'default': ['1 2 3 4 5 6 7 8 9 0', '\u3142 \u3148 \u3137 \u3131 \u3145 \u315B \u3155 \u3151 \u3150 \u3154 {b}' , '\u3141 \u3134 \u3147 \u3139 \u314E \u3157 \u3153 \u314F \u3163', '{s} \u314B \u314C \u314A \u314D \u3160 \u315C \u3161 , . {s} ', '{meta1} {space} {left} {right} {alt} {cancel}'], 'shift': ['! @ # $ % ^ \u0026 * ( ) ', '\u3143 \u3149 \u3138 \u3132 \u3146 \u315B \u3155 \u3151 \u3152 \u3156  {b}', '\u3141 \u3134 \u3147 \u3139 \u314E \u3157 \u3153 \u314F \u3163 ', '{s} \u314B \u314C \u314A \u314D \u3160 \u315C \u3161 \u0021 \u003F {s}', '{meta1} {space} {left} {right} {alt} {cancel}'],  'alt' : ['1 2 3 4 5 6 7 8 9 0', 'q w e r t y u i o p {b}', 'a s d f g h j k l', '{s} z x c v b n m , . {s}', '{meta1} {space} {left} {right} {alt} {cancel}'], 'alt-shift' : ['! @ # $ % ^ \u0026 * ( )', 'Q W E R T Y U I O P  {b}', 'A S D F G H J K L', '{s} Z X C V B N M \u0021 \u003F {s}', '{meta1} {space} {left} {right} {alt} {cancel}'], 'meta1' : ['! @ # $ % ^ \u0026 * ( )', '\u007E \u003C \u003E \u007B \u007D \u005B \u005D - + {b}', '_ \u25CB \u003A ; \u0022 \u00D7 \u00F7 \u003D', '{s} \u25A1 \u2606 \u2661 ￦ ｜ ／ \u003F , . {s}', '{default} {space} {left} {right} {default} {cancel}'] \
        }"*/
    };

    function getErrorObject (ec) { return { isError: true, errorCode: ec }; }
    function getCorrectObject(val) { return { isError: false, value: val }; }

    function touchStartDecorator(func, element) {
        $(element).on('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();

            func();
        });
    }

    presenter.initializeCloseButton = function AddoneKeyboard_initializeCloseButton() {
        closeButtonElement = document.createElement('button');
        closeButtonElement.className = 'eKeyboard-close-button';
        closeButtonElement.style.position = 'absolute';
        closeButtonElement.innerHTML = '<span>\u2716</span>';
        closeButtonElement.style.display = 'none';

        $(presenter.keyboardWrapper).append(closeButtonElement);

        touchStartDecorator(closeButtonCallBack, closeButtonElement);
    };

    function initializeOpenButton() {
        openButtonElement = document.createElement('button');
        openButtonElement.className = 'eKeyboard-open-button';
        openButtonElement.style.display = 'none';
        openButtonElement.style.zindex = 'none';
        $(openButtonElement).on('mousedown', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            showOpenButtonCallback();
        });

        $("body").append(openButtonElement);
    }

    presenter.setPlayerController = function (controller) {
        presenter.playerController = controller;
        presenter.eventBus = controller.getEventBus();
        presenter.eventBus.addEventListener('PageLoaded', this);
    };

    presenter.onEventReceived = function(eventName) {
        if (eventName == 'PageLoaded') {
            presenter.pageLoadedDeferred.resolve();
        }
    };

    presenter.validateType = function(rawType) {
        if (rawType == 'Numeric' || rawType.length == 0) {
            return 'num';
        }

        return rawType.toLowerCase();
    };

    presenter.validateWorkWith = function (workWithModules, worksWithAll) {
        const workWithViews = [];
        for (let i = 0; i < workWithModules.length; i++) {
            const module = presenter.playerController.getModule(workWithModules[i]);
            if (module) {
                if (module.getView && module.getView()) {
                    workWithViews.push(module.getView());
                }
            } else if (!worksWithAll) {
                return getErrorObject("E02");
            }
        }

        return workWithViews;
    }

    presenter.validateMaxCharacters = function(rawMaxCharacters) {
        if (rawMaxCharacters.length == 0) {
            return getCorrectObject(false);
        }

        if ( !(/\d+/.test(rawMaxCharacters)) ) {
            return getErrorObject("E04");
        }

        return getCorrectObject(parseInt(rawMaxCharacters, 10));
    };

    presenter.validatePosition = function(rawPosition, isMy) {
        if (!rawPosition.length) {
            return getCorrectObject(isMy ? 'left center' : 'right center');
        }

        var possibilitiesOnTheLeft = ['left', 'center', 'right'],
            possibilitiesOnTheRight = ['top', 'center', 'bottom'],
            splitted = rawPosition.split(' ');

        if (
            splitted.length === 2 &&
            possibilitiesOnTheLeft.indexOf(splitted[0]) >= 0 &&
            possibilitiesOnTheRight.indexOf(splitted[1]) >= 0
        ) {
            return getCorrectObject(rawPosition);
        } else {
            return getErrorObject("E01")
        }
    };

    presenter.validateOffsetData = function(positionMy, positionAt) {
        var splittedMy = positionMy.split(' '),
            splittedAt = positionAt.split(' ');

        if (splittedMy[1] == 'bottom' && splittedAt[1] == 'top') {
            return {
                orientation: 'horizontal',
                directionSign: '-',
                value: '0 -10'
            }
        }

        if (splittedMy[0] == 'left' && splittedAt[0] == 'right') {
            return {
                orientation: 'vertical',
                directionSign: '',
                value: '10 0'
            };
        }

        if (splittedMy[1] == 'top' && splittedAt[1] == 'bottom') {
            return {
                orientation: 'horizontal',
                directionSign: '',
                value : '0 10'
            };
        }

        if (splittedMy[0] == 'right' && splittedAt[0] == 'left') {
            return {
                orientation: 'vertical',
                directionSign: '-',
                value: '-10 0'
            };
        }

        return {
            orientation: 'none',
            directionSign: '',
            value : ''
        };
    };

    presenter.createPreview = function(view, model) {
        runLogic(view, model, true);
    };

    presenter.upgradeModel = function AddoneKeyboard_upgradeModel(model) {
        const upgradedModel = {};
        $.extend(true, upgradedModel, model); // Deep copy of model object

        if (!upgradedModel["worksWithAll"]) {
            upgradedModel["worksWithAll"] = "False";
        }
        if (!upgradedModel['customDisplay']) {
            upgradedModel['customDisplay'] = "";
        }

        return upgradedModel;
    }

    presenter.validateModel = function(model, isPreview) {
        const worksWithAll = ModelValidationUtils.validateBoolean(model.worksWithAll);
        let workWithModules = worksWithAll ? presenter.getAllPageModulesIds() : Helpers.splitLines(model['workWith']),
            workWithViews = [],
            layoutType = presenter.validateType(model['layoutType']),
            customLayout = model['customLayout'],
            maxCharacters = presenter.validateMaxCharacters(model['maxCharacters']),
            positionMy = presenter.validatePosition(model['positionMy'], true),
            positionAt = presenter.validatePosition(model['positionAt'], false);

        if (!isPreview) {
            workWithViews = presenter.validateWorkWith(workWithModules, worksWithAll);
        }

        if (presenter.LAYOUT_TO_LANGUAGE_MAPPING[layoutType] != undefined) {
            customLayout = presenter.LAYOUT_TO_LANGUAGE_MAPPING[layoutType];
            layoutType = 'custom';
        }

//        console.log("customLayout", customLayout);

        if (maxCharacters.isError) return maxCharacters;
        if (positionMy.isError) return positionMy;
        if (positionAt.isError) return positionAt;
        if (workWithViews.isError) return workWithViews;

        return {
            'ID': model["ID"],
            'isError' : false,
            workWithViews,
            worksWithAll,
            layoutType,
            customLayout,
            positionAt,
            positionMy,
            'customDisplay' : model['customDisplay'],
            'maxCharacters' : maxCharacters.value,
            'offset' : presenter.validateOffsetData(positionMy.value, positionAt.value),
            'openOnFocus' : !ModelValidationUtils.validateBoolean(model['noOpenOnFocus']),
            'lockInput' : ModelValidationUtils.validateBoolean(model['lockStandardKeyboardInput']),
            'showCloseButton': ModelValidationUtils.validateBoolean(model['showCloseButton'])
        }
    };

    presenter.getAllPageModulesIds = function () {
        const currentPageIndex = presenter.playerController.getCurrentPageIndex();
        const allModulesIds = presenter.playerController.getPresentation().getPage(currentPageIndex).getModulesAsJS();

        return allModulesIds;
    }

    presenter.removeEventListeners = function () {
        presenter.configuration.$inputs.each(function (index, element) {
            element.removeEventListener('mousedown', presenter.focusOnMouseDown);
            element.removeEventListener('focus', presenter.openEKeyboardOnFocus);
            element.removeEventListener('forceClick', presenter.openEKeyboardOnForceClick);
            element.removeEventListener('keyup', presenter.onESCHideKeyboard);
            element.removeEventListener('change', presenter.moveToNextGap);
            element.removeEventListener('paste', presenter.moveToNextGap);
            element.removeEventListener('keyup', presenter.moveToNextGap);
            element.removeEventListener('focusout', focusoutCallBack);
        });
    };

    function connectInputModule(view, model, isPreview){
        const upgradedModel = presenter.upgradeModel(model);
        presenter.configuration = presenter.validateModel(upgradedModel, isPreview);
        if (presenter.configuration.isError) {
            DOMOperationsUtils.showErrorMessage(view, presenter.ERROR_CODES, presenter.configuration.errorCode);
            return;
        }

        presenter.configuration.$inputs = $(presenter.configuration.workWithViews).find('input').not('.ic_text_audio_button');
//               console.log("presenter.configuration.workWithViews", presenter.configuration.workWithViews);
//        console.log("presenter.configuration.$inputs", presenter.configuration.$inputs);

//        for( var i=0; i<presenter.configuration.$inputs.length; ++i){
//            var maxlength = presenter.configuration.$inputs[i].attr("maxlength");
//            console.log("maxlength", maxlength);
//            presenter.configuration.$inputs[i].attr("maxlength", 7);
//        }

        if (!isPreview) {
            if (presenter.configuration.customLayout.length > 0) {
                try {
                    eval('presenter.configuration.customLayout = ' + presenter.configuration.customLayout);
                } catch (e) {
                    presenter.ERROR_CODES['evaluationError'] = e.message;
                    DOMOperationsUtils.showErrorMessage(view, presenter.ERROR_CODES, 'evaluationError');
                }
            }

            if (presenter.configuration.customDisplay.length > 0) {
                try {
                    eval('presenter.configuration.customDisplay = ' + presenter.configuration.customDisplay);
                } catch(e) {
                    presenter.ERROR_CODES['evaluationError'] = e.message;
                    DOMOperationsUtils.showErrorMessage(view, presenter.ERROR_CODES, 'evaluationError');
                }
            }
            presenter.configuration.customLayout.id = new Date().getTime();

            var defaultDisplay = {
                a      : '\u2714:Accept (Shift-Enter)', // check mark - same action as accept
                accept : 'Accept:Accept (Shift-Enter)',
                alt    : 'AltGr:Alternate Graphemes',
                b      : '\u2190:Backspace',    // Left arrow (same as &larr;)
                bksp   : 'Bksp:Backspace',
                c      : '\u2716:Cancel (Esc)', // big X, close - same action as cancel
                cancel : 'Cancel:Cancel (Esc)',
                clear  : 'C:Clear',             // clear num pad
                combo  : '\u00f6:Toggle Combo Keys',
                dec    : '.:Decimal',           // decimal point for num pad (optional), change '.' to ',' for European format
                e      : '\u21b5:Enter',        // down, then left arrow - enter symbol
                enter  : 'Enter:Enter',
                left   : '\u2190',              // left arrow (move caret)
                lock   : '\u21ea Lock:Caps Lock', // caps lock
                next   : 'Next',
                prev   : 'Prev',
                right  : '\u2192',              // right arrow (move caret)
                s      : '\u21e7:Shift',        // thick hollow up arrow
                shift  : 'CapsLock:CapsLock',
                sign   : '\u00b1:Change Sign',  // +/- sign for num pad
                space  : '&nbsp;:Space',
                t      : '\u21e5:Tab',          // right arrow to bar (used since this virtual keyboard works with one directional tabs)
                tab    : '\u21e5 Tab:Tab'       // \u21b9 is the true tab symbol (left & right arrows)
            };

            var customDisplay = presenter.configuration.customDisplay;
            presenter.display = $.extend(defaultDisplay, customDisplay);

            if (MobileUtils.isMobileUserAgent(navigator.userAgent) && presenter.configuration.lockInput) {
                presenter.configuration.$inputs.each(
                    function (index, element) {
                        var $el = $(element);
                        $el.addClass('ui-keyboard-lockedinput');
                        $el.attr('readonly', true);
                        $el.attr('inputmode', "none");
                    }
                );
            }

            presenter.removeEventListeners();

            presenter.connectHandlers();
        }
        for (var i = 0; i < presenter.functionsQueue.length; i++) {
            presenter.functionsQueue[i]();
        }
        presenter.isLoaded = true;
    }


    function runLogic(view, model, isPreview) {
//        console.log("runLogic", view)
        presenter.$view = $(view);
        presenter.view = view;
        presenter.isPreview = isPreview;
        presenter.isShowCloseButton = false;

        presenter.pageLoadedDeferred = new $.Deferred();
        presenter.pageLoaded = presenter.pageLoadedDeferred.promise();

        presenter.keyboardWrapper = document.createElement("div");
        presenter.keyboardWrapper.className = "ui-ekeyboard-wrapper";
        $(document.body).append(presenter.keyboardWrapper);

        initializeOpenButton();
        presenter.initializeCloseButton();

        MutationObserverService.createDestroyObserver(model["ID"], presenter.destroy, presenter.view);
        MutationObserverService.setObserver();


//        presenter.view.addEventListener('DOMNodeRemoved', function onDOMNodeRemoved_eKeyboard (ev) {
//            if (ev.target === this) {
//                presenter.destroy();
//            }
//        });

        var mathJaxDeferred = new jQuery.Deferred(),
            mathJaxProcessEnded = mathJaxDeferred.promise();

        MathJax.Hub.Register.MessageHook("End Process", function (message) {
            if ($(message[1]).hasClass('ic_page')) {
                if(mathJaxDeferred.state() != 'resolved'){
                    mathJaxDeferred.resolve();
                }
            }

            if ($(message[1]).hasClass('ic_popup_page')) {
                if(mathJaxDeferred.state() != 'resolved'){
                    mathJaxDeferred.resolve();
                }
            }
        });


        $.when(presenter.pageLoaded, mathJaxProcessEnded).then(function() {
            //mathjax가 복잡한 경우 딜레이를 둬야 정상작동 함.
            let timerId = setInterval(function(){
                connectInputModule(view, model, isPreview);
            }, 1000);
            setTimeout(function(){
                 clearInterval(timerId);
            }, 5000)
        });
    }

    /**
     * Adds handlers to all input elements with which eKeyboard works
     */

    presenter.connectHandlers = function AddoneKeyboard_connectHandlers() {
//        console.log("presenter.configuration.$inputs", presenter.configuration.$inputs);
        presenter.configuration.$inputs.each(
            function (index, element) {
                if (DevicesUtils.isInternetExplorer()) {
                    element.addEventListener('mousedown', presenter.focusOnMouseDown);
                }

                element.addEventListener('focus', presenter.openEKeyboardOnFocus);
                element.addEventListener('forceClick', presenter.openEKeyboardOnForceClick);
                element.addEventListener('keyup', presenter.onESCHideKeyboard);

                if (presenter.configuration.maxCharacters !== false) {
                    element.addEventListener('change', presenter.moveToNextGap);
                    element.addEventListener('paste', presenter.moveToNextGap);
                    element.addEventListener('keyup', presenter.moveToNextGap);
                }

                //This is after setState because validateModel is in promise.
                if (!keyboardIsVisible) {
                    element.addEventListener('focusout', focusoutCallBack);
                }

                //이석웅 추가
                element.setAttribute("keyboardtype", presenter.layoutType);
            });
    };

    presenter.focusOnMouseDown = function AddoneKeyboard_focusOnMouseDown () {
        $(this).focus();
    };

    presenter.openEKeyboardOnFocus = function AddoneKeyboard_openEKeyboardOnFocus () {
        try{
            lastClickedElement = this;
            if (!keyboardIsVisible) {
                if ($(this).data('keyboard') !== undefined) {
                    $(this).data('keyboard').destroy();
                }
                openButtonElement.style.display = 'block';
                actualizeOpenButtonPosition($(lastClickedElement));
            } else {
                presenter.createEKeyboard(this, presenter.display);
                $(this).trigger('showKeyboard');
            }
        }catch(e){};
    };

    presenter.openEKeyboardOnForceClick = function AddoneKeyboard_openEKeyboardOnForceClick() {
        if (presenter.configuration.openOnFocus) {
            $(this).data('keyboard').reveal();
            if ($(".ic_popup_page").length == 0) {
                $(this).data('keyboard').startup();
            }
        } else {
            $(this).focus();
        }
    };

    presenter.onESCHideKeyboard = function AddoneKeyboard_onESCHideKeyboard(e) {
        var isEKeyboardOpen = $(this).data('keyboard') && $(this).data('keyboard').isOpen;
        if (e.keyCode === 27 && isEKeyboardOpen) {
            onEscClick();
        }
    };

    presenter.moveToNextGap = function AddoneKeyboard_moveToNextGap() {
        if ($(this).val().length >= presenter.configuration.maxCharacters) {
            var self = this;
            $(this).val($(this).val().substring(0, presenter.configuration.maxCharacters));

            if ($(this).data('keyboard') !== undefined) {
                //Fix bug with events
                setTimeout(function () {
                    $(self).data('keyboard').switchInput(true, true);
                }, 0);
            } else {
                lastClickedElement = this;
                movedInput = true;
                getNextFocusableElement(this, true).focus();
            }
        }
    };

    presenter.clickedOutsideCallback = function AddoneKeyboard_clickedOutsideCallback(event) {
        // shouldn't hide keyboard when current input was clicked
        if (event.target === lastClickedElement) return;

        var wrapper = $(presenter.keyboardWrapper);

        // if click outside of wrapper or it's descendant, hide keyboard
        if (!wrapper.is(event.target) && wrapper.has(event.target).length === 0) {
            presenter.hideKeyboard();
        }
    };

    presenter.hideKeyboard = function () {
        document.removeEventListener('mousedown', presenter.clickedOutsideCallback);

        $(closeButtonElement).hide();
        $(lastClickedElement).removeAttr("readonly");
        $(lastClickedElement).removeAttr("inputmode");
        var keyboard = $(lastClickedElement).data('keyboard');
        if (keyboard !== undefined) {
            keyboard.accept();
        }
    };

    presenter.createEKeyboard = function (element, display) {
        if ($(element).data('keyboard') !== undefined) {
            return;
        }

        // 이석웅 추가
        layoutType = presenter.validateType(model['layoutType']);
        if (presenter.LAYOUT_TO_LANGUAGE_MAPPING[layoutType] == undefined) return;

        $(element).keyboard({
            // *** choose layout ***
            layout: presenter.configuration.layoutType,
            customLayout: presenter.configuration.customLayout,
            position: {
                of : null, // optional - null (attach to input/textarea) or a jQuery object (attach elsewhere)
                my : presenter.configuration.positionMy.value,
                at : presenter.configuration.positionAt.value,
                at2 : presenter.configuration.positionAt.value,
                offset : presenter.configuration.offset.value,
                collision: 'flip'
            },

                    // preview added above keyboard if true, original input/textarea used if false
                    usePreview: false,

                    // if true, the keyboard will always be visible
                    alwaysOpen: false,

                    // give the preview initial focus when the keyboard becomes visible
                    initialFocus: presenter.configuration.lockInput,

                    // if true, keyboard will remain open even if the input loses focus.
                    stayOpen: true,

                    // *** change keyboard language & look ***
                    display: display,

                    // Message added to the key title while hovering, if the mousewheel plugin exists
                    wheelMessage: 'Use mousewheel to see other keys',

                    css: {
                        input          : '', //'ui-widget-content ui-corner-all', // input & preview
                        container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix', // keyboard container
                        buttonDefault  : 'ui-state-default ui-corner-all', // default state
                        buttonHover    : 'ui-state-hover',  // hovered button
                        buttonAction   : 'ui-state-active', // Action keys (e.g. Accept, Cancel, Tab, etc); replaces "actionClass"
                        buttonDisabled : 'ui-state-disabled' // used when disabling the decimal button {dec}
                    },

                    // *** Useability ***
                    // Auto-accept content when clicking outside the keyboard (popup will close)
                    autoAccept: true,

                    // Prevents direct input in the preview window when true
                    lockInput: presenter.configuration.lockInput,

                    // Prevent keys not in the displayed keyboard from being typed in
                    restrictInput: false,

                    // Check input against validate function, if valid the accept button is clickable;
                    // if invalid, the accept button is disabled.
                    acceptValid: true,

                    // Use tab to navigate between input fields
                    tabNavigation: true,

                    // press enter (shift-enter in textarea) to go to the next input field
                    enterNavigation : true,
                    // mod key options: 'ctrlKey', 'shiftKey', 'altKey', 'metaKey' (MAC only)
                    enterMod : 'altKey', // alt-enter to go to previous; shift-alt-enter to accept & go to previous

                    // if true, the next button will stop on the last keyboard input/textarea; prev button stops at first
                    // if false, the next button will wrap to target the first input/textarea; prev will go to the last
                    stopAtEnd : false,

                    // Set this to append the keyboard immediately after the input/textarea it is attached to.
                    // This option works best when the input container doesn't have a set width and when the
                    // "tabNavigation" option is true
                    appendLocally: false,

            appendTo: presenter.keyboardWrapper,

                    // If false, the shift key will remain active until the next key is (mouse) clicked on;
                    // if true it will stay active until pressed again
                    stickyShift: true,

                    // Prevent pasting content into the area
                    preventPaste: false,

                    // Set the max number of characters allowed in the input, setting it to false disables this option
                    //maxLength: presenter.configuration.maxCharacters,

                    // Mouse repeat delay - when clicking/touching a virtual keyboard key, after this delay the key
                    // will start repeating
                    repeatDelay: 500,

                    // Mouse repeat rate - after the repeatDelay, this is the rate (characters per second) at which the
                    // key is repeated. Added to simulate holding down a real keyboard key and having it repeat. I haven't
                    // calculated the upper limit of this rate, but it is limited to how fast the javascript can process
                    // the keys. And for me, in Firefox, it's around 20.
                    repeatRate: 20,

                    // resets the keyboard to the default keyset when visible
                    resetDefault: false,

                    // Event (namespaced) on the input to reveal the keyboard. To disable it, just set it to ''.
                    openOn: presenter.configuration.openOnFocus ? 'showKeyboard' : '',

                    // When the character is added to the input
                    keyBinding: 'touchend mousedown',

                    // combos (emulate dead keys : http://en.wikipedia.org/wiki/Keyboard_layout#US-International)
                    // if user inputs `a the script converts it to à, ^o becomes ô, etc.
                    useCombos: false,

                    // if true, keyboard will not close if you press escape.
                    ignoreEsc : true,

                    autoAcceptOnEsc : false,
                    // *** Methods ***
                    // Callbacks - add code inside any of these callback functions as desired
                    initialized: function (e, keyboard, el) {
                    },
                    beforeVisible: function (e, keyboard, el) {
                        if (!keyboard['$keyboard'].parent().hasClass('html')) {
                            var dialogBox = keyboard['$keyboard'].parent().find('.gwt-DialogBox');
                            dialogBox.append(keyboard['$keyboard']);
                        }

                        var parent = keyboard['$keyboard'].parent(),
                            popup = parent.find('.ic_popup');

                        if (popup.length > 0) {
                            popup.append(keyboard['$keyboard']);
                        }
                    },
                    visible: function (e, keyboard, el) {
                        var isVisibleInViewPort = getIsVisibleInViewPort(keyboard['$keyboard']);
                        if (!isVisibleInViewPort) {
                            return;
                        }

                        if (!isVisibleInViewPort.vertical || !isVisibleInViewPort.horizontal) {
                            shiftKeyboard(keyboard, isVisibleInViewPort);
                        }

                        keyboard['$keyboard'].draggable({
                            drag: function () {
                                $(closeButtonElement).position({
                                    my:        "left top",
                                    at:        "right top",
                                    of:         keyboard['$keyboard'],
                                    collision: 'fit'
                                });
                            },
                            stop: function () {
                                $.ui.ddmanager.current = null;
                            }
                        });

                        var $keyboard = keyboard['$keyboard'];
                        var position = $keyboard.position();

                        var widthMargin = ($keyboard.outerWidth(true) -  $keyboard.innerWidth()) / 2;
                        var width = $keyboard.outerWidth() + widthMargin;

                        var heightMargin = ($keyboard.outerHeight(true) -  $keyboard.innerHeight()) / 2;

                        $(closeButtonElement).css({
                            top: position.top + heightMargin + 'px',
                            left: position.left + width + 'px'
                        });

                        showCloseButton();

                        document.addEventListener('mousedown', presenter.clickedOutsideCallback);
                    },
                    change: function (e, keyboard, el) {
                        //한글 조합
                        el.value = Hangul.assemble(Hangul.disassemble(el.value));

                        var api = $(lastClickedElement).data('keyboard');

                        //Fixing the issue where if a key contains word 'meta' it will be treated as a meta key
                        if (api.last.key && api.last.key.indexOf('meta') != -1
                            && presenter.configuration.customLayout[api.last.key] == null) {
                            keyboard.insertText(api.last.key);
                        }

                        var event = new Event('change');
                        el.dispatchEvent(event);

                    },
                    beforeClose: function(e, keyboard, el, accepted) {
                        document.removeEventListener('mousedown', presenter.clickedOutsideCallback);
                        $(closeButtonElement).hide();
                    },
                    accepted: function(e, keyboard, el) {},
                    canceled: function(e, keyboard, el) {},
                    hidden: function(e, keyboard, el) {},

                    switchInput : function(keyboard, goToNext, isAccepted){
                        var base = keyboard, kb, stopped = false,
                            all = $('input, textarea').filter(':enabled');
                        all = all.filter(function (element) {
                            return presenter.addonIsWorkingWithElement(all.eq(element))
                        });
                        var index = all.index(base.$el) + (goToNext ? 1 : -1);
                        if (index > all.length - 1) {
                            stopped = keyboard.stopAtEnd;
                        }
                        if (index < 0) {
                            stopped = keyboard.stopAtEnd;
                            index = all.length - 1; // stop or go to last
                        }
                        if (!stopped) {
                            if (!base.close(isAccepted)) {
                                return;
                            }
                            if (presenter.addonIsWorkingWithElement(all.eq(index))) {
                                    presenter.createEKeyboard(all.eq(index), display);
                            }
                            if (keyboardIsVisible) {
                                all.eq(index).trigger('forceClick');
                            }
                            if($(".ic_popup_page").length === 0){
                                all.eq(index).focus();
                            }
                        }

                        return false;
                	},
                    // this callback is called just before the "beforeClose" to check the value
                    // if the value is valid, return true and the  will continue as it should
                    // (close if not always open, etc)
                    // if the value is not value, return false and the clear the keyboard value
                    // ( like this "keyboard.$preview.val('');" ), if desired
                    // The validate function is called after each input, the "isClosing" value will be false;
                    // when the accept button is clicked, "isClosing" is true
                    validate: function (keyboard, value, isClosing) {
                        return true;
                    }
                });
                $(lastClickedElement).trigger('forceClick');
            };

    function getNextFocusableElement (element, next) {
        var all = $('input, textarea').filter(':enabled');
        var indx = all.index(element) + (next ? 1 : -1);

        if (indx > all.length - 1) {
            indx = 0; // go to first input
        }
        if (indx < 0) {
            indx = all.length - 1; // stop or go to last
        }
        return all.eq(indx);

    }

    presenter.addonIsWorkingWithElement = function (element) {
        return ($(presenter.configuration.workWithViews).find(element).length != 0);
    };

    function asyncFunctionDecorator(func) {
        if (presenter.isLoaded) {
            func();
        } else {
            presenter.functionsQueue.push(func);
        }
    }

    function hideOpenButton() {
        openButtonElement.style.display = 'none';
    }

    function focusoutCallBack(ev) {
        if (!keyboardIsVisible && !movedInput) {
            hideOpenButton();
        }
        movedInput = false;
        ev.preventDefault();
    }

    function showButtonDecorator(func) {
        if (presenter.configuration.showCloseButton || presenter.isShowCloseButton) {
            func();
        }
    }

    function showCloseButton() {
        showButtonDecorator(function () {
            $(closeButtonElement).show();
        });
    }

    function closeButtonCallBack() {
        presenter.disable();

        $(lastClickedElement).focus();
        $(lastClickedElement).click();

        document.removeEventListener('mousedown', presenter.clickedOutsideCallback);
        $(closeButtonElement).hide();
    }

    function showOpenButtonCallback() {
        hideOpenButton();
        presenter.configuration.$inputs.attr("inputmode", "none");
        presenter.enable();

        escClicked = false;

        document.activeElement.blur();

        $(lastClickedElement).click();
        $(lastClickedElement).focus();
        $(lastClickedElement).trigger('showKeyboard');
    }

    function actualizeOpenButtonPosition(element) {
        $(openButtonElement).position({
            of: element,
            my: presenter.configuration.positionMy.value,
            at: presenter.configuration.positionAt.value,
            at2: presenter.configuration.positionAt.value,
            offset: presenter.configuration.offset.value,
            collision: 'flip'
        });
    }

    function shiftKeyboard(keyboard, isVisibleInViewPort) {
        if (!isVisibleInViewPort.horizontal) {
            var currentLeft = parseInt(keyboard['$keyboard'].css('left'), 10);
            keyboard['$keyboard'].css('left', currentLeft + parseInt(isVisibleInViewPort.horizontalSign + '10', 10));
        }
        if (!isVisibleInViewPort.vertical) {
            var currentTop = parseInt(keyboard['$keyboard'].css('top'), 10);
            keyboard['$keyboard'].css('top', currentTop + parseInt(isVisibleInViewPort.verticalSign + '10', 10));
        }
    }

    function getIsVisibleInViewPort(element) {
        var $window = $(window);

        if (this.length < 1)
            return;

        if ($(element).length == 0) {
            return;
        }

        var $element = $(element),
            vpWidth = $window.width(),
            vpHeight = $window.height(),
            viewTop = $window.scrollTop(),
            viewBottom = viewTop + vpHeight,
            viewLeft = $window.scrollLeft(),
            viewRight = viewLeft + vpWidth,
            offset = $element.offset(),
            _top = offset.top,
            _bottom = _top + $element.height(),
            _left = offset.left,
            _right = _left + $element.width();

        return {
            vertical: ((_bottom <= viewBottom) && (_top >= viewTop)),
            horizontal: ((_right <= viewRight) && (_left >= viewLeft)),
            verticalSign: _bottom <= viewBottom ? '' : '-',
            horizontalSign: _right <= viewRight ? '' : '-'
        };
    }

    function onEscClick() {
        closeButtonCallBack();

        openButtonElement.style.display = 'block';
        actualizeOpenButtonPosition($(lastClickedElement));
    }

    presenter.run = function(view, model){
        runLogic(view, model, false);
    };

    presenter.setShowErrorsMode = function(){
    };

    presenter.executeCommand = function(name, params) {
        if (presenter.configuration.isError) {
            return;
        }

        var commands = {
            'open' : presenter.openCommand,
            'disable' : presenter.disable,
            'enable' : presenter.enable,
            'showCloseButton' : presenter.showCloseButton
        };

        Commands.dispatch(commands, name, params, presenter);
    };

    presenter.showCloseButton = function () {
        presenter.isShowCloseButton = true;
    };

    presenter.disable = function (){
        asyncFunctionDecorator(presenter.disableFunc.bind(this));
    };

    presenter.disableFunc = function () {
        presenter.sendEvent("disable");
        if (presenter.configuration.openOnFocus) {
            keyboardIsVisible = false;
        }

        presenter.configuration.$inputs.each(function (index, element) {
            try {
                $(element).data('keyboard').destroy();
            } catch(err){}
        });

        document.removeEventListener('mousedown', presenter.clickedOutsideCallback);

        presenter.configuration.$inputs.on('focusout', focusoutCallBack);
        presenter.configuration.$inputs.removeClass('ui-keyboard-input ui-keyboard-input-current');
        presenter.configuration.$inputs.removeAttr("readonly");
        presenter.configuration.$inputs.removeAttr("inputmode");
    };

    presenter.enable = function () {
        asyncFunctionDecorator(presenter.enableFunc.bind(this));
    };

    presenter.enableFunc = function () {
        presenter.sendEvent("enable");
        keyboardIsVisible = true;
        $(presenter.configuration.workWithViews).find('input').off('focusout', focusoutCallBack);
    };

    presenter.open = function (moduleId, index) {
        asyncFunctionDecorator(presenter.openFunc.bind(this, moduleId, index));
    };

    presenter.openFunc = function(moduleId, index) {
        var module = presenter.playerController.getModule(moduleId);
        try {
            var input = $(module.getView()).find('input:enabled').get(parseInt(index, 10) - 1);
            presenter.createEKeyboard(input, presenter.display);
            $(input).data('keyboard').reveal();
        } catch (e) {
        }

    };

    presenter.openCommand = function(moduleId, index) {
        if ($.isArray(moduleId)) {
            presenter.open(moduleId[0], moduleId[1]);
        } else {
            presenter.open(moduleId, index);
        }
    };

    presenter.sendEvent = function (status) {
        presenter.eventBus.sendEvent('ValueChanged', {
            'source': presenter.configuration.ID,
            'item': '',
            'value': status
        });
    };




    presenter.destroy = function destroy_addon_eKeyboard_function () {
        if (presenter.isPreview || !presenter.configuration) {
            return;
        }

        presenter.configuration.$inputs.off('focusout', focusoutCallBack);

        presenter.configuration.$inputs.each(function (index, element){
            try {
                $(element).data('keyboard').destroy();
                $(element).off('focusout change paste keyup forceClick focus mousedown');
            } catch(err){}
        });

        document.removeEventListener('mousedown', presenter.clickedOutsideCallback);
        $(presenter.keyboardWrapper).remove();
        $(openButtonElement).remove();
    };

    presenter.setWorkMode = function(){
    };

    presenter.reset = function(){
    };

    presenter.getErrorCount = function(){
        return 0;
    };

    presenter.getMaxScore = function(){
        return 0;
    };

    presenter.getScore = function(){
        return 0;
    };

    presenter.getState = function () {
        return JSON.stringify({
            "isClosed": keyboardIsVisible,
            "isShowCloseButton": presenter.isShowCloseButton
        });
    };

    presenter.setState = function (state) {
        var parsedState = JSON.parse(state);
        keyboardIsVisible = parsedState.isClosed;

        if(parsedState.isShowCloseButton != undefined) {
            presenter.isShowCloseButton = parsedState.isShowCloseButton;
        }
    };

    return presenter;
}
