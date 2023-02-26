
function putidiom(lng) { 

    //------------------------------------
     // var titulo;
    // var enlace;
    // var ad, bc;
    // var busca;
    
    
    switch(lng) {
    case 'en':
    etiq[0] = "Interactive Historical World Atlas since 3000 BC";
    etiq[1] = "Embed";
    // etiq[2] = "Search on the map";
    etiq[2] = "Search";
    etiq[3] = "Years";
    etiq[4] = "LINK";
    etiq[5] = "Plain";
    etiq[6] = "Relief";
    etiq[7] = "Area";
    etiq[8] = "City";
    etiq[9] = "Event";
    etiq[10] = "Category";
    etiq[11] = "Displacement";
    etiq[12] = "Legend";
    etiq[20] = "Type in Country, Empire, ...";
    etiq[21] = "Run Search";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "From -3000 until current year";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "Refresh";
    etiq[30] = "Help";
    etiq[31] = "Year sequence";
    etiq[32] = "Forward";
    etiq[33] = "Clear all dates";
    etiq[34] = "Copy this Link";
    etiq[35] = "Backward";
    etiq[36] = "Play";
    etiq[37] = "Pause";
    ad = "";
    bc = " BC";
    break;
    
    case 'es':
    etiq[0] = "Atlas Histórico Mundial Interactivo desde 3000 a.C.";
    etiq[1] = "Incrustar";
    // etiq[2] = "Buscar en el mapa";
    etiq[2] = "Buscar";
    etiq[3] = "Años";
    etiq[4] = "ENLACE";
    etiq[5] = "Plano";
    etiq[6] = "Relieve";
    etiq[7] = "Área";
    etiq[8] = "Ciudad";
    etiq[9] = "Hecho";
    etiq[10] = "Categoría";
    etiq[11] = "Desplazamiento";
    etiq[12] = "Leyenda";
    etiq[20] = "Introduzca país, imperio, ...";
    etiq[21] = "Ejecute Buscar";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "Desde -3000 hasta año actual";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "Refrescar";
    etiq[30] = "Ayuda";
    etiq[31] = "Secuencia de años";
    etiq[32] = "Hacia adelante";
    etiq[33] = "Borrar todas las fechas";
    etiq[34] = "Copiar este Enlace";
    etiq[35] = "Hacia atrás";
    etiq[36] = "Play";
    etiq[37] = "Pause";
    ad = "";
    bc = " a.C.";
    break;
    
    case 'fr':
    etiq[0] = "Atlas Historique Interactif du monde à partir de 3000 avant JC";
    etiq[1] = "Incorporer";
    // etiq[2] = "Recherche sur la carte";
    etiq[2] = "Rechercher";
    etiq[3] = "Années";
    etiq[4] = "LIEN";
    etiq[5] = "Niveau";
    etiq[6] = "Relief";
    etiq[7] = "Zone";
    etiq[8] = "Ville";
    etiq[9] = "Événement";
    etiq[10] = "Catégorie";
    etiq[11] = "Déplacement";
    etiq[12] = "Légende";
    etiq[20] = "Taper le pays, Empire, ...";
    etiq[21] = "Lancez la recherche";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "De - 3000 jusqu'à l'année en cours";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "Actualiser";
    etiq[30] = "Aide";
    etiq[31] = "Une séquence d'années";
    etiq[32] = "Vers l'avant";
    etiq[33] = "Supprimer toutes les dates";
    etiq[34] = "Copiez ce lien";
    etiq[35] = "Vers l'arrière";
    etiq[36] = "Play";
    etiq[37] = "Pause";
    ad = "";
    bc = " av JC";
    break;
    
    case 'pt-pt':
    etiq[0] = "Atlas Histórico Mundial Interativo desde 3000 a.C.";
    etiq[1] = "Embutir";
    // etiq[2] = "Pesquisar no mapa";
    etiq[2] = "Pesquisa";
    etiq[3] = "Anos";
    etiq[4] = "LINK";
    etiq[5] = "Plano";
    etiq[6] = "Relevo";
    etiq[7] = "Área";
    etiq[8] = "cidade";
    etiq[9] = "Evento";
    etiq[10] = "Categoria";
    etiq[11] = "Deslocação";
    etiq[12] = "Legenda";
    etiq[20] = "Digitar país, Imperio, ...";
    etiq[21] = "Efetuar a pesquisa";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "De -3000 até presente ano";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "Atualizar";
    etiq[30] = "Ajuda";
    etiq[31] = "Seqüência de anos";
    etiq[32] = "Em frente";
    etiq[33] = "Apagar todas as datas";
    etiq[34] = "Copiar este link";
    etiq[35] = "Atrás";
    etiq[36] = "Play";
    etiq[37] = "Pause";
    ad = "";
    bc = " a.C.";
    break;
    
    case 'ja':
    etiq[0] = "????????????????? &nbsp;&nbsp;&nbsp; 3000 ??? - 2010";
    etiq[1] = "???????????";
    etiq[2] = "Historical Entity";
    etiq[3] = "Dates";
    etiq[4] = "Link";
    ad = " AD";
    bc = " BC";
    break;
    
    case 'zh-hans':
    etiq[0] = "互动世界历史地图集（从公元前3000年开始）";
    etiq[1] = "嵌入";
    // etiq[2] = "搜索地图";
    etiq[2] = "搜索";
    etiq[3] = "日期";
    etiq[4] = "链接";
    etiq[5] = "平面地图";
    etiq[6] = "立体地图";
    etiq[7] = "区";
    etiq[8] = "市";
    etiq[9] = "历史事件";
    etiq[10] = "类别";
    etiq[11] = "移位";
    etiq[12] = "图例";
    etiq[20] = "输入国家，帝国，...";
    etiq[21] = "进行搜索";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "从公元前3000年至今";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "刷新";
    etiq[30] = "帮助";
    etiq[31] = "年代序列";
    etiq[32] = "前进";
    etiq[33] = "删除所有日期";
    etiq[34] = "复制此链接";
    etiq[35] = "后退";
    etiq[36] = "播放";
    etiq[37] = "暂停";
    ad = "";
    bc = "公元前";
    break;
    
    case 'it':
    etiq[0] = "Atlante Storico Mondiale Interattivo dal 3000 aC";
    etiq[1] = "Embed";
    // etiq[2] = "Cerca sulla carta";
    etiq[2] = "Ricerca";
    etiq[3] = "Anni";
    etiq[4] = "LINK";
    etiq[5] = "Normale";
    etiq[6] = "Rilievo";
    etiq[7] = "Area";
    etiq[8] = "Città";
    etiq[9] = "Evento";
    etiq[10] = "Categoria";
    etiq[11] = "Spostamento";
    etiq[12] = "Leggenda";
    etiq[20] = "Per paese, Impero, ...";
    etiq[21] = "Cerca Run";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "Da -3000 fino all'anno in corso";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "100";
    etiq[29] = "Aggiorna";
    etiq[30] = "Guida";
    etiq[31] = "sequenza date";
    etiq[32] = "Avanti";
    etiq[33] = "Cancella tutte le date";
    etiq[34] = "Copia questo Link";
    etiq[35] = "Indietro";
    etiq[36] = "Play";
    etiq[37] = "Pausa";
    ad = "";
    bc = " aC";
    break;
    
    case 'de':
    etiq[0] = "Interaktiver Historischer Welt-Atlas ab 3000 v. Chr.";
    etiq[1] = "Einbetten";
    // etiq[2] = "Auf der Karte suchen";
    etiq[2] = "Suche";
    etiq[3] = "Jahr";
    etiq[4] = "LINK";
    etiq[5] = "Eben";
    etiq[6] = "Relief";
    etiq[7] = "Zone";
    etiq[8] = "Stadt";
    etiq[9] = "Ereignis";
    etiq[10] = "Kategorie";
    etiq[11] = "Verlagerung";
    etiq[12] = "Legende";
    etiq[20] = "Land, Reich, ...";
    etiq[21] = "Suche starten";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "Von 3000 v.Chr. bis zum laufenden Jahr";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "Erneuern";
    etiq[30] = "Hilfe";
    etiq[31] = "Sequenz von Jahren";
    etiq[32] = "Vorwärts";
    etiq[33] = "Alle Jahreszahlen löschen";
    etiq[34] = "Kopieren Sie diesen Link";
    etiq[35] = "Zurück";
    etiq[36] = "Abspielen";
    etiq[37] = "Pause";
    ad = "";
    bc = " v. Chr";
    break;
    
    case 'ru':
    etiq[0] = "Интерактивный Исторический Атлас Мира с 3000 до н.э";
    etiq[1] = "встраивать";
    // etiq[2] = "Поиск по карте";
    etiq[2] = "Поиск";
    etiq[3] = "Лет";
    etiq[4] = "ССЫЛКА";
    etiq[5] = "Белый";
    etiq[6] = "Рельефный";
    etiq[7] = "зона";
    etiq[8] = "Город";
    etiq[9] = "Событие";
    etiq[10] = "Категория";
    etiq[11] = "Водоизмещение";
    etiq[12] = "Легенда";
    etiq[20] = "Запишите страну, империю, ...";
    etiq[21] = "Запустить поиск";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "С -3000 до текущего года";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "Обновление";
    etiq[30] = "Помощь";
    etiq[31] = "Последовательность года";
    etiq[32] = "Вперед";
    etiq[33] = "Очистить все даты";
    etiq[34] = "Скопируйте эту ссылку";
    etiq[35] = "Назад";
    etiq[36] = "Воспроизведение";
    etiq[37] = "Стоп";
    ad = "";
    bc = " до н.э";
    break;
    
    default:
    etiq[0] = "Interactive Historical World Atlas since 3000 BC";
    etiq[1] = "Embed";
    // etiq[2] = "Search on the map";
    etiq[2] = "Search";
    etiq[3] = "Years";
    etiq[4] = "Link";
    etiq[5] = "Plain";
    etiq[6] = "Relief";
    etiq[7] = "Area";
    etiq[8] = "City";
    etiq[9] = "Event";
    etiq[10] = "Category";
    etiq[11] = "Displacement";
    etiq[12] = "Legend";
    etiq[20] = "Type in Country, Empire, ...";
    etiq[21] = "Run Search";
    etiq[22] = "-100";
    etiq[23] = "-10";
    etiq[24] = "-1";
    etiq[25] = "From -3000 until current year";
    etiq[26] = "+1";
    etiq[27] = "+10";
    etiq[28] = "+100";
    etiq[29] = "Refresh";
    etiq[30] = "Help";
    etiq[31] = "Year sequence";
    etiq[32] = "Forward";
    etiq[33] = "Clear all dates";
    etiq[34] = "Copy this Link";
    etiq[35] = "Backward";
    etiq[36] = "Play";
    etiq[37] = "Pause";
    ad = "";
    bc = " BC";
    }
    
    // ----------------------------------------
    }