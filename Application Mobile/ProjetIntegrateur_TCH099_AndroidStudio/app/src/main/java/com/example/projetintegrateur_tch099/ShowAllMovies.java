package com.example.projetintegrateur_tch099;

import android.os.Binder;
import android.os.Bundle;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class ShowAllMovies extends AppCompatActivity {

    private ListView filmlist;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_show_all_movies);


        FilmDao dao = FilmDao.getInstance(getApplicationContext());
        //Film film = new Film("Hello Wolrd","https://media.istockphoto.com/id/161003451/photo/green-iguana.jpg?s=612x612&w=0&k=20&c=eo8ugJRmE3lixeyHxRQ6Sxfj-mnviXCM_hozyEOLVFA=","The iguana movie");
        ArrayList<Film> testArraylist = dao.getFilms();
        //testArraylist.add(film);


        FilmListAdapter adapter = new FilmListAdapter(this,R.layout.film_list_item, testArraylist);
        filmlist = (ListView) findViewById(R.id.listOfAllmovies);
        filmlist.setAdapter(adapter);
    }
}