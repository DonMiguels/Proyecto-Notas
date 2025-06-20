PGDMP      ;                }            notasbdd    16.3    16.3 !    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    36549    notasbdd    DATABASE     |   CREATE DATABASE notasbdd WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE notasbdd;
                postgres    false            �            1259    36578 
   categorias    TABLE        CREATE TABLE public.categorias (
    id integer NOT NULL,
    usuario_id integer,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    postgres    false            �            1259    36577    categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categorias_id_seq;
       public          postgres    false    220            �           0    0    categorias_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;
          public          postgres    false    219            �            1259    36589    nota_categoria    TABLE     h   CREATE TABLE public.nota_categoria (
    nota_id integer NOT NULL,
    categoria_id integer NOT NULL
);
 "   DROP TABLE public.nota_categoria;
       public         heap    postgres    false            �            1259    36562    notas    TABLE     �   CREATE TABLE public.notas (
    id integer NOT NULL,
    usuario_id integer,
    titulo character varying(100) NOT NULL,
    contenido character varying(250)
);
    DROP TABLE public.notas;
       public         heap    postgres    false            �            1259    36561    notas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.notas_id_seq;
       public          postgres    false    218            �           0    0    notas_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.notas_id_seq OWNED BY public.notas.id;
          public          postgres    false    217            �            1259    36551    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_usuario character varying(50) NOT NULL,
    contrasena text NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    36550    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    216            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    215            *           2604    36581    categorias id    DEFAULT     n   ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);
 <   ALTER TABLE public.categorias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            )           2604    36565    notas id    DEFAULT     d   ALTER TABLE ONLY public.notas ALTER COLUMN id SET DEFAULT nextval('public.notas_id_seq'::regclass);
 7   ALTER TABLE public.notas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            (           2604    36554    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    36578 
   categorias 
   TABLE DATA           <   COPY public.categorias (id, usuario_id, nombre) FROM stdin;
    public          postgres    false    220   �$       �          0    36589    nota_categoria 
   TABLE DATA           ?   COPY public.nota_categoria (nota_id, categoria_id) FROM stdin;
    public          postgres    false    221   �$       �          0    36562    notas 
   TABLE DATA           B   COPY public.notas (id, usuario_id, titulo, contenido) FROM stdin;
    public          postgres    false    218   �$       �          0    36551    usuarios 
   TABLE DATA           B   COPY public.usuarios (id, nombre_usuario, contrasena) FROM stdin;
    public          postgres    false    216   g%       �           0    0    categorias_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categorias_id_seq', 1, false);
          public          postgres    false    219            �           0    0    notas_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.notas_id_seq', 9, true);
          public          postgres    false    217            �           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);
          public          postgres    false    215            2           2606    36583    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    220            4           2606    36593 "   nota_categoria nota_categoria_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public.nota_categoria
    ADD CONSTRAINT nota_categoria_pkey PRIMARY KEY (nota_id, categoria_id);
 L   ALTER TABLE ONLY public.nota_categoria DROP CONSTRAINT nota_categoria_pkey;
       public            postgres    false    221    221            0           2606    36571    notas notas_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.notas DROP CONSTRAINT notas_pkey;
       public            postgres    false    218            ,           2606    36560 $   usuarios usuarios_nombre_usuario_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_nombre_usuario_key UNIQUE (nombre_usuario);
 N   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_nombre_usuario_key;
       public            postgres    false    216            .           2606    36558    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    216            6           2606    36584 %   categorias categorias_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_usuario_id_fkey;
       public          postgres    false    216    4654    220            7           2606    36599 /   nota_categoria nota_categoria_categoria_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.nota_categoria
    ADD CONSTRAINT nota_categoria_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.nota_categoria DROP CONSTRAINT nota_categoria_categoria_id_fkey;
       public          postgres    false    221    4658    220            8           2606    36594 *   nota_categoria nota_categoria_nota_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.nota_categoria
    ADD CONSTRAINT nota_categoria_nota_id_fkey FOREIGN KEY (nota_id) REFERENCES public.notas(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.nota_categoria DROP CONSTRAINT nota_categoria_nota_id_fkey;
       public          postgres    false    4656    218    221            5           2606    36572    notas notas_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.notas DROP CONSTRAINT notas_usuario_id_fkey;
       public          postgres    false    218    4654    216            �      x������ � �      �      x������ � �      �   z   x�3�4�(*MMJ�R\�0�̒��D#��D��̢��Û����K��̀B`vJ�BDʫ83%++��(�]���$`0��h�38�˒ӈ�#?'fz�BiqibQf��W� f<�      �   *   x�3���L/ḾRF\F��ť�E��F��F�&�\1z\\\ ��
�     