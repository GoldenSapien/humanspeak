'use client';

import { Tldraw } from 'tldraw';
import { useCallback } from 'react';
import { HumanSpeakShapeUtil } from './shapes/HumanSpeakShapeUtil';

export default function HumanSpeakEditor() {
  const handleMount = useCallback((editor: any) => {
    // Register custom shapes
    if (editor.registerShapeUtils) {
      editor.registerShapeUtils([HumanSpeakShapeUtil]);
    }

    // Keyboard shortcuts - Event Storming + DDD
    editor.setKeyboardShortcuts({
      'e': () => createShapeAtCenter(editor, 'domain-event'),
      'c': () => createShapeAtCenter(editor, 'command'),
      'a': () => createShapeAtCenter(editor, 'aggregate-root'),
      'n': () => createShapeAtCenter(editor, 'entity'),
      'v': () => createShapeAtCenter(editor, 'value-object'),
      'p': () => createShapeAtCenter(editor, 'actor'),
      'o': () => createShapeAtCenter(editor, 'policy'),
      'h': () => createShapeAtCenter(editor, 'hotspot'),
      't': () => createShapeAtCenter(editor, 'note'),
    });

    console.log('✅ HumanSpeak custom shapes & hotkeys ready!');
  }, []);

  return (
    <div className="h-screen w-screen relative bg-zinc-950 overflow-hidden">
      <Tldraw
        onMount={handleMount}
        shapeUtils={[HumanSpeakShapeUtil]}
        persistenceKey="humanspeak-canvas"
      />

      {/* AI Copilot Sidebar */}
      <div className="absolute top-4 right-4 w-96 bg-zinc-900/95 border border-zinc-700 rounded-2xl shadow-2xl p-6 z-50 backdrop-blur-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          🤖 AI Copilot
        </h2>
        <p className="text-sm text-zinc-400 mb-4">
          Hotkeys:<br />
          <strong>E</strong> Event • <strong>C</strong> Command • <strong>A</strong> Aggregate
        </p>
        <div className="text-xs text-emerald-400">Modeling canvas ready</div>
      </div>
    </div>
  );
}

function createShapeAtCenter(editor: any, type: string) {
  const viewport = editor.getViewportPageBounds?.() || { center: { x: 400, y: 300 } };
  const x = viewport.center.x - 80;
  const y = viewport.center.y - 45;

  editor.createShape({
    type: 'humanspeak-shape',
    props: { type, label: type.replace(/-/g, ' ').toUpperCase() },
    x,
    y,
  });
}
