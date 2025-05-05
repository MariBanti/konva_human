import { Injectable } from '@angular/core';
import Konva from 'konva';

type Side = 'left' | 'right';

@Injectable({
  providedIn: 'root',
})
export class CreateHumanService {
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private centerX: number;

  private config = {
    colors: {
      skin: '#FFEFD5',
      skinStroke: '#FFE4B5',
      purpleDress: '#CE84E1',
      darkPurple: '#87479D',
      darkPurpleStroke: '#9400D3',
      lightPurple: '#F7E3FD',
      lightPurpleStroke: '#F7E9FD',
    },
    sizes: {
      head: { width: 45, height: 80 },
      neck: { width: 20, height: 70 },
      body: { halfWidth: 50 },
      legs: {
        hipWidth: 35,
        legWidth: 40,
        hipLength: 140,
        shinLength: 130,
        feetLength: 20,
      },
      arms: {
        shoulderWidth: 20,
      },
      hat: { width: 80 },
      skirt: { height: 100 },
      collar: { offset: 15 },
    },
    positions: {
      headTop: 100,
    },
    strokeWidth: 2,
  };

  initStage(container: HTMLDivElement, width: number, height: number) {
    this.stage = new Konva.Stage({
      container,
      width,
      height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.centerX = width / 2;
    this.stage.draggable(false);
  }

  createHuman() {
    this.drawNeck();
    this.drawHead();
    this.drawHat();
    this.drawBody();
    this.drawLegs();
    this.drawSkirt();
    this.drawArms();
    this.drawCollar();
  }

  private drawHead(): void {
    const { width, height } = this.config.sizes.head;
    const headTop = 100;

    this.addPolygon(
      [
        this.centerX,
        headTop,
        this.centerX - width / 2,
        headTop + height / 2,
        this.centerX,
        headTop + height,
        this.centerX + width / 2,
        headTop + height / 2,
      ],
      this.config.colors.skin,
      this.config.colors.skinStroke,
      this.config.strokeWidth
    );
  }

  private drawNeck(): void {
    const headTop = 100;
    const { height } = this.config.sizes.head;

    const neck = new Konva.Rect({
      x: this.centerX - 10,
      y: headTop + height / 2,
      width: 20,
      height: 70,
      fill: this.config.colors.skinStroke,
    });

    this.layer.add(neck);
  }

  private drawHat(): void {
    const headTop = 100;
    const { height } = this.config.sizes.head;

    this.addPolygon(
      [
        this.centerX,
        headTop,
        this.centerX + 80,
        headTop + height / 2,
        this.centerX - 80,
        headTop + height / 2,
      ],
      this.config.colors.darkPurple,
      this.config.colors.darkPurple,
      this.config.strokeWidth
    );
  }

  private drawBody(): void {
    const headTop = 100;
    const { head, body } = this.config.sizes;
    const bodyTop = headTop + head.height + 15;
    const bodyHeight = 2 * (bodyTop - headTop);

    this.addPolygon(
      [
        this.centerX - body.halfWidth,
        bodyTop - 10,
        this.centerX + body.halfWidth,
        bodyTop - 10,
        this.centerX,
        bodyTop + bodyHeight,
      ],
      this.config.colors.purpleDress,
      this.config.colors.purpleDress,
      this.config.strokeWidth
    );
  }

  private drawLegs(): void {
    this.createLeg('left');
    this.createLeg('right');
  }

  private createLeg(side: Side): void {
    const { head, body, legs } = this.config.sizes;
    const headTop = 100;
    const bodyTop = headTop + head.height + 15;
    const bodyHeight = 2 * (bodyTop - headTop);
    const legTop = bodyTop + bodyHeight - 40;
    const sign = side === 'right' ? 1 : -1;

    const legGroup = new Konva.Group({
      x:
        this.centerX +
        sign * (legs.legWidth - (side === 'right' ? legs.hipWidth : 0)) +
        legs.hipWidth / 2,
      y: legTop,
    });

    // Бедро
    const hip = new Konva.Rect({
      x: -legs.hipWidth / 2,
      y: 0,
      width: legs.hipWidth,
      height: legs.hipLength,
      fill: this.config.colors.skin,
      stroke: this.config.colors.skinStroke,
      strokeWidth: this.config.strokeWidth,
    });

    // Голень
    const shinGroup = new Konva.Group({
      x: 0,
      y: legs.hipLength,
    });

    let shinThirdPointX =
      legs.hipWidth / 2 - (side === 'right' ? 0.6 * legs.hipWidth : 0);
    let shinFourthPointX =
      side === 'right' ? -legs.hipWidth / 2 : 0.1 * legs.hipWidth;

    const shin = this.createPolygon(
      [
        -legs.hipWidth / 2,
        0,
        legs.hipWidth / 2,
        0,
        shinThirdPointX,
        legs.shinLength,
        shinFourthPointX,
        legs.shinLength,
      ],
      this.config.colors.skin,
      this.config.colors.skinStroke,
      this.config.strokeWidth
    );

    // Стопа
    const feetFirstPointX =
      side === 'right' ? shinThirdPointX : shinFourthPointX;
    const footTopWidth = shinFourthPointX - shinThirdPointX;
    const footGroup = new Konva.Group({
      x: feetFirstPointX,
      y: legs.shinLength,
    });

    const foot = this.createPolygon(
      [
        0,
        0,
        sign * footTopWidth,
        0,
        sign * footTopWidth,
        legs.feetLength,
        feetFirstPointX,
        legs.feetLength,
      ],
      this.config.colors.lightPurple,
      this.config.colors.lightPurple,
      this.config.strokeWidth
    );

    footGroup.add(foot);
    shinGroup.add(shin);
    shinGroup.add(footGroup);
    legGroup.add(hip);
    legGroup.add(shinGroup);

    this.layer.add(legGroup);
    this.setupDragControls(legGroup, shinGroup, side);
  }

  private drawSkirt(): void {
    const { head, body } = this.config.sizes;
    const headTop = 100;
    const bodyTop = headTop + head.height + 15;
    const bodyHeight = 2 * (bodyTop - headTop);
    const skirtTop = bodyTop + bodyHeight - 90;
    const skirtHeight = 100;
    const skirtHalfWidth = 1.5 * body.halfWidth;
    const skirt = new Konva.Group();

    // Левая часть юбки
    skirt.add(
      this.createPolygon(
        [
          this.centerX,
          skirtTop,
          this.centerX - 2 * skirtHalfWidth,
          skirtTop + skirtHeight + 10,
          this.centerX - skirtHalfWidth,
          skirtTop + skirtHeight + 5,
        ],
        this.config.colors.darkPurple,
        this.config.colors.darkPurpleStroke,
        this.config.strokeWidth
      )
    );

    // Правая часть юбки
    skirt.add(
      this.createPolygon(
        [
          this.centerX,
          skirtTop,
          this.centerX + 2 * skirtHalfWidth,
          skirtTop + skirtHeight + 10,
          this.centerX + skirtHalfWidth,
          skirtTop + skirtHeight + 5,
        ],
        this.config.colors.darkPurple,
        this.config.colors.darkPurpleStroke,
        this.config.strokeWidth
      )
    );

    // Передняя часть юбки
    skirt.add(
      this.createPolygon(
        [
          this.centerX,
          skirtTop - 10,
          this.centerX - skirtHalfWidth,
          skirtTop + skirtHeight,
          this.centerX + skirtHalfWidth,
          skirtTop + skirtHeight,
        ],
        this.config.colors.lightPurple,
        this.config.colors.lightPurpleStroke,
        this.config.strokeWidth
      )
    );

    this.layer.add(skirt);
  }

  private drawArms(): void {
    this.createArm('left');
    this.createArm('right');
  }

  private createArm(side: Side): void {
    const { head, body, arms } = this.config.sizes;
    const headTop = 100;
    const bodyTop = headTop + head.height + 15;
    const bodyHeight = 2 * (bodyTop - headTop);
    const shoulderLength = 0.5 * bodyHeight;
    const sign = side === 'right' ? 1 : -1;
    const shoulderX =
      this.centerX +
      sign * (body.halfWidth - (side === 'right' ? arms.shoulderWidth : 0));

    const armGroup = new Konva.Group({
      x: shoulderX + arms.shoulderWidth / 2,
      y: bodyTop,
    });

    const forearmGroup = new Konva.Group({
      x: 0,
      y: shoulderLength,
    });

    // Плечо
    const shoulder = new Konva.Rect({
      x: -arms.shoulderWidth / 2,
      y: 0,
      width: arms.shoulderWidth,
      height: shoulderLength,
      fill: this.config.colors.skin,
      stroke: this.config.colors.skinStroke,
      strokeWidth: this.config.strokeWidth,
    });

    // Предплечье
    const forearmLength = shoulderLength - 10;
    const forearmX =
      (side === 'right' ? arms.shoulderWidth : 0) + sign * 0.9 * forearmLength;

    const forearm = this.createPolygon(
      [
        -arms.shoulderWidth / 2,
        0,
        arms.shoulderWidth / 2,
        0,
        forearmX,
        0.7 * shoulderLength,
      ],
      this.config.colors.skin,
      this.config.colors.skinStroke,
      this.config.strokeWidth
    );

    forearmGroup.add(forearm);
    armGroup.add(shoulder);
    armGroup.add(forearmGroup);
    this.layer.add(armGroup);

    this.setupArmDragControls(armGroup, forearmGroup, side);
  }

  private drawCollar(): void {
    const { head, body } = this.config.sizes;
    const headTop = 100;
    const bodyTop = headTop + head.height + 15;

    this.addPolygon(
      [
        this.centerX - body.halfWidth - 5,
        bodyTop - 10,
        this.centerX + body.halfWidth + 5,
        bodyTop - 10,
        this.centerX + body.halfWidth + 15,
        bodyTop + 10,
        this.centerX - body.halfWidth - 15,
        bodyTop + 10,
      ],
      this.config.colors.purpleDress,
      this.config.colors.purpleDress,
      this.config.strokeWidth
    );
  }

  private setupDragControls(
    legGroup: Konva.Group,
    shinGroup: Konva.Group,
    side: Side
  ): void {
    let isShinDragging = false;
    let isHipDragging = false;

    legGroup.on('mousedown', () => (isHipDragging = true));
    shinGroup.on('mousedown', (e) => {
      e.cancelBubble = true;
      isShinDragging = true;
    });

    this.stage.on('mousemove', (e) => {
      const pointerPos = this.stage.getPointerPosition();
      if (!pointerPos) return;

      if (isShinDragging) {
        const dx = pointerPos.x - legGroup.x();
        const dy = pointerPos.y - legGroup.y();
        const angle = this.calculateRotationAngle(dx, dy, -40, 40);
        shinGroup.rotation(angle);
      }

      if (isHipDragging) {
        const dx = pointerPos.x - legGroup.x();
        const dy = pointerPos.y - legGroup.y();
        const maxAngle = side === 'left' ? 50 : 40;
        const minAngle = side === 'left' ? -40 : -50;
        const angle = this.calculateRotationAngle(dx, dy, minAngle, maxAngle);
        legGroup.rotation(angle);
      }

      this.layer.batchDraw();
    });

    this.stage.on('mouseup', () => {
      isHipDragging = false;
      isShinDragging = false;
    });
  }

  private setupArmDragControls(
    armGroup: Konva.Group,
    forearmGroup: Konva.Group,
    side: Side
  ): void {
    let isDraggingForearm = false;
    let isDraggingShoulder = false;

    forearmGroup.on('mousedown', (e) => {
      e.cancelBubble = true;
      isDraggingForearm = true;
    });

    armGroup.on('mousedown', () => (isDraggingShoulder = true));

    this.stage.on('mousemove', () => {
      const pointerPos = this.stage.getPointerPosition();
      if (!pointerPos) return;

      if (isDraggingForearm) {
        const dx = pointerPos.x - armGroup.x();
        const dy = pointerPos.y - armGroup.y();
        const angle = this.calculateRotationAngle(dx, dy);
        forearmGroup.rotation(angle);
      }

      if (isDraggingShoulder) {
        const dx = pointerPos.x - armGroup.x();
        const dy = pointerPos.y - armGroup.y();
        const maxAngle = side === 'left' ? 50 : 40;
        const minAngle = side === 'left' ? -40 : -50;
        const angle = this.calculateRotationAngle(dx, dy, minAngle, maxAngle);
        armGroup.rotation(angle);
      }

      this.layer.batchDraw();
    });

    this.stage.on('mouseup', () => {
      isDraggingForearm = false;
      isDraggingShoulder = false;
    });
  }

  private createPolygon(
    points: number[],
    fill: string,
    stroke: string,
    strokeWidth: number
  ): Konva.Line {
    return new Konva.Line({
      points,
      fill,
      stroke,
      strokeWidth,
      closed: true,
    });
  }

  private addPolygon(
    points: number[],
    fill: string,
    stroke: string,
    strokeWidth: number
  ): void {
    const polygon = this.createPolygon(points, fill, stroke, strokeWidth);
    this.layer.add(polygon);
  }

  private calculateRotationAngle(
    dx: number,
    dy: number,
    minAngle: number = -60,
    maxAngle: number = 60
  ): number {
    let realAngle = ((Math.atan2(dy, dx) * 180) / Math.PI - 90 + 360) % 360;
    if (realAngle > 180) realAngle -= 360;
    return Math.max(minAngle, Math.min(maxAngle, realAngle));
  }
}
