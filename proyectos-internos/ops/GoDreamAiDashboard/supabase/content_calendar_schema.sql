-- Tabla: content_calendar
-- Dashboard GoDreamAI — Sistema de contenido
-- Creada: Mayo 2026

create type content_tipo as enum ('reel', 'carrusel', 'historia', 'post_ig', 'post_linkedin');
create type content_pilar as enum ('DOLOR', 'TRANSFORMACION', 'AUTORIDAD', 'OBJECION', 'FUNDADOR');
create type content_estado as enum ('borrador', 'aprobado', 'publicado');
create type content_formato as enum ('cara_camara', 'pantalla', 'carrusel_diseno', 'solo_texto');

create table content_calendar (
  -- Identidad
  id                  uuid primary key default gen_random_uuid(),
  tipo                content_tipo        not null,
  pilar               content_pilar       not null,
  fecha_publicacion   date                not null,
  estado              content_estado      not null default 'borrador',

  -- Fórmula narrativa
  hook                text                not null,
  agitacion           text,
  reencuadre          text,
  sistema             text,
  cta                 text,

  -- Texto publicable
  caption             text,
  hashtags            text[],

  -- Visual / producción
  descripcion_visual  text,
  formato_produccion  content_formato,

  -- Solo Reels
  guion               text,               -- script con timestamps
  duracion_seg        integer,            -- 20–60 segundos

  -- Solo Carruseles
  -- slides: [{ slide, tipo, texto, color_fondo, elemento, visual_detalle }]
  slides              jsonb,

  -- Solo Historias
  -- secuencia: [{ story, tipo, texto, elemento, fondo, visual_detalle }]
  secuencia           jsonb,

  -- Imagen IA
  imagen_url          text,
  prompt_imagen       text,

  created_at          timestamptz         not null default now()
);

-- Índices útiles
create index on content_calendar (fecha_publicacion);
create index on content_calendar (estado);
create index on content_calendar (tipo);
create index on content_calendar (pilar);

-- RLS: dashboard interno — deshabilitar para permitir operaciones con anon key
-- Si se necesita RLS explícito, usar la política de abajo en su lugar
alter table content_calendar disable row level security;

-- Alternativa con RLS activo:
-- alter table content_calendar enable row level security;
-- create policy "allow_all_anon" on content_calendar for all to anon using (true) with check (true);
