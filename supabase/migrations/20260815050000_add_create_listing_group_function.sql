-- Crea un listing_group y sus N filas en 'borrador' en listings como una
-- sola operación atómica (todo o nada), para no dejar zonas "fantasma"
-- sin sus slots si algo falla a medio camino.
--
-- security invoker (default): corre con los permisos del usuario que
-- llama, así que sigue respetando las políticas de RLS que ya existen
-- (el insert en listing_groups exige owner_id = auth.uid(), y el insert
-- en listings exige que el listing_group le pertenezca al mismo usuario
-- — ambas cosas ya se cumplen porque acabamos de crear el grupo con
-- auth.uid() como dueño).

create or replace function public.create_listing_group_with_drafts(
  p_title text,
  p_zone text,
  p_declared_lots_total int
)
returns public.listing_groups
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_group public.listing_groups;
  i int;
begin
  if p_declared_lots_total < 1 or p_declared_lots_total > 500 then
    raise exception 'declared_lots_total debe ser un número entre 1 y 500';
  end if;

  insert into public.listing_groups (owner_id, title, zone, declared_lots_total)
  values (auth.uid(), p_title, p_zone, p_declared_lots_total)
  returning * into v_group;

  for i in 1..p_declared_lots_total loop
    insert into public.listings (listing_group_id, status)
    values (v_group.id, 'borrador');
  end loop;

  return v_group;
end;
$$;
