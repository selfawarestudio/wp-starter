<?php

$wpstarter_context = Timber::context();
$wpstarter_context['post'] = new Timber\Post();

Timber::render('page.twig', $wpstarter_context);
