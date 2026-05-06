import { TLBaseShape, DefaultShapeUtil } from 'tldraw';

type HumanSpeakShapeType =
  | 'domain-event'
  | 'command'
  | 'aggregate-root'
  | 'entity'
  | 'value-object'
  | 'actor'
  | 'policy'
  | 'hotspot'
  | 'note';

export class HumanSpeakShapeUtil extends DefaultShapeUtil {
  static override type = 'humanspeak-shape' as const;

  override getDefaultProps() {
    return {
      type: 'domain-event' as HumanSpeakShapeType,
      w: 160,
      h: 90,
      label: 'New Domain Event',
    };
  }

  override component(shape: any) {
    const colorMap: Record<HumanSpeakShapeType, string> = {
      'domain-event': '#f97316',   // orange
      'command': '#3b82f6',        // blue
      'aggregate-root': '#8b5cf6', // purple
      'entity': '#14b8a6',         // teal
      'value-object': '#22c55e',   // green
      'actor': '#eab308',          // yellow
      'policy': '#ef4444',         // red
      'hotspot': '#ec4899',        // pink
      'note': '#6b7280',           // gray
    };

    const bgColor = colorMap[shape.props.type] || '#64748b';

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: bgColor,
          borderRadius: shape.props.type === 'note' ? '6px' : '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '14px',
          textAlign: 'center',
          padding: '8px',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
          border: '3px solid rgba(255,255,255,0.25)',
          overflow: 'hidden',
        }}
      >
        {shape.props.label}
      </div>
    );
  }

  override indicator(shape: any) {
    return <rect width={shape.props.w} height={shape.props.h} rx={12} fill="none" stroke="white" strokeWidth={2} />;
  }
}

export { HumanSpeakShapeUtil };
