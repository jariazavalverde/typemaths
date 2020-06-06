import { RealFunction } from "../src/types.ts";
import { map, take, enumFrom } from "../src/generators.ts";
import { id, compose, curry2 } from "../src/combinators.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Functor laws for generators", () => {

    const gen = () => enumFrom(1);
    const f:RealFunction = x => x+1;
    const g:RealFunction = x => x*2;

    // Functors must preserve identity morphisms
    // fmap id == id
    assertEquals(
        // fmap id
        take(10, map(id, gen())),
        // id
        id(take(10, gen()))
    );

    // Functors must preserve composition of morphisms
    // fmap (f . g)  ==  fmap f . fmap g
    assertEquals(
        // fmap (f . g)
        take(10, map(compose(f, g), gen())),
        // fmap f . fmap g
        take(10, compose(curry2(map)(f), curry2(map)(g))(gen()))
    );

});