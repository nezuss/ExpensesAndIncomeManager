import { useState } from 'react';
import axios from 'axios';
/* The commented section in the code is written in Russian and it translates to: */

/*
Доделать задание. Создание сайта для менеджмента растрат (доходы по категориям) 

сделать диагрмму
*/

function App() {
    return (
        <div className="flex row align-start justify-center gap-12 p-12">
            <div className="sticky flex column gap-12 max-w-600 w-600 bg-2 b p-12 br-12 top-12">
                <h2>Home</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elementum eros fringilla tellus dignissim lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in commodo dui, eget auctor nulla. Donec varius ultrices enim, in aliquam risus vehicula in. Sed varius enim a laoreet euismod. Mauris sagittis ornare nisi vel vulputate. In bibendum quis mi sit amet imperdiet. Suspendisse potenti. Morbi mollis non purus a imperdiet. Morbi volutpat congue nunc at imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla cursus magna nisl, vitae vulputate magna tristique ut. Vivamus in rutrum enim. Nunc mattis placerat tortor in dictum. Praesent feugiat metus eget urna venenatis egestas. Fusce tempor iaculis neque, vitae faucibus mi suscipit et.</p>
                <p>Donec leo mauris, ornare vel tristique sit amet, fermentum ut purus. Nulla quis ante condimentum, interdum massa a, ultrices velit. Morbi turpis augue, posuere id erat et, pharetra consectetur metus. Donec vel elementum velit. Phasellus ultricies, ex in sollicitudin varius, metus nulla bibendum nisl, non facilisis neque nisi sit amet ipsum. Duis sagittis nisi vulputate diam accumsan, at ornare augue ornare. Quisque id pharetra nisl. Pellentesque ac arcu justo. Nulla in felis egestas, malesuada est ultricies, ornare felis. Curabitur quis urna rutrum, tempor massa non, laoreet lorem. Integer molestie nec augue ac condimentum.</p>
                <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed elit mi, blandit pellentesque blandit commodo, consequat ac ipsum. Nunc egestas vel tortor sit amet vestibulum. Donec arcu ante, tincidunt ac odio sit amet, sagittis lacinia augue. Quisque leo lacus, porta ut magna et, suscipit mattis leo. Donec ornare tellus eu ligula fermentum sodales. Sed suscipit purus mattis, commodo mi id, dignissim ipsum. Pellentesque sit amet vestibulum elit. Etiam scelerisque erat at ante luctus dignissim.</p>
                <p>Proin facilisis fermentum tellus a condimentum. Duis ut odio id turpis semper facilisis. Aenean hendrerit velit velit, sit amet feugiat lectus gravida quis. Nulla facilisi. Proin finibus mattis neque, id cursus felis ullamcorper non. Quisque non nulla neque. Aliquam quis ullamcorper erat, id condimentum odio. Nunc sem nisl, iaculis egestas velit sit amet, laoreet malesuada mauris. Duis imperdiet lectus et metus sodales bibendum. Mauris pellentesque eu velit ac efficitur. Nam interdum risus eget posuere commodo.</p>
            </div>
        </div>
    );
}

export default App;