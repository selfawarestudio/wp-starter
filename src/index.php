<?php

$wpstarter_context          = Timber::context();
$wpstarter_context['posts'] = new Timber\PostQuery();

Timber::render( 'base.twig', $wpstarter_context );
