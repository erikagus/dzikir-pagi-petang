export type DzikirType = 'pagi' | 'petang';

export interface DzikirItem {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  target: number;
  type: DzikirType | 'both';
}

export const dzikirData: DzikirItem[] = [
  {
    "id": "ayat-kursi",
    "title": "Ayat Kursi",
    "arabic": "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    "transliteration": "Allahu laa ilaa ha illaa huwa hayyul qoyyuum, laa ta'khudzu sinatuu wa laa naum, lahuu maa fissamaawaati wamaa fil ardhi, mandzalladzii yasyfa'u 'indahu illaa bi'idznihi ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yukhiithuuna bi syai'im min 'ilmihi illa bi maa syaa', wa si'a kursiyyuhus samaawaati wal ardhi, wa laa yaudhuhu hifdzu humaa wa huwal aliyyul 'adhiim.",
    "translation": "\"Allah tidak ada Ilah (yang berhak diibadahi dengan benar) melainkan Dia Yang Hidup Kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafa'at di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang (berada) dihadapan mereka, dan dibelakang mereka dan mereka tidak mengetahui apa-apa dari Ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, Allah Mahatinggi lagi Mahabesar.\"",
    "target": 1,
    "type": "both"
  },
  {
    "id": "al-ikhlas",
    "title": "Surat Al-Ikhlas",
    "arabic": "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    "transliteration": "Qul huwa Allahu ahad. Allahus Shamad. Lam yalid walam yuulad. Walam yakul lahu kufuwan ahad.",
    "translation": "\"Katakanlah, Dia-lah Allah Yang Maha Esa. Allah adalah (Rabb) yang segala sesuatu bergantung kepada-Nya. Dia tidak beranak dan tidak pula diperanakkan. Dan tidak ada seorang pun yang setara dengan-Nya.\"",
    "target": 3,
    "type": "both"
  },
  {
    "id": "al-falaq",
    "title": "Surat Al-Falaq",
    "arabic": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    "transliteration": "Qul a'uudzu birabbil falaq. Min syarri maa khalaq. Wa min syarri ghaasiqin idzaa waqab. Wa min syarrin naffaa-thaati fil 'uqad. Wa min syarri haasidin idzaa hasad.",
    "translation": "\"Katakanlah: 'Aku berlindung kepada Rabb Yang menguasai (waktu) Shubuh dari kejahatan makhluk-Nya. Dan dari kejahatan malam apabila telah gelap gulita. Dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul. Serta dari kejahatan orang yang dengki apabila dia dengki.'\"",
    "target": 3,
    "type": "both"
  },
  {
    "id": "an-naas",
    "title": "Surat An-Naas",
    "arabic": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    "transliteration": "Qul a'uudzu birabbin naas. Malikin naas. Ilahin naas. Min syarril waswaasil khannaas. Alladzii yuwaswisu fii shuduurin naas. Minal jinnati wan naas.",
    "translation": "\"Katakanlah, 'Aku berlindung kepada Rabb (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan (Ilah) manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi. Yang membisikkan (kejahatan) ke dalam dada-dada manusia. Dari golongan jin dan manusia.'\"",
    "target": 3,
    "type": "both"
  },
  {
    "id": "pagi-1",
    "title": "Dzikir Pagi I",
    "arabic": "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
    "transliteration": "Ashbahnaa 'ala fithrotil Islam, wa 'ala kalimatil ikhlash, wa 'ala diini nabiiyinaa muhammad shallallahu alaihi wasallam, wa 'ala millati abainaa ibrahim haniifan muslimaw wamaa kaana minal musyrikiin.",
    "translation": "\"Di waktu pagi kami berada diatas fitrah agama Islam, kalimat ikhlas, agama Nabi kami Muhammad ﷺ dan agama ayah kami, Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik.\"",
    "target": 1,
    "type": "pagi"
  },
  {
    "id": "petang-1",
    "title": "Dzikir Petang I",
    "arabic": "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
    "transliteration": "Amsaynaa 'ala fithrotil Islam, wa 'ala kalimatil ikhlash, wa 'ala diini nabiiyinaa muhammad shallallahu alaihi wasallam, wa 'ala millati abainaa ibrahim haniifan muslimaw wamaa kaana minal musyrikiin.",
    "translation": "\"Di waktu petang kami berada diatas fitrah agama Islam, kalimat ikhlas, agama Nabi kami Muhammad ﷺ dan agama ayah kami, Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik.\"",
    "target": 1,
    "type": "petang"
  },
  {
    "id": "dzikir-2",
    "title": "Dzikir Pagi / Petang II",
    "arabic": "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    "transliteration": "Radhiitu billahi rabba, wa bil islaama diina, wa bi muhammadin nabiyya.",
    "translation": "\"Aku rela (ridha) Allah sebagai Rabb-ku (untukku dan orang lain), Islam sebagai agamaku dan Muhammad ﷺ sebagai Nabiku (yang diutus oleh Allah).\"",
    "target": 3,
    "type": "both"
  },
  {
    "id": "pagi-3",
    "title": "Dzikir Pagi III",
    "arabic": "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    "transliteration": "Allahumma bika ashbahnaa wa bika amsaynaa wa bika nahyaa, wa bika namuutu wa ilaikannusyuur.",
    "translation": "\"Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu sore. Dengan rahmat dan kehendak-Mu kami hidup dan dengan rahmat dan kehendak-Mu kami mati. Dan kepada-Mu kebangkitan (bagi semua makhluk).\"",
    "target": 1,
    "type": "pagi"
  },
  {
    "id": "petang-3",
    "title": "Dzikir Petang III",
    "arabic": "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    "transliteration": "Allahumma bika amsaynaa wa bika ashbahnaa wa bika nahyaa, wa bika namuutu wa ilaikalmashir.",
    "translation": "\"Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu petang, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi. Dengan rahmat dan kehendak-Mu kami hidup dan dengan rahmat dan kehendak-Mu kami mati. Dan kepada-Mu tempat kembali (bagi semua makhluk).\"",
    "target": 1,
    "type": "petang"
  },
  {
    "id": "pagi-4",
    "title": "Dzikir Pagi IV",
    "arabic": "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    "transliteration": "Ashbahnaa wa ashbahal mulku lillahi, walhamdulillah, laa ilaha illallah wahdahu laa syariika lahu, lahul mulku walahul hamdu, wahuwa 'ala kulli syai'in qadiir, rabbi as'aluka khaira maa fii haadzal yaumi wa khaira maa ba'dahu, wa a'uudzu bika min syarri maa fii haadzal yaumi wa syarri maa ba'dahu, rabbi a'uudzu bika minal kasali, wa suu'ul kibari, rabbi a'uudzu bika min 'adzaabin naari, wa 'adzaabil qabri.",
    "translation": "\"Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan (yang berhak disembah) kecuali Allah Yang Maha Esa, tiada sekutu bagiNya. Bagi-Nya kerajaan dan bagiNya pujian. Dia-lah Yang Mahakuasa atas segala se-suatu. Hai Tuhan, aku mohon kepada-Mu kebaikan di hari ini dan kebaikan sesudahnya. Aku berlindung kepadaMu dari kejahatan hari ini dan kejahatan sesudahnya. Wahai Tuhan, aku berlin-dung kepadaMu dari kemalasan dan kejelekan di hari tua. Wahai Tuhan! Aku berlindung kepadaMu dari siksaan di Neraka dan kubur.\"",
    "target": 1,
    "type": "pagi"
  },
  {
    "id": "petang-4",
    "title": "Dzikir Petang IV",
    "arabic": "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    "transliteration": "Amsaynaa wa amsal mulku lillahi, walhamdulillah, laa ilaha illallah wahdahu laa syariika lahu, lahul mulku walahul hamdu, wahuwa 'ala kulli syai'in qadiir, rabbi as'aluka khaira maa fii haadzihil lailati wa khaira maa ba'dahaa, wa a'uudzu bika min syarri maa fii haadzihil lailati wa syarri maa ba'dahaa, rabbi a'uudzu bika minal kasali, wa suu'ul kibari, rabbi a'uudzu bika min 'adzaabin naari, wa 'adzaabil qabri.",
    "translation": "\"Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan (yang berhak disembah) kecuali Allah Yang Maha Esa, tiada sekutu bagiNya. Bagi-Nya kerajaan dan bagiNya pujian. Dia-lah Yang Mahakuasa atas segala se-suatu. Hai Tuhan, aku mohon kepada-Mu kebaikan di malam ini dan kebaikan sesudahnya. Aku berlindung kepadaMu dari kejahatan malam ini dan kejahatan sesudahnya. Wahai Tuhan, aku berlin-dung kepadaMu dari kemalasan dan kejelekan di hari tua. Wahai Tuhan! Aku berlindung kepadaMu dari siksaan di Neraka dan kubur.\"",
    "target": 1,
    "type": "petang"
  },
  {
    "id": "sayyidul-istighfar",
    "title": "Sayyidul Istighfar",
    "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    "transliteration": "Allahumma anta rabbiy laa ilaaha illa anta, khalaqtanii wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mas tatho'tu. A'uudzu bika min syarri maa shana'tu, abuu'u laka bini'matika 'alayya wa abuu'u bidzanbii, faghfirlii, fa innahu laa yaghfirudz dzunuuba illa anta.",
    "translation": "\"Ya Allah, Engkau lah Tuhanku. Tidak ada Tuhan selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu. Aku berada di dalam hidayahmu, dan perjanjian dengan-Mu. Sebisa yang aku mampu. Aku berlindung kepada-Mu, dari segala kejelekan yang aku perbuat. Aku bersyukur atas nikmat yang Engkau limpahkan kepada kami, dan aku menyesal atas segala yang dosa yang aku perbuat. Maka ampunilah aku, sesungguhnya tidak ada yang dapat mengampuni dosa selain Engkau.\"",
    "target": 1,
    "type": "both"
  },
  {
    "id": "dzikir-6",
    "title": "Dzikir Pagi / Petang VI",
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
    "transliteration": "Allahumma inni as-alukal 'afwa wal 'afiyata fid dunya wal akhiroh. Allahumma inni as-alukal 'afwa wal 'afiyata fi diini wa dunyaya wa ahli wa mali. Allahummastur 'auroti wa amin row'ati. Allahummahfadzni min baini yadayya wa min kholfi wa 'an yamini wa 'an syimali wa min fauqi wa a'udzu bi 'adzamatika an ughtala min tahti.",
    "translation": "\"Ya Allah, sesungguhnya aku memohon kebajikan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon kebajikan dan keselamatan dalam agama, dunia, keluarga dan hartaku. Ya Allah, tutupilah auratku (aib dan sesuatu yang tidak layak dilihat orang) dan tentramkan-lah aku dari rasa takut. Ya Allah, peliharalah aku dari depan, belakang, kanan, kiri dan dari atasku. Aku berlindung dengan kebesaran-Mu, agar aku tidak disambar dari bawahku (aku berlindung dari dibenamkan ke dalam bumi).\"",
    "target": 1,
    "type": "both"
  },
  {
    "id": "dzikir-7",
    "title": "Dzikir Pagi / Petang VII",
    "arabic": "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
    "transliteration": "Allahumma 'aafinii fii badani, Allahumma 'aafinii fii sam'ii, Allahumma 'aafinii fii basharii, laa ilaaha illa anta. Allahumma inni a'uudzu bika minal kufri wal faqri, Allahumma inni a'uudzu bika min 'adzaabil qabri, laa ilaaha illa anta.",
    "translation": "\"Ya Allah, selamatkanlah tubuhku (dari penyakit dan dari apa yang tidak aku inginkan). Ya Allah, sehatkanlah pendengaranku. Ya Allah, sehatkanlah penglihatanku, tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau. Ya Allah sesungguhnya aku berlindung kepada-Mu dari kekufuran dan kefakiran. Aku berlindung kepada-Mu dari siksa kubur, tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau.\"",
    "target": 3,
    "type": "both"
  },
  {
    "id": "dzikir-8",
    "title": "Dzikir Pagi / Petang VIII",
    "arabic": "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ",
    "transliteration": "Allahumma 'aalimal ghaibi wasy syahaadah, faathiras samaawaati wal ardhi, rabba kulli syai'in wa maliikahu, asyhadu allaa ilaaha illa anta, a'uudzu bika min syarri nafsii, wa min syarrisy syaithaani wa syirkihi, wa an aqtarifa 'alaa nafsii suu'an au ajurrahu ilaa muslim.",
    "translation": "\"Ya Allah Yang Mahamengetahui yang ghaib dan yang nyata, wahai Rabb Pencipta langit dan bumi, Rabb atas segala sesuatu dan Yang Merajainya. Aku bersaksi bahwa tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, syaitan dan ajakannya menyekutukan Allah (aku berlindung kepada-Mu) dari berbuat kejelekan atas diriku atau mendorong seorang muslim kepadanya.\"",
    "target": 1,
    "type": "both"
  },
  {
    "id": "dzikir-9",
    "title": "Dzikir Pagi / Petang IX",
    "arabic": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    "transliteration": "Bismillahil ladzi laa yadhurru ma'asmihi syaiun fil ardhi wa laa fis samaa'i wa huwas samii'ul 'aliim.",
    "translation": "\"Dengan Menyebut Nama Allah, yang dengan Nama-Nya tidak ada satupun yang membahayakan, baik di bumi maupun dilangit. Dia-lah Yang Mahamendengar dan Maha mengetahui.\"",
    "target": 3,
    "type": "both"
  },
  {
    "id": "dzikir-10",
    "title": "Dzikir Pagi / Petang X",
    "arabic": "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    "transliteration": "Ya Hayyu ya Qayyum bi rahmatika astaghiits, ashlih lii sya'nii kullahu wa laa takilnii ilaa nafsii tharfata 'ainin.",
    "translation": "\"Wahai Rabb Yang Maha Hidup, wahai Rabb Yang Berdiri Sendiri (tidak butuh segala sesuatu), dengan rahmat-Mu aku minta pertolongan, perbaikilah segala urusanku dan jangan diserahkan kepadaku sekalipun sekejap mata (tanpa mendapat pertolongan dari-Mu).\"",
    "target": 1,
    "type": "both"
  },
  {
    "id": "pagi-11",
    "title": "Dzikir Pagi XI",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
    "transliteration": "Subhanallahi wa bihamdihi 'adada khalqihi, wa ridha nafsihi, wa zinata 'arsyihi, wa midaada kalimaatihi.",
    "translation": "\"Mahasuci Allah, aku memuji-Nya sebanyak bilangan makhluk-Nya, Mahasuci Allah sesuai ke-ridhaan-Nya, Mahasuci seberat timbangan 'Arsy-Nya, dan Mahasuci sebanyak tinta (yang menulis) kalimat-Nya.\"",
    "target": 3,
    "type": "pagi"
  },
  {
    "id": "petang-11",
    "title": "Dzikir Petang XI",
    "arabic": "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "transliteration": "A'udzu bikalimaatillahit taammaati min syarri maa kholaq.",
    "translation": "\"Aku berlindung dengan kalimat-kalimat Allah yang sempurna, dari kejahatan sesuatu yang diciptakan-Nya.\"",
    "target": 3,
    "type": "petang"
  },
  {
    "id": "dzikir-12",
    "title": "Dzikir Pagi / Petang XII",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    "transliteration": "Subhanallahi wa bihamdihi.",
    "translation": "\"Mahasuci Allah, aku memuji-Nya.\"",
    "target": 100,
    "type": "both"
  },
  {
    "id": "dzikir-13",
    "title": "Dzikir Pagi / Petang XIII",
    "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    "transliteration": "Laa ilaaha illallah wahdahu laa syariika lahu, lahul mulku walahul hamdu wahuwa 'ala kulli syai'in qadiir.",
    "translation": "\"Tidak ada Tuhan selain Allah, Yang Mahaesa tidak ada sekutu bagi-Nya, milik-Nyalah segala kerajaan dan bagi-Nya pujian dan Dia Mahaberkuasa atas segala sesuatu.\"",
    "target": 100,
    "type": "both"
  },
  {
    "id": "pagi-14",
    "title": "Dzikir Pagi XIV",
    "arabic": "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    "transliteration": "Astaghfirullah wa atuubu ilaihi.",
    "translation": "\"Aku memohon ampunan kepada Allah dan bertaubat kepada-Nya.\"",
    "target": 100,
    "type": "pagi"
  }
];
