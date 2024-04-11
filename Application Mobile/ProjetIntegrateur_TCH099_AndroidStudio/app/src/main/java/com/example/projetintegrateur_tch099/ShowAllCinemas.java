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

        Cinema cinema = new Cinema(1,"Vector","https://atlas-content-cdn.pixelsquid.com/stock-images/frog-Va4lJ52-600.jpg","146 rue houde", getApplicationContext());
        ArrayList<Cinema> daoCinemaList = dao.getCinemas();

        CinemaListAdapter adapter = new CinemaListAdapter(this, R.layout.cinema_list_view, daoCinemaList);

        cinemaList = (ListView) findViewById(R.id.listOfAllcinemas);
        cinemaList.setAdapter(adapter);
        cinemaList.setClickable(true);
    }
}
