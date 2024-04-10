package com.example.projetintegrateur_tch099;

import android.os.Bundle;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class ShowAllCinemas extends AppCompatActivity {

    private ListView cinemaList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_show_all_cinemas_list);
        CinemaDao dao = CinemaDao.getInstance(getApplicationContext());
        ArrayList<Cinema> daoCinemaList = dao.getCinemas();

        CinemaListAdapter adapter = new CinemaListAdapter(this, R.layout.activity_show_all_cinemas_list, daoCinemaList);

        cinemaList = (ListView) findViewById(R.id.listOfAllcinemas);
        cinemaList.setAdapter(adapter);
        cinemaList.setClickable(true);
    }
}
