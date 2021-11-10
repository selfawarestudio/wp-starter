<?php

/* Template Name: Home template */

$context = Timber::context();
$context['post'] = new Timber\Post();

Timber::render('page-home.twig', $context);