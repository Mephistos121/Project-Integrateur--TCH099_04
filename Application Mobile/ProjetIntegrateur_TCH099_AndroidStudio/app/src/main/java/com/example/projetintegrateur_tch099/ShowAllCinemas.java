package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class ShowAllCinemas extends AppCompatActivity {

    private ListView cinemaList;
    Button backButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_show_all_cinemas_list);

        backButton = findViewById(R.id.showAllCinemaBack);

        CinemaDao dao = CinemaDao.getInstance(getApplicationContext());
        ArrayList<Cinema> daoCinemaList = dao.getCinemas();

        CinemaListAdapter adapter = new CinemaListAdapter(this, R.layout.cinema_list_view, daoCinemaList);

        cinemaList = (ListView) findViewById(R.id.listOfAllcinemas);
        cinemaList.setAdapter(adapter);
        cinemaList.setClickable(true);

        cinemaList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(ShowAllCinemas.this, showFilmCinemaSpecific.class);

                intent.putExtra("cinema", position);
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
