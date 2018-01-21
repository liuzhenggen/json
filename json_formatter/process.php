<?php

    header('application/json');

    $post_data = file_get_contents("php://input");

    $option = array(
        'http' => array(
            'method'    => 'POST',
            'content'   => $post_data
        )
    );

    $context = stream_context_create($option);

    echo file_get_contents('https://jsonformatter.curiousconcept.com/process', NULL, $context);