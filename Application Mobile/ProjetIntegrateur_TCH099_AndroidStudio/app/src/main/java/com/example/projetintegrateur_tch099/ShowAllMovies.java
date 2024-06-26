package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Binder;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class ShowAllMovies extends AppCompatActivity {

    private ListView filmlist;
    Button backButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_show_all_movies);

        backButton = findViewById(R.id.showAllFilmBack);

        FilmDao dao = FilmDao.getInstance(getApplicationContext());
        ArrayList<Film> daoFilmArrayList = dao.getFilms();

        FilmListAdapter adapter = new FilmListAdapter(this,R.layout.film_list_item, daoFilmArrayList);
        filmlist = (ListView) findViewById(R.id.listOfAllmovies);
        filmlist.setAdapter(adapter);
        filmlist.setClickable(true);
        filmlist.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(ShowAllMovies.this, DisplaySpecificMovie.class);

                intent.putExtra("film",daoFilmArrayList.get(position));
                startActivity(intent);
            }
        });

        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

    }
}