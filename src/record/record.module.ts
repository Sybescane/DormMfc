import { Module } from "@nestjs/common";
import { RecordController } from "./record.controller";
import { RecordService } from "./record.service";

@Module({
    imports: [],
    providers: [RecordService],
    controllers: [RecordController],
    exports: [],
  })
  export class RecordModule {}