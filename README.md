Bemutatás:Ez a része a projektünknek az User/felhasználói oldalát fogja ellátni. A weboldalon a felhasználó vásárolhat a különböző F1 es autó alkatrészek közül, F1-es csapatok polóit megveheti, meg ha valakinek van egy csapata akkor egy pilótát is kereshet az autójába.


A projekt megnyitása: Első lépésben ( ha még nincs meg) indítsuk el a XAMPP Control Panelt-t és azon belül indítsuk el Apache és a Mysql szolgáltatásokat. Ezután a phpMyAdmin-ban importálja be az f1.sql-t (ha ez a lépés még nincs meg).


Második lépésben nyissa meg a Visual Studio Code ot és a Clone Git Repository gomb segitségével klónozza az alábbi Repót: 
https://github.com/DDomix/vizsgaremek_backend.git
ezek után a menüsávban a terminal fülön nyisson egy új terminalt. Oda irja be az „npm i” és aztán az „npm run start:dev” parancsokat.
Ezek után a VS Code menüsávjában menjen a File menüpontra és nyisson egy új ablakot
azután az előbbi módszer alapját klónozza ezt a repót is.

itt nyisson egy terminalt az előbbi módón és írja be az „npm i” és a „npm start” parancsokat. Itt fel fogja kínálni hogy futtassuk-e a szervert egy másik porton (mivel a 3000est már előbb lefoglaltuk) nyomjunk egy „y”-t. 
Ezek után megfogja nyitni a weboldal Login oldalát. 

Itt lehet bejelentkezni a már meglévő fiókunkba. 
Ha nincs fiókunk kattintsunk a "Register" gombra, itt lehet elvégezni a regisztrációt.

Sikeres regisztráció és bejelentkezés után a főoldal fog fogadni minket.

Itt 3 menüpont közül választhatunk.
Az elsőben F1 es autóhoz vehetünk alkatrészeket.
Az egyes menüpontokon belül láthatóak a Motorhoz/Karosszériához/Vezethetőséghez kapcsolódó alkatrészek.

A „Drivers” menüben az F2 és F3 as elérhető pilóták listája látható. A menü gombnál találjuk meg a szűrőket, itt lehet keresni név/csapat/nemzetiség és kategória alapján.

A Shop menüben vásárolhatunk az összes csapat hivatalos pólói/pulcsijai és sapkái közül.
Szűrhetünk Csapat/Méret/Szín és típus alapján a menü ikonra kattintva.
A Cart gombra kattintva megnézhetjük a kosarunk tartalmát.

Itt növelhetjük a mennyiséget és Fizethetünk.
A sikeres vásárlásról a „Checkout Successful” üzenet fog fogadni.
A jobb felső sarokban a kijelentkezés ikonra kattintva pedig kijelentkezhetünk.

