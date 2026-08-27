"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type IntroProps = {
  onEnter: () => void;
};

export default function Intro({ onEnter }: IntroProps) {
  const [scene, setScene] = useState(0);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const timers = [
      // Scene 1 — Lost in space
      setTimeout(() => setScene(1), 500),

      // Scene 2 — First story
      setTimeout(() => setScene(2), 4500),

      // Scene 3 — Stories arrive
      setTimeout(() => setScene(3), 9000),

      // Scene 4 — Orbit
      setTimeout(() => setScene(4), 14000),

      // Scene 5 — Realization
      setTimeout(() => setScene(5), 19000),

      // Launch
      setTimeout(() => {
        setLaunching(true);
      }, 24000),

      // Enter library
      setTimeout(() => {
        onEnter();
      }, 27000),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onEnter]);

  function skipIntro() {
    if (launching) return;

    setLaunching(true);

    setTimeout(() => {
      onEnter();
    }, 2200);
  }

  return (
    <main className={`intro ${launching ? "intro-launching" : ""}`}>
      {/* ================================
          BACKGROUND
      ================================= */}

      <div className="intro-space" />

      <Image
        src="/intro/nebula-mix.png"
        alt=""
        width={1200}
        height={800}
        priority
        className="intro-nebula intro-nebula-main"
      />

      <Image
        src="/intro/nebula-mint.png"
        alt=""
        width={900}
        height={700}
        className="intro-nebula intro-nebula-mint"
      />

      <Image
        src="/intro/nebula-yellow.png"
        alt=""
        width={800}
        height={600}
        className="intro-nebula intro-nebula-yellow"
      />

      <Image
        src="/intro/stardust.png"
        alt=""
        width={1400}
        height={900}
        className="intro-stardust"
      />

      <Image
        src="/intro/star-sparkles.png"
        alt=""
        width={1000}
        height={800}
        className="intro-sparkles intro-sparkles-one"
      />

      <Image
        src="/intro/star-sparkles.png"
        alt=""
        width={1000}
        height={800}
        className="intro-sparkles intro-sparkles-two"
      />

      <Image
        src="/intro/asteroids.png"
        alt=""
        width={500}
        height={500}
        className="intro-asteroids"
      />

      {/* ================================
          SCENE 1 — LOST
      ================================= */}

      <section
        className={`intro-scene scene-lost ${
          scene === 1 ? "scene-active" : ""
        } ${scene > 1 ? "scene-leaving" : ""}`}
      >
        <div className="lost-oing-wrap">
          <Image
            src="/oing/oing-float.png"
            alt="우주를 떠다니는 오잉"
            width={420}
            height={420}
            priority
            className="intro-oing lost-oing"
          />
        </div>
      </section>

      {/* ================================
          SCENE 2 — FIRST STORY
      ================================= */}

      <section
        className={`intro-scene scene-first-story ${
          scene === 2 ? "scene-active" : ""
        } ${scene > 2 ? "scene-leaving" : ""}`}
      >
        <div className="first-book-glow">
          <Image
            src="/intro/book-glow.png"
            alt=""
            width={350}
            height={350}
            className="book-glow"
          />
        </div>

        <Image
          src="/oing/oing-side.png"
          alt="이야기를 발견한 오잉"
          width={430}
          height={430}
          className="intro-oing first-oing-side"
        />

        <Image
          src="/oing/oing-curious.png"
          alt="궁금해하는 오잉"
          width={430}
          height={430}
          className="intro-oing first-oing-curious"
        />

        <div className="first-book-wrap">
          <Image
            src="/intro/book-yellow.png"
            alt=""
            width={180}
            height={180}
            className="intro-book first-book"
          />
        </div>
      </section>

      {/* ================================
          SCENE 3 — STORIES
      ================================= */}

      <section
        className={`intro-scene scene-stories ${
          scene === 3 ? "scene-active" : ""
        } ${scene > 3 ? "scene-leaving" : ""}`}
      >
        <Image
          src="/oing/oing-surprised.png"
          alt="놀란 오잉"
          width={440}
          height={440}
          className="intro-oing surprised-oing"
        />

        <Image
          src="/oing/oing-excited.png"
          alt="신난 오잉"
          width={440}
          height={440}
          className="intro-oing excited-oing"
        />

        <Image
          src="/oing/oing-happy.png"
          alt="행복한 오잉"
          width={440}
          height={440}
          className="intro-oing happy-oing"
        />

        <div className="story-book story-book-yellow">
          <Image
            src="/intro/book-yellow.png"
            alt=""
            width={190}
            height={190}
          />
        </div>

        <div className="story-book story-book-mint">
          <Image
            src="/intro/book-mint.png"
            alt=""
            width={190}
            height={190}
          />
        </div>

        <div className="story-book story-book-blue">
          <Image
            src="/intro/book-blue.png"
            alt=""
            width={190}
            height={190}
          />
        </div>

        <div className="story-book story-book-open-yellow">
          <Image
            src="/intro/book-open-yellow.png"
            alt=""
            width={200}
            height={200}
          />
        </div>

        <div className="story-book story-book-open-mint">
          <Image
            src="/intro/book-open-mint.png"
            alt=""
            width={200}
            height={200}
          />
        </div>

        <div className="story-book story-book-open-blue">
          <Image
            src="/intro/book-open-blue.png"
            alt=""
            width={200}
            height={200}
          />
        </div>

        <Image
          src="/intro/emphasis-marks.png"
          alt=""
          width={200}
          height={200}
          className="emphasis-marks"
        />
      </section>

      {/* ================================
          SCENE 4 — ORBIT
      ================================= */}

      <section
        className={`intro-scene scene-orbit ${
          scene === 4 ? "scene-active" : ""
        } ${scene > 4 ? "scene-leaving" : ""}`}
      >
        <Image
          src="/intro/orbit-rings.png"
          alt=""
          width={1100}
          height={800}
          className="orbit-rings"
        />

        <Image
          src="/intro/glow-orbs.png"
          alt=""
          width={1000}
          height={800}
          className="orbit-glow-orbs"
        />

        <Image
          src="/intro/trail-long.png"
          alt=""
          width={1000}
          height={350}
          className="orbit-trail orbit-trail-one"
        />

        <Image
          src="/intro/trail-short.png"
          alt=""
          width={700}
          height={300}
          className="orbit-trail orbit-trail-two"
        />

        <Image
          src="/intro/trail-short.png"
          alt=""
          width={700}
          height={300}
          className="orbit-trail orbit-trail-three"
        />

        <div className="orbit-book orbit-book-one">
          <Image
            src="/intro/book-yellow.png"
            alt=""
            width={150}
            height={150}
          />
        </div>

        <div className="orbit-book orbit-book-two">
          <Image
            src="/intro/book-mint.png"
            alt=""
            width={150}
            height={150}
          />
        </div>

        <div className="orbit-book orbit-book-three">
          <Image
            src="/intro/book-blue.png"
            alt=""
            width={150}
            height={150}
          />
        </div>

        <div className="orbit-book orbit-book-four">
          <Image
            src="/intro/book-open-yellow.png"
            alt=""
            width={160}
            height={160}
          />
        </div>

        <Image
          src="/oing/oing-back.png"
          alt="이야기들을 바라보는 오잉"
          width={470}
          height={470}
          className="intro-oing orbit-oing-back"
        />
      </section>

      {/* ================================
          SCENE 5 — REALIZATION
      ================================= */}

      <section
        className={`intro-scene scene-realization ${
          scene === 5 ? "scene-active" : ""
        }`}
      >
        <div className="realization-light" />

        <Image
          src="/intro/orbit-rings.png"
          alt=""
          width={900}
          height={650}
          className="realization-orbits"
        />

        <Image
          src="/oing/oing-tilt.png"
          alt="생각하는 오잉"
          width={470}
          height={470}
          className="intro-oing realization-oing-tilt"
        />

        <Image
          src="/oing/oing-determined.png"
          alt="자신의 길을 찾은 오잉"
          width={470}
          height={470}
          className="intro-oing realization-oing-determined"
        />
      </section>

      {/* ================================
          STORY TEXT
      ================================= */}

      <div className="intro-text">
        {scene === 1 && (
          <p className="story-text">
            아직 별똥별이 되지 못한
            <br />
            작은 운석, 오잉.
          </p>
        )}

        {scene === 2 && (
          <p className="story-text">
            그러던 어느 날,
            <br />
            하나의 이야기를 만났어요.
          </p>
        )}

        {scene === 3 && (
          <p className="story-text">
            그리고 또 하나,
            <br />
            또 하나.
          </p>
        )}

        {scene === 4 && (
          <p className="story-text story-text-wide">
            이야기를 만날 때마다,
            <br />
            오잉에게는 새로운 궤도가 생겼어요.
          </p>
        )}

        {scene >= 5 && (
          <p className="story-text story-text-final">
            이야기를 따라,
            <br />
            나만의 궤도를 찾아요.
          </p>
        )}
      </div>

      {/* ================================
          LAUNCH
      ================================= */}

      {launching && (
        <section className="launch-scene">
          <Image
            src="/intro/starburst.png"
            alt=""
            width={800}
            height={800}
            className="launch-starburst"
          />

          <Image
            src="/intro/trail-short.png"
            alt=""
            width={700}
            height={300}
            className="launch-trail-short"
          />

          <Image
            src="/intro/trail-long.png"
            alt=""
            width={1800}
            height={500}
            className="launch-trail-long"
          />

          <div className="shooting-oing-wrap">
            <Image
              src="/oing/oing-shooting.png"
              alt="별똥별처럼 날아가는 오잉"
              width={600}
              height={600}
              priority
              className="intro-oing shooting-oing"
            />
          </div>

          <div className="launch-whiteout" />
        </section>
      )}

      {!launching && (
        <button
          onClick={skipIntro}
          className="intro-enter-button"
        >
          이야기 속으로 →
        </button>
      )}
    </main>
  );
}