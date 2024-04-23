package com.example.projetintegrateur_tch099;

public class FilmChoisiSingleton {
    private Film filmChoisi;
    private static FilmChoisiSingleton filmChoisiSingleton;

    private FilmChoisiSingleton(){
        filmChoisi=new Film(-1,"Aucun film choisi","Aucun film choisi","Aucun film choisi");
    }

    public static synchronized FilmChoisiSingleton getInstance(){
        if (filmChoisiSingleton == null){
            filmChoisiSingleton = new FilmChoisiSingleton();
        }
        return filmChoisiSingleton;
    }

    public Film getFilmChoisi(){
        return filmChoisi;
    }
    public void setFilmChoisi(Film nouvFilmChoisi){
        filmChoisi=nouvFilmChoisi;
    }
}
