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

        filmlist = findViewById(R.id.listOfAllmovies);
        FilmDao dao = FilmDao.getInstance(getApplicationContext());

        for(int i = 0; i < dao.getFilms().size(); i++){
            System.out.println(dao.getFilms().get(i).getNom_film());
        }

        //FilmListAdapter adapter = new FilmListAdapter(this, dao.getFilms());
        //filmlist.setAdapter(adapter);
    }
}