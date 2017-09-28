import { DragDropManager } from './manager';
import { invariant } from './invariant';
type Monitor = any;

let isCallingCanDrag = false;
let isCallingIsDragging = false;

export class DragSourceMonitor {
    internalMonitor: Monitor;
    sourceId: any;

    constructor(manager: DragDropManager) {
        this.internalMonitor = manager.getMonitor();
    }

    receiveHandlerId(sourceId) {
        this.sourceId = sourceId;
    }

    canDrag() {
        invariant(
            !isCallingCanDrag,
            'You may not call monitor.canDrag() inside your canDrag() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html',
        );

        try {
            isCallingCanDrag = true;
            return this.internalMonitor.canDragSource(this.sourceId);
        } finally {
            isCallingCanDrag = false;
        }
    }

    isDragging() {
        invariant(
            !isCallingIsDragging,
            'You may not call monitor.isDragging() inside your isDragging() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html',
        );

        try {
            isCallingIsDragging = true;
            return this.internalMonitor.isDraggingSource(this.sourceId);
        } finally {
            isCallingIsDragging = false;
        }
    }

    getItemType() {
        return this.internalMonitor.getItemType();
    }

    getItem() {
        return this.internalMonitor.getItem();
    }

    getDropResult() {
        return this.internalMonitor.getDropResult();
    }

    didDrop() {
        return this.internalMonitor.didDrop();
    }

    getInitialClientOffset() {
        return this.internalMonitor.getInitialClientOffset();
    }

    getInitialSourceClientOffset() {
        return this.internalMonitor.getInitialSourceClientOffset();
    }

    getSourceClientOffset() {
        return this.internalMonitor.getSourceClientOffset();
    }

    getClientOffset() {
        return this.internalMonitor.getClientOffset();
    }

    getDifferenceFromInitialOffset() {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    }
}

export function createSourceMonitor(manager: DragDropManager) {
    return new DragSourceMonitor(manager);
}
