package com.example.projetintegrateur_tch099;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

public class filmListView extends AppCompatActivity {

    private ImageView filmViewList;
    private TextView filmName;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);

        filmViewList = findViewById(R.id.filmPictureList);
        filmName = findViewById(R.id.filmName);
    }
}